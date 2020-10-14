---
layout: hero
title: 웹 기술 개발 & 컨설팅
description: 유스풀패러다임은 다양한 웹 표준 기술과 검증된 오픈소스 솔루션을 기반으로 웹서비스와 솔루션을 만들고 운영합니다.
permalink: /web-development/
last_modified_at: 2017-06-01
---

{% include hero_title.html name="webdev" %}

<div class="page-header">
  <h2>Service Areas</h2>
</div>

* 웹서비스 기획/구축/컨설팅
* HTML5 웹앱 개발
* REST API 서버 구축
* [오픈소스 기술 지원](/easyoss/)
* 루비 레일스(Ruby & Ruby on Rails)
* 얼랭 엘릭서(Erlang & Elixir)
<!-- * IT Infra(서버/클라우드 호스팅 운영) -->

{% include cta.html %}
{% include references.html name="webdev" data=site.data.services.webdev.references %}

{% comment %}
{% include articles.html category="web development" %}

<div class="page-header">
  <h2>Publications</h2>
</div>

<ul id="webdev-publications" class="webdev publications items media-list">
{% for entry in site.data.services.webdev.publications %}
  <li class="item item--{{ forloop.index }}">
      <div class="media">
        <a class="pull-left cover" href="{{ entry.url }}">
          <img class="media-object" src="{{ entry.cover }}" alt="{{ entry.title }}" width="80">
        </a>
        <!-- <div class="media-body">
          <h5 class="media-heading title">{{ entry.title }}</h5>
          <p class="description">{{ entry.description }}</p>
        </div> -->
      </div><!--.media-->
  </li>
{% endfor %}
</ul>
{% endcomment %}

{% comment %}{% include services.html title="Other Services & Solutions" without="webdev" %}{% endcomment %}

<!-- * [워드프레스 기반 안드로이드 앱 만들기](http://www.bloter.net/archives/181062) (블로터닷넷, 2014)
* [함수형 프로그래밍과 얼랭](http://www.moazine.com/article/detail.asp?articleid=265737) (마이크로소프트웨어, 2008)
* [레일스를 이용한 애자일 웹 개발 가이드](http://www.bizdeli.com/web2korea/) (웹2.0 코리아 2008) -->


<!-- <div class="page-header">
  <h2>Press Release</h2>
</div>

* [개발자들이 말하는 AWS 기반 ‘서버 없는 아키텍처’](https://aws.amazon.com/ko/blogs/korea/serverless-architecture-by-korean-developers/) (AWS 한국 블로그, 2016)
* [이번엔 ‘소셜 게시판’…트위터 기반 ‘톡팟’](http://www.bloter.net/archives/42158) (블로터닷넷, 2010)
* [즐거운 코칭과 재미있는 프로젝트, 그리고 자기 업그레이드](https://www.ibm.com/developerworks/community/blogs/9e635b49-09e9-4c23-8999-a4d461aeace2/entry/25) (IBM developerWorks, 2010) -->
