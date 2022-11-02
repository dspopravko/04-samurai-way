import {ActionsTypes} from "./redux-store";
import {ThunkDispatch} from "redux-thunk";
import {authAPI, UsersAPI} from "../API/API";
import {
    ProfileReducerACTypes,
    ProfileStateType,
    setFetchingProfileAC,
    setUserFollowAC,
    setUserProfile
} from "./profile-reducer";
import * as axios from "axios";

export type AuthReducerACTypes =
    ReturnType<typeof setUser>
    | ReturnType<typeof setFetching>

export type AuthType = { //API Type
    data: {
        id: number
        login: string
        email: string
    }
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

export const setUser = (payload: AuthType, isFetchingAuth: boolean) => {
    return {
        type: "AUTH-USER",
        data: {
            id: payload.data.id,
            login: payload.data.login,
            email: payload.data.email
        },
        messages: payload.messages,
        fieldsErrors: payload.fieldsErrors,
        resultCode: payload.resultCode,
        isFetchingAuth: isFetchingAuth
    } as const
}
export const setFetching = (isFetchingAuth: boolean) => {
    return {
        type: "SET-FETCHING",
        isFetchingAuth
    } as const
}

let initialState = {
    data: {
        id: 0,
        login: 'samurai',
        email: 'fake@email.com',
    },
    messages: [''],
    fieldsErrors: [''],
    isAuth: false,
    isFetchingAuth: true
}

export type AuthStateType = typeof initialState

export const authReducer = (state: AuthStateType = initialState, action: ActionsTypes): AuthStateType => {
    console.log(action)
    switch (action.type) {
        case 'AUTH-USER': {
            console.log('case: AUTH USER ' + action)
            return {
                ...state,
                data: action.data,
                messages: [...action.messages],
                fieldsErrors: [...action.fieldsErrors],
                isAuth: action.resultCode === 0,
                isFetchingAuth: action.isFetchingAuth,
            }
        }
        case "SET-FETCHING": {
            return {...state, isFetchingAuth: action.isFetchingAuth}
        }
        default:
            return {...state}
    }
}

export const getAuthUserData = () => (dispatch: ThunkDispatch<AuthStateType, void, AuthReducerACTypes>) => {
    authAPI.me().then(response => {
        response.resultCode === 0 && dispatch(setUser(response, true))
    })
}