let React    = require('react');
let ReactDOM = require('react-dom');
let Relay    = require('react-relay');

class Item extends React.Component {
  render() {
    let item = this.props.store.user;
    debugger
    return (
      <div>
        <h1><a href="">{item.name}</a></h1>
        <h2></h2>
        <hr />
      </div>
    );
  }
};
Item = Relay.createContainer(Item, {
  initialVariables: {
    identity: "rulo_neitor"
  },
  fragments: {
    store: () => Relay.QL`
      fragment on TwitterAPI {
        user(identifier: name , identity: $identity){
          id,
          name
        },
      }
    `,
  },
});

class HackerNewsRoute extends Relay.Route {
  static routeName = 'HackerNewsRoute';
  static queries = {
    store: ((Component) => {
      // Component is our Item
      return Relay.QL`
      query root {
        twitter { ${Component.getFragment('store')} },
      }
    `}),
  };
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://www.graphqlhub.com/graphql')
);

let mountNode = document.getElementById('container');
let rootComponent = <Relay.RootContainer
  Component={Item}
  route={new HackerNewsRoute()} />;
ReactDOM.render(rootComponent, mountNode);
