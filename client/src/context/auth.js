import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {
    const [user, setUser] = useState(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const storeToken = token => {
		localStorage.setItem('authToken', token)
	}

	const verifyStoredToken = () => {
		// check local storage if there is a token
		const storedToken = localStorage.getItem('authToken')
		if (storeToken) {
			return axios.get('api/auth/verify', { headers: { Authorization: `Bearer ${storedToken}` } })
				.then(response => {
					const user = response.data
					setUser(user)
					setIsLoggedIn(true)
					setIsLoading(false)
				})
				.catch(err => {
					// the token is invalid
					setIsLoggedIn(false)
					setUser(null)
					setIsLoading(false)
				})
		} else {
			// there is no token in the local storage
			setIsLoading(false)
		}
	}
	const logoutUser = () => {
		// remove the token from the local storage
		localStorage.removeItem('authToken')
		// update the state
		setIsLoggedIn(false)
		setUser(null)
	}
    useEffect(() => {
		verifyStoredToken()
	}, [])

    return (
        <AuthContext.Provider value={{ user, storeToken, verifyStoredToken, isLoggedIn, isLoading, logoutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }