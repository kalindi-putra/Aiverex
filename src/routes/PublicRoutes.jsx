import Home2 from '../Pages/Home2';
import LoginPage from '../Pages/Auth/Login';
import Registration from '../Pages/Auth/Register';

export const publicRoutes = [
  { path: '/', element: <Home2 /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <Registration /> }
];
