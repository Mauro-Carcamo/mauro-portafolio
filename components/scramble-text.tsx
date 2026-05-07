"use client"

import React, { useEffect, useState, useRef } from "react"

interface ScrambleTextProps {
  children: string
  duration?: number
  scrambleSpeed?: number
  delay?: number
}

const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789@#$%&*"

export function ScrambleText({ children, duration = 1.5, scrambleSpeed = 30, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState("")
  const iteration = useRef(0)
  const targetText = children

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(() =>
          targetText
            .split("")
            .map((char, index) => {
              if (index < iteration.current) {
                return targetText[index]
              }
              if (char === " ") return " "
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
        )

        if (iteration.current >= targetText.length) {
          clearInterval(interval)
        }

        // Controla la velocidad de "revelación" de izquierda a derecha
        iteration.current += targetText.length / ((duration * 1000) / scrambleSpeed)
      }, scrambleSpeed)
    }, delay)

    return () => {
      clearInterval(interval)
      clearTimeout(startTimeout)
    }
  }, [targetText, duration, scrambleSpeed, delay])

  return <span>{displayText || " "}</span>
}