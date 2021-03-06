---
layout: post
title: "\"한국형\" 웹사이트와 워드프레스 게시판"
description: 국내에서 워드프레스로 웹사이트를 제작하려 할 때 일반적으로 생기는 요건 중 하나는 웹사이트에 게시판을 추가하는 것입니다. 이 글에서는 워드프레스에 게시판을 추가하는 것이 어떤 의미이고, 어떠 어떤 방법들이 있는지 알아봅니다.
categories: [wordpress, essay]
tags: [website]
---

[워드프레스](http://wordpress.org/)에 대한 관심이 높아짐에 따라 국내에서도 요즘은 워드프레스로 웹사이트를 만들려는 분들이 많아지고 있습니다. [워드프레스로 웹사이트를 제작](/2012/03/17/creating-static-website-with-wordpress/)하려는 분들이 갖는 워드프레스에 대한 공통적인 "느낌"은 대략 이런 것들인 것 같습니다. 

> 만들기 쉽고 관리하기도 편하고 검색도 잘되고 또 무엇보다도 "공짜"!

맞는 말입니다. 그리고 또 워드프레스로 웹사이트를 제작하려는 분들이 갖는 공통적인 "요구사항"이 하나 있는데 그건 바로 웹사이트에 "게시판"을 몇 개 달고자 한다는 것입니다. 우리가 아주 오래 전 호랑이 담배피던 시절 -- bbs시절 -- 부터 봐 왔던 바로 그 "게시판" 말입니다. 그런데 그 간단할 것 같고 낡디 낡고 흔하디 흔한 "게시판"이 워드프레스에서는 안된다는 말을 접하고는 조금 당황하게 됩니다.

> "아니 그 간단한 게 왜 안되나요?"

맞습니다. 결론부터 말하면 "**안됩니다.**" 개그콘서트 정여사 버전을 빌리자면 "안되도 너~무 안됩니다." 하지만 세상에 안되는 건 없다고 믿는 분들도 계십니다. 워드프레스 게시판도 마찬가지입니다. 워드프레스 기본엔진을 뜯어 고쳐 게시판을 우겨 넣기로 한다면 완전 안될거야 또 없습니다. 그렇지만 워드프레스라는 오픈소스는 기본적으로 블로깅 엔진으로 출발했고 지금은 CMS라 우기고 있는 솔루션입니다. 솔루션은 [정해진 목적에 맞춰 사용하는 게 효율적](http://wpu.kr/note/%ED%95%9C%EA%B5%AD%ED%98%95-%EA%B2%8C%EC%8B%9C%ED%8C%90%EC%9D%B4-%EB%90%98%EB%8A%94-%EC%9B%8C%EB%93%9C%ED%94%84%EB%A0%88%EC%8A%A4%EA%B0%80-%EB%8F%84%EB%8C%80%EC%B2%B4-%EB%AC%B4%EC%97%87%EC%9D%BC/) 입니다. 말하자면 맞춤옷에 대비되는 기성복인 셈이죠. 워드프레스로 게시판을 만드는 게 왜 안되는지 그  기술적인 이유는 여기서 주절이 늘어 놓지 않겠습니다. (궁금하면 5백원!)

![](https://usefulpa.s3.amazonaws.com/images/2013/campus-board.jpg)

## "한국형" 워드프레스 게시판들

> 안된다구요? 이미 워드프레스 게시판 플러그인들이 많이 있잖아요?

라고 반문하실 수도 있습니다. 맞습니다. 이미 국내에는 여러 종류의 [한국형 워드프레스 게시판 플러그인들](http://heiswed.tistory.com/entry/%EC%9B%8C%EB%93%9C%ED%94%84%EB%A0%88%EC%8A%A4-%ED%95%9C%EA%B5%AD%ED%98%95-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EB%AA%A8%EC%9D%8C)이 나와 있습니다. 인터넷 검색만 해 봐도 다음과 같은 플러그인들이 있으며, 이들 모두 통상적인 워드프레스 플러그인들과 마찬가지로 설치하여 활성화시키면 바로 사용할 수 있습니다.

* [LH보드](http://www.lhboard.com/)
* [MH보드](http://ssamture.net/mh-board)
* [AMUMU보드](http://www.amumu.kr/plugins/amumu-board-download/)

그런데 뭐가 문제냐구요? 문제는 "**한국형**" 이라는 수식어에 있습니다. 우리가 생각하는 "게시판"의 수준은 아주 높습니다. 그리고 워드프레스 게시판 플러그인들이 제공할 수 있는 수준은 여기에 비하면 턱없이 낮을 수 밖에 없습니다. [제로보드(XE)](http://www.xpressengine.com/)나 [그누보드](http://sir.co.kr/) 같은 설치형 게시판이나 혹은 포털사이트의 인터넷 카페에서 쓰던 게시판 수준 생각하고 접근하면 낭패를 보기 십상입니다. 아직 그 수준에 이른 플러그인들은 없으며 앞으로도 나오기가 쉽지 않을 테니까요. 

한국의 워드프레스 개발자들이 실력이 없어 그런 건 아닙니다. 그 근본적인 이유는 워드프레스 엔진의 기술적 구조에 있습니다. 워드프레스 엔진은 한국형 게시판을 100% 구현해 넣기엔 부적합한 구조를 갖고 있습니다(나쁘다는 의미가 아니라 다르다는 의미에서). 그러니 이런저런 꼼수(?)를 찾아 다닐 수 밖에요. 이와 관련해서 국내 한 블로그에 소개된 [분투기](http://www.nam.or.kr/archives/691)를 읽어 보셔도 재미있을 것 같습니다.

## 워드프레스에 게시판 추가하기

눈높이를 조금 낮추면 문제는 한결 수월해 집니다. 이제 워드프레스에 맞는 "가벼운" 게시판을 하나 만들어 추가해 보기로 하겠습니다. 통상적으로 워드프레스에 게시판을 추가하는 것은 글(포스트)들을 특정한 카테고리로 묶고 해당 카테고리의 글 목록을 워드프레스 페이지(page)에 표시하는 방식으로 하게 됩니다. 예를 들어, "자유게시판" 이란 제목의 게시판을 하나 만든다고 하면 다음과 같은 순서를 따릅니다.

1. 우선 "자유게시판"이란 이름의 카테고리를 하나 만듭니다.
2. 이번엔 "자유게시판"이란 이름의 페이지를 하나 생성합니다(이름은 뭐든 상관 없습니다).
3. "자유게시판" 페이지에 "자유게시판" 카테고리로 작성된 글들의 목록을 게시판 형태로 표시합니다.
4. "자유게시판" 페이지를 메뉴에 추가하여 게시판으로 접근할 수 있게 만듭니다.

페이지 속에 글 목록을 넣는 방법은 여러 가지입니다만, 흔히 사용되는 방법은 플러그인에서 제공하는 단축코드(shortcode)를 활용하는 방법입니다. 예를 들어, 위의 게시판 플러그인들 중 하나인 [MH보드](http://ssamture.net/mh-board)를 사용한다면, MH보드에서 제공하는 단축코드인 '`[mh_board]`'를 페이지 본문 속에 넣어주면 이 부분이 게시판으로 치환되어 화면에 표시되는 식입니다(아래 그림).

![](https://usefulpa.s3.amazonaws.com/images/2013/mh-board-screenshot.png)

기술적으로는, 페이지 속에 글 목록을 넣는다는 것은 워드프레스에서 [커스텀 쿼리](http://codex.wordpress.org/Custom_Queries)를 사용하여 루프(loop)를 구성하는 것을 의미합니다. 그리고 이 경우 그 쿼리의 조건값은 특정 카테고리에 속한 모든 글들을 추출하여 목록으로 표시하는 것이구요. 따라서 굳이 게시판 플러그인을 사용하지 않더라도 페이지 속에서 커스텀 쿼리를 구성할 수 있는 방법이라면 뭐든 가능합니다. 예를 들어 [List category posts](http://wordpress.org/plugins/list-category-posts/)나 [Display Posts Shortcode](http://wordpress.org/plugins/display-posts-shortcode/) 같은 플러그인을 사용할 수도 있고, 간단하게 직접 커스텀 쿼리가 들어간 템플릿을 작성해도 됩니다.

말이 나온 김에 간단한 템플릿을 하나 만들어 보겠습니다. 특정 카테고리의 글들을 게시판 형태로 보여주는 템플릿인데, 페이지명(slug)과 일치하는 카테고리명(slug)을 가지는 모든 글들을 보여주는 간단한 페이지 템플릿입니다. 일종의 관례(convention)을 만든 것인데요. 이럴 경우, 사용자는 이 템플릿 파일을 테마 디렉터리 속에 넣어 두고, 게시판이 필요할 경우 새 페이지를 하나 생성하고 그 페이지의 템플릿을 이 게시판 템플릿으로 지정하면 자동으로 게시판이 하나 만들어지게 됩니다. 게시판에 글을 쓸 때는 글(포스트)의 카테고리만 게시판 페이지명과 일치하게 주면 자동으로 해당 게시판에 글이 게시가 되는 식입니다.

커스텀 쿼리는 다음과 같이 주었습니다:

	$args = array(
		'category_name' => get_query_var('pagename'), 
		'posts_per_page' => 5, 
		'paged' => get_query_var('paged')	
	);

	// The Query
	query_posts( $args );

위 코드가 적용된 페이지 템플릿을 얼마 전 소개한 적이 있는 [다음 Dough 기반 워드프레스 테마](/2013/06/04/introducing-doughnut-wordpress-theme/)인 [도넛(Doughnut)](https://github.com/usefulparadigm/doughnut)에 적용하면 아래와 같은 결과가 만들어 집니다. 어떠세요? 제법 게시판 같아 보이나요?

![](https://usefulpa.s3.amazonaws.com/images/2013/board-sample-shot.png)

이렇게 직접 템플릿을 구성하면 사용자 인터페이스 변경이 수월해지는 장점이 있습니다. UI를 입맛에 맞게 마음대로 커스터마이징할 수 있습니다. 여기에 사용된 페이지 템플릿 소스는 [도넛(Doughnut)](https://github.com/usefulparadigm/doughnut) 코드 속에 들어 있으니 [참고](https://github.com/usefulparadigm/doughnut/blob/master/board-sample.php)하시면 되겠습니다.

이 글에서 따로 소개는 하지 않겠지만, 사용자들이 직접 글을 작성할 수 있도록 "글쓰기" 기능을 추가하는 것도 마찬가지입니다. 여러 가지 방법이 있고 그 중 적절한 것을 고르면 됩니다. 예를 들어 [WP User Frontend](http://wordpress.org/plugins/wp-user-frontend/) 같은 플러그인을 사용하는 것도 간단한 한 가지 방법이 될 수 있습니다.

[펄(Perl)](http://www.perl.org/) 프로그래밍 격언 중에 "**TMTOWTDI**"라는 말이 있습니다. 어떤 일을 하는데는 한 가지 이상의 방법이 있다([There's more than one way to do it](http://en.wikipedia.org/wiki/There's_more_than_one_way_to_do_it))는 말인데요. 이 말은 워드프레스에도 그대로 적용되는 것 같습니다.

## 업데이트

이 글을 포스팅한 후에 댓글 또는 이메일, 트위터 등을 통해 몇몇 분들께서 좋은 정보를 더해 주시고 또 여기에 추가해 주면 좋겠다고 말씀하시는  내용들이 있어 아래에 간략하게 덧붙입니다.

1. [HwangC의 착한 워드프레스 블로그](http://www.hwangc.com/wordpress-forum-plugin-10-theme-6/)에는 bbPress 등 워드프레스 게시판으로 사용할 수 있는 여러 가지 국내외 플러그인과 테마들이 잘 정리되어 있습니다.
2. [Cosmosfarm](http://www.cosmosfarm.com/)에서 개발한 오픈소스 게시판 플러그인 [KBoard](http://www.cosmosfarm.com/products/kboard)는 워드프레스에서 기본으로 제공하는 데이터 구조를 사용하는 대신, 게시판과 댓글 처리를 위해 기본 워드프레스 엔진에 4개의 추가적인 DB테이블을 덧붙이는 방식을 씁니다. 때문에 여늬 "한국형" 게시판들 같은 수준높은 게시판을 구성할 수 있는 장점이 있습니다. 워드프레스를 굳이 이렇게까지 확장해서 쓸거면 차라리 [XE](http://www.xpressengine.com/)나 [그누보드](http://sir.co.kr/)를 써서 웹사이트를 만드는 게 낫지 않나 생각할 수도 있지만, 아무튼 워드프레스로 게시판 달린 웹사이트를 **굳이 만들어야만** 하는 "한국형" 개발사 현실에서는 고마운 솔루션이 아닐 수 없습니다. 