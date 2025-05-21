import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUser, deleteUserService, editeUsersService } from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log(e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log(e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log(e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        let res = await createNewUserService(data);
        if(res && res.errCode === 0){
            dispatch(saveUserSuccess())
            toast.success("Create a new user succeed!");
            dispatch(fetchAllUsers())
        }else{
            dispatch(saveUserFailded())
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUsers = () => {   
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser("ALL")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            fetchAllUsersFailed();
            console.log(e);
        }
    }
}

export const fetchAllUsersSuccess = (allUsers) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: allUsers
})      

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                toast.success("Delete the user succeed!");
                dispatch(fetchAllUsers())
            } else {
                toast.error("Delete the user failed!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user failed!");
            deleteUserFailed();
            console.log(e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editeUsersService(data);
            if(res && res.errCode === 0){
                dispatch(editUserSuccess())
                toast.success("Update the user succeed!");
                dispatch(fetchAllUsers())
            }else{
                dispatch(editUserFailed())
                toast.error("Update the user failed!");
            }
        } catch (e) {
            editUserFailed();
            toast.error("Update the user failed!");
            console.log(e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})