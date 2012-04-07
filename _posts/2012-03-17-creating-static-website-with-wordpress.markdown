---
layout: post
title:  워드프레스로 웹사이트 만들기
excerpt: 요즘은 국내에서도 워드프레스를 이용해 웹사이트를 만드는 곳이 많아지고 있습니다. 워드프레스는 다양한 테마 생태계를 가지고 있기 때문에 테마만 잘 선택하면 간단하게 웹사이트를 구축할 수 있다 생각할 수도 있지만, 조금 더 알아서 나쁠 건 없습니다. 워드프레스에서 제공하는 페이지 기능을 활용하여 웹사이트를 한번 만들어 보는 건 어떨까요?
thumbnail: http://farm8.staticflickr.com/7200/6989081345_b3d88c4b48_m.jpg
---

<div class="alert-message block-message info">
	<strong>워드프레스 웹사이트 무료로 제작지원해 드립니다.</strong> 
	지금 <a href="/wordpress-hosting">신청</a>하세요!
</div>	

워드프레스의 인기가 높다. 그래서인지 요즘은 국내에서도 워드프레스를 이용하여 웹사이트를 구축하려는 시도들이 늘고  있다. 그런데 워드프레스는 원래 블로깅 도구로 출발한 탓에 웹사이트와 어울리는 디자인을 만들려면 조금 "손질"이 필요하다. 워드프레스를 블로그로 사용하는 방법은 이미 널리 알려져 있기 때문에 여기서는 워드프레스를 이용하여 웹사이트(흔히 기업이나 단체에서 "홈페이지"라 부르는)를 만드는 법을 소개하려 한다.

