var unirest = require("unirest");

var api_req = unirest("POST", "https://kairosapi-karios-v1.p.rapidapi.com/recognize");

api_req.headers({
    "x-rapidapi-host": "kairosapi-karios-v1.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "content-type": "application/json",
    "accept": "application/json",
    "useQueryString": true
});

api_req.type("json");

module.exports = (req, res) => {
    console.log('********* Inside the LoginController **************')
    console.log("Gallery Name" + req.headers['galleryname'])
    let galleryPresent = req.headers['galleryname'] != undefined;
    let galleryName = req.headers['galleryname'];

    if (galleryPresent) {
        api_req.send({
            "image": `${req.publicUrl}`,
            "gallery_name": `${galleryName}`
        });
    } else {
        api_req.send({
            "image": `${req.publicUrl}`,
            "gallery_name": "MyGallery"
        });
    }




    api_req.end(function(api_res) {
        console.log('REQUEST END')
        if (api_res.status == 200)

            try {
                console.log("INSIDE TRY")
            if (api_res.body.images[0].transaction.status == "success")
                res.json({ status: true, message: 'Face reconnue dans le système', name: api_res.body.images[0].transaction.subject_id })
            else
                res.json({ status: false, message: "Face non reconnue dans le système" })
        } catch (error) {
            console.log("INSIDE CATCH")
            res.json({ status: false, message: "Aucun utilisateur existant dans le système" })
        }


    });

}