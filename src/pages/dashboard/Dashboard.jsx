import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { apilink } from '../../data/fdata';
import './Dashboard.css';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';

const Dashboard = () => {
  const atokon = Cookies.get('_pigion_access_user_tokon_');
  const [userInfo, setUserInfo] = useState([]);

  const history = useHistory();

  // const onSub = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const date1 = new Date();
  //   const date2 = new Date(datee + ' ' + timee);
  //   const diffTime = date2 - date1;
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays <= 0) {
  //     setStatus(true);
  //     setMsg('Choose correct Date and time');
  //   } else {
  //     const obj = {
  //       userId: userInfo._id,
  //       userName: userInfo.name,
  //       email: userInfo.email,
  //       title,
  //       message,
  //       sendTime: new Date(datee + ' ' + timee),
  //       isStatus: false,
  //     };
  //     // console.log(obj);
  //     const res = await axios.post(`${apilink}/user/postMsg`, obj, {
  //       headers: {
  //         Authorization: atokon,
  //       },
  //     });

  //     if (res.data.success) {
  //       // console.log(res.data);/
  //       setDatee('');
  //       setMessage('');
  //       setTimee('');
  //       setTitle('');
  //       setStatus(true);
  //       setMsg(res.data.msg);
  //       getData();
  //     } else {
  //       setStatus(true);
  //       setMsg(res.data.msg);
  //     }
  //   }

  //   setLoading(false);
  // };

  // useEffect(async () => {
  //   const res = await axios.get(`${apilink}/auth/isVerify`, {
  //     headers: {
  //       Authorization: atokon,
  //     },
  //   });
  //   // console.log(res.data);
  //   if (!res.data.success) {
  //     history.push('/login');
  //   } else {
  //     setUserInfo(res.data.userInfo);

  //     getData();
  //   }
  // }, []);

  // const getData = async () => {
  //   const res = await axios.get(`${apilink}/user/getAllMsgs`, {
  //     headers: {
  //       Authorization: atokon,
  //     },
  //   });
  //   if (res.data.success) {
  //     setMsgInfo(res.data.msgs);
  //   } else {
  //     setMsgInfo([]);
  //   }
  // };
  //   console.log(userInfo);

  return (
    <div className="dashboard">
      <div className="container"></div>
    </div>
  );
};

export default Dashboard;
