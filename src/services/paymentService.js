const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const paymentDao = require('../models/paymentDao');

const completePayments = async (
  userId, 
  tid, 
  pgToken, 
  campingZoneId, 
  startDate, 
  endDate, 
  totalMembers, 
  totalPrice
  ) => {
  try{
    const reservationNumber = uuidv4();

    const options = 
   {
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/payment/approve',
      headers: { Authorization: `KakaoAK ${process.env.APP_ADMIN_KEY}`,
      'Content-type': `application/x-www-form-urlencoded;charset=utf-8` },
      data: {cid: `${process.env.KAKAO_CID}`,
        tid: `${tid}`,
        partner_order_id: 'partner_order_id',
        partner_user_id: 'partner_user_id',
        pg_token: `${pgToken}`
      }
    }

    const paymentApproval =  await axios.request(options)
    
    if (paymentApproval.status !== 200){
      throw new Error('PAYMENT FAIL')
    }

    const payments = await paymentDao.completePayments(
      userId, 
      campingZoneId, 
      startDate, 
      endDate, 
      totalMembers, 
      totalPrice,
      reservationNumber,
      paymentApproval.data
    )
    
    return payments
  } catch (error){
    error = new Error(error.message)
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  completePayments
};