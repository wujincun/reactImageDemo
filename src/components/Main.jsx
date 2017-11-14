require('normalize.css/normalize.css');
require('styles/App.less');

import ImgFigure from 'components/ImgFigure/imgFigure';
import ControllerUnit from 'components/ControllerUnit/controllerUnit';

import ReactDOM from 'react-dom';
import React from 'react';

//获取图片相关数据
let imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转为图片URL路径信息


class AppComponent extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			imageDatas:[],
			imgsArrangeArr:[
				/*pos:{
					left: '0',
					top: '0'
				},
				rotate: 0,//旋转角度
				isInverse: false //图片正反面
				*/
			],
			Constant:{
				centerPos:{
					left:0,
					right:0
				},
				hPosRange:{//水平方向上取值
					leftSecx:[0,0],//左分区
					rightSecx:[0,0],//右分区
					y:[0,0]
				},
				vPosRange:{//垂直方向上取值
					x:[0,0],
					topY:[0,0]//上分区
				}
			},
		}

	}
	
  render() {
    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">
         	{	
         		imageDatas.map((item,index)=>{
         			if(!this.state.imgsArrangeArr[index]){
						this.state.imgsArrangeArr[index] = {
							pos:{
								left: 0,
								top: 0
							},
							rotate:0,
							isInverse: false,
							isCenter:false
						}
     				}
         			return <ImgFigure key={index} data={item} ref={`imgFigure${index}`} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index).bind(this)} center={this.center(index).bind(this)}></ImgFigure>
         		})
         	}
        </section>
        <nav className="controller-nav">
	        {
	        	imageDatas.map((item,index)=>{
	         		return <ControllerUnit  key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index).bind(this)} center={this.center(index).bind(this)}></ControllerUnit>
	         	})
	        }
        </nav>
      </section>
    ); 
  }
  componentWillMount(){
  	this.state.imageDatas = function(imageDatasArr){
		return imageDatasArr.map((item, index)=> {
			return item.imageUrl = require(`../images/${item.fileName}`);
		})
	}(imageDatas)
	//图片还没有载下来
	/*this.state.imageDatas = function getImageURL(imageDatasArr) {
		for (var i = 0, j = imageDatasArr.length; i < j; i++) {
			var singleImageData = imageDatasArr[i];
			singleImageData.imageURL = require('../images/' + singleImageData.fileName)
			imageDatasArr[i] = singleImageData;
			return imageDatasArr;
		}
	}(imageDatas)//只使用一次的函数采用自执行的方式*/
  }
  getRangeRandom(low,high){
	return Math.ceil(Math.random() * (high - low) + low)
  }
  /*
	获取0-30度之间的正负值
  */
  get30DegRandom(){
	return (Math.random() > 0.5 ? "" : "-") + Math.ceil(Math.random() * 30)
  }
  /*
	翻转图片
	@params index 输入当前被执行的inverse操作的图片的index
	@return {Function} 这是一个闭包函数，期内return一个真正的被执行的函数
  */
  inverse(index){
	return function(){
		let imgsArrangeArr = this.state.imgsArrangeArr;

		imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

		this.setState({
			imgsArrangeArr:imgsArrangeArr
		})
	}
  }
  /*
	重新布局所有图片
	@params  centerIndex 指定中心图片的index
  */
  rearrange(centerIndex){
	let imgsArrangeArr = this.state.imgsArrangeArr,
		Constant = this.state.Constant,
		centerPos = Constant.centerPos,
		hPosRange = Constant.hPosRange,
		vPosRange = Constant.vPosRange,
		hPosRangeLeftSecx = hPosRange.leftSecx,
		hPosRangeRightSecx = hPosRange.rightSecx,
		hPosRangeY = hPosRange.y,
		vPosRangeTopY = vPosRange.topY,
		vPosRangeX = vPosRange.x,

		imgsArrangeTopArr = [],
		topImgNum = Math.floor(Math.random() * 2), //取一个或者不取
		topImgSpliceIndex = 0,

		imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex , 1);
		
		//首先居中centerIndex的图片,居中图片不需要旋转
		imgsArrangeCenterArr[0] = {
			pos : centerPos,
			rotate : 0,
			isCenter: true
		}
		//取出要布局上侧的图片的状态信息
		topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
		//布局位于上册的图片
		imgsArrangeTopArr.forEach((value, index) => {
			imgsArrangeTopArr[index] = {
				pos: {
					top: this.getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
					left: this.getRangeRandom(vPosRangeX[0],vPosRangeX[1])
				},
				rotate:this.get30DegRandom(),
				isCenter:false
			}

		})

		//布局左右两侧的图片
		for (var i =0,j = imgsArrangeArr.length ,k = Math.floor(j/2); i < j; i++) {
			let hPosRangeLORX = null;
			//前半部分布局在左边，后半部分布局在右边
			if(i < k){
				hPosRangeLORX = hPosRangeLeftSecx;
			}else{
				hPosRangeLORX = hPosRangeRightSecx;
			}
			imgsArrangeArr[i] = {
				pos : {
					top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
					left:this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
				},
				rotate:this.get30DegRandom(),
				isCenter:false
			}
			
		}
		if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
			imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
		}
		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])
		this.setState({
			imgsArrangeArr: imgsArrangeArr 
		});
  }
  /*
	利用rearrange 函数，居中对应index的图片；
	@params inderx 需要被居中图片对应的图片信息数组的index；
	@return {Function}
  */
  center(index){
  	return function(){
  		this.rearrange(index)
  	}
  }
  componentDidMount() {
  
  	//舞台大小
		let stageDom = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDom.scrollWidth,
			stageH = stageDom.scrollHeight,
			halfStageW = Math.ceil(stageW/2),
			halfStageH = Math.ceil(stageH/2);
	//imagefigure大小
		let imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDom.scrollWidth,
			imgH = imgFigureDom.scrollHeight,
			halfImgW = Math.ceil(imgW/2),
			halfImgH = Math.ceil(imgH/2);
		//计算中心图片位置点
		this.state.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}
		//计算左侧右侧图片位置取值范围
		this.state.Constant.hPosRange.leftSecx[0] = -halfImgW;
		this.state.Constant.hPosRange.leftSecx[1] = halfStageW - halfImgW * 3;
		this.state.Constant.hPosRange.rightSecx[0] = halfStageW + halfImgW;
		this.state.Constant.hPosRange.rightSecx[1] = stageW - halfImgW;
		this.state.Constant.hPosRange.y[0] = -halfImgW;
		this.state.Constant.hPosRange.y[1] = stageH - halfImgW;
		//计算上册图片位置取值范围
		this.state.Constant.vPosRange.topY[0] = -halfImgH;
		this.state.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.state.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.state.Constant.vPosRange.x[1] = halfStageW;

		this.rearrange(0)
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
