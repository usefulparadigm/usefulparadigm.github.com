---
layout: post
title: 반응형웹과 Responsive Image 처리
description: 반응형웹은 모바일과 데스크톱을 아우르는 다양한 디바이스에 효과적으로 대응하기 위한 프론트엔드 웹 기술입니다. 이 글은 반응형웹에서 특히 문제가 되는 이미지(image) 파일의 처리에 대해 소개합니다. 
thumbnail: http://usefulpa.s3.amazonaws.com/images/2014/econo-is-responsive.png
category: web development 
tags: [responsive, image, frontend, layout]
---
반응형웹(responsive web)이 대세가 된지 오래다. 국내외를 막론하고 새로 만들어지는 웹사이트 중 반응형웹을 지원하지 않는 곳은 찾아보기 힘들 정도다. 알다사피 반응형웹 혹은 [반응형웹 디자인(responsive web design, 줄여서 RWD)](http://en.wikipedia.org/wiki/Responsive_web_design)이란, 마치 예전에 Ajax가 그랬듯, 기존에 나와 있던 몇몇 개념들이 결합되어 만들어진 개념으로, 하나의 웹페이지만으로 모바일과 데스크톱을 아우르는 다양한 디바이스에 효과적으로 대응하기 위해 만들어진 프론트엔트 웹개발 방법이다. 

<img src="http://usefulpa.s3.amazonaws.com/images/2014/econo-is-responsive.png" srcset="http://usefulpa.s3.amazonaws.com/images/2014/econo-is-responsive.png 644w, http://usefulpa.s3.amazonaws.com/images/2014/econo-is-responsive_2x.png 1288w" alt="retina devices" />

알다시피 이런 "반응형"의 웹사이트를 만들기 위해서는 주로 다음 3가지 기술(기법)을 사용하게 된다. 물론 이 외에도 여러 가지 기법들과 핵(hack)이 적용되기는 하지만 기본적으로는 아래 3가지가 반응형웹의 토대를 이룬다.

- 유동 레이아웃(flexible layout)
- CSS3 미디어쿼리(media query)
- 반응형 이미지(responsive image)

이 셋 중 유동 레이아웃이나 미디어 쿼리 부분은 CSS 명세에 맞게 사용하면 크게 문제될 게 없지만, 유독 이미지를 처리하는 부분은 조금 까다롭다. 왜 까다로운지 그리고 어떤 해결책들이 있는지 지금부터 알아보기로 하자.

## 반응형 이미지 처리

2010년의 어느 날 웹 디자이너인 Ethan Marcotte가 처음 [반응형웹이란 개념을 소개](http://alistapart.com/article/responsive-web-design)했을 때만 해도 반응형웹에서 이미지를 어떻게 다루어야 할지에 대해서는 크게 문제가 되지 않는 듯 했다. 통상적으로 반응형웹은 유동(fluid) 레이아웃에 기반하고 유동 레이아웃에서 어떤 요소를 가변적으로 구성하려면 비율값 즉 퍼센트(%) 값을 사용하는게 일반적이므로, 흔히 (그리고 지금까지도) 반응형웹에서 이미지 처리의 기본패턴은 CSS 스타일시트에 다음과 같이 비율폭을 추가하는 것이다.

~~~css
img { max-width: 100%; }
~~~

사실 반응형 이미지를 위해 처리해줘야 할 부분은 이게 전부이기도 하다. 이렇게만 해도 하나의 이미지가 웹사이트의 가로폭에 맞춰 크기가 가변적으로 조정되고 당연히 페이지의 최대폭을 넘지 않기 때문에 모든 디바이스에서 이미지가 "제대로(넘치지 않고)" 표시되는 것을 보장할 수 있다. 여기에 페이지 레이아웃에 맞춰 미디어별로 이미지 크기를 다르게 설정하는 미디어쿼리(media query)를 가미하면 좀 더 나은 반응형웹을 구현할 수 있다.

## 몇 가지 문제들

그런데 위의 방식만으로 반응형 이미지를 처리할 경우 다음과 같이 몇 가지 문제가 남는다. 

* 이미지 크기(size)와 관련한 성능/속도 및 대역폭 문제
* 고밀집도(High-DPI) 디바이스 대응
* 소위 "아트 디렉션(art direction)" 처리 
* 다양한 이미지 포맷 대응

하나씩 살펴 보기로 하자.
 
우선 **이미지 크기(size)와 관련한 문제**다. 반응형웹에서는 디바이스에 따라 레이아웃이 달라지고 이에 맞춰 이미지 크기 또한 가변적으로 변하기 때문에 통상 가장 큰 사이즈의 이미지를 하나 만들어 모든 디바이스에 대응하는 경우가 많다. 이럴 경우 굳이 그럴 필요가 없는 작은 사이즈의 화면을 가진 디바이스에도 똑같이 큰 사이즈의 이미지를 불러와야 하기 때문에 불필요한 대역폭의 낭비가 생기고 또 결과적으로 페이지 로딩 속도도 디바이스에 맞는 적은 용량의 이미지를 썼을 때보다 떨어지게 된다. 데스크톱에서 잘 보이게 만든 큰 용량의 이미지를 굳이 작은 화면의 아이폰에도 똑같이 불러올 필요는 없다.

실제로 2014년 10월 현재 HTTP Archive에 집계된 통계 상으로 웹 페이지 용량에서 이미지가 차지하는 부분은 절반을 훨씬 넘는 것으로 나타났다. 아무런 다른 조치 없이 단지 이미지 용량만 줄이더라도 웹사이트의 속도가 크게 개선될 수 있다는 말이다.

![](https://usefulpa.s3.amazonaws.com/images/2014/Web_Image.png)

( * 출처: [HTTP Archive](http://httparchive.org/interesting.php?a=All&l=Oct%201%202014&s=All) ) 

두 번째 문제는 이른바 "레티나(Retina)" 디스플레이라고도 불리는 **고밀집도 디바이스에 대한 대응** 이다. 요즘 새로 출시되는 디바이스들 중에는 밀집도(density)가 높은 디스플레이를 장착한 디바이스가 많고 그러다보니 이미지 처리도 이들 고밀집도(high-density) 디바이스에 대응해야 하는 문제가 생기게 된다. 아래 그림처럼 통상적인 밀집도의 디바이스에서 정상적으로 보이던 이미지가 레티나 기반의 디바이스에서는 흐릿하게 보이게 된다. 레티나를 필두로 한 고밀집도 디바이스에 대한 문제와 이에 대한 대응에 관한 더 자세한 내용은 참고자료를 참조하면 좋겠다.

![](https://usefulpa.s3.amazonaws.com/images/2014/standard-vs-retina.png)

(* 사진출처: [http://greatfridays.com/blog/images-in-responsive-web-development/](http://greatfridays.com/blog/images-in-responsive-web-development/) )

소위 **"아트 디렉션(art direction)" 처리**도 문제가 될 수 있다. 이미지를 일률적으로 배율에 맞춰 확대/축소할 경우 데스크톱에서는 분명한 의미를 전달하던 이미지가 화면 크기가 적은 모바일 디바이스에서는 도무지 무슨 이미지인지 알아보지 못해 의미 전달을 놓치게 되는 경우가 많다. 이 경우 해결책은 디바이스 특성에 맞춰 크기 뿐 아니라 이미지의 내용도 다른 이미지를 제공하는 것이다. 예를 들어 아래 사진 이미지의 경우 배율에 맞춰 크기를 줄이기보다는(우측 상단)  이미지가 표시되는 상황(context)에 맞게 잘라진 사진을 사용하는 것이(우측 하단) 더 효과적으로 의미를 전달할 수 있다.

![](https://usefulpa.s3.amazonaws.com/images/2014/artdirection.png)

( * 사진출처: [http://24ways.org/2012/responsive-images-what-we-thought-we-needed/](http://24ways.org/2012/responsive-images-what-we-thought-we-needed/) )

마지막으로 고려할 문제는 **다양한 이미지 형식(format)에 대한 대응** 문제다. 전통적으로 웹 상에서 사용하는 이미지 파일의 형식은 주로 GIF, JPEG, PNG 인 경우가 대부분이었지만 최근에는 좀 더 효율적이고 압축률을 높인 다양한 유형의 이미지 파일 형식들이 나오고 있고 이들 새로운 형식을 지원하는 브라우저들도 속속 등장하고 있기 때문에, 새로운 이미지 파일 형식에 대한 대응도 문제가 된다. 이미 대부분의 브라우저에서 지원하고 있는 SVG나 구글에서 제안한 [WebP](https://developers.google.com/speed/webp/), 마이크로소프트의 [JPEG-XR](http://msdn.microsoft.com/en-us/library/windows/desktop/hh707223.aspx), 그리고 [FlashPix](http://en.wikipedia.org/wiki/FlashPix) 같은 형식이 대표적이다.

해결책들
-----

웹커뮤니티, 특히 그 중에서도 프론트엔드 개발자들은 이 문제에 대해 이미 "반응형웹"이란 말이 세상에 나오기 전부터 많은 고민을 해왔고 그만큼 많은 해법과 트릭들을 만들어 왔다. 그렇지만 이 모든 방법들을 여기서 전부 소개하기는 쉽지도 않을 뿐더러 이미 어느 정도 표준적인 방법이 등장한 이후인지라 여기서는 현재의 모습을 중심으로 몇 가지 대안들만 소개하려 한다. 

### srcset과 sizes 속성

처음 소개할 방법은 srcset 과 sizes 속성이다. 이 방식은 HTML의 `<img>` 태그에 새로운 속성을 추가하여 반응형 이미지를 처리하는 방식으로 Apple이 처음 제안하여 현재의 웹표준에 이른 방식이며, 예제는 다음과 같다.

~~~html
<img src="small.jpg"
     srcset="large.jpg 1024w, medium.jpg 640w, small.jpg 320w"
     sizes="(min-width: 36em) 33.3vw, 100vw"
     alt="A rad wolf">
~~~

(* 예제 출처: [RICG](http://responsiveimages.org/))

`<img>` 태그는 이미 기존부터 사용해오던 그 `<img>` 태그지만 여기에 새로 srcset과 sizes 속성이 덧붙었다. 여기 예제의 srcset 속성에서는 각각 가로폭 1024px, 640px, 320px인 3개의 이미지를 쉼표로 분리된 문자열 형식으로 적었다. 이럴 경우 브라우저(srcset을 지원하는 브라우저)는 이 값을 읽어 현재의 화면 상태에 맞는 적절한 이미지를 불러오게 된다. sizes 속성도 추가할 수 있는데, 이 속성은 미디어쿼리의 중단점(breakpoint) 별로 필요한 이미지의 정보를 추가로 제공함으로써 역시 브라우저로 하여금 현재의 상태에 가장 잘 맞는 이미지를 불러오는데 도움을 주게 된다. 위 예제에서는 미디어쿼리의 중단점으로 가로폭이 36em 이상인 경우에는 33.3vw ('viewport width'를 의미)의 이미지가 필요함을 브라우저에 알리고 있으며 뒤의 100vw는 디폴트값이다. 물론 srcset과 sizes를 지원하지 않는 브라우저에서는 기존의 src 속성이 폴백(fallback)으로 사용된다.

srcset과 sizes 속성을 사용하면 앞에서 제기한 네 가지 문제들 중 적어도 처음 두 가지 문제는 손쉽게 해결된다. 브라우저가 화면 크기에 맞춰 적절한 용량의 이미지를 불러오고 또한 고밀집도 디스플레이 화면에 대한 대응도 브라우저가 판단하여 대응하기 때문이다(여기서 소개하진 않았지만 srcset에는 w 대신 x 속성으로 밀집도를 지정하는 옵션도 있는데, 아래의 예제에 나온다).

### `<picture>` 엘리먼트 

srcset/sizes 속성만으로 해결할 수 없는 문제들, 예컨대 아트 디렉션 처리나 여러 이미지 포맷 지원 등은 `<picture>` 엘리먼트로 해결할 수 있다. `<picture>` 엘리먼트는 [Mat Marquis](http://alistapart.com/article/responsive-images-how-they-almost-worked-and-what-we-need)에 의해 처음 제안되어 현재 W3C의 [Responsive Images Community Group](http://responsiveimages.org/)에 의해 관리되는 웹표준에 이른 반응형 이미지 처리 방법이다. (`<picture>` 엘리먼트가 오늘에 이르기까지의 우여곡절과 웹커뮤니티의 노력은 참고자료 참조)

~~~html
<picture>
  <source media="(min-width: 40em)"
    srcset="big.jpg 1x, big-hd.jpg 2x">
  <source 
    srcset="small.jpg 1x, small-hd.jpg 2x">
  <img src="fallback.jpg" alt="">
</picture>
~~~

(* 예제 출처: [RICG](http://responsiveimages.org/))

`<picture>` 엘리먼트는 하위 요소로 `<source>` 엘리먼트를 두어 각각의 이미지 소스를 처리한다. 위 예제에서는 미디어쿼리로 min-width값이 40em 이상인 경우는 big.jpg 파일을, 그 이하인 경우는 small.jpg 파일을 각각 로드하게끔 설정되어 있다. 이 때 각각의 `<source>` 엘리먼트 내에는 srcset 속성을 추가하여 밀집도(여기서는 1x와 2x를 사용했는데, 2x는 196 DPI 이상을 일컫는다)에 따라 각기 다른 이미지 파일을 로드하게끔 설정하는데, 이 부분은 앞서의 `<img>` 태그에 붙은 srcset 속성과 동일하다.

이 `<picture>` 엘리먼트를 이용하면 앞서 `<img>` 태그에 붙여 사용했던 srcset/sizes 방식보다 조금 더 다양한 처리가 가능해 진다. 예를 들어, 아트디렉션(art direction) 은 다음과 같이 처리할 수 있다. 여기서는 미디어쿼리로 width값이 800px 이상인 경우(lighthouse-landscape)와 그 이하인 경우(lighthouse) 각각 다른 이미지를 사용하며 그 결과 좁은 폭의 화면에서는 넓은 폭과는 다른 모양의 이미지가 보여짐을 알 수 있다.

~~~html
<picture>
  <source media="(min-width: 800px)"
          sizes="80vw"
          srcset="lighthouse-landscape-640.jpg 640w,
                  lighthouse-landscape-1280.jpg 1280w,
                  lighthouse-landscape-2560.jpg 2560w">
  <img src="lighthouse-160.jpg" alt="lighthouse"
       sizes="80vw"
       srcset="lighthouse-160.jpg 160w,
               lighthouse-320.jpg 320w,
               lighthouse-640.jpg 640w,
               lighthouse-1280.jpg 1280w">
</picture>
~~~

![](https://usefulpa.s3.amazonaws.com/images/2014/lighthouse-example-picture2X.png)

(* 예제 출처: [HTML5Rocks](http://www.html5rocks.com/en/tutorials/responsive/picture-element/))

`<picture>` 엘리먼트는 다양한 이미지 형식을 처리하는 데도 사용될 수 있다.  아래 예제를 보면 webp를 지원하는 브라우저인 경우 jpg 파일이 아닌 webp 파일을 표시하도록 하고 있다.

~~~html
<picture>
  <source type="image/webp" srcset="images/butterfly.webp">
  <img src="images/butterfly.jpg" alt="a butterfly">
</picture>
~~~

`<picture>` 엘리먼트 관련 더 자세한 내용은 [W3C Draft 문서](http://www.w3.org/TR/html-picture-element/) 참조.


### 브라우저 지원과 폴리필(polyfill)

웹에서는 아무리 좋은 기능이라도 브라우저에서 그 기술을 지원하지 않으면 무용지물이다. 다행히 [크롬(Chrome)](http://blog.chromium.org/2014/08/chrome-38-beta-new-primitives-for-next.html), [사파리(Safari)](https://www.webkit.org/blog/2910/improved-support-for-high-resolution-displays-with-the-srcset-image-attribute/) 등 주요 브라우저들이 `<picture>`엘리먼트와 srcset/sizes 속성을 지원하거나 또는 지원을 준비 중이다(아래 표 참조). 

![](https://usefulpa.s3.amazonaws.com/images/2014/resp-images-browser-supports.png)

(* 출처: [RICG](http://responsiveimages.org/))

또한 IE 등 아직 이 기능을 지원하지 않는 브라우저를 위한 폴리필(polyfill) 자바스크립트 라이브러리도 나와 있기 때문에 지금 당장 프로젝트에 적용하더라도 크게 무리는 없을 듯 하다.

* [srcset 속성 브라우저 지원 현황](http://caniuse.com/#search=srcset)
* [`<picture>`엘리먼트 브라우저 지원 현황](http://caniuse.com/#search=picture)
* [Picturefill - A responsive image polyfill](http://scottjehl.github.io/picturefill/)
* [respimage](https://github.com/aFarkas/respimage)


## 그 밖의 방법들
 
지금까지는 주로 클라이언트(브라우저)측 기술, 즉 웹표준으로 자리잡은 srcset/sizes 속성과 `<picture>` 엘리먼트를 중심으로 소개했지만 이게 전부는 아니다. 다른 방법들도 존재하고 또 여전히 새로운 방식들이 시도되고 있다. 그 중 몇 가지만 소개하면 다음과 같다.

* [Adaptive Image](http://adaptive-images.com/) 이 방식은 방문자의 웹요청으로부터 디바이스 정보를 감지하여 그에 알맞는 적절한 이미지를 서버측에서 제공하는 서버측 반응형 이미지 처리 방식이다. [SLIR (Smart Lencioni Image Resizer)](https://github.com/lencioni/SLIR) 도 이와 유사한 방식이다.

* [HTTP Client-Hints](https://github.com/igrigorik/http-client-hints) HTTP 요청 헤더에 브라우저 정보를 실어보내 서버측에서 적절한 이미지를 내보낼 수 있게 하는 일종의 콘텐츠 협상(content negotiation) 방식으로 현재 draft RFC 상태다.

* [HiSRC](https://github.com/teleject/hisrc) 네트워크 속도를 감지하여 서로 다른 이미지를 취하는 조금 독특한 adaptive image 솔루션이다.
 
 그 밖에 [jQuery Picture](http://jquerypicture.com/), [Doubletake](http://www.grahambird.co.uk/lab/doubletake/), [Foundation Interchange](http://foundation.zurb.com/docs/components/interchange.html), [Retina.js](http://imulus.github.io/retinajs/), [Response](http://responsejs.com/) 등도 참고할만 하다.

 
최근 애플(Apple)이 [레티나 디스플레이가 장착된 새로운 데스크톱용 PC를 발표](https://www.apple.com/imac-with-retina/)하면서 앞으로 모바일 디바이스 뿐 아니라 데스크톱 PC에도 레티나와 같은 고화질 디스플레이를 장착한 제품들이 늘어날 것으로 보인다. 또한 모바일 디바이스도 더욱 다양한 크기와 화질을 가진 디바이스들이 등장함에 따라 웹에서 이미지를 처리하는 방법은 더욱 다양해질 것 같다. 이 말은 곧 이제 더 이상 예전의 그 익숙한 `<img>` 태그 하나만으로 이미지를 처리하던 시대가 끝나가고 있다는 말이기도 하다. 

이미지 파일 하나 하나까지도 다양한 디바이스와 다양한 화면 상황을 고려하여 처리해야 하는 일은 웹 개발자들에겐 쉽지 않은 도전이다. 물론 포토샵(Photoshop)이나 스케치(Sketch) 같은 이미지 편집 도구들은 이미 이런 점들을 고려한 기능들을 갖추고 있고 또 시중에는 다양한 크기의 이미지를 처리할 수 있는 유틸리티 도구들도 여럿 나와 있긴 하지만, 무엇보다도 변하는 기술에 대한 이해를 바탕으로 적절히 도구를 사용하는 것이 도전에 대한 대응책이 될 것 같다.
 
끝으로 CMS에 대해 한마디. 요즘 웹사이트는 CMS로 만드는 게 보통이다. 그러니 CMS가 이들 반응형웹과 반응형 이미지에 대한 처리를 많은 부분 자동화시켜 주어야 한다. 예를 들어 워드프레스를 사용한다면, 워드프레스의 다양한 [썸네일(thumbnail) 생성 기능](https://codex.wordpress.org/Post_Thumbnails)을 이용하면 쉽게 반응형 이미지 처리에 대응할 수 있을 것이다. [Hammy](https://wordpress.org/plugins/hammy/)나 [Simple Responsive Images](https://wordpress.org/plugins/simple-responsive-images/) 같은 플러그인들도 참고할만 하다.


## 참고자료
 
* [Responsive Images: Use Cases and Documented Code Snippets to Get You Started](https://dev.opera.com/articles/responsive-images/) by Andreas Bovens
* [Use Cases and Requirements for Standardizing Responsive Images](http://usecases.responsiveimages.org/) by RICG
* [Srcset and sizes](http://ericportis.com/posts/2014/srcset-sizes/) by Eric
* [A Complete Guide to the `<Picture>` Element](https://longhandpixels.net/blog/2014/02/complete-guide-picture-element) by Scott Gilbertson
* [Built-in Browser Support for Responsive Images](http://www.html5rocks.com/en/tutorials/responsive/picture-element/) by Pearl Chen ([우리말 번역](http://www.html5rocks.com/ko/tutorials/responsive/picture-element/) by 도창욱)
* [On Responsive Images](http://css-tricks.com/on-responsive-images/) by Chris Coyier
* [The State Of Responsive Web Design](http://www.smashingmagazine.com/2013/05/29/the-state-of-responsive-web-design/) by Stephanie Walter (우리말 번역: [반응형 웹 디자인의 현재](http://www.webactually.co.kr/archives/12875) by Webactually)
* [레티나 웹(Retina Web)에 대응하는 우리들의 자세 : “래스터 이미지 편”](http://uxd.so/h/retina-web-raster/) by UXD
* [How a new HTML element will make the Web faster](http://arstechnica.com/information-technology/2014/09/how-a-new-html-element-will-make-the-web-faster/) by Scott Gilbertson

