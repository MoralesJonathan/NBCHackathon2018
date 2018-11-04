const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const key = require('../../config/keys');
const authCheck = require('../../middleware/authCheck');

// Load Profile Model 
const Profile = require('../../models/Profile');
// Load User Profile 
const User = require('../../models/User');

// @route GET api/profile/test
// @desc Tests the profile route
// @acess Public
router.get('/test', (req, res) => {
    res.json('the user endpoint works')
});

// @route GET api/profile/
// @desc Get current user profile 
// @acess Private
router.get('/', authCheck, (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .then((profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })).catch(err=> res.status(404).json(err))
});

router.post('/new', authCheck, (req, res) => {
    const { address, phoneNumber, dob, interests, language }=req.body;
    const errors = {};
    User.findOne({ user: req.user.id })
        .then((user => {
            const newUser = new Profile({
                user: user.id,
                language,
                interests,
                dob, 
                phoneNumber
            });
        
        })).catch(err=> res.status(404).json(err))
});


module.exports = router;