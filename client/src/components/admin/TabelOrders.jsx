import { useEffect, useState } from "react"
import { getOrdersAdmin, changeOrderStatus } from "../../api/Admin"
import useEcomStore from "../../store/ecom-store"
import { toast } from 'react-toastify'
import { numberFormat } from "../../utils/number"
import { dateFormat } from "../../utils/dateformat"



const TabelOrders = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        //code body
        handleGetOrder(token)
    }, [])

    const handleGetOrder = async (token) => {
        try {
            const res = await getOrdersAdmin(token)
            setOrders(res.data.orders)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleChangeOrderStatus = async (token, orderId, orderStatus) => {
        //code
        console.log(orderId, orderStatus)
        try {
            const res = await changeOrderStatus(token, orderId, orderStatus)
            console.log(res)
            toast.success(res.data.message)
            handleGetOrder(token)
        }
        catch (error) {
            console.log(error)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Not Process":
                return 'bg-gray-200'
            case "Processing":
                return 'bg-blue-200'
            case "Completed":
                return 'bg-green-200'
            case "Cancelled":
                return 'bg-red-200'
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
            <div>
                <table className="w-full">
                    <thead>

                        <tr className="bg-gray-300">
                            <th>ลำดับ</th>
                            <th>ชื่อผู้ใช้งาน</th>
                            <th>วันที่</th>
                            <th>สินค้า</th>
                            <th>รวม</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders?.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr key={index} className="border border-gray-300 ">
                                        <td className="text-center">{index + 1}</td>
                                        <td>
                                            <p>{item.orderedBy.email}</p>
                                            <p>{item.orderedBy.address}</p>
                                        </td>

                                        <td>
                                            {
                                                dateFormat(item.createdAt)
                                            }
                                        </td>


                                        <td className="px-2 py-4">

                                            {
                                                item.products?.map((product, index) =>
                                                    <li key={index}>
                                                        {product.product.title}
                                                        <span className="text-sm">  {product.count} x {numberFormat(product.product.price)}</span>

                                                    </li>
                                                )
                                            }
                                        </td>


                                        <td>{numberFormat(item.cartTotal)}</td>


                                        <td>
                                            <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                                {item.orderStatus}
                                            </span>
                                        </td>



                                        <td>
                                            <select
                                                value={item.orderStatus}
                                                onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                                            >
                                                <option>Not Process</option>
                                                <option>Processing</option>
                                                <option>Completed</option>
                                                <option>Cancelled</option>
                                            </select>
                                        </td>



                                    </tr>
                                )
                            })
                        }



                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TabelOrders