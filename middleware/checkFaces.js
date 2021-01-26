require('dotenv').config()
let FORMIDABLE = require('formidable')
const fs = require('fs');
const path = require('path')

let read = undefined;
let write = undefined;
let blobType = false;
let fileType = false;

let imagePath = [];

let unirest = require("unirest");

let api_req = unirest("POST", "https://kairosapi-karios-v1.p.rapidapi.com/detect");


api_req.headers({
    "x-rapidapi-host": "kairosapi-karios-v1.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "content-type": "application/x-www-form-urlencoded",
    "accept": "application/json",
    "useQueryString": true
});

api_req.type("json");

function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}


module.exports = (req, res, next) => {

    const test_form = FORMIDABLE({ multiples: true });

    test_form.parse(req, (err, fields, files) => {

        if (err) {
            next(err);
            return;
        }
        console.log(files)
        console.log(typeof files.image)


        if (Object.keys(files).includes('image')) {
            console.log('***** a normal file ********')
            fileType = true
            read = fs.createReadStream(files.image.path)
            write = fs.createWriteStream(path.join(__dirname, '../images', files.image.name))

            read.pipe(write).on('finish', (err) => {

                console.log('**** Url *******' + `https://face-testv1.herokuapp.com/images/${files.image.name}` + '******** Url ****')
                req.publicUrl = `https://face-testv1.herokuapp.com/images/${files.image.name}`;

                req.userName = fields.name

                api_req.send({
                    "image": `${req.publicUrl}`,
                    "selector": "ROLL"
                });

                api_req.end(function(api_res) {
                    //  Verify if the response was successfull
                    if (api_res.status == 200) {
                        if (!api_res.body['images'])
                            return res.json({ status: false, message: "Aucune face detect&eacute; dans l'image" })
                                //  for a successful responsem, check the number of faces in the image
                        else if (api_res.body.images[0].faces.length == 1)
                        // proceed to registration
                            next();
                        else
                        // proceed to registration
                            res.json({ status: false, message: "Plusieurs faces ont &eacute;t&eacute; detect&eacute; dans l'image. Veuillez vous assurer d'etre seul dans l'image.", faces: api_res.body.images[0].faces.length })
                    } else {
                        console.log('******* An error occured ********')
                        console.log(api_res)
                        res.json({ status: false, message: "Une erreur c'est produit. Veuillez re-essayer encore" })

                    }
                });

            })

        } else if (Object.keys(files).includes('file')) {
            console.log('***** a files in the file object ********')


            blobType = true

            console.log(files.file.path)
            read = fs.createReadStream(files.file.path)
            write = fs.createWriteStream(path.join(__dirname, '../images', 'image.jpg'))

            read.pipe(write).on('finish', (err) => {

                console.log(`https://face-testv1.herokuapp.com/images/image.jpg`)

                req.publicUrl = `https://face-testv1.herokuapp.com/images/image.jpg`;

                req.userName = fields.name

                api_req.send({
                    "image": `${req.publicUrl}`,
                    "selector": "ROLL"
                });

                api_req.end(function(api_res) {
                    //  Verify if the response was successfull
                    if (api_res.status == 200) {
                        if (!api_res.body['images'])
                            return res.json({ status: false, message: "Aucune face detect&eacute; dans l'image" })
                                //  for a successful responsem, check the number of faces in the image
                        else if (api_res.body.images[0].faces.length == 1)
                        // proceed to registration
                            next();
                        else
                        // proceed to registration
                            res.json({ status: false, message: "Plusieurs faces ont &eacute;t&eacute; detect&eacute; dans l'image. Veuillez vous assurer d'etre seul dans l'image.", faces: api_res.body.images[0].faces.length })
                    } else {
                        console.log('******* An error occured ********')
                        res.json({ status: false, message: "Une erreur c'est produit. Veuillez re-essayer encore" })

                    }
                });

            })


        } else {
            console.log('***** a format data ********')

            // IMage Name does not exist
            read = fs.createReadStream(myFile.path)
            write = fs.createWriteStream(path.join(__dirname, '../images', 'image.jpg'))

            read.pipe(write).on('finish', (err) => {

                console.log('**** Url *******' + `https://face-testv1.herokuapp.com/images/${myFile.path}` + '******** Url ****')
                req.publicUrl = `https://face-testv1.herokuapp.com/images/${myFile.path}`;

                req.userName = fields.name

                api_req.send({
                    "image": `${req.publicUrl}`,
                    "selector": "ROLL"
                });

                api_req.end(function(api_res) {
                    //  Verify if the response was successfull
                    if (api_res.status == 200) {
                        if (!api_res.body['images'])
                            return res.json({ status: false, message: "Aucune face detect&eacute; dans l'image" })
                                //  for a successful responsem, check the number of faces in the image
                        else if (api_res.body.images[0].faces.length == 1)
                        // proceed to registration
                            next();
                        else
                        // proceed to registration
                            res.json({ status: false, message: "Plusieurs faces ont &eacute;t&eacute; detect&eacute; dans l'image. Veuillez vous assurer d'etre seul dans l'image.", faces: api_res.body.images[0].faces.length })
                    } else {
                        console.log('******* An error occured ********')
                        res.json({ status: false, message: "Une erreur c'est produit. Veuillez re-essayer encore" })

                    }
                });

            })

        }




    });

    // const test_form = FORMIDABLE({ multiples: true });

    // test_form.parse(req, (err, fields, files) => {
    //   if (err) {
    //     next(err);
    //     return;
    //   }
    //   var myFile = blobToFile(files.image, "my-image.png");
    //   console.log("*********  File  ************")

    //   console.log(Object.keys(myFile[0]))
    //   console.log(myFile[0])
    //   const read = fs.createReadStream(myFile[0].path)
    //   const write = fs.createWriteStream(path.join(__dirname,'../images',myFile[0].name))

    //   read.pipe(write).on('finish',(err,res)=>{

    //     console.log('****  Copy Image Url  ***')
    //     req.publicUrl = `http://immense-shore-43563.herokuapp.com/images/${myFile[0].name}`;
    //     req.userName = fields.name

    //     api_req.send({
    //         "image": `http://immense-shore-43563.herokuapp.com/images/${myFile[0].name}`,
    //         "selector": "ROLL"
    //     });
    //     imagePath=[]

    //     api_req.end(function (api_res) {
    //         //  Verify if the response was successfull
    //         if(api_res.status==200){
    //             if(!api_res.body['images'])
    //                 return res.json({status:false,message:"Aucune face detect&eacute; dans l'image"})
    //         //  for a successful responsem, check the number of faces in the image
    //             else if(api_res.body.images[0].faces.length==1)
    //         // proceed to registration
    //                 next();
    //             else 
    //         // proceed to registration
    //                 res.json({status:false,message: "Plusieurs faces ont &eacute;t&eacute; detect&eacute; dans l'image. Veuillez vous assurer d'etre seul dans l'image.", faces:api_res.body.images[0].faces.length})
    //         }

    //         else{
    //             console.log('******* An error occured ********')
    //             console.log({status:false,message: "Une erreur c'est produit. Veuillez re-essayer encore"})

    //         }
    //     });
    //     console.log(`http://immense-shore-43563.herokuapp.com/images/${files.image.name}`)
    //     console.log(`https://immense-shore-43563.herokuapp.com/images/${files.image.name}`)
    //   })


    // });




}