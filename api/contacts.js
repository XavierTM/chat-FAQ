const { Router } = require("express");
const status_500 = require("./status_500");
const Joi = require("@xavisoft/joi");
const Contact = require("./db/Contact");


const contacts = Router();

contacts.post('/', async (req, res) => {
   try {

      // validate
      const schema = {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
         phone: Joi.string().required(),
         bio: Joi.string().min(0).required(),
      }

      const error = Joi.getError(req.body, schema);
      if (error)
         return res.status(400).send(error);

      // create
      const { id } = await Contact.create(req.body);

      res.send({ id })

   } catch {
      status_500(err, res);
   }
})

contacts.get('/', async (req, res) => {
   try {

      const contacts = await Contact.findAll({
         attributes: [ 'id', 'name', 'email', 'phone', 'bio' ]
      });

      res.send(contacts);

   } catch {
      status_500(err, res);
   }
})

contacts.delete('/:id', async (req, res) => {
   try {

      await Contact.destroy({ where: { id: req.params.id }})
      res.send(); 
   } catch {
      status_500(err, res);
   }
})

module.exports = contacts;