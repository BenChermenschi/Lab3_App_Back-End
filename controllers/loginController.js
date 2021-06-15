require('dotenv').config();
const gebruikersController = require('./gebruikerController');
const tokenController = require('./tokenController');
const { genToken } = require('./tokenController');


exports.login = async function (req, res) {
    console.log("test")
    let email = req.body.email;
    let wachtwoord = req.body.wachtwoord;
    let isAdmin = false;
    console.log("attempting login");
    try {

        let resultaat1 = await gebruikersController.checkWachtwoordAndEmail(email, wachtwoord, res)

        console.log("resultaat1 : ");
        console.log(resultaat1);
        console.log("behind resultaat 1");
        if (resultaat1.gebruikerstype.naam == 'Administrator') {
            isAdmin = true;
            console.log('granting admin priviledge');
        }



        let final = await genToken(res, resultaat1.vollenaam, resultaat1._id, isAdmin);


        console.log(final)

       
        res.json({ token: final,isAdmin:isAdmin,vollenaam:vollenaam });
        console.log("test")
        res.send();



    } catch (err) {
        console.log("something has gone wrong, I blame this : ");
        console.log(err);
        res.json({ message: err });
    }
}


exports.isLoggedIn = (req, res, next) => {
  
    const token = req.headers.auth

    const isValid = tokenController.isTokenValid(token)
    
    if(isValid){
        next()
    }
    else{
        res.status(401).send()
    }

}

exports.isAdmin = (req, res, next) => {
    console.log("testAdmin")
    const token = req.headers.auth

    const isAdmin = tokenController.isAdmin(token)
    
    if(isAdmin){
        next()
    }
    else{
        res.status(401).send()
    }
}










