---
layout: post
title: "워드프레스에 카카오 계정 로그인 추가하기"
description: 워드프레스에 소셜 로그인 기능을 추가해 보세요! 카카오(Kakao)나 네이버(Naver) 같은 국내 서비스 계정을 이용한 로그인도 간단하게 추가할 수 있습니다.
thumbnail: http://usefulpa.s3.amazonaws.com/images/2014/wordpress-kakao-social-login.png
categories: wordpress
tags: [wordpress, kakao, naver, authentication, social, login]
---

<div class="panel panel-default">
  <div class="panel-body" style="background: #eee;">
    <p>  
    <strong>UPDATE(2016-01-19)</strong> <a href="https://disqus.com/by/thisgun/" target="_blank">thisgun</a>님이 별도의 코딩 작업 없이 카카오와 네이버 로그인 기능을 추가할 수 있는 Wordpress Social Login 확장 플러그인을 개발하셨다고 댓글로 알려 주셨습니다. 감사드리며, 필요하신 분들은 참고 바랍니다: 
    <a href="http://sir.co.kr/gnucommerce_tip/6" target="_blank">워드프레스에서 네이버 와 카카오 로그인 사용하기</a>
    </p>
    <p>  
    <strong>UPDATE(2015-06-12)</strong> <a href="https://disqus.com/by/kuthia/" target="_blank">Inho Ahn</a>님이 Wordpress Social Login 플러그인에서 사용하고 있는 라이브러리인 hybridauth의 Kakao Provider와 Naver Provider를 구현한 소스를 댓글로 알려 주셔서 공유합니다. 
    카카오와 네이버 로그인 연동이 필요하신 분들은 참고 바랍니다:
    <a href="https://github.com/jinseokoh/additional-providers" target="_blank">hybridauth providers for Kakao and Naver</a>
    </p>
  </div>
</div>

<!-- <div class="panel panel-default">
  <div class="panel-body" style="background: #eee;">
    <strong>UPDATE(2015-05-26)</strong> Kakao 로그인이 제대로 작동하지 않는다고 문의주시는 분들이 계셔서, 아래 포스팅의 내용대로 저희 사이트에 <a href="http://blog.usefulparadigm.com/wp-login.php" target="_blank">DEMO</a>를 적용해 두었으니 참고 바랍니다. DEMO 테스트로 로그인한 사용자 정보는 주기적으로 삭제 처리됩니다.
  </div>
</div> -->


간혹 워드프레스에 카카오(톡)이나 네이버 계정을 이용한 로그인을 추가하려면 어떻게 해야하는지 문의 주시는 분들이 계셔서 오늘은 카카오 계정 로그인 연동하는 법을 간단하게 소개합니다.

