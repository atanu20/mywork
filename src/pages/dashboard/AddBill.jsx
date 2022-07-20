import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { apilink } from '../../data/fdata';

const AddBill = () => {
  const atokon = Cookies.get('_bill_access_user_tokon_');
  const [myInfo, setMyInfo] = useState([]);
  const [unit, setUnit] = useState('');
  const [amount, setAmount] = useState('');
  const [billdate, setBillDate] = useState('');

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coll, setCol] = useState(false);
  const [msg, setMsg] = useState('');
  const his = useHistory();
  const onSub = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      units: unit,
      amount,
      billdate: new Date(billdate),
      userId: myInfo._id,
    };
    // console.log(data);
    const res = await axios.post(`${apilink}/user`, data, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      setStatus(true);
      setMsg(res.data.msg);
      setCol(true);

      his.push('/');
    } else {
      setStatus(true);
      setMsg(res.data.msg);
      setCol(false);
    }
    setLoading(false);
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
      setMyInfo(res.data.userInfo);
    }
  }, []);

  return (
    <div className="homee">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-7 col-12 mx-auto">
            <div className="card p-3">
              {status ? (
                <>
                  <div
                    className={
                      coll
                        ? 'alert alert-success alert-dismissible'
                        : 'alert alert-warning alert-dismissible'
                    }
                  >
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      onClick={() => setStatus(false)}
                    >
                      &times;
                    </button>
                    {msg}
                  </div>
                </>
              ) : null}

              <h3 className="text-center pb-3">Bill Management</h3>
              <br />
              <form onSubmit={onSub} className="">
                <div className="form-group ">
                  <input
                    type="number"
                    placeholder="Enter Unit"
                    className="form-control"
                    name="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="form-control"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">BillDate</label>
                  <input
                    type="date"
                    placeholder="Enter Password"
                    className="form-control"
                    name="billdate"
                    value={billdate}
                    onChange={(e) => setBillDate(e.target.value)}
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className={
                      loading ? 'dis btn btn-primary' : 'btn btn-primary'
                    }
                    disabled={loading}
                  >
                    Save Data
                  </button>
                </div>
                {loading && (
                  <div className="text-center p-2">
                    <CircularProgress size={45} />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBill;
