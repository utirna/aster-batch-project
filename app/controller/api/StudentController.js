const StudentDetailsModel = require("../../model/StudentDetailsModel");

let StudentController = {
  apiHome: function (req, res) {
    res.send("hello this is api");
  },

  studentList: async function (req, res) {
    try {
      let result = await StudentDetailsModel.find();
      res.send({
        status: true,
        studentList: result,
        studentCount: result.length,
      });
    } catch (error) {
      res.status(500).send({ status: false, error: error });
    }
  },

  saveNewStudent: async function (req, res) {
    user = res["user"];
    res.send({ result: user });
    return false;
    try {
      let data = req.body;

      let student = new StudentDetailsModel({
        name: data.name,
        course: data.course,
      });

      const result = await student.save();
      res.send({
        status: true,
        result,
        message: "Candidate added successfully.",
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: false, error: error, message: "Server Error" });
    }
  },

  studentDetails: async function (req, res) {
    try {
      let { id } = req.params;
      let student = await StudentDetailsModel.findById(id);
      if (student === null) {
        res.send({ status: false, message: "Student Not Found" });
      } else {
        res.send({ status: true, details: student });
      }
    } catch (error) {
      res
        .status(500)
        .send({ status: false, error: "Server Error ... Student Not Found" });
    }
  },

  studentDelete: async function (req, res) {
    try {
      let { id } = req.params;

      let { deletedCount } = await StudentDetailsModel.deleteOne({ _id: id });

      if (deletedCount === 0) {
        res.send({ status: false, message: "Student Not Removed" });
      } else {
        res.send({ status: true, message: "student deleted successfully" });
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        error: "Server Error ... Unable to delete student",
      });
    }
  },

  studentUpdate: async function (req, res) {
    try {
      let data = req.body;
      // find
      let result = await StudentDetailsModel.findById(data._id);

      if (result === null) {
        res.send({ status: false, message: "student not found" });
      } else {
        let { modifiedCount } = await StudentDetailsModel.updateOne(
          { _id: data._id },
          {
            name: data.name,
            course: data.course,
          }
        );
        res.send({
          status: true,
          message:
            modifiedCount > 0
              ? "student updated successfully"
              : "nothing is updated",
        });
      }
    } catch (error) {
      res
        .status(500)
        .send({ status: false, error: "Server Error ... Unable to update" });
    }
  },
};

module.exports = StudentController;
