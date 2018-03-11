import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import About from './About';
import Posts from './Posts';
import api from '../services/api';

class Home extends Component {
  state = { outerUser: null }

  async componentDidMount() {
    const { pathname } = this.props;

    if (pathname.startsWith('/user')) {
      const outerUserId = pathname.slice(6);
      const outerUser = await api.getOuterUserById(outerUserId);
      this.setState({ outerUser });
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps;
    if (pathname.startsWith('/user')) {
      const outerUserId = pathname.slice(6);
      const outerUser = await api.getOuterUserById(outerUserId);
      this.setState({ outerUser });
    } else if (pathname.startsWith('/')) {
      this.setState({ outerUser: null });
    }
  }

  render() {
    const { outerUser } = this.state;
    const user = outerUser ? outerUser : this.props.user;

    return (
      <Fragment>
        <About user={user} />
        <Posts user={user} />
      </Fragment>
    );
  }
}

function mapStateToProps({ user, router }) {
  return { user, pathname: router.location.pathname };
}

export default connect(mapStateToProps)(Home);