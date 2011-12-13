---
layout: post
title: Facebook Page에 iFrame Tab 추가하기
excerpt: Facebook 마케팅의 기본은 페이스북 페이지를 만드는 것에서부터 시작합니다. 그런데 페이지를 운영하다 보면 새로운 탭(tab)을 추가해야 하는 경우가 종종 생깁니다. 페이스북 페이지에 커스텀 탭을 추가하는 방법을 간단히 소개합니다.
thumbnail: http://farm8.staticflickr.com/7169/6417234831_80e84d748c_m.jpg
category: facebook
---

<img src="http://farm8.staticflickr.com/7169/6417234831_80e84d748c_m.jpg" class="right" />

페이스북 사용자가 증가함에 따라 최근 기업들도 앞다퉈 페이스북Facebook 플랫폼을 기업의 마케팅 기반에 추가하는 사례가 늘어가고 있다.
페이스북 마케팅의 시작은 통상적으로 페이스북에 페이지를 만드는 것에서부터 출발하는 경우가 많은데, 페이스북 페이지를 운영하다 보면
페이스북에서 기본으로 제공하는 페이지 만으로는 필요한 니즈를 충족하지 못해 새로운 탭을 만들어야 하는 경우가 생기게 된다. 
이 때 가장 간단한 방법은 시중에 나와 있는 페이스북 탭 애플리케이션들(유/무료)을 이용하는 것이지만, 경우에 따라서는 이런 솔루션들만으로
니즈를 충족시키지 못하는 경우도 있고, 또 간단한 페이지 탭인 경우는 굳이 솔루션의 도움을 받지 않아도 되는 경우도 생긴다.

여기서는 별도 솔루션을 사용하지 않고, 직접 만드는 방법을 소개한다. 
기존 솔루션의 종류나 사용법에 대해서는 페이스북에서 "static html" 또는 "static iframe"으로 검색하면 자세한 목록을 얻을 수 있다.

### 1. 페이스북 앱 등록하기

페이스북 Page Tab도 일종의 페이스북 앱(App) 이기 때문에 아주 간단한 탭이라도 [Facebook 개발자 사이트](https://developers.facebook.com/apps)에 접속, 앱을 등록하는 절차를 거쳐야 한다. 만들려고 하는 것이 페이지 탭이기 때문에 **페이지 탭** 메뉴를
활성화시킨 다음, 탭과 연결할 사이트(통상적으로는 이벤트 페이지가 될 것이다)의 페이지 URL을 등록해 주면 된다. 이 때 유의해야 할 점은,
페이스북이 [2011년 10월부터 모든 캔버스 앱(및 페이지 탭)에 대해 HTTPS를 적용](https://developers.facebook.com/docs/oauth2-https-migration/)함에 따라 반드시 https:// 로 시작하는 보안 URL을 등록해 줘야 한다는 점이다. 

![페이스북 앱 등록](http://farm8.staticflickr.com/7010/6417314635_181d61878b_z.jpg)

### 2. 콘텐츠 페이지 만들기

앱 등록을 하였으면 실제 페이지 탭 속에 들어갈 콘텐츠 페이지를 만들어야 한다. 콘텐츠 페이지는 사용자가 페이지에서 탭을 클릭할 경우 보여지는 페이지이며, 실제로는 페이스북 페이지 내에서 iframe으로 렌더링(rendering)되기 때문에, 어떠한 HTML페이지든 상관없이 가능하다.
다만 통상적으로 이 페이지에는 페이스북의 각종 플러그인들을 얹혀 사용하는 경우가 많기 때문에 간단한 템플릿을 하나 작성해 두고 재사용하면
편리하다. 다음은 페이스북 탭 페이지용으로 사용할 수 있는 간단한 HTML 파일 템플릿이다.

<script src="https://gist.github.com/1399667.js?file=fan_event.html"></script>

이 템플릿 파일을 앞서 앱 등록 시에 설정했던 페이지 탭 URL과 맞추어 주면 콘텐츠 페이지가 완성된다. 
이 때 APP_ID를 앞서 등록한 페이스북 APP ID로 채우는 것을 잊지 말자.
만약 담벼락에 올리기나 댓글 처럼 추가 플러그인이 필요한 경우는 [페이스북 플러그인 페이지](https://developers.facebook.com/docs/plugins/)에서 코드를 가져다 붙이면 된다. 

### 3. 페이지에 탭 추가하기

마지막은 페이스북 페이지에 방금 제작한 탭을 추가하는 것이다. 앱 등록 페이지 좌측 하단에 있는 관련 링크 중에서 **앱 페이지 보기**를 클릭하면 방금 생성한 앱의 페이지가 표시되는데, 이 앱 페이지의 좌측에 있는 **내 페이지에 추가** 메뉴를 클릭하여 추가하고 싶은 페이지를 선택하면 해당 페이지에 방금 생성한 탭이 추가된 것을 확인할 수 있을 것이다.

![내 페이지에 추가](http://farm8.staticflickr.com/7023/6417418693_b9dbf419b5_z.jpg)

**Updated(2011/12/13)** 최근 페이스북이 앱 페이지(앱 프로파일 페이지)를 [없애기로 결정](https://developers.facebook.com/blog/post/611/)함에 따라 이제 신규로 생성하는 앱은 
위와 같은 방식으로 페이지에 앱을 추가할 수 없게 되었다. 대신 페이스북에서는 다음과 같은 스크립트를 앱의 소스코드에 추가함으로써 "내 페이지에 추가하기" 기능을 쉽게 구현할 수 있도록 해 놓고 있다.

<pre>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:og="http://ogp.me/ns#"
      xmlns:fb="http://www.facebook.com/2008/fbml">
<body>
  <a href="#" onclick=window.open("http://www.facebook.com/dialog/pagetab?
  app_id=YOUR_APP_ID&next=YOUR_URL","PageTab","width=500,height=200");>
  Dialog</a>
</body>
</html>
</pre>  

물론 직접 링크를 호출하는 방식으로도 가능하다. 브라우저의 URL 창에 다음 주소를 입력하면 된다.

<pre>
http://www.facebook.com/dialog/pagetab?app_id=YOUR_APP_ID&next=http://facebook.com
</pre>

### 참고자료

* [Introducing iframe Tabs for Pages](https://developers.facebook.com/blog/post/462/) (Facebook 개발자 블로그) 
* [Page Tab Tutorial](https://developers.facebook.com/docs/appsonfacebook/pagetabs/) (Facebook 개발자 문서)
* [Add Page Tab Dialog](https://developers.facebook.com/docs/reference/dialogs/add_to_page/) (facebook 개발자 문서)