우선 아래 웹사이트를 한번 보자. 이 사이트는 [Building a Website with WordPress](http://wpsitebuilding.com/)라는 사이트인데, 워드프레스로 만들었지만 보기에 통상적인 블로그 처럼 보이진 않는다. 워드프레스를 콘텐츠 관리 시스템(CMS) 내지는 그야말로 "정적인 웹사이트(static website)" 만드는 용도로 사용하고 있기 때문이다.

![](http://farm8.staticflickr.com/7052/6989080573_161ed78b7b_z.jpg)

###웹사이트 모드로 변신!

이렇게 워드프레스를 웹사이트로 사용하기 위해서는 몇 가지 기본적인 설정을 해 주어야 한다. 워드프레스가 설치된 상태에서 관리자 페이지의 Settings > Reading 메뉴로 가면 다음과 같이 프론트 페이지 표시를 어떻게 할건지 하는 부분이 나온다. 

![](http://farm8.staticflickr.com/7199/6842957196_252f93d4f5.jpg)

기본값은 최근 포스트들을 나열하는 방식으로 설정되어 있는데, 블로그라면 이 방식이 적합하다. 그렇지만 웹사이트로 만든다고 하면 정적 페이지(static page)로 설정해 주어야 한다. 옵션 값을 변경하고 프론트 페이지(Front Page) 선택하는 부분에서 Sample Page를 선택한 다음 저장하면 이제 워드프레스가 "블로그 모드"에서 "웹사이트 모드"로 변경된다(일부 테마는 테마 자체에서 이 기능을 활성화시키기도 한다). 참고로 여기 Sample Page는 워드프레스가 그야말로 샘플로 넣어 둔 테스트용 페이지로, 나중에 다른 것으로 바꿀 것이다.

###테마 선택하기

워드프레스의 힘은 테마에서 나온다. 어떤 테마를 선택하냐에 따라 워드프레스는 각양각색의 모양새를 만들어 내기 때문이다. 따라서 웹사이트의 용도에 맞는(또는 고객의 요구사항에 부합하는) 적합한 테마를 선택하는 것이 중요하다. 테마는 [WordPress Themes](http://wordpress.org/extend/themes/)에서 무료 테마를 검색해도 좋고 [themeforest](http://themeforest.net/)나 [StudioPress](http://www.studiopress.com/) 같은 유료 테마 사이트를 이용해도 된다. 여기서는 워드프레스의 2010년 기본 테마인 [Twenty Ten](http://wordpress.org/extend/themes/twentyten)을 사용하기로 하겠다. 

테마를 활성(activate) 시키면 다음과 같은 프론트 페이지가 보일 것이다.

![](http://farm8.staticflickr.com/7048/6989080743_cf6547db87_z.jpg)

###포스트 vs. 페이지

워드프레스에서 만들어 낼 수 있는 콘텐츠에는 여러 가지가 있지만 크게는 **포스트(post)**와 **페이지(page)**로 나눌 수 있다. 포스트는 '블로그 포스트' 처럼 말 그대로 계속 새로운 내용으로 채워 나가는 콘텐츠를 만들 때 사용하는 반면, 페이지는 한번 만들어 두면 잘 변하지 않는 콘텐츠에 주로 사용한다. 웹사이트에서 흔히 볼 수 있는 회사소개 페이지나 컨택 페이지 같은 "페이지"들이 바로 워드프레스에서 말하는 그 "페이지"다. 블로그에서는 주로 "포스트"가 중심이 되지만, 정적인 콘텐츠들이 많은 웹사이트에서는 페이지의 비중이 높아진다. 페이지를 만들고 페이지를 커스터마이징 해야 할 일이 많아진다는 말이다.

우선 앞서 임시로 연결해 둔 프론트 페이지 대신 새 페이지를 하나 만들어 보자. 페이지는 워드프레스 관리자로 가서 새 페이지 추가하기를 하면 추가할 수 있다. 여기서는 간단하게 페이지 제목을 "Welcome" 이라 두고 내용에 "환영합니다" 라고 한 줄 적었다. 

![](http://farm8.staticflickr.com/7210/6842956876_81a9be5aff_z.jpg)

이제 관리자 대시보드의 Settings > Reading 에서 앞서와 같이 프론트 페이지를 방금 전 작성한 Welcome 페이지로 변경해 보자. 그러면 사이트의 메인 페이지가 변경된 것을 확인할 수 있을 것이다. 또한 이전에 있던 Sample Page가 메인 페이지의 메뉴 항목에 새로 추가되어 있는 것도 알 수 있을 것이다. 워드프레스 기반 웹사이트에서 페이지들은 기본적으로 이렇게 메뉴 항목에 추가된다.

![](http://farm8.staticflickr.com/7179/6842956928_534f6980f9_z.jpg)

또한 워드프레스는 유연한 **페이지 템플릿** 기능을 제공하기 때문에 원한다면 각각의 페이지마다 다른 페이지 템플릿을 만들어 적용할 수 있다는 점도 참고하면 좋을 것이다.

### '새소식' 페이지 추가하기

아무리 페이지 중심의 정적인 웹사이트라고는 해도 포스트가 없다면 방문자들에게 별 재미가 없을 것이다. 매번 똑같은 페이지만 보일 바에야 굳이 워드프레스를 사용할 이유가 어디 있을까. 메인 메뉴에 "새소식" 메뉴를 하나 추가하고 이 곳에는 새로운 포스트들이 올라오게 해보자. "새소식"이라는 제목으로 새 페이지를 하나 만들자. 이 때 내용에는 아무 것도 쓰지 말고 그냥 빈 채로 둔다.

![](http://farm8.staticflickr.com/7205/6842957128_ff6c073316.jpg)

이제 관리자 대시보드로 가서 Settings > Reading의 프론트 페이지 표시 부분에서 지금까지 비워두었던 두 번째 Posts Page 부분을 방금 만든 빈 "새소식" 페이지로 설정하자. 그런 다음 저장하고 다시 메인 페이지로 와서 보면 "새소식" 메뉴가 추가된 것을 알 수 있다. 이 메뉴를 클릭하면 콘텐츠들이 보일 것이다. 바로 우리가 작성한/그리고 앞으로 계속해서 작성해 올리게 될 새소식 "포스트" 들이다.

![](http://farm8.staticflickr.com/7201/6989081037_7fdb762048_z.jpg)

###'블로그' 흔적 지우기

그런데 여기 한 가지 문제가 있다. 원래 워드프레스의 많은 부분이 블로그를 전제로 구성되어 있는 탓에, 워드프레스를 웹사이트 모드로 전환하면 여기저기 조금 어색한 부분들이 생기게 된다. 예를 들어 앞서 만든 메인 페이지에 댓글은 굳이 필요가 없다. 마찬가지로 컨택 페이지나 회사소개 페이지 같은 곳에서도 굳이 댓글을 달게 할 필요는 없을 것이다.  

이 때는 테마를 수정해 주면 된다. 알다시피 워드프레스 테마는 여러 개의 테마 파일들로 구성되는데, 그 중 페이지 처리를 담당하는 테마 파일이 **페이지 템플릿**(page.php) 이다. 이 템플릿 파일을 열어 그 속에 있는 댓글 출력과 관련된 코드를 제거해 주면 이제 페이지에서 댓글이 사라진다. 이 때 테마를 수정하는 방법으로는 테마 자체를 직접 수정해도 되지만, [자식테마를 사용하여 관리](http://usefulparadigm.com/2012/03/09/customizing-wordpress-theme-using-child-theme/)하는 것도 좋은 방법이다. 참고로, 지금 사용하고 있는 TwentyTen 테마의 경우 loop-page.php 파일을 열어 그 속에서 comments_template() 함수 호출 부분을 제거해 주면 된다.

![](http://farm8.staticflickr.com/7055/6989102261_f3787957d3_z.jpg)

이 밖에도 처리해야 할 일들이 많이 있다. 예를 들면, 워드프레스의 기본 기능인 카테고리(category)나 태그(tag) 기능도 조금 더 웹사이트에 맞춰 변경해 주어야 하고, 페이지의 URL 들도 웹사이트에 맞게 조정해 주는 것이 좋다. 관리자용 대시보드의 경우도 불필요한 것들은 제거해 주어서 글을 작성하는 사람들이 조금 더 편하게 입력할 수 있게 해 주는 것이 좋고, 필요한 위젯이나 플러그인들도 설치해 주어야 한다. 참고자료에 몇 가지 도움이 되는 플러그인들을 소개하였으니 참고하면 좋을 것이다.

### 다른 방법들

지금까지는 워드프레스의 페이지 기능을 사용하여 정적인 웹사이트를 만드는 법을 알아 보았다. 그렇지만 워드프레스에서 웹사이트를 만들 때 꼭 이 방법만을 사용해야 하는 건 아니다. 앞서는 워드프레스에서 기본으로 제공하는 프론트페이지 설정 기능을 이용하였지만, 이 밖에 index.php 템플릿 파일을 직접 수정(권장하진 않는다)하거나 홈페이지용 템플릿인 home.php 파일을 추가하는 방식으로도 가능하다. 

또한 경우에 따라서는 기존 블로그 스타일을 유지하면서도 얼마든지 웹사이트 "스럽게" 보이는  사이트를 만들 수도 있다. 그 대표적인 방법이 매거진(magazine) 스타일의 테마와 같은, 적합한 용도의 테마를 사용하는 것이다. 아래는 상용 워드프레스 테마 중 하나인 [PageLines](http://www.pagelines.com/showcase/genres/magazine/)의 데모 화면들인데, 보다시피 블로그라기 보다는 훨씬 더 웹사이트에 가까워 보인다.

![](http://farm8.staticflickr.com/7200/6989081345_b3d88c4b48_z.jpg)

이상으로 워드프레스를 웹사이트 용도도 사용하는 방법을 간단하게 소개했다. 지금까지 살펴 본 것만으로도 워드프레스가 얼마나 자유롭게 변형이 가능한 강력한 도구인지 가늠이 되었을 것이다. 그렇지만 이게 전부가 아니다. 차라리 맛보기 정도라고 불러야 맞을 것이다. 이 밖에도 워드프레스를 용도에 맞게 변경해서 사용할 수 있는 방법들은 헤아릴 수 없을 정도로 많다. 한마디로 "Sky is the limit" 이다.

###참고자료

**참고문서**

* [How to Build a Website with WordPress](http://wpsitebuilding.com/how-to-build-a-website-with-wordpress)
* [Creating a Static Front Page](http://codex.wordpress.org/Creating_a_Static_Front_Page)
* [WordPress CMS Plugins](http://digwp.com/2012/01/wordpress-cms-plugins/)

**웹사이트 만들 때 사용하기 좋은 테마들**

* [Genesis Framework](http://www.studiopress.com/themes/genesis)
* [PageLines](http://www.pagelines.com/)
* [Thematic](http://wordpress.org/extend/themes/thematic)
* 기타 각종 유/무료 테마들은 구글 등 검색엔진에서 "[wordpress magazine theme](https://www.google.co.kr/search?q=wordpress+magazine+theme)"이나 "[wordpress website theme](https://www.google.co.kr/search?q=wordpress+magazine+theme)" 등의 검색어로 검색하면 쉽게 찾을 수 있다 

**웹사이트에서 사용하면 좋을 유용한 플러그인들**

* [WP-CMS Post Control](http://wordpress.org/extend/plugins/wp-cms-post-control/) 관리자 페이지를 CMS 용도에 맞게 수정
* [My Page Order](http://wordpress.org/extend/plugins/my-page-order/) 드래그드롭 방식으로 페이지 정렬
* [Fold Page List](http://www.webspaceworks.com/resources/wordpress/30/) 중첩 페이지 목록 표시
* [Page Links To](http://wordpress.org/extend/plugins/page-links-to/) 워드프레스 페이지에서 외부 URL 링크
* [PageMash](http://wordpress.org/extend/plugins/pagemash/) 드래그드롭으로 페이지 구조 관리
* [Flutter](http://wordpress.org/extend/plugins/fresh-page/) 커스텀 페이지 패널 작성
* [Pods CMS](http://podscms.org/) 범용 워드프레스 CMS 확장
* [Rich Text Widget](http://wordpress.org/extend/plugins/rich-text-widget/) 위젯에 리치 텍스트 추가
* [Exec-PHP](http://wordpress.org/extend/plugins/exec-php/) 페이지나 포스트 속에서 php 코드 사용
