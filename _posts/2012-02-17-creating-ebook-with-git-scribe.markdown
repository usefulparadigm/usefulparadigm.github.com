---
layout: post
title: git-scribe로 전자책 만들기
category: ruby
description: 킨들, 아이패드, 갤럭시탭과 같은 스마트 기기의 보급이 늘어남에 따라 전자책 시장이 커지고 있습니다. 애플의 iBooks Author와 같은 전자책 저작도구들도 여럿 출시되어 이제 "누구나 책을 만들 수 있는" 시대에 접어들고 있는데요. git-scribe라는 오픈소스 저작도구를 사용하면 아주 간단하게 pdf나 epub, mobi 형식의 전자책을 만들 수 있습니다.
thumbnail: http://farm8.staticflickr.com/7070/6890389633_851a7a1384_t.jpg
---

<img src="http://farm8.staticflickr.com/7070/6890389633_851a7a1384_m.jpg" class="right" />

요즘 전자책 시장이 다시 활기를 띠고 있는 듯한 느낌이다. 아마존이나 애플, 구글 등 세계적인 IT기업들이 전자책 시장에 뛰어들어 속속 멋진 제품들을 쏟아내고 있고, 국내에서도 여러 업체들이 전자책 단말기부터 전자책 유통 플랫폼, 전자책 콘텐츠에 이르는 여러 가지 아이디어와 상품들을 출시하고 있다.

게다가 아이패드나 갤럭시탭 등 스마트 기기의 보급과 정부의 디지털 교과서 정책 등이 맞물려 앞으로도 계속해서 전자책 시장은 그 규모가 커지리라는 사실을 누구나 예상할 수 있다. 특히 최근에는 애플이 iBooks Author라는 전자책 저작 도구를 만들어 무료로 배포함으로써 이제 명실공히 "누구든 책을 출간할 수 있는 시대"의 서막을 열었다. 물론 아직도 가야할 길은 멀지만 그렇다고 무작정 기다릴 수만은 없는 일.

이 글에서는 [git-scribe](https://github.com/schacon/git-scribe)라는 간단한 오픈소스 전자책 저작도구을 사용하여 전자책을 직접 한번 만들어 보기로 하겠다.


## 설치하기 

git-scribe는 루비 젬이다. 따라서 당연히 [루비](http://www.ruby-lang.org/ko/)가 설치되어 있어야 하며, 또한 [git](http://git-scm.com/)을 데이터 저장소로 사용하는 관계로 git도 설치되어 있어야한다. 이 두 프로그램은 많은 사용자들의 컴퓨터에 이미 설치되어 있는 경우가 많고 또 설치 방법도 비교적 간단하기 때문에 여기서 따로 설명은 생략한다. 이 밖에도 몇 가지 추가적인 라이브러리를 설치해야 하는데, 필요한 라이브러리들은 각각 다음과 같다.

- asciidoc : 소스문서 작성을 위해 필요
- xsltproc : 소스문서의 html 변환을 위해 필요
- a2x : epub 파일 생성을 위해 필요
- source-highlight : 소스코드 구문 강조(syntax highlight)를 위해 필요
- fop : PDF 파일 생성을 위해 필요
- kindlegen : mobi  파일 생성을 위해 필요

우선 터미널에서 아래 명령으로 이들 라이브러리가 설치되어 있는지 확인하자.

	$ git scribe check asciidoc - ok xsltproc - ok a2x - ok highlighting - ok fop - ok

설치되어 있지 않다면 설치해야 한다. 맥을 사용하고 있고 [Homebrew](http://mxcl.github.com/homebrew/)가 설치되어 있다면 다음과 같이 간단한 명령만으로 쉽게 설치할 수 있을 것이다.

	$ brew install asciidoc source-highlight fop
	$ brew install https://raw.github.com/adamv/homebrew-alt/master/non-free/kindlegen.rb

	
## 책 만들기

자, 이제 준비가 끝났으면 책을 한번 만들어 보기로 하자. 터미널을 열어 책을 쓸 디렉터리를 하나 만들자. 디렉터리명이 mybook이라면 다음과 같이 명령을 주면 된다.

	$ git scribe init mybook

이제 mybook이라는 디렉터리가 생성되는데, 이 디렉터리에 들어가 보면 필요한 몇 개의 파일과 디렉터리들이 이미 만들어져 있음을 확인할 수 있을 것이다. 이것으로 끝이다. 이것으로 책을 쓸 모든 준비는 끝이 났다. 이제 책 "쓰는" 일만 남았다. 

그렇다면 책은 어디에다 써야 할까? 디렉터리 구조를 들여다 보면 이미 book 이라는 이름의 디렉터리가 만들어져 있는 것을 확인할 수 있을 것이다. 이 디렉터리가 책을 담을 곳이다. 이 디렉터리 속에 보면  book.asc 라는 파일이 있는데 이 파일이 모든 책의 시작점이 된다. 마치 웹사이트에서 index.html 파일이 시작점이 되는 것과 마찬가지다. 

파일을 열어보면 샘플로 작성된 문서가 있을테니 그 문서를 참조하여 글을 작성하면 될 것이다. 파일명에서 알 수 있듯 git-scribe는 AsciiDoc 이라는 문서 포맷을 사용한다. AsciiDoc 사용법은 [AsciiDoc 홈페이지](http://www.methods.co.nz/asciidoc/)나 또는 [AsciiDoc cheatsheet](http://powerman.name/doc/asciidoc)을 참고하면 된다.

## 전자책 파일로 변환하기

책을 다 만들었다면 이제 전자책으로 변환하는 일만 남았다. 역시 간단하다. 터미널에서 다음 명령만 주면 된다. (중괄호 속의 단어 중 필요한 것 하나만 선택하면 된다. 예를 들어, epub 포맷으로 만들고 싶다면 `git scribe gen epub` 와 같은 식으로 주면 된다는 말이다)

	$ git scribe gen [site|html|pdf|epub|mobi|all]

이제 output 디렉터리를 열어보면 요청한 전자책 포맷대로 파일이 생성되어 있음을 확인할 수 있을 것이다.

전자책 출간을 축하드린다!
