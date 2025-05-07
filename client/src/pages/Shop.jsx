import { useEffect } from "react"
import ProductCard from "../components/crad/ProductCard"
import useEcomStore from "../store/ecom-store"
import SearchCard from "../components/crad/SearchCard"
import CartCrad from "../components/crad/CartCrad"

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  useEffect(() => {
    getProduct(20)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row">
      {/* SearchBar */}
      <div className="w-full lg:w-1/4 p-4 bg-gray-100 lg:h-screen">
        <SearchCard />
      </div>

      {/* Product List */}
      <div className="w-full lg:w-1/2 p-4 lg:h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-2">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-full lg:w-1/4 p-4 bg-gray-100 lg:h-screen overflow-y-auto">
        <CartCrad />
      </div>
    </div>
  )
}
export default Shop