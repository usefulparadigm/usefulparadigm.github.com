---
layout: post
title: Hugo와 Netlify로 '스매싱' 웹사이트 만들기
description: 최근 리뉴얼된 스매싱 매거진(Smashing Magazine)에서 채택한 기술인 Hugo와 Netlify를 사용해 빠르게 웹사이트를 만들고 배포하는 방법을 소개합니다. 
thumbnail: https://usefulpa.s3.amazonaws.com/images/2017/hugo-netlify-website.png
image: https://usefulpa.s3.amazonaws.com/images/2017/hugo-netlify-website.png
category: ["web development"]
tags: ["cms", "website", "opensource", "hosting", "cloud"]
---

웹 디자이너와 개발자들이 즐겨 찾는 인기있는 웹사이트 중 하나인 [스매싱매거진(Smashing Magazine)](https://www.smashingmagazine.com/)이 최근 [리뉴얼](https://next.smashingmagazine.com/2017/03/a-little-surprise-is-waiting-for-you-here/) 되었습니다. 

이번 리뉴얼은 그간 사용해 오던 [WordPress](https://wordpress.org/) 대신 [Hugo](https://gohugo.io/)라는 CMS 도구를 썼고 또 [Netlify](https://www.netlify.com/)라는 서비스를 이용해 호스팅한 점이 특히 눈에 띕니다. 

**관련 글**:
- [Smashing Magazine’s Redesign Powered by Hugo (JAMstack)](https://discourse.gohugo.io/t/smashing-magazine-s-redesign-powered-by-hugo-jamstack/5826)
- [Smashing Magazine is now live on Netlify](https://www.netlify.com/blog/2017/11/21/smashing-magazine-is-now-live-on-netlify/)


이 글에서는 이 둘의 사용법을 간단하게 정리해 봅니다.

## Hugo로 웹사이트 만들기

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/2CB42710-C0A1-493F-8DA0-77CA9FEB4FAB.png)

[Hugo](https://gohugo.io/)는 한마디로 정적 웹사이트 생성기(static website generator)입니다. [Jekyll](https://jekyllrb.com/)을 접해 보신 분에겐 아마 ‘Go 언어로 작성된 Jekyll’이라고 소개하는 게 더 잘 와닿을 지도 모르겠습니다. (물론 Hugo는 기분 나쁠 수 있습니다. 어디 감히 함부로 대문호의 이름을 한낱 작품 주인공 이름과 비교하다니요?)

어쨌거나, Jekyll이나 Hugo 같은 웹사이트 생성기의 좋은 점은, 간단하게 웹사이트를 만들고 콘텐츠를 바로 바로 퍼블리싱 할 수 있는 구조(틀)와 도구를 제공한다는 점에 있습니다. Hugo 역시 마찬가지구요.

맥OS 사용자라면 터미널 명령으로 다음과 같이 간단하게 사이트의 뼈대를 만들 수 있습니다.

```
$ brew install hugo
$ hugo new site hello-hugo
```

성공적으로 사이트가 만들어지면, 친철하게도 Hugo가 다음 단계를 알려 줍니다.

```
Congratulations! Your new Hugo site is created in /hello-hugo.

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/, or
   create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files
   with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
```
 
위에서 Hugo가 알려준 대로 이제 테마를 하나 설치해 보겠습니다. 

[Hugo Themes](https://themes.gohugo.io/) 디렉터리에 보면 Hugo에서 사용할 테마들이 많이 있습니다. 

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/1447D499-FD48-47A8-B7BC-5C74641D0E7B.png)

물론 테마를 직접 만들어도 되지만, 여기서는 이 디렉터리에 있는 테마 중 하나를 골라 적용해 보도록 하겠습니다. 제 취향으로 ‘[Bilberry Hugo Theme](https://themes.gohugo.io/bilberry-hugo-theme/)’ 테마를 선택해 보겠습니다. 

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/5F41AB66-8C4A-46D4-B042-7BEF5552DE9A.png)

테마를 클릭해 보면 테마에 대한 자세한 설명 및 데모(demo)와 함께 이 테마의 설치 방법 등이 자세히 소개되어 있기 때문에 그대로 따라하기만 하면 됩니다.

```
cd hello-hugo/themes
git clone https://github.com/Lednerb/bilberry-hugo-theme.git
```

(만약 git을 사용하지 않는다면, 테마 파일을 다운로드 받아 themes 디렉터리 아래에 압축을 풀어 놓아도 상관없습니다)

테마 파일을  설치했다면, 이제 마지막으로 프로젝트의 루트 디렉터리에 있는 `config.toml` 파일을 열어 다음과 같이 테마를 지정해 줍니다. 방금 전 설치한 테마 파일의 디렉터리명과 일치시켜주면 됩니다.

```
theme = "bilberry-hugo-theme"
```

이제 터미널에서 `hugo server` 명령으로 웹서버를 실행한 다음 브라우저에서 http://localhost:1313/ 로 접속해 보면, 다음과 같이 웹사이트가 표시되는 것을 확인할 수 있습니다. (테마의 DEMO에서 보는 것과 같은 좀 더 멋진(?) 디자인을 지금 당장 확인해 보고 싶다면, 테마 속에 들어 있는 exampleSite 폴더를 프로젝트의 루트 내로 복사하여 붙여 넣으면 됩니다)

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/29A279FD-6E26-49C9-AE88-F8C392D2FD26.png)

새 포스트를 추가하려면, 다음과 같이 터미널에서 `hugo new` 명령으로 간단하게 추가할 수 있습니다.

```
$ hugo new post/어서와-휴고는-처음이지.md 
```

위 명령으로 새 포스트를 추가한 다음, 프로젝트의 content/post 폴더 아래에 가보면 방금 생성한 새 포스트 파일이 추가되어 있는 것을 확인할 수 있습니다. 파일을 열어 포스트의 내용을 적절하게 채워주면 나머지 작업은 Hugo가 알아서 처리합니다.

금방 뚝딱 새 포스트가 하나 만들어 졌네요.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/0CCE516E-D405-4596-9AEE-277F61DA5B75.png)

여기까지 따라했다면, 지금까지의 내용을 [GitHub](https://github.com/usefulparadigm/hello-hugo)에 저장합니다. (이 단계는 나중에 배포할 때 필요한 부분이며, GitHub에 저장하기 방법에 관한 별도 설명은 생략합니다)

지금까지의 내용은 Hugo의 아주 기본적인 사용법만 보인 것일 뿐, Hugo는 정말이지 그 이름에 걸맞게 멋진 기능들을 많이 갖추고 있습니다. Hugo의 더 자세한 기능과 사용법은 [Hugo 문서](https://gohugo.io/documentation/)를 참조하세요!


## Netlify로 사이트 배포하기

대부분의 정적 사이트 생성기가 그렇듯, Hugo 역시 사이트 배포(deployment)와 관련해 [다양한 옵션들을 제공](https://gohugo.io/hosting-and-deployment/)합니다. ([GitHub Pages로 배포](https://gohugo.io/hosting-and-deployment/hosting-on-github/#deployment-from-your-gh-pages-branch)도 가능은 하지만, [GitHub Pages](https://pages.github.com/)에 배포할 경우라면 아무래도 Jekyll을 쓰는 게 낫겠죠?)

앞서도 소개했듯 최근 리뉴얼된 [스매싱매거진(Smashing Magazine)이 Netlify를 사용](https://www.netlify.com/blog/2017/11/21/smashing-magazine-is-now-live-on-netlify/) 하기에, 여기서도 [Netlify](https://www.netlify.com/)를 한번 사용해 보기로 하겠습니다. (사실 웹사이트 생성기는 최종 산출물 디렉터리만 호스팅 서버에 올리면 되기 때문에 웹서버 기능만 갖춘 곳이라면 어디든 배포가 가능합니다)

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/F8471E02-B0A3-46DA-A776-9058A95C1035.png)

[Netlify](https://www.netlify.com/)는 배포 자동화 기능을 갖춘 호스팅 서비스입니다. 굳이 비교를 하자면 [Heroku](https://www.heroku.com/)와 유사한 서비스라고 할 수 있지만, Heroku가 주로 서버측 애플리케이션을 호스팅하는 반면, Netlify는 프론트엔드(frontend) 코드를 호스팅한다는 점에 차이가 있습니다. CDN과 지속적 배포(continuous delivery) 도 지원합니다.

Netlify 서비스에 가입하면 아래와 같이 대시보드가 나옵니다. 아직 아무 것도 없는 빈 대시보드입니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/D0C03F1C-99C9-491A-B8E2-5D8247D4C8E1.png)

좌측 상단의 “New site from Git” 버튼을 클릭합니다 (맞습니다! Netlify에 코드를 배포하기 위해서는 Git 저장소가 필요합니다).  다음과 같이 사이트 생성 화면이 열립니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/A2D59AE3-B505-42CA-803B-DD30966699A8.png)

여기서는 GitHub를 사용해 보겠습니다.  (앞서 저장해 두었던 것을 기억하나요?) “GitHub” 버튼을 눌러 나오는 인증(authorize) 팝업창에서 인증을 완료하면 저장소를 선택하는 페이지가 나옵니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/82F74535-CB5C-41E3-97E5-C97192DBF635.png)

이 때 앞서 미리 저장해 두었던 Hugo 사이트의 git 저장소를 선택합니다. 그러면 설정의 마지막 단계로 몇몇 셋팅값을 입력하는 부분이 나옵니다. 여기서 build settings값을 다음과 같이 설정하고 “Deploy site” 버튼을 누릅니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/210E3478-DF34-428D-8C4B-D2BDCD8B4FCA.png)

잠시.. 기다립니다. 그동안 Netlify는 GitHub 저장소로부터 파일을 불러와 자동으로 빌드하고 배포합니다. 배포 과정은 Delply log로 확인할 수 있습니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/52C40113-5F06-4CC4-AF3C-43BD90EE0E46.png)

정상적으로 배포가 완료되면 아래와 같이 사이트 배포가 완료되었다고 나옵니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/46981CAD-E593-4370-B85B-A9F0D72CC367.png)

