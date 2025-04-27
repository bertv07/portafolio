// Crear el archivo de animaciones que se importa en App.jsx
import { gsap } from "gsap"
import { ScrollTrigger, MotionPathPlugin } from "gsap/all"
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export const setupAnimations = ({ sunRef, presentationRef, mercuryRef, venusRef, earthRef, marsRef, jupiterRef }) => {
  // Limpiar animaciones previas
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  
  // Usar siempre la configuración para pantallas grandes
  const scaleMultiplier = 1
  const positionOffset = 1
  
  // Bloquear completamente el scroll desde el inicio
  document.body.style.overflow = "hidden"
  document.documentElement.style.overflow = "hidden"
  
  // Animación inicial del sol
  const sunAnimation = gsap.timeline()
  const sun = document.getElementsByClassName("sunn")
  const mercurio = document.getElementsByClassName("mercurio")
  const venus = document.getElementsByClassName("venus-planet")
  const tierra = document.getElementsByClassName("tierra")
  const marte = document.getElementsByClassName("marte")
  const jupiter = document.getElementsByClassName("jupiter-planet")
  const presentacion = document.getElementsByClassName("present")
  
  // Get references to the content sections
  const sobreMi = document.querySelector(".sobre-mi")
  const servicios = document.querySelector(".servicios")
  const proyectoP = document.querySelector(".proyectoP")
  const proyecto = document.querySelector(".proyecto")
  const contac = document.querySelector(".contac")
  
  // Set initial states for content sections - completely hidden and non-interactive
  if (sobreMi) {
    gsap.set(sobreMi, {
      opacity: 0,
      y: 100,
      scale: 0.9 * scaleMultiplier,
      pointerEvents: "none", // Disable interaction initially
    })
  }
  
  if (servicios) {
    gsap.set(servicios, {
      opacity: 0,
      y: 100,
      scale: 0.9 * scaleMultiplier,
      pointerEvents: "none", // Disable interaction initially
    })
  }
  
  if (proyectoP) {
    gsap.set(proyectoP, {
      opacity: 0,
      y: 100,
      scale: 0.9 * scaleMultiplier,
      pointerEvents: "none", // Disable interaction initially
    })
  }
  
  if (proyecto) {
    gsap.set(proyecto, {
      opacity: 0,
      y: 100,
      scale: 0.9 * scaleMultiplier,
      pointerEvents: "none", // Disable interaction initially
    })
  }
  
  if (contac) {
    gsap.set(contac, {
      opacity: 0,
      y: 100,
      scale: 0.9 * scaleMultiplier,
      pointerEvents: "none", // Disable interaction initially
    })
  }
  
  // Posición inicial del sol (fuera de la pantalla)
  gsap.set(sunRef.current, {
    opacity: 0,
    scale: 0.3 * scaleMultiplier,
    top: "-90vh",
    left: "100vw",
    filter: "brightness(0.8)",
  })
  
  gsap.set(jupiter, {
    opacity: 0,
    xPercent: -50, // Centrar horizontalmente
    yPercent: 130, // Centrar verticalmente
    display: "block", // Inicialmente visible
    visibility: "visible",
  })
  
  // Animación de entrada del sol (basada en el archivo HTML)
  sunAnimation
    .to(sunRef.current, {
      duration: 0.5,
      opacity: 1,
      ease: "power1.inOut",
    })
    .to(sunRef.current, {
      duration: 2,
      scale: 0.5 * scaleMultiplier,
      top: "-500px",
      ease: "power1.inOut",
    })
    .to(
      sunRef.current,
      {
        duration: 3,
        top: "50%",
        right: "80%",
        xPercent: 80,
        yPercent: -50,
        scale: 0.8 * scaleMultiplier,
        ease: "power2.inOut",
      },
      "-=1",
    )
    .to(
      sunRef.current,
      {
        duration: 2.5,
        right: "0",
        top: "50vh",
        left: "-7600px",
        ease: "power1.inOut",
        scale: 1 * scaleMultiplier,
      },
      "-=2",
    )
  
  // Animación de entrada para el texto de presentación (como estaba antes)
  gsap.set(presentationRef.current, {
    opacity: 0,
    y: 110,
  })
  
  sunAnimation.to(
    presentationRef.current,
    {
      duration: 1.5,
      opacity: 1,
      y: 0,
      ease: "power2.out",
    },
    "-=1",
  )
  
  // Desbloquear el scroll cuando termine la animación inicial
  sunAnimation.eventCallback("onComplete", () => {
    document.body.style.overflow = ""
    document.documentElement.style.overflow = ""
  })
  
  // Configurar las animaciones de scroll para los planetas
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".espacio",
      start: "top top",
      end: "+=300%",
      scrub: 2,
      markers: false, // Set to false in production
    },
  })
  
  // Movimiento del Sol
  scrollTl.to(sun, {
    duration: 35,
    motionPath: {
      path: [
        { x: "10vw", y: "0vh" },
        { x: "15vw", y: "0vh" },
        { x: "20vw", y: "0vh" },
        { x: "30vw", y: "10vh" }, // Aquí aparece Mercurio
        { x: "60vw", y: "100vh" },
        { x: "80vw", y: "125vh" },
      ],
      curviness: 1.2,
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
    },
    scale: 0.2 * scaleMultiplier,
    ease: "none",
  })
  
  // Animación de salida de la presentación sincronizada con el movimiento del sol
  scrollTl.to(
    presentationRef.current,
    {
      duration: 1, // Duración más corta para que desaparezca antes
      x: "50vw",
      y: "0",
      opacity: 0,
      scale: 0.5 * scaleMultiplier,
      ease: "power2.in",
    },
    "0",
  ) // Comienza al mismo tiempo que el sol empieza a moverse
  
  // Primero, hacer que Mercurio aparezca
  scrollTl.to(
    mercurio,
    {
      duration: 1,
      opacity: 1,
      scale: 1 * scaleMultiplier,
      ease: "power2.inOut",
    },
    1,
  ) // Comienza después de 1 unidad de tiempo
  
  // Luego, mover Mercurio siguiendo el camino dibujado
  scrollTl.to(
    mercurio,
    {
      duration: 32, // Reducido para que salga antes
      motionPath: {
        path: [
          { x: "10vw", y: "0vh" },
          { x: "30vw", y: "10vh" },
          { x: "40vw", y: "15vh" },
          { x: "45vw", y: "20vh" },
          { x: "50vw", y: "25vh" },
          { x: "60vw", y: "30vh" },
          { x: "70vw", y: "40vh" },
          { x: "80vw", y: "50vh" },
          { x: "90vw", y: "60vh" },
          { x: "105vw", y: "70vh" },
        ],
      },
      ease: "none",
    },
    8,
  ) // Comienza después de la aparición
  
  // Animación de salida de Mercurio hacia arriba-izquierda
  scrollTl.to(
    mercurio,
    {
      duration: 20,
      motionPath: {
        path: [
          { x: "105vw", y: "70vh" }, // Posición actual
          { x: "110vw", y: "50vh" }, // Movimiento hacia arriba-derecha
          { x: "115vw", y: "30vh" }, // Continúa hacia arriba-derecha
          { x: "120vw", y: "10vh" }, // Fuera de pantalla por arriba-derecha
          { x: "130vw", y: "-20vh" }, // Completamente fuera de pantalla
        ],
        curviness: 1.2,
        alignOrigin: [0.5, 0.5],
      },
      scale: 0.3 * scaleMultiplier,
      opacity: 0,
      ease: "power2.in",
    },
    55,
  ) // Comienza después del movimiento principal
  
  // Entrada de Venus desde arriba
  scrollTl.to(
    venus,
    {
      duration: 30,
      opacity: 1,
      top: "-10vh",
      left: "0",
      scale: 1 * scaleMultiplier,
      motionPath: {
        path: [
          { x: "20vw", y: "10vh" },
          { x: "15vw", y: "20vh" },
          { x: "15vw", y: "30vh" },
          { x: "10vw", y: "40vh" },
          { x: "10vw", y: "10vh" },
        ],
      },
      onStart: () => {
        // Asegurarse de que Venus sea visible
        if (venus && venus[0]) {
          venus[0].style.display = "block"
          venus[0].style.opacity = "0"
        }
      },
    },
    88,
  )
  
  // Animación de salida de Venus
  scrollTl.to(
    venus,
    {
      duration: 25,
      motionPath: {
        path: [
          { x: "10vw", y: "15vh" }, // Punto intermedio
          { x: "30vw", y: "70vh" }, // Desplazamiento hacia abajo-derecha
          { x: "60vw", y: "120vh" }, // Fuera de pantalla por abajo-derecha
        ],
      },
      ease: "power2.in",
    },
    120,
  ) // Comienza después
  
  // Entrada de la Tierra
  scrollTl.to(
    tierra,
    {
      duration: 30,
      opacity: 1,
      motionPath: {
        path: [
          { x: "0vw", y: "20vh" }, // Punto inicial
          { x: "10vw", y: "50vh" }, // Movimiento hacia abajo
          { x: "30vw", y: "70vh" }, // Movimiento hacia la derecha
          { x: "50vw", y: "80vh" }, // Continúa hacia la derecha
          { x: "80vw", y: "98vh" }, // Posición final abajo-derecha
        ],
        curviness: 1.2,
        alignOrigin: [0.5, 0.5],
      },
      scale: 1.3 * scaleMultiplier,
      ease: "power2.out",
      onStart: () => {
        console.log("Iniciando animación de la Tierra")
      },
    },
    150,
  ) // Comienza cuando Venus está saliendo
  
  // Animación de salida de la Tierra
  scrollTl.to(
    tierra,
    {
      duration: 25,
      motionPath: {
        path: [
          { x: "40vw", y: "100vh" }, // Continúa hacia abajo-derecha
          { x: "50vw", y: "0vh" }, // Sale por abajo-derecha
          { x: "60vw", y: "0vh" }, // Fuera de pantalla
        ],
      },
      scale: 0.5 * scaleMultiplier,
      opacity: 0,
      ease: "power2.in",
    },
    190,
  )
  
  // Comienza después de que la Tierra haya completado su entrada
  scrollTl.to(
    marte,
    {
      duration: 25,
      opacity: 1,
      left: "10vw", // Posición final en el lado derecho
      ease: "none",
      top: "0",
      scale: 1.3 * scaleMultiplier,
      onStart: () => {
        console.log("¡Iniciando animación de Marte!")
        // Asegurarse de que Marte sea visible
        if (marte && marte[0]) {
          marte[0].style.display = "block"
          marte[0].style.visibility = "visible"
        }
      },
      onUpdate: () => {
        // Efecto de brillo creciente para Marte
        if (marte && marte[0]) {
          gsap.set(marte, {
            // Forzar visibilidad durante la animación
            display: "block",
            visibility: "visible",
          })
        }
      },
      onComplete: () => {
        console.log("¡Animación de Marte completada!")
      },
    },
    220,
  ) // Comenzar cuando la Tierra está en pantalla
  
  // Animación de salida de Marte
  scrollTl.to(
    marte,
    {
      duration: 20,
      motionPath: {
        path: [
          { x: "-10vw", y: "0vh" }, // Posición actual
          { x: "-30vw", y: "20vh" }, // Movimiento hacia abajo-izquierda
          { x: "-50vw", y: "40vh" }, // Continúa hacia abajo-izquierda
          { x: "-70vw", y: "60vh" }, // Fuera de pantalla por abajo-izquierda
        ],
      },
      scale: 1.3 * scaleMultiplier,
      opacity: 0,
      ease: "power2.in",
      onUpdate: () => {
        // Efecto de desvanecimiento para la salida
        if (marte && marte[0]) {
          gsap.set(marte, {
            // Mantener visible durante la animación de salida
            display: "block",
            visibility: "visible",
          })
        }
      },
    },
    265,
  ) // Comienza después de que Marte haya estado en pantalla
  
  // Primer paso: Hacer visible a Júpiter
  scrollTl.to(
    jupiter,
    {
      duration: 0.1, // Duración muy corta para que aparezca rápido
      opacity: 1,
      display: "block",
      visibility: "visible",
      scale: 1.2 * scaleMultiplier,
    },
    280,
  )
  
  // Segundo paso: Mover Júpiter con motion path VISIBLE
  scrollTl.to(
    jupiter,
    {
      duration: 25,
      motionPath: {
        path: [
          { x: "0vw", y: "-180vh" }, // Posición inicial (80% left, 50% top)
          { x: "0vw", y: "-180vh" }, // Mover hacia arriba-izquierda
          { x: "0vw", y: "-180vh" }, // Mover hacia la izquierda
          { x: "0vw", y: "-180vh" }, // Mover hacia abajo-izquierda
          { x: "50vw", y: "-180vh" }, // Mover hacia abajo-izquierda
        ],
        curviness: 0.3, // Curvatura muy suave
        alignOrigin: [0.5, 0.5],
      },
      scale: 1.3 * scaleMultiplier,
      ease: "power1.inOut",
      onUpdate: () => {
        // Efecto de brillo creciente para Júpiter
        if (jupiter && jupiter[0]) {
          gsap.set(jupiter, {
            // Forzar visibilidad durante la animación
            display: "block",
            visibility: "visible",
            opacity: 1,
            zIndex: 9999,
          })
        }
      },
    },
    300,
  )
  
  // Sobre Mi animation - appears when Mercury is in view
  if (sobreMi) {
    scrollTl.to(
      sobreMi,
      {
        duration: 10,
        opacity: 1,
        x: 0,
        scale: 1 * scaleMultiplier,
        ease: "back.out(1.7)",
        pointerEvents: "auto", // Enable interaction when visible
        onStart: () => {
          sobreMi.style.visibility = "visible"
        },
      },
      15,
    ) // Sync with Mercury's appearance
    
    // Exit animation
    scrollTl.to(
      sobreMi,
      {
        duration: 15,
        opacity: 0,
        x: -50,
        ease: "power2.in",
        pointerEvents: "none", // Disable interaction when hidden
        onComplete: () => {
          sobreMi.style.visibility = "hidden"
        },
      },
      60,
    ) // Exit when Mercury leaves
  }
  
  // Servicios animation - appears when Venus is in view
  if (servicios) {
    scrollTl.to(
      servicios,
      {
        duration: 10,
        opacity: 1,
        y: 0,
        scale: 1 * scaleMultiplier,
        ease: "power2.in",
        pointerEvents: "auto", // Enable interaction when visible
        onStart: () => {
          servicios.style.visibility = "visible"
        },
      },
      95,
    ) // Sync with Venus's appearance
    
    // Exit animation
    scrollTl.to(
      servicios,
      {
        duration: 15,
        opacity: 0,
        y: -50,
        ease: "power2.in",
        pointerEvents: "none", // Disable interaction when hidden
        onComplete: () => {
          servicios.style.visibility = "hidden"
        },
      },
      140,
    ) // Exit when Venus leaves
  }
  
  // ProyectoP animation - appears when Earth is in view
  if (proyectoP) {
    scrollTl.to(
      proyectoP,
      {
        duration: 10,
        opacity: 1,
        x: 0,
        scale: 1 * scaleMultiplier,
        ease: "power4.out",
        pointerEvents: "auto", // Enable interaction when visible
        onStart: () => {
          proyectoP.style.visibility = "visible"
        },
      },
      160,
    ) // Sync with Earth's appearance
    
    // Exit animation
    scrollTl.to(
      proyectoP,
      {
        duration: 15,
        opacity: 0,
        x: -50,
        ease: "power2.in",
        pointerEvents: "none", // Disable interaction when hidden
        onComplete: () => {
          proyectoP.style.visibility = "hidden"
        },
      },
      210,
    ) // Exit when Earth leaves
  }
  
  // Proyecto animation - appears when Mars is in view
  if (proyecto) {
    scrollTl.to(
      proyecto,
      {
        duration: 2,
        opacity: 1,
        y: 0,
        scale: 1 * scaleMultiplier,
        ease: "bounce.out",
        pointerEvents: "auto", // Enable interaction when visible
        onStart: () => {
          proyecto.style.visibility = "visible"
        },
      },
      230,
    ) // Sync with Mars's appearance
    
    // Exit animation
    scrollTl.to(
      proyecto,
      {
        duration: 1.5,
        opacity: 0,
        y: -50,
        ease: "power2.in",
        pointerEvents: "none", // Disable interaction when hidden
        onComplete: () => {
          proyecto.style.visibility = "hidden"
        },
      },
      280,
    ) // Exit when Mars leaves
  }
  
  // Contactanos animation - appears when Jupiter is in view
  if (contac) {
    scrollTl.to(
      contac,
      {
        duration: 15,
        opacity: 1,
        y: 0,
        scale: 1 * scaleMultiplier,
        ease: "slow(0.7, 0.7, false)",
        pointerEvents: "auto", // Enable interaction when visible
        onStart: () => {
          contac.style.visibility = "visible"
        },
      },
      290,
    ) // Sync with Jupiter's appearance
  }
  
  // Eliminamos el event listener de resize ya que no necesitamos responsive
}
