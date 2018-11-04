const request = require('request');
const express = require('express');
const router = express.Router();
const googleKey = require('../../config/keys');

router.get('/address/:address', (req, res) => {
    const { address } = req.params;
    request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey.googleCloud}`,
        (err, result) => {
            if (err) { console.log(err) };
            const latlng = (JSON.parse(result.body).results[0].geometry.location);
            console.log(latlng);
            console.log(googleKey.openBallot);
            const options = {
                url: `https://openstates.org/api/v1/legislators/geo/?lat=${latlng.lat}&long=${latlng.lng}&apikey=${googleKey.openBallot}`,
                headers: {
                    'X-API-KEY': `${googleKey.openBallot}`
                }
            }
            console.log(options)
            request.get(options,
                (err, result2) => {
                    if (err) { console.log(err) }
                    const repArray = JSON.parse(result2.body);
                    
                    repArray.map((element) => {
                        console.log(element.full_name);
                    });
                    res.status(200).send(result2.body);
                })
            // res.status(200).send(latlng);
        })
});

router.get('//:')

module.exports = router;