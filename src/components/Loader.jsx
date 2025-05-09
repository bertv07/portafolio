"use client";

import { useEffect, useState } from "react";
import "../../public/css/loader.css";

const planets = ["SOL", "MERCURIO", "VENUS", "TIERRA", "MARTE", "JUPITER"];

const Loader = ({ onLoadingComplete }) => {
  const [dots, setDots] = useState("");
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Deshabilitar el scroll del body cuando el Loader está activo
    document.body.style.overflow = "hidden";

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const planetInterval = setInterval(() => {
      setCurrentPlanetIndex((prev) => {
        if (prev === planets.length - 1) {
          clearInterval(planetInterval);
          setIsExiting(true);
          setTimeout(() => {
            onLoadingComplete();
            // Habilitar el scroll del body cuando el Loader termina
            document.body.style.overflow = "auto";
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    // Limpiar intervalos y restaurar el scroll al desmontar el componente
    return () => {
      clearInterval(dotsInterval);
      clearInterval(planetInterval);
      document.body.style.overflow = "auto"; // Asegurarse de restaurar el scroll
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loader-content ${isExiting ? "exiting" : ""}`}>
      <div className="loading-details">
        <h1>CarGanDO{dots}</h1>
        <p>{planets[currentPlanetIndex]}</p>
      </div>
    </div>
  );
};

export default Loader;