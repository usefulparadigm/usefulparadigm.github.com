---
layout: post
title: 터보링크(Turbolinks)와 레일스 4.0
description: 레일스 4.0 파이널 버전이 출시되었습니다. 4.0 릴리즈 소식을 전하는 레일스 블로그에서 비중있게 소개하고 있는 터보링크(Turbolinks)의 개념과 장단점 등을 소개합니다.
thumbnail: http://usefulpa.s3.amazonaws.com/images/2013/pjax-requests.jpg
category: ruby 
tags: [rails, turbolink, ruby, ajax, pjax]
---

엊그제 [레일스(Ruby on Rails)](http://rubyonrails.org/) 4.0 파이널 버전이 공식적으로 릴리즈 되었다. 2.x 버전에서 3.0 버전으로 넘어올 때 만큼 눈에 띄는 큰 변화는 없지만 그래도 프레임워크 전반에 걸쳐 작은 부분까지 놓치지 않고 세심하게 가다듬은 흔적들이 눈에 띄어 반갑다. 4.0 릴리즈 소식을 전하는 [루비온레일스 블로그](http://weblog.rubyonrails.org/)에서 특히 눈에 띈 부분은 터보링크(Turbolinks)를 비중있게 소개하고 있다는 점. 다음은 블로그에서 적힌 터보링크에 대한 소개다:

> Speed-up the client-side with Turbolinks, which essentially turns your app into a single-page javascript application in terms of speed, but with none of the developmental drawbacks (except, maybe, compatibility issues with some existing JavaScript packages).

터보링크를 쓰면 별다른 기술적 문제 없이 속도(speed) 측면에서 싱글페이지 자바스크립트 앱 효과를 낼 수 있다고 되어 있다.

Pjax와 터보링크
-----

도대체 터보링크가 뭐길래? 레일스를 다루지 않는 분들을 위해 간단히 터보링크가 무언지부터 소개해 보자.

터보링크를 이해하려면 터보링크의 아이디어 소스가 된 pjax부터 알아보는 편이 간단할 것 같다. [Pjax](https://github.com/defunkt/jquery-pjax)는 pushState와 Ajax의 결합어다. 말 그대로 HTML5 [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Manipulating_the_browser_history) 와 Ajax을 함께 사용하여 pushState 기능이 지원되는 브라우저에서 사용자가 웹페이지의 통상적인 링크를 클릭할 경우 전체 페이지를 갱신(full page refresh)하는 대신, 클릭 이벤트를 가로 채 자동으로 해당 URL에 대해 Ajax 호출을 하고 그 결과로 받은 웹페이지의 일부분(fragment)만으로 기존 웹페이지의 특정 영역을 대체(replace)하는 기법이다.

Pjax를 쓰면 큰 노력 없이 정적인 웹페이지를 좀 더 빠르게 만들 수 있다. 그저 자바스크립트 라이브러리 하나 추가하는 것만으로 웹페이지 속 링크를 클릭할 때마다 매번 전체 페이지를 새로 갱신해야 하는 부담을 줄여주어 성능을 개선 시킬 수 있는 효과가 있기 때문이다.

![](http://usefulpa.s3.amazonaws.com/images/2013/pjax-requests.jpg)
(사진출처: [ntotten.com](http://ntotten.com/2012/04/09/building-super-fast-web-apps-with-pjax/))

레일스 [터보링크](https://github.com/rails/turbolinks/)는 여기서 한발 더 나간다. Pjax처럼 클릭 이벤트를 가로 채 자동으로 Ajax 호출하는 부분까지는 똑같지만, 아예 요청 결과를 파싱하여 title 태그와 body 태그를 추출한 다음 기존 페이지에서 상응하는 부분만 대체 시킨다. 과히 [설정 보단 관례(convention over configuration)](http://en.wikipedia.org/wiki/Convention_over_configuration)를 우선하는 "레일스 스러운" 발상이다. 실제로 터보링크는 37signals의 대표적인 웹서비스인 Basecamp의 모바일 버전에 적용되어 [상당한 성능 개선 효과를 거둔](http://37signals.com/svn/posts/3269-behind-the-speed-basecamp-mobile) 것으로 알려져 있기도 하다.

호불호(好不好)
-----

이 터보링크가 과연 레일스 4.0을 대표할 만큼 중요한 것일까? 굳이 프레임워크 속에 디폴트로 집어넣을만한 것이었을까? 레일스 3.1로 넘어올 때 새로 프레임워크에 추가된 [에셋 파이프라인(asset pipeline)](http://guides.rubyonrails.org/asset_pipeline.html) 만큼은 아니지만, 그래도 터보링크를 프레임워크 속에 넣는 것을 두고 레일스 커뮤니티에서 갑론을박이 있었던 것으로 기억한다. 그래서인지 레일스 블로그에는 아래와 같은 재밌는 댓들도 눈에 띈다.

![](http://usefulpa.s3.amazonaws.com/images/2013/idonotlinkturbolinks.png)

터보링크를 사용함으로써 얻는 가장 큰 잇점은, 터보링크 페이지에도 소개되어 있듯, 매번 링크를 클릭할 때 마다 페이지 속 여러 에셋들, 즉 자바스크립트나 CSS 파일들을 다시 다운로드하여 리로딩하지 않아도 된다는 점이다(그럼으로써 애플리케이션의 속도를 향상시킬 수 있다). 

그리고 또 한 가지는, 이렇게 매번 자바스크립트 파일을 새로 로드하지 않아도 되기 때문에, [싱글페이지앱](http://en.wikipedia.org/wiki/Single-page_application) 구현이 가능해 진다는 점이다. 물론 [Backbone.js](http://backbonejs.org/) 나 [Ember.js](http://emberjs.com/), [Angular.js](http://angularjs.org/) 같은 [자바스크립트 MV* 프레임워크](http://todomvc.com/)를 사용하여 웹앱을 구성하는 것과는 방식이 다르지만, 전체 페이지가 한번만 로드된다는 점, 그에 따라 브라우저 속에서 상태(state)가 보존될 수 있다는 점 등에서는 싱글페이지 앱(SPA) 이다.

앞서의 자바스크립트 MV* 프레임워크를 사용할 경우, 백엔드 처리를 위해 서버측(레일스 포함)에서 별도의 데이터 포맷(대개는 JSON)을 지원하는 API 엔드포인트(endpoint)를 구성해야 하는데 터보링크는 그냥 기존 방식대로 HTML로 렌더링하면 되니 편리하기도 하다.

편리함만 있는 게 아니라 문제점도 있다(이런 문제들이 레일스 커뮤니티에서  반론과 비판의 이유가 된다).

무엇보다도 가장 근본적인 문제는 터보링크가 HTML 페이지 속에서 자바스크립트가 처리되는 방식을 흔들어 놓는다는 점이다. 그리고 이것은 기존의 많은 자바스크립트 라이브러리들과 충돌하는 문제를 일으킬 수 밖에 없다는 게 유명한 오픈소스 개발자 Yehuda Katz의 [설명](https://plus.google.com/106300407679257154689/posts/A65agXRynUn)이다:

> This is not a mere quibble: a lot of existing JavaScript operates under the assumption of a clean scope, and a single DOMContentLoaded event. In a perfect world, popular JavaScript plugins would be architected to work well with a solution like Turbolinks, but the assumption of a clean global scope per server-rendered HTML page is baked into a lot of the JavaScript and jQuery libraries that people tend to use.

물론 레일스 역시 이런 문제점을 인지하고, 특히 jQuery와의 충돌에 대해서는, [솔루션](https://github.com/kossnocorp/jquery.turbolinks)도 제시하고 있긴 하지만,  결국 이 문제는 case by case로 해결할 수 밖에 없는 문제로 보인다. 터보링크와 다른 자바스크립트 라이브러리들 간의 호환성에 관한 정보를 제공하는 [Turbolinks Compatibility](http://reed.github.io/turbolinks-compatibility/) 같은 곳도 있다. 

자칫 잘못 사용할 경우 자바스크립트 전역 스코프가 초기화되지 않거나(body 태그 속에 동적으로 삽입되는 자바스크립트가 그 예), [메모리를 계속해서 잡아먹을 가능성](http://staal.io/blog/2013/01/18/dangers-of-turbolinks/)도 안고 있다. 

레일스 기반 오픈소스 포럼 솔루션 [Discourse](http://www.discourse.org/) 공동창업자 Robin Ward는 자신의 [블로그](http://eviltrout.com/2013/01/06/turbolinks-and-the-prague-effect.html)에서 프라하 어느 카페에서 인터넷에 접속하는 것을 예시로 들면서 터보링크 보다는 CDN과 자바스크립트 MV* 프레임워크를 사용하는 것이 올바른 접근이라고 말하기도 한다. 

"터보(Turbo)"의 의미
-----

조금 경력이 있는 개발자들이라면  "터보"라는 말을 들으면 떠오르는 단어가 있을 것이다. 바로 "터보 파스칼", "터보 C" 등 앞에 "터보" 글자가 붙는 볼랜드(Borland)사의 컴파일러/IDE 제품군 이름이다. 지금은 컴퓨팅 역사 속으로 사라졌지만, 파스칼과 C언어가 세상을 주름잡던 당시만 하더라도 프로그래밍 언어 앞에 "터보" 가 붙으면 그야말로 "터보 엔진"을 단 것처럼 빠른 컴파일과 빠른 개발 속도를 선사했었다.

![](http://usefulpa.s3.amazonaws.com/images/2013/porsche-turbolinks.jpg)

터보링크 앞에 붙은 "터보" 역시 그런 의미로 붙여졌을 것이다. 새 레일스 프로젝트를 생성하는 바로 그 순간부터 터보링크가 적용되니 빠르다고 하지 않을 수 없다. 그렇지만 터보링크는 옛날 볼랜드 제품군이 주름잡던 시절의 그 "터보"만큼 강력한 것 같지는 않다. 

그렇다면 언제 사용하면 좋을까?

국내에서 만들어지는 웹서비스들의 경우 아직은 SPA 방식 보다는 전통적인 서버측 HTML 렌더링 방식을 사용하는 쪽의 비중이 훨씬 높은 것이 사실이다. 자바스크립트 MV* 프레임워크나 CDN을 적용하는 곳도 그렇게 많지는 않은 것 같다. 이런 전통적인(?) 방식의 웹 개발 환경에서라면 터보링크는 분명  "최소 노력으로 최대 효과"를 얻을 수 있는 실용적인 접근이 될 수 있을 것 같다. 특히 기존에 레일스로 만들어진 웹사이트의 모바일 버전을 새로 만드는 경우가 터보링크를 적용하기에 가장 적합한 유스케이스가 아닐까 생각된다. [37signals가 그랬듯이]((http://37signals.com/svn/posts/3269-behind-the-speed-basecamp-mobile)).

레일스 개발자들은 대부분 [실용주의 개발자](http://www.insightbook.co.kr/books/ppp/%EC%8B%A4%EC%9A%A9%EC%A3%BC%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8)들이다. 필요하면 쓰고 아니면 안쓰면 된다.  터보링크를 레일스 디폴트로 두면서 [DHH](http://37signals.com/svn/writers/dhh)가 했던 생각도 아마 그런 게 아니었을까. "내가 써 봤는데 좋더라구. 너도 한번 써 봐!" 맘에 안들면? 혹은 필요 없으면? [안쓰면 그만](http://blog.steveklabnik.com/posts/2013-06-25-removing-turbolinks-from-rails-4)이다.

터보링크의 사용법은 [Rails Guides](http://guides.rubyonrails.org/working_with_javascript_in_rails.html#turbolinks)와 [터보링크 README 파일](https://github.com/rails/turbolinks/blob/master/README.md)에 잘 나와 있으니 참조하면 된다.


