import React, { useState, useEffect, useRef } from 'react';
import './viewer.css';

import NavView from '../../components/common/NavBar/NavBar';
import ViewerModal from '../../components/ViewerModal/ViewerModal';
import ContainerVideo from '../../components/container-video/ContainerVideo';
import Chat from '../../components/Chat/Chat';
import useViewer from '../../hooks/useViewer';

const Viewer = (props) => {
  const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false);
  const { slug } = props.match.params;
  const videoRefViewer = useRef(null);
  
  const [userInfo, setUserInfo] = useState({
  name: '', email: '', is_broadcaster: false});
  
  const { live, error, usersConnected } = useViewer({
  start: true, liveSlug: slug, videoRefViewer: videoRefViewer});

  useEffect(() => {

    if (live !== null && !error && userInfo.name === "") {
      setOpenUserInfoDialog(true);
    }

  }, [live, error, userInfo]);

  return (
    <>
      <NavView 
        titleLogo={ 'Streaming Viewer' }
        isBroadcaster={ false }
      />
    
      <ContainerVideo
        live={ live }
        titleVideo={ live.title } 
        videoRef={ videoRefViewer.current }
        countViews={ usersConnected }
      />

      <Chat 
        user={ userInfo }
        room={ slug }
      />

      <ViewerModal
        errorRequests={ error }
        open={ openUserInfoDialog }
        onClose={ (formData) => {
          
          if (live.status !== 'done') {
            setUserInfo((prevState) => ({...prevState, ...formData}));
            setOpenUserInfoDialog(false);
          }

        }}
      />

    </>
  )
}

export default Viewer;