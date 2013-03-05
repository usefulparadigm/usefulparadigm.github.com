---
layout: post
title:  자식테마를 이용한 워드프레스 테마 관리하기
category: wordpress
excerpt: 워드프레스를 사용하다보면 테마를 수정할 일이 종종 생기곤 합니다. 이 때 테마를 수정하는 방법에는 어떤 것들이 있을까요? 자식테마(child theme)를 이용하는 건 어떨까요.
thumbnail: http://farm8.staticflickr.com/7049/6966237459_ddd63fff69_m.jpg
---

워드프레스를 사용하다보면 테마(theme)를 수정해야 할 일들이 종종 생기게 된다. 이 때 워드프레스 테마를 수정할 수 있는 방법은 크게 두 가지인데, 하나는 직접 테마 자체를 수정하는 것이고 나머지 하나는 바로 지금 소개할 **자식테마(child theme)**를 만들어 사용하는 것이다. 자식 테마는 다른 테마의 기능을 상속(inherit)받아 새로운 테마를 만들고 그 위에 필요한 기능만 덧붙이는 것으로, 이 때 상속받는 대상을 **부모테마(parent theme)**라 부른다. 마치 실세계에서 자식이 부모의 유전자를 상속받는 것이나 객체지향 프로그래밍에서 자식객체가 부모객체를 상속받는 것과 유사한 개념으로 워드프레스 2.7부터 새로 도입되었다.

