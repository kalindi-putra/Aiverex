import Dashboard from '../Pages/Students/Dashboard';
import Courses from '../Pages/Students/Courses';
import TakeTest from '../Pages/Students/CodeEditor';
import Home2 from '../Pages/Home2';
// ...import other student components

export const studentRoutes = [
  { path: '/student/dashboard', element: <Dashboard /> },
  { path: '/student/courses', element: <Courses /> },
  { path: '/student/take-test', element: <TakeTest /> },
  {path: '/student/home', element: <Home2/>},
  // ...other student routes
];
