const express = require('express');
const Vak = require('../models/vakModel');
const Gebruikerstype = require('../models/gebruikerstypeModel');
const vakController = require('../controllers/vakController');
const prefix="/vakken";
const authmiddleware = require('../authenticationMiddleware');
const loginController = require('../controllers/loginController');

module.exports= function (router){
    
    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });


    
    router.route(prefix)
        .get([
            loginController.isLoggedIn,
            vakController.getAllVakken]);

    router.route(prefix+'/:vak_id')
        .get([
            loginController.isLoggedIn,
            vakController.getVakAtId]);

    router.route(prefix)
        .post([
            loginController.isLoggedIn,
            loginController.isAdmin,
            vakController.createVak]);

    router.route(prefix+'/:vak_id')
        .put([
            loginController.isLoggedIn,
            loginController.isAdmin,
            vakController.updateVak])
        .delete([
            loginController.isLoggedIn,
            loginController.isAdmin,
            vakController.deleteVak]);
            


            /*
    //AUTHLESS
    router.route(prefix)
        .get([
           
            vakController.getAllVakken]);

    router.route(prefix+'/:vak_id')
        .get([
           
            vakController.getVakAtId]);

    router.route(prefix)
        .post([
            
            vakController.createVak]);

    router.route(prefix+'/:vak_id')
        .put([
            
            vakController.updateVak])
        .delete([
            
            vakController.deleteVak]);

            */
}


