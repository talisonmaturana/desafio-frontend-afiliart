import React, { Component } from 'react';
import './App.css';

import Header from './components/Navigation/Header/Header';
import About from './components/About/About';
import NotFound from './components/Navigation/NotFound/NotFound';
import CourseManagement from './components/CourseManagement/CourseManagement';

import { Switch, Route } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Header logout={this.logoutHandler} />
        <div className="container pt-3">
          <Switch>
            <Route exact path='/' component={CourseManagement} />
            <Route exact path='/dashboard' component={CourseManagement} />
            <Route path='/courses' component={CourseManagement} />
            <Route path='/about' component={About} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

