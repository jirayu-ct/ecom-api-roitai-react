import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// https://picsum.photos/v2/list?page=1&limit=15

// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';


const SwiperShowProduct = ({ children }) => {
    return (
        <div>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                pagination={true}
                modules={[Pagination, Autoplay, Navigation]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    730: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                    1080: {
                        slidesPerView: 6,
                        spaceBetween: 50,
                    },
                }}
                navigation={true}
                className="mySwiper object-cover rounded-md"
            >

                {children}

            </Swiper>
        </div>
    )
}
export default SwiperShowProduct