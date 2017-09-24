---
layout: post
title: Craft CMS로 콘텐츠 중심 웹사이트 만들기
description: 다양한 콘텐츠를 담고 관리할 때 사용하면 좋은, 콘텐츠 중심 웹사이트를 위한 오픈소스 CMS 솔루션 Craft CMS를 소개합니다.
thumbnail: https://usefulpa.s3.amazonaws.com/images/2017/craftcms-homepage.png
image: https://usefulpa.s3.amazonaws.com/images/2017/craftcms-homepage.png
category: ["web development"]
tags: ["cms", "website", "opensource"]
---

요즘은 웹사이트 만드는 일이 별로 어렵지 않다. 시중에는 [워드프레스(WordPress)](https://wordpress.org/) 처럼 쉽고 편리한 도구들이 많이 나와 있고 온라인 상에는 가입만 하면 바로바로 쓸 수 있는 웹사이트 호스팅 서비스들도 많다. 랜딩 페이지(landing page) 처럼 좀 더 가벼운 웹사이트라면 [지킬(Jekyll)](http://jekyllrb.com/)이나 [휴고(Hugo)](http://gohugo.io/) 같은 정적 페이지 빌더를 사용하면 그만이다.

이렇게 많은 도구들이 세상에 이미 존재하는데 또 무엇이 필요할까?

블로그처럼 웹사이트에 담기는 내용이 간단한 글(post) 이거나 브로셔나 랜딩 페이지처럼 몇 장의 소개 페이지 정도라면 걱정할 게 없다. 워드프레스 설치하고 테마 하나 입혀 뚝딱 만들면 된다. 필요한 기능이 있다면 플러그인 몇 개 찾아 설치하면 그만. 

그런데 만약 좀 더 복잡하고 다양한 콘텐츠를 담아야 하는 웹사이트라면? 가령,

- 다양한 유형의 미디어 콘텐츠들을 담아서 보여주는 미디어 사이트
- 다양한 강의 내용이 담긴 온라인 강좌 사이트
- 여러 종류의 음식 레시피를 담고 있는 요리 정보 사이트
- 다양한 제품에 대한 정보를 제공하는 리뷰 사이트
- 기업과 채용에 관한 정보를 모아 둔 온라인 채용 사이트

여기서 중요한 것은 콘텐츠(content) 다. 미디어 사이트라면 ‘미디어’가 콘텐츠가 되고 온라인 강좌 사이트는 ‘강의’가 콘텐츠이고 제품 사이트라면 ‘제품’이 요리 사이트에는 ‘레시피’가 콘텐츠인 셈이다. 결국 웹사이트는 콘텐츠를 담는 그릇이고 그 콘텐츠를 얼마나 잘 담을 수 있냐가 관건이 된다.

이런 콘텐츠 중심의 웹사이트를 만들려면 어떻게 하면 좋을까? 

> 워드프레스를 쓰면 되지 않나?   

물론 워드프레스로도 못할 건 없다. 혹은 여력이 되면 [루비온레일스](http://rubyonrails.org/)나 [장고](https://www.djangoproject.com/), [라라벨](https://laravel.com/) 같은 웹 프레임워크를 사용해서 직접 만들어도 된다. 하지만 전자는 필요 이상으로 친절(?)하고 후자는 해야할 일이 너무 많다. 이 둘의 어느 중간 지점 쯤에 있는 도구면 좋지 않을까? 적당히 친절하면서 그렇다고 너무 버겁지도 않은.


## 안녕하세요, Craft!
[Craft CMS](https://craftcms.com/)(이하 ‘Craft’)는 바로 그 지점, 즉 ‘콘텐츠’ 그 자체에 초점을 맞춘 웹사이트 제작 도구다. 어떻게 하면 다양한 콘텐츠들을 가장 잘 표현하고 가장 잘 담을 수 있을까에 방점을 찍었다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/22D1E3AC-A031-4164-B8BB-45D6B223EAB8.png)

Craft는 [Pixel & Tonic](https://pixelandtonic.com/) 에서 만든 오픈소스 CMS 솔루션으로 PHP 웹 프레임워크인 [Yii framework](http://www.yiiframework.com/)를 기반으로 하고 있다.  2017년 9월 현재 최신 버전은 2.6.x 이며 [버전 3은 베타 버전](https://craftcms.com/news/craft-3-beta-update) 상태다.

이 글에서는 Craft를 설치하고 음식 레시피를 만들어 올리는 간단한 레시피 사이트를 한번 만들어 보면서 Craft의 주요 개념과 기본 사용법을 소개하기로 한다. 워드프레스에 익숙한 분들을 위해 중간중간 워드프레스와 비교하면서 설명을 할 예정이니 참고 바란다.

자, 그럼 시작해 보자!


## Craft 설치하기
설치는 비교적 간단한 편이며 설치 방법도 워드프레스 비슷하다.

1. Craft 사이트에서 소스코드를 다운로드 받아 압축을 푼다.
2. Craft를 위한 데이터베이스를 생성: `$ mysqladmin -uroot -p create hellocraft`
3. 데이터베이스 연결 설정: craft/config/db.php 파일 편집
4. 서버 실행 `$ php -S 0.0.0.0:8080 -t public/`
5. 설치 시작 URL 접속: http://localhost:8080/admin

시작 페이지가 나오면, “시작” 버튼을 눌러 설치를 시작한다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/CF497D7C-C67D-4FCB-811F-7860FD1B6AF9.png)

단계별로 하라는 대로 따라 가면,

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/EF2043FF-0CD7-43A5-A4E5-8D0DFC008987.png)

 설치가 완료된다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/62A4820B-D9F6-4B7F-B399-672977BB61D7.png)

Craft CMS에 접속하여 ‘계기판(Control Panel)’이 나오면 설치가 끝난 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/986BE421-626D-43AE-89EA-D10DFFD986B5.png)

