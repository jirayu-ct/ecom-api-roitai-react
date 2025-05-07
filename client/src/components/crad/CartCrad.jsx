import { Trash2, Minus, Plus } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link } from 'react-router-dom'
import { numberFormat } from '../../utils/number';

const CartCrad = () => {
    const carts = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>
            <div className="border p-4 rounded-lg space-y-4">
                {carts.map((item, index) => (
                    <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                        <div className="flex gap-3 mb-3">
                            <div className="flex-shrink-0">
                                {item.images && item.images.length > 0 ? (
                                    <img
                                        src={item.images[0].url}
                                        className="w-16 h-16 rounded-md object-cover"
                                        alt={item.title}
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                        <span className="text-sm text-gray-500">No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow min-w-0">
                                <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                            </div>
                            <button
                                onClick={() => actionRemoveProduct(item.id)}
                                className="text-red-500 hover:text-red-600 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center border rounded-md">
                                <button
                                    className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                    onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-3">{item.count}</span>
                                <button
                                    className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                    onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="font-bold text-blue-600">
                                {numberFormat(item.price * item.count)} บาท
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex justify-between items-center border-t pt-3">
                    <span className="font-semibold">รวม</span>
                    <span className="font-bold text-lg text-blue-600">{numberFormat(getTotalPrice())} บาท</span>
                </div>

                <Link to="/cart" className="block">
                    <button className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors">
                        ชำระเงิน
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default CartCrad