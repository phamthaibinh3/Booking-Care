import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"
import docdoctorController from '../controllers/doctorController'

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/TB', homeController.getThaiBinh);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/edit-crud',homeController.getEditCRUD);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud',homeController.deleteCRUD);


    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user',userController.handleDeleteUser);

    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', docdoctorController.getTopDoctorHome);

    router.get('/api/get-all-doctor', docdoctorController.getAllDoctors);
    router.post('/api/save-infor-doctor',docdoctorController.postInfoDoctor);
    router.get('/api/get-detail-doctor-by-id', docdoctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', docdoctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', docdoctorController.getScheduleByDate);


    return app.use("/",router)
}

module.exports = initWebRoutes;