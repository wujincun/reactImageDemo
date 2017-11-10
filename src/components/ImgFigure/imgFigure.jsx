require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';

class ImgFigure extends React.Component{
	render(){
		return (
			<figure>
				<img src={this.props.data.imageUrl} alt={this.props.data.title}/>
				<figcaption>
					<h2>{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
}
export default ImgFigure;