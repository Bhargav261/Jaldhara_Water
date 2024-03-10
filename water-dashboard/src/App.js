import React from 'react';
import axios from 'axios';
import { URL } from './API/CommonAPI';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AfterLoginRoute from './Route/AfterLoginRoute'
import BeforeLoginRoute from './Route/BeforeLoginRoute'

function App() {

  axios.defaults.baseURL = URL;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/app/*" element={<AfterLoginRoute />} />
          <Route path="/*" element={<BeforeLoginRoute />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
