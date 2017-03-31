---
layout: post
title: Grid layout을 만드는 몇 가지 방법들
description: 웹에서 그리드 레이아웃(grid layout)을 만드는데 주로 사용되는 방법들 몇 가지를 소개하고 특히 최근 등장한 CSS Grid Layout에 대해 알아 봅니다.
thumbnail: https://usefulpa.s3.amazonaws.com/images/2017/12-grid-layout-featured.jpg
image: https://usefulpa.s3.amazonaws.com/images/2017/12-grid-layout-featured.jpg
categories: ["web development"]
tags: [design ui css]
---

그리드 레이아웃(grid layout)은 웹사이트를 디자인할 때 가장 흔히 사용하는 레이아웃이다. 전통적으로 웹사이트 디자인이 인쇄물(브로셔나 잡지) 디자인으로부터 상당 부분 영향을 받은 탓도 있지만, 그리드를 사용하여 흩어져 있는 요소들을 일관성 있게 정렬하여 보여주는 것이 사용자들에게 훨씬 더 잘 와 닿는다. 

![](https://usefulpa.s3.amazonaws.com/images/2017/grid-layouts-examples-2.png)

그리드 레이아웃으로 웹사이트를 만들 경우, 우선 웹사이트를 일정 수의 격자(grid)로 나누고 그 각각의 격자 속에 필요한 디자인 요소들을 적절하게 배치하는 방법으로 디자인을 하게 된다. 그렇지만 웹에서 그리드를 구현하는 방법은 한 가지가 아니다. 여러 가지가 있다. 이 글에서는 그 중 다음 몇 가지 대표적인 방법에 관해 소개한다.

- 테이블(table) 방식
- CSS float 속성을 사용하는 방식
- Flexbox 방식
- CSS Grid 방식

## Table 방식

HTML의 `<table>` 태그를 사용하여 가로 세로 테이블을 만들고 그 테이블의 행과 열 속에 디자인 요소들을 배치하는 방법으로, 웹 초창기부터 시작해서 소위 '웹표준'이라 일컫는 방식이 일반화 되기 전까지 주로 사용되어 왔던 방법이다. 당시의 웹사이트는 거의 데스크톱(PC) 브라우저만을 지원하면 되었고, 고정폭 레이아웃을 사용하는 경우가 대부분이었기 때문에 table 방식의 디자인이 잘 먹혔다. 아주 오래 전에 만들어진 사이트를 제외하면 요즘은 거의 사용하지 않는 '유물' 방식이기 때문에 자세한 구현 방법은 생략한다. 

## CSS float 속성을 사용하는 방식

현재 가장 일반적으로 사용하는 그리드 레이아웃 구현 방법은 CSS float 속성을 사용하여 구성요소들을 배치하는 방법이다. 예를 들어, 다음과 같은 웹사이트 레이아웃을 만든다고 해 보자.

![](https://usefulpa.s3.amazonaws.com/images/2017/2017-03-31_grid-layout-demo.png)

여기서는 지면 관계와 설명의 편의를 위해 헤더 영역과 푸터 영역은 제외하고, 본문 영역과 그 아래 대표 이미지 영역만 그리드 레이아웃을 적용한다고 해 보자. 그러면 그리드는 다음과 같이 구성될 수 있다. (여기 소개하는 내용은 어디까지나 여러 방법들 중 하나일 뿐이며, 동일한 디자인에 대해서도 그리드 레이아웃을 적용하는 방법은 다양할 수 있음을 미리 밝힌다)

![](https://usefulpa.s3.amazonaws.com/images/2017/2017-03-31_grid-layout-demo-guided.png)

본문 영역은 메인 콘텐츠와 사이드바가 각각 2/3와 1/3 씩 차지하게끔 구성하였고, 그 아래 대표 이미지 영역은 4개의 이미지가 각각 1/4씩 자리를 차지하게끔 하였다.

이 영역에 대한 HTML 마크업이 다음과 같을 경우,

```html
<div class="wrap">
  <main class="content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qua ex cognitione facilior facta est investigatio rerum occultissimarum. Hoc dixerit potius Ennius: Nimium boni est, cui nihil est mali. Hoc loco tenere se Triarius non potuit. Diodorus, eius auditor, adiungit ad honestatem vacuitatem doloris. Itaque haec cum illis est dissensio, cum Peripateticis nulla sane. Contineo me ab exemplis. Sed ne, dum huic obsequor, vobis molestus sim. Multoque hoc melius nos veriusque quam Stoici. </p>
  </main>
  <aside class="sidebar"></aside>
</div><!--.wrap --> 
<section class="features">
  <a class="feature" href="#"><img src="https://fakeimg.pl/300x200/"></a>
  <a class="feature" href="#"><img src="https://fakeimg.pl/300x200/"></a>
  <a class="feature" href="#"><img src="https://fakeimg.pl/300x200/"></a>
  <a class="feature" href="#"><img src="https://fakeimg.pl/300x200/"></a>
</section>  
```
 
CSS float 속성을 사용하여 위 마크업을 그리드 레이아웃으로 만들려면 CSS 스타일을 다음과 같이 주면 된다.
 
```css
 .content {
    width: 67%;
    float: left;
}
.sidebar {
    width: 33%;
    float: right;
}
.feature {
    width: 25%;
    float: left;
}
.wrap:after, .features:after {
    content: " "; 
    display: block; 
    clear: both;
}
```
각각의 요소에 width 값을 준 다음 float 속성을 사용하여 왼쪽과 오른쪽으로 띄웠다. 그런 다음, 마지막에서 소위 "clearfix"라고 하는 것을 적용하였는데, 이는 float 속성만 갖는 부모 요소가 영역을 차지하지 못하는 문제를 해결하기 위한 잘 알려진 핵(hack)이다. Clearfix 와 관련한 더 자세한 내용은 아래 문서를 참조하면 된다.

- [float을 clear하는 4가지 방법](http://naradesign.net/wp/2008/05/27/144/) 
 
이 CSS float 속성을 이용한 그리드 레이아웃 구성 방법은 오늘날 웹에서 가장 일반적으로 사용되는 방법이다. CSS 프레임워크의 원조라 할 [Blueprint](http://blueprintcss.org/)부터 시작해서 요즘 가장 인기있는 [Bootstrap](http://getbootstrap.com/) 과 [Foundation](http://foundation.zurb.com/) 에 이르기 까지 많은 CSS 프레임워크들도 이 방법으로 그리드를 구성한다.

## Flexbox

[Flexbox](http://www.w3.org/TR/css3-flexbox/)의 정식 명칭은 'CSS Flexible Box Layout '이며 이름 그대로 유연한(flex) 박스 모델을 위한 CSS 스펙이다. Flexbox는 여러 요소들을 플렉스 컨테이너(flex container)로 감싸는 방식으로 구현한다. 이 플렉스 컨테이너 속에 들어간 요소(자식 박스)들은 가로 세로 아주 유연하게 배치될 수 있는 것이 Flexbox의 장점이다.

위 웹사이트 레이아웃 예제를 이번엔 Flexbox를 사용하여 다시 구성하려면 CSS 스타일을 다음과 같이 주면 된다.

```css
.wrap, .features {
    display: flex;
}
.content {
    flex: 2;
}
.sidebar {
    flex: 1;
}
```

잠깐 부연하면, .wrap과 .features 클래스를 flex 컨테이너로 만들었다. 어떤 요소가 flex 컨테이너가 되면, 그 속의 자식 요소들은 'flex 아이템(item)'이 되어 flex box 모델의 적용을 받는다. flexbox 모델의 기본 값은 각각의 자식 요소들이 동일한 크기의 영역을 차지하는 것이기 때문에 여기서 .content와 .sidebar는 flex 속성값을 각각 2와 1로 주어 .content 가 .sidebar 보다 2배 크기의 영역을 차지하게끔 선언하고 있다. .feature 이미지들은 각각 1/4(25%) 씩 균등하게 차지하면 되기 때문에 따로 선언해 주지 않았다(디폴트 값 적용).

앞서 float 속성 방식과 비교하면 훨씬 간단하다. 핵(hack)도 필요없다. 게다가 Flexbox를 사용하면 가로 세로 아주 다양한 방식으로 레이아웃을 구성할 수도 있다. 또한 미디어 쿼리(media query)와 함께 사용하면 다양한 디바이스 폭에 맞춘 반응형 웹디자인 처리도 간단하게 해결된다.

여기서는 Flexbox를 그리드 레이아웃을 만드는데 사용했지만, 사실 Flexbox는 비단 그리드 레이아웃을 구성하는 용도로만 사용되는 것은 아니다. 웹사이트 상에서 여러 요소들을 한 데 묶어 유연하게 레이아웃을 구성할 경우라면 여러 용도로 다양하게 활용할 수 있다. 브라우저 지원성도 좋아, 최신 브라우저들이라면 대부분이 지원한다. 

- [Flexbox 지원 브라우저](http://caniuse.com/#feat=flexbox)

자세한 설명과 사용법, 용도(유스케이스)는 아래 자료들을 참조하자.

- [CSS 레이아웃을 배웁시다 : flexbox](http://ko.learnlayout.com/flexbox.html)
- [Solved by Flexbox](https://philipwalton.github.io/solved-by-flexbox/) : CSS Flexbox의 다양한 유스케이스
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) : 자세한 설명을 곁들인 레퍼런스

## CSS Grid Layout

[CSS Grid Layout](https://www.w3.org/TR/css-grid/)은 그야말로 '그리드 레이아웃'만을 위한 CSS 모듈이다. 가로세로 격자를 만들어 그 속에 디자인 요소들을 배치하는 점에서는 앞서 table 방식의 레이아웃과 비슷하다 말할 수도 있지만, 그 구성 방법이나 유연성에 있어서는 차원이 다르다. 또한 Flexbox 처럼 미디어 쿼리와 함께 사용하면 반응형 웹 구성도 쉽게 처리할 수 있다.

앞서 적용한 예제와 동일한 레이아웃을 이번엔 CSS Grid로 구현해 보면, 다음과 같이 할 수 있다. (여기서는 `grid-template-columns`라는 속성으로 각각의 컬럼 폭을 명시하는 방법을 썼지만, CSS Grid에는 `grid-template-areas`라는 방식으로 영역에 이름을 지정하여 처리하는 방식도 지원한다)

```css
.wrap {
    display: grid;
    grid-template-columns: 67% 33%;
}
.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, 25%);
}
```

Flexbox에서는 display 속성을 'flex'로 주어 flex 컨테이너로 만들었다면, 이번엔 display 속성을 'grid'로 주어 grid 컨테이너로 만들었다. Flexbox와 마찬가지로, 이럴 경우 grid 컨테이너 속 자식 요소들은 'grid 아이템(item)'이 되어 그리드 모델의 적용을 받게 된다. 여기서는 `grid-template-columns` 라는 속성을 사용하여, .wrap 클래스에서는 컬럼(즉 메인과 사이드바) 폭을 각각 67%와 33%로 주었고 그 아래 .features 클래스는 자식 요소들 각 컬럼의 폭을 25%씩 주어 균등하게 나누었다.

### CSS Grid vs. Flexbox

흔히 접하는 질문 중 하나는 CSS Grid Layout(이하 'CSS Grid')이 앞서 소개한 Flexbox와 어떤 차이가 있냐 하는 것인데, 기본적으로 Flexbox가 가로 또는 세로 하나의 축(axis)을 기준으로 요소(박스)를 배열하는 개념인 반면, CSS Grid는 가로x세로 2차원 매트리스를 기준으로 그 속에 요소들을 배치한다는 점에서 접근 방식 자체가 다르다.

![](https://usefulpa.s3.amazonaws.com/images/2017/2017-03-31_cssgrid-vs-flexbox.png)
\* 그림 출처: [W3C CSS Grid Layout Module 명세](https://www.w3.org/TR/css-grid/#intro) (적색 선 추가)

물론 앞서 소개한 예제의 경우, 간단하게 가로x세로 = 1x2의 간단한 그리드를 만들어 사용한 관계로 Flexbox와의 차이를 잘 느끼지 못할 수도 있지만, 가로 세로 행열의 개수가 많을수록 Flexbox와의 차이가 분명하게 드러난다.

또한 Flexbox와 CSS Grid가 서로 대체 관계에 있는 것도 아니다. 둘은 함께 사용할 수 있고 또 함께 사용할 때 진정한 효과가 나올 수 있다. 예를 들어, 전체 사이트의 레이아웃은 CSS Grid로 잡고 그 속에 들어가는 갤러리 영역이나 카드 목록 같은 부분은 Flexbox를 써서 만드는 식이다.

물론 CSS Grid는 아직 모든 브라우저에서 사용할 수 있는 것은 아니다.

- [CSS Grid 지원 브라우저](http://caniuse.com/#feat=css-grid)

[크롬(Chrome) 57](https://developers.google.com/web/updates/2017/03/nic57), [파이어폭스(Firebox) 52](https://developer.mozilla.org/en-US/Firefox/Releases/52) 이상에서 지원되며, 이 글을 쓰는 시점에서 이틀 전인 2017년 3월 29일, [사파리(Safari) 브라우저 10.1 버전에서 CSS Grid 지원](https://webkit.org/blog/7477/new-web-features-in-safari-10-1/)이 발표되었다. 그렇지만 지금과 같은 지원 속도라면, 아마 모든 브라우저에서 CSS Grid를 쓸 수 있는 날이 머지 않을 듯 싶다.

### CSS Grid와 미래의 웹

인기있는 CSS 프레임워크인 Foundation을 개발하는 ZURB는 [최근 블로그](http://zurb.com/article/1468/foundation-css-grid-think-beyond-the-page)를 통해 CSS Grid가 가져올 미래 웹의 변화를 낙관하면서 다음과 같이 말하고 있다.

> The term “web page” is starting to feel very, very... inadequate. CSS Grid opens up layout in ways that were not possible before, and our minds are racing with the opportunity in front of us. We hope these experiments will get you as excited as we are, and demonstrate a little of what’s possible with this new tool.

지금 당장은 아니라 할지라도, CSS Grid는 Flexbox와 함께 웹사이트와 웹서비스, 그리고 웹 애플리케이션 개발에 있어 새롭고 멋진 도구가 될 것임에 분명하다.

CSS Grid와 관련해서 더 자세한 내용은 아래 자료들을 참조하자.

- [Grid by Example](http://gridbyexample.com/)
- [A Complete Guide to CSS Grid](https://tympanus.net/codrops/css_reference/grid/) 
- [Practical CSS Grid: Adding Grid to an Existing Design](https://alistapart.com/article/practical-grid) : CSS 전문가 Eric Meyer가 최근 자신의 사이트에 CSS Grid를 적용한 내용을 소개한 글 
- [CSS 그리드를 사용하여 적응 레이아웃을 만드는 방법](https://msdn.microsoft.com/ko-kr/library/jj553856(v=vs.85).aspx) : MSDN 문서. 마이크로소프트 IE 11 및 Edge 14 버전부터 CSS Grid를 지원하지만, MS 브라우저가 지원하는 CSS Grid Layout은 [예전 버전](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/)이며, 이 글은 그 명세에 따른 것임에 유의하자.


