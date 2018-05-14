---
layout: post
title: "Backbone 앱에 React 컴포넌트 추가하기"
description: 백본(Backbone)으로 작성된 애플리케이션에 자바스크립트 UI 라이브러리인 리액트(React)를 추가하는 방법을 간단하게 정리해 보았습니다.
thumbnail: https://usefulpa.s3.amazonaws.com/images/2014/backbone-plus-react.png
categories: ["web development"]
tags: [backbone, react, component, javascript, framework]
---

![](https://usefulpa.s3.amazonaws.com/images/2014/backbone-plus-react.png)

알다시피 [React](https://facebook.github.io/react/index.html)는 페이스북에서 공개한 오픈소스 자바스크립트 UI 라이브러리다. [Angular](https://angularjs.org/) 또는 [Ember](http://emberjs.com/)와 같은 다른 자바스크립트 라이브러리들이 주로 UI와 데이터 처리, 그리고 URL 라우팅까지 아우르는 소위 "풀스택(full stack)"의 프레임워크 구성을 가져가는 반면, React는 사용자 인터페이스 부분만 다룬다는 점에서 이들 프레임워크와 차이가 있다. 게다가 컴포넌트(web components) 개념을 갖추고 가상 DOM(Virtual DOM)을 이용한 렌더링 방식을 사용하는 탓에 사용하기 쉽고 UI 처리 속도도 빨라, 아직 v0.13.x 라는 낮은 버전임에도 이미 많은 저변을 확보하고 있다.

이에 비하면 [Backbone](http://backbonejs.org/)은 제법 오래된 축에 속한다. 웹 개발에서 프론트엔드와 자바스크립트의 비중이 커지고 SPA(Single Page App) 개념이 일반화될 무렵, 그때까지 주로 jQuery로만 작업하던 "기존의 방식"에서 한걸음 더 나아가 프론트엔트 측에도 서버 측의 웹개발과 유사한 MVC(Model-View-Controller) 기반의 패턴을 적용한 시도 중 가장 성공한 케이스 중 하나다. 그러다보니 이미 많은 적용 사례를 갖고 있고 또 Angular나 Ember 같은 다른 프레임워크들에 비해 상대적으로 관례가 적고 "가벼워서" 요즘도 계속 사용되고 있는 자바스크립트 라이브러리의 "고전(classic)"이다.

그렇지만 Backbone 라이브러리가 그 자체로는 너무 "기본적인" 내용들만 담고 있다 보니 종종 까다로운 문제를 처리해야 할 때는 여러 가지 직접 해결해야 할 문제들이 생기곤 할 때가 많다. 특히 뷰 처리와 관련해서는, 뷰 템플릿(template)을 처리하거나 중첩된 뷰(nested view)를 다룰 때 또는 뷰와 연결된 여러 이벤트들을 관리하거나 뷰의 상태를 다룰 때 등에서 종종 복잡한 문제와 맞닥뜨릴 때가 있다. 이럴 경우 Backbone 앱의 기본 구조는 그대로 남겨두고 뷰(View) 부분만 React로 교체해 보는 것도 좋은 방법이다. [Backbone의 뷰는 렌더링(rendering)에 있어 특별한 관례를 갖고 있지 않기 때문에](http://backbonejs.org/#View-rendering) React와 연동하여 가상돔(Virtual DOM)을 렌더링하는 것도 얼마든지 가능하기 때문이다.

알다시피 Backbone 앱은 모델(Model)과 뷰(View)를 중심으로 구성된다. Backbone 모델에서 발생한 변경 사항은 Backbone의 자체 이벤트 시스템을 통해 뷰에서 받아서 처리(render)하고, 반대로 사용자 입력은 뷰를 통해 모델로 전달하는 구조다(아래 그림 참조). 다만 Angular나 Ember에서와 같은 소위 '2-way binding'은 지원하지 않는다.

![](https://usefulpa.s3.amazonaws.com/images/2014/backbone-model-view.png)
(그림 출처: [http://backbonejs.org/](http://backbonejs.org/) )

Backbone 앱에 React를 적용하려면 기존에 Backbone 뷰로 작성한 부분을 React 컴포넌트로 교체하면 된다. 아래 코드에서는 기존의 Backbone 뷰 골격은 그대로 두고 뷰의 render 메서드 부분만 React#render 호출로 변경하였다.

	// home_view.js
	
	var HomeView = Backbone.View.extend({
	  el: '#home',
	
	  initialize: function() {
	    this.render();
	  },
	  
	  render: function() {
	    var entryList = React.createElement(EntryList, {collection: this.collection});
	    React.render(entryList, this.el);
	    return this;
	  }
	});

실제 UI 처리는 모두 React 컴포넌트에서 이루어진다. 아래 코드는 위의 HomeView#render 메서드 속에서 사용한 EntryList의 예제이며, React의 프로퍼티(property)로 Backbone의 컬렉션(Collection) 데이터를 받아 React 컴포넌트의 렌더링을 처리하는 간단한 JSX 파일이다.

	// entry_list.jsx
	
	var EntryList = React.createClass({
	
	  render: function() {
	    return (
	      <div className="entry-list">
	        <h1>Listing Entries</h1>
	        <EntryForm collection={this.props.collection} />
	        <hr />
	        <ul className="entries">
	        {this.props.collection.sort().map(function(entry) {
	          return <li key={entry.cid}>{entry.get('title')}</li>;
	        })}
	        </ul>
	      </div>
	    );
	  }
	});

이제 남은 문제는, Backbone의 모델(또는 컬렉션)에서 발생한 변경을 어떻게 하면 React 컴포넌트에서 받아 (자동으로) 렌더링되게 하냐 하는 것이다. 얼핏 모델이나 컬렉션이 변경되는 부분에서 React#render 메서드를 명시적으로 호출해 주면 간단할 듯 보인다. 다행히 React에서는 이를 위해 [React#forceUpdate](https://facebook.github.io/react/docs/component-api.html#forceupdate)라는 메서드를 제공한다. 따라서 [React 컴포넌트의 라이프사이클(Life-cycle)](https://facebook.github.io/react/docs/component-specs.html) 콜백 함수 속에서 다음과 같이 Backbone의 모델/컬렉션의 변경 이벤트를 바인딩(binding)하여 React#forceUpdate를 호출해주면 모델/컬렉션의 변경 사항이 자동으로 React UI에 반영된다.

아래에서는 React의 componentDidMount와 componentWillUnmount 콜백에서 각각 컬렉션의 이벤트를 바인딩/언바인딩 처리하고 있다.

	// entry_list.jsx
	
	var EntryList = React.createClass({
	
	  componentDidMount: function() {
	    this.props.collection.on('add remove change', this.forceUpdate.bind(this, null));
	  },
	
	  componentWillUnmount: function () {
	    this.props.collection.off(null, null, this);
	  },
	  
	  render: function() {
	    return (
	      // 생략
	    );
	  }
	});


물론 React는 선언적(declarative) 방식으로 렌더링을 처리하기 때문에 지금처럼 React#forceUpdate를 호출하는 방식보다는 모델이나 컬렉션의 변경이 이루어지는 부분에서 "변동이 생겼음"을 React에게 넌지시 알려 주어 React가 "알아서" 렌더링하게 하는 게 더 좋은 방법이긴 하다. 이 점은 [React API 문서](https://facebook.github.io/react/docs/component-api.html#forceupdate)에도 나와 있다:

> Normally you should try to avoid all uses of forceUpdate() and only read from this.props and this.state in render(). This makes your component "pure" and your application much simpler and more efficient.

그렇지만 지금과 같이 Backbone 앱에 React를 적용할 때에는 Backbone의 구조도 고려할 필요가 있기 때문에 앞에서처럼 직접 React#forceUpdate를 호출하는 방식이 유용할 수 있으며 또한 가장 간단한 방법이기도 하다. 

물론 여기서는 설명의 편의를 위해 React 컴포넌트 속에 직접 콜백을 두는 방식을 사용했지만, 실제로는 React의 [믹스인(mixin)](https://facebook.github.io/react/docs/reusable-components.html#mixins)으로 처리하는 것이 더 편리할 것이다. 물론 이미 이 기능을 (믹스인으로) 구현해 놓은 많은 솔루션(플러그인)들이 나와 있기 때문에 굳이 "바퀴를 직접 만들" 필요는 없을 듯 하다. 이들 중 대표적인 것 몇몇만 소개하면 다음과 같다:

- [ReactBackbone](https://github.com/clayallsopp/react.backbone) 앞서 소개한 React#forceUpdate 방식을 사용한 Mixin
- [Backbone React Component](http://magalhas.github.io/backbone-react-component/) Wrapper를 사용하여 백본 모델/컬렉션의 상태를 React state와 맵핑
- [ReactBone](https://github.com/andrejewski/reactbone)  React 컴포넌트와 연동할 수 있게 Bakbone 모델/컬렉션을 확장

<br/>
<div class="panel panel-default">
  <div class="panel-body" style="background: #7FDBFF; color: hsla(197, 100%, 20%, 1.0);">
이 글에서 사용한 예제의 전체 소스코드는 <a href="https://github.com/usefulparadigm/backbone-reactjs">Github</a>에서 내려 받을 수 있습니다. 
  </div>
</div>
