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
import Borrow from './Pages/Borrow/Borrow';
import ErrorPage from './Error Page/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home/>,
        loader: ()=> fetch("https://library-management-system-server-phi.vercel.app/books")
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
        path: '/updatebook/:id',
        element: <PrivateRoute><UpdateBook/></PrivateRoute>,
        loader: ({params})=> fetch(`https://library-management-system-server-phi.vercel.app/books/${params.id}`)
      },
      {
        path: '/borrowed',
        element: <PrivateRoute><Borrow/></PrivateRoute>,
        loader: ()=> fetch(`https://library-management-system-server-phi.vercel.app/books`)
      },
      {
        path: '/allbooks',
        element: <PrivateRoute><AllBooks/></PrivateRoute>,
        loader: ()=> fetch("https://library-management-system-server-phi.vercel.app/books")
      },
      {
        path: '/bookdetails/:id',
        element: <PrivateRoute><BookDetails/></PrivateRoute>,
        loader: ({params})=> fetch(`https://library-management-system-server-phi.vercel.app/books/${params.id}`)
        
      },
      {
        path: '/dramabooks',
        element: <PrivateRoute><DramaBooks/></PrivateRoute>,
        loader: ()=> fetch("https://library-management-system-server-phi.vercel.app/books")
      },
      {
        path: '/historybooks',
        element: <PrivateRoute><HistoryBooks/></PrivateRoute>,
        loader: ()=> fetch("https://library-management-system-server-phi.vercel.app/books")
      },
      {
        path: '/novelbooks',
        element: <PrivateRoute><NovelBooks/></PrivateRoute>,
        loader: ()=> fetch("https://library-management-system-server-phi.vercel.app/books")
      },
      {
        path: '/religiousbooks',
        element: <PrivateRoute><ReligiousBooks/></PrivateRoute>,
        loader: ()=> fetch("https://library-management-system-server-phi.vercel.app/books")
      },
      {
        path: '/scifibooks',
        element: <PrivateRoute><SciFiBooks/></PrivateRoute>,
        loader: ()=> fetch("https://library-management-system-server-phi.vercel.app/books")
      },
      {
        path: '/thrillerbooks',
        element: <PrivateRoute><ThrillerBooks/></PrivateRoute>,
        loader: ()=> fetch("https://library-management-system-server-phi.vercel.app/books")
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
