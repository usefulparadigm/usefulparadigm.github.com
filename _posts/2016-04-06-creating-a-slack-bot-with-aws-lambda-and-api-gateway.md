---
layout: post
title: AWS Lambda와 API Gateway로 Slack Bot 만들기
description: 슬랙이 제공하는 다양한 확장 방법들을 알아 보고, 슬래시 명령(slash command)을 이용한 슬랙 봇을 만들어 아마존 웹서비스 람다(AWS Lambda)에 호스팅하는 과정을 소개합니다.
thumbnail: https://usefulpa.s3.amazonaws.com/images/2016/aws-lambda-slack.png
category: web development
tags: [mobile, slack, oauth, bot, aws, cloud, rest]
---
![](https://usefulpa.s3.amazonaws.com/images/2016/serverless-slack-lambda-gateway.png)

[슬랙(Slack)](slack.com/)은 팀이나 프로젝트 단위에서 널리 사용되고 있는 대표적인 협업 메시징 서비스다. 통상적인 메신저 서비스들이 갖는 기본적인 메시징 기능에 더하여 자료를 저장하고 검색하는 등 협업에 필요한 여러 기능들을 갖추고 있고, 또한 모바일과 데스크톱 환경을 아우르는 편리하고 다양한 접점을 제공하기 때문에 많은 사용자층을 확보하고 있는 인기있는 서비스이기도 하다. 게다가 슬랙은 사용자나 개발자가 직접 기능을 확장하고 용도를 변경할 수 있는 다양한 통합(integration) 방법들도 제공한다.

이 글에서는 슬랙이 제공하는 다양한 확장 방법들을 간단히 소개하고 그 중 하나인 슬래시 명령(slash command)을 만들어 보려 한다. 뒤에서 다시 설명하겠지만, 슬래시 명령을 만들기 위해서는 슬래시 명령을 처리할 별도의 호스팅 환경이 필요한데, 여기서는  Amazon 웹서비스(이하 'AWS')에서 제공하는 [AWS Lambda](https://aws.amazon.com/ko/lambda/)와 [API Gateway](https://aws.amazon.com/ko/api-gateway/)를 사용하여 호스팅을 처리하려 한다.

## Slack을 확장하는 방법들

슬랙은 "[통합(Integration)](https://api.slack.com/custom-integrations)" 이라는 이름으로 다양한 확장 방법들을 제공한다. 

* [Incoming Webhooks](https://api.slack.com/incoming-webhooks) : 외부 서비스나 앱에서 슬랙으로 웹요청을 보낼 수 있다.
* [Outgoing Webhooks](https://api.slack.com/outgoing-webhooks) : Incoming Webook과는 반대로, 특정 슬랙 채널 또는 메시지 내에서 특정한 단어가 나올 경우 슬랙에서 외부로 웹요청을 보낼 수 있다.
* [Slash Commands](https://api.slack.com/slash-commands) : 슬래시(/) 문자로 시작하는 슬랙 명령을 추가로 만들어 넣을 수 있다.
* [Bot Users](https://api.slack.com/bot-users) : 제목 그대로 '봇 사용자'이다. 일반적인 (사람) 사용자와 마찬가지로 슬랙의 사용자 목록에 상주해 있으면서 다른 사용자의 질문에 답을 하거나 서로 대화할 수 있다.

기본적으로 이런 통합은 자신이 관리하는 슬랙 계정 내에 설치하여 사용할 수 있지만 필요한 경우에는 [앱(Slack App)](https://api.slack.com/slack-apps)으로 만들어 다른 팀 사용자들도 사용할 수 있도록 공개도 가능하며 더 나아가 슬랙의 [앱 디렉터리](https://slack.com/apps)에 등록할 수도 있다. 또한 슬랙에서 할 수 있는 대부분의 작업들은 별도의 [Web API](https://api.slack.com/web)로 공개되어 있기 때문에 이 API를 이용하면 여러 가지 더 다양한 슬랙 확장을 구현할 수도 있다.

## 슬래시 명령(Slash Command) 만들기

슬랙에서 사용자는 슬랙의 대화창에서 슬래시(/) 문자로 시작하는 명령을 호출할 수 있으며 이 때 사용하는 명령을 **슬래시 명령**이라고 부른다. 예를 들어, 슬랙에서 어떤 채널에 다른 사용자를 초대할 경우 대화창에서 `/invite @name` 이라고 명령하면 된다. 슬랙에서는 이런 슬랙이 기본적으로 제공하는 명령(Built-in Commands) 말고도 자신의 팀에서만 사용할 명령(Custom Commands)을 추가로 만들어 넣을 수 있는 확장 기능을 제공한다.

슬래시 명령을 만들려면 다음과 같은 절차를 따르면 된다:

1. 슬랙에서 자신의 계정에 로그인한 다음, "[Apps & Integrations](https://slack.com/apps/build)" 메뉴로 들어가 "Build a Custom Integration" 창에서 [새 슬래시 명령](my.slack.com/services/new/slash-commands/)을 만든다.
2. 이 슬래시 명령을 받아서 처리할 웹 서버를 구현한 다음, 그 URL값을 슬랙의 슬래시 명령 설정 창에 추가한다.

구현은 아주 간단하다. 예를 들어, `/hello` 라는 슬래시 명령을 하나 추가로 만들려면 이 명령에 대응하는 웹 URL만 하나 만들어 맵핑시키면 된다. 그러면 슬랙에서 `/hello` 라는 명령이 들어오면 슬랙은 해당 명령과 연결된 URL로 웹요청을 보내고 그 결과값을 받아 슬랙의 대화창에 다시 표시한다.

![](https://usefulpa.s3.amazonaws.com/images/2016/slack-slash-commands.png)

이 때 슬랙이 외부 URL로 HTTP 요청을 보낼 때 실어 보내는 데이터는 다음과 같은 형식이다. 아래 데이터는 슬랙의 대화창에서 '`/weather 94070`'이라고 주었을 때 슬랙이 보내는 데이터의 샘플인데, 슬래시 명령 `/weather` 뒤에 추가되는 값 `94070`이 HTTP 데이터 상에는 `text`라는 키값으로 잡힌다는 데 유의하자(나중에 이 값을 받아 사용할 것이다). 

	token=gIkuvaNzQIHg97ATvDxqgjtO
	team_id=T0001
	team_domain=example
	channel_id=C2147483705
	channel_name=test
	user_id=U2147483697
	user_name=Steve
	command=/weather
	text=94070
	response_url=https://hooks.slack.com/commands/1234/5678

이 값을 전달받은 웹서버 측에서는 [Slack의 메시지 형식](https://api.slack.com/docs/formatting)에 맞춰 메시지를 구성하여 다음과 같이 JSON 형식으로 다시 슬랙에 반환하면 된다.

	{
	    "text": "I am a test message http://slack.com",
	    "attachments": [
	        {
	            "text": "And here's an attachment!"
	        }
	    ]
	}

이 때 HTTP 요청은 GET/POST 방식 모두 가능하며(단, 슬랙 앱으로 만들 경우에는 반드시 POST 방식을 써야 함), POST 방식으로 보낼 경우 헤더의 Contet-Type은 `application/x-www-form-urlencoded`로 지정된다. 더 자세한 내용은 [슬래시 명령 API 문서](https://api.slack.com/slash-commands)를 참조하면 된다.

그럼 실제 만들어 보자. 슬래시 명령을 만들려면 우선 Slack에 로그인한 다음 Slack에서 제공하는 [새 슬래시 명령 만들기](my.slack.com/services/new/slash-commands/) 창에 접속하여 필요한 정보를 입력하는 것부터 시작하면 된다. 이 창에서 만들고자 하는 슬래시 명령을 입력하고 "Add Slash Command Integration" 버튼을 클릭하면 나만의 커스텀 슬래시 명령이 생성된다. 여기서는 간단하게 검색어를 [위키피디어](https://ko.wikipedia.org/)와 연결하는 `/wiki` 라는 명령을 하나 추가해 보기로 하겠다.

![](https://usefulpa.s3.amazonaws.com/images/2016/create-new-slash-command.png)

이어 나오는 페이지에서는 슬래시 명령에 대응하는 URL을 적어주면 된다. 아직 우리는 웹서버를 만들지 않았기 때문에 일단 이 부분은 비워 두자. 나중에 채울 것이다. 

![](https://usefulpa.s3.amazonaws.com/images/2016/slash-commands-settings.png)

이걸로 끝이다. 참고로, 이 때 함께 제공되는 토큰(Token)은 등록된 URL로 들어오는 요청이 슬랙에서 보낸 것이 맞는지 확인하는 용도로 사용하면 된다.

## 슬랙 봇 호스팅하기

이제 앞서 비워둔 URL 칸을 채워 보자. 이를 위해서는 어딘가에 웹서버를 하나 만들어 두고 슬랙에서 넘어오는 슬래시 명령을 받아서 슬랙 메시지 형태로 반환하는 코드를 작성해야 한다. 웹서버는 웹요청을 받아 처리할 수 있는 환경이라면 뭐든 상관 없지만, 여기서는 아마존 웹서비스에서 제공하는 [AWS 람다(Lambda)](https://aws.amazon.com/ko/lambda/)를 사용하여 슬래시 명령을 호스팅해 보기로 한다. 

### Lambda 함수 만들기

AWS Lambda는 "[이벤트에 응답하여 코드를 실행하고 자동으로 기본 컴퓨팅 리소스를 관리하는 컴퓨팅 서비스](https://aws.amazon.com/ko/lambda/details/)"라고 소개되어 있다. 지금과 같이 경량의 함수 수준의 간단한 로직을 만들어 올리고 즉시 실행하는데는 제격인 서비스다. 그럼 [AWS Lambda Console](https://console.aws.amazon.com/lambda/home)에 접속하여 새로운 람다 함수(Lambda function)를 하나 만들어 보자(Lambda는 현재 US East와 EU를 포함한 몇몇 리전에서만 제공된다). Lambda에는 슬랙 앱을 만들 때 사용할 템플릿(Blueprint)도 제공되지만, 여기서는 템플릿 없이 직접 만들기로 한다. 

"Create a Lambda function" 버튼을 눌러 시작하고 "Select blueprint" 창은 그냥 Skip 하면 다음과 같이 Lambda 함수를 추가하고 설정할 수 있는 창이 나온다. 여기서 적당한 함수 이름을 주고 코드를 추가한 다음 저장하면 람다 함수가 만들어 진다.

![](https://usefulpa.s3.amazonaws.com/images/2016/aws-lambda-configure.png)

이제 코드를 작성할 차례다. 2016년 4월 현재 AWS Lambda는 3개의 프로그래밍 언어(Node.js, Python, Java)만 지원한다. 여기서는 그 중 Node.js를 사용하기로 한다. 다음에서 보듯 코드는 아주 간단하다. 요청을 받아 응답을 반환하는 게 전부다. 

	// The entry point of this lambda function.
	exports.handler = function(event, context) {
	  console.log(event);
	
	  context.succeed({
	    "response_type": "in_channel",
	    "text": "I found some about \"" + event.text + "\"",
	    "attachments": [
	        {
	            "text": "For more info please visit to \nhttps://ko.wikipedia.org/wiki/" + event.text,
	            "color": "#7CD197"
	        }
	    ]
	  });
	
	};

앞서 설명한 대로 슬랙에서 넘어오는 값인 `text`를 받아서 메시지를 구성하였다. `context.succeed()` 함수는 AWS Lambda에서 사용하는 반환 함수이며, 이 함수의 인자로 슬랙의 메시지를 담아 반환하면 된다. 이 때 반환값은 JSON 형식으로 작성하면 되고, [슬랙의 메시지 형식](https://api.slack.com/docs/formatting)에 맞추면 된다. 슬랙에서는 메시지 출력을 미리 보고 테스트해 볼 수 있도록 [Message Builder](https://api.slack.com/docs/formatting/builder)도 제공하기 때문에 더 쉽게 메시지를 테스트해 볼 수 있다.  

Lambda에 관한 더 자세한 내용은 [AWS Lambda 문서](http://aws.amazon.com/documentation/lambda/)를 참조하면 된다.

### API Gateway 연동하기

Lambda 함수는 기본적으로 이벤트에 반응한다. 여기서 말하는 이벤트는 아마존 웹서비스에서 발생하는 어떤 것이다(예를 들면 S3에 어떤 파일을 추가하는 것과 같은 이벤트). 그렇지만 우리에게 필요한 것은 웹 URL이다. AWS Lambda를 웹 호출을 통해 실행시키려면 또다른 아마존 웹서비스 중 하나인 [Amazon API Gateway](https://aws.amazon.com/ko/api-gateway/)를 연결해야 한다. 

역시 이번에도 [AWS API Gateway Console](https://console.aws.amazon.com/apigateway/home)로 접속하여 새 API를 하나 만들자. "Create API" 버튼을 누르고 새로 만들 API의 이름을 입력하면 API 리소스(Resources) 설정 창이 나온다. 이 때 새로 Resource와 Method를 추가해 주면 간단하게 지금 사용할 API가 만들어진다. 여기서 말하는 리소스와 메서드는 흔히 사용하는 [REST](https://ko.wikipedia.org/wiki/REST) 방식의 API에서 말하는 그 리소스와 메서드 개념을 생각하면 된다. 앞서 우리는 Slack에서 슬래시 명령을 설정할 때 POST 방식으로 호출하기로 정했기 때문에 여기서 메서드도 POST로 맞춰 생성하였다. 그런 다음, Integration Type을 "Lambda Function"으로 맞추고 방금 전 만든 람다 함수를 연결시켜 주면 API Gateway와 Lambda 함수 간의 연결이 완료된다.

![](https://usefulpa.s3.amazonaws.com/images/2016/api-gateway-lambda-mapping.png)

여기까지 하면 API와 람다 함수 간의 연결 작업은 완료되지만, 한 가지 남은 일이 있다. Slack이 API를 통해 보낸 값을 람다 함수가 제대로 받아서 처리하게 하려면 약간의 데이터 변환이 필요하다. Slack은 API를 호출할 때 HTML Form 형식으로 데이터를 전달하지만  API Gateway를 통해 람다함수로 전해지는 데이터는 기본적으로 JSON 형식이기 때문에 Slack으로부터 받은 POST 데이터를 Lambda 함수가 처리할 수 있도록 변환하는 작업을 해 줘야 한다. 이 작업은 API Gateway의 Method Execution 설정 창에서 할 수 있다.

![](https://usefulpa.s3.amazonaws.com/images/2016/api-gateway-method-execution.png)

이 Method Execution 창에 나와 있는 4가지 변환 과정 중 우리가 건드릴 부분은 "Integration Request" 영역이다. 이 단계는 API로 들어온 요청을 Lambda 함수로 보내기 직전 단계이며, 이 단계에서 다음과 같이 "Mapping Template"을 추가해 주면 된다. 이 때 Content-Type을 "application/x-www-form-urlencoded" 로 설정한 이유는, 앞서 잠깐 언급했듯이, Slack이 슬래시 명령을 호출할 때 이 방식을 사용하기 때문이며, 아직 Amazon API Gateway에서는 폼 방식의 데이터를 JSON 형식으로 변환하는 부분을 제공하지 않기 때문에 [폼 방식의 POST 데이터를 JSON으로 변환시키는데 필요한 맵핑 루틴](https://gist.github.com/sjoonk/20ae13e5cd8be88e9824e3bad11b2859)을 직접 만들어서 추가한 것이다(아마 조만간 API Gateway에서 이 부분은 자동화시킬 것으로 예상되지만). API Gateway의 Mapping Template과 관련된 더 자세한 내용은 [Amazon API Gateway 문서](http://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html)를 참조하자.

![](https://usefulpa.s3.amazonaws.com/images/2016/api-gateway-mapping-template.png)

지금까지의 모든 작업을 완료했으면 이제 API를 배포하는 일만 남았다. (물론 그 전에 API가 제대로 작동하는지 테스트하는 일이 남았지만 테스트 단계 부분의 설명을 생략한다) API의 배포는 AWS 콘솔에서 Deploy API 메뉴를 실행하면 된다.

![](https://usefulpa.s3.amazonaws.com/images/2016/agi-gateway-deploy-api.png)

배포가 성공적으로 완료되면 API의 URL이 발급된다. 이 URL을  앞서 만든 슬랙의 슬래시 명령 설정 창의 URL 입력란에 붙여 넣으면 하나의 슬래시 명령이 완성되는 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2016/api-gateway-invoke-url.png)

### Hello, 슬랙 봇!

이제 이 모든 작업이 끝났으면 Slack으로 돌아오자. 슬랙의 대화창에서 다음과 같이 방금 우리가 만든 슬래시 명령을 입력하면 Slack 봇이 반갑게 우리를 맞아 줄 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2016/slack-wiki-alphago.png)

## Add to Slack 버튼 만들기

Slack 봇(이 경우 슬래시 명령)을 내 슬랙 계정의 팀 내에서만 사용한다면 여기까지가 끝이다. 그렇지만 공들여 만든 Slack 봇을 세상에 공개하여 다른 팀에서도 활용할 수 있게 하고 싶은 경우에는 지금까지 만들었던 슬랙 봇을 앱(Slack Apps)으로 만들어 공개할 수도 있다. 이 때 다른 팀에서 자신의 슬랙 계정에 내 슬랙 봇(앱)을 쉽게 추가할 수 있도록 해 주는 방법이 바로 "Add to Slack" 버튼을 만들어 웹사이트나 서비스 홈페이지에 공개하는 것이다. (아마 웹을 돌아다니다 보면 이 버튼이 달려 있는 사이트나 서비스들을 종종 보게 될 것이다. 앞으로 점점 더 많이^^)

슬랙은 Add to Slack 버튼(이하 '슬랙 버튼')을 간단하게 만들어 사이트에 붙일 수 있도록 해 주는 [자동 코드 생성기](https://api.slack.com/docs/slack-button)를 제공하기 때문에 슬랙 버튼을 만들어 붙이는 일은 전혀 어려울 게 없다. 그저 복사해서 붙여 넣으면 그만이다.

![Add to Slack 버튼](https://usefulpa.s3.amazonaws.com/images/2016/add-to-slack-button.png)

다만 이 슬랙 버튼이 제대로 작동하려면 OAuth 인증을 거쳐야 한다. 슬랙 앱은 [OAuth 2.0](https://api.slack.com/docs/oauth) 기반의 인증을 사용하며 인증 플로(flow)는 OAuth 2.0의 [코드 기반 인증 방식](https://tools.ietf.org/html/rfc6749#section-4.1)을 따른다. 그러므로 슬랙 버튼을 만들기 위해서는 이 OAuth 인증 처리 부분을 별도로 만들어 주어야 한다. 

이 부분도 물론 앞서 사용했던 AWS Lambda와 API Gateway를 이용해 만들 수도 있겠지만, OAuth 인증을 통해 받은 액세스 토큰(Access Token) 값이나 기타 다른 정보들을 저장하였다가 다시 사용하고 하기 위해서는 Lambda 보다는 [EC2](https://aws.amazon.com/ko/ec2/)나 [구글 클라우드](https://cloud.google.com/) 또는 [Heroku](https://www.heroku.com/) 같은 전통적인(?) 호스팅 플랫폼을 사용하는 것이 더 좋을 것 같다.

OAuth 인증의 처리는 Google이나 Facebook, Twitter 등 여타 다른 OAuth 기반의 서비스에서 사용하는 방식과 크게 다르지 않고 이미 많은 자료들이 공개되어 있기 때문에 여기서 구현 설명은 생략하기로 한다.

## 참고자료

* [Slack API 문서](https://api.slack.com/)
* [AWS Lambda Developer Guide](http://docs.aws.amazon.com/lambda/latest/dg)
* [Amazon API Gateway Developer Guide](http://docs.aws.amazon.com/apigateway/latest/developerguide/)


