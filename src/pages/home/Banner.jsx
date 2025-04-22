import React from "react";

import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12 border-b-2 border-gray-200">
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt="600px" width="600px" className="rounded-3xl" />
      </div>

      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          Bienvenidos a Pingui Manga
        </h1>
        <p className="mb-10">
          Aquí encontrarás los mejores mangas y colecciones de los géneros más
          populares y emocionantes del universo del cómic japonés. Sumérgete en
          mundos de acción trepidante con el shonen, déjate conmover por las
          historias de amor y crecimiento del shojo, explora los límites de la
          fantasía y la ciencia ficción en el seinen, y descubre la complejidad
          de las relaciones humanas en el josei. Desde épicas batallas hasta
          slice-of-life entrañables, nuestra selección cuidadosamente curada
          tiene algo especial para cada tipo de lector.
        </p>

        <button className="btn-primary">Subscribe</button>
      </div>
    </div>
  );
};

export default Banner;
