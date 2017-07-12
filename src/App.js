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
          <div>
            <nav className="nav-bar">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
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