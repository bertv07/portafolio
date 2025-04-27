import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Mercury = ({ onLoaded }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Configuración básica
    const w = window.innerWidth; // Ancho de la ventana
    const h = window.innerHeight; // Altura de la ventana
    const scene = new THREE.Scene(); // Crear la escena
    scene.background = null; // Fondo transparente

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000); // Crear la cámara
    camera.position.z = 1.65; // Ajustar la posición de la cámara

    // Crear el renderer con fondo transparente
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h); // Configurar el tamaño del renderer
    mountRef.current.appendChild(renderer.domElement); // Añadir el canvas al documento
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // Crear un grupo para Mercurio
    const mercuryGroup = new THREE.Group();
    mercuryGroup.rotation.z = 0 * Math.PI / 180; // Rotar Mercurio para que esté en su posición correcta
    scene.add(mercuryGroup);

    // Cargar la textura de Mercurio desde la carpeta public
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, 12); // Geometría de Mercurio

    // Cargar la textura y notificar cuando esté lista
    const texture = loader.load(
      "/img/mercury.jpg",
      () => {
        if (onLoaded) {
          onLoaded(); // Notificar que la textura ha terminado de cargar
        }
      }
    );

    const material = new THREE.MeshStandardMaterial({
      map: texture, // Usar la textura cargada
    });
    const mercuryMesh = new THREE.Mesh(geometry, material); // Crear Mercurio
    mercuryGroup.add(mercuryMesh); // Añadir Mercurio a la escena

    // Añadir luz direccional
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(0.5, 0.5, 1.5);
    scene.add(sunLight);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate); // Solicitar la próxima animación
      mercuryMesh.rotation.y += 0.0005; // Rotar Mercurio
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

export default Mercury;