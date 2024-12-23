import React from 'react'

export default function Gameover({ symbol, onRestart }) {
    return (
        <div id='game-over'>
            <h2>Game Over</h2>
            {symbol && <p>{symbol} won</p>}
            {!symbol && <p>Its a draw</p>}
            <button onClick={onRestart}>Rematch</button>
        </div>
    )
}
