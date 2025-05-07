import { useEffect, useState } from "react"
import useEcomStore from "../../store/ecom-store"
import { listUserCart, saveAddress } from "../../api/user"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { numberFormat } from "../../utils/number"

const SummaryCard = () => {

    const token = useEcomStore((state) => state.token)

    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        handleUserCart(token)
    }, [])

    const handleUserCart = async (token) => {
        try {
            const response = await listUserCart(token)

            setProducts(response.data.products)
            setCartTotal(response.data.cartTotal)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleSaveAddress = async () => {

        try {

            if (!address) return toast.warning('กรุณาระบุที่อยู่จัดส่ง')

            const res = await saveAddress(token, address)
            toast.success(res.data.message)

            setAddressSaved(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handlePayment = () => {
        if(!addressSaved){
            return toast.warning('กรุณาระบุที่อยู่จัดส่ง')
        }

        navigate('/user/payment')
    }

    return (
        <div className="mx-auto">
            <div className="flex gap-4">
                {/* Right */}
                <div className="w-1/2">
                    <div className="bg-gray-100 p-4 rounded-md border border-gray-200 shadow-md space-y-4">
                        <h1 className="text-lg font-bold">ที่อยู่จัดส่ง</h1>
                        <textarea
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="ระบุที่อยู่จัดส่ง"
                            required
                            className="w-full px-2 bg-white rounded-md"
                        />
                        <button
                            onClick={handleSaveAddress}
                            className="w-full bg-blue-500 text-white px-2 py-1 rounded-md 
                                    hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                        >Save Address</button>
                    </div>
                </div>



                {/* Left */}
                <div className="w-1/2">
                    <div className="bg-gray-100 p-4 rounded-md border border-gray-200 shadow-md space-y-4">
                        <h1 className="text-lg font-bold">คำสั่งซื้อของคุณ</h1>

                        {/* Item List */}

                        {
                            products?.map((item, index) =>
                                <div key={index}>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="font-bold">{item.product.title}</p>
                                            <p className="text-sm">จำนวน: {item.count} * {numberFormat(item.product.price)}</p>
                                        </div>

                                        <div>
                                            <p className="text-red-500 font-bold">{numberFormat(item.product.price * item.count)}.-</p>
                                        </div>
                                    </div>

                                </div>
                            )
                        }





                        <div>
                            <div className="flex justify-between">
                                <p>ค่าจัดส่ง:</p>
                                <p>0.00</p>
                            </div>

                            <div className="flex justify-between">
                                <p>ค่าส่วนลด:</p>
                                <p>0.00</p>
                            </div>

                        </div>
                        <div>
                            <hr />
                            <div className="flex justify-between">
                                <p className="font-bold">ยอดรวมสุทธิ:</p>
                                <p className="text-lg text-red-500 font-bold">{numberFormat(cartTotal)}</p>
                            </div>
                        </div>

                        <div>
                            <button
                            onClick={handlePayment}
                                className="w-full bg-blue-500 text-white px-2 py-1 rounded-md 
                                    hover:bg-blue-600 hover:scale-105 transition-all duration-300">
                                ชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SummaryCard