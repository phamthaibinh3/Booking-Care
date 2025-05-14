import userService from "../services/userService";

let handleLogin = async(req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
        })
    }else{
        let userData = await userService.handleUserLogin(email,password);

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.message,
            user: userData.user
        })  
    }

}

let handleGetAllUsers = async (req,res) => {
    let id = req.query.id;
    if(!id){
        return res.status(500).json({
            errCode: 1,
            message: 'Bạn chưa có id!',
            users: []
        })
    }   
    
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        users
    })
}

let handleCreateNewUser = async(req,res) => {
    let data = req.body;
    let message = await userService.CreateUser(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async(req,res) => {
    let id = req.body.id;
    if(!id){
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Khong truyen id'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}

let handleEditUser = async(req,res) => {
    let data = req.body;

    let message = await userService.editUser(data);

    return res.status(200).json(message)
}


let getAllCode = async(req,res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error: ',e);
        
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
        
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser:handleDeleteUser,
    handleEditUser: handleEditUser,
    getAllCode: getAllCode,
}