---
layout: post
title: "네이버 신디케이션 제대로 쓰기"
description: "네이버 신디케이션은 자신의 웹사이트 콘텐츠를 네이버 검색엔진에 알림으로써 네이버 검색엔진이 좀 더 정확하게 콘텐츠를 수집하는데 도움을 줄 수 있는 기술입니다."
thumbnail: https://cdn-images-1.medium.com/max/1600/1*HkPCSMOAU-mS9SQbjndOzg.png
image: https://cdn-images-1.medium.com/max/1600/1*HkPCSMOAU-mS9SQbjndOzg.png
categories: ["digital marketing"]
tags: [naver, syndication, seo]
---

![](https://cdn-images-1.medium.com/max/1600/1*HkPCSMOAU-mS9SQbjndOzg.png)

통상적으로 웹에서 말하는 콘텐츠 신디케이션(content syndication)이란 웹사이트가 보유하고 있는 콘텐츠의 일부 또는 전부를 다른 사이트 또는 서비스에서 이용할 수 있게 하는 것을 말합니다. 대표적인 것이 우리가 흔히 RSS라 부르는 방식으로 특정 웹사이트가 자신의 콘텐츠를 피드(feed)로 공개하면 다른 앱이나 서비스에서 그 콘텐츠를 가져가 사용할 수 있습니다.

네이버 신디케이션은 이런 신디케이션 방식을 네이버의 웹문서 수집에 적용한 것입니다. 네이버에서는 신디케이션의 장점을 다음과 같이 소개하고 있습니다(출처: 네이버 신디케이션 사용자 가이드).

![](https://cdn-images-1.medium.com/max/1600/0*2EHfJOMonzTjazl2.png)

이 신디케이션을 이용하면 자신의 웹사이트 콘텐츠를 네이버 검색엔진에 알림으로써 네이버 검색엔진이 좀 더 정확하게 콘텐츠를 수집하는데 도움을 줄 수 있습니다.

## 신디케이션 프로토콜

지금까지 네이버는 오픈API 서비스의 일부로 이 [신디케이션 API](http://developer.naver.com/wiki/pages/SyndicationAPI)를 제공하여 왔지만 최근 네이버가 [웹마스터도구](http://webmastertool.naver.com/index.naver)를 새로 선보이면서 이제 신디케이션은 네이버 웹마스터 도구의 일부로 편입되었습니다. 그렇지만 신디케이션의 기본 구조와 원리는 예전과 크게 다르지 않습니다.

![](https://cdn-images-1.medium.com/max/1600/0*k6oo5kkxj76Qr8uH.gif)

\* 그림 출처: [http://developer.naver.com/wiki/pages/syndAPIspec](http://developer.naver.com/wiki/pages/syndAPIspec)

위 그림에서 보듯, 우선 신디케이션을 요청하는 웹사이트는 네이버 검색 서비스로 핑(ping)을 보내게 됩니다(1). 이 때 Ping 요청 속에는 “신디케이션 문서”(웹사이트의 콘텐츠 정보를 네이버 신디케이션 명세에 맞춰 제작한 XML 파일)의 URL을 함께 전달하여야 합니다. 네이버 검색 서비스는 유효한 Ping 요청을 받은 경우 Ping 요청과 함께 전달받은 신디케이션 문서 URL로 접속하여(2) 해당 문서(콘텐츠)의 내용을 읽어옵니다.

## 신디케이션 문서

“신디케이션 문서”는 일정한 형식을 갖춘 XML 형태의 파일이며, 하나의 콘텐츠 또는 여러 개의 콘텐츠를 한번에 기술할 수 있습니다. 또한 새로 생성된 콘텐츠 뿐 아니라 갱신되거나 삭제된 콘텐츠에 대해서도 마찬가지로 기술합니다. 아래는 간단한 신디케이션 문서의 한 예인데, 새 콘텐츠를 하나 추가하고 기존 콘텐츠를 하나 삭제하는 내용을 담고 있습니다.

{% gist c9e7fdfd5c5853aae5c2 %}

이렇게 작성된 신디케이션 문서는 네이버 검색 서비스에 제출하게 됩니다. 네이버 신디케이션 사용자 가이드에서는 다음 3가지 방식으로 사용이 가능하다고 소개하고 있습니다.

- 각 변경 사항에 대해 네이버 신디케이션 문서를 실시간으로 생성
- 일정 시간 동안의 변경 사항에 대해 네이버 신디케이션 문서를 주기적으로 생성
- 네이버 신디케이션 문서를 생성하는 내부 API를 호출하는 주소를 주기적으로 전송

핑(Ping) 전송
이렇게 만들어진 콘텐츠의 생성/갱신/삭제에 대한 정보를 담고 있는 신디케이션 문서를 네이버 검색 서비스에 알리는 작업이 “핑(Ping)”입니다. Ping은 네이버 검색 서비스가 공개한 URL(핑 endpoint)로 HTTP 요청을 보내는 것입니다. 현재 Ping을 수신하는 네이버 신디케이션 서버의 주소는 `https://apis.naver.com/crawl/nsyndi/v2` 입니다. Ping을 보낼 때는 신디케이션 문서의 URL(ping_url)과 함께 네이버 웹마스터도구에서 제공하는 연동키(token) 값도 함께 넣어 호출해야 정상적으로 작동합니다. 예를 들어 명령행에서 curl 도구를 사용하여 다음과 같이 Ping을 요청할 수 있습니다.

    $ curl -H "Authorization: Bearer AAAAN1a...4d7OmoYk=" -X POST https://apis.naver.com/crawl/nsyndi/v2?ping_url=http://blog.usefulparadigm.com/?syndication_feeds=post-58.xml

Ping 호출이 정상적으로 처리되면 아래와 같은 결과값이 반환됩니다.

```xml
<?xml version="1.0" encoding="UTF-8"?><result><message><![CDATA[OK]]></message><error_code><![CDATA[000]]></error_code><receipt_number><![CDATA[415a0...f0033]]></receipt_number></result>
```

이제 네이버 웹마스터 도구에서 보면 Ping 요청이 네이버에 접수되었고 네이버가 웹문서의 수집을 처리한 것을 확인할 수 있을 것입니다.

![](https://cdn-images-1.medium.com/max/1600/0*8-ZtjcnQAQsAw0Ni.png)

Ping 호출 및 결과값의 처리에 관한 더 자세한 내용은 네이버 신디케이션 사용자 가이드를 참고하시면 됩니다.

## 워드프레스 신디케이션 플러그인, 그리고..

앞에서는 curl 명령행 도구를 사용하여 수작업으로 Ping 요청을 처리하였지만 실제로 신디케이션 문서를 만들고 이렇게 만들어진 신디케이션 문서를 네이버 검색 서비스로 Ping 요청하는 모든 작업들은 자동화해서 처리하게 됩니다. 워드프레스와 같은 CMS를 사용하는 경우라면 간단하게 직접 기능을 추가하여 사용할 수도 있으며 이미 나와 있는 플러그인을 사용해도 됩니다. 워드프레스를 사용한다면, 네이버 신디케이션 연동을 지원하는 플러그인은 이미 몇 가지가 나와 있으니 그중 하나를 골라 설치하여 사용하면 됩니다(사실 앞서 소개한 curl 명령에서 사용한 신디케이션 문서 URL 역시 이 중 하나의 플러그인에서 제공하는 URL을 사용한 것입니다).

* [Naver Syndication V2](https://wordpress.org/plugins/badr-naver-syndication/)
* [Naver Syndication](https://wordpress.org/plugins/naver-syndication/)

이렇게 신디케이션 문서를 네이버에 전달하면 네이버 검색엔진이 Ping 요청을 받은 신디케이션 문서를 방문하여 그 내용을 수집해 갑니다. 제대로 된 신디케이션 문서를 작성하고 그 문서(콘텐츠)의 내용을 지속적으로 네이버 검색 서비스에 알리는 것은 자신의 콘텐츠를 네이버 검색엔진에 노출시키는데 효과적으로 작용할 수 있습니다. 그렇지만 유의할 점은 웹문서의 내용을 수집해 간다고 해서 네이버 검색엔진이 그 문서(콘텐츠)를 반드시 검색엔진의 색인에 등록하는 것은 아니라는 점입니다. 또한 검색엔진의 색인에 등록되더라도 그 콘텐츠가 네이버 통합검색의 상위에 노출되냐 아니냐 하는 문제는 전혀 별개구요. 네이버 역시 구글(Google)과 마찬가지로 검색엔진이며 따라서 검색 로봇(크롤러)의 역할이 주가되며 신디케이션은 어디까지나 보조적인 역할만 수행한다는 점도 잊지말아야 겠습니다.

## 참고자료

* [네이버 Syndication API(V1)](http://developer.naver.com/wiki/pages/SyndicationAPI)
* [네이버 신디케이션 사용자 가이드(로그인 후 다운로드)](http://webmastertool.naver.com/tools/downfile.naver?filename=Naver_Syndication_User_Guide_v1.0.pdf)
* [워드프레스 네이버 신디케이션 문서 색인 고찰](http://badr.kr/신디케이션-문서-url-인덱싱-고찰/)

※ 이 글은 [디지털 마케팅의 기술 블로그](https://blog.usefulparadigm.com/%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%8B%A0%EB%94%94%EC%BC%80%EC%9D%B4%EC%85%98-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%93%B0%EA%B8%B0-4edbff52ace1)에도 게재된 글입니다.