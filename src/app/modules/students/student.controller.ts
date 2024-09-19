import { Request, Response } from 'express';
import { StuentServices } from './student.service';
import studentValidationSchema from './student.validation';

// import studentValidationJoiSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
    try {
        // post
        const { student: studentData } = req?.body;

        // validation with joi
        // const { error } = studentValidationJoiSchema.validate(studentData);

        // validation with zod
        const zodValidateData = studentValidationSchema.parse(studentData);

        const result =
            await StuentServices.createStudentIntoDB(zodValidateData);

        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: 'Something went wrong !!!',
        //         error: error.details,
        //     });
        // }

        res.status(200).json({
            success: true,
            message: 'Successfully created student',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong !!!',
            error: error,
        });
    }
};

// get all Students
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StuentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: 'Students are retrieved Successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong !!!',
            error: error,
        });
    }
};
// get Single Student
const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StuentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Students is retrieved Successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong !!!',
            error: error,
        });
    }
};

export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
