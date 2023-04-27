import { ActionTypes } from '../constants/action-types'

const initialState = {
    notification: [],
    blogs: [],
    user: null,
}

const notificationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_NOTIFICATION:
            return { ...state, notification: payload }

        default:
            return state
    }
}

const blogPostsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_BLOG_POSTS:
            return { ...state, blogs: payload }

        default:
            return state
    }
}

const signedInUserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_SIGNED_IN_USER:
            return {}

        default:
            break
    }
}

export { notificationReducer, blogPostsReducer, signedInUserReducer }
