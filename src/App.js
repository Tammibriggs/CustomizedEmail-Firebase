import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Profile from './Profile'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import {useState, useEffect} from 'react'
import {AuthProvider} from './AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    setFetching(true)
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setFetching(false)
    })
  }, [])

  return (
    <Router>
      {!fetching &&
        <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
          <Switch>
            <PrivateRoute exact path="/" component={Profile} />
            {!currentUser?.emailVerified
              ? <>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path='/verify-email' component={VerifyEmail} /> 
                </>
              : <Redirect to='/'/>
            }
          </Switch>  
        </AuthProvider>
      }
    </Router>
  );
}

export default App;
