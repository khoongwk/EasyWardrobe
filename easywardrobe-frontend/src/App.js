import React, { Component, Fragment } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import WardrobePage from './Components/Wardrobe/WardrobePage';
import OutfitsPage from './Components/OutfitsPage/OutfitsPage';
import CustomAppBar from './Components/CustomAppBar';
import Home from './Components/Home/Home';
import { Switch, Route, BrowserRouter } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    }
    this.onAuthenticateHandler = this.onAuthenticateHandler.bind(this)
    this.onLogoutHandler = this.onLogoutHandler.bind(this)
  }

  onAuthenticateHandler() {
    this.setState({isAuthenticated: true})
  }

  onLogoutHandler() {
    this.setState({isAuthenticated: false})
  }

  render() {
    let componentToRender;
    if (this.state.isAuthenticated) {
      componentToRender = 
      <Fragment>
        <BrowserRouter>
          <CustomAppBar onLogoutHandler={this.onLogoutHandler}/>
          <Switch>
            <Route exact path ='/' component={Home} />
            <Route exact path='/wardrobe' component={WardrobePage}/>
            <Route exact path='/outfits' component={OutfitsPage} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    } else {
      componentToRender = <Login onAuthenticateHandler={this.onAuthenticateHandler}/>
    }
    return ( componentToRender );
  }
}

export default App;
