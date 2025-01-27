import { motion } from "framer-motion"

type Player = "X" | "O" | null

interface WinningLineProps {
  winningLine: number[]
  board: Player[]
}

const WinningLine: React.FC<WinningLineProps> = ({ winningLine, board }) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg className="absolute pointer-events-none" style={{ width: "432px", height: "432px" }}>
    <motion.line
      x1={(winningLine[0] % 3) * 144 + 72}
      y1={Math.floor(winningLine[0] / 3) * 144 + 72}
      x2={(winningLine[2] % 3) * 144 + 72}
      y2={Math.floor(winningLine[2] / 3) * 144 + 72}
      stroke={board[winningLine[0]] === "X" ? "#3B82F6" : "#EF4444"}
      strokeWidth="4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
  </svg>
)

export default WinningLine

