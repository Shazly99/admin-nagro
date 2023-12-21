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
          path: '/users', children: [
            { index: true, element: <ProtectedRoutes><Component.UserData /></ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes><Component.AddUsers /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes><Component.UpdateUsers /></ProtectedRoutes> }
          ]
        },
 
        { path: '/profile', element: <Component.Profile /> },


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
