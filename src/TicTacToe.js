import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const empytBoard = Array(9).fill("");

  const [ board, setBoard] = useState(empytBoard);
  const [ currentPlayer, setCurrentPlayer] = useState("O");
  const [ winner, setWinner] = useState(null);
  const [ pontuacaoO, setPontuacaoO] = useState(0);
  const [ pontuacaoX, setPontuacaoX] = useState(0);
  const [ pontuacaoE, setPontuacaoE] = useState(0);


  const handleCellClick = (index) => {
    if (winner) return null;

    if (board[index] !== "") return null;

    setBoard(
      board.map(
        (item, itemIndex) => itemIndex === index ? currentPlayer : item
      )
    );

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) {
        setWinner("O");
        setPontuacaoO(pontuacaoO + 1);
      }
      if (cells.every(cell => cell === "X")) {
        setWinner("X");
        setPontuacaoX(pontuacaoX + 1);
      }
    });

    checkDraw();
  }

  const checkDraw = () => {
    if (board.every(item => item !== "")) {
      setWinner("E");
      setPontuacaoE(pontuacaoE + 1);
    }
  }

  useEffect(checkWinner, [board]);

  const resetGame = () => {
    setCurrentPlayer(currentPlayer);
    setBoard(empytBoard);
    setWinner(null);
  }
  
  return (
    <div className="container ">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="title">Jogo da Véia</h1>
        </div>
      </div>
      <div className="row small text-center ">
        <div className="col-sm-12">
          <button className="btn-sm" onClick={resetGame}>Recomeçar Jogo!</button>
          <h6 className="pt-2">Pontuação: O = {pontuacaoO}  X = {pontuacaoX}  Empate = {pontuacaoE}</h6>
        </div>
      </div>
      {winner &&
        <div className="row">
          <div className="col-sm-12 text-center">
            {winner === "E" ? 
              <h5 className="">
                <span className={winner}>Empatou!</span>
              </h5>
            :
              <h5 className="">
                <span className={winner}>{winner}</span> venceu!
              </h5>
            }
          </div>
        </div>
      }

      <div className="row pt-2">
        <div className="col-sm-12">
          <div className={`board ${winner ? "game-over" : ""}`}>
            {board.map((item, index) => (
              <div 
                key={index} 
                className={`cell ${item}`}
                onClick={() => handleCellClick(index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
{/* 
  <h5 className="winner-message">
    <span className={winner}>Empatou!</span>
  </h5>
  <h5 className="winner-message">
  <span className={winner}>{winner}</span> venceu!
</h5> */}

export default TicTacToe;
