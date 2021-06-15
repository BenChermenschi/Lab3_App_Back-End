const express = require('express');
const vragenlijstRouter = express.Router();
const Vragenlijst=require('../models/vragenlijstModel');
const vragenlijstController = require('../controllers/vragenlijstController');
const prefix='/vragenlijsten';
const authmiddleware = require('../authenticationMiddleware');

module.exports= function(router){

    //middleware
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });


    
    router.route(prefix)
        .post([
            loginController.isLoggedIn,
            vragenlijstController.createVragenlijst])
        .get([
            loginController.isLoggedIn,
            vragenlijstController.getAllVragenlijsten]);


    router.route(prefix+'/gebruiker')
            .get([
                loginController.isLoggedIn,
                vragenlijstController.getVragenlijstenByGebruikersId]);

    router.route(prefix+'/:vragenlijst_id')
        .get([
            loginController.isLoggedIn,
            vragenlijstController.getVragenlijstAtId])
        .put([
            loginController.isLoggedIn,
            vragenlijstController.updateVragenlijst])
        .delete([
            loginController.isLoggedIn,
            vragenlijstController.deleteVragenlijst]);


    //AUTHLESS

    /*
    router.route(prefix)
        .post([
            
            vragenlijstController.createVragenlijst])
        .get([
           
            vragenlijstController.getAllVragenlijsten]);


    router.route(prefix+'/gebruiker')
            .get([
              
                vragenlijstController.getVragenlijstenByGebruikersId]);

    router.route(prefix+'/:vragenlijst_id')
        .get([
      
            vragenlijstController.getVragenlijstAtId])
        .put([
       
            vragenlijstController.updateVragenlijst])
        .delete([
        
            vragenlijstController.deleteVragenlijst]);
    */
}


