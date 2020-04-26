import React from 'react'
import TweenOne from 'rc-tween-one';
import { Transition } from 'react-transition-group'
import '../css/app.css'
import '../css/popup.css'

class Popup extends React.Component {
    emblemStyle = () => {
        return {
            backgroundColor: this.props.color,
            boxShadow: `0px 0px 20px ${this.props.color}80`
        }
    }

    duration = 500

    defaultStyle = {
        transition: `${this.duration}ms ease-in-out`,
        opacity: 0,
        top: '55%'
    }

    transitionStyles = {
        entering: { opacity: 1, top: '50%' },
        entered:  { opacity: 1, top: '50%' },
        exiting:  { opacity: 0, top: '55%' },
        exited:  { opacity: 0, top: '55%' },
    }

    render() {
        const {score, best, size, isOpen, close} = this.props;

        return (
            <Transition in={isOpen} appear={isOpen} timeout={this.duration}>
                {state => (
                    <div id="pop-wrapper" style={{...this.defaultStyle, ...this.transitionStyles[state]}}>
                        <div id="popup">
                            <TweenOne
                                animation={{
                                rotate: 360,
                                repeat: -1,
                                duration: 25000,
                                ease: 'linear'
                            }}>
                                <div id="emblem" style={this.emblemStyle()}></div>
                            </TweenOne>
                            
                            <div className="popup-wrapper">
                                <div className="score-wrapper">
                                    <p>SCORE</p> <span>{score}</span>
                                </div>
                                <div className="best-wrapper">
                                    <p>BEST</p> <span>{best}</span>
                                </div>
                            </div>

                            {(size*size) === score ? <h5> {size}X{size} COMPLETE </h5> : null}

                            <button onClick={close}>
                                <img src="./icons/replay.svg" alt="replay"></img>
                            </button>
                        </div>
                    </div>
                )}
            </Transition>
        )
    }
}

export default Popup