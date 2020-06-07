import React, { useState } from 'react';
import './broadcast-modal.css';

import CustomButton from '../common/CustomButton/CustomButton';
import CustomInput from '../common/CustomInput/CustomInput';

import Modal from 'react-modal';
Modal.setAppElement('body');

const BroadcastModal = ({open, onClose, errorRequests}) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlerClose = () => {
    if (!name || !email || !password) {
      return setError('Fill in all the fields');
    }

    onClose({name, email, password});
  }
  
  return (
    <Modal
      isOpen={ open }
      className={"ReactModal__Content_Broadcast"}
      overlayClassName={"ReactModal__Overlay_Broadcast"}
      onRequestClose={ handlerClose }
      style={ style }
      contentLabel="Modal">
      
      <form >
        <div className="container-form">
          <h1 className="title-broadcast-modal">Broadcast live</h1>

          <CustomInput
            classs={'mt-17'}
            type={'text'}
            placeholder={'Name'}
            name={'name'}
            value={name}
            onChange={ (event) => setName(event.target.value) }
          />

          <CustomInput
            classs={'mt-17'}
            type={'text'}
            placeholder={'E-mail'}
            name={'email'}
            value={email}
            onChange={ (event) => setEmail(event.target.value) }
          />

          <CustomInput
            classs={'mt-17'}
            type={'password'}
            placeholder={'Password'}
            name={'password'}
            value={password}
            onChange={ (event) => setPassword(event.target.value) }
          />

          <CustomButton
            typeBtn="button"
            className={'btn btn-outlined purple-btn'}
            children={'Done'}
            onClick={ handlerClose }
          />

          {
            error && (errorRequests === null) && (
              <div className="error-broadcast">
                <p style={{color: 'red'}}>{ error }</p>
              </div>
            )
          }

          {
            errorRequests && (
              <div className="error-broadcast">
                <p style={{color: 'red'}}>{ errorRequests.message } { errorRequests.name }</p>
              </div>
            )
          }
        </div>
      </form>
    </Modal>
  )
}

const style = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
}

export default BroadcastModal;
