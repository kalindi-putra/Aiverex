import { Dashboard } from '../Pages/Students/Dashboard';
import Courses from '../Pages/Students/Courses';
import TakeTest from '../Pages/Students/TakeTest';
// ...import other student components

export const studentRoutes = [
  { path: '/student/dashboard', element: <Dashboard /> },
  { path: '/student/courses', element: <Courses /> },
  { path: '/student/take-test', element: <TakeTest /> },
  // ...other student routes
];
