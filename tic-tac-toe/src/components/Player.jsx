import { useState, useRef } from 'react';
import '../index.css'

export default function Player({name, symbol, updatePlayerName, currentPlayer}) {
    const [showEditableInput, setShowEditableInput] = useState(false);
    const inputRef = useRef();

    function toggleEditableState() {
        if(showEditableInput) {
            if (inputRef.current.value !== '') {
                updatePlayerName(inputRef.current.value);
            }
        }
        setShowEditableInput((prevState => !prevState));
    }

    return (
        <div className={currentPlayer.symbol === symbol ? `player active-player` : "player"}>
            {!showEditableInput && <span className='player-name'>{name}</span>}
            {showEditableInput && <input className='playername-inputbox' type='text' ref={inputRef}/>}
            <span>
                <button className="edit-btn" onClick={toggleEditableState}><span>{showEditableInput ? 'Save' : 'Edit'}</span></button>
            </span>
            <span>{symbol}</span>
        </div>
    )
}