첫 느낌이 어떤가? 워드프레스와 비슷하다. 관리자 화면의 UI도 워드프레스와 비슷하지만 한눈에 봐도 메뉴가 훨씬 단촐하다.  좌측 사이드의 메뉴라고는 ‘계기판’, ‘엔트리’, ‘설정’이 전부다. 


## 테마는 없다
워드프레스와 달리 Craft에는 테마가 없다. 따로 테마(theme)라는 개념이 없다. 처음 설치를 완료하고 웹사이트 URL로 접속하면 아래와 같이 그냥 허접한 Welcome 페이지만 덩그러니 자리잡고 있을 뿐, 워드프레스처럼 테마를 선택하거나 교체하는 그런 건 없다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/C088C4B0-063C-4624-859D-A70ED15DCB5B.png)

Craft에서는 모든 것을 직접 만들어 나가야 한다. 웹사이트 레이아웃을 디자인하고 콘텐츠들을 적절하게 배치하고 하는 모든 일들을 사용자(또는 개발자)가 직접 처리해 줘야 한다. Craft는 다만 한 가지 일, 즉 콘텐츠를 만들고 관리하는 일만 할 뿐이다.

## 사이트 디자인 변경하기
우선 몸풀기로, 사이트 디자인을 바꾸는 것부터 시작해 보자. 간단하게 [Twitter Bootstrap](http://getbootstrap.com/docs/3.3/getting-started/#download) 을 적용할 것이다. 

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/C522CA1D-A828-4C36-BEE5-114992F256BA.png)

부트스트랩을 다운로드 받아 Craft의 public 폴더 아래에 복사하고, craft/templates 폴더(이하 ‘templates 폴더’) 에 있는 _layout.html 파일을 열자.

기존 인라인(inline) 처리된 style 부분이 보이면 삭제하고 대신 그 자리에 부트스트랩 로딩 코드를 다음과 같이 삽입하자.

{% raw %}
```twig
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US">
<head>
  <meta charset="utf-8" />
  <title>{% if title is defined %}{{ title }} - {% endif %}{{ siteName }}</title>
  <link rel="home" href="{{ siteUrl }}" />

  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="/js/bootstrap.min.js"></script>
</head>
```
{% endraw %}

(여기서는 부트스트랩 소스코드를 다운로드하여 링크를 거는 방식을 택했지만, 다운로드 없이 바로 CDN 링크 방식으로 처리해도 무방하다) 

이제 홈페이지에 다시 접속해 보면, 부트스트랩이 적용되어 사이트 디자인이 변경되어 있음을 확인할 수 있다. 

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/EAE44DE7-C026-415E-89F7-6B6DE7E608BC.png)

이런 식이다. Craft에서는 웹사이트에 필요한 모든 페이지의 디자인을 하나하나 일일이 직접 만들어 줘야 한다. 지금처럼 레이아웃도 그렇고 메인 페이지와 목록 페이지, 각각의 콘텐츠를 표시하는 페이지 등 모든 페이지들을 HTML 코드부터 CSS 스타일링까지 직접 처리해야 한다. 워드프레스로 치면, 커스텀 테마를 직접 만든다고 생각하면 된다.


## 블로그 포스트 만들기
자, 그럼 이제 Craft의 핵심인 콘텐츠를 한번 만들어 보자. 우선 간단하게 블로그에서 주로 쓰이는 포스트(post)를 한번 만들어 보기로 하자.

어드민 대시보드(Craft에서 이를 Control Panel이라고 하며 흔히 줄여서 ‘CP’라고도 함)에 접속하여 “엔트리” 메뉴를 클릭하면 다음과 같이 보인다. ‘싱글’이라는 게 있고, ‘채널’이라는 제목 아래 ’News’라는 것도 보일 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/D880BCFB-90B2-46D3-8184-60AA4C829D3A.png)

News는 Craft가 디폴트로 만들어 놓은 콘텐츠 유형이다.

알다시피 워드프레스에는 기본적으로 2가지의 콘텐츠 유형(content types)이 있다. 포스트(Post)와 페이지(Page). 물론 커스텀 콘텐츠 유형을 추가하는 기능이 제공되지만 이 두 가지 콘텐츠 유형이 중심이며 삭제할 수도 없다. 

반면 Craft에는 기본 콘텐츠 유형이라는 게 없다. 사용자가 직접 콘텐츠 유형을 설계하고 만들어야 한다. 방금 전 ‘News’는 기본으로 제공되는 콘텐츠 유형이긴 하지만 Craft가 그냥 샘플로 하나 만들어 둔 것이며 삭제해도 무방하다. 사이트에서 꼭 필요한 콘텐츠 유형을 직접 만들어 사용하는 게 Craft의 기본이다.

### 포스트 항목 만들기

이런 콘텐츠 유형을 Craft에서는 ‘항목(Entry)’이라고 부른다. 달리 말해 ‘항목’은 Craft에서 콘텐츠의 기본 단위다. 워드프레스에서 ‘글(Post)’이 콘텐츠의 기본 단위인 것처럼.

