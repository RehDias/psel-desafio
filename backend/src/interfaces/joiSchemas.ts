import Joi from "joi";

const cpfOrCnpjRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;

const accountSchema = Joi.object({
  cpf_cnpj: Joi.string().pattern(cpfOrCnpjRegex).required().messages({
    'string.pattern.base': 'O documento deve ser um CPF ou CNPJ válido.',
    'string.empty': 'O campo documento não pode estar vazio.',
    'any.required': 'O campo documento é obrigatório.',
  }),
  name: Joi.string().min(3).required().messages({
    'string.empty': 'O campo nome não pode estar vazio.',
    'string.min': 'O campo nome deve possuir no mínimo 3 caracteres.',
    'any.required': 'O campo nome é obrigatório.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'O campo e-mail não pode estar vazio.',
    'string.email': 'O campo e-mail deve ser um e-mail válido.',
    'any.required': 'O campo e-mail é obrigatório.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'O campo senha não pode estar vazio.',
    'string.min': 'O campo senha deve possuir no mínimo 8 caracteres.',
    'any.required': 'O campo senha é obrigatório.',
  }),
  account_status: Joi.boolean()
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).messages({
    'string.empty': 'O campo nome não pode estar vazio.',
    'string.min': 'O campo nome deve possuir no mínimo 3 caracteres.',
  }), 
  email: Joi.string().email().messages({ 
    'string.empty': 'O campo e-mail não pode estar vazio.',
    'string.email': 'O campo e-mail deve ser um e-mail válido.',
  }),
  password: Joi.string().min(8).messages({
    'string.empty': 'O campo senha não pode estar vazio.',
    'string.min': 'O campo senha deve possuir no mínimo 8 caracteres.',
  }) 
})

const transactionSchema = Joi.object({});

export { accountSchema, transactionSchema, updateSchema };