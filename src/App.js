import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Character from './character/Character';
import Detail from './detail/Detail';
import Header from './header/Header';
import './App.css';

function App() {
  return (
    <div className="App">


      <div>

        <Header/>
        <Router>
          <Switch>

            <Route exact path="/" component={Character}/>

            <Route path="/detail/:id" component={Detail}/>

          </Switch>
        </Router>


      </div>
    </div>
  );
}



export default App;
