import axios from 'axios'

const baseUrl = `${window.location.href}api/persons`

const getAll = () =>{
  return axios.get(baseUrl)
}

const create = newObj =>{
  return axios.post(baseUrl, newObj)
}

const update = (id, newObj) =>{
  return axios.put(`${baseUrl}/${id}`, newObj)
}

const remove = (id) =>{
  return axios.delete(`${baseUrl}/${id}`)
}

const personService = {getAll,create,update,remove}

export default personService