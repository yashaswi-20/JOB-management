
import {  createBrowserRouter } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import { RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import SignUp from "./components/auth/SignUp.jsx"
import Login from "./components/auth/Login.jsx"


function App() {
 
  const appRouter=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/signup',
      element:<SignUp/>
    },
    {
      path:'login',
      element:<Login/>
    }
  ])
  return (
    <>
      <RouterProvider router={appRouter}/>

    </>
  )
}

export default App
