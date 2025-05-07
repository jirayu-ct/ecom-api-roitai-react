import { Link, NavLink } from "react-router-dom"
import useEcomStore from "../store/ecom-store"
import { ChevronDown } from 'lucide-react';
import { useState } from "react";


const MainNav = () => {
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const logout = useEcomStore((state) => state.logout)


    const [isOpen, setIsOpen] = useState(false)


    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="bg-white-300 shadow-md">
            <div className="mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-4">



                        <Link to={'/'} className="text-2xl font-bold">LOGO</Link>

                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                    : 'hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                            }
                            to={'/'}
                        >Home</NavLink>



                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                    : 'hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                            }
                            to={'/shop'}
                        >Shop</NavLink>

                        {/* Badge */}
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                    : 'hover:bg-gray-200 relative py-4 px-3 rounded-md text-sm font-medium'
                            } to={'/cart'}>
                            Cart
                            {
                                carts.length > 0
                                && (<span className="absolute top-0 bg-red-500 rounded-full px-2">
                                    {carts.length}
                                </span>)
                            }

                        </NavLink>
                    </div>

                    {
                        user
                            ? <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 hover:bg-gray-200 px-2 py-3 rounded-md"
                                >
                                    <img
                                        className="w-10"
                                        src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                                    />
                                    <ChevronDown />
                                </button>

                                {/* ถ้ามี isOpen มีค่าเป็น true จะทำด้านหลัง */}
                                {
                                    isOpen &&
                                    <div className="absolute mt-2 top-16 bg-white shadow-md z-50">
                                        <Link
                                            to={'/user/History'}
                                            className="block px-4 py-2 hover:bg-gray-200">
                                            History
                                        </Link>
                                        <button
                                            onClick={() => logout()}
                                            className="block px-4 py-2 hover:bg-gray-200">
                                            Logout
                                        </button>
                                    </div>
                                }


                            </div>

                            : <div className="flex items-center gap-4">

                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                            : 'hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                    } to={'/register'}
                                >Register</NavLink>


                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                            : 'hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                    } to={'/login'}
                                >Login</NavLink>
                            </div>
                    }




                </div>

            </div>
        </nav>
    )
}
export default MainNav