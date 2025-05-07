import { toast } from "react-toastify"
import { createProduct, readProduct, updataProduct } from "../../api/product"
import useEcomStore from "../../store/ecom-store"
import { useEffect, useState } from "react"
import Uploadfile from "./Uploadfile"
import { useParams, useNavigate } from "react-router-dom"


const initialSatate = {
    title: "GeForce RTX 4090 super",
    description: "desc",
    price: 50500,
    quantity: 5,
    categoryId: '',
    images: []
}

const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state) => state.token)


    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    // console.log(products)

    const [form, setForm] = useState(initialSatate)



    useEffect(() => {
        getCategory()
        fetchProduct(token, id, form)

    }, [])

    const fetchProduct = async (token, id, form) => {
        try{
            const res = await readProduct(token, id, form)
            console.log('fetchProduct', res.data)
            setForm(res.data)
        }
        catch (error) {
            console.log('Error fetchProduct', error)
        }
    }

    console.log('FormEditProduct', form)

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
            const res = await updataProduct(token, id, form)
            toast.success(`Add Product ${res.data.title} created successfully`)
            navigate('/admin/product')
        }
        catch (error) {
            console.log(error)
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

                <button className="bg-blue-500">แก้ไขข้อมูลสินค้า</button>
            </form>
        </div>
    )
}
export default FormEditProduct