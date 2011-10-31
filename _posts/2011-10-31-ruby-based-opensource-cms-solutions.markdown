---
layout: post
title: 루비 기반 오픈소스 CMS 솔루션들
excerpt: 요즘은 웹사이트나 블로그 만드는 일이 "누워서 떡먹는 일"처럼 쉬워졌습니다. 한 때는 제법 까다로운 축에 속했던 일들이 이렇게 쉬워 진 데에는 강력한 기능을 갖춘 좋은 CMS 솔루션들이 큰 몫을 했습니다. 여기서는 루비 기반으로 사용할 수 있는 오픈소스 CMS 도구들을 몇 가지 소개합니다.
thumbnail: http://farm7.static.flickr.com/6099/6298110344_3ff95d77b8_m.jpg
---

요즘 웹사이트나 블로그 만드는 일은 더 이상 별로 어려운 작업이 아니다. 불과 몇 년 전만 하더라도 
조금 근사한 수준의 사이트를 만들 경우 비싼 비용을 지불하고 또 전문 업체에 의뢰하는 경우가 많았지만 
최근에는 굳이 그럴 필요가 많이 없어졌다. 이제 누구든 손쉽고 빠르게 자신의 웹사이트나 블로그를 만들고 지우고
할 수 있는 세상이 된 것이다. 

이렇게 된 데에는 여러 이유가 있겠지만 그 중 쉽게 콘텐츠를 만들어 웹 상에 올릴 수 있게 도와주는 좋은 콘텐츠 관리 도구(Content 
Management System) 들이 많이 출시된 것도 직접적인 원인 중 하나일 것이다. 

소스가 공개된 콘텐츠 관리 도구 중 대표적인 것으로는 [WordPress](http://wordpress.org/), 
[Drupal](http://drupal.org/),  [XE](http://www.xpressengine.com/), 
[Zoomla](http://www.joomla.org/) 등이 있겠지만, 이들 도구/솔루션에 대해서는 이미 많은 곳에서
자세히 소개하고 있기에 여기서는 루비 기반의 오픈소스 CMS 도구를 몇 가지 소개해 본다.

### Radiant

[Radiant CMS](http://radiantcms.org/)는 루비 기반 CMS 중에서는 비교적 오랜 축에 속한다. 
간단한 관리자 화면을 통해 페이지와 레이아웃을 관리할 수 있기 때문에 간단한 웹페이지나 사이트를 만드는데 좋다.
루비온레일스 프레임워크 기반으로 확장(extention) 시스템을 제공한다. 현재 버전은 0.9.0로 MIT 라이선스를 따른다.

![Radiant](http://radiantcms.org/images/screenshot.jpg)

### RefineryCMS

[Refinery CMS](http://refinerycms.com/) 역시 루비온레일스 프레임워크 기반에서 작동하며
주로 루비온레일스 기반 애플리케이션에 CMS 기능을 추가하는 용도로 사용하기 쉽게 설계되었다. 
콘텐츠는 WYSIWYG 에디터를 통해 쉽게 편집할 수 있게 되어 있으며 간단한 관리자 UI를 제공한다.
"Engine" 이라는 이름의 확장 플러그인 기반에서는 제법 많은 확장 모듈들을 제공하고 있다.
현재 버전은 1.0.8이며 MIT 라이선스를 따른다.

![Refinery](http://refinerycms.com/images/refinery-screenshot.png?1290654959)

### Locomotive

[Locomotive](http://locomotivecms.com/) 역시 루비온레일스 기반의 오픈소스 CMS 솔루션이다.
Locomotive는 하나의 CMS 속에 여러 개의 사이트를 호스팅할 수 있고 
설계부터 Heroku나 Amazon S3를 호스팅 플랫폼으로 상정하고 개발되었기 때문에 클라우드 기반 CMS 호스팅이
필요한 경우에도 사용할 수 있을 것이다. 확장 모듈을 제공하며 MIT 라이선스를 따른다.

### BrowserCMS

[BrowserCMS](http://www.browsercms.org/)는 단순히 CMS라기 보다는 루비온레일스 프레임워크의 CMS 확장이라고
보는 것이 좋겠다. 이 솔루션은 루비온레일스 기반에 엔터프라이즈 급의 CMS 기능들을 추가해 주기 때문에
루비온레일스 애플리케이션을 강력한 CMS 도구로 만들어 준다. 현재 버전은 3.3.2이며 GPLv3 라이선스를 따른다.

![BrowserCMS](http://www.browsercms.org/image1.jpg)

### 기타

그 밖에도 많은 [루비 기반 CMS 솔루션들](https://www.ruby-toolbox.com/categories/content_management_systems)이 나와 있다. 

* [Nesta](http://nestacms.com/)는 정말이지 가벼운 CMS인데 다른 CMS 솔루션들처럼 데이터베이스를 저장소로 사용하지 않고
git 저장소를 CMS 저장소로 사용하는 Sinatra 기반의 앱이다. 

* [Jekyll](http://jekyllrb.com/) 역시 데이터베이스가 아닌 git 저장소 기반의 CMS 솔루션이며, 특히 Jekyll은 
[github page](http://pages.github.com/)에서 사용할 수 있으며, 
이 경우 [github](http://github.com)를 간단하게 자신의 웹사이트 또는 블로그로 만들 수 있다.
