import React from 'react';

class ControllerUnit extends React.Component {
    handleClick(e){
        e.preventDefault();
        e.stopPropagation();
        if (this.props.arrange.isCenter){
            this.props.inverse(this.props.index);
        } else {
            this.props.center(this.props.index);
        }
    }
    render(){
        let controllerUnitClassName = 'controller-unit';
        if (this.props.arrange.isCenter){
            controllerUnitClassName += ' is-center';
            if (this.props.arrange.isInverse) {
                controllerUnitClassName += ' is-inverse';
            }
        }
        return (
            <span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
        )
    }
}
export default ControllerUnit;