그럼 ‘포스트’ 항목을 하나 만들어 보기로 하자. 

컨트롤 패널(이하 ‘CP’)에서 “설정” 메뉴를 클릭해 보자. 아래와 같은 화면이 보일 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/FD247AFF-12BC-414C-9C76-E6D1590845C7.png)

여기서 항목을 추가하면 될 것 같은데, 아무리 찾아도 ‘항목’이라는 메뉴는 보이질 않는다.  항목을 만들기 위해서는 먼저 ‘**섹션(Section)**’ 이라는 개념을 알아야 한다.

Craft에서는 섹션이 있고 섹션(Section) 아래에 항목(Entry)이 온다. 즉, 섹션은 항목을 담는 그릇이다. 그리고 이 섹션은 다음 3가지의 유형이 제공된다.

- 싱글(Singles)
- 채널(Channels)
- 구조(Structures)

**싱글(Singles)** 섹션은 말 그대로 한 페이지 짜리 콘텐츠를 담는데 쓰인다. 예를 들면 메인페이지나 About 페이지 같은. 워드프레스로 치면 페이지(Page) 개념에 해당된다.

한편 **채널(Channels)** 섹션은 일련의 콘텐츠들을 담는데 사용되는 섹션이다. 블로그나 뉴스스트림, 레시피 목록 등 유사한 콘텐츠들을 한데 담을 때 사용한다. 워드프레스의 포스트(Post) 개념과 같다. 

**구조(Structures)** 섹션은 채널과 유사하지만 일련의 콘텐츠들이 일정한 순서와 계층으로 조직된 경우에 사용되는 섹션이다. 예를 들면, 계층구조를 갖는 매뉴얼 문서라든지 조직체계 같은 콘텐츠를 표현할 때 사용할 수 있다. 워드프레스에는 이 구조 섹션과 동일한 개념은 없다. 다만 페이지를 계층형으로 구성함으로써 구조 섹션과 비슷한 것을 만들어 낼 수는 있을 것이다.

앞서 Craft를 설치하면 바로 보였던 ‘News’ 항목이 무엇인지 이제 조금 이해가 될 것이다. 이 항목은 채널 섹션, 즉 채널 유형이다. 그러니 채널 섹션 아래에 놓여 있었던 것이다.

Craft의 섹션 유형에 관한 더 자세한 내용은 Craft 문서를 참조하면 된다.
[Sections and Entries | Documentation | Craft CMS](https://craftcms.com/docs/sections-and-entries#section-types)

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/C07216C1-A767-47FB-89AB-22CD2CA3582E.png)

설명이 좀 길었다.

우리가 지금 만들 블로그 포스트 역시 채널 섹션이다. 동일한 유형의 콘텐츠들을 날짜 별로 쌓는 것이니 ‘채널’ 섹션으로 처리하면 된다. 

새로 채널 섹션을 하나 만들자. 이름을 ‘Post’로 주고 섹션 타입은 ‘채널’로 맞추고 나머지는 그대로 둔다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/186B1A6D-F2A4-4E2B-93C0-DFB7B5FA0865.png)

저장하고 밖으로 나가면 새로 Post라는 섹션이 만들어진 것을 알 수 있다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/F7750A26-5F46-4F5A-830B-25FBB7B7AFDA.png)

여기서 “엔트리 유형 편집하기”를 클릭하면 Post 항목 타입도 이미 만들어져 있음을 알 수 있다. 이 때의 Post는 ‘섹션’이 아니라 엔트리, 즉 ‘**항목(Entry)**’이다. Craft가 섹션을 만들면서 그 섹션에 해당하는 항목도 자동으로 만들었다. (나중에 다시 얘기하겠지만 Craft에서 하나의 섹션에는 반드시 하나의 항목만 들어가는 게 아니다. 하나 이상의 항목을 가질 수 있다. 그래서 섹션 아래에 항목을 둔 것이다. 여기서 Post 항목은 Post 섹션을 만들 때 디폴트로 생성된 항목일 뿐이며, 원하면 얼마든지 새로운 항목을 Post 섹션 내에 추가할 수 있다)

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/D14B6EA7-65A5-48AE-ADEC-0009E22835FE.png)

Post 항목을 클릭해 보자. Post 항목에 대한 정보가 표시될 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/79B1C532-9512-48AA-8642-0A66F8611BFA.png)

항목 보기 하단에는 ‘필드 레이아웃 디자인’ 이라는 영역이 보일 것이다. 이 부분이 항목의  필드 정보를 디자인하는 부분이다. 항목을 하나의 콘텐츠라고 한다면, 바로 여기서 콘텐츠를 구성하는 필드들의 정보를 구성할 수가 있다. 

워드프레스에서 글과 페이지를 포함한 모든 콘텐츠의 기본 필드가 제목(title)과 본문(body) 뿐인 것과는 달리, Craft에서는 각각의 항목 별로 그에 맞는 필드를 다르게 가져갈 수 있는 것이다. 진정한 CMS의 면모다. (물론 워드프레스에서도 [커스텀 필드 Custom Fields](https://codex.wordpress.org/Custom_Fields)로 필드를 확장할 수 있고, [ACF 플러그인](https://www.advancedcustomfields.com/) 같은 확장을 사용하면 좀 더 편리하게 필드를 관리할 수 있긴 하다)

그럼 필드를 한번 추가해 보자.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/4630167B-C65D-4283-ADA2-A68D1E4AAEA5.png)

“+ 새로운 탭” 버튼을 클릭하여 새 탭을 하나 생성하고 아래와 같이 DEFAULT 레이아웃에 있는 필드들을 드래그하여 새 탭으로 가져다 놓은 다음 저장하자.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/2DE3CB7F-E205-4F48-8F5D-44A527F11BE7.png)

