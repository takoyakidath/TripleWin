import { motion } from "framer-motion"

const BoardGrid: React.FC = () => (
  <>
    <motion.div
      className="absolute top-1/3 left-0 w-full h-0.5 bg-black"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
    <motion.div
      className="absolute top-2/3 left-0 w-full h-0.5 bg-black"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    />
    <motion.div
      className="absolute top-0 left-1/3 w-0.5 h-full bg-black"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    />
    <motion.div
      className="absolute top-0 left-2/3 w-0.5 h-full bg-black"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    />
  </>
)

export default BoardGrid

