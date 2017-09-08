---
layout: post
title: "Tonik, A WordPress Starter Theme"
description: 최근 새로 출시된 워드프레스 스타트 테마 Tonik에 대한 소개와 단상.
thumbnail: http://labs.tonik.pl/theme/images/sk_web.png
category: wordpress
tags: [wordpress]
---

![Tonik](https://usefulpa.s3.amazonaws.com/images/2017/tonik-wordpress-starter-theme.png)

[Tonik Labs](http://labs.tonik.pl/)에서 개발한 오픈소스 워드프레스 스타트 테마(Starter Theme)로 [다음과 같은 특징들](http://labs.tonik.pl/theme/docs/)을 갖추고 있음:

>* ES6 for JavaScript
* SASS and Foundation CSS Framework
* Webpack for managing, compiling and optimizing theme asset files
* Utilizes PHP Namespaces
* Simple Theme Service Container
* Child Theme friendly Autoloader
* Readable and centralized Theme Configs
* Oriented for building with Actions and Filters
* Enhanced Templating with support for passing data


비슷한 컨셉의 스타트 테마인 [Roots Sage 테마](https://roots.io/sage/)와 마찬가지로 요즘 나오는 워드프레스 Starter Theme 들은 자체적인 테마 개발 워크플로(workflow)를 가지고 나오는 경우가 많고 이 테마도 마찬가지. 

Namespace나 autoloading, Composer 같은 [PHP의 모던 프랙티스들](http://www.phptherightway.com/), 그리고 webpack이나 gulp 같은 Node.js 기반 에셋 빌더 도구들을 사용하여 테마 개발을 자동화하고 생산성 향상을 꽤하는 것은 최근의 프론트엔드측 개발 흐름을 반영한 것. 

예전에 루비온레일스가 점점 루비 표준 방식으로 돌아섰던 것처럼 이제 워드프레스도 제대로 다루려면 PHP의 베스트 프랙티스들을 익혀야 할 때가 온 듯한 생각도 듬.

Sage가 비교적 workflow 측면만 고려한 Starter Theme인 반면, 이 Tonik 테마는 코드 기반(code base)도 [Genesis Framework](https://my.studiopress.com/themes/genesis/) 수준으로 추상화 수준이 높아서 약간의 러닝 커브(learning curve)는 있음.

굳이 이 Starter Theme을 사용하거나 관례를 따르지는 않더라도 이 테마에서 사용한 여러 가지 개발 방법들을 살펴 보는 것은 워드프레스 테마 개발자나 프론트엔드 개발자들에겐 좋은 공부 재료가 될 듯.
