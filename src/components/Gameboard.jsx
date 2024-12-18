export default function Gameboard({ onSelect, board }) {

    return (
        <ol id='game-board'>
            {board.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => {
                                return (
                                    <li key={colIndex}>
                                        <button onClick={() => onSelect(rowIndex, colIndex)} disabled={playerSymbol != null}>{playerSymbol}</button>
                                    </li>
                                )

                            })}
                        </ol>
                    </li>
                )

            })}
        </ol>
    )
}
