import './App.css';
import { useRoutes } from 'react-router';
import RootLayout from './components/RootLayout';
import CandidateRegistration from './components/CandidateRegistration';
import CandidateList from './components/CandidateList';
import Home from './components/Home';

function App() {

  const elements = useRoutes([{
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />
      },
      {
      path: '/candidate/registration',
      element: <CandidateRegistration />
    },
    {
      path: '/candidate/list',
      element: <CandidateList />
    }]
}]);
  return (
    <div className="App">
      {elements}
    </div>
  );
}

export default App;
