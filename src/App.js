import './App.css';
import React, { useState } from 'react'
import {Route, Switch, HashRouter} from 'react-router-dom'
import {} from 'react-dom'
import SignIn from './componets/SignIn/SignIn'
import LoggedIn from './componets/LoggedIn/LoggedIn';

function App() {
  const [user, setUser] = useState({})
  const [signedIn, setSignedIn] = useState(false)
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <SignIn setUser={setUser} setSignedIn={setSignedIn}/>
        </Route>
        <Route path='/loggedin'>
          <LoggedIn user={user} signedIn={signedIn} setSignedIn={setSignedIn}/>
        </Route>
      </Switch>
    </div>
    </HashRouter>
    
  );
}

export default App;
