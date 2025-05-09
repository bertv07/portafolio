import "../../public/css/loader.css"
// Importar los SVGs desde la carpeta public/img/svg-logos
import MongoLogo from "../../public/img/svg-logos/mongo-svgrepo-com.svg"
import MySqlLogo from "../../public/img/svg-logos/mysql-svgrepo-com.svg"
import ThreeJsLogo from "../../public/img/svg-logos/three-js-icon.svg"
import ReactLogo from "../../public/img/svg-logos/react-svgrepo-com.svg"
import JsLogo from "../../public/img/svg-logos/js-svgrepo-com.svg"
import HtmlLogo from "../../public/img/svg-logos/html-5-svgrepo-com.svg"
import CssLogo from "../../public/img/svg-logos/css-3-svgrepo-com.svg"
import BootstrapLogo from "../../public/img/svg-logos/bootstrap-svgrepo-com.svg"
import TailwindLogo from "../../public/img/svg-logos/tailwind-svgrepo-com.svg"

const SobreMi = () => {
  return (
    <div className="sobremi">
      <h2>Sobre mi</h2>
      <p>
        Soy Gleybert, un desarrollador web full-stack apasionado por el código y siempre en busca de nuevas tecnologías.
        Trabajo con herramientas como HTML, CSS, JavaScript, React y Three.js, además de frameworks como Bootstrap y
        Tailwind, y manejo bases de datos como MySQL y MongoDB. Mi experiencia incluye proyectos personales desafiantes
        y la colaboración con Caracas Flight Services, un FBO en el Aeropuerto de Caracas.
      </p>
      <p>
        {" "}
        Me defino como responsable, creativo y dedicado a encontrar soluciones eficaces. Mi curiosidad por aprender y mi
        compromiso con la calidad me impulsan a seguir creciendo en el dinámico mundo del desarrollo web.{" "}
      </p>
      <div className="logos">
        <img src={JsLogo || "/placeholder.svg"} alt="JavaScript" className="logo" />
        <img src={HtmlLogo || "/placeholder.svg"} alt="HTML5" className="logo" />
        <img src={CssLogo || "/placeholder.svg"} alt="CSS3" className="logo" />
        <img src={ReactLogo || "/placeholder.svg"} alt="React" className="logo" />
        {/* <img src={ThreeJsLogo || "/placeholder.svg"} alt="Three.js" className="logo" /> */}
        <img src={MongoLogo || "/placeholder.svg"} alt="MongoDB" className="logo" />
        <img src={MySqlLogo || "/placeholder.svg"} alt="MySQL" className="logo" />
        <img src={BootstrapLogo || "/placeholder.svg"} alt="Bootstrap" className="logo" />
        <img src={TailwindLogo || "/placeholder.svg"} alt="Tailwind CSS" className="logo" />
      </div>
    </div>
  )
}

export default SobreMi

