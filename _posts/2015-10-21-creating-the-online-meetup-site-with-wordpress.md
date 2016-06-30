---
layout: post
title: 워드프레스로 웹서비스(온라인 모임) 만들기
description: 워드프레스로 웹서비스 만들기 튜토리얼을 연재합니다. 서비스 주제는 온라인 모임이며 사용자가 직접 사이트에 접속하여 모임 정보를 올리고 공유할 수 있는 간단한 웹서비스입니다. 
thumbnail: https://usefulpa.s3.amazonaws.com/images/2015/moiming-thumbnail-480.png
categories: ["web development", "wordpress"]
tags: [wordpress, website, webservice, meetup, rest, api]
---

![](http://usefulpa.s3.amazonaws.com/usefulpablog/2015/10/moiming-featured-cover.png)

통상적으로 워드프레스는 웹사이트를 만드는 도구로 알려져 있으며 지금도 개인이나 기업의 블로그나 정적인 웹사이트를 만드는데 주로 쓰이고 있는 것이 사실입니다. 그렇지만 최근 워드프레스는 강력한 CMS 기능과 유연한 확장성 등을 기반으로 사용자 기반 웹서비스나 동적인 웹애플리케이션 개발에도 사용되고 있습니다. 특히 최근 업데이트된 [WP REST API](http://v2.wp-api.org/)는 워드프레스를 웹서비스의 기반 플랫폼으로도 사용할 수 있는 가능성을 분명하게 보여줍니다.

<strike>유스풀패러다임에서는 워드프레스로 웹서비스 만들기 튜토리얼을 수 회에 걸쳐 저희 [디지털 마케팅의 기술](http://blog.usefulparadigm.com/) 블로그를 통해 연재하려고 합니다. 연재 순서는 아래와 같으며 글이 올라오는대로 이 페이지는 계속해서 업데이트할 예정입니다. 많은 관심 부탁 드립니다.</strike>

#### 1. [모임목록 만들기](http://blog.usefulparadigm.com/archives/286) 
워드프레스의 커스텀 포스트 유형(Custom Post Type) 기능을 활용하여 "모임" 유형을 만들고 메인 화면에 모임 목록을 표시합니다.

#### 2. [새 모임 개설하기](http://blog.usefulparadigm.com/archives/290) 
사용자가 프론트엔드(frontend)에서 직접 모임을 만들고 저장할 수 있는 기능을 구현합니다.

#### 3. [사용자 로그인하기](http://blog.usefulparadigm.com/archives/291) 
로그인한 사용자만 모임을 만들 수 있도록 사용자 로그인 기능을 추가합니다.

#### 4. [모임 참가신청 받기](http://blog.usefulparadigm.com/archives/292) 
사용자가 모임에 참가 신청을 하고 참가신청자 목록을 볼 수 있는 기능을 구현합니다.

#### 5. [지도와 지역별 메뉴](http://blog.usefulparadigm.com/archives/300) 
모임에 날짜와 장소 정보를 추가하고 장소 정보에 기반한 지역별 메뉴를 구현합니다.


<hr>
**UPDATE(2016-06-30)** 워드프레스로 모임서비스 만들기는 [WordPress 가이드](https://wpguide.usefulparadigm.com/)로 자리를 옮겼습니다.


#### 소스코드:

- [https://github.com/usefulparadigm/moiming-twentyfifteen](https://github.com/usefulparadigm/moiming-twentyfifteen)


<br>