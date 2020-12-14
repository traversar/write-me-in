import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import LoginPanel from './components/LoginPanel';
import StoryBrowser from './components/StoryBrowser';
import StoryView from './components/StoryView';
import StoryEditor from './components/StoryEditor';
import * as AuthActions from './actions/authentication';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true ?
        <Redirect to='/login' />
      :
        <Component {...props} />
  )} />
)

const App = ({ needLogin, loadToken }) => {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    loadToken();
    setLoaded(true);

    console.log(needLogin)

  }, [loaded]);

  if(!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <main>
        <Switch>
          <PrivateRoute path="/"
            exact
            needLogin={needLogin}
            component={StoryBrowser} />
          <PrivateRoute path="/login"
            exact
            component={LoginPanel} />
          <PrivateRoute path="/stories/:storyId/page/:pageNum"
            exact
            needLogin={needLogin}
            component={StoryView} />
          <PrivateRoute path="/write"
            exact
            needLogin={needLogin}
            component={StoryEditor} />
          <PrivateRoute path="/write/:storyId"
            exact
            needLogin={needLogin}
            component={StoryEditor} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

const AppContainer = () => {
  const dispatch = useDispatch()
  const needLogin = useSelector(state => !state.authentication.token);
  const loadToken = () => dispatch(AuthActions.loadToken());

  return <App needLogin={needLogin} loadToken={loadToken} />
}

export default AppContainer;
