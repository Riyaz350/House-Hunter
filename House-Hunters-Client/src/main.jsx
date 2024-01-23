import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Main from './Layout/Main/Main.jsx';
import Owner from './Layout/Dashboard/Owner/Owner.jsx';
import LogIn from './Authentication/LogIn/LogIn.jsx';
import Register from './Authentication/Register/Register.jsx';
import AuthProvider from './Authentication/AuthContext/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Owner></Owner>
      },
      {
        path:"/logIn",
        element:<LogIn></LogIn>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
