import { useEffect, useState } from "react"
import { listProductBy } from "../../api/product"
import ProductCard from "../crad/ProductCard"
import SwiperShowProduct from "../../utils/swiperShowProduct"
import { SwiperSlide } from "swiper/react"



const BestSeller = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy('sold', 'desc', 12)
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
      {data?.map((item, index) => (
        <SwiperSlide>
          <ProductCard item={item} key={index} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
    )
}
export default BestSeller