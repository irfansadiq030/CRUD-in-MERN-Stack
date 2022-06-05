import axios from "axios"

const { REQUEST_ALL_USER, ALL_USER_SUCCESS,ALL_USER_FAIL } = require("../constants/UserConstant")

export const getUsers = () => async (dispatch) => {
    try {

        dispatch({
            type: REQUEST_ALL_USER
        })

        const { data } = await axios.get('http://localhost:3500/api/v1/users');

        dispatch({
            type: ALL_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_USER_FAIL,
            payload: error.response.data
        })
    }
}