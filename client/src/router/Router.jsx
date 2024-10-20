import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';

const Router = () => {

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <LandingPage/>
        },
        {
            path: '/signin',
            element: <SignInPage/>
        },
        {
            path: '/signup',
            element: <SignUpPage/>
        },
        {
          path: '/home',
          element: <HomePage/>
        }
    ])

  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default Router
