import { useState } from 'react'
import Gameboard from './components/Gameboard'
import Player from './components/Player'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './Winning-combinations'
import Gameover from './components/Gameover'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const helperActivePlayer = (nowTurn) => {
  let newPlayer = 'X'
  if (nowTurn.length > 0 && nowTurn[0].player === 'X') {
    newPlayer = 'O'
  }
  return newPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = helperActivePlayer(gameTurns)
  let gameboard = [...initialGameBoard.map(array => [...array])]

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }


  const handlePlayerSelect = (rowIndex, colIndex) => {

    setGameTurns((prevTurns) => {
      const currentPlayer = helperActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]
      return updatedTurns;
    })
  }

  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquare = gameboard[combinations[0].row][combinations[0].column]
    const secondSquare = gameboard[combinations[1].row][combinations[1].column]
    const thirdSquare = gameboard[combinations[2].row][combinations[2].column]

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = firstSquare
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleRestart = () => {
    setGameTurns([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasDraw) && <Gameover symbol={winner} onRestart={handleRestart} />}
        <Gameboard onSelect={handlePlayerSelect} board={gameboard} />
      </div>
      <Log turns={gameTurns} symbol={activePlayer} />
    </main>
  )
}

export default App
