import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';

import { PageWrapper, ContentWrapper } from './styled';
import LateralMenu from './components/lateralMenu';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Login from './pages/login';
import useAuth from './hooks/useAuth';

const publicRoutes = [
  {
    path: '/login',
    component: Login,
  },
]

const privateRoutes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/meusregistros',
    component: Register,
  },
];

const Routes = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useAuth();
  const location = useLocation();

  const renderPublicRoutes = () => (
    publicRoutes.map((routeConfig) => (
      <Route path={routeConfig.path} component={routeConfig.component} />
    ))
  );

  const renderPrivateRoutes = () => (
    <PageWrapper>
      <LateralMenu />
      <ContentWrapper>
        {privateRoutes.map((routeConfig) => (
          <Route path={routeConfig.path} component={routeConfig.component} />
        ))}
        
      </ContentWrapper>
    </PageWrapper>
  );

  useEffect(() => {
    let login = localStorage.getItem('userInfo');
    let loginToJson = JSON.parse(login)
    let token = loginToJson?.login?.token;
  });

  return (
    <Switch>
      {!userInfo && renderPublicRoutes()}
      {userInfo && renderPrivateRoutes()}
      <Redirect to={userInfo ? '/dashboard' : '/login'} />
    </Switch>
  );
};

export default Routes;
export { privateRoutes };
