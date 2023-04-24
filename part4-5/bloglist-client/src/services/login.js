import axios from 'axios'

const baseUrl = '/api/login'

const login = (loginDetails) => {
    const request = axios.post(baseUrl, loginDetails)
    return request.then((response) => response.data)
}
const loginService = {
    login,
}

export default loginService
