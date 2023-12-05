const Joi = require("joi");

const validateAddVehicle = function (obj) {
    const schema = Joi.object({
        carModal: Joi.string().required().label('Car Modal').messages({
            'any.required': `{#label} is required`,
            'any.empty': `{#label} is required`,
        }),
        carNumber: Joi.string().required().label('Car Number').messages({
            'any.required': `{#label} is required`,
            'any.empty': `{#label} is required`,
        }),
        license: Joi.string().required().label('License').messages({
            'any.required': `{#label} is required`,
            'any.empty': `{#label} is required`,
        }),
        problem: Joi.string().required().label('Problem').messages({
            'any.required': `{#label} is required`,
            'any.empty': `{#label} is required`,
        }),
    });

    return schema.validate(obj, { allowUnknown: true });
}

const validateUpdateVehicle = function (obj) {
    const schema = Joi.object({
        carModal: Joi.string().label('Car Modal').messages({
            'any.required': `{#label} is required`,
            'any.empty': `{#label} is required`,
        }),
        carNumber: Joi.string().label('Car Number').messages({
            'any.required': `{#label} is required`,
            'any.empty': `{#label} is required`,
        }),
        license: Joi.string().label('License').messages({
            'any.required': `{#label} is required`,
            'any.empty': `{#label} is required`,
        }),
        problem: Joi.string().label('Problem').messages({
            'any.required': `{#label} is required`,
            'any.empty': `{#label} is required`,
        }),
    });

    return schema.validate(obj, { allowUnknown: true });
}

module.exports = {
    validateAddVehicle,
    validateUpdateVehicle,
};
