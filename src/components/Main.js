require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

import ImgFigure from './ImgFigure';
import ControllerUnit from './ControllerUnit';

// 加载数据
var imageDatas = require('../data/imageDatas.json');


/*
 * 获取区间内的随机数值
 */
function getRangeRandom(low,hight) {
    return Math.ceil(Math.random() * (hight - low) + low);
}

/*
 * 获取正负30度
 */
function get30DegRandom() {
    return ((Math.random() > 0.5 ? '':'-') + Math.ceil(Math.random() * 30));
}


class AppComponent extends React.Component {
    //定义初始状态
    constructor(props){
        super(props);
        this.state = {
            imgsArrangeArr : [
            ]
        }
    }

    /*
     * 反转图片
     * @param index 输入当前被执行 inverse 操作的图片对应的图片信息数组的index 值
     * @return {Function} 这是一个比闭包函数， 其内return一个真正待被执行的函数
     */
    inverse(index){
        return function () {

            var imgsArrangeArr = this.state.imgsArrangeArr;

            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind(this);
    }

    /*
     * 利用 rearrange 函数， 居中对应index 的图片
     * @param index ,需要被居中的图片对应的图片信息数组的index值
     * @return {Function}
     */
    center(index) {
        return function () {
            this.rearrange(index);
        }.bind(this);
    }

    /*
     *重新布局所有图片
     *@param  centerIndex 指定居中排布哪个图片
     */
    rearrange(centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            constant = this.props.Constant,
            //中心图片
            centerPos = constant.centerPos,
            //上侧图片
            vPosRange = constant.vPosRange,
            //上侧图片的Y轴
            vPosRangeTopY = vPosRange.topY,
            //上侧图片的X轴
            vPosRangeX = vPosRange.x,
            //左右两侧
            hPosRange = constant.hPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),//顶部图片，取一张或者一张都不取
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);



        // 取出随机布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * imgsArrangeArr.length - topImgNum);
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);


        // 布局左右两侧的图片
        for (var i = 0,j = imgsArrangeArr.length,k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;

            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            }else{
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
                pos : {
                    top: getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                    left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
                },
                rotate : get30DegRandom(),
                isCenter : false
            };
        }

        //修正数组，如果存在上侧图片则修正
        if (imgsArrangeArr && imgsArrangeTopArr[0]) {
            imgsArrangeTopArr[0] = {
                pos: {
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }
        //最后修正居中的图片数据
        imgsArrangeCenterArr[0] = {
            pos:centerPos,
            rotate:0,
            isCenter:true
        };
        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }

// 组件加载后，为每张图片计算其位置的范围
    componentDidMount() {

        // 首先拿到舞台的大小
        let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        // 拿到一个 imgFigure 的大小
        let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);


        // 计算中心图片的位置点
        this.props.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };

        //计算上侧区域
        this.props.Constant.vPosRange = {
            topY : [-halfImgH,halfStageH - halfImgH * 3],
            x : [halfStageW - imgW,halfStageW]
        };

        //计算左右侧区域
        this.props.Constant.hPosRange = {
            leftSecX : [-halfImgW,halfStageW - halfImgW * 3],
            rightSecX: [halfStageW + halfImgW,stageW - halfImgW],
            y : [-halfImgH,stageH - halfImgH]
        };

        this.rearrange(0);
    }



    render() {
        let imgFigure = [];
        let stageObj = [];
        let controllerUnits = [];
        stageObj.height = document.body.clientHeight;
        imageDatas.forEach(function(value,index){
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse : false,
                    isCenter: false
                };
            }
            //插入图片数据
            imgFigure.push(<ImgFigure index={index} data={value} key={index} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
            //插入控制按钮数据
            controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
        }.bind(this));

        return (
            <section className="stage" ref="stage" style={stageObj}>
                <section className="img-sec">
                    {imgFigure}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        )
    }
}
AppComponent.defaultProps = {
//    定义初始值
    Constant : {
        centerPos : {  //中心点
            left : 0 ,
            top : 0
        },
        hPosRange : { //水平方向取值范围
            leftSecX : [0,0],
            rightSecX : [0,0],
            y : [0,0]
        },
        vPosRange : { //垂直方向取值范围
            x : [0,0],
            topY : [0,0]
        }
    }


};

export  default AppComponent;