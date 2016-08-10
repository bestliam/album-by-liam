require('styles/ImgFigure.css');
import React from 'react';

class ImgFigure extends React.Component {
    /*
     * 点击事件
     */
    handleClick(e){
        e.preventDefault();
        e.stopPropagation();

        if (this.props.arrange.isCenter){
            this.props.inverse(this.props.index);
        } else {
            this.props.center(this.props.index);
        }
    }
    render() {
        let styleObj = {};
        if (this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }
        // 如果图片的旋转角度有值并且不为0 ，添加旋转角度
        if(this.props.arrange.rotate) {
            (['MozTransform','MsTransform','WebkitTransform','transform']).forEach(function (value) {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this)) ;
        }
        // 居中图片顶层显示
        if(this.props.arrange.isCenter) {
            styleObj.zIndex = 11 ;
        }
        // 图片翻转
        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return(
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
                <img src={'../images/'+this.props.data.fileName} alt="图片"/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back">
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}

export default ImgFigure;