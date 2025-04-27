import { useEffect, useState } from "react";
import "../../public/css/loader.css";



const Presentacion = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(100); // Velocidad de escritura
  const [isCursorVisible, setIsCursorVisible] = useState(true); // Estado para el cursor
  const [isVisible, setIsVisible] = useState(false); // Estado para la visibilidad

  const palabras = ["Desarrollador web", "Frontend", "Backend", "Full-stack"];
  const periodoEscritura = 100; // Velocidad de escritura
  const periodoBorrado = 50; // Velocidad de borrado
  const periodoEspera = 1000; // Tiempo de espera después de escribir/borrar

  // Color del cursor (puedes cambiarlo dinámicamente)
  const cursorColor = "#FFA500"; // Naranja, por ejemplo

  // Efecto para mostrar la presentación después de un retraso
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Cambia a visible después de un retraso
    }, 100); // Retraso inicial (100 ms)

    return () => clearTimeout(timer);
  }, []);

  // Efecto para el cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setIsCursorVisible((prev) => !prev); // Alternar visibilidad del cursor
    }, 500); // Velocidad del parpadeo (500 ms)

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  // Efecto para la escritura/borrado
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % palabras.length;
    let fullText = palabras[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      // Espera un momento antes de empezar a borrar
      setIsDeleting(true);
      setDelta(periodoEspera); // Espera antes de borrar
    } else if (isDeleting && updatedText === "") {
      // Cambia a la siguiente palabra después de borrar
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(periodoEscritura); // Velocidad de escritura
    } else if (isDeleting) {
      // Velocidad de borrado
      setDelta(periodoBorrado);
    } else {
      // Velocidad de escritura
      setDelta(periodoEscritura);
    }
  };

  return (
    <div className={`presentacion ${isVisible ? "visible" : ""}`}>
      <div className="text">
        <div className="hola">
          <h2>¡Hola! <span className="span-mi">mi nombre es:</span></h2>
        </div>
        <div className="nombre">
          <h1>Gleybert Martinez</h1>
        </div>
        <div className="soy">
          <h3>
            {text}
            {isCursorVisible && (
              <span
                style={{
                  display: "inline-block",
                  width: "4px", // Ancho del cursor
                  height: "1.2em", // Altura del cursor
                  backgroundColor: cursorColor, // Color del cursor
                  marginLeft: "2px", // Espacio entre el texto y el cursor
                  verticalAlign: "middle", // Alineación vertical
                  opacity: 1, // Visibilidad del cursor
                }}
              ></span>
            )}
          </h3>
        </div>
        <div className="bien">
          <h4>¡Bienvenido a mi portafolio!</h4>
        </div>
      </div>
      <div className="img">
        <img src="" alt="" />
      </div>

    </div>
  );
};

export default Presentacion;