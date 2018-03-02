import React, { Fragment, Component } from 'react';
import About from './About';
import { connect } from 'react-redux';
import Posts from './Posts';
import { IS_MY_USER } from '../variables';

class Home extends Component {
  changeUser() {
    const { changeIsMyUser } = this.props;
    const { path } = this.props.match;
    if (path.startsWith('/user')) {
      changeIsMyUser(false)
    } else if (!path.startsWith('/user')) {
      changeIsMyUser(true);
    }
  }

  componentDidMount() {
    this.changeUser();
  }

  componentDidUpdate() {
    this.changeUser();
  }

  render() {
    return (
      <Fragment>
        <About />
        <Posts />
      </Fragment>
    );
  }
}

function mapStateToProps({ isMyUser }) {
  return { isMyUser };
}

function mapDispatchToProps(dispatch) {
  return {
    changeIsMyUser(payload) {
      dispatch({ type: IS_MY_USER, payload });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);