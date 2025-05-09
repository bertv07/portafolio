import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Jupiter = ({ onLoaded }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Contador para verificar cuántas texturas se han cargado
    let loadedTextures = 0;
    const totalTextures = 5; // Número total de texturas que deben cargarse (Júpiter + 4 lunas)

    // Función para verificar si todas las texturas están cargadas
    const checkIfLoaded = () => {
      loadedTextures += 1;
      if (loadedTextures === totalTextures && onLoaded) {
        onLoaded(); // Notificar que el componente ha terminado de cargar
      }
    };

    // Configuración básica
    const w = window.innerWidth; // Ancho de la ventana
    const h = window.innerHeight; // Altura de la ventana
    const scene = new THREE.Scene(); // Crear la escena
    scene.background = null; // Fondo transparente

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000); // Crear la cámara
    camera.position.z = 2; // Ajustar la posición de la cámara

    // Crear el renderer con fondo transparente
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h); // Configurar el tamaño del renderer
    mountRef.current.appendChild(renderer.domElement); // Añadir el canvas al documento
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // Grupo para Júpiter
    const jupiterGroup = new THREE.Group();
    scene.add(jupiterGroup);

    // Crear la geometría (esfera) y su material para Júpiter
    const loader = new THREE.TextureLoader();
    const detail = 12;
    const jupiterGeometry = new THREE.IcosahedronGeometry(1, detail);
    const jupiterMaterial = new THREE.MeshStandardMaterial({
      map: loader.load(
        "/img/jupiter2_4k.jpg",
        checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
      ),
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial); // Crear la esfera
    jupiterGroup.add(jupiterMesh); // Añadir la esfera a la escena

    // Añadir luz direccional
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(-2, 0.5, 20.5);
    scene.add(sunLight);

    // Crear grupo para las lunas
    const moonGroup = new THREE.Group();
    jupiterGroup.add(moonGroup);

    // Parámetros de las lunas
    const moons = [
      { name: "Io", texture: "/img/io.jpg", distance: 1.1, size: 0.1, orbitSpeed: -0.02 },
      { name: "Europa", texture: "/img/europa.jpg", distance: 1.3, size: 0.15, orbitSpeed: -0.015 },
      { name: "Ganimedes", texture: "/img/ganymede.jpg", distance: 1.5, size: 0.2, orbitSpeed: -0.01 },
      { name: "Calisto", texture: "/img/callisto.png", distance: 1.9, size: 0.12, orbitSpeed: -0.012 },
    ];

    // Crear las lunas de Júpiter
    const moonMeshes = [];
    moons.forEach(moon => {
      const moonGeometry = new THREE.IcosahedronGeometry(0.1, detail);
      const moonMaterial = new THREE.MeshStandardMaterial({
        map: loader.load(
          moon.texture,
          checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
        ),
      });
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
      moonMesh.scale.setScalar(moon.size);
      moonMeshes.push({ mesh: moonMesh, distance: moon.distance, orbitSpeed: moon.orbitSpeed, angle: 0 });
      moonGroup.add(moonMesh);
    });

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate); // Solicitar la próxima animación

      // Rotar Júpiter
      jupiterMesh.rotation.y += 0.008;

      // Rotar las lunas alrededor de Júpiter
      moonMeshes.forEach(moon => {
        moon.angle += moon.orbitSpeed; // Incrementar el ángulo
        moon.mesh.position.x = Math.cos(moon.angle) * moon.distance; // Actualizar la posición en X
        moon.mesh.position.z = Math.sin(moon.angle) * moon.distance; // Actualizar la posición en Z
      });

      renderer.render(scene, camera); // Renderizar la escena
    };

    // Iniciar la animación
    animate();

    // Manejar el cambio de tamaño de la ventana
    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleWindowResize, false);

    // Limpiar al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return <div ref={mountRef} />;
};

export default Jupiter;