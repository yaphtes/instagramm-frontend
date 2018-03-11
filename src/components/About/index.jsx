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
    const { _id: id, handlePutAvatar, avatar } = this.props.user;
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
    const { _id: id, avatar, handleDeleteAvatar } = this.props.user;
    handleDeleteAvatar({ id, avatar });
  }

  render() {
    const { modalIsOpen } = this.state;
    const { user, pathname } = this.props;
    const { username, firstname, lastname, avatar, about, _id: id } = user;

    return (
      <Hero>
        <Avatar>
          <button onClick={this.handleOpenModal} />
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
              <ActionButton
                backgroundColor={accentColor}
                mini={true}
              >
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

function mapStateToProps({ router }) {
  return { pathname: router.location.pathname };
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