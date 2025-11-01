import React, { useEffect, useState } from 'react'
import styles from '../css/dashboard.module.css'
import Navbar from './Navbar'
import axios from 'axios';
import { toast } from 'react-toastify';
function DashBoard() {
  const [popup, setPopup] = useState(false);
  const [myevents, setMyevents] = useState([]);
  const [weekdays, setWeekdays] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    status: 'SWAPPABLE',
  });

    const events = async () => {
      try {
       const response = await axios.get('https://slotswapper-backend-2.onrender.com/api/v1/event/myevents', { withCredentials: true });
    const eventList = response.data;
    const grouped = eventList.reduce((acc, event) => {
      const date = new Date(event.startTime).toISOString().split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(event);
      return acc;
    }, {});
    setMyevents(grouped);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    const today = new Date();
  useEffect(() => {
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);

    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      return d;
    });
    setWeekdays(days);

  
    events();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Event Created:', formData);
    try {
   const response=   await toast.promise(
       axios.post('https://slotswapper-backend-2.onrender.com/api/v1/event/create', formData, { withCredentials: true }),
       {
       pending: "Event is being saved...",
        success: "Event saved successfully ",
        error: "Failed to save Event ",
       });
      console.log('Server Response:', response.data);
      await events();
      setPopup(false);
    } catch (error) {
      console.error('Error Creating Event:', error);
    }
  };
  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.right}>
        <div className={styles.topright}>
          <div className={styles.rightleft}>
            <div className={styles.righttopcontent}>My Calender</div>
            <div className={styles.rightbottomcontent}>Manage and swap your time slots</div>
          </div>
          <div className={styles.rightbutton} onClick={() => setPopup(true)}>+ Add Events</div>
        </div>
        <div className={styles.calendercontainer}>
          <div className={styles.calendertop}>
            
            <div className={styles.calenderleft}> {today.toLocaleString('en-US', { month: 'long' })} {today.getFullYear()}</div>
            <div className={styles.calenderrightbuttons}>
              <div className={styles.busy}>Busy</div>
              <div className={styles.swappable}>Swappable</div>
              <div className={styles.pending}>Pending</div>
            </div>
          </div>
          <div className={styles.datescontainer}>
  {weekdays.map((dateObj) => {
    const dateKey = dateObj.toISOString().split("T")[0];
    const events = myevents[dateKey] || [];
    const dayName = dateObj.toLocaleString("en-US", { weekday: "short" });

    return (
      <div key={dateKey} className={styles.dates}>
        <div>{dayName}<br />{dateObj.getDate()}</div>
        {events.map((ev) => (
          <div key={ev._id} className={styles.status} style={{
      backgroundColor:
        ev.status === "BUSY"
          ? "#2B333F"
          : ev.status === "SWAP_PENDING"
          ? "#8A6C13"
          : "#13388F",
    }}>
            {ev.title} ({ev.status})
          </div>
        ))}
      </div>
    );
  })}
</div>
        </div>
      </div>
      {popup && (
        <div className={styles.popup}>
          <div className={styles.popupcontainer}>
            <div className={styles.popupheader}>
              <h2>Create Event</h2>
              <button className={styles.closebutton} onClick={() => setPopup(false)}>&times;</button>
            </div>
            <form className={styles.popupbody} onSubmit={handleSubmit}>
              <div className={styles.formgroup}>
                <label htmlFor="eventTitle">Event Title</label>
                <input
                  type="text"
                  id="eventTitle"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formgroup}>
                  <label htmlFor="startTime">Start Time</label>
                  <input
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    value={formData.starttime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formgroup}>
                  <label htmlFor="endTime">End Time</label>
                  <input
                    type="datetime-local"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formgroup}>
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange}>
                  <option value="BUSY">Busy</option>
                  <option value="SWAPPABLE">Swappable</option>
                  <option value="SWAP_PENDING">Swap pending</option>
                </select>
              </div>

              <div className={styles.popupFooter}>
                <button type="button" className={styles.cancelButton} onClick={() => setPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashBoard
