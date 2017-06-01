---
layout: hero
title: 워드프레스 제작 운영
description: 유스풀패러다임은 WordPress에 대한 전문 지식과 다년간의 구축 운영 노하우를 바탕으로 프리미엄 기술 지원 서비스를 제공합니다.
permalink: /wordpress/
last_modified_at: 2017-06-01
---

{% include hero_title.html name="wordpress" %}

<div class="page-header">
  <h2>Service Areas</h2>
</div>

* 커스텀 테마(custom theme) 제작
* 테마 커스터마이징
* 워드프레스 플러그인 제작
* 워드프레스 사이트 호스팅 운영
* 워드프레스 사이트 성능 최적화
* 데이터 마이그레이션 및 타 시스템 연동

<div class="page-header">
  <h2>References</h2>
</div>

<ul id="wordpress-references" class="wordpress references block-grid-xs-2 block-grid-sm-3 block-grid-md-2">
{% for entry in site.data.services.wordpress.references %}
  <li class="item item--{{ forloop.index }}">
    <a href="{{ entry.url }}" class="item__content" target="_blank">
      <div class="thumbnail"><img src="{{ entry.screenshot }}" alt="{{ entry.title }}"></div>
      <h5 class="title">{{ entry.title }}</h5>
      <p class="description">{{ entry.description }}</p>
    </a>
  </li>
{% endfor %}
</ul>
