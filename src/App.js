
import './App.css';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect, useState, usestate } from 'react';

function App() {

  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [token1, setToken1] = useState()


  // for checking acess token 
  async function calltoken() {
    try {
      const response = await axios.get("http://localhost:4000/accesstoken", {
        headers: {
          authorization: `Bearer ${token1}`
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    async function calltoken() {
      const token = await getAccessTokenSilently();
      setToken1(token)
    }
    calltoken()
    console.log('token1', token1)
  }, [calltoken])


  // call api with jwt token
  async function callapi() {

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }
    // axios
    //   .get('http://localhost:4000/')
    //   .then(response => console.log(response.data))
    //   .catch(error => console.log(error.message))

  }


  // call api with jwt token
  async function callProtectedApi() {

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }


    // axios
    //   .get('http://localhost:4000/protected')
    //   .then(response => console.log(response.data))
    //   .catch(error => console.log(error.message))
  }

  return (
    <div className="App">
      <h1>Auth0 authentication</h1>
      <ul>
        <li><button onClick={loginWithPopup}>Login with Popup</button></li>
        <li><button onClick={loginWithRedirect}>Login with Redirect</button></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
      <h3>User is {isAuthenticated ? " Logged in" : "Not logged in"}</h3>
      <ul>
        <li>
          <button onClick={callapi}>Call API</button>
        </li>
        <li>
          <button onClick={callProtectedApi}>Call protected API Route</button>
        </li>
        <li>
          <button onClick={calltoken}>Call protected API Route</button>
        </li>
      </ul>
      {
        isAuthenticated && (
          <pre style={{ textAlign: 'start', whiteSpace: 'normal' }}>{JSON.stringify(user, 2, null)}</pre>)
      }
    </div>
  );
}

export default App;
