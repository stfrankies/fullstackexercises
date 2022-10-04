import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {

  const notify = useSelector(state => state.notification.message)

  return (
    <div>
      <h2>Anecdotes</h2>
       {notify && <Notification />}
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App