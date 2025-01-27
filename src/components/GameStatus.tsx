import { motion } from "framer-motion"

type Player = "X" | "O" | null

interface GameStatusProps {
  winner: Player
  currentPlayer: "X" | "O"
  isBoardFull: boolean
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, currentPlayer, isBoardFull }) => (
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
)

export default GameStatus

