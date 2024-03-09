import React from 'react';
import axios from 'axios';
import { URL } from './API/CommonAPI';
import Router from "./Route/Router";

function App() {

  axios.defaults.baseURL = URL;

  return (
    <>
      <Router />
    </>
  );
}

export default App;
