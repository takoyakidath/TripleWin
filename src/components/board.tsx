import { Button } from "@/components/ui/button"

interface BoardProps {
  squares: (string | null)[]
  onClick: (index: number) => void
}

export default function Board({ squares, onClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {squares.map((square, index) => (
        <Button
          key={index}
          onClick={() => onClick(index)}
          variant="outline"
          className="h-20 text-4xl font-bold"
          disabled={square !== null}
        >
          {square}
        </Button>
      ))}
    </div>
  )
}

