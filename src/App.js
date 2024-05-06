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
        }, [squares]);

    function handleMove(index) {

        if (!squares[index] && !winner) {
            const newSquare = [...squares]
            newSquare[index] = isXNext ? 'X' : 'O';
            setSquares(newSquare);
            setIsXNext(!isXNext);
            winnerCheck();
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
            const line = [squares[a], squares[b], squares[c]];
            const xCount = line.filter(square => square === 'X').length;
            const oCount = line.filter(square => square === 'O').length;

            if (xCount === 3) {
                setWinner({ player: 'X won', indices: [a, b, c] });
                setCountX(countX + 1)
                return;
            } else if (oCount === 3) {
                setWinner({ player: 'O won', indices: [a, b, c] });
                setCountO(countO + 1)
                return;
            }
        }
        if (squares.every(square => square !== null))
            setWinner({ player: 'Draw', indices: [] });
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

    const playerText = winner ? `${winner.player}!` : isXNext ? 'X turn' : 'O turn';

    return (
        <div className="App">
            <div className="textField">Tiс Tac Toe</div>
            <Board squares={squares} handleMove={handleMove} winner={winner}/>

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
                        <td>X</td>
                        <td>{countX}</td>
                    </tr>
                    <tr>
                        <td>O</td>
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
