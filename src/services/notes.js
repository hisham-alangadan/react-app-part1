import axios from "axios";
const baseUrl = 'http://localhost:3002/api/notes'

// const getAll = () => axios.get(baseUrl).then(response => response.data)

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExistentEntry = {
        id: 213342112,
        content: 'hehe',
        important: true
    }
    return request.then(response => response.data.concat(nonExistentEntry))
}

const create = newObject => axios.post(baseUrl, newObject)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

export default { getAll, create, update }