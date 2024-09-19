import { Schema, model } from 'mongoose';
import validator from 'validator';

// Schema

import {
    StudentModel,
    TGuardian,
    TLocalGuardian,
    TStudent,
    TUserName,
} from './students/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const nameValidator = function (value: String) {
    const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    return firstNameStr === value;
};

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First Name is Required'],
        maxlength: [20, 'First name should be at least 20 character'],
        trim: true,
        validate: {
            validator: nameValidator,
            message: '{VALUE} is not Capitalized',
        },
    },
    middleName: { type: String },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required'],
        trim: true,
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: '{VALUE} is not valid',
        },
    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: { type: String, required: [true, 'Father Name is Required'] },
    fatherOccupation: {
        type: String,
        required: [true, 'Father occupation is Required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father contact is Required'],
    },
    motherName: { type: String, required: [true, 'Mother Name is Required'] },
    motherOccupation: {
        type: String,
        required: [true, 'Mother occupation is Required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother contact is Required'],
    },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: { type: String, required: [true, ' Name is Required'] },
    occupation: { type: String, required: [true, ' Occupation is Required'] },
    contactNo: { type: String, required: [true, ' Contact no is Required'] },
    address: { type: String, required: [true, ' Address is Required'] },
});

const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: [true, 'password is required'],
        unique: true,
        maxlength: [20, 'Password can be maximum 20 character'],
        minlength: [6, 'Password should be at least 6 character'],
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is Required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not valid',
        },
        required: true,
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: [true, 'Email Name is Required'],
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: '{VALUE} is not valid email',
        },
    },
    contactNo: { type: String, required: [true, 'Contact no is Required'] },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact no is also Required'],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },

    presentAddress: {
        type: String,
        required: [true, 'Present Address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address is required'],
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian is Required'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian is Required'],
    },
    profileImage: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
});
// create pre middleware  | hook
studentSchema.pre('save', async function (next) {
    // console.log(this, 'Check before Create or Post');
    const user = this;

    // bcrypt hashing password
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_hash_saltround)
    );
    next();
});

// post middleware | hook
studentSchema.post('save', function () {
    console.log(this, 'Check after Create or Post');
});

// ===>> for creating static method

studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = Student.findOne({ id });
    return existingUser;
};

// ===>> for creating instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingUser = await Student.findOne({ id });
//     return existingUser;
// };

// Model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
