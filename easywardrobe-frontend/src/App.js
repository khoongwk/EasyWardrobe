import React, { Component, Fragment } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import WardrobePage from './Components/WardrobePage';
import OutfitsPage from './Components/OutfitsPage';
import CustomAppBar from './Components/CustomAppBar';
import Home from './Components/Home/Home';
import { Switch, Route, BrowserRouter } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <CustomAppBar />
          <Switch>
            <Route exact path ='/' component={Home} />
            <Route exact path='/wardrobe' component={WardrobePage}/>
            <Route exact path='/outfits' component={OutfitsPage} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
