import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import Search from './components/Search'
import Display from './components/Display'
import Repository from './components/Repository'
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom'

//*********************************************//

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/search" className="nav-link">Search</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/search" component={Search}/>
              <Route path="/display" component={Display}/>
              <Route path="/repos" component={Repository}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;