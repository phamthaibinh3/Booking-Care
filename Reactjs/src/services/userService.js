import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user',data)
}

const deleteUserService = (inputId) => {
    return axios.delete('/api/delete-user',{data: {id: inputId}})
}

const editeUsersService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

export {
    handleLoginApi,
    getAllUser,
    createNewUserService,
    deleteUserService, editeUsersService,
    getAllCodeService
}