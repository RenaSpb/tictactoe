import React from 'react';
import Square from "./Square";

const boardStyle= {
    borderRadius: '5px',
    borderColor:  '#3d3030',
    width: '300px',
    height: '300px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',

}
const Board = ({ squares, handleMove, winner  }) => {
    return (
        <div style={boardStyle}>

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