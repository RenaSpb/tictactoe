import React, {useEffect, useState} from 'react';
import Board from "./Board";
import './App.css';

function App() {
    const [squares, setSquares] = useState(new Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true)
    const [winner, setWinner] = useState(null)
    const [countX, setCountX] = useState(0)
    const [countO, setCountO] = useState(0)

    useEffect(() => {
        winnerCheck();
        //eslint-disable-next-line
    }, [squares]);

    function handleMove(index) {
        if (!squares[index] && !winner) {
            const newSquare = [...squares]
            newSquare[index] = isXNext ? 'X' : 'O';
            setSquares(newSquare);
            setIsXNext(!isXNext);
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
        if (squares.every(square => square !== null))
            setWinner({player: 'Draw', indices: []});
    }

    function reset() {
        setSquares(new Array(9).fill(null));
        setWinner(null);
        setIsXNext(true);
    }

    function resetAll() {
        setSquares(new Array(9).fill(null));
        setWinner(null);
        setIsXNext(true);
        setCountX(0);
        setCountO(0)
    }

    const playerText = winner ? `${winner.player} won!` : isXNext ? 'X turn' : 'O turn';

    return (
        <div className="App">
            <div className="textField">Tiс Tac Toe</div>
            <Board
                squares={squares}
                handleMove={handleMove}
                winner={winner}
            />
            <div className="upperBoard">
                <div className="textField">{playerText}</div>
                <button className="button greenGradientBtn"
                        onClick={reset}
                >
                    One more
                </button>
            </div>

            <div className="lowerBoard">
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Wins</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="bold-text">X</td>
                        <td>{countX}</td>
                    </tr>
                    <tr>
                        <td className="bold-text">O</td>
                        <td>{countO}</td>
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
    );
}

export default App;
