import React, {Component} from 'react';


class Content extends Component{
	render(){
		return (
			<header>
				<h2>{this.props.title}</h2>
				{this.props.do}
				
			</header>
		);
	}
}


export default Content;