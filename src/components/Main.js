require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/1.jpg');


/*
 * 主组件
 */
class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
          <section className="img-sec">
              <figure>
                  <img src={yeomanImage} alt="图片"/>
                  <figcaption>
                      <h2 className="img-title">图片名称</h2>
                      <div className="img-back">
                          <p>
                              图片描述信息
                          </p>
                      </div>
                  </figcaption>
              </figure>
          </section>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
