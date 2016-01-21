---
layout: post
title: "워드프레스 사이트에 결제모듈 연동하기"
description: "워드프레스에는 쇼핑몰을 만들어 주는 좋은 플러그인들이 많이 있다. 다만 이들 플러그인이 국내에서 제작된 것이 아닌 탓에 국내 PG사 결재 연동을 위한 부분은 지원하지 않는다. 이 글에서는 워드프레스 쇼핑몰 플러그인 중 하나인 WP e-Commerce에 국내 PG사 중 한 곳인 올더게이트allthegate PG 모듈을 연동하는 방법을 소개한다."
category: wordpress
tags: [wordpress ecommerce payment]
---

작년 초에 [워드프레스로 웹사이트 만들기](http://usefulparadigm.com/2012/03/17/creating-static-website-with-wordpress/)를 포스팅할 때만 해도 국내에는 워드프레스와 관련하여 참고할만한 자료나 문서가 많이 부족했지만, 요즘은 서점에만 나가도 워드프레스 관련 책들이 넘친다. 불과 1년 여만에 정말이지 놀라운 변화다. 그만큼 관심도 많아졌고 또 저변도 넓어졌다는 얘기니 워드프레스를 좋아하는 한 사람으로 즐거운 변화가 아닐 수 없다.

![](http://usefulpa.s3.amazonaws.com/images/2013/wp-books.jpg)

## 워드프레스로 쇼핑몰 만들기

그래서인지 요즘 워드프레스와 관련한 문의 중에는 워드프레스로 쇼핑몰을 구축하려고 하는데 어떻게 하면 되는지를 묻는 문의들이 많다. [워드프레스로 쇼핑몰을 구축하는게 과연 합리적인 방법인지 아닌지](http://m-blog.me/?p=1224)는 논외로 하고, 실제로 워드프레스로 간단한 쇼핑몰을 만들어 사용하는 사례들도 많이 있으니 못할 것도 아니다. 

일반적으로 쇼핑몰 하면 떠오르는 몇몇 주요한 기능들이 있는데, 워드프레스라고 해서 별반 달라질 건 없다. 예를 들어 상품 정보를 관리하고, 쇼핑카트를 만들고, 사용자가 주문을 할 수 있게 하고, 결제와 배송처리 등을 수행하는 게 통상적인 쇼핑몰의 주요 기능이라면, 워드프레스로 쇼핑몰을 만든다고 해서 이들 기능이 달라진다거나 하지는 않는다는 말이다.

다만 워드프레스가 기본적으로 블로깅 도구로 부터 출발했고, 또 현재도 콘텐츠 관리 시스템(CMS)으로 주로 불리고 사용되는 탓에 쇼핑몰은 워드프레스가 “잘 하는” 분야는 분명 아니다. 이 점은 워드프레스를 구성하는 데이터베이스 테이블의 구조만 보면 바로 알 수 있다. 워드프레스는 포스트(Post)를 중심으로 하는 비교적 간단한 [데이터베이스 구조](http://codex.wordpress.org/Database_Description)를 갖는 탓에 워드프레스에 쇼핑몰 기능을 추가하기 위해서는 결국 워드프레스 엔진을 확장해야 한다. 새로운 데이터 모델의 추가가 불가피하는 말이다.

다행히 워드프레스 커뮤니티에는 워드프레스 기본 엔진에 이런 “쇼핑몰 기능”을 추가해주는 플러그인들이 많이 나와 있고, 상당히 완성도 높은 플러그인들도 많기 때문에 이들 중 하나를 선택하여 설치하면 워드프레스를 바로 “쇼핑몰”로 변신시킬 수가 있다. 다음 몇몇이 그 중 대표적인 플러그인들이다.

* [WP e-Commerce](http://getshopped.org/)
* [WooCommerce](http://www.woothemes.com/woocommerce/)
* [MarketPress](http://wordpress.org/plugins/wordpress-ecommerce/)
* [JigoShop](http://jigoshop.com/)
* [Cart66](http://cart66.com/)
* [eShop](http://wordpress.org/plugins/eshop/)

이들 플러그인 대부분이 기본 기능은 무료로 제공하면서 조금 더 고급이나 확장 기능은 유료인 가격정책을 가져가고 있기 때문에 설치해서 사용해 보고 그 중 가장 마음에 드는 것을 골라 추가 기능을 구매하는 방식으로 사용하면 된다. 다만 한 가지 아쉬운 점은 이 모든 플러그인들이 국내에서 제작된 것이 아니기 때문에 국내 환경을 기반으로 서비스하는 쇼핑몰을 제작하려고 할 경우에는 아무래도 걸리는 부분들이 있다는 점이다. 그 중 대표적인 문제 하나가 바로 “결제 연동”하는 부분이다.

## 결제 연동하기

알다시피 국내에서 결제를 처리하기 위해서는 주로 PG사와 계약을 맺고 PG사에서 제공하는 모듈을 받아서 결제 처리를 하게 된다. 국내 주요 PG사 (LG데이콤 U+, 올더게이트, 이니시스, KCP, 페이게이트 등)들은 제각각 자신들만의 연동 모듈을 제공하기 때문에, 결국 위의 플러그인들 중 하나를 선택하여 사용하게 되더라도 결제 처리 부분은 이들 PG사의 모듈 중 하나와 연동해야 하는 문제가 남게 된다. 위의  플러그인들이 여러 종류의 결제 옵션을 제공하고 있기는 하지만 아직 국내 PG사 연동을 지원하는 플러그인은 없기 때문이다.

![](http://usefulpa.s3.amazonaws.com/images/2013/wp-e-commerce.png)

여기서는 위에 소개한 플러그인들 중 가장 많이 사용되고 있는 [WP e-Commerce](http://getshopped.org/) 플러그인에서 국내 PG사 중 한 곳인 [올더게이트](http://www.allthegate.com/ags/index.jsp)의 PG모듈과 연동하는 방법을 간단하게 소개한다. 올더게이트를 선택한 데 특별한 이유가 있는 것은 아니며, 다른 PG사들 역시 기본 연동 방식에는 특별하게 다를 게 없기 때문에 다른 PG모듈과의 연동 시에도 참고할 수 있을 것이다.

올더게이트 연동에 필요한 모듈들은 [올더게이트 자료실](http://www.allthegate.com/ags/download/download_01.jsp)에서 다운로드 받을 수 있으며, 자세한 사용법은 함께 따라오는 설치매뉴얼을 참고하면 된다. 설치 매뉴얼에서 보면 올더게이트의 PG연동 모듈은 다음과 같은 처리 흐름을 갖는다.

![](http://usefulpa.s3.amazonaws.com/images/2013/allthegate-flow.png)

따라서 WP e-Commerse 플러그인(이하 ‘wpsc’)에서는 우선 사용자의 주문정보를 받아 PG의 AGS_pay 모듈까지 넘겨주어야 하는데, wpsc 플러그인은 사용자가 커스텀 PG를 추가하고 연동할 수 있는 [방법](http://getshopped.org/resources/docs/get-involved/writing-a-new-payment-gateway/)을 이미 만들어 두고 있다. wpsc에서는 wpsc-merchants 디렉터리 속에 두는 것을 권장하고 있지만, 간단하게 플러그인을 하나 만들어 그 속에 다음 코드를 추가해도 된다.

	$nzshpcrt_gateways[$num]['name'] = '올더게이트PG';  // 게이트웨이명
	$nzshpcrt_gateways[$num]['internalname'] = 'pg_allthegate'; 
	$nzshpcrt_gateways[$num]['function'] = 'gateway_pg_allthegate';

이제 관리자 페이지의 wpsc 플러그인 설정에서 보면 다음과 같이 “올더게이트PG”가 Payment 옵션에 추가된 것을 확인할 수 있다. 이 옵션을 선택하면 올더게이트 PG가 활성화된다.

![](http://usefulpa.s3.amazonaws.com/images/2013/wp-pg-allthegate.png)

이제 남은 일은 실제로 PG와 연동하는 부분을 만들어 주는 것이다. 앞서 작성한 코드 중 function 부분을 만들어 채워주면 되는데, 결제창을 팝업으로 띄우고, 주문에 관한 정보를 읽어 팝업창으로 넘기는 방식을 사용해 간단하게 구현해 보았다.

	<?php 

	function gateway_pg_allthegate($seperator, $sessionid) {

		global $wpdb, $wpsc_cart;

		$purchase_log = $wpdb->get_row(
		"SELECT * FROM `".WPSC_TABLE_PURCHASE_LOGS.
		"` WHERE `sessionid`= ".$sessionid." LIMIT 1"
		,ARRAY_A) ;
	
		$order_id 	= $purchase_log['id'];
		$amt 		= $wpsc_cart->total_price;
	
		$pay_url = plugins_url( "source/AGS_pay_1.php?OrdNo=$order_id&amt=$amt" , __FILE__ );
		echo "<script>window.open('$pay_url', '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=0,left=350,width=527,height=543');</script>";
	} 

	?>

이제 사용자가 상품을 장바구니에 담고 체크아웃하여 “구매하기(Purchase)” 버튼을 클릭하면 다음과 같이 결제창이 팝업으로 표시된다. (여기서는 올더게이트에서 제공하는 샘플 폼을 그대로 사용하였으며, 실제 사용할 때는 필요에 맞게 폼 양식을 적절히 변경하면 될 것이다)

![](http://usefulpa.s3.amazonaws.com/images/2013/wp-checkout-demo.png)

## 마무리

지금까지 설명한 것은 어디까지나 원리를 중심으로 한 간단한 데모일 뿐이다. 실제로 프로덕션 환경에서 사용하기 위해서는 몇 가지가 더 추가되어야 한다. 예를 들면, 올더게이트가 EUC-KR 인코딩 방식을 채택하고 있기 때문에 UTF-8을 기본으로 하는 워드프레스에서 한글을 제대로 처리하기 위해서는 인코딩값을 변환해 주어야 한다. 또 위에서는 설명하지 않았지만, PG사로 부터 받은 결과값을 바탕으로 주문 정보를 업데이트하는 처리도 추가되어야 할 부분이다.

국내에는 아직까지 워드프레스 기반 쇼핑몰을 지원하는 플러그인은 나와 있지 않은 것 같다. 이미 국내에 많은 좋은 쇼핑몰 솔루션들이 나와 있으니, 요즘과 같은 관심과 저변이 계속된다면 아마 조만간 워드프레스 기반에 맞춘 좋은 플러그인들도 많이 등장할 것이라 예상된다. 그러면 결제 처리와 관련된 문제들도 자연스레 해소되리라 기대해 본다.

## 업데이트

이 글을 포스팅한 후에 댓글 또는 이메일 등을 통해 많은 분들께서 좋은 정보들을 제공해 주셨고, 또 그간 국내에서도 쓸만한 쇼핑몰/결제처리 관련 오픈소스들이 제법 공개된 탓에 참고로 정리해 보았습니다. 아래 목록은 계속해서 업데이트할 예정입니다. 혹시라도 빠졌거나 더 추가할만한 내용 알려 주시면 반영하겠습니다.

### 워드프레스 쇼핑몰 솔루션

- 아직 워드프레스 기반 쇼핑몰 솔루션(플러그인)은 국내에 나와 있는 것이 없는 것으로 보입니다.

### 결제처리(PG연동) 솔루션

- [WooCommerce Paygate JT](http://studio-jt.co.kr/%EC%9B%8C%EB%93%9C%ED%94%84%EB%A0%88%EC%8A%A4-%ED%95%9C%EA%B5%AD%ED%98%95-%EA%B2%B0%EC%A0%9C-%EC%97%B0%EB%8F%99-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EB%AC%B4%EB%A3%8C-%EB%B0%B0%ED%8F%AC/) 스튜디오 제이티에서 개발한 WooCommerce용 결제모듈이며 Paygate 연동을 지원합니다. [다운로드](http://wordpress.org/plugins/woocommerce-paygate-jt/)
- [WooCommerce Paygate](http://blog.sunnysidesoft.com/woocommerce-paygate/) Sunnysidesoft에서 만든 결제 플러그인이며, WooCommerce 기반에 Paygate 연동을 지원합니다. [다운로드](https://github.com/sunnysidesoft/woocommerce-paygate)
- 그 밖에도 [플레닛메이트](http://www.bloter.net/archives/166509), [옵티안](http://www.optian.co.kr/?p=3442) 같은 곳에서도 결제 솔루션(플러그인)을 제작/판매하고 있습니다.