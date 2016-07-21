require('styles/ImgFigure.css');
import React from 'react';
// let img = require('../images/6.jpg');

class ImgFigure extends React.Component {
    render() {
        return(
            <figure className="img-figure">
                <img src={'../images/'+this.props.data.fileName} alt="ddd"/>
                <figcaption>
                    <h2 className="img-title">图片名称</h2>
                    <div className="img-back">
                        <p>
                            图片内容
                        </p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}

export default ImgFigure;