import { Request, Response } from 'express';
import { StuentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req?.body;
        const result = await StuentServices.createStudentIntoDB(studentData);

        res.status(200).json({
            success: true,
            message: 'Successfully created student',
            data: result,
        });
    } catch (error: any) {
        console.log(error.message);
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
        console.log(error);
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
        console.log(error);
    }
};

export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
