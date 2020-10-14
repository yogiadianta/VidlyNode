const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Customer, validateCustomer } = require('../models/customer');
const express = require('express');
const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// Add a Customer
router.post('/', auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();

  res.send(customer);
});

// Get specific Customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(400).send('The Customer didnt exist');
  }
  res.send(customer);
});

// Update customer
router.put('/:id', auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!customer) return res.status(400).send('The Customer didnt exist');

  res.send(customer);
});

//Delete customer
router.delete('/:id', [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) {
    return res.status(400).send('The Customer didnt exist');
  }

  res.send(customer);
});

module.exports = router;
