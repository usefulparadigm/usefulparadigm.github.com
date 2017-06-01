---
layout: hero
title: 디지털 마케팅 솔루션
description: 유스풀패러다임은 기업과 개인의 비즈니스와 마케팅을 지원하는 다양한 소프트웨어 서비스와 솔루션을 제공합니다.
permalink: /marketing-technology/
last_modified_at: 2017-06-01
---

{% include hero_title.html name="martech" %}

<div class="page-header">
  <h2>Service Areas</h2>
</div>

<!-- * 디지털 마케팅 솔루션 컨설팅 -->
* 페이스북(Facebook) 앱 제작 및 API 연동
* 온라인 마케팅 Landing Page 제작
<!-- * 소셜 미디어 마케팅 및 SNS 연동 기술 지원 -->
* 이메일 마케팅 솔루션
* 콘텐츠 큐레이션 솔루션
* 온라인 데이터 분석 및 검색 최적화(SEO)
* 마케팅 챗봇(chatbot) 및 메신저봇

<div class="page-header">
  <h2>Resources</h2>
</div>

<ul id="martech-resources" class="martech resources">
{% for entry in site.data.services.martech.resources %}
  <li class="item item--{{ forloop.index }}">
    <a href="{{ entry.url }}" class="item__content" style="background-image: url({{ entry.thumb }});">
      <h5 class="title">{{ entry.title }}</h5>
    </a>
  </li>
{% endfor %}
</ul>
