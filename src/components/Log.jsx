import React from 'react'

export default function Log({ turns }) {

    return (
        <ol id='log'>
            {turns.map((turn) => {
                return (
                    <li key={Math.random(1000)}>Player {turn.player} clicked on {turn.square.row}, {turn.square.col}</li>

                )
            })}

        </ol>
    )
}
