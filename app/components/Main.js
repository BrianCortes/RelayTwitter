let React    = require('react');
let Relay    = require('react-relay');



class Item extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
  }
  render() {
    debugger
    return (
      <div>
        <h1><a href=""></a></h1>
       	<h2></h2>
        <hr />
      </div>
    );
  }
};

export default Relay.createContainer(Item, {
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

/*class HackerNewsRoute extends Relay.Route {
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
}*/