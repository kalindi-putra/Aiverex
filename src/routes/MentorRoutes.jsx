import MentDashboard from '../Pages/Mentors/Dashboard';
import GitHubExplorer from '../Pages/Mentors/GithubExplorer';
import Mentorship from '../Pages/Mentors/CodeReviewPage';
// ...import other mentor components

export const mentorRoutes = [
  { path: '/mentor/dashboard', element: <MentDashboard /> },
  { path: '/mentor/gitreview', element: <GitHubExplorer /> },
  {path:'/mentor/codeReview',element:<Mentorship/>},
  // ...other mentor routes
];
