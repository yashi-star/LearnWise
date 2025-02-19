import express from 'express';
import { addAnswer, addQuestion, addReview, addReplyToReview, deleteCourse, editCourse,generateVideoUrl , getAdminAllCourses, getAllCourse, getCourseByUser, getSingleCourse, uploadCourse } from '../controllers/course.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controllers/user.controller';
const courseRouter = express.Router();

courseRouter.post(
    "/create-course",
     updateAccessToken,
    isAuthenticated,
    authorizeRoles("admin"),
    uploadCourse
);

courseRouter.put(
    "/edit-course/:id",
    updateAccessToken,
    isAuthenticated,
    authorizeRoles("admin"),
    editCourse
);

courseRouter.get(
    "/get-course/:id",
    getSingleCourse,
);
courseRouter.get(
    "/get-courses",
    getAllCourse,
);

courseRouter.get(
    "/get-course-content/:id",
    updateAccessToken,
    isAuthenticated,
    getCourseByUser,
);


courseRouter.put(
    "/add-question",
    isAuthenticated,
    addQuestion,
);

courseRouter.put(
    "/add-answer",
    isAuthenticated,
    addAnswer,
);

courseRouter.put(
    "/add-review/:id",
    isAuthenticated,
    addReview,
);
courseRouter.put(
    "/add-reply",
    isAuthenticated,
    authorizeRoles("admin"),
    addReplyToReview,
);

// courseRouter.get(
//     "/get-courses",
//     updateAccessToken,
//     isAuthenticated,
//     authorizeRoles("admin"),
//     getAllCourses,
// );



courseRouter.delete(
    "/delete-course/:id",
     updateAccessToken,
    isAuthenticated,
    authorizeRoles("admin"),
    deleteCourse,
);


courseRouter.post(
    "/getVdoCipherOTP",
    generateVideoUrl,
);


courseRouter.get(
    "/get-admin-courses",
    updateAccessToken,
    isAuthenticated,
    authorizeRoles('admin'),
    getAdminAllCourses
);

export default courseRouter;