import { useSelector } from 'react-redux'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {

  const notify = useSelector(state => state.notification.message)

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
       {notify && <Notification />}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App