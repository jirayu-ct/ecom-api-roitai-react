import { ListCheck } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createUserCart } from '../../api/user';
import { numberFormat } from '../../utils/number';

const ListCart = () => {

    const cart = useEcomStore((state) => state.carts)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    const token = useEcomStore((state) => state.token)
    const user = useEcomStore((state) => state.user)

    const navigate = useNavigate()

    const handleSaveCart = async () => {
        try{
            const res = await createUserCart(token, { cart })
            toast.success(res.data,{
                position: 'top-center'
            }
            )
            navigate('/checkout')
        }
        catch(err){
            console.log(err)
            toast.warning(err.response.data.message, {
                position: 'top-center'
            })
        }
    }

    return (
        <div className="bg-gray-100 rounded-sm p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <ListCheck size={36} />
                <h1 className="text-2xl font-bold">รายการสินค้า {cart.length} ชิ้น</h1>
            </div>

            {/* List */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Left */}
                <div className='col-span-2'>
                    {/* Card */}
                    {
                        cart.map((item, index) =>

                            <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
                                {/* row 1 */}
                                <div className="flex justify-between mb-2">
                                    {/* Left */}
                                    <div className="flex gap-2 items-center">

                                        {
                                            item.images && item.images.length > 0
                                                ? <img
                                                    src={item.images[0].url}
                                                    className="w-16 h-16 rounded-md"
                                                />
                                                : <div
                                                    className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center"
                                                >
                                                    No. Image
                                                </div>
                                        }


                                        <div>
                                            <p className="font-bold">{item.title}</p>
                                            <p className="text-sm">{numberFormat(item.price)} x {item.count}</p>
                                        </div>


                                    </div>
                                    {/* Right */}
                                    <div>
                                        <div>

                                            <div className="font-bold text-blue-500">
                                                {numberFormat(item.price * item.count)} บาท
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                </div>

                {/* Right */}
                <div className='bg-white p-4 rounded-md shadow-md space-y-4'>
                    <p className='text-2xl font-bold'>ราคารวม</p>
                    <div className='flex justify-between'>
                        <span>รวมสุทธิ</span>
                        <span className='text-2xl'>{numberFormat(getTotalPrice())} บาท</span>
                    </div>

                    <div className='flex flex-col gap-2'>
                        {
                            user
                                ? <Link>
                                    <button 
                                    disabled={cart.length < 1}
                                    onClick={handleSaveCart}
                                    className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>สั่งซื้อ</button>
                                </Link>
                                : <Link to='/login'>
                                    <button className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>Login</button>
                                </Link>
                        }





                        <Link to='/shop'>
                            <button className='w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600'>แก้ไขรายการ</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListCart