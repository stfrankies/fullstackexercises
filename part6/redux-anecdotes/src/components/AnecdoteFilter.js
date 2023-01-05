import { connect } from 'react-redux'
import { onFiltered } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {

    const handleChange = (event) => {
        props.onFiltered(event.target.value)
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
 
export default connect(null, {onFiltered})(AnecdoteFilter);


