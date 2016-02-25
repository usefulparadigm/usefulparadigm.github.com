---
layout: post
title: 모바일 웹사이트에 구글 AMP 적용하기
description: "최근 모바일 콘텐츠의 속도를 높여 사용자의 모바일 콘텐츠 접근성을 개선하려는 모바일 플랫폼 간 경쟁이 가속화되고 있습니다. 그 중 구글의 \"빠른 게재 모바일 페이지(AMP)\"에 대해 알아 보고 그 적용 방법을 소개합니다."
thumbnail: https://usefulpa.s3.amazonaws.com/images/2015/Web_Image_2016-02-24_18-00-20.png
category: ["mobile", "web development"]
tags: ["future", "mobile", "google"]
---

최근 모바일 콘텐츠 플랫폼을 둘러 싼 속도(speed) 경쟁이 뜨겁다. 작년 초 페이스북(Facebook)이 자사의 모바일 앱에 최적화된 콘텐츠를 제공하는 [인스턴트 아티클](https://instantarticles.fb.com/)(Instant Articles)을 출시한 것을 시작으로, 이어 애플이 [애플뉴스](https://www.apple.com/news/)를, 그리고 지난해 하반기에 구글이 [AMP](https://www.ampproject.org/)(Accelerated Mobile Pages, 우리말로는 "빠른 게재 모바일 페이지")라는 모바일 콘텐츠 최적화 표준을 들고 나오면서 소위 "인스턴트(instant)"한 콘텐츠를 앞세운 플랫폼 간의 경쟁이 가속화된 듯 하다. 

이 중 구글이 제시한 모바일 콘텐츠 최적화 표준인 AMP에 대해 조금 알아보기로 하자.

![Google AMP Project](https://usefulpa.s3.amazonaws.com/images/2015/google-amp-project.png)

## AMP란?

AMP는 한마디로 말해 모바일 콘텐츠 최적화 표준이다. 뉴스나 블로그 같은 정적인 콘텐츠를 만들어 배포하는 온라인 매체가 이 AMP 표준에 맞춰 콘텐츠를 작성하여 게시하면 기존의 모바일 콘텐츠보다 [약 15% ~ 85%의 성능 향상을 가져올 수 있다](https://www.ampproject.org/how-it-works/)고 구글은 주장한다. 이를 위해 AMP는 웹 콘텐츠 제작에 사용되는 기술에 제약을 가한다. 한마디로 속도를 떨어뜨리는 기술의 사용을 배제함으로써 속도의 향상을 꽤하는 방법인 셈이다.

예를 들어, 아래 2개의 링크는 같은 워싱턴포스트의 기사를 각각 일반적인 HTML 페이지와 AMP로 나눠 보여준 것이다.

- [일반적인 HTML 페이지](https://www.washingtonpost.com/lifestyle/style/six-ways-the-martian-subverts-expectations/2015/10/05/6bba4d42-6873-11e5-8325-a42b5a459b1e_story.html)
- [AMP 페이지](https://www.washingtonpost.com/amphtml/lifestyle/style/six-ways-the-martian-subverts-expectations/2015/10/05/6bba4d42-6873-11e5-8325-a42b5a459b1e_story.html)

보면 알 수 있듯, AMP 페이지는 일반적인 HTML 페이지에서 광고나 자바스크립트, CSS 애니메이션 등과 같은 동적인 요소들을 제거하여 "알맹이"만 남겨 둔다. 물론 그렇다고 광고나 자바스크립트를 삽입하지 못한다는 의미는 아니고, 구글 AMP에서 정한 규약에 맞춰야 한다는 말이다. 통상적으로 웹사이트에서 속도를 느리게 만드는 요소들에 제약을 가하니 당연히 속도는 빨라 질 밖에 없다.

![일반 웹문서 vs. AMP 문서](https://usefulpa.s3.amazonaws.com/images/2015/normal-html-vs-amp.png)
-- 출처: Washington Post

[구글 공식 문서](https://www.ampproject.org/docs/get_started/about-amp.html)에 다르면 AMP는 다음 3가지 요소로 구성된다.

- AMP HTML
- AMP JS
- Google AMP Cache

이 중 AMP HTML은 기존의 HTML 문서에서 속도에 부담을 주는 요소를 배제하고 몇몇 확장 속성들을 추가한 일종의 HTML 확장이고, AMP JS는 이런 AMP HTML을 읽고 렌더링하는 런타임(Runtime) 이다. 그리고 Google AMP Cache는 구글이 제공하는 AMP HTML 문서의 캐싱 서비스이다. 즉 AMP 문서를 만들어 올리면 구글이 자체 CDN을 통해 더 빠른 액세스를 할 수 있게 해주는 것이다. 

이렇게 작성된 AMP, 즉 "빠른 게재 모바일 페이지"는 모바일 디바이스 환경에서 구글 검색(Google Search)을 수행할 경우 기존의 웹페이지를 대체하여 보여지게 되고, 따라서 사용자는 보다 빠른 모바일 사용자 경험을 얻게 되는 것이다.

물론 속도를 얻기 위해 희생해야 하는 것들도 많다. 예를 들어, 외부 자바스크립트를 사용할 수 없다거나 [CSS](https://www.ampproject.org/docs/guides/responsive/style_pages.html)도 하나만 링크를 걸 수 있고 인라인 스타일이나 속도에 부담을 주는 요소들을 쓸 수 없다. 또한 이미지나 미디어 파일의 경우 기존의 HTML 방식과는 다른 AMP 표준에서 제시하는 [별도의 커스텀 요소](https://www.ampproject.org/docs/guides/amp_replacements.html)를 써야 하는 식이다. 

AMP에 대한 더 자세한 내용은 아래 참고자료를 참고하면 되며, 특히 구글 AMP가 어떤 방식으로 웹페이지의 속도를 개선하는지에 대한 더 자세한 내용은 구글이 공개한 [How AMP Speeds Up Performance](https://www.ampproject.org/docs/get_started/technical_overview.html) 문서를 참고하면 좋을 것이다.

## AMP 문서 만들기

AMP 문서는, 그 문서만도 만들 수 있지만, 통상적인 경우 기존 웹문서(원본 문서)가 있고 그에 대한 대응으로, 별도 문서 즉 원본 문서에 대한 모바일 최적화된 버전의 문서로 만드는 것이 일반적일 것이다. 예를 들어 기존에 온라인 매체가 있어서 콘텐츠를 게시하고 있는 경우 이들 각각의 콘텐츠에 대해 AMP 문서를 만들어 기존의 문서와 1:1로 대응하는 AMP 문서를 한 벌로 만드는 방식이다.

AMP 문서는 [AMP HTML 규격](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)을 따라야 하며 AMP HTML은 다음과 같은 형식을 갖는다. 

	<!doctype html>
	<html amp lang="en">
	  <head>
	    <meta charset="utf-8">
	    <link rel="canonical" href="http://example.com/original-article.html" >
	    <meta name="viewport"
	          content="width=device-width,minimum-scale=1,initial-scale=1">
	    <style>body {opacity: 0}</style>
	    <noscript>
	      <style>body {opacity: 1}</style>
	    </noscript>
	    <script async src="https://cdn.ampproject.org/v0.js">
	    </script>
	  </head>
	  <body>
	    Hello, Mobile World!
	  </body>
	</html>

HTML 문서의 형식은 일반적인 문서와 다를 게 없어 보이지만 html 태그에 커스텀 속성으로 `amp`(또는 이모지 ⚡)가 추가되어 이 문서가 일반 HTML 문서가 아닌 AMP HTML 문서임을 표현하고 있으며, 공식 링크(canonical link) 값을 원래의 웹문서로 향하게 만들어 이 AMP 문서의 원 출처와 연결시키고 있다. style 부분에서는 AMP 문서 렌더링 과정에서 발생할 수 있는 [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)를 방지하기 위해 시작 시점의 opacity 값을 0으로 두고 있다. 마지막으로 script 태그에서 AMP 런타임 자바스크립트 모듈을 비동기 방식으로 호출하면 AMP JS에 의해 문서가 처리된다. 그 밖에도 여러 가지 마크업에 대한 제약사항들이 있는데 더 자세한 내용은 [구글의 공식 문서](https://www.ampproject.org/docs/get_started/create/basic_markup.html)를 참조하면 된다.

이미지 파일 같은 경우는 다음과 같이 amp-img 라고 하는 AMP 표준에서 제공하는 별도의 커스텀 태그를 사용해야 하고 width값과 height값을 반드시 명시해야 한다. AMP 런타임이 이미지의 렌더링 위치와 시점을 정확하게 제어할 수 있게 하기 위함이다.

	<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>

비디오나 트위터 박스, 또는 구글 분석기 코드나 광고 태그 같은 것들도 마찬가지로 AMP 표준에서 제공하는 커스텀 태그를 이용하여 처리하여야 한다. 예를 들어, 동영상 파일을 웹페이지 속에 삽입할 경우에는 다음과 같이 amp-video 태그를 써야 하며, 

	<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
	    poster="myvideo-poster.jpg">
	  <div fallback>
	    <p>Your browser doesn’t support HTML5 video</p>
	  </div>
	  <source type="video/mp4" src="foo.mp4">
	  <source type="video/webm" src="foo.webm">
	</amp-video>

트위터 트윗을 임베드시킬 경우는 [써드파티 컴포넌트인 amp-twitter 태그를 사용](https://www.ampproject.org/docs/guides/third_party_components.html) 하는 식이다. 

	<amp-twitter width=390 height=50
	    layout="responsive"
	    data-tweetid="638793490521001985">
	</amp-twitter>


## 문서 간 연결

앞서도 잠깐 언급 했듯이 AMP 문서와 기존 웹문서 간에는 공식 링크(canonical link)를 통해 서로 연결된다. 예를 들어, AMP 문서에서는 다음과 같이 link 태그를 이용해 공식 문서(원본 문서)로의 링크를 삽입하고,

	<link rel="canonical" href="https://www.example.com/url/to/full/document.html">

원본 문서에는 다음과 같이 amphtml 문서의 위치를 지정함으로써 서로 연결된다.

	<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">

![원본문서와 AMP문서 간 연결](https://usefulpa.s3.amazonaws.com/images/2015/amphtml-canonical-link.png)

## AMP 문서 검증하기

이렇게 만든 AMP 문서는 구글 크롬 브라우저의 개발자 도구 콘솔을 통해 검증(validation)할 수 있다. AMP 문서 URL 뒤에 `#development=1` 해시문자열을 추가하면 검증 결과가 콘솔에 표시된다.

![AMP Validation](https://usefulpa.s3.amazonaws.com/images/2015/Web_Image_2016-02-24_16-53-32.png)

## CMS에 AMP 적용하기

CMS를 사용하고 있는 경우라면, 아마도 곧 많은 CMS가 AMP를 지원하는 모듈을 만들어 제공하지 않을까 싶다. 여기서는 전세계 25% 이상의 CMS 점유율을 자랑하는 [워드프레스(WordPress)][https://wordpress.org/]와 인기있는 정적(static) 웹사이트 저작도구인 [Jekyll](http://jekyllrb.com/)에서 AMP를 적용하는 방법만 간단히 소개한다.

**Jekyll**의 경우는 플러그인을 통해 사이트를 빌드하는 과정에서 AMP를 적용할 수 있다. 구글의 AMP 프로젝트 공식 문서 사이트가 Jekyll을 사용하여 작성되었기 때문에 이를 참조하면 좋을 것이다.

- [amp-jekyll](https://github.com/juusaw/amp-jekyll)
- [ampproject/docs](https://github.com/ampproject/docs)

**워드프레스**는 AMP가 출시된 이후로 계속해서 [AMP 프로젝트와 보조를 맞추어 오고 있다](https://vip.wordpress.com/2015/10/07/mobile-web/amp/). 워드프레스 개발사인 Automattic이 참여하여 최근 출시한 [AMP 플러그인](https://wordpress.org/plugins/amp/) 같은 경우, 플러그인을 설치하는 것만으로 AMP 문서를 자동 생성해 준다. 또한 워드프레스닷컴(wordpress.com) 사이트의 경우 [워드프레스가 이미 자동으로 AMP 문서를 생성](https://en.blog.wordpress.com/2016/02/24/amp-for-wordpress-dot-com/amp/)하기 때문에 사용자가 별도로 할 일은 없다.

## AMP의 현재와 미래

구글 검색엔진은 어떤 웹문서가 AMP 버전의 문서를 가질 경우 이 문서를 처리하여 모바일 웹 검색결과에 AMP 문서임을 표시하고 사용자가 AMP 문서가 딸린 웹문서를 모바일 디바이스를 통해 클릭했을 경우 기존 웹문서가 아닌 AMP 문서를 보여준다(2016-02-24 현재, [구글 검색에 이미 적용되었다고 보도](http://searchengineland.com/live-google-launches-amp-results-in-mobile-search-results-243147)되고 있지만, 아직 국내에는 적용되지 않은 듯 하다). 번개마크 달린 AMP 아이콘이 표시(아래 그림) 되는데, 공교롭게도 페이스북의 인스턴트 아티클도 포스팅 위에 번개마크를 표시하고 있어 재밌다.

<img src="https://usefulpa.s3.amazonaws.com/images/2015/Web_Image_2016-02-24_17-09-37.png" alt="AMP 적용 예제" width="300px">

아직 국내에서는 AMP를 적용한 사례는 없어 보이지만 아마도 [곧 많은 언론사 사이트와 온라인 매체가 AMP를 적용할 것](http://www.bloter.net/archives/250056)으로 보인다. 게다가 페이스북이 [올 4월에 있을 F8 컨퍼런스에서 인스턴트 아티클을 모든 매체에 개방](http://media.fb.com/2016/02/17/opening-up-instant-articles/)하기로 이미 선언한 상태이기에 두 "빠름" 간의 경쟁도 더욱 가속화될 듯 싶다.

다만 AMP가 W3C 표준은 아니라는 점, 다른 콘텐츠 관련 벤더들의 참여와 지원이 얼마나 되느냐 하는 점, 원본 문서와는 별개로 또 하나의 문서를 만들어야 한다는 온라인 매체(콘텐츠 제공자)들의 부담 등은 AMP가 앞으로 풀어야 할 숙제로 보인다. 물론 앞으로 모바일 디바이스 성능이 더 좋아져 AMP 같은 해법이 필요 없어질 날이 오면 더 좋겠지만.

마침 지난 해 가을에 서울에서 열린 "[Google for Mobile 2015](https://www.youtube.com/watch?v=3omUr_q_wz0&list=PL6OeXcmhVzfSsbqs0hAfOnRuSFulsfopX)" 컨퍼런스 동영상이 최근 공개가 되었다. 그 날 세션 중 AMP를 소개한 세션 영상이 들어 있으니, 시간나는 분들은 한번 보는 것도 좋을 듯 싶다.

<iframe width="560" height="315" style="width: 100%" src="https://www.youtube.com/embed/mrjzoH-rvjI" frameborder="0" allowfullscreen></iframe>


## 참고자료

* [Accelerated Mobile Pages Project](https://www.ampproject.org/) (프로젝트 공식 웹사이트)
* [AMP: Accelerated Mobile Pages](http://d2.naver.com/news/7976742) 네이버 D2 News






