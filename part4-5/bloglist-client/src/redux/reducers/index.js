import { combineReducers } from 'redux'
import {
    blogPostsReducer,
    notificationReducer,
    signedInUserReducer,
} from './blogReducer'

const reducers = combineReducers({
    blogNotification: notificationReducer,
    allblogPosts: blogPostsReducer,
    loggedInUser: signedInUserReducer,
})

export default reducers
