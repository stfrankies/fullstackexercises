import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import {initializeAnecdotes } from  './reducers/anecdoteReducer'

const App = () => {

  //const notify = useSelector(state => state.notification.message)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
       <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App