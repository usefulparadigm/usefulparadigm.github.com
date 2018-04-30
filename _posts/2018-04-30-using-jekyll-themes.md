---
layout: post
title: "Jekyll 테마(Theme) 다루기"
description: "지킬(Jekyll)은 간단하게 웹사이트나 블로그를 만들 때 사용하면 좋은 웹사이트 빌더입니다. 이 글에서는 Jekyll의 테마 사용법에 대해 알아 봅니다."
thumbnail: https://usefulpa.s3.amazonaws.com/images/2018/using-jekyll-themes_featured.jpg
image: https://usefulpa.s3.amazonaws.com/images/2018/using-jekyll-themes_featured.jpg
categories: ["web development"]
tags: [jekyll, ruby, website]
---

![featured](https://usefulpa.s3.amazonaws.com/images/2018/using-jekyll-themes_featured.jpg)

[지킬(Jekyll)](https://jekyllrb.com/)은 정적 웹사이트 빌더(static site builder) 도구입니다. 간단하게 웹사이트나 블로그를 만들 때 유용하게 사용할 수 있죠. Jekyll은 워드프레스나 여타 다른 웹사이트 빌더들에 비해 몇 가지 장점이 있습니다.

- 사용법이 간단
- 마크다운(Markdown) 기반
- [GitHub Pages](https://pages.github.com/)에서 무료 호스팅 지원
- 다양한 테마 및 플러그인, 편집기(editor) 생태계 보유
- 확장 가능한 테마 시스템

이 글에서는 이 중 Jekyll의 테마 시스템과 그 사용법을 소개합니다.

## 아주 간단한 테마

앞서도 말했듯 Jekyll은 정적인 웹사이트 빌더입니다. 그러니 실은 HTML파일만 있으면 됩니다. 여기에 CSS로 약간의 스타일링을 추가하면 더 좋겠죠.

아무 디렉터리나 하나 골라 다음과 같이 간단하게 index.html 파일을 하나 만들고  `jekyll serve` 명령을 줍니다. 

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello Jekyll</title>
</head>
<body>
  
  <h1>Hello, Jekyll!</h1>
  
</body>
</html>
```

그런 다음 Jekyll 서버 기본 포트인 4000번 포트로 접속하면 다음과 같이 웹사이트가 작동합니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2018/using-jekyll-themes/DDFA94A7-0425-4FA2-917A-E4CFB41B8EC3.png)

방금 전 만든 디렉터리에 가보면 아래와 같이 `_site`라는 이름의 디렉터리가 하나 자동으로 추가된 것을 확인할 수 있습니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2018/using-jekyll-themes/AC03CA69-50E6-42D0-921D-22FC012AB8FD.png)

이처럼 Jekyll은 실행 시점에서 필요한 리소스 파일들을 컴파일하여 디폴트로 `_site` 라는 디렉터리 아래에 둡니다. 이 디렉터리가 실제로 우리가 웹 상에서 보게되는 파일들이 위치하는 디렉터리입니다. (흔히 “public 폴더”라 부르는 곳인 셈이죠)

이제 간단한 페이지를 하나 추가해 보겠습니다. 파일명을 about.md 라고 주고 이번엔 `pages` 라는 하위 디렉터리를 하나 만들어 그 속에 두겠습니다.  (이 때 파일 앞 부분에 빈 [Front Matter](https://jekyllrb.com/docs/frontmatter/) 영역을 둔 이유는 이렇게 해야만 Jekyll이 md 파일을 html로 변환하기 때문입니다. Jekyll은 Front Matter가 있는 모든 파일들을 대상으로 변환 처리를 합니다)

```
---
---
# About Us

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod dicit Epicurus etiam de voluptate, quae minime sint voluptates, eas obscurari saepe et obrui. Hic, qui utrumque probat, ambobus debuit uti, sicut facit re, neque tamen dividit verbis.
```

마찬가지로 `jekyll serve` 명령을 실행한 후 웹 브라우저에서 접속해 보면 다음과 같이 마크다운 파일이 html로 변환되어 `_site/pages` 디렉터리 아래에 놓여 있음을 알 수 있습니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2018/using-jekyll-themes/8C783528-00E0-493B-9456-CE93D4B8B625.png)

이런 식입니다. Jekyll은 프로젝트 폴더 내의 파일들을 Jekyll의 관례와 규칙에 따라 해석하여 최종적으로 정적인 웹사이트를 `_site` 디렉터리에 생성합니다. 이게 전부입니다.


## 루비 젬 기반 테마(gem-based themes)

Jekyll 3.2 버전부터는 새로 젬 기반 테마(gem-based theme)라는 개념이 도입되었습니다. 이 개념이 나오기 전까지는 Jekyll에서 다른 사람이 만든 테마를 가져다 쓰려면 앞서와 같이 프로젝트 디렉터리에 테마 파일 전체를 복사해 넣고 수정하는 방식으로 테마를 관리하는 방법 밖에 없었습니다.

젬 기반 테마의 경우, 테마 파일이 루비 젬(gem) 패키지 파일 형태로 배포되기 때문에 이 테마를 가져다 쓸 사람들은 일일이 복사하여 넣을 필요 없이 루비 젬 설치 명령으로 해당 테마 파일을 설치하면 바로 테마가 작동합니다.

이는 마치 워드프레스 테마 시스템과 유사합니다. 워드프레스에서는 [자식테마(Child Theme)](https://codex.wordpress.org/Child_Themes) 개념을 지원해서 부모 테마를 상속받고 필요한 부분만 수정하여 사용하는 방식을 제공하며 또 권장되기도 합니다. Jekyll의 젬 기반 테마는 이 자식테마와 유사한 개념입니다. 

그럼 이번엔 젬 기반 테마 방식으로 테마를 한번 설치해 보겠습니다.

흔히 Jekyll 사이트를 새로 만들 때는 `jekyll new` 명령을 사용하지만, 여기서는 `jekyll new` 명령 대신, 앞서 만들던 지점에서 이어나가 보기로 하겠습니다. (참고로 `jekyll new` 명령으로 생성되는 사이트는 [Minima](https://github.com/jekyll/minima)라는 젬 기반 테마를 디폴트로 설치합니다)

여기서는 [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)라는 테마를 한번 설치해 보기로 하겠습니다. Minimal Mistakes는 Jekyll 테마 중 가장 인기 있는 테마 중 하나입니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2018/using-jekyll-themes/65717029-B723-4657-BC77-70162C9B8E99.png)

우선 터미널에서 테마 젬 파일을 설치합니다.

```
$ gem install minimal-mistakes-jekyll 
```

설치가 완료되면 이어 프로젝트 루트 디렉터리에 `_config.yml` 이라는 파일을 하나 생성하여 다음과 같이 테마를 지정합니다.

```
title: Hello Jekyll
theme: minimal-mistakes-jekyll
```

마지막으로 index.html 파일을 열어 다음과 같이 변경합니다.

```
---
layout: home
---
```

끝입니다. 이제 다시 `jekyll serve` 명령을 실행한 후 브라우저에서 보면 그림과 같이 Minimal Mistakes 테마가 정상적으로 적용된 것을 확인할 수 있습니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2018/using-jekyll-themes/797E2133-F32E-4003-A1AF-2386658C5B0C.png)

그럼 디렉터리 구조는 어떨까요? 궁금한 분들은 직접 한번 확인해 보시기 바랍니다.

물론 모든 Jekyll 테마들이 젬 기반 테마인 것은 아니며, 이럴 경우 이전 방식(테마 파일 전부를 프로젝트 디렉터리에 붙여 넣는 방식)으로 사용할 수 밖에 없다는 점에 유의해야 합니다. 어떤 테마가 젬 기반인지 여부는 보통 해당 테마의 문서에 적혀 있습니다.


## 어떤 방식이 좋을까요?

젬 기반 테마를 썼을 때 좋은 점은 무엇일까요? 무엇보다 테마 자체의 업데이트가 쉽다는 게 가장 큰 장점입니다. 테마를 별도의 젬 파일로 관리하기 때문에 테마의 업데이트가 필요할 때면 `gem update` 명령만 주면 됩니다. 또한 실제 관리하는 사이트의 파일 구조가 간단해 지는 점도 장점일테죠.

그렇지만 젬 기반 테마가 반드시 장점만 있는 건 아닙니다. 일단 시중에 나와 있는 모든 테마가 다 젬 기반을 지원하는 것은 아닙니다. 그리고 테마에서 커스텀 영역이 많아질수록 젬 기반 테마가 갖는 장점은 적어 질 수 밖에 없습니다. 

앞서도 말했듯, 젬 기반 테마는 워드프레스의 자식테마와 개념이 비슷합니다. 반면 테마파일을 그대로 가져다 수정하는 방식은, 워드프레스로 치면 테마 파일 자체를 건드리는 방식입니다. 둘 중 어느 게 더 나은 방법인지는 사실 프로젝트의 성격에 따라 다르기 때문에 하나로 이거다 결론 짓기가 애매한 부분이 있습니다만, Jekyll 사이트라면 이렇게 말하는 게 좋을 것 같습니다: “**젬을 제공하는 테마라면? 젬 기반으로 쓰고, 그렇지 않으면 직접 복사해서 쓰세요!**” 라고 말이죠!

## 참고자료

* [Jekyll Themes 공식 문서](https://jekyllrb.com/docs/themes/)
* [Minimal Mistakes Theme 문서](https://mmistakes.github.io/minimal-mistakes/)
* [Jekyll Themes](https://jekyllthemes.io/)
