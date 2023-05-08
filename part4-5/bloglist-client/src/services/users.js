import axios from 'axios'
const baseURL = '/api/users'

const getAllUsers = async () => {
    try {
        const response = await axios.get(baseURL)
        return response.data
    } catch (err) {
        console.error('Error: ', err)
    }
}

const usersService = { getAllUsers }

export default usersService
