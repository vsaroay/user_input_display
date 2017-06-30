import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import Search from './components/Search'
import Display from './components/Display'
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
          <header>
            <nav className="nav-bar">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
              </ul>
            </nav>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/search" component={Search}/>
              <Route path="/display" component={Display}/>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;