방금 우리가 만든 Post 항목은 이제 ‘본문’과 ‘태그’라고 하는 2개의 필드를 갖는다. (‘제목’ 필드는 항상 따라 다닌다)


## 엔트리 추가하기
Post 항목을 만들었으니 이제 이 항목으로 실제 콘텐츠를 하나 만들어 보자. CP에서 “엔트리” 메뉴를 클릭하자. 채널 메뉴 아래에 ‘Post’ 채널이 추가되어 있을 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/5AC95821-02AE-4944-87ED-B7A1DB5C81F0.png)

Post 라는 엔트리를 클릭해 보면 아무 것도 없는 빈 목록이 표시된다. 새로 포스트를 하나 만들어 보기로 하자. 상단의 “+새로운 항목” 버튼을 클릭하여 “Post” 를 선택하면 다음과 같이 새로운 엔트리 만들기 화면이 표시된다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/386A35EE-630E-4F27-A7FD-98B05CEF4914.png)

이 부분은 워드프레스 여타 다른 CMS의 편집기 화면과 별로 다를 게 없다. 참고로 Craft는 내부적으로 WYSIWYG 에디터로 [Redactor](https://imperavi.com/redactor/) 를 쓴다. (워드프레스는 디폴트로 TinyMCE를 사용)

콘텐츠를 한번 입력해 보자.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/2049AC38-816F-4DB8-8A5A-52178B372D63.png)

여기서 잠깐! 미리 볼 수는 없을까? Craft에는 실제로 콘텐츠 입력할 때 미리보기(Preview)를 할 수 있는 기능이 내장되어 있다. 그런데 아직 템플릿을 만들지 않았기 때문에 이 기능은 사용할 수 없다. 나중에 다시 설명한다.

우선은 저장하고 나가자. 새 콘텐츠가 Post 항목으로 추가된 것을 확인할 수 있을 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/69BFA5F4-52C8-4CCB-A831-B955D65770C6.png)

그럼 이게 실제 브라우저에서는 어떻게 보이는지 한번 보도록 하자. 항목 목록 맨 오른쪽에 있는 지구본 아이콘(웹페이지 방문)을 클릭하면 새 브라우저 창이 열리면서 콘텐츠의 내용이 표시될 것이다. 그런데.. 어? 페이지가 없다고 나온다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/DB6ABCD4-07A7-449D-BA26-546AB9DF59A4.png)

맞다. 아직 우리가 이 콘텐츠 항목과 맵핑되는 템플릿을 만들지 않았다. 앞서 말했듯 Craft에서는 모든 페이지를 직접 만들어 줘야 한다. (알다시피 워드프레스에는 템플릿 계층 개념이 있어 해당 콘텐츠 유형에 맞는 템플릿이 없을 경우 템플릿 계층의 상위에 위치한 템플릿이 자동으로 바통을 이어 받게 되어 있지만 Craft에는 이런 개념은 없다. 콘텐츠 유형에 따른 템플릿을 직접 만들어 줘야 한다)


## 템플릿 추가하기
템플릿을 만드는 일은 워드프레스에 테마 파일 속에서 템플릿 파일을 추가하거나 수정하는 작업과 비슷하다. 다만 워드프레스와는 달리 Craft에서는 직접 PHP를 편집하는 대신 [Twig](https://twig.symfony.com/)이라는 템플릿 언어를 사용한다. (워드프레스에서도 Twig을 사용할 수 있게 해주는 [Timber](https://www.upstatement.com/timber/) 라는 플러그인이 있긴 하다)

Craft가 설치된 디렉터리로 가서 앞서 _layout.html 파일을 편집할 때 열었던 templates 폴더를 보면 그 아래에 news라는 폴더가 보일 것이다. 맞다. 이 부분이 바로 Craft 가 설치될 때 함께 만들어진 ‘News’ 항목에 대한 템플릿이 위치한 곳이다. 

그 속에 index.html 파일과 _entry.html 파일이 보일 것이다. 파일 이름이 말해주듯 각각 항목의 목록과 항목 그 자체의 내용을 표시해 주는 템플릿 파일들이다. 워드프레스로 치면 아카이브(archive)와 싱글(single) 템플릿인 셈이다.

- index.html 뉴스 목록을 표시
- _entry.html 개별 뉴스 내용을 표시

이제 templates 폴더 아래에 콘텐츠 유형에 맞는 폴더를 하나 추가하자. 여기서는 Post 항목에 대한 템플릿을 만들 것이기에 폴더명을 ‘post’로 주면 된다. (사실 더 정확하게는 앞서 섹션을 만들 때 엔트리 템플릿을 지정하는 부분이 있었다. 폴더 구성은 이 부분의 정보와 일치시키면 된다)

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/7B826D34-C706-4024-80EF-0739F5C479AC.png)

post 폴더를 만들었다면, 그 아래에 _entry.html 이라는 파일을 하나 추가하자.
그리고 그 내용은 우선 미리 만들어져 있는 news 폴더 속 _entry.html 파일을 그대로 복사해서 붙여 넣자.

