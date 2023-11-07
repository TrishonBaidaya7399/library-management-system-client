import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Root from './Route/Root';
import Login from './Pages/Login Page/Login';
import SignUp from './Pages/SignUp/SignUp';
import AddBooks from './Pages/AddBooks/AddBooks';
import UpdateBook from './Pages/UpdateBook/UpdateBook';
import BookDetails from './Pages/BookDetails/BookDetails';
import DramaBooks from './Pages/CategoryBooks/DramaBooks';
import HistoryBooks from './Pages/CategoryBooks/HistoryBooks';
import NovelBooks from './Pages/CategoryBooks/NovelBooks';
import ReligiousBooks from './Pages/CategoryBooks/ReligiousBooks';
import SciFiBooks from './Pages/CategoryBooks/SciFiBooks';
import ThrillerBooks from './Pages/CategoryBooks/ThrillerBooks';
import AllBooks from './Pages/All Books/AllBooks';
import AuthProvider from './Provider/AuthProvider';
import PrivateRoute from './Provider/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: '/',
        element: <Home/>,
        loader: ()=> fetch("http://localhost:5000/books")
      },
      {
        path: '/signin',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      },
      {
        path: '/addbooks',
        element: <PrivateRoute><AddBooks/></PrivateRoute>
      },
      {
        path: '/updatebook',
        element: <PrivateRoute><UpdateBook/></PrivateRoute>
      },
      {
        path: '/allbooks',
        element: <PrivateRoute><AllBooks/></PrivateRoute>,
        loader: ()=> fetch("http://localhost:5000/books")
      },
      {
        path: '/bookdetails/:id',
        element: <PrivateRoute><BookDetails/></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/books/${params.id}`)
        
      },
      {
        path: '/dramabooks',
        element: <PrivateRoute><DramaBooks/></PrivateRoute>,
        loader: ()=> fetch("http://localhost:5000/books")
      },
      {
        path: '/historybooks',
        element: <PrivateRoute><HistoryBooks/></PrivateRoute>,
        loader: ()=> fetch("http://localhost:5000/books")
      },
      {
        path: '/novelbooks',
        element: <PrivateRoute><NovelBooks/></PrivateRoute>,
        loader: ()=> fetch("http://localhost:5000/books")
      },
      {
        path: '/religiousbooks',
        element: <PrivateRoute><ReligiousBooks/></PrivateRoute>,
        loader: ()=> fetch("http://localhost:5000/books")
      },
      {
        path: '/scifibooks',
        element: <PrivateRoute><SciFiBooks/></PrivateRoute>,
        loader: ()=> fetch("http://localhost:5000/books")
      },
      {
        path: '/thrillerbooks',
        element: <PrivateRoute><ThrillerBooks/></PrivateRoute>,
        loader: ()=> fetch("http://localhost:5000/books")
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
