import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { apilink } from '../../data/fdata';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ShowBill = () => {
  const atokon = Cookies.get('_bill_access_user_tokon_');
  const [billInfo, setBillInfo] = useState([]);

  const { id } = useParams();

  const his = useHistory();
  const notify = (msg) =>
    toast.dark(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  const getBillInfo = async () => {
    const res = await axios.get(`${apilink}/user/bill/${id}`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      setBillInfo(res.data.msgs);
    } else {
      notify(res.data.msg);
    }
  };
  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (!res.data.success) {
      his.push('/login');
    } else {
      getBillInfo();
    }
  }, []);

  const onEdit = async (id) => {
    his.push(`../${id}/edit`);
  };
  const onDelete = async (id) => {
    const res = await axios.get(`${apilink}/user/delete/${id}`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      notify(res.data.msg);
      his.push('/');
      //   getalldata();
    } else {
      notify(res.data.msg);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="homee">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-9 col-12 mx-auto">
              <div className="card p-3">
                {billInfo.length != 0 ? (
                  <>
                    <h5>
                      Bill Id :{' '}
                      <span className="text-primary">{billInfo._id}</span>{' '}
                    </h5>
                    <h5>
                      Amount :{' '}
                      <span className="text-primary">{billInfo.amount}</span>{' '}
                    </h5>

                    <h5>
                      BillDate :{' '}
                      <span className="text-primary">
                        {new Date(billInfo.billdate).toDateString()}
                      </span>{' '}
                    </h5>
                    <h5>
                      PayDate :{' '}
                      <span className="text-primary">
                        {new Date(billInfo.paydate).toDateString()}
                      </span>{' '}
                    </h5>
                    <div className="row m-1">
                      <button
                        className="btn btn-warning mr-2 "
                        onClick={() => onEdit(billInfo._id)}
                      >
                        <i class="fa fa-edit" aria-hidden="true"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          if (window.confirm('Are you sure about Delete?'))
                            onDelete(billInfo._id);
                        }}
                      >
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h5>Loading...</h5>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowBill;
