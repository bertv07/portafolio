import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Earth = ({ onLoaded }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Contador para verificar cuántas texturas se han cargado
    let loadedTextures = 0;
    const totalTextures = 4; // Número total de texturas que deben cargarse

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
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000); // Crear la cámara
    camera.position.z = 2.8; // Ajustar la posición de la cámara

    // Crear el renderer y añadirlo al DOM
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h); // Configurar el tamaño del renderer
    mountRef.current.appendChild(renderer.domElement); // Añadir el canvas al documento
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180; // Rotar la Tierra
    scene.add(earthGroup);

    // Cargar texturas y verificar cuándo están listas
    const loader = new THREE.TextureLoader();
    const detail = 12;
    const geometry = new THREE.IcosahedronGeometry(1, detail);

    // Textura de la Tierra
    const earthTexture = loader.load(
      "../public/img/earthmap1k.jpg",
      checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
    );

    const material = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.5,
      metalness: 0.1,
      bumpScale: 0.04,
    });
    const earthMesh = new THREE.Mesh(geometry, material); // Crear la Tierra
    earthGroup.add(earthMesh); // Añadir la Tierra a la escena

    // Textura de las luces de la Tierra
    const lightsTexture = loader.load(
      "../public/img/earthlights1k.jpg",
      checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
    );

    const lightsMat = new THREE.MeshBasicMaterial({
      map: lightsTexture,
      blending: THREE.AdditiveBlending,
    });

    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    earthGroup.add(lightsMesh);

    // Textura de las nubes
    const cloudsTexture = loader.load(
      "../public/img/2k_earth_clouds.jpg",
      checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
    );

    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      alphaTest: 0.3,
    });
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

    // Textura de la Luna
    const moonTexture = loader.load(
      "../public/img/2k_moon.jpg",
      checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
    );

    const moonGroup = new THREE.Group();
    scene.add(moonGroup);

    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
    });
    const moonMesh = new THREE.Mesh(geometry, moonMat);
    moonMesh.position.set(2, 0, 0);
    moonMesh.scale.setScalar(0.17);
    moonGroup.add(moonMesh);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(-2, 0.5, 20.5);
    scene.add(sunLight);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate); // Solicitar la próxima animación
      earthMesh.rotation.y += 0.002;
      lightsMesh.rotation.y += 0.002;
      cloudsMesh.rotation.y += 0.0025;
      moonGroup.rotation.y += 0.01;
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
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return <div ref={mountRef} />;
};

export default Earth;