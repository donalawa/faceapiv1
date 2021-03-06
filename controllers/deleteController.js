

let unirest = require("unirest");
let formidable = require('formidable');

let api_req = unirest("POST", "https://kairosapi-karios-v1.p.rapidapi.com/gallery/remove_subject");
let api_check_req = unirest("POST", "https://kairosapi-karios-v1.p.rapidapi.com/recognize");

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


api_req.type("json");
api_check_req.type("json")


module.exports = (req, res) =>{
console.log(' Inside the delete controller')
console.log(`${req.publicUrl}`)
let userName = req.headers['username']
let galleryPresent = req.headers['galleryname'] != undefined;
let galleryName = req.headers['galleryname'];

      
       // Check it user already exists
       if(galleryPresent) {
           console.log('Gallery Present')
            api_check_req.send({
                "image": `${req.publicUrl}`,
                "gallery_name": `${galleryName}`,
            });

       }else {
        console.log('Gallery Not Present')
        api_check_req.send({
            "image": `${req.publicUrl}`,
            "gallery_name": "MyGallery",  
        });
       } 
        
        // Waiting for remove response
        api_check_req.end(function (api_res) {
            try {
                console.log('Inside Response End')
                if(api_res.body.images[0].transaction.status=="failure"){
                    return res.json({status:false,message:"utilisateur n'existe pas dans le système"})
    
                }
                else{
                    console.log('Inside Response End Else Blog')
                   if(userName == api_res.body.images[0].transaction.subject_id) {
                   if(galleryPresent) {
                    api_req.send({
                        "gallery_name": `${galleryName}`,
                        "subject_id":  `${userName }`
                    });
                
                   }else {
                    api_req.send({
                        "gallery_name": "MyGallery",
                        "subject_id":  `${userName }`
                    });
                
                   }
                        api_req.end(function (api_res) {
                            return res.json({message:api_res.body.message,status:true});
                        });
                   }
                   else{
                        return res.json({status:false,message:"utilisateur ne correspond pas à l'identifiant envoyé "})
                   }
    
                }
            } catch (error) {
                return res.json({status:false,message:"Aucun utilisateur existant dans le système"})
            }
        });
        

}