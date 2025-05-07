import axios from 'axios';

export const createProduct = async (token, from) => {
    //code body
    return axios.post('http://localhost:3000/api/product', from, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}


export const listProduct = async (count = 20) => {
    //code body
    return axios.get(`http://localhost:3000/api/products/${count}`)
}

export const readProduct = async (token, id) => {
    //code body
    return axios.get(`http://localhost:3000/api/product/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const updataProduct = async (token, id, form) => {
    //code body
    return axios.put(`http://localhost:3000/api/product/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const deleteProduct = async (token, id) => {
    //code body
    return axios.delete(`http://localhost:3000/api/product/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}


export const uploadFiles = async (token, from) => {
    //code body
    // console.log('uploadFiles', from)
    return axios.post('http://localhost:3000/api/images', {
        image: from
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}


export const removeFile = async (token, public_id) => {
    //code body
    // console.log('uploadFiles', from)
    return axios.post('http://localhost:3000/api/removeimage', {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}


export const searchFilters = async (arg) => {
    // code body
    return axios.post("http://localhost:3000/api/search/filters", arg);

}



export const listProductBy = async (sort, order, limit) => {
    // code body
    return axios.post("http://localhost:3000/api/productby", {
        sort,
        order,
        limit
    });

}