---
layout: post
title: "Elixir로 JSON API 서버 만들기"
description: 함수형 언어 Elixir로 간단한 웹 API 서버를 구현하면서 Elixir 웹 개발의 기본 개념과 방법, 도구들을 소개합니다.
thumbnail: https://usefulpa.s3.amazonaws.com/images/2017/elixir-plug-thumb.png
categories: ["web development"]
tags: [rest, webservice, api, json, elixir]
---

[Elixir](http://elixir-lang.org/)는 얼랭(Erlang) VM에서 작동하는 프로그램을 만드는 함수형 언어다.  스크립트 언어인 루비(Ruby)와 유사한 문법을 갖고 있지만 스크립트 방식과 컴파일 방식을 모두 지원하며, 특히 컴파일된 바이너리 코드는 얼랭과 완전히 호환되기 때문에 얼랭의 다양한 라이브러리와 도구들을 Elixir에서도 그대로 사용할 수 있는 장점이 있다. 게다가 [동시성(concurrency)](https://en.wikipedia.org/wiki/Concurrency_(computer_science)) 지원이나 [무정지(fault tolerance)](https://en.wikipedia.org/wiki/Fault_tolerance) 시스템과 같은, 얼랭 VM의 장점들도 고스란히 이어받을 수 있기 때문에 안정적이고 가용성 높은 서버 시스템을 구현하려 할 때 Elixir는 좋은 선택이 될 수 있다고 할 것이다.

이 글에서는 Elixir를 이용하여 간단한 JSON API 서버를 한번 만들어 보기로 한다(말이 'API 서버'지만 정말로 간단하니, 큰 기대는 접자).

Elixir를 처음 접하는 분들이라면 Elixir가 어떤 언어이고 웹에서는 어떻게 사용되는지 개념을 잡을 수 있는 글이 되었으면 좋겠고, JSON API 서버를 포함한 서버측 개발을 하는 분들이라면 Elixir에 대해 좀 더 관심을 가질 수 있는 계기가 되면 좋겠다.

## 프로젝트 시작하기

Elixir를 설치하면 Mix라고 하는 작업 관리툴이 함께 설치된다(Node로 치면 grunt나 gulp와 비슷한 도구라고 생각하면 된다). 통상적으로 Elixir 프로젝트는 이 Mix를 사용하여 새 프로젝트 구조를 만드는 것으로부터 시작한다. 터미널에서 다음과 같이 `mix new` 명령으로 새 프로젝트를 생성하자(Mix는 다양한 용도를 갖고 있는데 자세한 내용은 `mix help`로 확인할 수 있다).

	$ mix new my_app

my_app 이라는 프로젝트 디렉터리가 만들어 졌으면 이 디렉터리로 들어가서 디렉터리 구조를 한번 살펴보자. 

![](https://usefulpa.s3.amazonaws.com/images/2017/elixir-my_app-directory.png)

mix.exs 파일은 프로젝트의 설정과 관련된 파일이며 lib 디렉터리 아래에 프로그램의 소스코드가 위치한다. config 디렉터리 아래의 config.exs 파일은 애플리케이션의 설정에서 사용하는 파일이다.

## 의존 라이브러리 추가하기

우리가 만들 프로그램은 어떤 임의의 URL을 입력하면 JSON 형식의 텍스트를 반환하는 간단한 API 서버다. 이를 위해 이 프로그램에서는 Elixir에서 웹 애플리케이션 기능을 제공할 때 사용하는 표준 라이브러리인 [Plug](https://hex.pm/packages/plug)과 JSON을 처리하는 [Poison](https://hex.pm/packages/poison) 라이브러리를 사용할 것이다.

mix.exs 파일을 열어 끝 부분에 있는 deps 함수를 다음과 같이 수정하자. 이 부분은 프로젝트에서 의존하는 라이브러리를 추가하는 부분이다. 이 때 함께 추가한 [Cowboy](https://github.com/ninenines/cowboy)는 실은 Erlang HTTP Server이며, Plug에서 필요로 하기 때문에 함께 추가한 것이다. 

```elixir
defp deps do
  [
  	{:cowboy, "~> 1.0.0"},
    {:plug, "~> 1.3"},
    {:poison, "~> 3.1"}
  ]
end
```

이 상태로 명령행에서 아래 mix 명령을 실행하면 원격의 라이브러리 소스가 로컬 프로젝트 속으로 import 된다(npm install 이나 go get 명령을 떠올리면 된다). 

	$ mix deps.get

다음으로, 같은 파일에 있는 application 함수를 아래와 같이 수정하자. 마찬가지로 이 프로젝트에서 사용될 애플리케이션들을 선언하는 부분이다(Elixir에서는 각각의 라이브러리가 하나의 독립된 애플리케이션이며 따라서 Elixir 프로젝트는 결국 여러 애플리케이션들이 서로 어울려 작동하는 구조가 된다). 

```elixir
def application do
  [applications: [:logger, :plug, :poison]]
end
```

## Hello, Elixir!

이제 프로그램을 만들기 위해 필요한 준비는 끝이 났다. 실제 API 부분을 구현하는 일만 남았다. lib 디렉터리 아래에 있는 my_app.ex 파일을 열자. 프로그램에서 필요한 코드는 이 파일 속에 추가하면 된다.

여기서 잠깐! 바로 API 서버를 구현하기에 앞서, 우선 Elixir와 간단하게 인사부터 나누자!

먼저 간단하게 my_app.ex 파일 속에 다음과 같이 코드를 한번 추가해 보자. MyApp이라는 모듈 내에 `init/1` 이라는 함수와 `call/2` 라는 함수를 추가하고, call 함수 속에서 다시 `Plug.Conn.send_resp/3` 함수를 호출하였다. 

```elixir
defmodule MyApp do
  
  def init(options) do
    # initialize options
    options
  end

  def call(conn, _opts) do
    Plug.Conn.send_resp(conn, 200, "Hello, Elixir!")
  end

end
```

여기까지 작성하였으면, 이제 명령행에서 다음과 같이 IEx를 통해 Elixir의 인터랙티브 환경에 접속하자. IEx는 Elixir의 대화형 콘솔이며(루비의 irb 같은), 이 때 `-S` 옵션은 iex를 실행할 때 mix.exs 스크립트도 함께 로드하라는 의미다.

	$ iex -S mix

잘 따라 왔다면 다음과 같이 콘솔이 열렸을 것이다. 

```
Interactive Elixir (1.3.4) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)>
```

이 상태에서 앞서 mix 설정에서 추가한 웹서버인 Cowboy HTTP 서버를 실행하자. 

```
iex(1)> Plug.Adapters.Cowboy.http MyApp, []
{:ok, #PID<0.180.0>}
```

`{:ok, #PID<xxx>}` 가 떨어지면 정상이다. 앞서 우리가 만든 MyApp 모듈이 Cowboy 웹서버와 연동되어 실행되었다. 이 상태에서 웹브라우저나 curl 명령으로 http://localhost:4000/ 에 접속하여 확인해 보면 예상대로 "Hello, Elixir!"가 출력되는 것을 확인할 수 있을 것이다.

## 웹 애플리케이션과 Plug!

생각보다 간단하게 끝났다. 기대한 것보다 너무 시시했다면 아마도 Plug를 사용한 탓일 것이다. 지금까지는 별 말 없이 Plug 라이브러리를 사용했지만, 여기서는 잠깐 간단하게라도 Plug에 대해 소개하고 넘어가기로 하자. 

[Plug 소개 페이지](https://hexdocs.pm/plug/readme.html)에서는 Plug을 다음과 같이 소개하고 있다.

![](https://usefulpa.s3.amazonaws.com/images/2017/elixir-plug-is.png)

즉, Plug은 1) Elixir 기반 웹 애플리케이션들 간 상호 호환가능한 모듈을 만들기 위한 명세이자 2) 다양한 웹서버들과의 연결을 위한 어댑터 역할을 하는 라이브러리이다. 

비슷한 냄새를 맡았다면, 맞다! 바로 루비의 [Rack](https://rack.github.io/)과 유사한 개념이다(실제로 Elixir 언어를 만든 [José Valim](https://github.com/josevalim)은 Rails Contributer이기도 하다). Rack과 다른 점이라면, Plug은 라우터(router) 기능까지 제공한다는 점이다([Sinatra](http://www.sinatrarb.com/)의 router 기능을 Plug에서는 기본으로 제공한다). 

Plug에 대한 더 자세한 설명은 [Plug 문서](https://hexdocs.pm/plug/readme.html)에 잘 소개되어 있으니 여기서는 생략하기로 하고, 방금 소개한 Plug의 라우터 기능을 이용해 우리의 구현 목표인 API 서버로 한 발짝 더 나가 보자.

## API 서버 구현하기

우리가 만들 API 서버는 예컨대 URL `/users/tom` 을 호출하면 사용자 프로필 정보를 JSON 형식으로 출력하는 간단한 API 서버가 될 것이다. 이제 이를 위해 my_app.ex 파일의 코드를 약간 수정하자. 

[Plug Router](https://hexdocs.pm/plug/readme.html#the-plug-router)를 사용하면 코드는 다음과 같이 간단해 진다.

```elixir
defmodule MyApp do
  use Plug.Router
  
  plug :match
  plug :dispatch

  get "/users/:name" do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(%{:name => name}))
  end
  
  match _ do
    send_resp(conn, 404, "oops")
  end
  
end
```

코드를 잠깐 부연하면, `get "/users/:name" do` 부분에서 URL 맵핑을 통해 웹요청을 처리하고 있으며, 마지막 `match _ do` 부분은 이도 저도 아닌 나머지 요청에 대한 처리(catch-all) 루틴이다. 코드 중간의 약간 이상한 모양의 '`|>`'는 Elixir의 파이프(pipe) 연산자다(Unix의 파이프와 같은 개념이다). 

루비 개발자라면 코드가 왠지 좀 익숙하게 느껴질 것이다. Plug Router는 실제로 루비의 Sinatra 라우터와 상당히 유사한 [DSL](https://en.wikipedia.org/wiki/Domain-specific_language)을 갖는다. Elixir는 [매크로(macro)](http://elixir-lang.org/getting-started/meta/macros.html) 라는 방식으로 [메타 프로그래밍](https://en.wikipedia.org/wiki/Metaprogramming)을 지원하기 때문에 위와 같이 DSL 스타일의 코드를 간단하게 만들어 낼 수 있는 것이다. 

## 명령행에서 API 서버 실행하기

이제 마무리다. 지금까지는 API 서버를 실행하려면 IEx에 접속하여 Cowboy 어댑터를 호출해야 했다. 이제 명령행에서 직접 API 서버를 실행할 수 있도록 변경해 보자.

우선 mix.exs 파일을 열어 `application/0` 함수를 다음과 같이 변경하자.

```elixir
def application do
  [applications: [:logger, :cowboy, :plug, :poison], mod: {MyApp, []}]
end
```
`mod` 키를 추가하여, 애플리케이션이 시작될 때 실행할 시작 모듈을 MyApp으로 지정하였다. 

이제 메인 코드로 와서 파일 속 적당한 곳에 다음과 같이 `start/2` 함수를 추가하자(이 함수는 애플리케이션이 시작될 때 호출되는 콜백callback 함수다).  그런 다음 이 함수 속에서 Cowboy 웹서버를 실행한다.

```elixir
def start(_type, _args) do
  Plug.Adapters.Cowboy.http(__MODULE__, [])
end
```

마지막으로 터미널에서 다음과 같이 `mix run` 명령을 실행하면,

	$ mix run --no-halt

굳이 IEx로 접속하지 않고도 API 서버가 작동되는 것을 확인할 수 있을 것이다. 프로덕션(production) 환경에서라면 Nginx 같은 웹서버를 이 API 서버 앞단에 [리버스 프록시(reverse proxy)](https://en.wikipedia.org/wiki/Reverse_proxy)로 두는 방식도 가능하다.

이것으로 간단한 Elixir 기반 API 서버 구현에 대한 설명을 마친다. 이 글은 Elixir 웹 개발에 필요한 기본을 따라가려다 보니 미처 설명하지 못한 부분들이 더러 있다. 예를 들면, 

- **데이터 저장소와의 연동**. 실제로라면 API 호출 시에 결과값을 반환하기 위해 RDBMS나 NoSQL 등 여러 유형의 데이터 저장소로부터 데이터를 추출하여 결과를 반환해야 할 것이다.
- **Supervisor 처리**. Erlang/OTP에는 [수퍼바이저(Supervisor)](http://erlang.org/doc/man/supervisor.html) 라고 하는 기능(이를 '비헤비어behaviour'라 부른다)이 제공되며, Elixir에서도 이 [수퍼바이저](https://hexdocs.pm/elixir/Supervisor.html) 기능을 지원한다. 이를 이용하면 supervisor/worker 방식의 프로세스 구성을 쉽게 처리할 수 있지만, 여기서는 이 부분은 생략하였다.

 여기서는 Elixir 웹 개발의 기본 툴이라 할 수 있는 Plug을 가지고 API 서버를 구현했지만, 만약 좀 더 다양한 기능을 갖춘 서버를 좀 더 쉽게(?) 만들려면 다음과 같은 도구들도 고려해 볼만 하다.
 
 *  [Phoenix Framework](http://www.phoenixframework.org/) Ruby on Rails 같은 범용 Elixir 웹 프레임워크
 * [Maru](https://maru.readme.io/) Elixir REST API Framework 

## 참고자료

Elixir와 Plug에 대해 좀 더 깊게 공부해 보고 싶은 분들이라면, 앞서 본문에서 소개한 문서들 외에도 아래 자료를 참고하면 좋을 것 같다.

* [Elixir Crash Course](http://elixir-lang.org/crash-course.html)
* [Elixir School](https://elixirschool.com/) Plug 튜토리얼: [영문](https://elixirschool.com/lessons/specifics/plug/), [국문](https://elixirschool.com/ko/lessons/specifics/plug/)


    