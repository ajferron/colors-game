import React from 'react'
import Square from './Square'

function Grid(props) {
    return (
        props.squares.map((sq, i) => 
            <Square key={i} 
                id={sq.id} 
                color={sq.color} 
                animation={props.animation} 
                countClick={props.countClick} 
            />
        )
    )
}

export default Grid;