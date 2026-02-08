"use client"

import React, { useEffect, useRef, useState } from "react"
import { renderToString } from "react-dom/server"

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface IconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
  labels?: string[]
  radius?: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

export function IconCloud({ icons, images, labels, radius = 140 }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = useState<{
    x: number
    y: number
    startX: number
    startY: number
    distance: number
    startTime: number
    duration: number
  } | null>(null)
  const animationFrameRef = useRef<number>(0)
  const rotationRef = useRef(rotation)
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])
  const [selectedIconId, setSelectedIconId] = useState<number | null>(null)

  useEffect(() => {
    if (!icons && !images) return

    const items = icons || images || []
    imagesLoadedRef.current = new Array(items.length).fill(false)

    const drawFallbackIcon = (ctx: CanvasRenderingContext2D, label: string) => {
      ctx.clearRect(0, 0, 40, 40)
      ctx.beginPath()
      ctx.arc(20, 20, 20, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle = "rgba(38, 46, 58, 0.92)"
      ctx.fill()
      ctx.strokeStyle = "rgba(220, 232, 255, 0.35)"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = "rgba(236, 244, 255, 0.96)"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.font = "700 12px system-ui, -apple-system, sans-serif"
      const short = label.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase() || "?"
      ctx.fillText(short, 20, 20)
    }

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 40
      offscreen.height = 40
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        if (images) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = items[index] as string
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.beginPath()
            offCtx.arc(20, 20, 20, 0, Math.PI * 2)
            offCtx.closePath()
            offCtx.clip()
            offCtx.drawImage(img, 0, 0, 40, 40)
            imagesLoadedRef.current[index] = true
          }
          img.onerror = () => {
            drawFallbackIcon(offCtx, labels?.[index] || `${index + 1}`)
            imagesLoadedRef.current[index] = true
          }
        } else {
          offCtx.scale(0.4, 0.4)
          const svgString = renderToString(item as React.ReactElement)
          const img = new Image()
          img.src = "data:image/svg+xml;base64," + btoa(svgString)
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.drawImage(img, 0, 0)
            imagesLoadedRef.current[index] = true
          }
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
  }, [icons, images, labels])

  useEffect(() => {
    const items = icons || images || []
    const newIcons: Icon[] = []
    const numIcons = items.length || 20

    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment

      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      newIcons.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        scale: 1,
        opacity: 1,
        id: i,
      })
    }
    setIconPositions(newIcons)
  }, [icons, images, radius])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    let hitIcon: Icon | null = null
    let nearestDistanceSq = Number.POSITIVE_INFINITY

    for (let i = 0; i < iconPositions.length; i++) {
      const icon = iconPositions[i]
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      const screenX = canvasRef.current!.width / 2 + rotatedX
      const screenY = canvasRef.current!.height / 2 + rotatedY

      const scale = (rotatedZ + 200) / 300
      const radius = 24 * scale
      const dx = x - screenX
      const dy = y - screenY

      const distanceSq = dx * dx + dy * dy
      if (distanceSq < radius * radius && distanceSq < nearestDistanceSq) {
        hitIcon = icon
        nearestDistanceSq = distanceSq
      }
    }

    if (hitIcon) {
      setSelectedIconId(hitIcon.id)
      const targetX = -Math.atan2(
        hitIcon.y,
        Math.sqrt(hitIcon.x * hitIcon.x + hitIcon.z * hitIcon.z)
      )
      const targetY = Math.atan2(hitIcon.x, hitIcon.z)

      const currentX = rotationRef.current.x
      const currentY = rotationRef.current.y
      const distance = Math.sqrt(
        Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
      )

      const duration = Math.min(2000, Math.max(800, distance * 1000))

      setTargetRotation({
        x: targetX,
        y: targetY,
        startX: currentX,
        startY: currentY,
        distance,
        startTime: performance.now(),
        duration,
      })
      return
    }

    setSelectedIconId(null)
    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      }

      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
      const dx = mousePos.x - centerX
      const dy = mousePos.y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const speed = 0.003 + (distance / maxDistance) * 0.01

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime
        const progress = Math.min(1, elapsed / targetRotation.duration)
        const easedProgress = easeOutCubic(progress)

        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        }

        if (progress >= 1) {
          setTargetRotation(null)
        }
      } else if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width) * speed,
        }
      }

      let selectedProjected: { x: number; y: number; scale: number; label: string } | null = null

      for (let index = 0; index < iconPositions.length; index++) {
        const icon = iconPositions[index]
        const cosX = Math.cos(rotationRef.current.x)
        const sinX = Math.sin(rotationRef.current.x)
        const cosY = Math.cos(rotationRef.current.y)
        const sinY = Math.sin(rotationRef.current.y)

        const rotatedX = icon.x * cosY - icon.z * sinY
        const rotatedZ = icon.x * sinY + icon.z * cosY
        const rotatedY = icon.y * cosX + rotatedZ * sinX

        const scale = (rotatedZ + 200) / 300
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200))
        const drawX = canvas.width / 2 + rotatedX
        const drawY = canvas.height / 2 + rotatedY

        if (selectedIconId === icon.id) {
          selectedProjected = {
            x: drawX,
            y: drawY,
            scale,
            label: labels?.[index] || `Icon ${index + 1}`,
          }
        }

        ctx.save()
        ctx.translate(drawX, drawY)
        ctx.scale(scale, scale)
        ctx.globalAlpha = opacity

        if (icons || images) {
          if (
            iconCanvasesRef.current[index] &&
            imagesLoadedRef.current[index]
          ) {
            ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40)
          }
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, 20, 0, Math.PI * 2)
          ctx.fillStyle = "#4444ff"
          ctx.fill()
          ctx.fillStyle = "white"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.font = "16px Arial"
          ctx.fillText(`${icon.id + 1}`, 0, 0)
        }

        ctx.restore()
      }

      if (selectedProjected) {
        const label = selectedProjected.label
        const iconRadius = Math.max(14, selectedProjected.scale * 20)
        const isRight = selectedProjected.x <= canvas.width / 2
        const direction = isRight ? 1 : -1
        const dotX = selectedProjected.x + direction * (iconRadius + 5)
        const dotY = selectedProjected.y
        const elbowX = dotX + direction * 26
        const outsideTrackX = canvas.width / 2 + direction * (radius + 58)

        ctx.save()
        ctx.font = "700 14px system-ui, -apple-system, sans-serif"
        const textWidth = ctx.measureText(label).width
        const padX = 10
        const boxH = 28
        const boxW = Math.ceil(textWidth + padX * 2)
        const rawX = outsideTrackX + direction * 12 - (direction < 0 ? boxW : 0)
        const rawY = selectedProjected.y - boxH / 2
        const boxX = Math.min(canvas.width - boxW - 4, Math.max(4, rawX))
        const boxY = Math.min(canvas.height - boxH - 4, Math.max(4, rawY))
        const lineEndX = direction > 0 ? boxX : boxX + boxW
        const lineEndY = boxY + boxH / 2

        ctx.strokeStyle = "rgba(230, 238, 255, 0.92)"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(dotX, dotY)
        ctx.lineTo(elbowX, dotY)
        ctx.lineTo(outsideTrackX, dotY)
        ctx.lineTo(lineEndX, lineEndY)
        ctx.stroke()

        ctx.fillStyle = "rgba(235, 242, 255, 0.98)"
        ctx.beginPath()
        ctx.arc(dotX, dotY, 3.2, 0, Math.PI * 2)
        ctx.fill()

        drawRoundedRect(ctx, boxX, boxY, boxW, boxH, 7)
        ctx.fillStyle = "rgba(12, 15, 20, 0.9)"
        ctx.fill()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.22)"
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.fillStyle = "rgba(240, 246, 255, 0.96)"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(label, boxX + padX, boxY + boxH / 2)
        ctx.restore()
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [icons, images, iconPositions, isDragging, mousePos, targetRotation, labels, selectedIconId, radius])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="rounded-lg"
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  )
}
