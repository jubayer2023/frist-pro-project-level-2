import Joi from 'joi';

// joi validation schema
const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .max(20)
        .trim()
        .regex(/^[A-Z][a-z]*$/, 'Capitalized First Letter')
        .messages({
            'string.pattern.base': '{#label} must be capitalized',
            'string.max': 'First name should not exceed 20 characters',
            'any.required': 'First Name is required',
        }),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
        .required()
        .trim()
        .regex(/^[A-Z][a-z]*$/, 'Capitalized Last Letter')
        .messages({
            'string.pattern.base': '{#label} must be capitalized',
            'any.required': 'Last Name is required',
        }),
});

// Joi Schema for Guardian
const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
        'any.required': 'Father Name is required',
    }),
    fatherOccupation: Joi.string().required().messages({
        'any.required': 'Father Occupation is required',
    }),
    fatherContactNo: Joi.string().required().messages({
        'any.required': 'Father Contact Number is required',
    }),
    motherName: Joi.string().required().messages({
        'any.required': 'Mother Name is required',
    }),
    motherOccupation: Joi.string().required().messages({
        'any.required': 'Mother Occupation is required',
    }),
    motherContactNo: Joi.string().required().messages({
        'any.required': 'Mother Contact Number is required',
    }),
});

// Joi Schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Local Guardian Name is required',
    }),
    occupation: Joi.string().required().messages({
        'any.required': 'Local Guardian Occupation is required',
    }),
    contactNo: Joi.string().required().messages({
        'any.required': 'Local Guardian Contact Number is required',
    }),
    address: Joi.string().required().messages({
        'any.required': 'Local Guardian Address is required',
    }),
});

// Joi Schema for Student
const studentValidationJoiSchema = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'Student ID is required',
    }),
    name: userNameValidationSchema.required().messages({
        'any.required': 'Name is required',
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
        'any.only': '{#label} must be one of [male, female, other]',
        'any.required': 'Gender is required',
    }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    contactNumber: Joi.string().required().messages({
        'any.required': 'Contact Number is required',
    }),
    emergencyContactNo: Joi.string().required().messages({
        'any.required': 'Emergency Contact Number is required',
    }),
    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .optional()
        .messages({
            'any.only': '{#label} must be a valid blood group',
        }),
    presentAddress: Joi.string().required().messages({
        'any.required': 'Present Address is required',
    }),
    permanentAddress: Joi.string().required().messages({
        'any.required': 'Permanent Address is required',
    }),

    guardian: guardianValidationSchema.required().messages({
        'any.required': 'Guardian details are required',
    }),
    localGuardian: localGuardianValidationSchema.required().messages({
        'any.required': 'Local Guardian details are required',
    }),
    profileImage: Joi.string().optional(),
    isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active')
        .messages({
            'any.only': '{#label} must be either active or blocked',
        }),
});

export default studentValidationJoiSchema;
