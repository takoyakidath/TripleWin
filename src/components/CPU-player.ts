type Player = 'X' | 'O'

export function makeCPUMove(board: (Player | null)[]): number | null {
  const availableMoves = board.reduce<number[]>((moves, cell, index) => {
    if (cell === null) moves.push(index)
    return moves
  }, [])

  if (availableMoves.length === 0) return null

  // Simple AI: randomly choose an available move
  const randomIndex = Math.floor(Math.random() * availableMoves.length)
  return availableMoves[randomIndex]
}

