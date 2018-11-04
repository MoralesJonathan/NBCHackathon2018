const request = require('request');
const express = require('express');
const cheerio = require('cheerio')
const router = express.Router();
const googleKey = require('../../config/keys');
const axios = require('axios');


function requestQueue(arr) {
    return arr.map((element) => {
        return new Promise(function (resolve, reject) {
            request.get(element, (err, result2) => {
                if (err) { console.log(err) }
                resolve((result2.body))
            })
        })
    })
}

function finalProcessing(arr) {
    return arr.map((element) => {
        return new Promise((resolve, reject) => {
            const parsed = (JSON.parse(element));
            const payload = {
                title: parsed.title,
                subjects: parsed.scraped_subjects,
                id: parsed.id,
                billId: parsed.billId,
                pdf: parsed.versions.url,
                url: parsed.sources[0].url,
                summary: ''
            }
            axios.get(payload.url).then((result) => {
                let $ = cheerio.load(result.data);
                const summary = $('.width80').text();
                console.log(summary);
                payload.summary = summary;
                resolve(payload);
            })
        });
    })
}

router.post('/issues', (req, res) => {
    const { state, issues } = req.body;
    console.log(req.body);
    const requests = [];
    issues.map((element) => {
        const options = {
            url: `https://openstates.org/api/v1/bills/?state=${state}&q=${element}&apikey=${googleKey.openBallot}&per_page=3`
        }
        requests.push(options);
    });

    Promise.all(requestQueue(requests))
        .then((allResults) => {
            const billIds = [];
            allResults.map((element) => {
                const parsed = (JSON.parse(element));
                parsed.map((element) => {
                    const billId = element['id'];
                    const queryId = encodeURI(billId);
                    const options = { url: `https://openstates.org/api/v1/bills/${queryId}?apikey=${googleKey.openBallot}` }
                    billIds.push(options);
                });
            })
            Promise.all(requestQueue(billIds))
                .then((allResults2) => {
                    const finalArray = [];
                    Promise.all(finalProcessing(allResults2))
                        .then((finalResults) => {
                            res.status(200).send(finalResults)
                        })
                })
        }).catch((err) => {
            console.log(err);
        })
});

module.exports = router;