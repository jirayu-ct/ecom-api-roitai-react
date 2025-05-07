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

const ContentCarousel = () => {

    const urlImage = 'https://picsum.photos/v2/list?page=1&limit=15'
    const [data, setData] = useState([])

    useEffect(() => {
        handleGetImage()
    }, [])

    const handleGetImage = async () => {
        try {
            const res = await axios.get(urlImage)
            setData(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='space-y-4'>
            <Swiper
                pagination={true}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                
                className="mySwiper h-80 object-cover rounded-md">

                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img src={item.download_url} />
                        </SwiperSlide>
                    )
                }

            </Swiper>


            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                pagination={true}
                modules={[Pagination, Autoplay, Navigation]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                navigation={true}
                className="mySwiper object-cover rounded-md">

                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img 
                            src={item.download_url} 
                            className='rounded-md'
                            />
                        </SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    )
}
export default ContentCarousel