{% raw %}
```twig
{% extends "_layout" %}
{% set title = "Posts" %}

{% block content %}
  <h1>News</h1>

  {% for entry in craft.entries.section('post').find() %}
    <article>
    <h3><a href="{{ entry.url }}">{{ entry.title }}</a></h3>
    <p>Posted on {{ entry.postDate.format('F d, Y') }}</p>
    {{ entry.body.getPage(1) }}
    <p><a href="{{ entry.url }}">Continue reading</a></p>
    </article>
  {% endfor %}
{% endblock %}
```
{% endraw %}

Twig으로 작성된 이 템플릿은 상당히 직관적이다. 얼핏 봐도 post 섹션에 있는 항목들을 불러와 표시하는 것임을 알 수 있다. 워드프레스가 Loop를 자동으로 호출하는 것과 달리, Craft에서는 이렇게 명시적으로 질의(query)를 통해 데이터를 가져 온다.

Twig 템플릿의 사용법과 템플릿에서 에서 사용할 수 있는 함수들에 대한 설명은 [Craft Templating](https://craftcms.com/docs/templating-overview) 문서를 참조하자.

이제 다시 앞서 404 오류(“Page not found”)가 나왔던 페이지에 접속해 보면 이번엔 포스트의 내용이 정상적으로 표시되는 것을 확인할 수 있을 것이다. 템플릿이 만들어졌고 콘텐츠 항목이 템플릿에 반영된 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/8C5C77E4-38B2-4B8E-A98B-A6EAB078507B.png)

### 라이브 프리뷰

앞서 잠깐 미리보기 기능이 있다고 말했었다. 이제 다시 엔트리 목록으로 돌아와서 방금 전 만들었던 “안녕하세요” 포스트의 편집 화면으로 가보자. 우측에 “라이브 프리뷰”라는 버튼이 보일 것이다. 

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/A2723CB7-EFDC-4005-AC58-6AFD4E28C222.png)

이 버튼을 한번 클릭해 보자. 예상은 했겠지만, 화면이 전환되면서 미리보기 화면이 표시될 것이다. 이름 그대로 ‘실시간’ 미리보기이기 때문에  바로 보면서 바로 편집할 수 있는 멋진 기능이다. (물론 워드프레스에도 미리보기 기능이 있다)

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/2A3E3C75-A43D-4F72-8B06-A43BA561D749.png)


느꼈을지 모르지만, Craft는 워드프레스와는 다르게 초기 메뉴가 아주 간단하다. **처음에 간단하게 시작하고 필요한 것들을 추가해 나간다**는 게 Craft의 발상이다. 처음부터 모든 걸 갖추고 필요없는 것을 제거해 나가는 워드프레스와는 반대 방향의 접근법이다. (얼핏 생각해 봐도 워드프레스에서 기본으로 제공되는 기능들 중에는 필요 없는 기능들이 제법 많다. 특히 워드프레스를 ‘블로깅 툴’이 아니라 ‘CMS’라는 시각에서 봤을 때 그렇다는 말)


## 레시피 항목 만들기
워드프레스를 좀 써 본 분들이라면 아마 지금 쯤 이렇게 말할 것이다. 

> 뭐야? 이런 건 워드프레스에서도 다 할 수 있는 거잖아? 그것도 더 쉽게.  

맞다. 사실 지금까지의 내용은 그저 맛보기에 불과했다. 아니 맛보기라기 보단 일부러 워드프레스를 따라 했다고 말하는 게 더 맞다. 똑같은 일을 Craft로 해 보면서 워드프레스와의 차이를 보이기 위함이었다. 

하지만 지금까지의 내용만으로는 Craft의 진가를 제대로 보일 수 없다. 이번엔 레시피 라는 항목을 하나 더 만들어 보자. 앞서와 마찬가지로 새로 채널 섹션을 하나 만들면 된다. 이름은 ‘Recipe’라고 주자.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/28A7E53F-192C-43CC-9582-A9831F376BDC.png)

이제 우리의 Craft에는 ‘Recipe’라는 섹션이 하나 더 추가되었다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/F5D5FD33-59A9-4B2C-A128-BBA34277297B.png)

여기서 잠깐! 앞서도 잠깐 언급했지만 Craft에는 항목(엔트리) 외에 별도로 섹션(Section)이라는 개념이 있다. 그리고 **하나의 섹션에는 하나 이상의 항목이 올 수 있다**. 예를 들면, 미디어(media) 라는 섹션을 하나 만들었다면 그 섹션 속에 다시 사진 미디어, 보도자료 미디어, 스페셜 미디어 등 여러 종류의 미디어 항목들이 올 수 있는 것이다.  

또는 레시피 섹션에서라면 그 속에 한식, 양식, 중식, 일식 등의 레시피 항목을 각각 별도로 만들어 항목별로 템플릿이나 필드 구조를 다르게 가져갈 수도 있다. 같은 섹션의 항목들은 그 항목 유형이 다르더라도 함께 취급된다. 

