"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Board from '@/components/board'
import { makeCPUMove } from '@/components/CPU-player'
type Player = 'X' | 'O'
type GameMode = 'CPU' | 'friend'

interface TicTacToeProps {
  mode: GameMode
  onReset: () => void
}

export default function TicTacToe({ mode, onReset }: TicTacToeProps) {
  const [board, setBoard] = useState<(Player | null)[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null)

  const checkWinner = (squares: (Player | null)[]): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }

    if (squares.every(square => square !== null)) {
      return 'Draw'
    }

    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X'
      setCurrentPlayer(nextPlayer)

      if (mode === 'CPU' && nextPlayer === 'O') {
        const CPUMove = makeCPUMove(newBoard)
        if (CPUMove !== null) {
          setTimeout(() => handleClick(CPUMove), 500)
        }
      }
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>3目並べ</CardTitle>
          <CardDescription>
            {mode === 'CPU' ? 'CPUと対戦中' : '友達と対戦中'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Board squares={board} onClick={handleClick} />
          {winner && (
            <div className="mt-4 text-center font-bold">
              {winner === 'Draw' ? '引き分けです！' : `${winner}の勝ちです！`}
            </div>
          )}
          {!winner && (
            <div className="mt-4 text-center">
              次は {currentPlayer} の番です
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={resetGame}>リセット</Button>
          <Button onClick={onReset} variant="outline">モード選択に戻る</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

