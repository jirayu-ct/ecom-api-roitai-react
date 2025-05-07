import { useEffect, useState } from "react"
import { changeUserRole, changeUserStatus, getListAllUsers } from "../../api/Admin"
import useEcomStore from "../../store/ecom-store"
import { toast } from "react-toastify"
import { dateFormat } from "../../utils/dateformat"


const TableUsers = () => {
  const token = useEcomStore((state) => state.token)

  const [users, setUsers] = useState([])


  useEffect(() => {
    handleGetUsers(token)
  }, [])

  const handleGetUsers = async (token) => {
    try {
      const res = await getListAllUsers(token)
      console.log(res)
      setUsers(res.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleChangeUserStatus = async (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus
    }

    console.log(userId, userStatus)

    try {
      const res = await changeUserStatus(token, value)
      console.log(res)
      // setUsers(res.data)
      handleGetUsers(token)
      toast.success('Updated Status Successfully!')

    }
    catch (error) {
      console.log(error)
    }
  }
  const handleChangeUserRole = async (userId, userRole) => {
    // console.log(userId, userRole)
    const value = {
      id: userId,
      role: userRole
    }

    try {
      const res = await changeUserRole(token, value)
      // console.log(res)
      // setUsers(res.data)
      handleGetUsers(token)
      toast.success('Updated Role Successfully!')

    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <table className="w-full">
        <thead>

          <tr>
            <th>ลำดับ</th>
            <th>email</th>
            <th>วันที่แก้ไขล่าสุด</th>
            <th>สิทธิ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {
            users?.map((el, i) =>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{el.email}</td>
                <td>{dateFormat(el.updatedAt)}</td>



                <td>
                  <select 
                  value={el.role}
                  onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                  >
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </td>



                <td>
                  {
                    el.enabled
                      ? 'Active'
                      : 'Inactive'
                  }
                </td>

                <td>
                  <button
                    className="bg-yellow-500 p-1 rounded-sm text-white"
                    onClick={() => handleChangeUserStatus(el.id, el.enabled)}
                  >{
                      el.enabled
                        ? 'Disable'
                        : 'Enable'
                    }</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
export default TableUsers