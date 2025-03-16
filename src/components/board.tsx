import { motion } from "framer-motion"

type Player = "X" | "O" | null

interface BoardProps {
  board: Player[]
  winningLine: number[] | null
  onSquareClick: (index: number) => void
}

const Board: React.FC<BoardProps> = ({ board, winningLine, onSquareClick }) => {
  const renderSquare = (index: number) => (
    <motion.div
      className="w-full h-full flex items-center justify-center cursor-pointer"
      whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
      onClick={() => onSquareClick(index)}
    >
      {board[index] && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`w-2/3 h-2/3 rounded-full ${board[index] === "X" ? "bg-blue-500" : "bg-red-500"}`}
        />
      )}
    </motion.div>
  )

  return (
    <div className="relative grid grid-cols-3 gap-0 mb-4 w-[300px] h-[300px]">
{board.map((player, index) => (

<div key={player ? `${player}-${index}` : index} className="border-white">
          {renderSquare(index)}
        </div>
      ))}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-0.5 bg-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.div
        className="absolute top-2/3 left-0 w-full h-0.5 bg-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.div
        className="absolute top-0 left-1/3 w-0.5 h-full bg-white"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      <motion.div
        className="absolute top-0 left-2/3 w-0.5 h-full bg-white"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      {winningLine && (
<svg className="absolute pointer-events-none" style={{ width: "100%", height: "100%" }}>
  <title>Winning Line</title>
          <motion.line
            x1={`${(winningLine[0] % 3) * 33.33 + 16.67}%`}
            y1={`${Math.floor(winningLine[0] / 3) * 33.33 + 16.67}%`}
            x2={`${(winningLine[2] % 3) * 33.33 + 16.67}%`}
            y2={`${Math.floor(winningLine[2] / 3) * 33.33 + 16.67}%`}
            stroke={board[winningLine[0]] === "X" ? "#3B82F6" : "#EF4444"}
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
      )}
    </div>
  )
}

export default Board