import { useState } from 'react'
import Gameboard from './components/Gameboard'
import Player from './components/Player'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './Winning-combinations'
import Gameover from './components/Gameover'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const deriveWinner = (gameboard, players) => {
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquare = gameboard[combinations[0].row][combinations[0].column]
    const secondSquare = gameboard[combinations[1].row][combinations[1].column]
    const thirdSquare = gameboard[combinations[2].row][combinations[2].column]

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare]
    }
  }
  return winner
}

const deriveGameBoard = (gameTurns) => {
  let gameboard = [...initialGameBoard.map(array => [...array])]

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  return gameboard
}

const helperActivePlayer = (nowTurn) => {
  let newPlayer = 'X'
  if (nowTurn.length > 0 && nowTurn[0].player === 'X') {
    newPlayer = 'O'
  }
  return newPlayer
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = helperActivePlayer(gameTurns)
  const gameboard = deriveGameBoard(gameTurns)

  const handlePlayerSelect = (rowIndex, colIndex) => {

    setGameTurns((prevTurns) => {
      const currentPlayer = helperActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]
      return updatedTurns;
    })
  }

  const winner = deriveWinner(gameboard, players)
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleRestart = () => {
    setGameTurns([])
  }
  const handleNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handleNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handleNameChange} />
        </ol>
        {(winner || hasDraw) && <Gameover symbol={winner} onRestart={handleRestart} />}
        <Gameboard onSelect={handlePlayerSelect} board={gameboard} />
      </div>
      <Log turns={gameTurns} symbol={activePlayer} />
    </main>
  )
}

export default App
