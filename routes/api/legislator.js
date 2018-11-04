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
                    console.log(repArray);
                    const names = [];
                    repArray.map((element) => {
                        names.push(
                            {
                                name: element.full_name,
                                photo: element.photo_url,
                                party: element.party,
                                email: element.email,
                                district: element.district
                            });
                    });

                    const bigBoy = {
                        reps: names
                    }
                    res.status(200).send(bigBoy)
                    // console.log(`https://civicinfoapi.votinginfoproject.org/?&address=${encodeURI(address)}`);

                    //     var options = {
                    //         url: `https://civicinfoapi.votinginfoproject.org/?&address=${encodeURI(address)}`,
                    //         headers: {
                    //             'User-Agent': 'request',
                    //             'Orgin':'http://localhost:5001'
                    //         }
                    //     };
                    //     request.get(options,
                    //         (err, response2) => {
                    //             if (err) { console.log(err); }
                    //             console.log(response2);
                    //             const { address, notes, pollingHours } = response2.data.pollingLocations;
                    //             const bigBoy = {
                    //                 reps: names,
                    //                 votingInfo: { address, notes, pollingHours }
                    //             }
                    //             res.status(200).send(bigBoy)
                    //         })
                    // })
                })
        })
});

module.exports = router;