import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
    // mongoose built in methods
    // const result = await Student.create(studentData);

    // static method
    if (await Student.isUserExists(studentData.id)) {
        throw new Error('User is already exists !');
    }
    const result = await Student.create(studentData);

    // const student = new Student(studentData); //create an instance

    // if (await student.isUserExists(studentData.id)) {
    //     throw new Error('User is already exists !');
    // }

    // const result = await student.save();
    return result;
};

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
};

const getSingleStudentFromDB = async (id: String) => {
    const result = await Student.findOne({ id });
    return result;
};

export const StuentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
};
