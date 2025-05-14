import db from '../models/index'
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isEixtst = checkEmail(email);
            console.log();
            if (isEixtst) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password','firstName','lastName'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0,
                            userData.message = 'OK',

                            delete user.password,
                            userData.user = user
                    } else {
                        userData.errCode = 3,
                            userData.message = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2,
                        userData.message = `User's not found!`
                }
            } else {
                userData.errCode = 1,
                    userData.message = `Your's Email isn't exist in your system. Plz try other email`
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkEmail = (emailUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let email = await db.User.findOne({
                where: { email: emailUser }
            })
            if (email) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let hastUserPassword = (pass) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(pass, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

let CreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.User.findOne({
                where: { email: data.email },
            })
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: `Your email is already in used, Plz try anther email!`
                })
            } else {
                let hashPasswordFromBcrypt = await hastUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Oke'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: inputId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }
            await db.User.destroy({
                where: { id: inputId }
            })
            resolve({
                errCode: 0,
                errMessage: 'The user is deleted'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                })
            } else {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update the user succeeds!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })

            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    CreateUser: CreateUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllCodeService: getAllCodeService
}