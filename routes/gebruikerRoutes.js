const express = require('express');
const Gebruiker = require('../models/gebruikerModel');
const gebruikerController = require('../controllers/gebruikerController');
const loginController = require('../controllers/loginController');
const prefix = "/gebruikers";
const authmiddleware = require('../authenticationMiddleware');

module.exports = function (router) {

    router.use(loginController.isLoggedIn);
    router.use(loginController.isAdmin);

    //middleware
    router.use(function (req, res, next) {
        //do type and other validations here
        next();
    });

    
    
       router.route(prefix)
            .get([
                loginController.isLoggedIn,
                loginController.isAdmin,
                gebruikerController.getAllGebruikers
            ]);
        
        
        router.route(prefix+ '/email')
            .get([
                loginController.isLoggedIn,
                gebruikerController.getGebruikerAtEmail]);
    
           // router.route(gebruikerroutepathprefix+ '/pass').get(gebruikerController.checkWachtwoord);
    
        
        router.route(prefix+'/:gebruiker_id')
            .get([
                loginController.isLoggedIn,
                gebruikerController.getGebruikerAtId]);
    
        //private
    
        //admin
        router.route(prefix)
            .post([
                loginController.isLoggedIn,
                loginController.isAdmin,
                gebruikerController.createGebruiker]);
        
        router.route(prefix+'/:gebruiker_id')
            .put([
                loginController.isLoggedIn,
                loginController.isAdmin,
                gebruikerController.updateGebruiker])
            .delete([
                loginController.isLoggedIn,
                loginController.isAdmin,
                gebruikerController.deleteGebruiker]);
    



    //AUTHLESS
/*
    router.route(prefix)

        .get([

            gebruikerController.getAllGebruikers
        ]);


    router.route(prefix + '/email')
        .get([

            gebruikerController.getGebruikerAtEmail]);

    // router.route(gebruikerroutepathprefix+ '/pass').get(gebruikerController.checkWachtwoord);


    router.route(prefix + '/:gebruiker_id')
        .get([

            gebruikerController.getGebruikerAtId]);

    //private

    //admin
    router.route(prefix)
        .post([

            gebruikerController.createGebruiker]);

    router.route(prefix + '/:gebruiker_id')
        .put([

            gebruikerController.updateGebruiker])
        .delete([

            gebruikerController.deleteGebruiker]);
            */

}