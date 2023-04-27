import { combineReducers } from 'redux'
import { blogPostsReducer, notificationReducer } from './blogReducer'

const reducers = combineReducers({
    blogNotification: notificationReducer,
    allblogPosts: blogPostsReducer,
})

export default reducers
