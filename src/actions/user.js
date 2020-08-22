import {
    GET_USERS,
    LOGIN_USER,
    AUTHENTICATION_ERROR,
    AUTHENTICATED,
    LOGIN_AUTHENTICATED,
    SAVE_USER,
    API_URL,
    SUCCESS_MESSAGE, CLEAR_MESSAGE, GET_USER
} from "./actionTypes";

import history from "../history";
import axios from "axios";

// const addUser = (newUser) => {
//     return { type: ADD_USER, newUser: newUser }
// };
//  export {addUser}
export function clearMessage() {
    return {type: CLEAR_MESSAGE, error: '', success: ''}

}

export function saveUser(user) {
    return {type: SAVE_USER, currentUser: user}

}
 export function getUsers(users) {
     return { type: GET_USERS, users: users }
 }
export function getUser(user) {
    return { type: GET_USER, currentUser: user }
}

export const axiosGetUsers = (users) => {
    return dispatch => {
        axios.get(`${API_URL}users`,{headers:               {  Authorization: window.localStorage.getItem('token')}
        })
            .then(response => {
                dispatch(getUsers(response.data))
            })
            .catch(e => console.log(e))
    }
}

export const loginUser = (userInfo) => {
    return {type: LOGIN_AUTHENTICATED, currentUser: {userInfo}, success: 'Login Successful'
    }

}


export const userLoginFetch = user => {
    // const { setAuthTokens } = useAuth();
    // const [isLoggedIn, setLoggedIn] = useState(false);

    return dispatch => {
        return fetch(`${API_URL}login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: window.localStorage.getItem('token')
            },
            body: JSON.stringify({user})
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if (data.failure) {
                dispatch(authError(data.failure))

                } else {
                    localStorage.setItem("token", data.jwt)
                    dispatch(loginUser(data.user))
                    dispatch(loginSuccess(data.success))
                }
            })

    }

}
export const authError = error => {
     return {type: AUTHENTICATION_ERROR, error: error, success: '' }
}

export const loginSuccess = success => {
    return {type: SUCCESS_MESSAGE, success: success }
}
export const authenticated = () => {
     return {type: AUTHENTICATED}
}

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch("http://localhost:3000/api/v1/profile", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.message) {
                        // An error will occur if the token is invalid.
                        // If this happens, you may want to remove the invalid token.
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser(data.user))
                    }
                })
        }
    }
}
export const userPostFetch = user => {
    return dispatch => {
        return fetch(`${API_URL}users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: window.localStorage.getItem('token')

            },
            body: JSON.stringify({user})
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message) {
                   console.warn(data.message)
                } else {
                    localStorage.setItem("token", data.jwt)
                    dispatch(saveUser(data.user))
                    // console.log('User fetched, pushing to /')
                    dispatch(loginUser(data.user))
                    // history.push('/')


                }
            })
    }
}

// const loginUser = userObj => ({
//     type: 'LOGIN_USER',
//     payload: userObj
// })