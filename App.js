let React    = require('react');
let ReactDOM = require('react-dom');
let Relay    = require('react-relay');

class parentContainer extends React.Component {
  textSearch(e){
  debugger

  }
  render() {
    let item = this.props.store.user;
    let tweets = this.props.store.search
    debugger
    return (
      <div>
          <div className="head">
            <img className="imgPerfil" src="./img/pechu.jpg" alt=""/>
            <div className="contentTittle">
              <a href="#" className="tittleWeb">Relay con graphql y React</a>
              <img className="corazon" src="./img/corazon.png" alt=""/>
            </div>
          </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">account_circle</i>
            <input id="icon_prefix" 
              type="text" className="validate"
              onChange={value => this.textSearch(value)}>
            </input>
            <label for="icon_prefix">Usuarios en Twitter</label>
          </div>
        </div>
        <a className="waves-effect waves-light btn buttonBuscar"
          onClick={value => this.userSearch(value)}>buscar
        </a>
        <Item item = { item } />
        <Tweets tweets = { tweets } userSearch={this.userSearch}h/>
      </div>
    );
  }
  textSearch(value){
    debugger
    this.setState({name: value.target.value})
  }
  userSearch(variable){
    debugger
    this.props.relay.setVariables({
      identity: this.state.name,
    });
  }
};

class Item extends React.Component {
  componentWillMount(){
    var nameUserTwitter
    nameUserTwitter = "rulo_neitor"
    this.setState({nameUserTwitter: "davsket"})
  }
  render() {
    if(this.props.item === undefined){
      return (
          <h1>...</h1>
        )
    }
    let item = this.props.item;
    debugger
    return (
      <div>
        <div className="perfilTwitter col s12">
          <div className="userAndImg">
            <div className="nameUser">{item.name}</div>
            <img className="imgUser" src={item.profile_image_url} alt="Smiley face"></img>
          </div>
          <div className="contentInfo">
            <div className="followers">
              <div className="textFollowers">followers</div>
              <div className="valueFollowers">{item.followers_count}</div>
            </div>
            <div className="TWEETS">
              <div className="textFollowers">TWEETS</div>
              <div className="valueFollowers">{item.tweets_count}</div>
            </div>         
          </div>
        </div>
      </div>
    );
  } /*contedor  usuario*/
};

class Tweets extends React.Component {
  render() {
    let tweets = this.props.tweets
    debugger
    var mapTweets = "hola"

    return (
      <div>
        <div className="row">
          <div className="input-field col s9">
            <input id="icon_prefix" type="text" className="validate" onChange={value => this.textSearch(value)}></input>
            <label for="icon_prefix">Busca en Tweets</label>
          </div>
          <div className="col s3">
            <button className="btn waves-effect waves-light send" type="submit" name="action">
                <i className="material-icons right"
                  onClick={() => this.valueSearch()}>send
                </i>
            </button>
          </div>
        </div>
        { mapTweets }
      </div>
    );
  }
  textSearch(value){
    debugger
    this.setState({valor: value.target.value})
  }
  valueSearch(){
  debugger
  this.props.userSearch(this.state.valor)
  }
};


parentContainer = Relay.createContainer(parentContainer, {
  initialVariables: {
    identity: "monoku",
    q: "relay.js"
  },
  fragments: {
    store: () => Relay.QL`
      fragment on TwitterAPI {
        user(identifier: name , identity: $identity){
          description
          id
          name
          profile_image_url
          url
          tweets_count
          followers_count
        }
        ${Tweets.getFragment('twi')},
      }
    `,
  },
});

Tweets = Relay.createContainer(Tweets, {
  initialVariables: {
    q: "relay.js"
  },
  fragments: {
    twi: () => Relay.QL`
      fragment on TwitterAPI {
        search(q: $q, count: 10, result_type: mixed){
          user{
            name
            profile_image_url
          }
          text
        },
      }
    `,
  },
});

class HackerNewsRoute extends Relay.Route {
  static routeName = 'HackerNewsRoute';
  static queries = {
    store: () => {
      // Component is our Item
      return Relay.QL`
      query root {
        twitter {  ${parentContainer.getFragment('store')}},
      }
    `},
  };
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://www.graphqlhub.com/graphql')
);

let mountNode = document.getElementById('app');
let rootComponent =
 <Relay.RootContainer
    Component={parentContainer}
    route={new HackerNewsRoute()}
    renderFailure={function(error, retry) {
      return (
        <h1>fail in the aplication</h1>
      );
    }}
  />;
ReactDOM.render(rootComponent, mountNode);
