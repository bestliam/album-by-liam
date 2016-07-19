require('normalize.css/normalize.css');
require('styles/App.css');
import ImgFigure from './ImgFigure';
import React from 'react';


/*
 * 主组件
 */
class AppComponent extends React.Component {

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

    render() {
    return (
      <section className="stage">
          <section className="img-sec">
              <ImgFigure />
          </section>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
