
import joi from "joi";

const registerSchema = joi.object({
    name: joi.string()
    .min(2)
    .trim()
    .required()
    .messages({
        "string.base":"name must be string format",
        "string.empty":"name is required",
        "string.min":"name must be atLeast 2 character long",
        "any.required":"name is required"
    }),
    email: joi.string()
    .email()
    .required()
    .messages({
        "string.empty":"password is required",
        "any.required":"email is required"
    }),
    password : joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
    .messages({
        "string.empty":"password is required",
        "string.min":"password must be atLeast 6 character long",
        "any.required":"email is required",
    }),
    phone : joi.number()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
        "number.empty":"password is required",
        "any.required":"email is required",
    }),
    role: joi.string()
    .valid("customer","provider","admin","super_admin")
    .optional()
    .messages({
        "string.empty":"role is required from any of these customer.",
        "any.required":"email is required",
    }),
});

export default registerSchema;