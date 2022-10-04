import { useDispatch } from 'react-redux'
import { onFiltered } from '../reducers/filterReducer'

const AnecdoteFilter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(onFiltered(event.target.value))
    }

    const style = {
        marginBottom: 10
    }

return ( 
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
    );
}
 
export default AnecdoteFilter;