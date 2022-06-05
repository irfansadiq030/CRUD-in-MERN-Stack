const {REQUEST_ALL_USER, ALL_USER_SUCCESS,ALL_USER_FAIL } = require("../constants/UserConstant");

export const UserReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case REQUEST_ALL_USER:

            return {
                loading: true,
                users: []
            }
        case ALL_USER_SUCCESS:

            return {
                loading: false,
                users:action.payload.user
            }
        case ALL_USER_FAIL:

            return {
                loading: false,
                error:action.payload
            }

        default:
            return state
            
    }

}