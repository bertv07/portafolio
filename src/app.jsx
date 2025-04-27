"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger, MotionPathPlugin } from "gsap/all"
import { setupAnimations } from "./utils/animations.js"
import Stars from "./components/Stars.jsx"
import Loader from "./components/Loader"
import Sun from "./planets/Sun"
import Presentacion from "./components/Presentacion"
import SobreMi from "./components/SobreMi"
import Mercury from "./planets/Mercury"
import Venus from "./planets/Venus"
import Servicios from "./components/Servicios"
import Earth from "./planets/Earth"
import ProyectoP from "./components/proyectosPersonales.jsx"
import Mars from "./planets/Mars"
import Proyecto from "./components/proyectos.jsx"
import Jupiter from "./planets/Jupiter"
import Contactanos from "./components/contac.jsx"
import Espacio from "./components/espacio.jsx"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const App = () => {
  const [loading, setLoading] = useState(true)
  const presentationRef = useRef(null)
  const sunRef = useRef(null)
  const mercuryRef = useRef(null)
  const venusRef = useRef(null)
  const earthRef = useRef(null)
  const marsRef = useRef(null)
  const jupiterRef = useRef(null)

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Remove the useEffect that calls setupCardHoverEffects and setupTextAnimations

  const handleLoadingComplete = () => {
    setLoading(false)
    window.scrollTo(0, 0)

    requestAnimationFrame(() => {
      // Pasar todas las referencias requeridas
      setupAnimations({
        sunRef,
        presentationRef,
        mercuryRef,
        venusRef,
        earthRef,
        marsRef,
        jupiterRef,
      })
    })
  }

  return (
    <div className="app-container">
      <Stars />
      {loading && <Loader onLoadingComplete={handleLoadingComplete} />}
      <div className={`main-content ${!loading ? "visible" : ""}`}>
        <div className="sun" id="sun">
          {/* Elemento que se moverá */}
          <div className="sunn" ref={sunRef}>
            <Sun />
          </div>

          {/* Elemento que permanece fijo */}
          <div className="present" ref={presentationRef}>
            <Presentacion />
          </div>
        </div>
        <div className="space-transition"></div>

        <div className="mercury" ref={mercuryRef} id="mercury">
          <div className="sobre-mi">
            <SobreMi />
          </div>
          <div className="mercurio">
            <Mercury />
          </div>
        </div>
        <div className="space-transition"></div>

        <div className="venus" ref={venusRef} id="venus">
          <div className="venus-planet">
            <Venus />
          </div>
          <div className="servicios">
            <Servicios />
          </div>
        </div>
        <div className="space-transition"></div>

        <div className="earth" ref={earthRef} id="earth">
          <div className="proyectoP">
            <ProyectoP />
          </div>
          <div className="tierra">
            <Earth />
          </div>
        </div>
        <div className="mars" ref={marsRef} id="mars">
          <div className="marte">
            <Mars />
          </div>
          <div className="proyecto">
            <Proyecto />
          </div>
        </div>
        <Espacio />
        <div className="space-transition"></div>
        <div className="jupiter" ref={jupiterRef} id="jupiter">
          <div className="contac">
            <Contactanos />
          </div>
          <div className="jupiter-planet">
            <Jupiter />
          </div>
        </div>
      </div>
      <div className="espacio"></div>
    </div>
  )
}

export default App

