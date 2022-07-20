const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/userinfor', auth, userCtrl.getUserInfor);
router.get('/getAllBills', auth, userCtrl.getAllBills);
router.post('/', auth, userCtrl.postBill);
router.get('/sortBills/:flag', auth, userCtrl.sortBills);
router.get('/delete/:id', auth, userCtrl.deleteBill);
router.get('/bill/:id', auth, userCtrl.getBillbyId);
router.put('/:id/edit', auth, userCtrl.updatebill);

// router.post('/sendMsg', auth, userCtrl.sendMsg);
module.exports = router;
