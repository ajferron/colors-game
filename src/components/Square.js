import React from 'react'
import { Transition } from 'react-transition-group'
import TweenOne from 'rc-tween-one';

class Square extends React.Component {
    state = { hovered: false }

    doHover = () => {this.setState( {hovered: true} )}
    endHover = () => {this.setState( {hovered: false} )}

    duration = 250

    hoverStyle = {
        entering: { boxShadow: `0px 0px 20px ${this.props.color}90` },
        entered:  { boxShadow: `0px 0px 20px ${this.props.color}90` },
        exiting:  { boxShadow: 'none' },
        exited:  { boxShadow: 'none' },
    }

    css = (state) => ({
        transition: `${this.duration}ms ease-in-out`,
        background: this.props.color,
        ...({
            entering: { boxShadow: `0px 0px 20px ${this.props.color}90` },
            entered:  { boxShadow: `0px 0px 20px ${this.props.color}90` },
            exiting:  { boxShadow: 'none' },
            exited:  { boxShadow: 'none' },
        }[state])
    })

    render() {
        const {countClick, animation, id} = this.props

        return (
            <TweenOne animation={animation}>
                <div className="cell">
                    
                    <Transition in={this.state.hovered} timeout={this.duration}>
                        {state => (
                            <div className="square center" 
                                onClick={() => countClick(id)} 
                                onMouseEnter={this.doHover}
                                onMouseLeave={this.endHover}
                                style={this.css(state)}
                                // style={{...this.defaultStyle, /* ...this.hoverStyle[state] */}}
                            ></div>
                        )}
                    </Transition>

                </div>
            </TweenOne>
        )
    }
}

export default Square;
