import React from 'react'
import footerLogo from "../assets/footer-logo.png"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Sección Superior */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Lado Izquierdo - Logo y Navegación */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li><a href="#home" className="hover:text-primary">Inicio</a></li>
            <li><a href="#services" className="hover:text-primary">Servicios</a></li>
            <li><a href="#about" className="hover:text-primary">Sobre Nosotros</a></li>
            <li><a href="#contact" className="hover:text-primary">Contacto</a></li>
          </ul>
        </div>

        {/* Lado Derecho - Boletín */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            ¡Suscríbete a nuestro boletín para recibir las últimas actualizaciones, noticias y ofertas!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="w-full px-4 py-2 rounded-l-md text-black"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark">
              Suscribirse
            </button>
          </div>
        </div>
      </div>

      {/* Sección Inferior */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Lado Izquierdo - Enlaces de Privacidad */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Política de Privacidad</a></li>
          <li><a href="#terms" className="hover:text-primary">Términos del Servicio</a></li>
        </ul>

        {/* Lado Derecho - Iconos Sociales */}
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer