import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Cargador para GLTF/GLB

const Mars = ({ onLoaded }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Contador para verificar cuántos recursos se han cargado
    let loadedResources = 0;
    const totalResources = 3; // Número total de recursos que deben cargarse (Marte, Fobos, Deimos)

    // Función para verificar si todos los recursos están cargados
    const checkIfLoaded = () => {
      loadedResources += 1;
      if (loadedResources === totalResources && onLoaded) {
        onLoaded(); // Notificar que el componente ha terminado de cargar
      }
    };

    // Configuración básica
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    scene.background = null; // Fondo transparente

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 2;

    // Crear el renderer con fondo transparente
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // Grupo para Marte
    const marsGroup = new THREE.Group();
    marsGroup.rotation.z = -25.2 * Math.PI / 180; // Rotación inicial
    scene.add(marsGroup);

    // Configurar Marte
    const loader = new THREE.TextureLoader();
    const marsGeometry = new THREE.IcosahedronGeometry(1, 12);
    const marsMaterial = new THREE.MeshStandardMaterial({
      map: loader.load(
        "/img/mars_1k_color.jpg",
        checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
      ),
    });
    const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
    marsGroup.add(marsMesh);

    // Grupo para lunas (Fobos y Deimos)
    const moonGroup = new THREE.Group();
    scene.add(moonGroup);

    // Variables para las lunas
    let phobos, deimos;

    // Función para cargar Fobos
    const loadPhobos = () => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        "/models/fobos.glb", // Ruta del modelo
        (gltf) => {
          phobos = gltf.scene;

          // Ajustar escala, posición y textura
          phobos.scale.set(0.0001, 0.0001, 0.0001); // Tamaño de Fobos
          phobos.position.set(1.1, 0, 0); // Posición personalizada

          const moonTexture = loader.load(
            "/img/2k_moon.jpg",
            checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
          );
          phobos.traverse((child) => {
            if (child.isMesh) {
              child.material.map = moonTexture; // Asignar textura
              child.material.needsUpdate = true;
            }
          });

          moonGroup.add(phobos); // Añadir Fobos al grupo lunar

          console.log("Modelo Fobos cargado correctamente y añadido a la escena.");
        },
        undefined,
        (error) => {
          console.error("Error al cargar el modelo Fobos:", error);
        }
      );
    };

    // Función para cargar Deimos
    const loadDeimos = () => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        "/models/deimos.glb", // Ruta del modelo
        (gltf) => {
          deimos = gltf.scene;

          // Ajustar escala, posición y textura
          deimos.scale.set(0.005, 0.005, 0.005); // Tamaño de Deimos
          deimos.position.set(1.2, 0, 0); // Posición personalizada

          const moonTexture = loader.load(
            "/img/2k_moon.jpg",
            checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
          );
          deimos.traverse((child) => {
            if (child.isMesh) {
              child.material.map = moonTexture; // Asignar textura
              child.material.needsUpdate = true;
            }
          });

          moonGroup.add(deimos); // Añadir Deimos al grupo lunar

          console.log("Modelo Deimos cargado correctamente y añadido a la escena.");
        },
        undefined,
        (error) => {
          console.error("Error al cargar el modelo Deimos:", error);
        }
      );
    };

    // Cargar Fobos y Deimos
    loadPhobos();
    loadDeimos();

    // Luces
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    scene.add(hemiLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Velocidades de órbita
    const phobosOrbitSpeed = -0.02; // Velocidad de órbita de Fobos
    const deimosOrbitSpeed = -0.05; // Velocidad de órbita de Deimos

    // Ángulos de órbita iniciales
    let phobosOrbitAngle = 0; // Ángulo de órbita de Fobos
    let deimosOrbitAngle = 1; // Ángulo de órbita de Deimos

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      marsMesh.rotation.y += 0.0016; // Rotación lenta de Marte
      moonGroup.rotation.y += 0.01; // Rotación del grupo de lunas

      // Movimiento orbital de Fobos
      if (phobos) {
        phobosOrbitAngle += phobosOrbitSpeed; // Incrementar el ángulo de órbita
        phobos.position.x = 1.1 * Math.cos(phobosOrbitAngle); // Movimiento en el eje X
        phobos.position.z = 1.1 * Math.sin(phobosOrbitAngle); // Movimiento en el eje Z
      }

      // Movimiento orbital de Deimos
      if (deimos) {
        deimosOrbitAngle += deimosOrbitSpeed; // Incrementar el ángulo de órbita
        deimos.position.x = 1.2 * Math.cos(deimosOrbitAngle); // Movimiento en el eje X
        deimos.position.z = 1.2 * Math.sin(deimosOrbitAngle); // Movimiento en el eje Z
      }

      renderer.render(scene, camera);
    };

    // Iniciar animación
    animate();

    // Ajustes de redimensionado
    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleWindowResize, false);

    // Limpiar al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return <div ref={mountRef} />;
};

export default Mars;