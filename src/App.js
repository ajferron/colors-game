import React from 'react';
import {v4 as uuid} from 'uuid'
import Grid from './components/Grid'
import './css/app.css';

class App extends React.Component {
    spin = { 
        scale: 0,
        rotate: 20,
        yoyo: true,
        repeat: 1,
        duration: 250
    }

    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            highscore: 0,
            squares: [],
            animation: null,
            clickable: true
        }
    }

    gameOver = () => {
        if (this.state.score > this.state.highscore)
            this.setState({ highscore: this.state.score })

        this.state.squares.forEach((sq) => sq.count = 0)

        alert(`Game Over! \nscore: ${this.state.score}`);
        this.setState({ score: 0 });
    }

    countClick = (id) => {
        if (this.state.clickable) {
            var squares = [...this.state.squares]

            this.setState({
                animation: this.spin,
                clickable: false
            })

            squares.forEach((sq) => {
                if (sq.id === id) {
                    if (sq.count === 0) {
                        sq.count += 1;
                        this.setState({ score: this.state.score + 1 });
                    } else {
                        this.gameOver();
                    }
                }
            })
            
            setTimeout(() => {
                squares.sort(() => Math.random() - 0.5)
                this.setState( {squares: squares} )
            }, 250)

            setTimeout(() => {
                this.setState({
                    animation: null,
                    clickable: true
                })
            }, 500)
        }
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
        return (
            <div className="App">
                <div className="grid center">
                    <Grid 
                        squares={this.state.squares} 
                        animation={this.state.animation} 
                        countClick={this.countClick}
                    />
                </div>
            </div>
        );
    }
}

export default App;
