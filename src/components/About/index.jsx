import React, { Component } from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PUT_AVATAR, DELETE_AVATAR, fileServer } from '../../variables';
import { accentColor } from '../vars';
import { Hero, Avatar, Info, ModalAvatarWrap } from './styled';
import ActionButton from 'material-ui/FloatingActionButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';


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
    const { id, handlePutAvatar, currentAvatar } = this.props;
    const avatar = target.files[0];
    
    if (avatar) {
      const formData = new FormData();
      if (currentAvatar) formData.set('currentAvatar', currentAvatar);
      formData.set('avatar', avatar);
      formData.set('id', id);

      handlePutAvatar(formData);
      this.setState({ modalIsOpen: false });
    }
  }

  onRemoveAvatar = () => {
    const { id, currentAvatar, handleDeleteAvatar } = this.props;
    handleDeleteAvatar({ id, currentAvatar });
  }

  render() {
    const { isMyUser } = this.props;
    console.log('rendering');
    const {
      username,
      firstname,
      lastname,
      currentAvatar,
      about,
      id
    } = this.props;
    const { modalIsOpen } = this.state;

    return (
      <Hero>
        <Avatar>
          <button onClick={this.handleOpenModal} />
          {currentAvatar ?
            <img src={`${fileServer}/${id}/${currentAvatar}`} alt="" />
            :
            null
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
            {!isMyUser ?
              <ActionButton
                backgroundColor={accentColor}>
                <PersonAdd />
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

function mapStateToProps(state) {
  const { user } = state;
  const { isMyUser } = state;  

  return {
    id: user._id,
    currentAvatar: user.avatar,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    about: user.about,
    isMyUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handlePutAvatar(data) {
      dispatch({ type: PUT_AVATAR, payload: data });
    },

    handleDeleteAvatar({ id, currentAvatar }) {
      dispatch({ type: DELETE_AVATAR, payload: { id, currentAvatar }});
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));