import React, { Component, Fragment } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import WardrobePage from './Components/WardrobePage';
import OutfitsPage from './Components/OutfitsPage'
import CustomAppBar from './Components/CustomAppBar'
import { Switch, Route, BrowserRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <CustomAppBar />
          <Switch>
            <Route exact path ='/' Component={Login} />
            <Route exact path='/wardrobe' Component={WardrobePage}/>
            <Route exact path='/outfits' Component={OutfitsPage} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
