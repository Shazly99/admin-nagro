import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Component from 'constants/Component';
import FetchApiContext, { FetchApi } from 'context/FetchApi';
import LangChange from 'context/LangChange';
import './style/App.scss';
import { Tooltip } from 'primereact/tooltip';

function App() {

  function ProtectedRoutes({ children }) {
    let token = localStorage.getItem('tokenNagro')
    if (!token) {
      return <Navigate to="/admin/login" replace={true} />
    } else {
      return children;
    }
  }
  const root = createBrowserRouter([
    {
      path: '', element: <Component.Nagro />, children: [
        { index: true, element: <ProtectedRoutes><Component.Dashboard /></ProtectedRoutes> },
        {
          path: '/about', children: [
            { index: true, element: <ProtectedRoutes><Component.AboutData /></ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes><Component.AddAbout /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes><Component.UpdateAbout /></ProtectedRoutes> }
          ]
        },
        {
          path: '/why-us', children: [
            { index: true, element: <ProtectedRoutes><Component.WhyUsData /></ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes><Component.AddWhyUs /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes><Component.UpdateWhyUs /></ProtectedRoutes> }
          ]
        },

        {
          path: '/contributors', children: [
            { index: true, element: <ProtectedRoutes><Component.Contributors /></ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes><Component.AddContributors /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes><Component.UpdateContributors /></ProtectedRoutes> }
          ]
        },

        {
          path: '/services', children: [
            { index: true, element: <ProtectedRoutes><Component.ServicesData /></ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes><Component.AddServices /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes><Component.UpdateServices /></ProtectedRoutes> }
          ]
        },

        {
          path: '/blogs', children: [
            { index: true, element: <ProtectedRoutes><Component.Blogs /></ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes><Component.AddBlogs /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes><Component.UpdateBlogs /></ProtectedRoutes> }
          ]
        },
 
        {
          path: '/clients', children: [
            { index: true, element: <ProtectedRoutes><Component.Clients /></ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes><Component.AddClients /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes><Component.UpdateClients /></ProtectedRoutes> }
          ]
        },
        { path: '/profile', element: <Component.Profile /> },
        { path: '/contact-us', element: <ProtectedRoutes><Component.ContactUs /></ProtectedRoutes> },

        {
          path: '*', element: <Component.Error />
        }
      ],
    },
    {
      path: '/admin/', element: <Component.Auth />, children: [
        { path: 'login', element: <Component.Login /> },
      ]
    },
  ])
  const tooltipOptions = {
    position: 'top',
    // يمكنك تحديد لون الخلفية هنا
    style: { backgroundColor: 'blue' },
  };

  return (
    <div className="App">
      <Tooltip target=".disabled-button" autoHide={false} options={tooltipOptions}/> 

      <FetchApiContext>
        <LangChange>
          <RouterProvider router={root} />
        </LangChange>
      </FetchApiContext>
    </div>
  );
}

export default App;
