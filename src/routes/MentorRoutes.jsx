import MentDashboard from '../Pages/Mentors/Dashboard';
import GitHubExplorer from '../Pages/Mentors/GithubExplorer';
// ...import other mentor components

export const mentorRoutes = [
  { path: '/mentor/dashboard', element: <MentDashboard /> },
  { path: '/mentor/gitreview', element: <GitHubExplorer /> },
  // ...other mentor routes
];
