"use client"
import { useEffect, useRef } from "react"

const Stars = () => {
  const containerRef = useRef(null)
  const starsRef = useRef([])
  const animationFrame = useRef(null)
  const lastScrollY = useRef(0)
  const velocity = useRef(0)
  const rotation = useRef({ x: 0, y: 0 })

  // Configuración cinematográfica
  const settings = {
    starCount: 200,
    baseSpeed: 0.3,
    maxSpeed: 12,
    rotationFactor: 0.08,
    perspective: 1000,
    layers: [
      { speed: 1.2, size: 1 }, // Estrellas cercanas (más rápidas)
      { speed: 0.8, size: 2 }, // Capa intermedia
      { speed: 0.4, size: 3 }  // Estrellas lejanas (más lentas)
    ]
  }

  const createStar = (layer) => {
    const star = document.createElement("div")
    const size = Math.random() * settings.layers[layer].size + 1
    
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: #fff;
      border-radius: 50%;
      opacity: ${Math.random() * 0.7 + 0.3};
      transform: translate3d(
        ${Math.random() * 100}vw,
        ${Math.random() * 100}vh,
        ${layer * -100}px
      );
    `
    
    return star
  }

  const animate = () => {
    const scrollFactor = Math.min(velocity.current / 50, 1)
    
    // Aplicar movimiento 3D
    containerRef.current.style.transform = `
      perspective(${settings.perspective}px)
      rotateX(${rotation.current.x}deg)
      rotateY(${rotation.current.y}deg)
      scale(${1 + scrollFactor * 0.1})
    `
    
    // Mover estrellas
    starsRef.current.forEach((star, i) => {
      const layer = i % settings.layers.length
      const speed = settings.baseSpeed * settings.layers[layer].speed * velocity.current
      
      const currentX = parseFloat(star.style.transform.match(/translate3d\(([-\d.]+)vw/)[1])
      const newX = currentX - speed * 0.1
      
      star.style.transform = star.style.transform.replace(
        /translate3d\(([-\d.]+)vw/,
        `translate3d(${newX}vw`
      )
      
      if (newX < -20) {
        star.style.transform = `translate3d(120vw, ${Math.random() * 100}vh, ${layer * -100}px)`
      }
    })
    
    animationFrame.current = requestAnimationFrame(animate)
  }

  const handleScroll = (e) => {
    const currentScrollY = window.scrollY
    const delta = currentScrollY - lastScrollY.current
    const scrollDirection = delta > 0 ? 1 : -1
    
    // Calcular velocidad con inercia
    velocity.current = Math.min(settings.maxSpeed, Math.abs(delta) * 0.3)
    
    // Rotación perspectiva
    rotation.current.x = Math.max(-5, Math.min(5, rotation.current.x + (-scrollDirection * settings.rotationFactor)))
    rotation.current.y = Math.max(-5, Math.min(5, rotation.current.y + (Math.random() * settings.rotationFactor)))
    
    lastScrollY.current = currentScrollY
  }

  useEffect(() => {
    // Crear estrellas en capas
    starsRef.current = Array.from({ length: settings.starCount }).map((_, i) => {
      const layer = i % settings.layers.length
      const star = createStar(layer)
      containerRef.current.appendChild(star)
      return star
    })
    
    animate()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrame.current)
    }
  }, [])

  return (
    <div ref={containerRef}
         style={{
           position: "fixed",
           top: "0",
           left: "0",
           width: "200%",
           height: "200%",
           pointerEvents: "none",
           zIndex: 0,
           transition: "transform 0.3s cubic-bezier(0.17, 0.67, 0.34, 1.2)",
           transformStyle: "preserve-3d"
         }} />
  )
}

export default Stars