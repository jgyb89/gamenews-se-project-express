const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Custom URL validator for Joi
const customUrlValidation = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message("Invalid URL format");
};

const validateUserCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(customUrlValidation),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatePostCreation = celebrate({
  body: Joi.object().keys({
    imageUrl: Joi.string().required().custom(customUrlValidation),
    gameTitle: Joi.string().required().min(2).max(100),
    categories: Joi.array().items(Joi.string()).default([]),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    postId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateUserCreation,
  validateLogin,
  validatePostCreation,
  validateId,
};
