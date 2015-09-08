---
layout: post
title: 웹앱을 위한 REST API 서버 솔루션들
description: 프론트엔드 웹앱을 지원하기 위한 REST API 서버로 사용할 수 있는 솔루션에는 어떤 것들이 있을까요? 구축형과 설치형, 그리고 클라우드 서비스로 나눠 간단하게 몇 가지 솔루션들을 소개합니다. 
thumbnail: https://usefulpa.s3.amazonaws.com/images/2015/Web_Image_2015-09-08_10-05-07.png
categories: ["web development"]
tags: []
---

![REST API Server Solutions](https://usefulpa.s3.amazonaws.com/images/2015/rest-api-server-solutions.png)

모바일 환경이 사용자 경험의 중심으로 자리잡으면서 애플리케이션 개발에서도 프론트엔드(frontend) 영역이 차지하는 비중이 갈수록 커지고 있습니다. iOS나 Android 같은 모바일앱은 말할 것도 없고 웹앱 영역에서도 '한페이지 앱([Single Page Application](https://en.wikipedia.org/wiki/Single-page_application))'의 필요성은 점점 증가하고 있습니다. 이런 추세는 당연히 프론트엔드 웹개발 프레임워크들에도 반영이 되어 [Backbone.js](http://backbonejs.org/) 를 필두로 [Angular](https://angularjs.org/)나 [Ember](http://emberjs.com/), 그리고 최근 hot한 바람몰이를 하고 있는 [React](https://facebook.github.io/react/index.html)에 이르기까지 대부분의 프레임워크들이 모두 한페이지 내에서 처리되는 웹앱을 만드는데 초점이 맞춰져 있습니다.

이런 프론트엔드 중심 개발 흐름은 기존의 서버 중심 웹개발을 상당 부분 '무력화'시킵니다. 웬만한 렌더링(rendering)은 서버에서 모두 처리되어 클라이언트는 그저 서버로부터 받은 "화면"을 잘 뿌리기만 하면 되던 때는 이제 아련한 옛추억이 되어가고 있습니다. 오늘날 서버는 갈수록 API 서버, 특히 REST 기반의 API 서버로 탈바꿈하여 클라이언트의 요청에 맞춰 JSON 데이터를 제공하는 역할을 담당하는 쪽으로 변했습니다.

사실 서버를 개발하는 입장에서는 웹 브라우저나 여러 가지 렌더링 이슈들에 신경쓸 필요 없이 단순하게 데이터를 클라이언트로 넘기기만 하면 되기 때문에 예전보다 훨씬 할일이 줄어들었다고도 할 수 있습니다. 그렇지만 다양한 프론트엔드 측의 처리를 효과적으로 지원하기 위해서는 REST API의 비중 또한 커지기 마련입니다. '그저' JSON 데이터를 보내는데 그치는 게 아니라 API의 설계부터 HTTP 연동, 데이터 패킷 구성이나 API 인증과 같은 다양한 이슈들의 처리가 중요해집니다. 

그렇다면 이런 프론트엔드 웹앱을 지원하기 위한 REST API 서버로 사용할 수 있는 솔루션에는 어떤 것들이 있을까요? 더 다양한 방법들이 많이 있겠지만 여기서는 크게 구축형과 설치형, 그리고 클라우드 서비스로 나눠 간단하게 몇 가지만 소개해 보기로 합니다. 웹앱이 중심이지만 여기서 소개한 REST API 서버 솔루션들은 모바일앱의 백엔드(backend)로도 동일하게 사용될 수 있습니다.

## 구축형 솔루션

구축형 솔루션은 말 그대로 API 서버를 직접 구축하는 것입니다. 지구 상에 존재하는 거의 대부분의 프로그래밍 언어는 웹개발을 지원하기 때문에 그 중 선호하는 언어를 사용하여 API 서버를 구성할 수 있겠지만, 그 전에 시중에 나와있는 툴킷(toolkit)이나 프레임워크(framework)들은 없는지 먼저 검토하는 것이 "바퀴를 새로 만들지 않는" DRY한 방법입니다. 저희는 주로 서버측 API 개발에 루비(ruby)를 사용하기 때문에 루비를 중심으로 소개하면 다음과 같은 솔루션들이 있습니다.

### [Sinatra](http://www.sinatrarb.com/) 
시나트라(Sinatra)는 간단한 웹 애플리케이션을 신속하게 만들 수 있게 해주는 루비기반 웹개발 툴킷입니다. 시나트라 자체는 특별히 API 서버를 염두에 두고 만들어지지 않았지만 웹요청의 결과물을 JSON으로 출력하기만 하면 바로 간단한 JSON 서버가 됩니다. 비슷한 개념의 도구로 파이썬 기반의 [Flask](http://flask.pocoo.org/)나 PHP 기반의 [Slim](http://www.slimframework.com/) 같은 도구들이 있습니다.

### [Grape](http://www.ruby-grape.org/) 
다른 많은 프로그래밍 언어들과 마찬가지로 루비에서도 API 서버 구현을 도와주는 많은 오픈소스 라이브러리들이 있으며 Grape도 그 중 하나 입니다. Grape는 앞서 소개한 Sinatra를 비롯한 [다양한 웹 개발 환경에서 사용](http://www.ruby-grape.org/examples/) 가능 합니다. 그 밖에 [Rabl](https://github.com/nesquena/rabl), [Praxis](http://praxis-framework.io/), [FastAPI](https://github.com/thestorefront/FastAPI) 등도 검토해볼만 합니다.

### [Rails](http://rubyonrails.org/)
루비온레일스(Ruby on Rails)는 별도의 설명이 필요없는 인기있는 웹 개발 프레임워크입니다. 레일스는 오래 전부터 REST를 지원해 왔고 [컨텐츠 협상(content negotiation)](https://en.wikipedia.org/wiki/Content_negotiation)을 통해 다양한 포맷으로 데이터를 내보낼 수 있습니다. 레일스를 웹앱이 아닌 REST API 서버로만 사용하도록 해주는 [Rails API](https://github.com/rails-api/rails-api) 프로젝트도 있으며 이 프로젝트는 [Rails 5에서 Rails Core 속에 통합될 예정](http://wyeworks.com/blog/2015/4/20/rails-api-is-going-to-be-included-in-rails-5/) 입니다.


## 설치형 솔루션

구축형 솔루션이 API 설계부터 구현까지 직접 처리해야 하는 솔루션이라면 설치형 솔루션은 이미 갖춰진 API 서버를 설치하여 사용하기만 하면 되는 솔루션입니다. 물론 입맛에 맞게 사용하려면 약간의 '양념(customizing)'이 필요할 수 있지만, 바로 설치해서 신속하게 사용할 수 있는 점은 큰 장점입니다. 

### [LoopBack](http://loopback.io/)
엄밀히 말해 LoopBack은 Node.JS 기반의 웹 프레임워크입니다. Node 기반에서 작동하는 [다양한 웹 프레임워크들](http://loopback.io/resources/#compare)이 있지만, 특히 LoopBack은 다른 웹 프레임워크들과는 달리 REST API 서버 개발에 그 용도가 특화되어 있고 또 CLI를 통해 간단한 명령만으로 바로 API를 구성할 수 있다는 점에서 설치형 솔루션이라고 해도 무방할 듯 합니다.

### [WordPress](https://wordpress.org/)
워드프레스가 REST API 서버라구요? 맞습니다. 워드프레스는 주로 웹사이트 제작에 사용하는 CMS 도구입니다. 그렇지만 최근 워드프레스의 인기와 함께 활용도가 높아지면서 [워드프레스를 웹사이트 제작 이외의 용도로 사용하려는 움직임](http://wptavern.com/decoupling-wordpress)이 커지고 있습니다. (어쩌면 웹개발의 자연스런 흐름을 반영한 것이겠지만) 최근 출시된 [WP REST API](http://v2.wp-api.org/) 는 왠만한 REST API 서버로 쓰기에도 손색 없는 수준입니다.


## 클라우드 솔루션

구축도 설치도 필요 없고 그저 가입만 하고 인증절차만 거치면 바로 사용할 수 있는 솔루션이 클라우드 솔루션입니다. 소위 "[Paas](https://ko.wikipedia.org/wiki/PaaS)" 또는 "[Baas](https://en.wikipedia.org/wiki/Mobile_Backend_as_a_service)"라고 불리우는 이들 솔루션들은 REST API 서버 개발의 부담은 줄이면서 프론트엔드 개발에만 집중할 수 있다는 점에서 특히 모바일앱 개발자들에게 인기가 많은 솔루션입니다.

대표적인 서비스로 페이스북이 인수하여 운영하는 [Parse](https://www.parse.com/)와 구글이 인수한 [Firebase](https://www.firebase.com/)가 있습니다. 국내에서도 KT에서 운영하던 '바스아이오'(bass.io) 라는 서비스가 있었고 저희 블로그에서도 한번 [소개한](http://www.usefulparadigm.com/2013/05/23/some-thought-about-baasio/) 적이 있지만 현재는 [서비스가 종료된](https://www.imaso.co.kr/news/article_view.php?article_idx=20150523141832) 상태입니다.

-----

최근의 웹개발 흐름이 모바일앱과 웹앱 등 주로 프론트엔드 부분에 많은 초점이 맞춰진 것이 사실이고 또 사용자 UI의 중요성이 커짐에 따라 갈수록 프론트엔드 개발의 중요성은 더 커지겠지만 이런 프론트엔드는 탄탄한 백엔드의 뒷받침 없이는 지속가능한 서비스로 이어질 수 없다는 점에서 '묵묵히(?)' 뒤에서 떠받치는 REST API 서버는 없어서는 안 될 웹서비스의 진정한 핵심입니다. 또한 이미 완성되어 더 이상 풀어야할 문제가 남지 않은 영역이 아니라 계속해서 새로운 시도와 혁신들이 이뤄지고 있는 '진화하는' 영역이기도 합니다. 최근 페이스북이 공개한 [GraphQL](https://facebook.github.io/graphql/)이나 Netflix의 데이터 추출 도구인  [Falcor](http://netflix.github.io/falcor/), API를 위한 토큰인증 표준인 [JWT(JSON Web Tokens)](http://jwt.io/) 등은 모두 이런 진화의 반증일테죠.

다음에 기회가 되면 이들 솔루션들도 하나하나 소개해 나가기로 하겠습니다.
<br>
<br>

**P.S.** 마침 서점에 REST API를 다룬 좋은 책이 한권 나왔네요. 비록 번역서이긴 하지만, 프론트엔드 개발 일변의 책들이 쏟아지는 속에서 반가운 소식이 아닐 수 없습니다(저희는 이 책의 역자 또는 이 책의 출판사와는 아무런 이해관계도 없답니다. 그저 반가운 마음에^^). 

[RESTful Web API (웹 API를 위한 모범 전략 가이드)](http://www.insightbook.co.kr/post/9865)<br>
레오나르드 리처드슨, 마이크 애먼슨 외 1명 저 | 박세현 외 1명 역 | 인사이트 | 2015.09.09

![](https://usefulpa.s3.amazonaws.com/images/2015/restful-web-api-cover.jpg)

