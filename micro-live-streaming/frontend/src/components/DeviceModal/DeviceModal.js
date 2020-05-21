import React, { useState, useEffect } from 'react';
import './device-modal.css';

import CustomButton from '../common/CustomButton/CustomButton';

import Modal from 'react-modal';

Modal.setAppElement('body');

const DeviceModal = ({ open, onChange, onClose }) => {
 
  const [audioInputId, setAudioInputid] = useState('');
  const [videoId, setVideoId] = useState('');
  const [devices, setDevices] = useState({audioInputs: [], videos: []});
  const [captureStream, setCaptureStream] = useState({captureStream: []});

  useEffect(() => {
    navigator
    .mediaDevices
    .getUserMedia({audio: true, video: true})
    .finally(() => loadDevices());
  }, [])

  const loadDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(device => device.kind === 'audioinput');
      const videos = devices.filter(device => device.kind === 'videoinput');
      
      if (!!audioInputs && !!videos) {
        const captureStream = await navigator.mediaDevices.getDisplayMedia({video: {cursor: "always"}, audio: false});
        setCaptureStream({captureStream: captureStream});
        const video = document.getElementById('video')
        video.srcObject = captureStream; 
        console.log('srcObject: ', video.srcObject)
      }

      setDevices({audioInputs: audioInputs, videos: videos});
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    if (devices.audioInputs.length && audioInputId === '') {
      setAudioInputid(devices.audioInputs[0].deviceId);
    }
    if (devices.videos.length && videoId === '') {
      setVideoId(devices.videos[0].deviceId);
    }
  }, [devices, audioInputId, videoId]);

  useEffect(() => {
    if (audioInputId === '' || videoId === '') {
      return onChange({captureStream});
    }

    onChange({audioInputId, videoId});
  }, [onChange, audioInputId, videoId, captureStream]);

  const handlerClose = () => {
    onClose();
  }

  return (
    <Modal
      isOpen={ open }
      onRequestClose={ handlerClose }
      contentLabel="Modal">
      
      <form >
        <div className="container-form">
          <h1 style={{ fontWeight: 800, fontSize: 26, textAlign: 'center' }}>Devices Audio and Video</h1>

          <DeviceSelect
            label={'Microphone'}
            value={ audioInputId }
            devices={ devices.audioInputs }
            onChange={ (selected) => setAudioInputid(selected) }
          />

          <DeviceSelect
            label={'Camera'}
            value={ videoId }
            devices={ devices.videos }
            onChange={ (selected) => setVideoId(selected) }
          />

          <CustomButton
            typeBtn="button"
            className={'btn btn-outlined purple-btn'}
            children={'Done'}
            onClick={ handlerClose }
          />

        </div>
      </form>
    </Modal>
  )
}

const DeviceSelect = ({value, label ,devices, onChange}) => {
  return (
    <div>
      <label>
        <div className="label">{label}</div>
        <select className="select mt-30" onChange={(event) => onChange(event.target.value) } value={ value }>
          {
            devices.map((device, key) => (
              <option value={ device.deviceId } key={ key }>
                { device.label }
              </option>
            ))
          }
        </select>
      </label>
    </div>
  )
}

export default DeviceModal;