import {  createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import SignUp from "./components/auth/SignUp.jsx"
import Login from "./components/auth/Login.jsx"
import Jobs from "./components/Jobs.jsx"
import Browse from "./components/Browse.jsx"
import AdminJobs from "./components/admin/AdminJobs.jsx"
import Companies from "./components/admin/Companies.jsx"
import CompanyCreate from "./components/admin/CompanyCreate.jsx"
import CompanySetup from "./components/admin/CompanySetup.jsx"
import PostJob from "./components/admin/PostJob.jsx"
import Applicants from "./components/admin/Applicants.jsx"
import JobDescription from "./components/JobDescription.jsx"
import Profile from "./components/Profile.jsx"
import MyApplications from "./components/MyApplications.jsx"
import { Toaster } from 'sonner'

function App() {
 
  const appRouter=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/admin/jobs',
      element:<AdminJobs/>
    },
    {
      path:'/admin/jobs/create',
      element:<PostJob/>
    },
    {
      path:'/admin/jobs/:id/applicants',
      element:<Applicants/>
    },
    {
      path:'/admin/companies',
      element:<Companies/>
    },
    {
      path:'/admin/companies/create',
      element:<CompanyCreate/>
    },
    {
      path:'/admin/companies/:id',
      element:<CompanySetup/>
    },
    {
      path:'/jobs',
      element:<Jobs/>
    },
    {
      path:'/description/:id',
      element:<JobDescription/>
    },
    {
      path:'/browse',
      element:<Browse/>
    },
    {
      path:'/applications',
      element:<MyApplications/>
    },
    {
      path:'/signup',
      element:<SignUp/>
    },
    {
      path:'/login',
      element:<Login/>
    }
  ])
  return (
    <>
      <RouterProvider router={appRouter}/>
      <Toaster position="top-center" />
    </>
  )
}

export default App
