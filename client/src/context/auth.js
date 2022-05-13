import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = React.createContext()


function AuthProviderWrapper(props) {
    const [user, setUser] = useState(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const storeToken = token => {
		// store this token in local storage
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
			// there is no token in local storage
			setIsLoading(false)
		}
	}
    useEffect(() => {
		verifyStoredToken()
	}, [])

    return (
        <AuthContext.Provider value={{ user, storeToken, verifyStoredToken, isLoggedIn, isLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }