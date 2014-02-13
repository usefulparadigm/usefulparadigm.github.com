---
layout: post
title: 워드프레스 기반 안드로이드 앱 만들기
description: 이제 워드프레스는 단순히 웹사이트를 만드는 도구만이 아닙니다. 워드프레스를 기반으로 다양한 모바일 앱들을 쉽게 만들 수 있습니다. 여기서는 워드프레스를 기반으로 하는 하이브리드 방식의 안드로이드 앱 만들기를 소개합니다.
categories: [mobile, web development, wordpress] 
tags: []
---

아직도 [워드프레스(WordPress)](http://wordpress.org/)를 그저 블로그 만드는 툴 쯤으로 생각하고 계신 분들이 계실지 모르지만, 워드프레스는 이미 블로깅 도구를 넘어 범용 콘텐트 관리 시스템(Content Management System)으로 자리매김한지 오래입니다. 해외는 물론 국내에서도 워드프레스를 기반으로 자사의 홈페이지나 웹사이트를 제작하려는 곳이 늘고 있다는 것은 이미 오래 전에 [소개](/2012/03/17/creating-static-website-with-wordpress/)해 드린 적이 있습니다만, 최근엔 여기서 한발 더 나아가 단순 웹사이트 용도가 아니라 일정한 기능을 갖추고 온라인 서비스를 제공하는 웹 애플리케이션으로까지 그 용도가 확장되는 추세입니다. 아예 워드프레스를 웹 개발 프레임워크(framework)로 사용하는 케이스도 생기고 있구요. 맞습니다. 흔히 사용되고 있는 [레일스(Ruby on Rails)](http://rubyonrails.org/) 나 [장고(Django)](https://www.djangoproject.com/)와 같은 바로 그 프레임워크입니다.

워드프레스와 모바일
-----

요즘은 모바일 세상입니다. 워드프레스라고 예외가 될 순 없겠죠. 그래서인지 최근 워드프레스의 행보도 모바일을 지원하는 방향으로 발빠르게 움직이고 있습니다. 물론 워드프레스는 아주 오래 전부터 모바일 환경에 대응해 왔습니다. 모바일 페이지 전용 플러그인부터 반응형웹(responsive web)을 지원하는 테마까지 즐비합니다. iOS나 Android 운영체제에서 워드프레스 사이트를 손쉽게 관리할 수 있도록 모바일 앱들이 이미 출시되어 있고, 최근의 워드프레스 판올림(3.8버전)에서는 어드민 페이지까지 모바일 환경에 맞춰 최적화시켜 두고 있으니(아래 사진) 아마도 워드프레스는 현존하는 콘텐트 관리 도구들 중 모바일 환경을 가장 잘 지원하는 도구라 해도 거짓은 아닐 정도입니다.

![](http://usefulpa.s3.amazonaws.com/images/2014/Screenshot_20140213_113109.png)

여기에 반응형웹 테마도 빠질 수 없겠죠. 반응형웹 기반 테마를 사용하면 소위 "One Source Multi Use" 가 쉬워집니다. 요즘 나오는 거의 모든 워드프레스 테마들이 반응형웹 지원을 기본으로 하고 있으니 워드프레스에서 모바일 디바이스를 지원하는 웹사이트를 제작하는 것은 일도 아닙니다. 그만큼 쉽고 이보다 더 간단할 수 없습니다. 더 이상 뭐가 필요할까요?

워드프레스와 안드로이드가 만나면?
-----

그럼에도 가끔은 이런 니즈(needs)가 생길 때도 있습니다. 

> "지금 우리가 사용하는 이 워드프레스 사이트의 콘텐트를 기반으로 안드로이드 앱을 만들 순 없을까?"

네, 물론 가능합니다. [플러인들](http://premium.wpmudev.org/blog/5-plugins-to-turn-wordpress-into-a-mobile-app/)도 있고 이미 해외에는 (자동화 서비스를 포함) 이 작업을 대행해주는 서비스들도 여럿 있습니다. 그렇지만 직접 만드는 것도 별로 어려운 일은 아닙니다. 쓸 수 있는 도구들이 이미 다 갖춰져 있기 때문에 간단한 안드로이드앱 정도라면 별로 어렵지 않게 뚝딱 만들어 [Google Play 스토어](https://play.google.com/store)에 바로 올릴 수 있습니다. 이게 오늘 소개하려는 내용입니다. 

![](http://usefulpa.s3.amazonaws.com/images/2014/Screenshot_20140213_113936.png)

워드프레스를 기반으로 안드로이드 앱을 만드는 방법에는 여러 가지가 있습니다만, 여기서는 다음과 같은 방식(+단계)로 만들어 나가기로 하겠습니다.

1. 워드프레스에서 API 공개하기
2. 간단한 모바일 웹 페이지 만들기
3. 사용자 인터페이스 꾸미기
4. 하이브리드 앱으로 변경하기
5. Play 스토어에 올리기

이 중 4번(하이브리드 앱으로 변경)과 5번(Play 스토어 올리기) 부분은 이미 다른 곳에 많은 자료들이 나와 있고 또 별로 설명할 부분이 없기 때문에 주로 1~3번 중심으로 설명을 이어 가도록 하겠습니다.

워드프레스 API 공개하기
-----

워드프레스로부터 안드로이드나 iOS같은 모바일 앱을 만들기 위해서는 우선 워드프레스로부터 콘텐트만을 추출해 낼 수 있어야 합니다. 이 작업은 주로 API라는 방식을 통해 이루어지게 되는데, 워드프레스는 이미 공개할 수 있는 API를 갖추고 있습니다. 워드프레스에서는 XML-RPC라는 방식을 사용하는데 주로 이 기능은 외부 블로깅 도구에서 워드프레스를 액세스할 때 많이 사용됩니다. 워드프레스 3.5 버전 부터는 디폴트로 켜져있기 때문에 사용자가 따로 설정하거나 할 부분은 없습니다. [XML-RPC의 자세한 내용](http://codex.wordpress.org/XML-RPC_Support)은 워드프레스 문서 저장소인 Codex에서 확인할 수 있습니다. 

다만 이 XML-RPC 방식은 웹 페이지에서 사용하기엔 조금 까다롭습니다. 그래서 웹 상에서 API를 다룰 때는 이 XML 방식보단 JSON 포맷으로 데이터를 받을 수 있는 방식을 주로 사용하게 됩니다. 워드프레스는 아직 자체적으로는 이 JSON 방식의 API는 제공하지 않지만, 워드프레스 플러그인들 중에는 이미 이 기능을 제공하는 것들이 많이 나와 있습니다. 여기서는 그 중 하나인 [JSON API 플러그인](http://wordpress.org/plugins/json-api/)을 사용하기로 하겠습니다. 플러그인 설치는 여타 다른 플러그인들과 다를 게 없으므로 생략합니다. 이 플러그인을 설치한 후 API를 호출하면 워드프레스의 포스트들이 다음과 같이 JSON 형식으로 추출됩니다. 이 플러그인이 공개하는 JSON API의 자세한 사용법은 아래 참고자료의 문서를 참조하면 됩니다.

![](http://usefulpa.s3.amazonaws.com/images/2014/Screenshot_20140213_115801.png)

프론트 페이지 구성하기
-----

워드프레스로부터 JSON 데이터를 추출하였으면, 이제 이 데이터를 읽어서 보여줄 페이지가 필요합니다. 하이브리드(hybrid) 방식의 모바일 앱으로 만들 것이기 때문에 여기서 만든 웹 페이지가 앱의 화면이 됩니다. 모바일웹 페이지를 만드는 방식은 워드프레스라고 해서 다를 게 없습니다. 일반적으로 모바일웹(앱)을 만드는 방식 대로 만들어 주면 됩니다. 여기서는 자바스크립트 라이브러리 중 [Backbone.js](http://backbonejs.org/)를 사용하여 워드프레스로부터 JSON API를 불러 화면에 표시하는 방법을 썼지만, 이 부분은 어디까지나 취향 문제입니다. 여러분 취향에 맞게 가져가면 됩니다. 굳이 Backbone.js를 쓴 까닭은 이 라이브러리가 비교적 간단하게 모듈화된 구조를 만들 수 있는 [자바스크립트 MVC 프레임워크](http://todomvc.com/) 중 하나이기 때문입니다.

웹페이지의 구조나 내용은 아래 참고자료의 데모 소스를 참고하면 되니, 사용법만 간단히 소개합니다. 아래 코드는 이 프로그램의 시작 부분인 [main.js](https://github.com/usefulparadigm/chocosteak/blob/master/app/scripts/main.js) 파일인데, 이 부분에서 apiURL 값만 변경해 주면 됩니다. 여기서는 저희가 운영 중인 워드프레스 사이트인 [쿠킹페이스북](http://cookinfacebook.com/) 으로부터 API를 불러오고 있습니다.

	window.chocosteak = {
	    Models: {},
	    Collections: {},
	    Views: {},
	    Routers: {},
	    appConfig: {
	        // Your WordPress Home URL
	        apiURL: 'http://cookinfacebook.com/api'
	    },
	    init: function () {
	        'use strict';
	        this.appRouter = new this.Routers.AppRouter();
	        Backbone.history.start();
	    }
	};
	
	$(document).ready(function () {
	    'use strict';
	    chocosteak.init();
	});

UI 프레임워크 적용
-----

뼈대를 만들었으니 예쁘게 꾸미는 일만 남았습니다. 디자인 작업입니다. 물론 직접 그래픽 도구로 디자인 시안을 작성하고 이 시안에 맞춰 UI를 만들어 내는 게 정석(?) 이겠지만, 여기서는 오픈소스 UI 프레임워크 중 하나인 [ChocolateChip-UI](http://www.chocolatechip-ui.com/) 를 사용하기로 하겠습니다. 앞서와 마찬가지로, 이번에도 꼭 ChocolateChip-UI를 사용할 필요는 없습니다. 다른 좋은 UI 프레임워크 도구들도 많이 나와 있으니 그 중 취향에 맞는 것으로 골라 쓰면 됩니다. 저희가 ChocolateChip-UI를 선택한 이유는 무엇보다 제목이 달콤해 보였기 때문입니다.^^

![](http://usefulpa.s3.amazonaws.com/images/2014/chocochipuishot.png)

ChocolateChip-UI는 npm을 제공하고 [Grunt](http://gruntjs.com/)나 [Gulp](http://gulpjs.com/) 같은 빌드 도구들도 지원하기 때문에 자바스크립트에 익숙한 분들이라면 조금 더 쉽게 설치하고 구성할 수 있습니다. [Bower](http://bower.io/)로도 설치할 수도 있구요. 안드로이드 뿐 아니라 iOS와 Windows Phone 8의 룩앤필에 맞는 각각의 UI 스타일도 제공하기 때문에 이들 디바이스에 맞는 UI를 구성하는 일도 어렵지 않습니다.

![](http://usefulpa.s3.amazonaws.com/images/2014/chocochipuidemo.png)

여기서는 이 UI 프레임워크를 Backbone.js의 템플릿으로 사용하였습니다. 템플릿 적용 방법은 아래 참고자료에 나와 있는 문서와 소스코드를 참고하면 될 것입니다.

하이브리드 앱으로 포장하여 Play 스토어로!
-----

여기까지 작업이 끝나면 이제 이렇게 만든 웹페이지(모바일웹앱)을 하이브리드(hybrid) 앱으로 만들어 앱스토어에 올리기만 하면 됩니다. 하이브리드 앱을 만드는 도구들 역시 여럿 나와 있기 때문에 그 중 하나를 사용하면 되지만, 여기서는 그 중 오픈소스 [Apache Cordova](http://cordova.apache.org/)(흔히 PhoneGap이라 불리웠고, 지금은 조금 다른 길을 걷고 있는)를 사용하였습니다.  이미 모바일웹앱으로 만들어 놓은 코드를 Cordova 에서 지정한 디렉터리로 복사하여 안드로이드 앱으로 빌드한 다음 테스트하고 Play 스토어에 올리면 되는 과정입니다. 작업이 다소 복잡할 수도 있지만, 이미 이에 관한 부분들은 인터넷 상에 좋은 문서들이 많이 나와 있기 때문에 지면관계상 설명은 생략합니다.

![](http://usefulpa.s3.amazonaws.com/images/2014/cookinfbongoogleplay.png)

사실 이런 생각을 가질 수도 있습니다. 반응형웹을 지원하는 웹사이트 정도면 충분하지 않을까? 굳이 이렇게 하이브리드 형태로 앱을 만들 필요가 있을까? 그렇지만 워드프레스를 일종의 콘텐트 "플랫폼(platform)"이라고 생각하고 모바일 디바이스들을 하나의 "브랜치(branch)" 개념으로 본다면, 디바이스마다 그에 적합한 별도의 앱을 만들어 사용자 저변을 확대하고 사용자들의 다양한 니즈에 부합하는 것도 좋은 전략이라 생각이 듭니다. 특히 지금처럼 별로 어렵지 않게 디바이스를 확장해 나갈 수 있다면 말이죠. 게다가 여기서는 어디까지나 모바일웹을 하이브리드 형태로 옮기는 부분까지만 소개했지만, 하이브리드 앱에서는 그 밖에도 모바일 디바이스에서만 사용할 수 있는 다양한 기능들을 추가해 나갈 수 있기 때문에 모바일 앱만의 특유한 방식으로 사용자 경험을 확장해 나갈 수도 물론 있구요.

여기서부터 시작입니다!

참고자료
-----

* [JSON API 문서](http://wordpress.org/plugins/json-api/other_notes/)
* [ChocolateChip-UI 문서](http://www.chocolatechip-ui.com/documentation)
* [Apache Cordova 문서](http://cordova.apache.org/docs/en/3.3.0/)
* [데모 소스](https://github.com/usefulparadigm/chocosteak)

