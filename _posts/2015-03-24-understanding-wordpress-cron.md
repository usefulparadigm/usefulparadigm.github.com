---
layout: post
title: 워드프레스와 Cron
description: WP-Cron은 워드프레스에서 작동하는 cron 시스템으로 Unix/Linux 시스템의 cron과 유사한 기능을 수행합니다. WP-Cron이 무엇이고 어떻게 동작하는지 개념과 사용법을 소개합니다.
thumbnail: http://usefulpa.s3.amazonaws.com/images/2014/wp_cron_clock.jpg
category: wordpress 
tags: []
---

![](http://usefulpa.s3.amazonaws.com/images/2014/wordpress_wp_cron.png)

[cron](http://unixhelp.ed.ac.uk/CGI/man-cgi?crontab+5)은 시스템의 백그라운드에서 정해진 시간 또는 시간 간격으로 어떤 작업을 처리할 때 사용하는 UNIX 명령이다. 주기적으로 반복해서 수행해야 하는 작업들을 미리 스케줄링(scheduling)해 두면 지정된 시간에 해당 작업이 자동으로 실행되기 때문에, 백업이나 시스템 업데이트 같은 반복 작업이나 이메일 발송 등 시간이 제법 오래 걸리는 배치(batch) 작업 등에 폭넓게 사용되는 요긴한 명령이다.

워드프레스(WordPress)를 사용하거나 관리하는 경우에도 이런 cron과 유사한 작업들이 필요한 경우가 알게 모르게 생긴다. 예를 들어 포스팅 시간을 예약해 둔 글을 배포(publish)하거나 새 글이 올라오면 뉴스레터를 발송하거나 테마나 플러그인의 새로운 업데이트가 있는지 검사하는 것과 같은. 이런 경우에 사용할 목적으로 워드프레스도 UNIX의 cron과 유사한 개념의 도구를 제공하고 있는데, UNIX의 cron과 비교하는 의미로 흔히 '[WP-Cron](https://codex.wordpress.org/Category:WP-Cron_Functions)'이라 불린다.


### WP-Cron의 동작

통상적인 cron이 스케줄에 맞춰 지정된 시간에 정확하게 수행되는 것과 달리 WP-Cron은 PHP기반의 웹기반 시스템인 워드프레스의 특성 상, 웹요청이 들어 올 경우에만 실행된다. 즉 사용자가 워드프레스 사이트를 방문할 경우에 매번 cron이 실행되는데, 이 때 워드프레스는 자체 cron 스케줄 시스템에서 현재 수행해야 할 cron 작업이 있는지 검사하고 있으면 해당 작업을 백그라운드로 실행시키게 된다. 따라서 만약 (관리자를 포함) 아무런 방문도 없는 사이트라면 WP-Cron은 '결코' 실행되지 않는다 (이렇게 실행되지 않는 cron 작업들은 계속 모였다가 언젠가 한 사람의 방문자가 방문했을 때 그동안 미뤄 뒀던 cron 작업들이 모조리 한번에 실행되어 접속속도가 느려 보이는 결과를 초래하기도 한다).

워드프레스 내부적으로 cron은 다음 2개의 파일이 담당한다:

- [/wp-includes/cron.php](https://github.com/WordPress/WordPress/blob/master/wp-includes/cron.php) : 모든 cron 처리 관련 API 함수들이 들어 있음
- [/wp-cron.php](https://github.com/WordPress/WordPress/blob/master/wp-cron.php) : cron 호출에 사용되는 스크립트 파일

WP-Cron의 내부 작동 메커니즘은 위 소스코드를 참조하기로 하고, 여기서는 이들 WP-Cron 관련 API의 간단한 사용법만 소개하기로 한다.

### WP-Cron 사용하기

WP-Cron은 크게 **cron 이벤트(event)**라고 부르는 cron 작업 부분과 이들 작업을 실행하는 주기인 **스케줄(schedule)** 부분으로 나눠 볼 수 있는데, cron 이벤트 처리와 관련된 API 함수에는 다음과 같은 것들이 있다.

- [wp\_schedule\_event()](http://codex.wordpress.org/Function_Reference/wp_schedule_event) : cron 이벤트 추가
- [wp\_schedule\_single\_event()](http://codex.wordpress.org/Function_Reference/wp_schedule_single_event) : 1회 실행 cron 이벤트 추가
- [wp\_next\_scheduled()](http://codex.wordpress.org/Function_Reference/wp_next_scheduled) : cron 이벤트의 다음 번 수행시간
- [wp\_unschedule\_event()](http://codex.wordpress.org/Function_Reference/wp_unschedule_event) : cron 이벤트 제거

예를 들어, 1시간 간격으로 수행해야 할 어떤 작업을 cron 이벤트로 추가하려면 다음과 같이 그 작업을 액션 훅(hook)으로 처리한 다음 wp_schedule_event()로 추가하면 된다.

	// 새 cron 이벤트 생성
	add_action( 'prefix_hourly_event_hook', 'prefix_do_this_hourly' );
	function prefix_do_this_hourly() {
		// 1시간 간격으로 수행될 어떤 작업
	}
	// 앞의 cron 이벤트를 스케줄에 추가
	wp_schedule_event( time(), 'hourly', 'prefix_hourly_event_hook' );

이 때 wp\_schedule\_event()의 두 번째 인자로 전달된 'hourly'는 cron의 실행간격을 의미하는데, 워드프레스에는 기본으로 hourly, twicedaily, 및 daily의 3가지 간격(intervals)이 등록되어 있으며, [cron\_schedules](https://codex.wordpress.org/Plugin_API/Filter_Reference/cron_schedules) 필터 훅을 통해 얼마든지 확장 가능하다. 다음은 cron 스케줄에 새로 weekly라는 스케줄을 추가하는 코드다.

	function my_add_weekly( $schedules ) {
		// 새로 'weekly' 스케줄을 추가
		$schedules['weekly'] = array(
			'interval' => 604800,
			'display' => __('Once Weekly')
		);
		return $schedules;
	}
	add_filter( 'cron_schedules', 'my_add_weekly' ); 
	
### WP-Cron 죽이기

앞서도 말했지만 WP-Cron은 이름은 같은 'cron'이긴 하지만 '토종 cron(UNIX cron)'과는 다른 성격의 cron이다. 따라서 다음과 같은 경우에는 제대로 작동하지 않을 수 있다.

- 방문자가 거의 없는 사이트(앞서 설명)
- 캐시(cache) 시스템이 적용된 사이트
- 인증, IP 필터링, 쿠키 필터링 등으로 wp-cron.php 호출 자체가 차단된 사이트

또한 방문자가 아주 많아 트래픽이 높은 사이트인 경우에도 마찬가지로 WP-Cron은 문제가 될 수 있다. 방문자가 사이트를 방문할 때마다 매번 실행되는 cron의 성격 상, 동시에 여러  사용자가 접속하면 여러 개의 프로세스가 동시에 백그라운드에서 실행될 수 있기 때문이며, 이는 사이트의 리소스를 차지하고 성능에도 영향을 미칠 수 있다. 물론 워드프레스가 기본적으로 cron 처리에 락(lock) 시스템을 적용해 두고 있기 때문에 지나친 우려는 하지 않아도 되겠지만.

그렇다면 아예 WP-Cron을 죽이는 건 어떨까? 좋은 방법은 아니다. 왜냐면 cron은 워드프레스 속 여러 군데에서 사용되고 있기 때문에 이 기능을 완전히 끄게 되면 cron이 필요한 기능들은 동작하지 않게 되기 때문이다. 

이런 경우에 우리는 WP-Cron에서 벗어나 진짜 cron으로 갈아탈 수 있다. 우선 WP-Cron은 끄자. /wp-config.php 파일에 다음 상수를 추가하면 된다.

	// 내부 WP-Cron 비활성화
	define('DISABLE_WP_CRON', true);

그런 다음, 진짜 cron을 깨우자. cron tab에 다음과 같이 wp-cron.php를 호출하는 스크립트를 추가하면 된다. (crontab의 자세한 사용법은 생략한다)

	wget http://www.server.com/wp-cron.php?doing_wp_cron=1 > /dev/null 2>&1

### 참고자료

* [WordPress: How to use WP-Cron](http://ben.lobaugh.net/blog/20787/wordpress-how-to-use-wp-cron)
* [Properly Setting Up WordPress Cron Jobs](https://tommcfarlin.com/wordpress-cron-jobs/)
* [Why WP-Cron sucks](https://www.lucasrolff.com/wordpress/why-wp-cron-sucks/)


