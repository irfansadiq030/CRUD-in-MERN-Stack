import { createStore, combineReducers, applyMiddleware } from "redux";
import { UserReducer } from "./reducer/UserReducer";
import thunk from 'redux-thunk'


import { composeWithDevTools } from 'redux-devtools-extension';

let initialState = {}
const middleware = [thunk]
const reducer = combineReducers({
    users: UserReducer
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store