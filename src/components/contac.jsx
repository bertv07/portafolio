import React from 'react';
import "../../public/css/loader.css"; // Asegúrate de que la ruta al archivo CSS sea correcta

const Contactanos = () => {
  return (
    <div className="contactanos-container">
      <h1>Contacto</h1>
      <div className="contt">
        <div className="contact-cards">
          <div className="contact-card">
            <div className="text-card1">
              <h3>Email:</h3>
              <a href="mailto:bert27m@gmail.com?subject=Hola&body=Este es un mensaje">bert27m@gmail.com</a>
            </div>

            <div className="img-card1">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill=" #ff8c00"></path> </g></svg>
            </div>
          </div>

          <div className="contact-card">
            <div className="text-card1">
              <h3>Teléfono:</h3>
              <a href="https://wa.me/584120474159?text=Hola,%20quiero%20saber%20más%20sobre%20tus%20proyectos" target="_blank" rel="noopener noreferrer">
                +58 412-0474159
              </a>
            </div>
            <div className="img-card1">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill=" #ff8c00"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill=" #ff8c00"></path> </g></svg>
            </div>

          </div>
        </div>

        <form className="contact-form">
          <h2>Envia un mensaje</h2>
          <div className="form-group">
            <input type="text" placeholder="Nombre" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <textarea placeholder="Mensaje" rows="5"></textarea>
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contactanos;