---
layout: post
title: 클라우드 기반에 Facebook App 호스팅하기
description: 페이스북 앱과 같은 소셜 플랫폼 기반의 앱을 개발할 경우 고려야 할 문제 중 하나는 갑작스런 사용자수 증가에 따른 확장성(scalability) 문제입니다. 이에 대한 대비책 중 하나는 아마존(AWS)이나 Heroku 같은 클라우드 기반에 앱을 호스팅하는 것입니다.
thumbnail: 
category: facebook
---

최근 페이스북이 클라우드 플랫폼인 [Heroku를 자사의 애플리케이션 배포 플랫폼에 추가](https://developers.facebook.com/blog/post/558/)함에 따라 이제 페이스북 개발자들은 별도의 호스팅 절차 없이도 간단하게 페이스북 앱(
[웹사이트](https://developers.facebook.com/docs/guides/web/) 방식이든 
[캔버스앱](https://developers.facebook.com/docs/guides/canvas/)이든)을 개발할 수 있게 되었다.

물론 굳이 이런 밀겹합(deep integration) 방식을 사용하지 않더라도 페이스북 앱을 장착할 수 있는 다양한 클라우드 기반들이 이미
많이 존재한다. 클라우드 기반에서 페이스북 앱을 호스팅할 수 있는 몇 가지 방안을 소개한다.

### Heroku에 호스팅하기

가장 간단한 방법은 페이스북 앱 등록 페이지에서 제공하는 클라우드 서비스를 이용하는 방법이다. 이 때 클라우드 서비스를 추가하면 실제로는 클라우드 기반 앱 플랫폼인 Heroku와 연동된다. Heroku는 이전에는 루비 기반 앱만 호스팅할 수 있었지만 최근 Java, PHP, Node.js 등 다양한 개발 언어를 지원하는 '[Polyglot Platform](http://blog.heroku.com/archives/2011/8/3/polyglot_platform/)'으로 전환하였다.

Facebook 앱 등록 페이지에서 호스팅 서비스 추가를 클릭하면 다음과 같이 페이스북 앱 개발 시에 사용할 언어를 선택하는 옵션이 나오고 이 때 적절한 언어를 선택하고 나서 클릭하면 바로 디폴트 앱이 생성되는 것을 확인할 수 있다. 

![클라우드 서비스 추가하기](http://farm7.staticflickr.com/6230/6386632221_cb4f3140e5.jpg)

다음과 같이 디폴트 앱이 생성되어 브라우저에 보여진다.

![페이스북 디폴트 앱](http://farm7.staticflickr.com/6043/6386632457_e6722f4eb3_z.jpg)


이제 다시 페이스북 앱 등록 페이지로 와서 보면 페이스북 앱과 연동된 클라우드 서비스의 Hosting URL이 등록된 것을 확인할 수 있을 것이다. 물론 이 URL은 Heroku로 접속하여 변경할 수 있고, 기존에 Heroku에서 제공하는 다양한 부가서비스들도 동일하게 이용할 수 있다. 참고로 페이스북 앱 등록 페이지를 통해 설치되는 Heroku의 디폴트 앱에 대한 소스코드는 아래 github에서 확인할 수 있다.

* PHP [https://github.com/heroku/facebook-template-php](https://github.com/heroku/facebook-template-php)
* Node.js [https://github.com/heroku/facebook-template-nodejs](https://github.com/heroku/facebook-template-nodejs)
* Python [https://github.com/heroku/facebook-template-python](https://github.com/heroku/facebook-template-python)
* Ruby [https://github.com/heroku/facebook-template-ruby](https://github.com/heroku/facebook-template-ruby)


### 아마존 웹서비스 클라우드(AWS cloud)에 호스팅하기

아마존 웹서비스 클라우드 환경에 Facebook 앱을 호스팅하는 방법은 여러 가지 있지만 가장 간단한 방법 중 하나는 아마존 웹서비스 중 하나인 [AWS CloudFormation](http://aws.amazon.com/cloudformation/) 서비스를 이용하는 것이다. 

![설치 단계](http://awsmedia.s3.amazonaws.com/articles/FB-apps-on-AWS-9-2011/fig1.png)  

다음과 같이 AWS CloudFormation 관리 콘솔에서 [Facebook 앱용 템플릿](http://s3.amazonaws.com/aws-facebook/SampleFacebookPHP.template)의 URL을 지정하면 바로 페이스북 앱을 생성할 수 있다. 이 때 Facebook AppId, Secret 정보와 AWS 계정 정보 등을 앱 실행에 필요한 정보들을 추가로 입력해 주어야 한다.

![AWS Facebook 앱 템플릿 등록](http://farm8.staticflickr.com/7158/6387710847_d00f26377f_z.jpg)

![AWS 앱 등록 폼](http://farm8.staticflickr.com/7033/6387710589_3d64302357.jpg)

EC2 스택이 새로 생성되고 Facebook PHP SDK 등 관련된 파일이 셋팅되는 동안 잠시 기다리면 다음과 같이 설치가 완료되고 CREATE_COMPLETE 메시지가 출력된다. 이때 생성되는 SiteURL 값을 페이스북 앱 등록 페이지에서 설정해 주면 AWS와 Facebook 간의 연동이 완료된다.

![AWS 설치 완료](http://farm8.staticflickr.com/7144/6387729251_2bacf6544d_z.jpg)

이 때 사용된 페이스북 앱의 소스코드는 다음 URL에서 확인할 수 있다.

* [http://aws-facebook.s3.amazonaws.com/aws-facebook-php-v1.tar.gz](http://aws-facebook.s3.amazonaws.com/aws-facebook-php-v1.tar.gz)

### Google App Engine에 호스팅하기

Facebook 캔버스 앱이라고 해서 구글 앱 엔진에 앱을 호스팅하는데 달라지는 점은 전혀 없다. 통상적인 Google App Engine(GAE) 사용 절차에 따라 앱을 개발하여 배포하고 페이스북 개발자 페이지에서 앱 URL을 등록해 주면 된다. 다만 GAE가 현재 Python, Java, Go 언어만을 지원하기 때문에 PHP로 된 앱은 배포할 수 없다. 페이스북 개발자 문서에서 GAE에 Python 기반 Facebook Canvas App을 만드는 [튜토리얼](https://developers.facebook.com/docs/samples/canvas/)이 소개되어 있으니 자료로 참조하면 좋을 것이다.

![Sample Canvas App](https://developers.facebook.com/attachment/canvas-sample-main-app.png)


### 참고자료

* [Facebook and Heroku](http://blog.heroku.com/archives/2011/9/15/facebook/)
* [Getting Started with Your Facebook App on Heroku](http://devcenter.heroku.com/articles/facebook)
* [Hosting Facebook Applications on Amazon EC2](http://aws.amazon.com/articles/1044)
* [Sample Canvas App on GAE](https://developers.facebook.com/docs/samples/canvas/)
 