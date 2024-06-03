import React,{ useState } from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import CreateUser from './Pages/CreateUser';
import GetUser from './Pages/GetUser';
import UpdateUser from './Pages/UpdateUser';

function App() {
  return(
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetUser />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App
