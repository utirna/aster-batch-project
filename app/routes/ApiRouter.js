const express = require("express");
const apiRouter = express.Router();
const StudentController = require("../controller/api/StudentController");
const AuthUsersController = require("../controller/api/AuthUsersController");
let { checkAuth, isAdmin } = require("./middleware/auth.middleware");
/* get */
apiRouter.get("/", StudentController.apiHome);
apiRouter.get("/student/list", StudentController.studentList);
apiRouter.get("/student/single-details/:id", StudentController.studentDetails);

/* post */
apiRouter.post(
  "/student/add-new",
  checkAuth,
  isAdmin,
  StudentController.saveNewStudent
);
apiRouter.post("/add-user", AuthUsersController.createUser);
apiRouter.post("/check-login", AuthUsersController.checkLogin);

/* delete */
apiRouter.delete("/student/delete/:id", StudentController.studentDelete);

/* patch */
apiRouter.patch("/student/update", StudentController.studentUpdate);
module.exports = apiRouter;
