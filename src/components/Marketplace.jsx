import React, { use, useEffect, useState } from 'react'
import style from '../css/marketplace.module.css'
import styles from '../css/dashboard.module.css'
import Navbar from './Navbar'
import axios from 'axios';
import { IoMdSwap } from "react-icons/io";
function Marketplace() {
  const [slots, setSlots] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [myevents, setMyevents] = useState([]);
  const [mySlotId, setMySlotId] = useState('');
  useEffect(() => {
    const Data = async () => {
      try {
        const response = await axios.get('https://slotswapper-backend-2.onrender.com/api/v1/swap/swappable-slots', { withCredentials: true });
        setSlots(response.data);
      } catch (error) {
        console.error('Error fetching swappable slots data:', error);
      }
    };
    Data();

    const event = async () => {
      try {
          const response = await axios.get('https://slotswapper-backend-2.onrender.com/api/v1/event/myevents',{withCredentials: true});  
          setMyevents(response.data);
        } catch (error) {
          console.error('Error fetching events:', error);
      }
  };
  event();
  },
   []);
const handlesubmit=async(e)=>{
  e.preventDefault();
  try {
    const response = await axios.post('https://slotswapper-backend-2.onrender.com/api/v1/swap/swaprequest', {
      theirSlotId: selectedSlot._id,
      mySlotId:  mySlotId
    }, { withCredentials: true });

    if (response.data.success) {
      alert('Swap request sent successfully!');
      setPopup(false);
    } else {
      alert('Failed to send swap request.');
    }
  } catch (error) {
    console.error('Error sending swap request:', error);
  }
};

  return (
    <div className={styles.app}>
      <Navbar />
    <div className={style.marketplace}>
        <div className={style.markettop}>
            <div className={style.top1}>Marketplace</div>
            <div className={style.top2}>Browse available swappable slots from other users</div>
        </div>
        <div className={style.container}>
          {slots.map((slot) => (
            <div className={style.card} key={slot.id}>
                 <div className={style.user}>
                              <div className={style.circle}>{slot.user ? slot.user.username.charAt(0).toUpperCase() : ''}</div>
                              <div className={style.username}>{slot.user ? slot.user.username : 'Unknown User'} <br/>Available for swap</div>
                              </div>
                <h2 className={style.topic}>{slot.title}</h2>
                <div className={style.date}>
  {new Date(slot.startTime).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })}
</div>

<div className={style.time}>
  {new Date(slot.endTime).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })}
</div>
                <div className={style.button} onClick={() => { setPopup(true); setSelectedSlot(slot); }}><IoMdSwap />Request Swap</div>
                </div>
          ))}
        </div>
    </div>
    {popup && (
      <div className={style.popupOverlay} >
      <div className={style.popupContainer}>
        <div className={style.popupHeader}>
          <h2>Request Slot Swap</h2>
          <button  className={style.closeButton}>&times;</button>
        </div>

        <form  className={style.popupBody} onSubmit={handlesubmit}>


          <div className={style.infoBox}>
          <label className={style.infoLabel}>They are offering:</label>
            <span className={style.infoTitle}>{selectedSlot.title}</span>
        <span className={style.infoDetails}>
  {new Date(selectedSlot.startTime).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })}
</span>

            <span className={style.infoDetails}>By: {selectedSlot.user.username}</span>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="userSlot">Select one of your swappable slots</label>
            <select
    id="userSlot"
    value={mySlotId}
    onChange={(e) => setMySlotId(e.target.value)}
    required
  >
    <option value="">Choose a slot...</option>
    {/*
      FILTER the myevents array here!
    */}
    {myevents
      .filter((event) => event.status === 'SWAPPABLE') // <-- This is the fix
      .map((event) => (
        <option key={event._id} value={event._id}>
  {event.title} (
  {new Date(event.startTime).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })}
  )
</option>
      ))}
  </select>
          </div>
          
          <div className={style.popupFooter}>
            <button type="submit" className={style.requestButton}>
              Send Request
            </button>
            <button type="button"  className={style.cancelButton} onClick={() => setPopup(false)}>
              Cancel
            </button>
          </div>
          
        </form>
      </div>
    </div>
    )}
  </div>
)

}

export default Marketplace
