import { ActionTypes } from '../constants/action-types'

const setNotification = (notification) => {
    return {
        type: ActionTypes.SET_NOTIFICATION,
        payload: notification,
    }
}

const setBlogPosts = (blogs) => {
    return {
        type: ActionTypes.SET_BLOG_POSTS,
        payload: blogs,
    }
}

const setSignedInUser = (user) => {
    return {
        type: ActionTypes.SET_SIGNED_IN_USER,
        payload: user,
    }
}

export { setNotification, setBlogPosts, setSignedInUser }
