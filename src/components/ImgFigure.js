import React from 'react';
let yeomanImage = require('../images/1.jpg');

//1、加载数据
// let imageDatas = require('../data/imageDatas.json');

//更改数据的相片连接地址并加入imageDatas变量中
/*imageDatas = (function getImageURL(imageDatasArr) {
    for (let i = 0,j = imageDatasArr.length; i < j; i++){
        let singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.filename);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);*/

class ImgFigure extends React.Compoment {
    constructor(props) {
        super(props);
        this.state = {
            imgsArrangeArr: [
                /*{
                 pos:{
                 left: '0',
                 top: '0'
                 }
                 rotate: 0,    //旋转角度
                 isInverse: false,  //图片正反面
                 isCenter: false,  //图片是否居中
                 }*/
            ]};
    }
    render(){
        return (
            <figure className="img-figure">
                <img src={yeomanImage} alt="图片"/>
                <figcaption className="figcaption">
                    <h2 className="img-title">图片名称</h2>
                    <div className="img-back">
                        <p>
                            图片描述信息
                        </p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}
export default ImgFigure;