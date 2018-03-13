import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import About from './About';
import Posts from './Posts';
import { ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTION } from '../variables';
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

  handleAddSubscription = (id) => {
    const { addSubscription, user } = this.props;
    addSubscription(user._id, id);
  }

  handleRemoveSubscription = (id) => {
    const { removeSubscription, user } = this.props;
    removeSubscription(user._id, id);
  }

  render() {
    const { outerUser } = this.state;
    const user = outerUser ? outerUser : this.props.user;

    return (
      <Fragment>
        <About user={user} onAddSubscription={this.handleAddSubscription} onRemoveSubscription={this.handleRemoveSubscription} />
        <Posts user={user} onRemoveSubscription={this.handleRemoveSubscription} />
      </Fragment>
    );
  }
}

function mapStateToProps({ user, router }) {
  return { user, pathname: router.location.pathname };
}

function mapDispatchToProps(dispatch) {
  return {
    addSubscription(myId, subscriptionId) {
      dispatch({ type: ADD_SUBSCRIPTION, payload: { myId, subscriptionId } });
    },

    removeSubscription(myId, subscriptionId) {
      dispatch({ type: REMOVE_SUBSCRIPTION, payload: { myId, subscriptionId } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);