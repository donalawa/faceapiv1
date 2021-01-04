const fs = require('fs');
const { json } = require('express');

let newUser = { name: "Third User", galleryName: "MyGallery", url: "http://gallery.com" };

function addDataToFile(userInfo) {
    var existingData = [];

    fs.exists('keepfile.json', function(exists) {
        if (exists) {
            console.log('File already exist get data push to it and save file again')
            fs.readFile('keepfile.json', function readFileCallBack(err, data) {
                if (err) {
                    console.log('There was an error');
                    console.log(err)
                } else {
                    existingData = JSON.parse(data);
                    let newData = userInfo;
                    existingData.push(newData);
                    let json = JSON.stringify(existingData);
                    fs.writeFile('keepfile.json', json, 'utf8', function callBackAfterAddData(err) {
                        if (err) {
                            console.log('There was an error while trying to save')
                        }
                        console.log('Added To File Successfuly')
                    })
                }
            })
        } else {
            console.log('File Does Not Exist Create File And Add Data To It');
            existingData.push(userInfo);
            let jsonData = JSON.stringify(existingData);
            fs.writeFile('keepfile.json', jsonData, 'utf8', function writeFileCallBack(err) {
                if (err) {
                    console.log('There was an error writing to file')
                }
                console.log('Finished Writing to file')
            })
        }
    });
}

// addDataToFile(newUser);


function getAllUsersAndAddToNew() {
    // let allData = [];
    fs.readFile('keepfile.json', 'utf8', function callBack(err, data) {
        let allData = JSON.parse(data);
        console.log(allData)
    })
}

// getAllUsersAndAddToNew();

let total = 7;
async function delayRes(num) {
    let num2;
    let newTest = new Promise(resolve => setTimeout(()=> { num2 = num * 2; },5000) )
     
   await  newTest.then((res) => {
        console.log(res)
    })
    return 4;
} 

async function makeCalls() {
    for(let i = 0; i < total; i++) {
        await console.log(delayRes(i));
        console.log('After Delay')
    }
}

makeCalls()