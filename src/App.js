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
            squares: [],
            gameOver: false,
            openPopup: false,
            lastColor: null,
            sqAnim: null,
        }
    }

    clickable = true

    countClick = (id) => {
        if (this.clickable) {
            let squares = [...this.state.squares];

            this.clickable = false;
            this.setState( {sqAnim: animations.spin} )

            setTimeout(() => {
                squares.sort(() => Math.random() - 0.5)
                this.setState( {squares: squares} )
            }, 250)

            setTimeout(() => {
                this.setState( {sqAnim: null} )
                this.clickable = true;
            }, 500)

            console.log(id)

            let resetScores = (sq) => { sq.count = 0 }

            let setScores = (sq) => {
                if (sq.id === id) {
                    if (sq.count === 0) {
                        sq.count += 1;
                        this.setState( {score: this.state.score + 1} );
                    } else {
                        this.setState( {lastColor: sq.color} )
                        this.gameOver();
                    }
                }
            }

            squares.forEach(id < 0 ? resetScores : setScores)
        }
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
        this.setState({openPopup: false});
        this.countClick(-1);

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
        
        this.setState({
            squares: colors.map((c) => {
                return {
                    id: uuid(),
                    color: c,
                    count: 0
                }
            })
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
