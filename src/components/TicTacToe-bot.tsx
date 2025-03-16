"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Board from "@/components/board"

type Player = "X" | "O" | null

const checkWinner = (squares: Player[]): [Player, number[] | null] => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ]
    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], [a, b, c]]
        }
    }
    return [null, null]
}

const minimax = (newBoard: Player[], player: Player): number => {
    const availSpots = newBoard.reduce((acc, curr, idx) => (curr === null ? acc.concat(idx) : acc), [] as number[])
    const [newWinner] = checkWinner(newBoard)
    if (newWinner === "X") return -10
    if (newWinner === "O") return 10
    if (availSpots.length === 0) return 0

    const moves = availSpots.map((spot) => {
        newBoard[spot] = player
        const score = minimax(newBoard, player === "O" ? "X" : "O")
        newBoard[spot] = null
        return { index: spot, score }
    })

    return player === "O"
        ? moves.reduce((best, move) => (move.score > best.score ? move : best), { index: -1, score: Number.NEGATIVE_INFINITY }).index
        : moves.reduce((best, move) => (move.score < best.score ? move : best), { index: -1, score: Number.POSITIVE_INFINITY }).index
}

const TicTacToeB = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
    const [winner, setWinner] = useState<Player>(null)
    const [winningLine, setWinningLine] = useState<number[] | null>(null)

    useEffect(() => {
        if (currentPlayer === "O" && !winner) {
            const bestMove = minimax(board, "O")
            if (bestMove !== -1) {
                handleClick(bestMove, true)
            }
        }
    }, [currentPlayer, board, winner])

    const handleClick = useCallback((index: number, isAiMove = false) => {
        if (board[index] || winner || (currentPlayer === "O" && !isAiMove)) return

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
    }, [board, currentPlayer, winner])

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setCurrentPlayer("X")
        setWinner(null)
        setWinningLine(null)
    }

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
                ) : board.every((square) => square !== null) ? (
                    <p className="text-xl font-bold">It&apos;s a draw!</p>
                ) : (
                    <p className="text-xl">{currentPlayer === "X" ? "Blue" : "Red"}&apos;s turn</p>
                )}
            </motion.div>
            <Button onClick={resetGame} className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200">
                New Game
            </Button>
        </div>
    )
}

export default TicTacToeB