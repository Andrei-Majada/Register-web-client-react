import React from 'react';
import {
  Switch,
  Route,
  Redirect,
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
  const [userInfo] = useAuth();

  const renderPublicRoutes = () => (
    publicRoutes.map((routeConfig) => (
      <Route path={routeConfig.path} component={routeConfig.component} />
    ))
  );

  const renderPrivateRoutes = () => (
    <PageWrapper>
      <LateralMenu role={userInfo?.login?.role}/>
      <ContentWrapper>
        {privateRoutes.map((routeConfig) => (
          <Route path={routeConfig.path} component={routeConfig.component} />
        ))}
        
      </ContentWrapper>
    </PageWrapper>
  );

  return (
    <Switch>
      {!userInfo && renderPublicRoutes()}
      {userInfo && renderPrivateRoutes()}
      <Redirect to={'/login'} />
    </Switch>
  );
};

export default Routes;