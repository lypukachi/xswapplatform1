import React, { Component } from 'react';
import { Navbar, Nav, BSpan } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { SignOut, SignIn } from 'aws-amplify-react';
import { Hub, Auth } from 'aws-amplify';

const HomeItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/doc">
      API Documentation
    </Nav.ItemLink>
    <Nav.ItemLink href="#/contact">
      Contact Us
    </Nav.ItemLink>
    <Nav.ItemLink href="#/apps">
      Application
    </Nav.ItemLink>
    <Nav.ItemLink href="#/login">
      Login
    </Nav.ItemLink>
  </React.Fragment>
)

const AppItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/doc">
      API Documentation
    </Nav.ItemLink>
    <Nav.ItemLink href="#/contact">
      Contact Us
    </Nav.ItemLink>
    <Nav.ItemLink href="#/apps" active>
      Application
      <BSpan srOnly>(current)</BSpan>
    </Nav.ItemLink>
    <Nav.ItemLink href="#/login">
      Login
    </Nav.ItemLink>
  </React.Fragment>
)

const LoginItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/doc">
      API Documentation
    </Nav.ItemLink>
    <Nav.ItemLink href="#/contact">
      Contact Us
    </Nav.ItemLink>
    <Nav.ItemLink href="#/apps">
      Application
    </Nav.ItemLink>
    <Nav.ItemLink href="#/login" active>
      Login
      <BSpan srOnly>(current)</BSpan>
    </Nav.ItemLink>
  </React.Fragment>
)

export default class Navigator extends Component {
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'navigator'); // Add this component as listener of auth event.

    this.state = { user: null }
  }

  componentDidMount() {
    this.loadUser(); // The first check
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user: user }))
      .catch(err => this.setState({ user: null }));
  }

  onHubCapsule(capsule) {
    this.loadUser(); // Triggered every time user sign in / out
  }

  render() {
    const { user } = this.state;
    return (
      <Navbar expand="md" dark bg="dark" fixed="top">
        <Navbar.Brand href="/">xSwap</Navbar.Brand>
        <Navbar.Toggler target="#navbarsExampleDefault" />

        <Navbar.Collapse id="navbarsExampleDefault">
          <Navbar.Nav mr="auto">
            <HashRouter>
              <Switch>
                <Route exact path="/" component={HomeItems} />
                <Route exact path="/doc" component={HomeItems} />
                <Route exact path="/contact" component={HomeItems} />
                <Route exact path="/apps" component={AppItems} />
                <Route exact path="/login" component={LoginItems} />
              </Switch>
            </HashRouter>
          </Navbar.Nav>
          { user && <Navbar.Text>Hi {user.username}</Navbar.Text> }
          <SignIn />
          <SignOut />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
