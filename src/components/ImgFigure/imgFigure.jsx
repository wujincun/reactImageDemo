require('normalize.css/normalize.css');
require('styles/App.less');
import ReactDOM from 'react-dom';
import React from 'react';

class ImgFigure extends React.Component{
	constructor(props, context){
		super(props, context);
	}
	render(){
		let styleObj = {};
		//如果props属性中指定了这张图的位置，则使用
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos
		}
		//如果图片的旋转角度有值不为0，添加旋转角度
		if (this.props.arrange.rotate) {
			['MozTransform','msTransform','WebkitTransform','transform'].forEach((value,key) => {
				styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			})
		}
		/*图片正反面*/
		let imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
		/*中心图片zindex*/
		if(this.props.arrange.isCenter){
			styleObj.zIndex = 110;
		}
		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
				<img src={this.props.data.imageUrl} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back">{this.props.data.desc}</div>
				</figcaption>
			</figure>
		)
	}
	/*imgFigure 的点击处理函数*/
	handleClick(e){
		if(this.props.arrange.isCenter){
			this.props.inverse()
		}else{
			this.props.center()
		}
		e.stopPropagation();
		e.preventDefault();
	}
	componentDidMount() {
		
	}
}
export default ImgFigure;