"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Point {
  x: number
  y: number
  baseX: number
  baseY: number
  phase: number
}

export function GenerativeGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)
  const { resolvedTheme } = useTheme()

  const isDark = resolvedTheme === "dark"
  const lineColor = isDark ? "232, 228, 223" : "26, 26, 26"

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return

    const context = c.getContext("2d")
    if (!context) return

    let width = 0
    let height = 0
    let time = 0
    const points: Point[] = []
    const spacing = 56
    const driftSpeed = 0.0003
    const dotRadius = 1.2
    const lineOpacity = 0.04
    const dotOpacity = 0.12

    function resize() {
      const canvas = canvasRef.current
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context!.scale(dpr, dpr)

      points.length = 0
      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1

      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
          const jitterX = (Math.random() - 0.5) * 8
          const jitterY = (Math.random() - 0.5) * 8
          points.push({
            x: col * spacing + jitterX,
            y: r * spacing + jitterY,
            baseX: col * spacing + jitterX,
            baseY: r * spacing + jitterY,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    function draw() {
      context!.clearRect(0, 0, width, height)
      time += driftSpeed

      const mouse = mouseRef.current
      const mouseInfluence = 180

      // Update point positions with gentle drift
      for (const p of points) {
        const driftX = Math.sin(time + p.phase) * 3
        const driftY = Math.cos(time + p.phase * 0.7) * 3
        p.x = p.baseX + driftX
        p.y = p.baseY + driftY
      }

      // Draw connecting lines between nearby points
      context!.lineWidth = 0.5
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i]
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < spacing * 1.6) {
            const midX = (p1.x + p2.x) / 2
            const midY = (p1.y + p2.y) / 2
            const mouseDist = Math.sqrt(
              (midX - mouse.x) ** 2 + (midY - mouse.y) ** 2
            )
            const proximityBoost = Math.max(
              0,
              1 - mouseDist / mouseInfluence
            )

            const alpha = lineOpacity * (1 - dist / (spacing * 1.6)) * (1 + proximityBoost * 0.5)
            context!.strokeStyle = `rgba(${lineColor}, ${alpha})`
            context!.beginPath()
            context!.moveTo(p1.x, p1.y)
            context!.lineTo(p2.x, p2.y)
            context!.stroke()
          }
        }
      }

      // Draw dots
      for (const p of points) {
        const mouseDist = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2)
        const proximityBoost = Math.max(0, 1 - mouseDist / mouseInfluence)
        const alpha = dotOpacity * (1 + proximityBoost * 0.8)

        context!.fillStyle = `rgba(${lineColor}, ${alpha})`
        context!.beginPath()
        context!.arc(p.x, p.y, dotRadius * (1 + proximityBoost * 0.5), 0, Math.PI * 2)
        context!.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    c.addEventListener("mousemove", handleMouseMove)
    c.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      const canvas = canvasRef.current
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [lineColor])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 1 }}
    />
  )
}