![](http://farm8.staticflickr.com/7049/6966237459_ddd63fff69.jpg)

자식테마를 만들어 사용하는 것은 테마의 호환성 관리 차원에서도 좋은 선택이다. 예를 들어, 내가 어떤 테마를 수정해서 쓰고 있는데, 그 테마가 어느날 업데이트되었다고 하자. 그러면 내가 지금껏 직접 테마에 가했던 변경사항들을 고스란히 다시 새 테마에 반영해 주어야 하는 문제가 생긴다. <strike>혹은 지금 쓰고 있던 테마가 구닥다리라서 새로운 테마로 갈아타려고 할 때에에도 기존에 테마에 가했던 이런저런 여러 가지 변경들 때문에 발목이 잡히기 일쑤다.</strike> 자식테마를 사용하면 이런 "과거의 미련"으로부터 자유로울 수 있다.

### 부모테마 고르기

그럼 자식테마를 한번 만들어보기로 하자. 어렵지 않다. 우선 부모가 될 테마를 하나 선택해야 한다. 어떤 테마든 부모테마가 될 수 있지만, 가급적 워드프레스의 새로운 버전의 기능들이 잘 반영된 테마를 부모테마로 삼는 게 좋다. 

그런 테마에는 어떤 것들이 있을까? 몇 가지만 추려보면 다음과 같다. 그 밖에 더 많은 테마들은 구글에서  'wordpress theme framework'로 검색해 보면 쉽게 찾을 수 있을 것이다. (테마 프레임워크는 자식테마와는 조금 다른 개념이지만, 테마 프레임워크를 부모테마로 사용해도 나쁠 건 없다)

* [Twenty Eleven](http://theme.wordpress.com/themes/twentyeleven/) 워드프레스 3.0의 디폴트 테마
* [Notes Blog Core](http://wordpress.org/extend/themes/notes-blog-core-theme) Smashing WordPress로 유명한 Notes Blog에서 사용하는 테마
* [Thematic](http://wordpress.org/extend/themes/thematic) 인기있는 테마 프레임워크

여기서는 [Notes Blog Core](http://wordpress.org/extend/themes/notes-blog-core-theme) 테마를 사용하기로 한다. 자식테마를 만들기 위해서는 먼저 부모테마가 설치되어 있어야 하니 설치가 안되어 있다면 설치하고 다음으로 넘어가자.

### 자식테마 만들기

자식테마를 만드는 일은 간단하다. 워드프레스의 테마 디렉터리(wp-content/themes/) 아래에 적당한 이름으로 테마 폴더를 하나 생성해 주고 그 속에 style.css 파일만 하나 만들어 주면 끝이다. 그리고 style.css 맨 위에 다음과 같은 주석으로 이 테마가 Notes Blog Core 테마를 부모테마로 하는 자식테마임을 선언해 주면 된다. Template 란에 부모테마의 디렉터리명을 적어주는 것이 중요하다.

<pre class="prettyprint">
/*
Theme Name: 자식 테마 이름
Theme URI: http://your-theme-homepage.com
Description: 뭐든 테마를 기술할 수 있는 말을 적으세요!
Author: 누구?
Author URI: http://your-website.com
Template: notes-blog-core-theme
Version: A version number
.
기타 일반적인 정보들. 예를 들면, 라이선스 정보라든가 플러그인 요구사항, 호환성 정보, 기타 사용자들과 나누고픈 내용들
.
*/
</pre>

이제 워드프레스 대시보드로 가서 방금 전 만든 테마로 변경하자. 처음 만들어진 자식테마는 물론 아직 부모테마와 똑같은 모양이 아닐 것이다. 부모테마로부터 모든 기능을 물러 받았지만, 외모(look & feel) 부분은 아직 물러받지 못했기 때문이다. 

![](http://farm8.staticflickr.com/7193/6966237287_e2e74c6905_z.jpg)

### 테마 변경하기

그럼 이제 style.css에 몇 가지 변경을 가해 보자. 우선 부모테마의 스타일부터 상속받자. style.css 에 다음 한 줄을 추가하고 나면 이제 부모테마와 똑같아 졌을 것이다.

<pre class="prettyprint">
@import url("../notes-blog-core-theme/style.css");
</pre>

부모에 의존하는 것은 여기까지가 끝이다. 이제부터는 자신만의 길을 가야한다. 지금부터 style.css에 추가하는 내용은 부모테마와 달라지는 부분이다. 예를 들어, 부모테마의 글꼴을 나눔고딕체로 변경하고 싶다면 다음과 같은 식으로 자식테마에서 변경해 주면 된다.

<pre class="prettyprint">
body {
	font-family: NamumGothic;
}
</pre>

만약 style.css 외에 테마의 다른 부분을 변경하고 싶다면? 마찬가지다. 부모테마에 있는 테마 파일과 동일한 이름의 테마 파일을 자식테마 디렉터리에 만들어 두고 그 속에서 필요한 변경을 해 주면 된다. 예를 들어, 페이지 테마에 변경을 가하고 싶으면, 부모테마 디렉터리에 있는 page.php 파일을 자식테마 디렉터리에 복사하고 그 복사한 page.php 파일을 변경하면 된다. 언제나 자식테마가 우선이다. 워드프레스는 자식테마인 경우 자식테마의 디렉터리를 먼저 참조하고 없을 경우만 부모테마를 찾는다.

![](http://farm8.staticflickr.com/7046/6966237383_534c87d570_z.jpg)

### 고려해야 할 점들

그렇지만 자식테마가 만병통치약은 아니다. 과다하게 자식테마를 사용하는 것은 결국 부모테마를 직접 고치는 것과 별반 다른 게 없다. 게다가 자식테마를 사용할 경우 워드프레스가 부모테마와 자식테마 간을 상호참조해야 하기 때문에 복잡도가 조금 더 높아지고 약간의 성능감소도 따르는 것이 사실이다. 그렇지만 부모테마를 그대로 쓰되 스타일링 부분만 변경하려 하거나 아니면 funtion.php를 수정하여 약간의 기능변경을 하려 하는 경우라면 자식테마는 좋은 솔루션이 될 수 있을 것이다.

자식테마와 관련해 더 자세한 내용은 아래 참고자료를 참고하자.

### 참고자료

* [Codex Child Themes](http://codex.wordpress.org/Child_Themes)
* [WordPress Child Theme Basics](http://themeshaper.com/2009/04/17/wordpress-child-theme-basics/)
* [Creating your first WordPress child theme](http://www.webdesignerdepot.com/2011/12/creating-your-first-wordpress-child-theme/)
* [WordPress Theme Frameworks: Options You Should Consider](http://sixrevisions.com/wordpress/wordpress-theme-frameworks-options-you-should-consider/)
* [A comparison of leading WordPress theme frameworks](http://www.webdesignerdepot.com/2011/10/a-comparison-of-leading-wordpress-theme-frameworks/)

