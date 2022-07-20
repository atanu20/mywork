const employeeTable = require('../models/user');
const billTable = require('../models/bill');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // console.log(req.body);
      const user = await employeeTable.findOne({ email });
      if (user)
        return res.json({ success: false, msg: 'This email already exists.' });

      if (password.length < 6)
        return res.json({
          success: false,
          msg: 'Password must be at least 6 characters.',
        });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new employeeTable({
        name,
        email,
        password: passwordHash,
      });

      await newUser.save();

      res.json({
        success: true,
        msg: 'Account has been created!',
        newUser,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await employeeTable.findOne({ email });
      if (!user)
        return res.json({ success: false, msg: 'This email does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.json({ success: false, msg: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });

      res.json({
        success: true,
        access_token,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await employeeTable
        .findById(req.user.id)
        .select('-password');

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  postBill: async (req, res) => {
    try {
      const newmsg = new billTable(req.body);
      await newmsg.save();
      res.json({
        success: true,
        msg: 'Bill added Successfully',
        newmsg,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },

  getAllBills: async (req, res) => {
    try {
      const usermsg = await billTable
        .find({
          userId: req.user.id,
        })
        .sort({ paydate: -1 });
      res.json({ success: true, msgs: usermsg });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  sortBills: async (req, res) => {
    try {
      const flag = req.params.flag;
      // console.log(flag);
      let userbill = [];
      if (flag == 'amount') {
        userbill = await billTable
          .find({
            userId: req.user.id,
          })
          .sort({ amount: -1 });
      } else {
        userbill = await billTable
          .find({
            userId: req.user.id,
          })
          .sort({ units: -1 });
      }
      res.json({ success: true, msgs: userbill });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  deleteBill: async (req, res) => {
    try {
      const billid = req.params.id;
      // console.log(billid);
      await billTable.findByIdAndDelete(billid);
      res.json({
        success: true,
        msg: 'Bill Deleted',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getBillbyId: async (req, res) => {
    try {
      const billid = req.params.id;
      // console.log(billid);
      const bill = await billTable.findById(billid);

      res.json({ success: true, msgs: bill });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  updatebill: async (req, res) => {
    try {
      const { units, amount, billdate, userId, billid } = req.body;
      const newdata = await billTable.findOneAndUpdate(
        { _id: billid },
        {
          units,
          amount,
          billdate,
          userId,
        },
        { new: true }
      );

      res.json({ success: true, msg: 'Update Success!', newdata });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = userCtrl;

// const result = await jobTable.find({

//   $or: [{
//       employer_company_category: { '$in': ['Agri-tech', 'Artificial Intelligence'] }
//   }, {
//       $or: [{
//           tech_skills: { '$in': ['React', 'Node JS'] },
//       }, {
//           non_tech_skills: { '$in': ['Php', 'Next JS'] },
//       }]
//   }],

//   $or: [{
//       job_type: { '$in': ['Office', 'Remote'] }
//   }, {
//       job_location: { '$in': ['Bangalore', 'Kolkata'] }
//   }],

//   $or: [{
//       experience: { '$in': ['Entry Level/ Fresher'] }
//   }, {
//       no_employees: { '$in': ['101-500 Employees', '21-100 Employees'] }
//   }],

//   $and: [{
//       salary: { $gte: 7 }
//   }, {
//       salary: { $lte: 27 }
//   }]

// })
