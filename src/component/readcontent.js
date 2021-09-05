import React, {Component} from 'react';


class ReadContent extends Component{
	render(){
		return (
			<header>
				<h2>{this.props.title}</h2>
				{this.props.desc}
				
			</header>

		);
	}
}

export default ReadContent;