//import logo from './logo.svg';
//import './App.css';

import React, {Component} from 'react';
import ReadContent from './component/readcontent.js'
import CreateContent from './component/createcontent.js'
import UpdateContent from './component/updatecontent.js'
import Subject from './component/subject.js'
import Nav from './component/nav.js'
import Control from './component/control.js'
import './App.css';





class App extends Component {
	constructor(props){
		super(props);
		this.max_content_id = 3;
		this.state = {
			mode : 'create',
			selected_content_id:3,
			subject : {title: "Web", sub: "welcome"},
			welcome : {title: "welcome", desc : "hello react"},
			contents :[
				{id:1, title:"html", desc:"this is html"},
				{id:2, title:"python", desc:"this is python"},
				{id:3, title:"c++", desc:"this is c++"}
			]
		}
	}

	getreadContent(){
		var i = 0;
		while(i<this.state.contents.length){
			var data = this.state.contents[i];
			if(data.id === this.state.selected_content_id){
				return data;
				break;
			}
			i +=1;
		}
	}

	getContent(){
		var _title, _read, _article = null;
		if(this.state.mode === 'welcome'){
			_title = this.state.welcome.title;
			_read = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_read}></ReadContent>
		}else if(this.state.mode === 'read'){
			var _content = this.getreadContent();
			_article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
			// _title = this.state.contents[0].title;
			// _read = this.state.contents[0].desc;
		}else if(this.state.mode === 'create'){
			_article = <CreateContent onSubmit={
				function(_title,_read){
					this.max_content_id += 1;
					var _contents = Array.from(this.state.contents);
					_contents.push({id:this.max_content_id, title:_title, desc:_read});
					this.setState({
						contents: _contents,
						mode : 'read',
						selected_content_id : this.max_content_id
					});
				}
			.bind(this)}></CreateContent>
		}else if(this.state.mode === 'update'){
			_content = this.getreadContent();
			_article = <UpdateContent data={_content} onSubmit={
				function(_id,_title,_read){
					
					// this.state.contents.push({id:this.max_content_id, title:_title, desc:_read});
					
					// var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_read});
					var _contents = Array.from(this.state.contents);
					var i = 0;
					while(i<_contents.length){
						if(_contents[i].id === _id){
							_contents[i] = {id:_id, title:_title, desc:_read};
							break;
						}
						i+=1;
					}
					this.setState({
						contents: _contents,
						mode:'read'
					});
				}
			.bind(this)}></UpdateContent>
		}

		return _article;
	}

	render(){
		
		return (
				<div className="App">
					<Subject 
						title={this.state.subject.title}
						sub={this.state.subject.sub}
						onChangePage = {function(){
							alert("hello");
							this.setState({
								mode:'welcome'
								
							});
						}.bind(this)}
					>
					</Subject>

{/*					<header>
						<h1><a href="/" onClick={function(e){
							console.log(e);

							e.preventDefault();
							// debugger;
							alert("hi");
							// this.state.mode = 'welcome';
							this.setState({
								mode : "welcome"
							});


						}.bind(this)}>{this.state.subject.title}</a></h1>
						{this.state.subject.sub}
					</header>*/}


					<Nav 
						onChangePage={function(id){
							alert("hi");
							this.setState({
								mode:'read',
								selected_content_id:Number(id)
							});
						}.bind(this)} 
						data={this.state.contents}
					>
					</Nav>
					<Control onChangeMode={function(_mode){

						if(_mode === 'delete'){
							//window.confirm, (press yes -> true / press no -> false)
							if(window.confirm('really?')){
								var _contents = Array.from(this.state.contents);
								var i = 0;
								while(i<_contents.length){
									if(_contents.[i].id === this.state.selected_content_id){
										// 발견한 원소부터 한개를 지우겠다.
										_contents.splice(i,1);
										break;
									}
									i+=1;
								}
								this.setState({
									mode:'welcome',
									contents : _contents

								});
							}
						}else{
							this.setState({
								mode:_mode
							});
						}
						
					}.bind(this)}></Control>
{/*					<ReadContent title={_title} do={_read}></ReadContent>
					<CreateContent></CreateContent>*/}

					{this.getContent()}
				</div>
		);
	}
}

export default App;


