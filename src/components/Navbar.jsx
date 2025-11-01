import React, { useEffect, useState } from 'react'
import styles from '../css/dashboard.module.css'
import { SlCalender } from "react-icons/sl";
import { FiBell } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
   const [user, setUser] = useState(null);
    useEffect(() => {
      const user = async () => {
        try {
          const response = await axios.post("http://localhost:4000/api/v1/user/myself", {}, { withCredentials: true });
          setUser(response.data.user);
        } catch (error) {
          console.log("Error fetching user data:", error);
          navigate('/login');
        }
      }
      user();
    }, [])
  const handlelogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/user/logout", {}, { withCredentials: true });
      toast.success("Logout successfully");
      navigate('/login')
    } catch (error) {
      toast.error("Failed to logout")
    }
  }
  return (
    <div className={styles.left}>
            <div className={styles.topleft}>
              <div className={styles.icons}><SlCalender fill='#4E38F6'/> SlotSwapper</div>
            </div>
            <div className={styles.middleleft}>
             <Link to="/"><div className={styles.middleleftbutton}><SlCalender />Dashboard</div></Link>
              <Link to="/marketplace"><div className={styles.middleleftbutton}><SlCalender />Marketplace</div></Link>
              <Link to="/request"><div className={styles.middleleftbutton}><FiBell />Request</div></Link>
            </div>
            <div className={styles.bottomleft}>
              <div className={styles.user}>
              <div className={styles.circle}> {user?.username.charAt(0).toUpperCase()}</div>
              <div className={styles.username}>{user?.username} <br/>{user?.email}</div>
              </div>
              <div className={styles.logout} onClick={handlelogout}><RxExit fill='#4E38F6'/>Logout</div>
            </div>
          </div>
  )
}

export default Navbar
