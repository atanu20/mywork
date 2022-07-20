import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Auth.css';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { apilink } from '../../data/fdata';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coll, setCol] = useState(false);
  const [msg, setMsg] = useState('');
  const his = useHistory();

  const onSub = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name,

      email,
      password,
    };
    const res = await axios.post(`${apilink}/user/register`, data);
    console.log(res.data);
    if (res.data.success) {
      setStatus(true);
      setMsg(res.data.msg);
      setCol(true);
      setEmail('');

      setName('');
      setPassword('');
      his.push('/login');
    } else {
      setStatus(true);
      setMsg(res.data.msg);
      setCol(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="auth">
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
                      type="text"
                      placeholder="Enter Name"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="form-control"
                      name="lname"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-box">
                    <p
                      onClick={() => his.push('/login')}
                      style={{ cursor: 'pointer' }}
                    >
                      Already Have an Account?
                    </p>
                    <p></p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className={
                        loading ? 'dis btn btn-primary' : 'btn btn-primary'
                      }
                      disabled={loading}
                    >
                      Register Now
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
    </>
  );
};

export default Register;
