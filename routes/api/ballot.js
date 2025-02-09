const request = require('request');
const express = require('express');
const cheerio = require('cheerio')
const router = express.Router();
const googleKey = require('../../config/keys');
const axios = require('axios');
const { Translate } = require('@google-cloud/translate');
const projectId = googleKey.projectId;

// Instantiates a client
const translate = new Translate({
    projectId: projectId,
    key: googleKey.googleCloud
});


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
            console.log(payload.url);
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

function translater(finalResults) {
    return finalResults.map((element) => {
        return new Promise((resolve, reject) => {
            let text = [element["title"], element["summary"]];
            translate
                .translate(text, "es")
                .then(results => {
                    element["title"] = results[0][0];
                    element["summary"] = results[0][1];
                    console.log(results);
                    resolve(element);
                })
                .catch(err => {
                    console.error('ERROR:', err);
                    reject(err);
                });
        })
    })
}
router.post('/issues', (req, res) => {
    const { state, issues, lang } = req.body;
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
                            if (lang) {
                                Promise.all(translater(finalResults))
                                .then((data)=>{
                                    res.status(200).send(data);
                                })
                            }else{
                            res.status(200).send(finalResults);
                            }
                        })
                })
        }).catch((err) => {
            console.log(err);
        })
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    const options = { url: `https://openstates.org/api/v1/bills/${id}?apikey=${googleKey.openBallot}` }
    
    request.get(options, (err,data)=>{
        const parsed = JSON.parse(data.body); 
        console.log(parsed);
        let url =parsed.versions[0].url;
        let subjects=parsed.scraped_subjects;
        let urlArr= url.split("/");
        urlArr.splice(urlArr.indexOf('Filed'));
        urlArr.push('Filed','PDF');
        urlArr=urlArr.map(element => {
             return element+'/'
        });
        let pdf = urlArr.join('');
        axios.get(pdf, {
            mode: 'no-cors',
            responseType: 'arraybuffer',
            headers: {
                contentType : 'text/pdf'
            }
            }) .then(response => {
                pdf = Buffer.from(response.data, 'binary').toString('base64');
                pdf = 'data:application/pdf;base64,'+pdf
                res.status(200).send({
                    pdf,
                    subjects
                })
            })
    })
})

module.exports = router;
