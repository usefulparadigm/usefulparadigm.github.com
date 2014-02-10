---
layout: post
title: OSX에서 Docker로 개발환경 구성하기
description: Docker는 리눅스 컨테이너(LXC) 기반 초경량 가상화 솔루션입니다. 이 글에서는 Docker를 이용하여 OSX에서 Node.js 애플리케이션 개발환경을 구성하는 방법을 소개합니다.
categories: [web, oss]
tags: []
---

[Docker](https://www.docker.io/)는 리눅스 기반의 가상화 솔루션입니다. Docker가 다른 가상화 솔루션들과 다른 점은 [리눅스 LXC](http://linuxcontainers.org/)를 기반으로 가상화 환경을 구성하는 탓에 기존 가상화 솔루션에 비해 훨씬 가볍게 가상화 환경을 구성할 수 있다는 점입니다. Docker에서는 이 가상화 공간을 "컨테이너(container)"라고 부르는데, [Docker 소개 페이지](https://www.docker.io/the_whole_story/)에도 나와 있듯 마치 물류 환경에서의 화물 컨테이너와 같은 역할을 합니다.

![](http://usefulpa.s3.amazonaws.com/images/2014/Screenshot_20140210_140908.png)

Docker가 아직 세간에 소개된지 얼마 안되는 솔루션이긴 하지만 하루가 다르게 업데이트가 이루어지고 있는 "인기있는" 솔루션이다 보니 Docker의 모든 면면을 여기서 다 소개할 수는 없고, 대신 여기서는 저희 유스풀패러다임에서 주로 사용하는 개발환경인 OSX에서 Docker로 개발환경을 구성하는 방법만 간단하게 소개할까 합니다. OSX를 주 타겟으로 하지만 Windows 환경에서도 거의 똑같이 적용됩니다.

Docker의 기본 개념
-----

Docker는 기본적으로 클라이언트/서버 아키텍처로 동작합니다. 서버측에 docker 데몬(daemon)이 떠 있고, 클라이언트 측에서 tcp 프로토콜로 서버에 액세스하는 구조입니다. 이 때 서버(데몬)는 앞서 말한 가상화 컨테이너("docker container") 들을 관리합니다. REST API도 제공하기 때문에 REST 방식으로 컨테이너를 관리할 수도 있습니다.

가상화 컨테이너는 "이미지(image)" 형태로 저장되고 관리됩니다. 이 때의 이미지는 프로그램이 동작하는 환경이 저장된 바이너리 이미지이며, Docker가 LXC 기반 위에서 작동하기 때문에 기존 VM 방식의 가상화 이미지들과는 다른 경량의 이미지입니다. 예를 들어, 기존 VM방식에서 이미지는 프로그램 + 라이브러리 + OS 까지 모두 저장되는 형태지만, Docker 이미지는 프로그램 (및 라이브러리)만 저장한 작은 이미지입니다. Docker에서 이 이미지들은 통상적으로 [Dockerfile](http://docs.docker.io/en/latest/reference/builder/)이라는 설정파일로부터 빌드되어 만들어지게 되고 빌드 시에는 git과 유사한 형태로 증감분만 저장되는 방식을 따릅니다. 이들 컨테이너 이미지는 [Docker에서 공개한 퍼블릭 저장소](https://index.docker.io/)에 저장할 수도 있고 또한 [private 공간에 저장](http://blog.docker.io/2013/07/how-to-use-your-own-registry/) 할 수도 있습니다. 

이렇게 빌드한 컨테이너 이미지는 어디에서나 실행 가능합니다. 예를 들어, OSX에서 만든 앱서버 docker 이미지를 그대로 Ubuntu에 올려 사용할 수 있습니다. 이미지가 경량이다 보니 이미지를 새로 만들거나 구성하는데 시간이 거의 걸리지 않기 때문에 가볍게 만들고 쉽게 붙였다 뗐다 할 수 있습니다.그러다 보니 Docker를 기반으로 한 PaaS 형태의 서비스들도 벌써 [여럿](https://orchardup.com/) [생기고](http://www.tutum.co/) 있구요. 한마디로 [git](http://git-scm.com/)이 소프트웨어 개발 환경을 변화시킨 것과 유사하게 docker가 또 한번 그 길에 도전장을 내밉니다.

OSX에서 Docker 사용하기
-----

앞서도 얘기했듯 Docker는 리눅스 컨테이너(LXC)를 기반으로 하기에 LXC를 사용할 수 없는 OSX이나 Windows 환경에서는 결국 [VirtualBox](https://www.virtualbox.org/)나 [VMware](http://www.vmware.com/kr/) 같은 다른 가상화 머신을 먼저 설치하고 그 위에 docker 환경을 구성할 수 밖에 없습니다. OSX에서 가장 많이 사용되는 방법은 VirtualBox와 [Vagrant](http://www.vagrantup.com/)를 사용하여 리눅스 환경을 구성하고 그 환경 위에 docker 컨테이너들을 올리는 방법입니다. 최근(지난 주) Docker가 [0.8 버전으로 업데이트](http://blog.docker.io/2014/02/docker-0-8-quality-new-builder-features-btrfs-storage-osx-support/)되면서 boot2docker 라는 OSX을 지원하는 좀 더 간단한 방법을 소개하고 있지만 이 역시 기본적으로는 VirtualBox나 VMware 위에서 작동할 수 밖에 없습니다. 현재 시점에서 OSX에서 Docker를 사용하는 방법에는 대체로 다음과 같은 것들이 있습니다:

* **Vagrant 방식**: Vagrant로 가상화 머신을 띄우고 그 위에 Ubuntu 또는 LXC가 지원되는 리눅스 OS를 설치한 다음 그 속에 docker를 설치하여 사용하는 방법입니다. 
* **docker-osx**: [docker-osx](https://github.com/noplay/docker-osx)은 위의 Vagrant 방식을 조금 더 자동화시켜 OSX에서 쉽게 사용할 수 있도록 만들어주는 도구입니다.
* **boot2docker**: [boot2docker](https://github.com/steeve/boot2docker) 는 docker에 최적화된 [Tiny Core Linux](http://tinycorelinux.net/) 기반의 VM을 만들어 OSX에서 쉽게 docker에 액세스할 수 있게 도와주는 도구입니다.

어느 방법을 쓰던 작동 원리는 동일합니다. 즉, OSX에 docker 클라이언트를 설치하고 docker CLI로 VM 상의 docker 데몬과 통신하는 방식으로 docker 컨테이너들을 관리하는 형태를 취합니다.

![](http://usefulpa.s3.amazonaws.com/images/2014/Screenshot_20140210_140819.png)

참고로, Homebrew를 사용한다면 docker 클라이언트는 brew 명령으로 간단하게 설치할 수 있습니다.

	$ brew tap homebrew/binary
	$ brew install docker


Docker로 Node.js 개발환경 구성하기
-----

Docker의 용도는 한 가지가 아니며, 사용하기에 따라 여러 형태로 사용될 수 있습니다. 아직 버전이 낮은 관계로 production 환경에서는 사용이 권장되지 않지만 이미 docker를 production 환경에서 사용하는 곳도 여럿 있을 정도입니다. 그렇지만 가장 대표적인 Docker의 유스케이스는 뭐니뭐니해도 개발환경을 구성하는 것일 겁니다. Docker를 이용하면 production 환경과 동일한 환경을 쉽게 만들고 변형하면서 소프트웨어를 테스트해 볼 수 있습니다.

여기서는 간단한 Node.js 앱을 하나 빌드하여 docker 컨테이너에 올려 실행해 보겠습니다. VirtualBox와 Vagrant는 이미 설치되어 있다고 가정합니다. 

우선 Vagrant로 VirtualBox에 Ubuntu OS를 설치하고 그 속에 docker를 설치합니다. 이 작업은 Vagrant를 이용하면 간단하게 처리할 수 있습니다. 이 작업에 사용된 Vagrantfile은 소스코드를 참고  바랍니다. 완료되면 vagrant box를 띄웁니다.

	$ vagrant up

Docker는 기존에 빌드된 이미지를 바로 불러와서 사용할 수도 있지만, 여기서는 간단하게 Dockerfile을 하나 작성하여 새로 docker 이미지를 빌드하는 방식을 따르겠습니다. 우선 프로젝트 디렉터리에서 다음과 같이 Dockerfile을 하나 작성합니다. Dockerfile 자체는 기존의 설치 스크립트들과 다르지 않은 간단한 구조를 가지기 때문에 설명을 생략합니다.

	FROM ubuntu
	
	# Install Node.js
	RUN sudo apt-get update
	RUN sudo apt-get install -y python-software-properties # python g++ make
	RUN sudo add-apt-repository ppa:chris-lea/node.js
	RUN sudo apt-get update
	RUN sudo apt-get install -y nodejs
	
	RUN echo "export PATH=$PATH:/opt/node/bin" >> ~/.bashrc
	RUN . ~/.bashrc
	
	# Bundle project source
	ADD . /opt/src
	
	## Install project dependencies
	RUN cd /opt/src; npm install
	
	EXPOSE  8080
	
	# Run the node server
	CMD ["node", "/opt/src/app/index.js"]

이제 이 Dockerfile을 빌드하면 새로 docker 이미지가 하나 생성됩니다. 이 때 빌드는 Dockerfile의 각 단계별로 진행되며 별도 옵션을 주지 않는 한 자동으로 캐시되기 때문에 Dockerfile이 변경되면 변경된 부분만 다시 빌드할 수 있습니다. 

	$ docker build -t ubuntu-node-demo .

빌드된 Docker 이미지들은 `docker images` 명령으로 확인할 수 있으며, 이렇게 빌드된 이미지는 퍼블릭 저장소에 업로드할 수 있고 프라이빗 저장소를 만들어 저장할 수도 있습니다(git 저장소와 같은 원리). 빌드된 이미지를 docker 컨테이너에서 실행시킬 때는 `docker run` 명령을 사용합니다. 참고로 이 모든 작업들은 OSX 로컬 환경에서 docker CLI로 처리하면 되기 때문에 굳이 VM에 접속할 필요는  없습니다.

	$ docker run -p 8080:8080 ubuntu-node-demo

여기서 -p 옵션은 [포트 포워딩 설정](http://docs.docker.io/en/latest/use/port_redirection/)을 하는 부분이며, 이 Node.js 앱에서는 8080번으로 웹접속을 설정했고 또 컨테이너 바깥(호스팅 VM)에서도 8080번 포트로 액세스하려 하기 때문에 이렇게 설정한 것입니다. 이제 정상적으로 작동하면 브라우저에서 접속하여 확인할 수 있습니다. 이 때 유의할 점은, OSX에서는 컨테이너로의 접속을 위해 실제로 2번의 포트 포워딩이 이루어진다는 점입니다. 한번은 OSX에서 호스팅 VM으로의 포워딩이고, 나머지 한번은 호스팅 VM에서 다시 docker 컨테이너로의 포워딩입니다. 이 중 하나라도 접속이 막히면 물론 웹접속은 이루어지지 않습니다.

마무리
-----

여기까지 Docker의 기본개념과 OSX에서의 개발환경 구성을 중심으로 간단한 사용법을 소개했지만, 어디까지나 수박 겉핧기에 불과합니다. 실제로 Docker는 여기 소개된 것보다 훨씬 다양한 기능들을 갖추고 있으며 다양한 생태계를 만들어 나가고 있습니다.

![](http://usefulpa.s3.amazonaws.com/images/2014/Screenshot_20140210_140936.png)

Docker는 이제 겨우 걸음마를 시작한 솔루션입니다. 그렇지만 이미 [올해의 오픈소스 수퍼루키 10선](http://www.itworld.co.kr/slideshow/85821)에 포함될 정도로 벌써 유명세를 치루고 있는 "devops 계의 루키"이기도 합니다. 물론 그만한 대접을 받을 자격이 있다 생각도 듭니다. 무거운 짐을 지고 항해하는 고래를 상징하는 로고 마스코트처럼, 올 한해 Docker의 멋진 순항을 기대해 봅니다.

앞서 소개한 예제는 [github](https://github.com/sjoonk/docker-ubuntu-node-hello)에 올려 두었으니, 필요한 분들은 참고 바랍니다.
 



 