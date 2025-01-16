"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TicTacToe from '@/components/TicTacToe'
type GameMode = 'CPU' | 'friend' | null

export default function GameSelector() {
  const [gameMode, setGameMode] = useState<GameMode>(null)

  if (gameMode) {
    return <TicTacToe mode={gameMode} onReset={() => setGameMode(null)} />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>3目並べ</CardTitle>
          <CardDescription>ゲームモードを選択してください</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => setGameMode('CPU')}>CPUと対戦</Button>
          <Button onClick={() => setGameMode('friend')}>友達と対戦</Button>
        </CardContent>
      </Card>
    </div>
  )
}

