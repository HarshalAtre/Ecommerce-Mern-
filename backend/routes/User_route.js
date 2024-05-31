const express = require('express');
const { Register, Login, Logout, forgotPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controller/user_controller');
const { isAuthtenticate, AuthorizeRole } = require('../middleware/auth');
const router = express.Router();


router.post('/register',Register)
router.post('/login',Login)
router.get("/logout",Logout)
router.post("/password/forgot",forgotPassword)
router.get("/me",isAuthtenticate,getUserDetails)
router.put("/me/updateP",isAuthtenticate,updatePassword) 
router.put("/me/update",isAuthtenticate,updateProfile)
router.get("/admin/users",isAuthtenticate,AuthorizeRole("admin"),getAllUsers)
router.get("/admin/user/:id",isAuthtenticate,AuthorizeRole("admin"),getSingleUser)

router.route("/admin/user/:id")
.get(isAuthtenticate,AuthorizeRole("admin"),getSingleUser)
.put(isAuthtenticate,AuthorizeRole("admin"),updateUserRole)
.delete(isAuthtenticate,AuthorizeRole("admin"),deleteUser)


module.exports = router;