워드프레스에서 이와 유사한 개념을 찾는다면 아마도 [포스트 유형(Post Formats)](https://codex.wordpress.org/Post_Formats)이 될 것이다. 워드프레스에서는 글을 쓸 때 그 글의 포스트 유형을 추가정보(aside), 갤러리(gallery), 링크(link), 이미지(image), 인용(quote), 상태(status), 비디오(video), 오디오(audio), 채팅(chat) 등으로 다양하게 지정할 수 있고 각각 템플릿도 다르게 가져갈 수 있지만 그렇게 많이 쓰이지는 않는 듯 하다. 

Recipe 항목을 디자인하기에 앞서 우리가 만들 레시피의 레이아웃을 한번 그려 보자.

- 우선 레시피 **제목(title)**이 나온다. 
- 그리고 이 레시피에 대한 간단한 **설명(description)**,
- 이 레시피를 대표할 만한 대표 **이미지(featured image)**가 보이고,
- 이 레시피에 사용될 **재료(ingredients)** 들이 표시되고, 
- 레시피에 대한 구체적인 **지시(instruction)**가 나온다.
- 마지막엔 이 레시피를 직접 따라해 볼 수 있는 **동영상(video)**이 제공되면 좋을 것 같다.

그림으로 그려보면 대략 이렇게 될 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/63E3D0CF-C42B-482F-8350-F9844AB59159.png)

이제 이 레이아웃 대로 레시피 항목의 필드로 구성해 보기로 하자.

‘굳이 이렇게 항목을 나눌 필요 있을까? 워드프레스처럼 편집기 속에서 그냥 description / instruction / video 등등의 부분으로 나눠 콘텐츠를 입력하면 되지 않을까? 혹은 [Visual Composer](https://vc.wpbakery.com/) 같은 페이지 빌더 플러그인을 사용하면? 페이지 빌더가 이럴 때 사용하라고 있는 것 아닌가?’ 라고 말할 수도 있을 것 같다. 그렇지만 콘텐츠 의 기본 구조 자체를 구조화시키는 것과 단순히 보이는 부분에서만 다르게 보이게끔 나누는 방법은 분명 다르다!

### 필드 추가하기

레시피 항목에 필드를 추가할 것이다. CP에서 “설정 > 필드” 메뉴를 선택하자.

우선 설명(description) 필드 부터.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/1B722C70-E4D9-4AC1-AA89-F259C0A78765.png)

이어서 대표이미지(featured image) 필드.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/14188DF1-7D3A-4E5E-B3A2-0037393C729B.png)

여기서는 약간의 설명이 필요하다. 이 필드는 이미지 파일이 와야 한다.
필드 유형을 ‘에셋’으로 선택하고 허용 파일의 형식을 ‘이미지’로 제한하자.  다른 설정들도 더 있지만 우선은 이 정도만 하고 저장 버튼을 눌러 저장하자.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/D0F8F77E-9270-493C-B2A4-62E205B22824.png)

이어서 재료(ingredients).  그냥 평문으로 처리하자.

이번엔 지시(instruction).  별도 필드로 만들어도 되지만, 이 부분 그냥 기존의 body 필드를 이용하는 걸로 하자. 

마지막으로 video URL을 입력하는 부분. 필드 유형은 그냥 평문(디폴트)으로 두자.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/2079C35F-74B9-4786-9F57-0E96F10C8811.png)

그러면 이제 전체 필드가 다음과 같이 추가되었다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/C1CF8500-38DB-447F-A884-45EF87B458E8.png)

이제 다시 “설정” 메뉴에서 Recipe 항목 유형을 편집해 보자.

앞서와는 달리 필드 레이아웃 디자인의 디폴트 탭에 방금 전 우리가 추가한 필드들이 포함되어 있을 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/1502DEAA-FAF5-49A1-BB4F-3697A0C44747.png)

새로운 탭을 하나 만들어 필드들을 추가하자.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/491E3A42-B683-46EB-B8CB-BCF7D211305A.png)

다 되었다. 이로서 우리는 새 콘텐츠 항목인 Recipe를 하나 만든 것이다.

CP에서 “엔트리” 메뉴에서 새 레시피 항목 만들기를 해 보면 다음과 같은 입력 화면이 보일 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/900B0094-9DD5-4C27-BB9E-CFD55FE1EEB4.png)

앞서 포스트를 만들 때와는 완전히 다른, 레시피 항목에 딱 맞는 편집창이 눈앞에 펼쳐진다. 이 정도면 전문 쉐프가 아니라도 레시피 하나 쯤은 입력하고픈 용기가 생긴다. 요리 공부도 할 겸, 레시피를 하나 입력해 보자. 내가 좋아하는 알리오올리오 파스타! 혹은 뭐든 좋다. 입맛 돋우는 음식으로 레시피를 하나 만들어 보기 바란다.

앞서도 말했듯, 워드프레스에서도 커스텀 필드를 사용하면 이렇게 다양한 필드를 구성할 수 있다. 그렇지만 그러려면 제법 많은 노력이 필요하다. 템플릿 파일도 건드려야 하고 관리자 화면에 메타박스도 만들어 넣어야 하고. 

참고로, 만약 위 레시피를 워드프레스로 만든다면?

1. ‘레시피’라는 커스텀 포스트 유형(Custom Post Type)을 하나 만들고
2. 여기에 커스텀 필드들을 추가하고 (이때 ACF 같은 플러그인을 활용)
3. 이 커스텀 포스트 유형에 대응하는 템플릿 파일을 작성

워드프레스에서 커스텀 포스트 유형을 사용하여 새로운 콘텐츠 유형을 만드는 방법에 대한 자세한 설명은 [WordPress 가이드](https://wpguide.usefulparadigm.com/posts/110)를 참조하자.


### 에셋 처리하기

여기서 한 가지. 대표 이미지 부분에서 다음과 같이 오류 메시지가 뜬다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/D5A7F3FC-0541-4FB8-9BB6-36A6BB56EB5F.png)

