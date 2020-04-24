import React from 'react'
import TweenOne from 'rc-tween-one';

class Square extends React.Component {
    css = () => { return {background: this.props.color} }

    render() {
        const {countClick, animation, id} = this.props

        return (
            <TweenOne animation={animation}>
                <div className="cell">
                    <div className="square center" onClick={() => countClick(id)} style={this.css()}></div>
                </div>
            </TweenOne>
        )
    }
}

export default Square;
