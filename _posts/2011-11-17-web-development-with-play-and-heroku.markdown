---
layout: post
title: Play 프레임워크와 Heroku를 이용한 웹앱 개발
categories: web development
excerpt: Play!는 최근에 등장한 자바 기반 웹 프레임워크입니다. 겉으로 보기엔 Ruby on Rails를 많이 닮은 카피캣(copycat) 처럼 보이지만 조금 더 들여다 보면 Play만의 독특한 매력들이 많이 들어 있습니다. Play 설치하고 배포하는 법을 간단히 소개합니다.
thumbnail: http://farm7.static.flickr.com/6098/6353518445_d8db0eea66_m.jpg
---

최근 Java 기반 웹 프레임워크 중 하나인 Play!가 주목받고 있다. Java야 이미 오래 전부터 수많은 웹서비스와 엔터프라이즈 환경에서 검증된 웹 개발 언어로 그리고 주력 플랫폼으로 사용되고 있었기 때문에 다른 어떤 웹 개발 환경 보다도 다양하고 광범위한 기술 기반을 보유하고 있다. 이미 웹 개발과 관련한 많은 기술 표준들이 나와 있고 많은 훌륭한 웹 개발 프레임워크들이 존재하기 때문에 새로 무언가 필요할까 싶은 생각도 들지만, Play!를 접하고 나면 조금 다른 느낌이 든다. "아~ 자바로도 이런 게 가능하구나. 역시 언어 문제는 아니었군." 하는 생각.

![Play framework](http://farm7.static.flickr.com/6237/6353518869_7bda34fdca.jpg)

Play!의 특징을 몇 가지만 들어 보면 다음과 같다.

1. MVC 아키텍처를 채택
1. 서블릿 컨테이너를 사용하지 않고 자체 서버로 직접 배포하는 방식을 취함 (container-less)
1. JBoss의 [Netty](http://www.jboss.org/netty) 라이브러리를 사용, 비동기 방식으로 IO를 처리하여 서버의 성능을 높임 (nonb-locking I/O)
1. JUnit 기반 테스팅 프레임워크를 내장
1. JPA 기반 ORM

### 시작하기

이 밖에 더 자세한 내용은 아래 참고자료를 참고하기로 하고, 우선 간단하게 Play!를 시작해 보기로 하자. 설치는 파일을 다운로드하여 적당한 디렉터리에서 압축을 풀어주면 완료된다. (Mac OSX에서 [Homebrew](http://mxcl.github.com/homebrew/)를 사용한다면 명령행에서 brew install 하면 된다).

<pre>
$ play new myplay
$ cd myplay
$ play run
</pre>

이제 브라우저에서 http://localhost:9000/ 으로 접속하면 이미 Play가 시작된 것을 확인할 수 있을 것이다.

### MVC 디렉터리 구조

Play framework의 디렉터리 구조는 다음과 같다. app 디렉터리 아래에 각각 model, controller, view 디렉터리가 위치하고 conf에는 애플리케이션 설정 및 routes 설정 등 각종 설정파일이, lib에는 외부 jar 파일이 담기고, public은 자바스크립트나 스타일시트, 이미지 같은 정적인 파일들이 담기는 공간이다.

![directory structure of Play frx](http://farm7.static.flickr.com/6057/6353625503_8110c05881.jpg)

이 때, 예를 들어, app/models 디렉터리 속에 담긴 User.java는 다음과 같은 형태의 코드로 구성된다. 이 클래스는 User모델로서 데이터베이스의 User 테이블과 OR 맵핑된다. (참고로 개발환경에서 이 소스코드의 컴파일은 동적으로 처리되며 tmp/ 디렉터리 아래에 자동으로 생성된다는 점이 특이하다).

<pre class="prettyprint">
package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
 
@Entity
public class User extends Model {
 
    public String email;
    public String password;
    public String fullname;
    public boolean isAdmin;
    
    public User(String email, String password, String fullname) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
    }
 
}
</pre>


### 배포하기

애플리케이션이 만들어 졌다면 배포해야 한다. Amazon EC2 기반의 앱 클라우드 플랫폼인 [Heroku가 최근 Play framework을 지원](http://blog.heroku.com/archives/2011/8/29/play/)하기 때문에 Heroku를 이용하면 간단히 배포할 수 있다. 소스 버전 관리는 git으로 한다는 가정 하에, 명령행에서 다음 명령으로 배포가 완료된다.

<pre>
$ heroku create --stack ceder
$ git push heroku master
$ heroku open
</pre>


### 참고자료

* [Play Framework](http://www.playframework.org/)
* [Five cool things you can do with Play](http://www.playframework.org/documentation/1.2.3/5things)
* [Getting Started with Play! on Heroku/Cedar](http://devcenter.heroku.com/articles/play) 
