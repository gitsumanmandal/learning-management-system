'use client'
import React from 'react'
import ProfileContextProvider from '@/app/contexts/ProfileContext'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import AppDafaultLayout from '@/app/layouts/AppDafaultLayout'

const App = () => {

  const LazyDashboardPage = React.lazy(() => import('@/app/pageRoutes/DashboardPage'))
  const LazyCoursePage = React.lazy(() => import('@/app/pageRoutes/CoursePage'))
  const LazyNotFoundPage = React.lazy(() => import('@/app/pageRoutes/NotFoundPage'))

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<AppDafaultLayout />}>

        <Route index element={
          <React.Suspense>
            <LazyDashboardPage />
          </React.Suspense>
        }></Route>

        <Route path='/course' element={
          <React.Suspense>
            <LazyCoursePage />
          </React.Suspense>
        }></Route>

        <Route path='*' element={
          <React.Suspense>
            <LazyNotFoundPage />
          </React.Suspense>
        }></Route>

      </Route>
    )
  )

  return (
    <ProfileContextProvider>
      <RouterProvider router={router} />
    </ProfileContextProvider>
  )
}

export default App