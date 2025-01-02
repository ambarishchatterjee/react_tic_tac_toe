import { useState } from 'react'

export default function Player({ initialName, symbol, isActive, onNameChange }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playername, setPlayername] = useState(initialName)

    const handleEdit = () => {
        setIsEditing(editing => !editing)
        if (isEditing) {
            onNameChange(symbol, playername)
        }

    }
    const handlePlayername = (e) => {
        setPlayername(e.target.value)
    }

    { isEditing ?? <input type='text' required value={playername} onChange={handlePlayername} /> }

    const player = <span className="payer-name">{playername}</span>

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {isEditing ? (
                    <input type='text' required value={playername} onChange={handlePlayername} />
                ) : (
                    <span className="payer-name">{playername}</span>
                )}

                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}