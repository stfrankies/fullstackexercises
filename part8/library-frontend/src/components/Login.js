import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../gqlactions";

const Login = ({setToken, show})=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(USER_LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(()=>{
        if(result.data){
            const jwt = result.data.login.value
            setToken(jwt)
            localStorage.setItem('authToken', jwt)
        }
    }, [result.data])

    if(!show){
        return null
    }
    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })

        setUsername('')
        setPassword('')
    }

    return(
        <div>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                         value={username}
                         onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input 
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login