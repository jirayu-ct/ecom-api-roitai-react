import { useEffect, useState } from "react"
import useEcomStore from "../../store/ecom-store"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from "../../utils/number";


const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

  const getCategory = useEcomStore((state) => state.getCategory)
  const categories = useEcomStore((state) => state.categories)

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([])

  const [price, setPrice] = useState([1000, 30000])
  const [ok, setOk] = useState(false)

  useEffect(() => {
    getCategory()
  }, [])



  //step1: Search Text

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  //step2: Search by category
  const handleCheck = (e) => {
    // console.log(e.target.value)
    const inCheck = e.target.value //ค่าที่เราติ๊ก
    const inState = [...categorySelected] //[1,2,3] arr ว่ามีอะไรบ้าง
    const findCheck = inState.indexOf(inCheck) //ถ้าเจอ 2 จะreturn 1 ถ้าไม่เจอจะเป็น -1

    if (findCheck === -1) {
      inState.push(inCheck)
    }
    else {
      inState.splice(findCheck, 1)
    }

    setCategorySelected(inState)

    if (inState.length > 0) {
      actionSearchFilters({ category: inState })
    }
    else {
      getProduct()
    }
  }

  // console.log(categorySelected)

  //step3: Search by price
  useEffect(() => {
    actionSearchFilters({ price })
  }, [ok])

  const handlePrice = (value) => {
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }



  return (
    <div>

      {/* Search Text */}
      <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้า"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      <hr />

      {/* Search Category */}
      <div>
        <h1 className="text-xl font-bold mb-4">หมวดสินค้า</h1>
        <div>
          {
            categories.map((item, index) =>
              <div key={index} className="flex gap-2">
                <input
                  onChange={handleCheck}
                  value={item.id}
                  type="checkbox"
                />
                <label>{item.name}</label>
              </div>
            )
          }
        </div>
      </div>
      <hr />
      {/* Search Price */}

      <div>
        <h1>ค้นหาราคา</h1>
        <div>

          <div className="flex justify-between">
            <span>Min: { numberFormat(price[0]) }</span>
            <span>Max: { numberFormat(price[1]) }</span>
          </div>

          <Slider
            onChange={handlePrice}
            min={0}
            max={100000}
            range
            defaultValue={[1000, 30000]}
          />
        </div>
      </div>

    </div>

  )
}
export default SearchCard