import { useState } from 'react';

function Square({ value, onSquareClick, border }) {
  return (
    <button  style={{borderLeftStyle: border, borderWidth:'10px'}} className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!squares.includes(null)) {
    status = "Draw!"; 
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      
      <div className="status">{status}</div>
      <div className="board-row">
        <Square border={'none'} value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square border={'solid'} value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square border={'solid'} value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square border={'none'} value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square border={'solid'} value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square border={'solid'} value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row" id="last">
        <Square border={'none'} value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square border={'solid'} value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square border={'solid'} value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button class="button" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button class="button" onClick={showHistory}>History</button>
        <ol id="history">{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

let counter = true;
function showHistory(){
  
  if(counter){
    document.getElementById('history').style.display="block";
    counter = false;
  }
  else{
    document.getElementById('history').style.display="none";
    counter = true;
  }
}