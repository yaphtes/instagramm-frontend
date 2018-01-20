import React, { Component } from 'react';
import Modal from '../../Modal';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { PUT_AVATAR } from '../../../variables';
import { server } from '../../../variables';
import './assets/about.css';

class About extends Component {
  state = {
    modalIsOpen: false,
    burl: ''
  };

  componentDidMount() {
    let { about } = this.props;
    about = about.replace(/(http|https):\/\/[\w-_]+\.[\w\/]+/g, `<a href="$&">$&</a>`);
    let { aboutElem } = this.refs;
    aboutElem.innerHTML += about;
  }

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  }

  handleCloseModal = ({ target }) => {
    if (target.closest('.load-image')) {
      return;
    } else {
      this.setState({ modalIsOpen: false });
    }
  }

  handleChangeAvatar = ({ target }) => {
    const file = target.files[0];
    const burl = URL.createObjectURL(file);
    this.setState({ burl });
  }

  handleSaveAvatar = () => {
    const { id, handlePutAvatar } = this.props;
    const canvas = this.editor.getImage();
    const blob = canvas.toBlob(blob => {
      // TODO: как-то грамотно обновить аватар после изменений
      // может вариант с сигнатурами?
      handlePutAvatar(blob, id);
    });
    
  }

  render() {
    const { username, firstname, lastname, avatar } = this.props;
    const { modalIsOpen, burl } = this.state;

    return (
      <section className="about">
        <div className="wrap">
          <div className="avatar">
            <button onClick={this.handleOpenModal} className="load" />
            {avatar ? <img src={`${server}/${avatar}`} alt="avatar" /> : null}
          </div>
          {modalIsOpen ? 
            <Modal>
              <div className="modal-avatar" onClick={this.handleCloseModal} >
                <div className="load-image" >
                  <div>
                    <label className="btn" htmlFor="file">Select image</label>
                    <input ref="fileElem" onChange={this.handleChangeAvatar} id="file" type="file" style={{display: 'none'}} />
                  </div>
                  <AvatarEditor
                    ref={editor => this.editor = editor}
                    image={burl ? burl : avatar ? `${server}/${avatar}` : ''}
                    width={152}
                    height={152}
                    border={10}
                    borderRadius={76}
                  />
                  <button className="btn" onClick={this.handleSaveAvatar}>save</button>
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
            <div ref="aboutElem" className="text">
              <span>{firstname} </span>
              <span>{lastname} </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ user }) {
  return { id: user._id };
}

function mapDispatchToProps(dispatch) {
  return {
    handlePutAvatar(blob, id) {
      dispatch({ type: PUT_AVATAR, payload: { blob, id } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);