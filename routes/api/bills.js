const express = require('express');
const router = express.Router();
const request = require('request');
const keys = require('../config/keys');

//@route GET api/posts/test
//@desc Tests the posts route
//@acess Public
router.get('/test', (req, res) => {
    res.json('the user endpoint works')
})

//@route GET api/bills/:billID
//@desc Retrieves a specific post
//@acess Public
router.get('/:billID', (req, res) => {
    let bill;
    let newsQuery = "?domains=nbcnews.com,cnbc.com,msnbc.com&pageSize=10&q=";

    function getBillInfo(){
        //api call to openstates
        //return result
        bill = result;
        newsQuery += result.title //comes from result
        formArticles();
    }

    function formArticles() {
        request(`https://newsapi.org/v2/everything${newsQuery}`, { 'auth': keys.newsAPIKey }, (error, response, body) => {
            error ? console.log(`error ${error}`) : console.log(`statusCode: ${response} - ${response.statusCode}`);
            bill.articles = body.articles;
            sendJSON();
        });
    }

    function sendJSON() {
        res.send(bill)
    }

    getBillInfo();
})

module.exports = router;