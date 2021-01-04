var unirest = require("unirest");
const { request } = require('express');
// var formidable = require('formidable')

let api_req = unirest("POST", "https://kairosapi-karios-v1.p.rapidapi.com/enroll");
let api_check_req = unirest("POST", "https://kairosapi-karios-v1.p.rapidapi.com/recognize");
let api_check_name = unirest("POST", "https://kairosapi-karios-v1.p.rapidapi.com/gallery/view");


api_req.headers({
    "x-rapidapi-host": "kairosapi-karios-v1.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "content-type": "application/json",
    "accept": "application/json",
    "useQueryString": true
});


api_check_req.headers({
    "x-rapidapi-host": "kairosapi-karios-v1.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "content-type": "application/json",
    "accept": "application/json",
    "useQueryString": true
});

api_check_name.headers({
    "x-rapidapi-host": "kairosapi-karios-v1.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "content-type": "application/json",
    "accept": "application/json",
    "useQueryString": true
});

api_check_name.type("json");

api_req.type("json");
api_check_req.type("json")

module.exports = async(req, res, next) => {
    console.log('#################3GALERY NAME************')
    console.log("GalleryName:  " + req.headers['galleryname'])
    console.log("UserName:   " + req.headers['username'])
    console.log('#################3USERNAME************')

    const userName = req.headers['username']
    const imageurl = req.publicUrl;
    let galleryPresent = req.headers['galleryname'] != undefined;
    let galleryName = req.headers['galleryname'];

    // console.log(req.publicUrl)

    if (req.headers['galleryname']) {
        api_check_name.send({
            "gallery_name": `${galleryName}`
        });

    } else {
        api_check_name.send({
            "gallery_name": "MyGallery"
        });
    }


    // Check if userName aleady exists



    // Response of all user Names 
    api_check_name.end(function(api_res) {
        // console.log(api_res.body)
        // console.log('**********data*******8')
        // console.log(api_res.body['subject_ids'].includes(`${userName}`))
        try {
            if (api_res.body['subject_ids'].includes(`${userName}`)) {
                return res.json({ status: false, message: "ce subjet id est deja enregistre" })
            } else {
                // request if user already exists
                if (galleryPresent) {
                    api_check_req.send({
                        "image": `${imageurl}`,
                        "gallery_name": `${galleryName}`,
                    });
                } else {
                    api_check_req.send({
                        "image": `${imageurl}`,
                        "gallery_name": "MyGallery",
                    });
                }

                // response of user data
                api_check_req.end(function(api_check_res) {
                    // if matching candidates are not available,
                    // console.log(api_check_res.body)
                    if (api_check_res.body.images) {
                        if (api_check_res.body.images[0].transaction.status == 'failure') {
                            //  Send the registration request with the photos
                            if (galleryPresent) {
                                api_req.send({
                                    "image": `${req.publicUrl}`,
                                    "gallery_name": `${galleryName}`,
                                    "subject_id": `${userName}`
                                });
                            } else {
                                api_req.send({
                                    "image": `${req.publicUrl}`,
                                    "gallery_name": "MyGallery",
                                    "subject_id": `${userName}`
                                });
                            }
                            // Waiting for registration response
                            api_req.end(function(api_res) {
                                if (api_res.status == 403)
                                    return res.json({ status: false, message: api_res.body });
                                if (api_res.status == 200)
                                    return res.json({ status: true, message: "Enregistrement réussi" })
                                console.log(' *******  registration-response 1 ********')
                                console.log(api_res.body);
                            });
                        } else {
                            return res.json({ status: false, message: "Face déjà enregistrée dans le système" })
                        }
                    }

                });



            }
        } catch (error) {
            //  Send the registration request with the photos               
            api_req.send({
                "image": `${req.publicUrl}`,
                "gallery_name": `${galleryName}`,
                "subject_id": `${userName}`
            });
            // Waiting for registration response
            api_req.end(function(api_res) {
                if (api_res.status == 403)
                    return res.json({ status: false, message: api_res.body });
                if (api_res.status == 200)
                    return res.json({ status: true, message: "Enregistrement réussi" })

                console.log('********   registration-response 2   ***********')
                console.log(api_res.body);
            });

        }

    });

}