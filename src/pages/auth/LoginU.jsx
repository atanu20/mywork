import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './Auth.css';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import Cookies from 'js-cookie';
import { apilink } from '../../data/fdata';

const LoginU = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const his = useHistory();

  const onSub = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(`${apilink}/user/login`, {
      email,
      password,
    });

    if (res.data.success) {
      localStorage.setItem('_bill_access_user_login', true);

      Cookies.set('_bill_access_user_tokon_', res.data.access_token, {
        expires: 1,
      });

      window.location.href = '/';
    } else {
      setStatus(true);
      setMsg(res.data.msg);
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
                    <div class="alert alert-warning alert-dismissible">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        onClick={() => setStatus(false)}
                      >
                        &times;
                      </button>
                      {msg}
                    </div>
                  </>
                ) : null}

                <h3 className="text-center pb-3">Login</h3>
                <br />
                <form onSubmit={onSub} className="">
                  <div class="form-group">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      class="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      class="form-control"
                      name="lname"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-box">
                    <p
                      onClick={() => his.push('/register')}
                      style={{ cursor: 'pointer' }}
                    >
                      Don't Have an Account?
                    </p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className={
                        loading ? 'dis btn btn-primary' : 'btn btn-primary'
                      }
                      disabled={loading}
                    >
                      Login Now
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

export default LoginU;
