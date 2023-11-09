import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin';
import './index.css'
import { Theme } from './utils/Theme'
import Addbook from './pages/Addbook';
import Allbooks from './pages/Allbooks';
import Updatebook from './pages/updateBook';
import Borrowedbooks from './pages/Borrowedbooks';
import Books from './pages/Books';
import Details from './pages/Details';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/addbook",
    element: <Addbook />,
  },
  {
    path: "/allbooks",
    element: <Allbooks />,
  },
  {
    path: "/updatebook/:id",
    element: <Updatebook />,
  },
  {
    path: "/borrowedbooks",
    element: <Borrowedbooks />,
  },
  {
    path: "/books/:category",
    element: <Books />,
  },
  {
    path: "/books/details/:id",
    element: <Details />,
  }
]);

 Theme()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);  