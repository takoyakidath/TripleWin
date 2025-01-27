"use client"

import { useState, useEffect, useCallback } from "react"
import Board from "@/components/board"
import GameStatus from "@/components/GameStatus"
import ResetButton from "@/components/ResetButton"

type Player = "X" | "O" | null

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<Player>(null)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)

  const checkWinner = (squares: Player[]): [Player, number[] | null] => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]]
      }
    }

    return [null, null]
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const [newWinner, newWinningLine] = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      setWinningLine(newWinningLine)
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setWinningLine(null)
  }, [])

  const isBoardFull = board.every((square) => square !== null)

  useEffect(() => {
    if (winningLine) {
      const timer = setTimeout(() => {
        resetGame()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [winningLine, resetGame])

  return (
    <div className="flex flex-col items-center">
      <Board board={board} winningLine={winningLine} onSquareClick={handleClick} />
      <GameStatus winner={winner} currentPlayer={currentPlayer} isBoardFull={isBoardFull} />
      <ResetButton onClick={resetGame} />
    </div>
  )
}

export default TicTacToe

