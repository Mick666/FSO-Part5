import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data.sort((a, b) => b.likes - a.likes)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const increaseLikes = async (updatedBlog) => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

export default { getAll, setToken, create, increaseLikes}