import React, { useEffect, useState } from 'react'
import style from '../css/request.module.css'
import styles from '../css/dashboard.module.css'
import Navbar from './Navbar'
import axios from 'axios';
function Request() {
    const [swaprequests, setSwapRequests] = useState([]);
    const [incoming, setIncoming]=useState(true);
    useEffect(() => {
    
       const requests = async () => {
           try {
               const response = await axios.get('https://slotswapper-backend-2.onrender.com/api/v1/swap/swapincoming', { withCredentials: true });
              console.log(response.data);
             const data = response.data.filter((request) => request.status !== "ACCEPTED" && request.status !== "REJECTED");
               setSwapRequests(data);
           } catch (error) {
               console.error('Error fetching swap requests:', error);
           }
       };

       requests(); 
    }, []);

    const handleincoming= async()=>{
        try {
               const response = await axios.get('https://slotswapper-backend-2.onrender.com/api/v1/swap/swapincoming', { withCredentials: true });
              console.log(response.data);
              const data = response.data.filter((request) => request.status !== "ACCEPTED" && request.status !== "REJECTED");
               setSwapRequests(data);
               setIncoming(true)
           } catch (error) {
               console.error('Error fetching swap requests:', error);
           }
    }
    const handleoutgoing = async ()=>{
         try {
               const response = await axios.get('https://slotswapper-backend-2.onrender.com/api/v1/swap/swapoutgoing', { withCredentials: true });
              const data = response.data.filter((request) => request.status !== "ACCEPTED" && request.status !== "REJECTED");
               setSwapRequests(data);
               setIncoming(false)
           } catch (error) {
               console.error('Error fetching swap requests:', error);
           }
    }
    const handleaccepted= async(e)=>{
        const response = await axios.post('https://slotswapper-backend-2.onrender.com/api/v1/swap/swapresponse',{accepted:true,requestId:e._id},{ withCredentials: true })
    }
    const handlerejected= async(e)=>{
        const response = await axios.post('https://slotswapper-backend-2.onrender.com/api/v1/swap/swapresponse',{accepted:false,requestId:e._id},{ withCredentials: true })
    }
    return (
        <div className={styles.app}>
            <Navbar/>
        <div className={style.request}>
            <div className={style.markettop}>
                <div className={style.top1}>Swap Requests</div>
                <div className={style.top2}>Manage your incoming and outgoing swap requests</div>
            </div>
            <div className={style.toggle}>
                <div className={style.incoming} onClick={handleincoming}>incoming</div>
                <div className={style.outgoing} onClick={handleoutgoing}>outgoing</div>
            </div>
            <div className={style.container}>
                {swaprequests.length===0 && <div>No Swap Requests</div>}
                {swaprequests.map((request)=>(
                <div className={style.requestcard}>
                    <div className={style.user}>
                        <div className={style.circle}>{incoming? request?.fromUser?.username.charAt(0).toUpperCase() : request?.toUser?.username.charAt(0).toUpperCase()}</div>
                        <div className={style.username}>{incoming? request?.fromUser?.username :request?.toUser?.username } <br />Available for swap</div>
                    </div>
                    <div className={style.middle}>
                        <div className={style.left}>
                            <div className="head">{incoming?'They Offer':'You Offer:'}</div>
                            <div className={style.timeing}>
  {new Date(
    incoming ? request?.theirSlot?.startTime : request?.mySlot?.startTime
  ).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })}
</div>

                        </div>
                        <div className={style.right}>
                            <div className={style.head}>{incoming? 'You Offer:' : 'They Offer'}</div>
                            <div className={style.timeing}>
  {new Date(
    incoming ? request?.mySlot?.startTime : request?.theirSlot?.startTime
  ).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })}
</div>
            
                        </div>
                    </div>
                    {incoming ? 
                    <div className={style.buttons}>
                        <div className={style.leftbuttons} onClick={() => handleaccepted(request)}>Accept</div>
<div className={style.rightbuttons} onClick={() => handlerejected(request)}>Reject</div>
                    </div> : ''}
                </div>
                ))}
            </div>
        </div>
            </div>
    )
}

export default Request
