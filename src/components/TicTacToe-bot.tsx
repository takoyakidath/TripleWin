"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Board from "@/components/board"
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or anonymous key.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Player = "X" | "O" | null

const TicTacToeB = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<Player>(null)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [ipAddress, setIpAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

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

  const minimax = (newBoard: Player[], player: Player): number => {
    const availSpots = newBoard.reduce((acc, curr, idx) => (curr === null ? acc.concat(idx) : acc), [] as number[]);

    const [newWinner] = checkWinner(newBoard);
    if (newWinner === "X") return -10;
    if (newWinner === "O") return 10;
    if (availSpots.length === 0) return 0;

    const moves: { index: number; score: number }[] = [];

    for (let i = 0; i < availSpots.length; i++) {
      const move = { index: availSpots[i], score: 0 };
      newBoard[availSpots[i]] = player;

      if (player === "O") {
        move.score = minimax(newBoard, "X");
      } else {
        move.score = minimax(newBoard, "O");
      }

      newBoard[availSpots[i]] = null;
      moves.push(move);
    }

    let bestMove = 0;
    if (player === "O") {
      let bestScore = Number.NEGATIVE_INFINITY;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Number.POSITIVE_INFINITY;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove].index;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const [newWinner, newWinningLine] = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      setWinningLine(newWinningLine)
      saveGameResult(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const handleBotMove = () => {
    const bestMove = minimax(board, "O");
    handleClick(bestMove);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setWinningLine(null)
  }

  const isBoardFull = board.every((square) => square !== null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (currentPlayer === "O" && !winner) {
      handleBotMove();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, winner])

  const saveGameResult = async (winner: Player) => {
    const userUuid = localStorage.getItem('user_uuid');
    if (!userUuid) {
      console.error('No user UUID found in local storage.');
      return;
    }

    const result = winner === "X" ? "win" : "lose";
    const { data, error } = await supabase
      .from('game_results') // 'game_results' テーブルにデータを挿入
      .insert([{ uuid: userUuid, result, ip: ipAddress }]);
      

    if (error) {
      console.error('Error inserting game result into Supabase:', error.message, error.details);
      return;
    }

    console.log('Game result inserted into Supabase:', data);
  };



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

export default TicTacToeB