const Joi = require("joi");

const validateAddVehicle = function (obj) {
    const schema = Joi.object({
      carModal: Joi.string().required().label('Car Modal').messages({
        'any.required': `{#label} is Required`,
        'string.email': 'Enter a valid email',
      }),
      carNumber: Joi.string().required().label('Car Number').messages({
        'any.required': `{#label} is Required`,
        'any.empty': `{#label} is Required`,
      }),
      license: Joi.string().required().label('License').messages({
        'any.required': `{#label} is Required`,
        'any.empty': `{#label} is Required`,
      }),
      problem: Joi.string().required().label('Problem').messages({
        'any.required': `{#label} is Required`,
        'any.empty': `{#label} is Required`,
      }),
    });

    return schema.validate(obj, { allowUnknown: true });
}


module.exports = {
    validateAddVehicle,
}