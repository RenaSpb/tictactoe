import React from 'react';

function getRotationAngle(winner) {
    if (!winner) return '0deg';
    const indices = winner.indices;

    if (
        (indices.includes(0) && indices.includes(1) && indices.includes(2)) ||
        (indices.includes(3) && indices.includes(4) && indices.includes(5)) ||
        (indices.includes(6) && indices.includes(7) && indices.includes(8))
    ) {
        return '0deg';
    } else if (
        (indices.includes(0) && indices.includes(3) && indices.includes(6)) ||
        (indices.includes(1) && indices.includes(4) && indices.includes(7)) ||
        (indices.includes(2) && indices.includes(5) && indices.includes(8))
    ) {
        return '90deg';
    } else if (indices.includes(0) && indices.includes(4) && indices.includes(8)) {
        return '45deg';
    } else if (indices.includes(2) && indices.includes(4) && indices.includes(6)) {
        return '-45deg';
    }
}

const squareStyle = {
    border: '2px solid',
    borderRadius: '10px',
    borderColor: '#725e5e',
    color: '#574646',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '48px',
    height: '100px',
    width: '100px',
    boxSizing: 'border-box',
    backgroundColor: '#faf9f3'

}

const crossedSquareStyle = {
    ...squareStyle,
    backgroundColor: '#efd6d6',
    position: 'relative',
};

const Square = ({square, handleMove, index, winner}) => {
    const isWinningSquare = winner && winner.indices.includes(index);
    const rotationAngle = getRotationAngle(winner);

    const strikeThroughStyle = {
        position: 'absolute',
        content: ' ',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '2px',
        backgroundColor: 'black',
        transform: `translate(-50%, -50%) rotate(${rotationAngle})`,
    };

    return (
        <button
            style={isWinningSquare ? crossedSquareStyle : squareStyle}
            onClick={() => handleMove(index)}
            disabled={winner}
        >
            {square}
            {isWinningSquare && (
                <div style={strikeThroughStyle}></div>
            )}
        </button>
    );
};

export default Square;
