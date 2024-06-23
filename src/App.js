import React, {useEffect, useState} from 'react';
import Board from "./Board";
import './App.css';

function App() {
    const [squares, setSquares] = useState(new Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true)
    const [winner, setWinner] = useState(null)
    const [countX, setCountX] = useState(0)
    const [countO, setCountO] = useState(0)
    const [countDraw, setCountDraw] = useState(0)
    const [gameMode, setGameMode] = useState(null)
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    useEffect(() => {
        winnerCheck();
        //eslint-disable-next-line
    }, [squares]);

    useEffect(() => {
        if (gameMode === 'computer' && !isXNext && !winner) {
            const timer = setTimeout(() => {
                computerMove();
            }, 300);
            return () => clearTimeout(timer);
        }
        //eslint-disable-next-line
    }, [isXNext, gameMode, winner]);

    function handleMove(index) {
        if (!squares[index] && !winner && (gameMode !== 'computer' || isPlayerTurn)) {
            const newSquare = [...squares]
            newSquare[index] = isXNext ? 'X' : 'O';
            setSquares(newSquare);
            setIsXNext(!isXNext);
            setIsPlayerTurn(false)
        }
    }

    function winnerCheck() {
        const winLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winLines.length; i++) {
            const [a, b, c] = winLines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setWinner({player: squares[a], indices: [a, b, c]});
                if (squares[a] === 'X') {
                    setCountX((prevCountX) => prevCountX + 1);
                } else {
                    setCountO((prevCountO) => prevCountO + 1);
                }
                return;
            }
        }
        if (squares.every(square => square !== null)) {
            setWinner({player: 'Draw', indices: []});
            setCountDraw((prevCountDraw) => prevCountDraw + 1);
        }

    }

    function reset() {
        setSquares(new Array(9).fill(null));
        setWinner(null);
        setIsXNext(true);
        setIsPlayerTurn(true);
    }

    function resetAll() {
        setSquares(new Array(9).fill(null));
        setWinner(null);
        setIsXNext(true);
        setCountX(0);
        setCountO(0);
        setCountDraw(0);
        setGameMode(null);
        setIsPlayerTurn(true);
    }

    function computerMove() {
        let availableMoves = squares.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (availableMoves.length > 0) {
            let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            const newSquare = [...squares];
            newSquare[randomMove] = 'O';
            setSquares(newSquare);
            setIsXNext(true);
            setIsPlayerTurn(true)
        }
    }

    const win = winner && winner.player === 'X'
        ? (gameMode === 'computer' ? 'You' : 'X')
        : (winner && winner.player === 'O'
            ? (gameMode === 'computer' ? 'Computer' : 'O')
            : '');

    const playerText = winner
        ? (winner.player === 'Draw' ? 'Draw!' : `${win} won!`)
        : (gameMode === 'computer'
            ? (isXNext ? 'Your turn' : '\u00A0\u00A0')
            : (isXNext ? 'X turn' : 'O turn'));

    return (
        <div className="App">
            <div className="textField0">Tic Tac Toe</div>
            {gameMode === null ? (
                <div className="game-mode-selection">
                    <button
                        className="button greenGradientBtn"
                        type="button"
                        onClick={() => setGameMode('twoPlayers')}>Two Players</button>
                    <button
                        className="button greenGradientBtn"
                        type="button"
                        onClick={() => setGameMode('computer')}>Play with Computer</button>
                </div>
            ) : (
                <>
                    <Board
                        squares={squares}
                        handleMove={handleMove}
                        winner={winner}
                    />
                    <div className="container">
                        <div className="upperBoard">
                            <div className=" textContainer textField">{playerText}</div>
                            <button className="button greenGradientBtn"
                                    onClick={reset}
                            >
                                One more
                            </button>
                        </div>
                        <div className="lowerBoard">
                            <table>
                                <tbody>
                                <tr>
                                    <td className="textField1 bold-text">
                                        {gameMode === 'computer' ? 'You' : 'X'}
                                    </td>
                                    <td className="textField1">{countX}</td>
                                </tr>
                                <tr>
                                    <td className="textField1 bold-text">
                                        {gameMode === 'computer' ? 'Comp' : 'X'}
                                    </td>
                                    <td className="textField1">{countO}</td>
                                </tr>
                                <tr>
                                    <td className="textField1 bold-text">Draw</td>
                                    <td className="textField1">{countDraw}</td>
                                </tr>
                                </tbody>
                            </table>
                            <button className="button greenGradientBtn"
                                    type="button"
                                    onClick={resetAll}
                            >
                                Reset game
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}


export default App;