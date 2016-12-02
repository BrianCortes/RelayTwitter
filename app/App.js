var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
var Relay = require('react-relay');
import Main from './components/Main';
import useRelay from 'react-router-relay';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://www.graphqlhub.com/graphql')
)

const AppQueries = {
  store: (Component) => Relay.QL `query {
    twitter {
      ${Component.getFragment('store')}
    }
  }`
};


ReactDOM.render(
	<Router
    forceFetch
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
	>
		 <Route path='/' component={Main} queries={AppQueries} />	
	</Router>,
  document.getElementById('app')
)