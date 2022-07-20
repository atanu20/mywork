import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Error from './pages/Error';

import './App.css';
// import Navbar from './component/navbar/NavBar';
import NavOne from './component/navbar/NavOne';
import LoginU from './pages/auth/LoginU';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import AddBill from './pages/dashboard/AddBill';
import EditBill from './pages/dashboard/EditBill';
import ShowBill from './pages/dashboard/ShowBill';

const App = () => {
  return (
    <>
      <NavOne />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={LoginU} />
        <Route exact path="/bill/:id" component={ShowBill} />
        <Route exact path="/addBill" component={AddBill} />
        <Route exact path="/:id/edit" component={EditBill} />

        <Route component={Error} />
      </Switch>
    </>
  );
};

export default App;
