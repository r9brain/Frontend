import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import news1 from "../../assets/news/news-2.png"
import news2 from "../../assets/news/news-2.png"
import news3 from "../../assets/news/news-2.png"
import news4 from "../../assets/news/news-2.png"
import { Link } from 'react-router-dom';

const news = [
  {
    "id": 1,
    "title": "Nuevo Anime de Acción Sorprende a los Fans",
    "description": "Un nuevo anime de acción ha capturado la atención de los fanáticos con su emocionante trama y personajes inolvidables.",
    "image": news1
  },
  {
    "id": 2,
    "title": "Anunciada la Segunda Temporada de un Anime Popular",
    "description": "La segunda temporada de un anime muy querido por los fans ha sido confirmada, prometiendo más aventuras y emociones.",
    "image": news2
  },
  {
    "id": 3,
    "title": "Película de Anime Romántico Rompe Récords en Taquilla",
    "description": "Una nueva película de anime romántico ha roto récords en taquilla, con una historia conmovedora que ha emocionado a millones.",
    "image": news3
  },
  {
    "id": 4,
    "title": "El Manga Más Vendido Tendrá Adaptación al Anime",
    "description": "El manga más vendido del año finalmente tendrá su adaptación al anime, generando gran expectativa entre los fanáticos.",
    "image": news4
  },
  {
    "id": 5,
    "title": "Anime de Fantasía Oscura Gana Popularidad",
    "description": "Un anime de fantasía oscura ha ganado popularidad rápidamente, destacándose por su animación impresionante y su narrativa profunda.",
    "image": news2
  }
];

const News = () => {
  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Noticias </h2>

        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        
        {
            news.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                        {/* content */}
                        <div className='py-4'>
                            <Link to="/">
                                 <h3 className='text-lg font-medium hover:text-blue-500 mb-4'>{item.title}</h3>
                            </Link>
                            <div className='w-12 h-[4px] bg-primary mb-5'></div>
                            <p className='text-sm text-gray-600'>{item.description}</p>
                        </div>

                        <div className='flex-shrink-0'>
                            <img src={item.image} alt=""  className='w-full object-cover'/>
                        </div>
                    </div>
                </SwiperSlide>
            ) )
        }
      </Swiper>
    </div>
  )
}

export default News