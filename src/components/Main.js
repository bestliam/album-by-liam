require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import ImgFigure from './ImgFigure';

//1、加载数据
var imageDatas = require('../data/imageDatas.json');
//2、添加相片连接到数据中，使用自执行函数
/*imageDatas = (function getImgURL(imageDatasArr) {
    for (let i = 0; i < imageDatasArr.length; i++){
        let singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.filename);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);*/

class AppComponent extends React.Component {

    render() {
        var imgFigure = [];
        imageDatas.forEach(function(value,index){
            imgFigure.push(<ImgFigure data={value} key={index}/>);
        });
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigure}
                </section>
                <nav className="controller-nav"></nav>
            </section>
        )
    }
}
AppComponent.defaultProps = {

};

export  default AppComponent;