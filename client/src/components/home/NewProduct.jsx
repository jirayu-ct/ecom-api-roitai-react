import { useEffect, useState } from "react"
import { listProductBy } from "../../api/product"
import ProductCard from "../crad/ProductCard"
import SwiperShowProduct from "../../utils/swiperShowProduct"
import { SwiperSlide } from "swiper/react"



const NewProduct = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy('updatedAt', 'desc', 6)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    console.log(data)

    return (
        <SwiperShowProduct>
            {
                data?.map((item, index) => (
                    <SwiperSlide>
                        <ProductCard key={index} item={item} />
                    </SwiperSlide>
                ))
            }
        </SwiperShowProduct>
    )
}
export default NewProduct