import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const createBlog = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const updateBlog = async (id, data) => {
    const response = await axios.put(`${baseUrl}/${id}`, data)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    await axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = async (blogId, comment, setComment) => {
    try {
        await axios.post(`${baseUrl}/${blogId}/comments`, { comment })
        // setComment("");
        window.location.reload()
    } catch (error) {
        console.error(error)
    }
}

const blogService = {
    getAll,
    setToken,
    createBlog,
    updateBlog,
    deleteBlog,
    addComment,
}

export default blogService