Craft에서는 이미지 파일이나 PDF 파일 같은 모든 종류의 파일들을 ‘**에셋(asset)**’이라고 부르고 별도 관리할 수 있게끔 하고 있다. 이 경우 우리가 만들 레시피 항목의 대표 이미지 역시 하나의 에셋이 된다. 

CP의 “설정 > 에셋” 메뉴에서 새 에셋을 추가해 보자.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/63502D59-904F-4CA5-B48A-2CA82FBC5425.png)

“+ 새로운 자료 소스” 버튼을 눌러 다음과 같이 새로 에셋을 추가하자. 이름은 아무렇게나 줘도 되지만 여기서는 ‘음식사진’이라고 정했다. 핸들값은 나중에 템플릿에서 이 에셋을 참조할 때 사용할 값이다. 파일 시스템 경로는 실제로 이 이미지 파일이 업로드되었을 때 저장될 경로로, 여기서는 public 폴더 아래에 있는 images/foods/ 라는 폴더에 저장할 것이기에 그렇게 지정했다(이 폴더는 실제로 지정된 위치에 존재해야 한다. 없으면 만들어 주자!) 마지막으로 URL은 이 이 에셋(이미지)이 브라우저를 통해 표시될 때 사용될 경로를 지정한다. 

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/C4825B34-E4D4-42B7-8FE9-ABCB1C833FD3.png)

저장하고,  다시 “설정 > 필드” 메뉴로 가서 ‘대표이미지’ 필드로 들어가 보자.
소스를 제한하고 기본 업로드 위치를 방금 전 만든 에셋인 ‘음식사진’으로 맞추자. 

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/9EDA240D-CB06-4311-98D4-0D73D4418900.png)

이제 레시피 항목 편집 창으로 돌아오면 에셋 파일을 추가할 수 있게 업로드 버튼이 보일 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/A24A89FA-0FAF-4E76-885A-B788E8380197.png)

대표이미지를 한번 추가해 보자. 이미지 파일을 드래그하여 업로드 창에 드롭하면 업로드가 되고,  “선택하기”를 클릭하면 업로드한 이미지가 이 레시피의 대표 이미지가 된다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/2C047A63-A215-4045-BCF9-CBAE83767984.png)


### 템플릿에 반영하기

그렇지만 아직 실시간 미리보기를 해 보면 필드의 내용이 반영되지 않았을 것이다. 아직 템플릿을 만들지 않았기 때문이다. 이제 템플릿 파일을 만들 시간이다.

{% raw %}
```twig
{% extends "_layout" %}

{% block content %}
  <article>
    <h1>{{ entry.title }}</h1>
    <p class="description">{{ entry.description }}</p>
    <img class="featured" src="{{ entry.featured_image.first().url }}">
    <h3>Ingredients</h3>
    <p class="ingredients">{{ entry.ingredients }}</p>
    <h3>Instruction</h3>
    <p class="instruction">{{ entry.body }}</p>
    <a href="{{ entry.video }}" class="video">{{ entry.video }}</a>
    <hr>
    <p>Posted on {{ entry.postDate.format('F d, Y') }}</p>
  </article>
{% endblock %}
```
{% endraw %}

다시 미리보기 해보자. 레시피의 모든 필드들이 제대로 반영 되었을 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/37D5C563-0539-41E5-9366-16C39C873CE4.png)

참고로, 여기에서 사용한 알리오 올리오 파스타의 내용은 다음 자료들을 참조하였다.

- [알리오 올리오 - 나무위키](https://namu.wiki/w/%EC%95%8C%EB%A6%AC%EC%98%A4%20%EC%98%AC%EB%A6%AC%EC%98%A4)
- [알리오 올리오 파스타 만들기 : 맛있지만 간단한 오일 파스타 - YouTube](https://www.youtube.com/watch?v=Yf0LIvDo9sc)


### YouTube 비디오 포함 시키기

다만 한 가지가 조금 아쉽다.  

방금 레시피에 포함시킨 동영상의 URL은 실은 유튜브(YouTube) 사이트로의 단순 링크에 불과하다. 가능하면 동영상을 직접 레시피 내에 포함시킬 수 있으면 좋겠다.

워드프레스에서라면 이건 일도 아니다. 그냥 동영상 URL을 입력하면 워드프레스가 자동으로 임베딩(embedding) 시켜 주기 때문이다. 

하지만 Craft라고 해서 안되는 건 아니다. 유튜브 동영상 URL을 파싱하여 동영상 ID를 추출한 다음 템플릿 속에 임베드 시키는 코드를 간단하게 직접 구현해도 되지만, 여기서는 Craft의 플러그인(Plugin) 기능도 한번 알아 볼 겸, 플러그인을 하나 사용해 보기로 하자.

[Video Embed Utility](https://straightupcraft.com/craft-plugins/video-embed-utility)라는 플러그인을 사용할 건데, [GitHub](https://github.com/Staplegun-US/craft-video-embed-utility)에서 내려 받으면 된다.

플러그인을 다운로드 받아 압축을 푼 다음, craft/plugins 폴더 아래에 두자.
그런 다음, “설정 > 플러그인” 메뉴로 가면 방금 복사한 플러그인이 보일 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/5E306FFA-500B-41AE-8691-ADE2BA1767C4.png)

“설치하기” 버튼을 누르면 설치가 끝난다. 물론 워드프레스처럼 어드민(CP) 내에서 플러그인을 검색하고 자동으로 설치하는 그런 편리한 기능은 아직 없다.

템플릿 파일에서는 동영상 처리 부분에서 다음과 같이 필터로 추가해 주면 된다.

{% raw %}
```twig
{{ entry.video | videoEmbed({ width: 600, height: 400 }) }}
```
{% endraw %}

이제 다시 레시피로 돌아와 확인하면, 동영상이 보일 것이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/36C406DE-745C-41B8-87F5-507103F7321B.png)


## 그 밖의 기능들
오늘 소개할 내용은 여기까지다. 

지면(?) 관계상 다 다루지는 못했지만, Craft에는 이 밖에도 많은 기능들이 기본으로 제공되고 있다. 어떤 기능들이 더 있는지는 CP의 “설정” 메뉴에서 보면 힌트를 얻을 수 있다. 

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/1104FBAF-B6D1-45D0-ADEA-3034A216BC87.png)

