import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Venus = ({ onLoaded }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Contador para verificar cuántas texturas se han cargado
    let loadedTextures = 0;
    const totalTextures = 2; // Número total de texturas que deben cargarse

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
    camera.position.z = 1.65; // Ajustar la posición de la cámara

    // Crear el renderer con fondo transparente
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h); // Configurar el tamaño del renderer
    mountRef.current.appendChild(renderer.domElement); // Añadir el canvas al documento
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // Crear un grupo para Venus
    const venusGroup = new THREE.Group();
    venusGroup.rotation.z = 0 * Math.PI / 180; // Rotar Venus para que esté en su posición correcta
    scene.add(venusGroup);

    // Cargar las texturas de Venus desde la carpeta public
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, 12); // Geometría de Venus

    // Material para la superficie de Venus
    const material = new THREE.MeshStandardMaterial({
      map: loader.load(
        "/img/2k_venus_atmosphere.jpg",
        checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
      ),
    });
    const venusMesh = new THREE.Mesh(geometry, material); // Crear Venus
    venusGroup.add(venusMesh); // Añadir Venus a la escena

    // Material para las nubes de Venus
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: loader.load(
        "/img/2k_venus_surface.jpg",
        checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
      ),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.005); // Escalar ligeramente las nubes
    venusGroup.add(cloudsMesh);

    // Añadir luz direccional
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(-2, 0.5, 20.5);
    scene.add(sunLight);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate); // Solicitar la próxima animación

      // Rotar Venus y las nubes
      venusMesh.rotation.y += -0.0008;
      cloudsMesh.rotation.y += -0.0005;

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

export default Venus;