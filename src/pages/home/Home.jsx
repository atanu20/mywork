import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

import ReactPaginate from 'react-paginate';
import { apilink } from '../../data/fdata';
import { CircularProgress } from '@material-ui/core';

const Home = () => {
  const atokon = Cookies.get('_bill_access_user_tokon_');
  const history = useHistory();
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const perpage = 5;
  const pagevisit = pageNo * perpage;

  const dataall = myData?.slice(pagevisit, pagevisit + perpage);
  const boxno = Math.ceil(myData?.length / perpage);

  const likedChange = ({ selected }) => {
    setPageNo(selected);
  };

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

  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (!res.data.success) {
      history.push('/login');
    } else {
      getalldata();
    }
  }, []);

  const getalldata = async () => {
    setLoading(true);
    const res = await axios.get(`${apilink}/user/getAllBills`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      setMyData(res.data.msgs);
    } else {
      notify(res.data.msg);
    }
    setLoading(false);
  };

  const onEdit = async (id) => {
    history.push(`${id}/edit`);
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
      getalldata();
    } else {
      notify(res.data.msg);
    }
  };
  const HandelFilter = async (e) => {
    const data = e.target.value;
    setFilter(data);
    setLoading(true);
    if (data == 'all') {
      getalldata();
    } else {
      const res = await axios.get(`${apilink}/user/sortBills/${data}`, {
        headers: {
          Authorization: atokon,
        },
      });
      // console.log(res.data);
      if (res.data.success) {
        setMyData(res.data.msgs);
      } else {
        notify(res.data.msg);
      }
    }

    setLoading(false);
  };
  return (
    <>
      <ToastContainer />
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="ml-auto p-3">
              <div class="form-group winput">
                <select
                  class="form-control"
                  value={filter}
                  onChange={HandelFilter}
                >
                  <option value="" hidden selected>
                    Choose Options
                  </option>
                  <option value="all">All Data</option>
                  <option value="units">By Unit</option>
                  <option value="amount">By Amount</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 col-md-11 col-12 mx-auto">
              <div className="card p-3">
                <div className="adminalljobs">
                  <div className="jobitem">
                    <div>
                      <small>Units</small>
                    </div>
                    <div className="hideshow">
                      <small>Bill Id</small>
                    </div>

                    <div>
                      <small>Amount</small>
                    </div>

                    <div>Operations</div>
                    <div>
                      <small>PayDate</small>
                    </div>
                  </div>

                  {dataall?.map((val, ind) => {
                    return (
                      <>
                        <div className="jobitem" key={ind}>
                          <div>
                            <small>{val.units}</small>
                          </div>
                          <div className="hideshow">
                            <NavLink to={`/bill/${val._id}`}>
                              {' '}
                              <small>{val._id}</small>
                            </NavLink>
                          </div>

                          <div>
                            <small>{val.amount}</small>
                          </div>

                          <div className="row">
                            <button
                              className="btn btn-warning "
                              onClick={() => onEdit(val._id)}
                            >
                              <i class="fa fa-edit" aria-hidden="true"></i>
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                if (
                                  window.confirm('Are you sure about Delete?')
                                )
                                  onDelete(val._id);
                              }}
                            >
                              <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                            <NavLink
                              to={`/bill/${val._id}`}
                              className="btn btn-success showhide"
                            >
                              <i class="fa fa-eye" aria-hidden="true"></i>
                            </NavLink>
                          </div>
                          <div>
                            <small>
                              {new Date(val.paydate).toDateString()}
                            </small>
                          </div>
                        </div>
                      </>
                    );
                  })}

                  {dataall.length == 0 && (
                    <div className="text-center p-2">
                      <CircularProgress size={35} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <ReactPaginate
              previousLabel={'Prev'}
              nextLabel={'Next'}
              pageCount={boxno}
              onPageChange={likedChange}
              containerClassName={'pagination'}
              // previousLinkClassName={"prevbutton"}
              // nextLinkClassName={"nextbutton"}
              // disabledClassName={"pagedisable"}
              activeClassName={'activebutton'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