그 중 몇 가지만 들면, 다음과 같은 기능들이다.

- 경로(Routing) 설정 기능
- 사용자(Users) 및 권한 관리
- 이메일 처리 기능
- 다국어 사이트 지원
- 캐싱 처리
- 검색 및 백업

이 모든 기능들이 기본으로 제공된다. 사실 이런 기능들 하나하나는 콘텐츠 중심의 웹사이트를 만드는 경우라면 꼭 필요한 기능들이고, 워드프레스를 이용할 경우라 해도 별도 플러그인을 설치하거나 아니면 직접 구현해서라도 만들어 넣어야 하는 것들이다.

참고로, 이들 기능 중 일부는 별도의 라이선스를 구입해야 활성화된다. Craft는 PERSONAL / CLIENT / PRO 3종의 라이선스가 있는데 이 중 PERSONAL을 제외한 나머지 2개는 유료이다. 사이트 라이선스는 Craft의 비즈니스 모델이며,  주로 유료 호스팅 서비스를 통해 수익을 얻는 워드프레스 개발사 Automattic과는 조금 다른 비즈니스 모델이다.

![](https://usefulpa.s3.amazonaws.com/images/2017/hellocraft/E29FB2EF-2B7E-49CF-AEF6-B1DB2B144354.png)


## 어떤 CMS를 선택할까?
지금까지 이 글을 읽은 독자라면 Craft가 워드프레스와는 조금 다른 도구라는 것을 어렴풋이나마 느꼈을 것이다. (전혀 못 느꼈다면 그건 필자의 부족한 설명 탓이니 자책하지는 말기 바란다)

사실 Craft로 할 수 있는 것은 워드프레스로도 할 수 있다. 그리고 방금 전 문장의 등식은 워드프레스 자리에 다른 솔루션들, 예를 들면 루비온레일스나 라라벨, 혹은 드루팔(Drupal) 같은 이름을 넣어도 마찬가지로 성립한다. 안되는 건 없다. 그렇다면 차이는 무엇일까?

어느 게 좀 더 쉽게 할 수 있는가 (사용성), 어느 게 좀 더 잘 할 수 있는가 (생산성), 어느 게 좀 더 유연한가 (확장성), 어느게 좀 더 빠른가 (성능), 이런 정도의 차이 아닐까?

그리고 그 물음에 한 가지 유일한 답은 없다. 내게(또는 우리 조직에) 놓인 상황과 필요에 따라 그 조건에 가장 잘 맞는 도구(솔루션)을 선택하는 게 답일 것이다.

블로그(혹은 블로그와 유사한 글 중심의 웹사이트)를 만든다거나 이미 시중에 나와 있는 테마를 적용하면 되는 수준의 웹사이트라면 굳이 다른 솔루션 검토할 것도 없이 워드프레스를 집어드는 게 현재로선 최선일 것이다. 랜딩 페이지를 만들거나 간단한 브로셔 혹은 한두 페이지짜리 사이트라면 굳이 워드프레스까지도 필요 없다. 지킬(Jekyll) 같은 정적 웹사이트 저작도구를 쓰거나 그도 귀찮다면 그냥 직접 HTML로 만들면 그만이다. 웹앱(webapp)이나 웹서비스라면 레일스나 라라벨, 익스프레스(Express) 같은, 좀 더 자유도 높은 웹 프레임워크를 선택하는 게 옳은 방향일 것이고.

### 그렇다면 Craft는?

- 단순 블로그 글이나 페이지가 아닌 콘텐츠 중심의 웹사이트를 만들어야 할 때
- CMS가 필요하긴 한데 웹 프레임워크를 직접 다룰 여력은 없고 워드프레스로는 조금 부족함을 느낄 때
- PHP나 기타 프로그래밍 언어에 대한 고민 없이 콘텐츠와 디자인에만 집중하고 싶을 때
- 보안이나 업데이트에 대한 걱정을 줄이고 콘텐츠 관리에만 신경쓰고 싶을 때
- 관리할 콘텐츠의 양이 상당히 많을 때

이런 때라면 Craft를 한번 검토해 보자. 좋은 선택이 될 것이다. :)

## 참고자료
- [Craft CMS Documentation](https://craftcms.com/docs/introduction)
- [Tutorials for Craft CMS - Straight Up Craft](https://straightupcraft.com/)
- [Craft CMS Stack Exchange](https://craftcms.stackexchange.com/)
- [Craft vs. WordPress: The Good, the Bad, and the Ugly Data](https://www.viget.com/articles/craft-vs.-wordpress-the-good-the-bad-and-the-ugly-data)
- [Choosing the Best CMS](https://coryetzkorn.com/blog/choosing-the-best-cms/)