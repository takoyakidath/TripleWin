"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface String {
  x: number
  y: number
  length: number
  angle: number
  speed: number
}

const StringBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const strings: String[] = []
    const stringCount = 50

    // Initialize strings
    for (let i = 0; i < stringCount; i++) {
      strings.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.02,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 2

      // biome-ignore lint/complexity/noForEach: <explanation>
      strings.forEach((string) => {
        ctx.beginPath()
        ctx.moveTo(string.x, string.y)
        const endX = string.x + Math.cos(string.angle) * string.length
        const endY = string.y + Math.sin(string.angle) * string.length
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Update string position
        string.angle += string.speed
        string.x += Math.cos(string.angle) * 0.5
        string.y += Math.sin(string.angle) * 0.5

        // Wrap around edges
        if (string.x < 0) string.x = canvas.width
        if (string.x > canvas.width) string.x = 0
        if (string.y < 0) string.y = canvas.height
        if (string.y > canvas.height) string.y = 0
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full bg-gray-900" />
}

export default StringBackground