![](http://usefulpa.s3.amazonaws.com/images/2014/kakao_account_login_btn_large_narrow_ov.png)

소셜 로그인 플러그인
-----

우선 워드프레스에 소셜 로그인(social login) 기능을 추가해주는 플러그인을 하나 설치합니다. 여기서는 [WordPress Social Login](http://wordpress.org/plugins/wordpress-social-login/) 이라는 플러그인을 사용하기로 하며, 플러그인은 이미 설치되어 있다고 가정합니다.

이제 이 플러그인에 카카오톡 로그인 부분을 추가해 보기로 하겠습니다. 우선 아래의 다운로드 URL로 접속하여 Kakao.php 라는 파일을 찾아 다운로드하여 WordPress Social Login 플러그인(이하 'WSL')이 설치된 디렉터리 아래의 `hybridauth/Hybrid/Providers` 디렉터리에 복사해 넣습니다.

<div class="panel panel-default">
  <div class="panel-body">
		<a href="https://github.com/usefulparadigm/hybridauth-kakao">Kakoa.php 다운로드 바로가기</a>
  </div>
</div>

그 다음으로  워드프레스 테마의 functions.php 파일에 다음 코드를 추가합니다.

	add_action( 'init', 'my_add_kakao_provider_to_wsl' );
	
	function my_add_kakao_provider_to_wsl() {
	
	    //if ( function_exists ('wsl_version') ) {
	
	        global $WORDPRESS_SOCIAL_LOGIN_PROVIDERS_CONFIG;
	
	        $WORDPRESS_SOCIAL_LOGIN_PROVIDERS_CONFIG[] = ARRAY(
	            "provider_id"       => "Kakao",
	            "provider_name"     => "Kakao",
	            "require_client_id" => true,
	            "callback"          => true,
	            "new_app_link"      => "https://developers.kakao.com/apps/new",
	            "cat"               => "socialnetworks",
	        );
	    //}
	}

이제 워드프레스의 어드민 대시보드에서 Settings > WP Social Login 메뉴에 접속하면 아래 그림과 "Add more providers" 창에 Kakao 버튼이 추가된 것을 확인할 수 있습니다(이 때 버튼의 이미지가 깨지는 이유는 버튼 이미지 파일을 따로 만들지 않은 탓입니다. 적절한 크기의 Kakao버튼 이미지를 만들어 WSL 플러그인의 assets 폴더 아래에 있는 img 폴더에 넣어주면 됩니다).

![](http://usefulpa.s3.amazonaws.com/images/2014/add-more-providers.png)

이제 이 버튼을 클릭하면 아래와 같이 카카오 계정을 설정하는 부분이 추가된 것을 확인할 수 있을 것입니다.

![](http://usefulpa.s3.amazonaws.com/images/2014/wsl-dashboard-kakao-login.png)

여기에 나온 내용 대로 빈칸만 채워주면 설정은 끝입니다. 나와있는 내용 대로 [Kakao Developers 페이지](https://developers.kakao.com/apps/new)로 가서 새 앱을 하나 만들고 필요한 정보를 추가한 다음 Application Key 값(REST API 키)을 받아 빈칸에 넣어주면 됩니다(아래 그림 참고). 

계정의 설정 방법은 페이스북이나 트위터 등 다른 SNS 서비스들과 다르지 않기 때문에 큰 어려움은 없을 것입니다. 

![](http://usefulpa.s3.amazonaws.com/images/2014/hybridauth-kakao-settings.png)

이것으로 끝입니다. 이제 워드프레스 로그인 창에 다음과 같이 카카오 로그인 아이콘이 추가된 것을 확인할 수 있습니다. 물론 로그인도 되구요!

![](http://usefulpa.s3.amazonaws.com/images/2014/wp-login-kakao-icon.png)


몇 가지 유의사항
-----

* 카카오 서비스는 [OAuth 2.0](http://oauth.net/2/) 인증방식을 따릅니다만 통상적인 OAuth2 기반 서비스들과는 달리 Application Secret 값을 요구하지 않습니다. 그렇지만 WSL 플러그인에서는 이 값을 반드시 필요로 하기 때문에 아무 값으로라도 하나 채워주어야 합니다. 공란만 아니라면 어떤 값이든 상관 없습니다.

* 카카오 서비스에서는 통상적으로 실명을 사용하고 이 값은 한글 이름인 경우가 많습니다만 WSL 플러그인에서는 사용자 등록을 하는 과정에서 한글이름을 제대로 처리하지 못합니다. 이 문제는 테마의 functions.php 파일 속에 다음 코드를 추가하면 해결됩니다.

		add_filter( 'validate_username', 'usefulpa_validate_username_fix' );
		function usefulpa_validate_username_fix( $valid, $username ) {
		    if ( empty($username) ) return false;
		}

* 로그인 아이콘 (또는 어드민 대시보드에 들어가는 아이콘)은 [카카오 사이트](https://developers.kakao.com/buttons)에서 내려받아 WSL 플러그인 디렉터리 내의 아이콘 이미지 디렉터리 속에 이름을 맞춰 넣어 주면 됩니다.

여기서는 카카오 서비스를 이용한 로그인 방법을 소개하였지만 [네이버](http://developer.naver.com/wiki/pages/OAuth2)나 [다음](http://dna.daum.net/apis/oauth) 같은 국내 다른 포털 서비스의 계정을 이용한 로그인도 이와 같은 식으로 처리하면 어렵지 않게 추가할 수 있으리라 생각됩니다.


