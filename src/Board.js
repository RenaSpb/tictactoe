import React from 'react';
import Square from "./Square";
import './App.css';

    const Board = ({ squares, handleMove, winner }) => {
    return (
        <div className="boardStyle">
            {squares.map((square, index) =>
                <Square
                    key={index}
                    index={index}
                    square={square}
                    handleMove={handleMove}
                    winner={winner}
                />
            )}
        </div>
    );
};

export default Board;
