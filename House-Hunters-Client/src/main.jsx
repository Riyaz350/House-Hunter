import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Main from './Layout/Main/Main.jsx';
import Owner from './Layout/Dashboard/Owner/Owner.jsx';
import LogIn from './Authentication/LogIn/LogIn.jsx';
import Register from './Authentication/Register/Register.jsx';
import AuthProvider from './Authentication/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Renter from './Layout/Dashboard/Renter/Renter.jsx';
import Home from './Layout/Home/Home.jsx';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/owner",
        element: <Owner></Owner>
      },
      {
        path: "/renter",
        element: <Renter></Renter>
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
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
