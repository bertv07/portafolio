import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Sun = ({ onLoaded }) => {
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

    // Obtener el elemento canvas del DOM
    const canvas = document.createElement('canvas');
    mountRef.current.appendChild(canvas);

    // Crear el renderer de Three.js con fondo transparente
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true, // Habilita el fondo transparente
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Crear la escena de Three.js
    const scene = new THREE.Scene();
    scene.background = null; // Elimina el fondo de la escena

    // Crear una cámara que orbita alrededor de un punto
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1.75;

    // Crear una textura para las partículas
    const particleTexture = new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Sun/T_SunSurface.png',
      checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
    );

    // Crear la geometría de las partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 25000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const angles = new Float32Array(particlesCount);
    const velocities = new Float32Array(particlesCount * 3);
    const maxDistance = 1.01; // Distancia máxima de las partículas desde el núcleo

    // Configuración de las partículas
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Colores para las partículas (gradientes de color)
      const color = new THREE.Color();
      const lifeRatio = i / particlesCount;
      if (lifeRatio < 0.4) {
        color.setHex(0xDA7634); // Naranja
      } else if (lifeRatio < 0.5) {
        color.setHex(0x924E1C); // Marrón oscuro
      } else {
        color.setHex(0x521209); // Rojo oscuro
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Tamaños de las partículas
      sizes[i] = 0.1 + Math.random() * 0.3;

      // Ángulos de rotación inicial
      angles[i] = Math.random() * 2 * Math.PI;

      // Velocidades de las partículas
      velocities[i * 3] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particlesGeometry.setAttribute('angle', new THREE.BufferAttribute(angles, 1));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    // Crear el material de las partículas
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: particleTexture }
      },
      vertexShader: `
        attribute float size;
        attribute float angle;
        attribute vec3 velocity;
        varying vec3 vColor;
        varying float vAngle;
        void main() {
            vColor = color;
            vAngle = angle;
            vec3 newPosition = position + velocity;
            vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        varying float vAngle;
        void main() {
            vec2 coord = gl_PointCoord;
            float cosA = cos(vAngle);
            float sinA = sin(vAngle);
            coord = vec2(
                cosA * (coord.x - .5) + sinA * (coord.y - 0.5) + 0.5,
                cosA * (coord.y - 0.5) - sinA * (coord.x - 0.5) + 0.5
            );
            gl_FragColor = vec4(vColor, 1.0);
            gl_FragColor = gl_FragColor * texture2D(pointTexture, coord);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false, // Las partículas no escriben en el búfer de profundidad
      depthTest: true,   // Hacer que pasen el test de profundidad
      transparent: true,
      vertexColors: true
    });

    // Crear el sistema de partículas
    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    // Crear una esfera que actuará como el núcleo del sol
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load(
      'public/img/sun-map.jpg',
      checkIfLoaded // Llamar a checkIfLoaded cuando la textura esté cargada
    );

    // Crear la geometría y el material
    const coreGeometry = new THREE.SphereGeometry(1, 64, 64);
    const coreMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });

    // Crear la esfera con la textura aplicada
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreSphere);

    // Definir SimpleNoise
    class SimpleNoise {
      constructor() {
        this.seed = Math.random() * 100;
      }

      noise(x, y, z) {
        // Un generador de ruido muy básico
        return Math.sin(x * 10 + y * 10 + z * 10 + this.seed);
      }
    }

    // Crear la corona solar
    function createCorona() {
      const coronaGeometry = new THREE.IcosahedronGeometry(1.05, 4); // Radio ligeramente mayor que el núcleo
      const coronaMaterial = new THREE.MeshBasicMaterial({
        color: 0xfff000,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.1, // Hacer la corona semi-transparente
      });
      const coronaMesh = new THREE.Mesh(coronaGeometry, coronaMaterial);
      const coronaNoise = new SimpleNoise(); // Usar SimpleNoise

      let v3 = new THREE.Vector3();
      let p = new THREE.Vector3();
      let pos = coronaGeometry.attributes.position;
      pos.usage = THREE.DynamicDrawUsage;
      const len = pos.count;

      const update = (t) => {
        for (let i = 0; i < len; i += 1) {
          p.fromBufferAttribute(pos, i).normalize();
          v3.copy(p).multiplyScalar(10); // Ajustar el radio base
          let ns = coronaNoise.noise(
            v3.x + Math.cos(t),
            v3.y + Math.sin(t),
            v3.z + t
          );
          v3.copy(p)
            .setLength(1) // Ajustar el radio base
            .addScaledVector(p, ns * 0.05); // Reducir el efecto de ruido
          pos.setXYZ(i, v3.x, v3.y, v3.z);
        }
        pos.needsUpdate = true;
      };

      coronaMesh.userData.update = update;
      return coronaMesh;
    }

    // Añadir la corona a la escena
    const corona = createCorona();
    scene.add(corona);

    // Configurar el loop de animación
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotación lenta del núcleo del sol
      coreSphere.rotation.y += 0.0005; // Ajusta la velocidad de rotación aquí

      // Rotación lenta de la corona (opcional)
      corona.rotation.y += 0.0005; // Ajusta la velocidad de rotación aquí

      const positions = particlesGeometry.attributes.position.array;
      const velocities = particlesGeometry.attributes.velocity.array;
      const angles = particlesGeometry.attributes.angle.array;
      // Actualizar las posiciones y ángulos de las partículas
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Calcular la distancia desde el núcleo
        const distance = Math.sqrt(
          positions[i * 3] ** 2 +
          positions[i * 3 + 1] ** 2 +
          positions[i * 3 + 2] ** 2
        );

        // Limitar la distancia y ajustar velocidades si se alejan demasiado
        if (distance > maxDistance) {
          const scaleFactor = maxDistance / distance;
          positions[i * 3] *= scaleFactor;
          positions[i * 3 + 1] *= scaleFactor;
          positions[i * 3 + 2] *= scaleFactor;

          velocities[i * 3] = (Math.random() - 0.5) * 0.001;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
        }

        // Rotación aleatoria
        angles[i] += 0.0001;
      }

      particlesGeometry.attributes.position.needsUpdate = true;
      particlesGeometry.attributes.angle.needsUpdate = true;

      // Actualizar la corona
      const time = performance.now() * 0.0001;
      corona.userData.update(time);

      // Renderizar la escena
      renderer.render(scene, camera);
    };

    // Manejar el redimensionamiento de la ventana para ajustar el canvas
    const handleWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleWindowResize, false);

    // Iniciar el loop de animación
    animate();

    // Limpiar al desmontar el componente
    return () => {
      if (mountRef.current && canvas) {
        mountRef.current.removeChild(canvas); // Verificar si canvas existe antes de eliminarlo
      }
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [onLoaded]);

  return <div ref={mountRef} />;
};

export default Sun;