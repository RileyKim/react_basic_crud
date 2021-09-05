import React, {Component} from 'react';

class Nav extends Component{
	shouldComponentUpdate(newProps, newState){
		if(newProps.data === this.props.data){
			return false;
		}
		return true;
	}


	render(){
		var lists =[];
		var data = this.props.data;
		var i=0;
		while(i<data.length){
			lists.push(
				<li key={data.[i].id}>
					<a 
						href = {data.[i].id}
						// data-id = {data.[i].id}
						onClick = {function(id,e){
							e.preventDefault();
							this.props.onChangePage(id);
						}.bind(this,data.[i].id)}
					>{data.[i].title}</a>
				</li>);
			
			i= i+1;
		}

		return(
			<nav>
				<ul>
					{lists}
				</ul>
			</nav>

		);
	}
}

export default Nav;