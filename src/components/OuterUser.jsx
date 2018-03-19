import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import About from './About';
import Posts from './Posts';
import Loader from './Loader';
import api from '../services/api';

class OuterUser extends Component {
  state = {
    outerUser: null,
    loaded: false
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id: outerUserId } = match.params;

    const outerUser = await api.getOuterUserById(outerUserId);
    this.setState({ outerUser, loaded: true });
  }

  async componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { path } = match;
    const { id: outerUserId } = match.params;


    if (path.startsWith('/user')) {
      const outerUser = await api.getOuterUserById(outerUserId);
      this.setState({ outerUser, loaded: true });
    }
  }

  render() {
    const { outerUser, loaded } = this.state;

    return (
      loaded ?
        <Fragment>
          <About user={outerUser} />
          <Posts user={outerUser} />
        </Fragment>
        :
        <Loader />
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(connect(mapStateToProps)(OuterUser));