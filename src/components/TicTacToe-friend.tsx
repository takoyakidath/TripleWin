"use client"

import { useState} from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Board from "@/components/board"

type Player = "X" | "O" | null

const TicTacToeF = () => {
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

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setWinningLine(null)
  }

  const isBoardFull = board.every((square) => square !== null)

  return (
    <div className="flex flex-col items-center">
      <Board board={board} winningLine={winningLine} onSquareClick={handleClick} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        {winner ? (
          <p className="text-xl font-bold">{winner === "X" ? "Blue" : "Red"} wins!</p>
        ) : isBoardFull ? (
          <p className="text-xl font-bold">It&apos;s a draw!</p>
        ) : (
          <p className="text-xl">{currentPlayer === "X" ? "Blue" : "Red"}&apos;s turn</p>
        )}
      </motion.div>
      <Button
        onClick={resetGame}
        className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200"
      >
        New Game
      </Button>
      <Button
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        onClick={() => window.location.href = "/"}
        className="bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-200 mt-4"
      >
        Home
      </Button>
    </div>
  )
}

export default TicTacToeF

