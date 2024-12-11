import { useState } from 'react'

export default function Player({ initialName, symbol }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playername, setPlayername] = useState(initialName)

    const handleEdit = () => {
        setIsEditing(editing => !editing)
    }
    const handlePlayername = (e) => {
        setPlayername(e.target.value)
    }

    return (
        <li>
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