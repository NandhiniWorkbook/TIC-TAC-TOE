import { useState, useRef } from 'react';
import Player from './Player';
import Modal from './Modal';
import { findIsGameOver, findWinner } from '../utils';
import '../index.css';

const initialState = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function Board() {
    const [currentBoardState, setCurrentBoardState] = useState([...initialState.map(row => [...row])]);
    const [player1, setPlayer1Prop] = useState({
        name: 'Player 1',
        symbol: 'X'
    });
    const [player2, setPlayer2Prop] = useState({
        name: 'Player 2',
        symbol: 'O'
    });
    const [currentPlayer, setCurrentPlayer] = useState({...player1});
    const [winner, setWinner] = useState(undefined);
    const [isGameOver, setIsGameOver] = useState(false);
    const modalRef = useRef();

    function handleClick(rowIndex, columnIndex) {
        if(currentBoardState[rowIndex][columnIndex] === null) {
            currentBoardState[rowIndex][columnIndex] = (currentPlayer.symbol === 'X' ? {...player1} : {...player2});

            setCurrentBoardState([
                ...currentBoardState.map(row => [...row]
                )]);
            setCurrentPlayer(current => current.symbol === 'X' ? {...player2} : {...player1});
            
            const isWinner = findWinner(currentBoardState);
            setWinner(isWinner);
            if(isWinner) {
                modalRef.current.open('Success', `${isWinner.name} won the game`);
                return;
            }

            const gameOver = findIsGameOver(currentBoardState);
            setIsGameOver(gameOver);
            if(!isWinner && gameOver) {
                modalRef.current.open('Info', "Game over. Start a new game.")
            }
        }
    }

    function closeModal() {
        modalRef.current.close();

        if(winner || isGameOver) {
            reset();
        }
    }

    function reset() {
        setWinner(undefined);
        setCurrentPlayer({...player1});
        setCurrentBoardState([...initialState.map(row => [...row])])
    }

    return (
        <main>
            <Modal ref={modalRef} onClose={closeModal}/>
            <h1>TIC-TAC-TOE</h1>
            <Player currentPlayer={currentPlayer} name={player1.name}
                updatePlayerName={(newName) => {
                    setPlayer1Prop({...player1,name: newName})
                }} symbol={player1.symbol}/>

            <Player currentPlayer={currentPlayer} name={player2.name} updatePlayerName={(newName) => {
                    setPlayer2Prop({...player2,name: newName})
                }} symbol={player2.symbol}/>
            <div className='box-container'>
            {
                currentBoardState.map((row, rowIndex) => {
                    let rowBoxes = row.map((column, columnIndex) => {
                        return <button className='input-box' key={`${rowIndex}+${columnIndex}`} onClick={() => handleClick(rowIndex, columnIndex)}>
                            {column !== null ? column.symbol : ''}
                        </button>
                    });

                    return <div key={rowIndex}>{rowBoxes}</div>
                })
            }
            </div>
            <button className='reset-btn' onClick={reset}>Reset</button>
        </main>
    )
}