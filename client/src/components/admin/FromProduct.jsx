import { toast } from "react-toastify"
import { createProduct, deleteProduct } from "../../api/product"
import useEcomStore from "../../store/ecom-store"
import { useEffect, useState } from "react"
import Uploadfile from "./Uploadfile"
import { Link } from "react-router-dom"
import { Pencil, Trash2 } from 'lucide-react';
import { numberFormat } from "../../utils/number"
import { dateFormat } from "../../utils/dateformat"

const initialSatate = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}

const FromProduct = () => {
    const token = useEcomStore((state) => state.token)

    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    // console.log(products)

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: '',
        images: []
    })



    useEffect(() => {
        getCategory()
        getProduct(20)
    }, [])

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            setForm(initialSatate)
            getProduct()
            toast.success(`Add Product ${res.data.title} created successfully`)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const res = await deleteProduct(token, id)
                console.log(res)
                getProduct()
                toast.success(`Deleted ${res.data.title}  successfully`)
            }
            catch (error) {
                console.log(error)
                toast.error('Error deleting product')
            }
        }

    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
            <form onSubmit={handleSubmit}>
                <h1>เพิ่มข้อมูลสินค้า</h1>
                <input
                    type="text"
                    className="border"
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder="ชื่อสินค้า"
                    name="title"
                />

                <input
                    type="text"
                    className="border"
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder="description"
                    name="description"
                />
                <input
                    type="number"
                    className="border"
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder="price"
                    name="price"
                />
                <input
                    type="number"
                    className="border"
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder="quantity"
                    name="quantity"
                />
                <select
                    className="border"
                    name="categoryId"
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <hr />
                {/* Upload file */}
                <Uploadfile form={form} setForm={setForm} />

                <button className="bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200">เพิ่มข้อมูลสินค้า</button>

                <hr />
                <br />
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-gray-200 border-b-2 border-gray-300">
                            <th scope="col">No.</th>
                            <th scope="col">รูปภาพ</th>
                            <th scope="col">ชื่อสินค้า</th>
                            <th scope="col">รายละเอียด</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">จำนวน</th>
                            <th scope="col">ขายแล้ว</th>
                            <th scope="col">วันที่อัพเดท</th>
                            <th scope="col">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            products.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>


                                        <td>
                                            {
                                                item.images.length > 0
                                                    ? <img
                                                        className="w-24 h-24 rounded-lg shadow-md"
                                                        src={item.images[0].url}
                                                    />
                                                    : <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        No Image
                                                    </div>
                                            }
                                        </td>


                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{numberFormat(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{ dateFormat(item.updatedAt)}</td>
                                        <td className="flex gap-2">
                                            <p className="bg-yellow-500 text-white p-1 rounded-md hover:scale-105 hover:-translate-y-1 hover:duration-200">
                                                <Link to={`/admin/product/${item.id}`}><Pencil /></Link>
                                            </p>
                                            <p className="bg-red-500 text-white p-1 rounded-md hover:scale-105 hover:-translate-y-1 hover:duration-200">
                                                <Link onClick={() => handleDelete(item.id)}><Trash2 /></Link>
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default FromProduct