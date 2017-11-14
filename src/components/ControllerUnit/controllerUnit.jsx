require('normalize.css/normalize.css');
require('styles/App.less');
import ReactDOM from 'react-dom';
import React from 'react';

class ControllerUnit extends React.Component{
	constructor(props, context){
		super(props, context);
	}
	render(){
		var controllerUnitClassName = "controller-unit";
		//如果对应的图片是居中的图片，显示控制按钮的居中态
		if(this.props.arrange.isCenter){
			controllerUnitClassName += ' is-center'
			//如果同时对应的是翻转图片，显示控制按钮的翻转态
			if(this.props.arrange.isInverse){
				controllerUnitClassName += ' is-inverse';
			}
		}
		return (
			<span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
		)
	}
	handleClick(e){
		//如果点击的是当前选中的按钮，则翻转图片，否则将对应的图片居中
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}
		e.preventDefault();
		e.stopPropagation();
	}

}
export default ControllerUnit;