끝입니다. Netlify가 자동으로 URL도 하나 만들어 주기 때문에, 대시보드에 나와 있는 이 URL로 접속하면 사이트가 인터넷 상에 퍼블리싱된 것을 바로 확인할 수 있을 것입니다. 도메인명은 ‘brave-bohr-eabe89.netlify.com’ 에서처럼  임의로 주어지지만, 나중에 변경할 수 있습니다.

![](https://usefulpa.s3.amazonaws.com/images/usefulparadigm/2017/my-cool-new-blog.jpg)

Netlify는 자동 배포(auto publishing) 기능이 기본으로 켜져 있어서, 이후 GitHub 저장소에 추가되는 모든 업데이트는 Netlify에 의해 감지되어 자동으로 배포가 일어납니다. 새로운 컨텐츠를 올릴 경우에도 GitHub에만 올려 주면 됩니다. (물론 이 옵션은 꺼 둘 수 있습니다)

그 밖에 사이트의 도메인명을 변경하거나 커스텀 도메인을 추가하고 HTTPS를 적용하고 하는 과정들은 Netlify에 잘 나와 있어 별도 설명은 생략합니다.

지금까지 본 것처럼, Netlify는 Git 저장소와 연동하여 간단하게 프론트엔드 웹앱(SPA)이나 웹사이트를 배포할 때 사용하면 좋은 서비스입니다. Netlify에 관한 더 자세한 내용은 [Netlify 문서](https://www.netlify.com/docs/)를 참조하세요!

**※ 몇 가지 유의사항: Hugo 사이트를 Netlify로 배포할 때**

- Hugo 사이트를 Netlify에 배포하는 경우, Hugo 테마를 위에서 했던 것처럼 clone 하거나 다운로드 방식으로 설치하면 작동하지 않습니다.  git의 submodule을 사용해서 테마를 설치해야 하며, 그 이유와 자세한 내용은 [여기](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/#use-hugo-themes-with-netlify)를 참조하면 됩니다.

- 이 글을 쓰는 현재, Hugo의 버전을 Netlify에 알려줘야 한다고 되어 있습니다. `netlify.toml` 파일을 만들어 버전 정보를 적어 주거나 Netlify 콘솔에서 `HUGO_VERSION` 환경변수를 셋팅하는 방식으로 설정 가능합니다. 자세한 내용은 [여기](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/)를 참조하세요!
