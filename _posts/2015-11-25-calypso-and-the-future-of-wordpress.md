---
layout: post
title: "Calypso와 WordPress의 미래"
description: WordPress.com의 새로운 프론트엔드 대시보드 "칼립소(Calypso)"가 워드프레스 플랫폼 생태계와 워드프레스의 미래에 어떤 영향과 시사점을 주는지 한번 생각해 봅니다. 
thumbnail: https://usefulpa.s3.amazonaws.com/images/2015/Web_Image_2015-11-25_12-37-21.png
categories: ["essay", "wordpress"]
---

엊그제(11/23) [WordPress.com](https://wordpress.com/)의 개발사이자 운영사인 [Automattic](https://automattic.com/)에서 코드명을 '[칼립소(Calypso)](https://developer.wordpress.com/calypso/)'로 명명한 새로운 워드프레스 어드민 인터페이스를 선보였습니다. 이미 WordPress.com에 적용되었고 설치형 워드프레스를 사용하는 경우도 [JetPack 플러그인](http://jetpack.me/)을 연동한 사이트라면 마찬가지로 이 새 인터페이스를 사용할 수 있습니다. 여기에 더해 칼립소 코드 자체는 오픈소스로 [GitHub](https://github.com/Automattic/wp-calypso)에 공개하였고 [맥 사용자들을 위한 데스크톱용 앱](https://desktop.wordpress.com/)도 함께 출시하였습니다.

![](https://usefulpa.s3.amazonaws.com/images/2015/introducing-wp-calypso.png)

얼핏 생각하면, 하루가 멀다하게 새로운 기능과 업데이트들을 쏟아내고 있는 워드프레스가 새 인터페이스를 하나 선보인 게 뭐 그리 대수로운 일일까 생각할 수 있습니다. 혹은 갑작스런 인터페이스의 변화에 짜증이 나거나 조금 당황스러워하는 사용자들도 있을 것입니다. 인터페이스가 좀 변하긴 했지만 예전보다 기능도 좋아졌고 또 더 빨라졌다고 하니 그냥 새 인터페이스에 적응하면서 쓰면 되지 하고 생각하면 그만입니다. 

그런데 워드프레스라는 하나의 플랫폼(platform) 입장에서 바라보면 이번의 이 변화는 기존의 여느 판올림들과는 성격이 조금 다른, "제법 중요한" 시도입니다. 왜 그런지, 그리고 이번의 이 칼립소 프로젝트가 [이미 전 세계 웹사이트의 약 25%를 장악](http://w3techs.com/technologies/history_overview/content_management/all/y)하고 있는 워드프레스의 미래에 어떤 영향을 미칠 수 있을지 한번 생각해 보기로 하겠습니다.

우선 칼립소 프로젝트가 무엇인지부터 정확하게 알 필요가 있습니다. 오픈소스로 공개된 [칼립소 프로젝트의 GitHub](https://github.com/Automattic/wp-calypso)에는 칼립소를 다음과 같이 소개하고 있습니다.

![About Calypso](https://usefulpa.s3.amazonaws.com/images/2015/what-is-calypso.png)

즉, 칼립소는 싱글페이지 웹앱(Single Page Webapp) 방식으로 제작된 WordPress.com의 새로운 관리자 대시보드로, WordPress.com의 [REST API](https://developer.wordpress.com/docs/api/)를 기반으로 동작합니다. 기술적으로는 [Node](https://nodejs.org/en/)나 [Express](http://expressjs.com/), [React](https://facebook.github.io/react/)와 [Flux](https://facebook.github.io/flux/) 같은 최근 프론트엔드 중심의 웹개발에서 흔히 사용하는 인기있는 오픈소스 기술들을 사용하였습니다.

그럼 뭐가 바뀐걸까요? 알다시피 기존의 워드프레스는 PHP 기반이었습니다. 물론 프로그램 여기저기에서 자바스크립트(특히 jQuery)가 사용되고 있었지만, 주는 어디까지나 서버측 웹 개발 언어인 PHP를 기반으로 하고 있었습니다. 그런데 이번의 칼립소 프로젝트에는 PHP가 단 한줄도 사용되지 않았습니다. 대신 서버측 구현에는 Node/Express를 사용하여 thin 서버 방식으로 처리하고 실제 모든 기능들은 React와 JavaScript, 그리고 워드프레스의 REST API를 사용하여 클라이언트 측에서 처리하는 것으로 바뀌었습니다. 

![](https://usefulpa.s3.amazonaws.com/images/2015/wp-calypso-languages.png)

얼핏 생각하기엔, 최근 새로운 블로깅 플랫폼으로 각광받는 [미디엄](https://medium.com/)이나 워드프레스의 대안으로 떠오르는 Node 기반의 CMS 플랫폼인 [ghost](https://ghost.org/)를 따라한건가 하는 생각도 들 것입니다. 워드프레스가 지금껏 10년 넘게 써오던 PHP를 버리고 Node 기반으로 갈아탄 건가하는 의문도 생길 수 있습니다. 물론 전혀 아닙니다. 워드프레스(엔진) 자체는 여전히 PHP 기반으로 동작하고 그 사실은 앞으로도 변화가 없을 것입니다. 다만 이번 칼립소 프로젝트의 시도는 워드프레스가 기존의 웹사이트 제작 도구에서 한걸음 더 나아가 웹애플리케이션을 위한 기반 플랫폼으로서의 변화를 시도한 것이라고 보는 것이 맞을 것입니다.

즉, 지금까지의 워드프레스가 PHP를 기반으로, 어드민 대시보드와 플러그인 시스템, 그리고 테마가 모두 한데 결합되어 있는 방식이었다면(아래 그림),

![](https://usefulpa.s3.amazonaws.com/images/2015/wp-architecture-asis.png)

앞으로의 워드프레스는 아마도 이런 그림이 될 듯 싶습니다. 즉 워드프레스는 콘텐츠를 저장하고 관리하는 API 서버로 동작하고, 대시보드와 테마를 포함한 모든 프론트엔드는 이 API 서버의 클라이언트로서 독립해서 동작하는 방식입니다. 이번의 칼립소 프로젝트는 이에 기반한 워드프레스의 공식적인 첫 번째 시도구요.

![](https://usefulpa.s3.amazonaws.com/images/2015/wp-architecture-tobe.png)

어찌보면 이번 시도는 이미 시장을 완전히 장악한 벤더가 시도하기엔 조금 무모한 시도 같아 보이기도 합니다. 그래서인지 Automattic의 CEO은 매트 뮬렌웨그((Mattew Mullenweg)는 칼립소 프로젝트를 소개하는 그의 블로그를 다음과 같은 말로 시작하고 있습니다.

> One of the hardest things to do in technology is disrupt yourself.

아마도 쉬운 결정은 아니었을 것입니다. 이미 10년의 역사를 가진, 게다가 지금 현재 가장 높은 시장점유율과 인기를 구가하고 있는 제품이 채택하기엔 더더군다나 쉬운 결정이 아니었으리라 짐작합니다. 그렇지만 변화하는 웹 환경에서 오래도록 살아남기 위해 워드프레스가 취한 이번 결정은 아마도 워드프레스, 그리고 워드프레스 생태계 속에 있는 많은 개발사들과 개발자들에게 많은 도전과 함께 새로운 기회들을 던져 줄 것이라 생각합니다.

물론 여러 가지 해결할 문제들이 있습니다. 얼핏 생각해도 PHP 기반으로 되어 있는 워드프레스의 확장시스템을 어떻게 새 시스템으로 교체할 건지, 기존의 플러그인과 테마 시스템과의 관계를 어떻게 가져갈건지 등등. 하지만 칼립소가 세상에 나오기 훨씬 이전부터 워드프레스를 웹 애플리케이션 도구로 사용하려는 시도들이 워드프레스 개발자들 사이에서는 종종 있어왔고, 이제 워드프레스에서 공식적으로 새로운 방향을 제시한 셈이니, 앞으로 더 좋은 생각 더 좋은 시도들이 워드프레스와 오픈소스 커뮤니티 속에서 생겨날 것입니다.

아래 표는 [워드프레스 개발자 사이트]()에서 제공하는, 칼립소가 기존의 WordPress.com과 비교해 무엇이 바뀌었는지를 보여주는 표입니다. 

![](https://developer.files.wordpress.com/2015/11/whats-new-wpcom2x2.png)
출처: [The Story Behind the New WordPress.com](https://developer.wordpress.com/2015/11/23/the-story-behind-the-new-wordpress-com/)

정말이지, 누구 말처럼, "바뀐 건 오직 하나, 전부!" 이로군요. 워드프레스 개발자들에겐 새로운 먹거리가 생긴 셈입니다. :)






