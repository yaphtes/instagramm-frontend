import React, { Component } from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { accentColor } from '../vars';
import { Hero, Avatar, Info, ModalAvatarWrap } from './styled';
import ActionButton from 'material-ui/FloatingActionButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import PersonRemove from 'material-ui/svg-icons/content/clear';
import { PUT_AVATAR, DELETE_AVATAR, fileServer, ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTION } from '../../variables';


class About extends Component {
  state = { modalIsOpen: false };

  componentDidMount() {
    let { about } = this.props;
    let { aboutElem } = this.refs;
    if (about) {
      about = about.replace(/(http|https):\/\/[\w-_]+\.[\w/]+/g, `<a href="$&" target="_blank">$&</a>`);
      aboutElem.innerHTML = about;
    }
  }

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  }

  handleCloseModal = ({ target }) => {
    if (target.closest('.modal-avatar')) {
      return;
    } else {
      this.setState({ modalIsOpen: false });
    }
  }

  onUpdateAvatar = ({ target }) => {
    const { handlePutAvatar, user } = this.props;
    const { _id: id, avatar } = user;
    const file = target.files[0];
    
    if (file) {
      const formData = new FormData();
      if (file) formData.set('currentAvatar', avatar);
      formData.set('avatar', file);
      formData.set('id', id);

      handlePutAvatar(formData);
      this.setState({ modalIsOpen: false });
    }
  }

  onRemoveAvatar = () => {
    const { handleDeleteAvatar } = this.props;
    const { _id: id, avatar } = this.props.user;
    handleDeleteAvatar({ id, avatar });
  }

  handleAddSubscription = (myId) => {
    const { addSubscription, outerUser } = this.props;
    addSubscription(myId, outerUser._id);
  }

  handleRemoveSubscription = (myId) => {
    const { removeSubscription, outerUser } = this.props;
    removeSubscription(myId, outerUser._id);
  }

  render() {
    const { modalIsOpen } = this.state;
    const { user, outerUser, router } = this.props;
  
    const { pathname } = router.location;
    const { mySubscriptions, _id: myId } = user;

    if (user || outerUser) {
      var { username, firstname, lastname, avatar, about, _id: id } = !outerUser ? user : outerUser;
    }

    return (
      <Hero>
        <Avatar>
          {!pathname.includes('/user') ? <button onClick={this.handleOpenModal} /> : null }
          {avatar ?
            <img src={`${fileServer}/${id}/${avatar}`} alt="" />
            : null
          }
        </Avatar>
        {modalIsOpen ? 
          <Modal>
            <ModalAvatarWrap onClick={this.handleCloseModal}>
              <div className="modal-avatar">
                <h3>Avatar</h3>
                <label>Load new<input onChange={this.onUpdateAvatar} ref="fileElem" type="file" style={{display: 'none'}} /></label>
                <button onClick={this.onRemoveAvatar}>Remove current</button>
              </div>
            </ModalAvatarWrap>
          </Modal> : null
        }
        <Info>
          <div className="username">
            <span>{username}</span>
            {pathname.startsWith('/user') ?
              mySubscriptions.find(obj => obj._id === id) ?
                <ActionButton
                  backgroundColor={accentColor}
                  mini={true}
                  onClick={this.handleRemoveSubscription.bind(this, myId)}>
                  <PersonRemove style={{ width: '22px' }} />
                </ActionButton>
                :
                <ActionButton
                  backgroundColor={accentColor}
                  mini={true}
                  onClick={this.handleAddSubscription.bind(this, myId)}>
                  <PersonAdd style={{ width: '22px' }} />
                </ActionButton>
              : null
            }
          </div>
          <div className="text">
            <span className="name">{firstname} </span>
            <span className="name">{lastname} </span>
            <span ref="aboutElem">
              {about}
            </span>
          </div>
        </Info>
      </Hero>
    );
  }
}

function mapStateToProps({ router, user, outerUser }) {
  return { user, outerUser, router };
}

function mapDispatchToProps(dispatch) {
  return {
    handlePutAvatar(data) {
      dispatch({ type: PUT_AVATAR, payload: data });
    },

    handleDeleteAvatar({ id, currentAvatar }) {
      dispatch({ type: DELETE_AVATAR, payload: { id, currentAvatar }});
    },

    addSubscription(myId, subscriptionId) {
      dispatch({ type: ADD_SUBSCRIPTION, payload: { myId, subscriptionId } });
    },

    removeSubscription(myId, subscriptionId) {
      dispatch({ type: REMOVE_SUBSCRIPTION, payload: { myId, subscriptionId } });
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));