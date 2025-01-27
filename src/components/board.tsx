import type React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Square from "@/components/Squere"
import BoardGrid from "@/components/BoardGrid"
import WinningLine from "@/components/WinningLine"

type Player = "X" | "O" | null

interface BoardProps {
  board: Player[]
  winningLine: number[] | null
  onSquareClick: (index: number) => void
}

interface SquareProps {
  value: Player;
  onClick: () => void;
}

const LocalSquare: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
<button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board: React.FC<BoardProps> = ({ board, winningLine, onSquareClick }) => {
  return (
    <div className="relative grid grid-cols-3 gap-0 mb-4">
      {board.map((value, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<LocalSquare key={index} value={value} onClick={() => onSquareClick(index)} />
      ))}
      <BoardGrid />
      {winningLine && <WinningLine winningLine={winningLine} board={board} />}
    </div>
  )
}

export default Board

