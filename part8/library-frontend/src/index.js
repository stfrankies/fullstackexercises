import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

const hostname = window.location.hostname

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('authToken')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null
        }
    }
})

const httpLink = createHttpLink({
    uri: `http://${hostname}:4000/`
})


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}><App /></ApolloProvider>
)