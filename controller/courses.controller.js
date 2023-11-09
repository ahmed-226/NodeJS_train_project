// let {courses} =require('../data/courses')
const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");
const acyncwrapper = require("../middleware/acyncwrapper");

const getAllcourese = async (req, res) => {
    const query = req.query;
    const limit = query.limit || 4;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: courses });
};

// acyncwrapper (
//      )

const getCourese = async (req, res) => {
    // const courseID =+req.params.courseId
    // const course=courses.find((course)=>  course.id === courseID)
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res
                .status(404)
                .json({ status: httpStatusText.FAIL, data: { course: null } });
        }
        res.json({ status: httpStatusText.SUCCESS, data: course });
    } catch (e) {
        return res
            .status(404)
            .json({ status: httpStatusText.ERROR, message: "invalid opject id" });
    }
};

const addCourse = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(404)
            .json({ status: httpStatusText.FAIL, data: errors.array() });
    }

    const newcourse = new Course(req.body);
    await newcourse.save();
    res
        .status(201)
        .json({ status: httpStatusText.SUCCESS, data: { course: newcourse } });
    // const newcourse ={id: courses.length +1 ,...req.body}
    // courses.push(newcourse)
    // res.status(201).json(newcourse)
};

const updatecourse = async (req, res) => {
    // const courseID =+req.params.courseId
    // let course=courses.find((course)=>  course.id === courseID)
    // const errors=validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(404).json(errors.array())
    // }
    // course={...course,...req.body}
    try {
        const courseID = req.params.courseId;
        const updatedcourse = await Course.updateOne(
            { _id: courseID },
            { $set: { ...req.body } }
        );
        res
            .status(200)
            .json({
                status: httpStatusText.SUCCESS,
                data: { course: updatedcourse },
            });
    } catch (e) {
        return res
            .status(404)
            .json({ status: httpStatusText.ERROR, message: e.message });
    }
};

const deletecourse = async (req, res) => {
    // const courseID =+req.params.courseId
    // courses=courses.filter((course)=>  course.id !== courseID)
    await Course.deleteOne({ _id: req.params.courseId });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
};

module.exports = {
    getAllcourese,
    getCourese,
    addCourse,
    updatecourse,
    deletecourse,
};
