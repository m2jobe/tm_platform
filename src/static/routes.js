import React from 'react';
import { Route, Switch } from 'react-router';
import { PlayerView, HomeView, MainView, LoginView, ProtectedView, NotFoundView } from './containers';
import requireAuthentication from './utils/requireAuthentication';

export default(
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/player" component={PlayerView} />
        <Route exact path="/app" component={MainView} />
        <Route path="/login" component={LoginView} />
        <Route path="/protected" component={requireAuthentication(ProtectedView)} />
        <Route path="*" component={NotFoundView} />
    </Switch>

);
