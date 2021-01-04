let unirest = require("unirest");
let formidable = require('formidable');

let api_req = unirest("POST", "https://kairosapi-karios-v1.p.rapidapi.com/gallery/remove_subject");

api_req.headers({
	"x-rapidapi-host": "kairosapi-karios-v1.p.rapidapi.com",
	"x-rapidapi-key": process.env.API_KEY,
	"content-type": "application/json",
	"accept": "application/json",
	"useQueryString": true
});


api_req.type("json");


module.exports = (req, res) =>{

    console.log(' I got here')
    const form = formidable({ multiples: true });
 
    form.parse(req, (err, fields, files) => {
      if (err) {
       
      }
        api_req.send({
        "gallery_name": "MyGallery",
        "subject_id":  `${fields.name }`
        });

        api_req.end(function (api_res) {
            return res.json({message:api_res.body.message,status:true});
        });
      
    });

}