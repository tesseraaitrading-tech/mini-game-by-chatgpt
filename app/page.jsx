'use client';

import { useMemo, useState } from 'react';
import styles from './page.module.css';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState('X');
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = useMemo(() => getWinner(board), [board]);
  const isDraw = !result && board.every(Boolean);
  const gameOver = Boolean(result || isDraw);
  const status = result
    ? `${result.player} wins!`
    : isDraw
      ? "It's a draw!"
      : `${nextPlayer}'s turn`;

  function handleMove(index) {
    if (board[index] || gameOver) return;

    const updated = [...board];
    updated[index] = nextPlayer;
    setBoard(updated);

    const winner = getWinner(updated);
    if (winner) {
      setScores((current) => ({ ...current, [winner.player]: current[winner.player] + 1 }));
      return;
    }

    if (updated.every(Boolean)) {
      setScores((current) => ({ ...current, draws: current.draws + 1 }));
      return;
    }

    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setNextPlayer('X');
  }

  function resetScores() {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.header}>
          <p className={styles.kicker}>MINI GAME</p>
          <h1>Tic-Tac-Toe</h1>
          <p className={styles.subtitle}>A simple game built with Next.js and React.</p>
        </div>

        <div className={styles.scoreboard} aria-label="Scoreboard">
          <div className={styles.scoreItem}>
            <span>X</span>
            <strong>{scores.X}</strong>
          </div>
          <div className={styles.scoreItem}>
            <span>Draws</span>
            <strong>{scores.draws}</strong>
          </div>
          <div className={styles.scoreItem}>
            <span>O</span>
            <strong>{scores.O}</strong>
          </div>
        </div>

        <p className={styles.status} role="status" aria-live="polite">{status}</p>

        <div className={styles.board} aria-label="Tic-Tac-Toe board">
          {board.map((cell, index) => {
            const winningCell = result?.line.includes(index);
            return (
              <button
                className={`${styles.cell} ${winningCell ? styles.winnerCell : ''}`}
                key={index}
                onClick={() => handleMove(index)}
                aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ', empty'}`}
                disabled={Boolean(cell) || gameOver}
              >
                {cell}
              </button>
            );
          })}
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={resetGame}>New Game</button>
          <button className={styles.secondaryButton} onClick={resetScores}>Reset Scores</button>
        </div>
      </section>
    </main>
  );
}
