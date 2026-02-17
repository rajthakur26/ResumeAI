
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

router.post('/create-checkout', async(req,res)=>{
  const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    mode:'payment',
    line_items:[{
      price_data:{
        currency:'usd',
        product_data:{name:'ResumeAI Pro Upgrade'},
        unit_amount:500
      },
      quantity:1
    }],
    success_url:'http://localhost:5173/success',
    cancel_url:'http://localhost:5173/'
  });

  res.json({url:session.url});
});

module.exports = router;
