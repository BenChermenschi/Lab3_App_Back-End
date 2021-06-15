const express= require('express');
const gebruikerstypeController = require('../controllers/gebruikerstypeController');
const Gebruikerstype = require('../models/gebruikerstypeModel');
const prefix="/gebruikerstypes";
const authmiddleware = require('../authenticationMiddleware');
const loginController = require('../controllers/loginController');

module.exports=function(router){

    //middleware for debugging
    router.use(function(req,res,next){
        next();
    });



    //public
    router.route(prefix)
        .get([
            loginController.isLoggedIn,
            gebruikerstypeController.getAllGebruikerstypes]);

    router.route(prefix+'/:gebruikerstype_id')
        .get([
            loginController.isLoggedIn,
            gebruikerstypeController.getGebruikerstypeAtId]);
    //private
    router.route(prefix)
    .post([
        loginController.isLoggedIn,
        loginController.isAdmin,
        gebruikerstypeController.createGebruikerstype]);

    router.route(prefix+'/:gebruikerstype_id')
    .put([
        loginController.isLoggedIn,
        loginController.isAdmin,
        gebruikerstypeController.updateGebruikerstype])
    .delete([
        loginController.isLoggedIn,
        loginController.isAdmin,
        gebruikerstypeController.deleteGebruikerstype]);



    //AUTHLESS
/*

    //public
    router.route(prefix)
        .get([
         
            gebruikerstypeController.getAllGebruikerstypes]);

    router.route(prefix+'/:gebruikerstype_id')
        .get([
           
            gebruikerstypeController.getGebruikerstypeAtId]);
    //private
    router.route(prefix)
    .post([
     
        gebruikerstypeController.createGebruikerstype]);

    router.route(prefix+'/:gebruikerstype_id')
    .put([
       
        gebruikerstypeController.updateGebruikerstype])
        .delete([
        
            gebruikerstypeController.deleteGebruikerstype]);

*/


}  