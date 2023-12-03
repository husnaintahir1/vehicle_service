const Joi = require("joi");

const validateLogin = function (obj) {
    const schema = Joi.object({
      email: Joi.string().email().required().label('Email').messages({
        'any.required': `{#label} is Required`,
        'string.email': 'Enter a valid email',
      }),
      password: Joi.string().required().label('Password').messages({
        'any.required': `{#label} is Required`,
        'any.empty': `{#label} is Required`,
      }),
    });

    return schema.validate(obj, { allowUnknown: true });
}

const validateRegisterUser = function (obj) {
    const schema = Joi.object({
    //   name: Joi.string().required().label('Name').messages({
    //     'any.required': `{#label} is Required`,
    //     'any.empty': `{#label} is Required`,
    //   }),
      name: Joi.string().required().label('Name').messages({
        'any.required': `{#label} is Required`,
      }),
      email: Joi.string().email().required().label('Email').messages({
        'any.required': `{#label} is Required`,
        'string.email': 'Enter a valid email',
      }),
      phone: Joi.string()
        .required()
        .pattern(new RegExp(/^\+[0-9]{10,15}$/))
        .label('Phone Number')
        .messages({
          'any.required': `{#label} is Required`,
          'string.pattern.base': `{#label} must start with + and country code and followed by other digit digits`
        }),
      password: Joi.string()
        // .regex(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+=]).*$/)
        .required()
        .label("Password")
        .min(6)
        .messages({
        //   "string.pattern.base": "Password must contain atleast 8 char with atleast 1 lower case, 1 upper case and 1 special char",
          'any.required': `{#label} is Required`,
          'string.empty': `{#label} is Required`,
          'string.min': `{#label} has min of 6 Character`,
        }),
    });

    return schema.validate(obj, { allowUnknown: true });
}

const validateRegisterUserPhone = function (obj) {
    const schema = Joi.object({
      phone: Joi.string()
        .required()
        .pattern(new RegExp(/^\+[0-9]{10,15}$/))
        .label('Phone Number')
        .messages({
          'any.required': `{#label} is Required`,
          'string.pattern.base': `{#label} must start with + and country code and followed by other digit digits`
        }),
    });

    return schema.validate(obj, { allowUnknown: true });
}

const validateOtp = function (obj) {
    const schema = Joi.object({
      otp: Joi.string()
        .required()
        .length(4)
        .label('OTP')
        .messages({
          'any.required': `{#label} is Required`,
          'string.length': `{#label} must be exactly 4 characters long`,
        }),
      phone: Joi.string()
      .required()
      .pattern(new RegExp(/^\+[0-9]{10,15}$/))
      .label('Phone Number')
      .messages({
        'any.required': `{#label} is Required`,
        'string.pattern.base': `{#label} must start with + and country code and followed by other digit digits`
      }),
    });

    return schema.validate(obj, { allowUnknown: true });
}


module.exports = {
  validateLogin, 
  validateRegisterUser,
  validateRegisterUserPhone,
  validateOtp,
}