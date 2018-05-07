import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import About from './About';
import Posts from './Posts';
import Loader from './Loader';
import withSocket from '../hoc/withSocket';
import {
  GET_OUTER_USER,
  CLEAR_OUTER_USER
} from '../variables';

class OuterUser extends Component {
  componentDidMount() {
    const { match, getOuterUserById } = this.props;
    const { id: outerUserId } = match.params;
    getOuterUserById(outerUserId);
  }


  componentWillReceiveProps(nextProps) {
    const { getOuterUserById, outerUser } = this.props;
    const { match } = nextProps;
    const { path } = match;
    const { id: outerUserId } = match.params;
    
    if (outerUser && path.startsWith('/user') && outerUser._id !== outerUserId) getOuterUserById(outerUserId);
  }

  componentWillUnmount() {
    const { clearOuterUser } = this.props;
    clearOuterUser();
  }

  render() {
    const { isFetching } = this.props;

    return (
      !isFetching ?
        <Fragment>
          <About />
          <Posts />
        </Fragment>
        :
        <Loader />
    );
  }
}

function mapStateToProps({ outerUser }) {
  return { outerUser };
}

function mapDispatchToProps(dispatch) {
  return {
    getOuterUserById(outerUserId) {
      dispatch({ type: GET_OUTER_USER, payload: outerUserId });
    },

    clearOuterUser() {
      dispatch({ type: CLEAR_OUTER_USER });
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withSocket(OuterUser)));