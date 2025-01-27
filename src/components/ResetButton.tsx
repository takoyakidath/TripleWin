import { Button } from "@/components/ui/button"

interface ResetButtonProps {
  onClick: () => void
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => (
  <Button onClick={onClick} className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200">
    New Game
  </Button>
)

export default ResetButton

