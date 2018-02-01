import React, { Component } from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { PUT_AVATAR, DELETE_AVATAR, server, rest } from '../../variables';
import './assets/about.css';

class About extends Component {
  state = {
    modalIsOpen: false
  };

  componentDidMount() {
    let { about, id, hasAvatar } = this.props;
    let { aboutElem } = this.refs;
    let { avatarBlob } = this.state;

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
      formData.set('avatar', avatar);
      formData.set('currentAvatar', currentAvatar);
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
    const { username, firstname, lastname, currentAvatar, about, id } = this.props;
    const { modalIsOpen } = this.state;

    return (
      <section className="about">
        <div className="wrap">
          <div className="avatar">
            <button onClick={this.handleOpenModal} className="load" />
            {currentAvatar ?
              <img src={`${server}/${id}/${currentAvatar}`} alt="" />
              :
              null
            }
          </div>
          {modalIsOpen ? 
            <Modal>
              <div className="modal-avatar-container" onClick={this.handleCloseModal}>
                <div className="modal-avatar">
                  <h3>Avatar</h3>
                  <label>Load new<input onChange={this.onUpdateAvatar} ref="fileElem" type="file" style={{display: 'none'}} /></label>
                  <button onClick={this.onRemoveAvatar}>Remove current</button>
                </div>
              </div>
            </Modal>
            : null
          }
          <div className="info">
            <div className="username">
              <span>{username} </span>
              <button id="follow">follow</button>
            </div>
            <div className="text">
              <span className="name">{firstname} </span>
              <span className="name">{lastname} </span>
              <span ref="aboutElem">
                {about}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    id: user._id,
    currentAvatar: user.avatar,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    about: user.about
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

export default connect(mapStateToProps, mapDispatchToProps)(About);