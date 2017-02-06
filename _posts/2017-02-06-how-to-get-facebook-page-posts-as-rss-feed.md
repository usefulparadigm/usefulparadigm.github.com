---
layout: post
title: "Facebook Page를 RSS Feed로 받아보기"
description: 페이스북 페이지 포스트를 RSS 피드로 받아보는 방법들을 소개한 간단한 팁입니다.
thumbnail: https://usefulpa.s3.amazonaws.com/images/2017/facebook-page-to-rss-feed.png
image: https://usefulpa.s3.amazonaws.com/images/2017/facebook-page-to-rss-feed.png
categories: ["facebook"]
tags: [facebook, rss, atom]
---

![](https://usefulpa.s3.amazonaws.com/images/2017/facebook-page-to-rss-feed.png)

이 글은 페이스북 사용자들을 위한 간단한 팁(tip)입니다. 

"RSS 피드(Feed)"라고 하면 아주 오래된, 호랑이 담배 먹던 시절의 유물이라고 생각할 수도 있겠지만, 실은 아직도 RSS  피드는 많은 곳에서 사용되고 있습니다. 블로그나 웹사이트들은 여전히 RSS 피드로 내보내기 기능을 제공하는 경우가 많고 시중에는 RSS 구독기들도 여럿 존재합니다. 구글(Google)이 제공하던 대표적인 RSS 구독 서비스인 [구글 리더(Google Reader)](https://www.google.com/reader/)는 [진즉에 종료](https://googleblog.blogspot.kr/2013/03/a-second-spring-of-cleaning.html)되었지만,  구글 리더를 물러 받은 [Feedly](feedly.com) 같은 서비스는 여전히 성업 중입니다.

-- 참고: [Google Reader 서비스 중단 이유](http://techneedle.com/archives/10611) by [techNeedle](http://techneedle.com/)

페이스북(Facebook)도 초창기(?)엔 서비스 곳곳에서 RSS를 지원했었죠. 하지만 어느 순간부턴가 RSS와 관련된 기능들은 서비스에서 하나씩 둘씩 사라졌습니다. 페이스북 페이지의 내용을 RSS로 구독할 수 있는 기능도 [2015년 중순부터 폐기](https://developers.facebook.com/docs/apps/changelog#v2_3_90_day_deprecations) 되어 이제 페이지의 피드를 RSS를 통해 받아 볼 수 없게 되었습니다.

페이스북이 페이지 피드를 RSS로 제공하지 못한다 해서, 페이지 피드를 RSS로 받아볼 방법이 전혀 없는 건 아닙니다. 시중에는 페이스북 페이지를 RSS로 받아 볼 수 있도록 해주는 서비스들이 여럿 존재합니다. 아래는 그 중 몇몇 서비스들입니다.

* [FetchRSS](http://fetchrss.com/)
* [Facebook RSS Feeds Generator](http://www.rssground.com/all-tools/facebook-rss-feeds-generator/)
* [FB-RSS](https://fbrss.com/)
* [Wallflux](https://www.wallflux.com/)

그 밖에도 여러 방법들이 가능합니다. 예를 들면, [Zapier 같은 워크플로 자동화 도구를 이용하는 방법](https://blog.dlvrit.com/2015/08/how-to-find-facebook-rss-feed/)도 있고, 아래와 같은, 오픈소스로 공개된 툴들을 사용하는 방법도 있습니다.

* [rss-bridge](https://github.com/RSS-Bridge/rss-bridge) 는 RSS를 제공하지 않는 웹사이트에서 ATOM 피드를 생성해 주는 PHP 프로젝트.
* [facebook-rss-parser](https://github.com/scottfalkingham/facebook-rss-parser) Facebook Graph API 결과를 RSS로 변환.

물론 간단하게 직접 하나 만들어 쓰는 것도 어렵지 않습니다. 페이스북의 페이지 정보를 Graph API로 추출한 다음 그 결과를 RSS/Atom 형식으로 변환시키기만 하면 되기에 코드 몇 줄이면 간단하게 구현할 수 있습니다. 아래는 루비 언어로 구현한 예시입니다.

```ruby
def get_page_posts(page_id)
  feed_url = "https://graph.facebook.com/#{page_id}/posts?access_token=#{access_token}&fields=#{POST_FIELDS}"
  result = fetch(feed_url)
  halt result["error"]["message"] if result["error"]
  result["data"]  
end

def fetch(url)
  res = Net::HTTP.get URI(url) rescue nil
  JSON.parse(res) if res
end

def access_token
  ENV["FACEBOOK_ACCESS_TOKEN"] || %Q(#{ENV["FACEBOOK_APP_ID"]}|#{ENV["FACEBOOK_APP_SECRET"]})
end
```

이렇게 만든 프로그램을 [Heroku](https://www.heroku.com/) 같은 클라우드 플랫폼에 설치해 두고 사용하면 별다른 비용 없이 유용하게 사용할 수 있을 것입니다.

* [PageFeed 데모](http://pagefeed.herokuapp.com/)
* [소스코드](https://github.com/usefulparadigm/pagefeed)




