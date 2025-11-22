const express = require('express');
const router = express.Router();
const {
  getAppointmentConfig,
  updateAppointmentConfig,
  addDisabledDate,
  removeDisabledDate,
  addDisabledTimeSlot,
  removeDisabledTimeSlot
} = require('../controllers/appointmentConfigController');

router.get('/', getAppointmentConfig);
router.put('/', updateAppointmentConfig);
router.post('/disabled-dates', addDisabledDate);
router.delete('/disabled-dates/:dateId', removeDisabledDate);
router.post('/disabled-slots', addDisabledTimeSlot);
router.delete('/disabled-slots/:slotId', removeDisabledTimeSlot);

module.exports = router;