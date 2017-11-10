require('normalize.css/normalize.css');
require('styles/App.less');

import ImgFigure from 'components/ImgFigure/imgFigure';

import React from 'react';

//获取图片相关数据
let imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转为图片URL路径信息


class AppComponent extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			imageDatas:[]
		}
	}
  render() {
    return (
      <section className="stage">
      	<section className="img-sec">
         	{
         		imageDatas.map((item,index)=>{
         			return <ImgFigure key={index} data={item}></ImgFigure>
         		})
         	}
        </section>
        <nav className="controller-nav">
         	
        </nav>
      </section>
    );
  }
  componentDidMount(){
	this.state.imageDatas = function(imageDatasArr){
		return imageDatasArr.map((item, index)=> {
			return item.imageUrl = require(`../images/${item.fileName}`);
		})
	}(imageDatas)//图片还没有载下来
	/*this.state.imageDatas = function getImageURL(imageDatasArr) {
		for (var i = 0, j = imageDatasArr.length; i < j; i++) {
			var singleImageData = imageDatasArr[i];
			singleImageData.imageURL = require('../images/' + singleImageData.fileName)
			imageDatasArr[i] = singleImageData;
			return imageDatasArr;
		}
	}(imageDatas)//只使用一次的函数采用自执行的方式*/
	console.log(this.state.imageDatas.title)
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
