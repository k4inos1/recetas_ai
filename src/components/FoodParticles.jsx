"use client"

import { useState, useEffect } from "react"

const foodEmojis = [
  "🍕",
  "🍔",
  "🍟",
  "🌭",
  "🥪",
  "🌮",
  "🌯",
  "🥗",
  "🍝",
  "🍜",
  "🍲",
  "🥘",
  "🍱",
  "🍙",
  "🍚",
  "🍛",
  "🍤",
  "🍣",
  "🦪",
  "🍖",
  "🥩",
  "🍗",
  "🥓",
  "🍳",
  "🥞",
  "🧀",
  "🥖",
  "🥐",
  "🍞",
  "🥯",
  "🥨",
  "🧇",
  "🥚",
  "🍄",
  "🥕",
  "🌽",
  "🥒",
  "🥬",
  "🥦",
  "🧄",
  "🧅",
  "🍅",
  "🥑",
  "🍆",
  "🥔",
  "🍠",
  "🌶️",
  "🥜",
  "🍯",
  "🥛",
  "🍷",
  "🥂",
  "🍾",
  "🧃",
  "☕",
  "🍵",
  "🥤",
  "🧋",
  "🍰",
  "🧁",
  "🍪",
  "🍩",
  "🍫",
  "🍬",
  "🍭",
  "🍮",
  "🍯",
  "🍎",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🥝",
  "🍑",
  "🥭",
  "🍍",
  "🥥",
  "🥨",
]

const FoodParticles = ({ enabled = true }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!enabled) return

    const createParticle = (x = Math.random() * 100, y = Math.random() * 100) => ({
      id: Math.random(),
      emoji: foodEmojis[Math.floor(Math.random() * foodEmojis.length)],
      x,
      y,
      size: Math.random() * 32 + 24,
      opacity: Math.random() * 0.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.2,
      pulseSpeed: Math.random() * 0.003 + 0.008,
      pulseOffset: Math.random() * Math.PI * 2,
      drift: Math.random() * 0.3 + 0.3,
    })

    const initialParticles = Array.from({ length: 20 }, () => createParticle())
    setParticles(initialParticles)

    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setParticles((prev) => [...prev, createParticle(x, y)])
    }

    const container = document.querySelector(".food-particles")
    if (container) {
      container.addEventListener("click", handleClick)
    }
    return () => {
      if (container) {
        container.removeEventListener("click", handleClick)
      }
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY

          const time = Date.now() * 0.001
          const driftX = Math.sin(time * particle.drift) * 0.07
          const driftY = Math.cos(time * particle.drift) * 0.07
          newX += driftX
          newY += driftY

          if (newX < -5 || newX > 105) particle.speedX *= -1
          if (newY < -5 || newY > 105) particle.speedY *= -1

          const newRotation = particle.rotation + particle.rotationSpeed

          const pulseScale = 1 + Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.07

          return {
            ...particle,
            x: newX,
            y: newY,
            rotation: newRotation,
            scale: pulseScale,
          }
        }),
      )
    }
    const animationInterval = setInterval(animateParticles, 100)
    return () => clearInterval(animationInterval)
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="food-particles" style={{ pointerEvents: "auto", position: "fixed", inset: 0, zIndex: 0 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale || 1})`,
            transition: "transform 1.2s cubic-bezier(0.4,0.2,0.2,1)",
            position: "absolute",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  )
}

export default FoodParticles
