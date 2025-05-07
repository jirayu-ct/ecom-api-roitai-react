import axios from 'axios'

// http://localhost:3000/api/admin/orders

export const getOrdersAdmin = async (token, id) => {
    //code body
    return axios.get(`http://localhost:3000/api/admin/orders`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

// http://localhost:3000/api/admin/order-status

export const changeOrderStatus = async (token, orderId, orderStatus) => {
    //code body
    return axios.put(`http://localhost:3000/api/admin/order-status`,
        {
            orderId,
            orderStatus
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
}

// http://localhost:3000/api/users
export const getListAllUsers = async (token) => {
    //code body
    return axios.get(`http://localhost:3000/api/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

// http://localhost:3000/api/change-status
export const changeUserStatus = async (token, value) => {
    //code body
    return axios.post(`http://localhost:3000/api/change-status`, value, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}


// http://localhost:3000/api/change-role
export const changeUserRole = async (token, value) => {
    //code body
    return axios.post(`http://localhost:3000/api/change-role`, value, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}