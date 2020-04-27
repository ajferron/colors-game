import React from 'react';
import {v4 as uuid} from 'uuid'
import Grid from './components/Grid'
import Popup from './components/Popup'
import animations from './animations.json'
import './css/app.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 3,
            score: 0,
            highscore: 0,
            initSquares: [],
            squares: [],
            clickable: true,
            gameOver: false,
            openPopup: false,
            lastColor: null,
            sqAnim: null,
        }

        animations.spin = {
            ...animations.spin,

            onRepeat: (e) => this.setState((prev) => {
                if (this.state.gameOver) 
                    return {squares: [...this.state.initSquares]}
                else
                    return {squares: prev.squares.sort(() => Math.random()-0.5)}
            }),

            onComplete: (e) => this.setState( {clickable: true} )
        }
    }

    countClick = (id) => {
        if (this.state.clickable && (!this.state.gameOver || id < 0)) {

            this.setState({sqAnim: null}, () => this.setState({
                sqAnim: animations.spin,
                clickable: false
            }))

            let resetScores = (sq) => { sq.count = 0 }

            let setScores = (sq) => {
                if (sq.id === id) {
                    if (sq.count === 0) {
                        this.setState((prev) => ({score: prev.score + 1}), () => {
                            if (this.state.score === 9) 
                                this.endGame(sq);
                        })

                        sq.count += 1;

                    } else {
                        this.endGame(sq);
                    }
                }
            }

            this.state.squares.forEach(id < 0 ? resetScores : setScores)
        }
    }

    endGame = (sq) => {
        this.setState( {lastColor: sq.color} )
        this.gameOver()
    }

    gameOver = () => {
        this.setState({
            gameOver: true,
            openPopup: true
        })

        if (this.state.score > this.state.highscore)
            this.setState( {highscore: this.state.score} )
    }

    closePopup = () => {
        this.countClick(-1);

        this.setState({openPopup: false});

        setTimeout(() => {
            this.setState({
                gameOver: false,
                score: 0
            })
        }, 500)
    }

    componentDidMount() {
        let colors = [
          '#fc5c65', '#fd9644', '#fed330', 
          '#26de81', '#2bcbba', '#45aaf2', 
          '#4b7bec', '#a55eea', '#d1d8e0'
        ]
        
        let sq = colors.map((c) => ({
            id: uuid(),
            color: c,
            count: 0
        }))

        this.setState({
            initSquares: sq,
            squares: [...sq]
        })
    }

    render() {
        const {squares, size, sqAnim, gameOver} = this.state
        const {openPopup, score, highscore, lastColor} = this.state

        return (
            <div className="App">
                <div className="wrapper center">
                    <header>
                        <h1> Colors </h1>
                    </header>

                    <div className="grid">
                        <Grid squares={squares} countClick={this.countClick} animation={sqAnim}/>
                    </div>

                    <footer>
                        <p> Don't click the same color twice </p>
                    </footer>
                </div>
                
                {gameOver ? 
                    <Popup 
                        score={score} 
                        best={highscore} 
                        size={size} 
                        color={lastColor} 
                        isOpen={openPopup} 
                        close={this.closePopup}
                    />
                : null}
            </div>
        );
    }
}

export default App;
