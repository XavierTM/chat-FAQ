const { Router } = require("express")
const status_500 = require('./status_500');
const Joi = require('@xavisoft/joi');
const Branch = require("./db/Branch");
const Media = require("./db/Media");

const branches = Router();

branches.post('/', async (req, res) => {

   try {

      // validation
      const schema = {
         title: Joi.string().required(),
         body: Joi.string().required(),
         parent: Joi.number().integer().allow(null),
      }

      const error = Joi.getError(req.body, schema);
      if (error)
         return res.status(400).send(error);

      // create db
      const { id } = await Branch.create(req.body);

      res.send({ id });

   } catch (err) {
      status_500(err, res);
   }
})

branches.get('/', async (req, res) => {

   try {

      // retrieve
      let branches = await Branch.findAll({
         attributes: [ 'id', 'title', 'body' ],
         include: {
            model: Media,
            as: '__media',
            attributes: [ 'id', 'ext' ]
         }
      });

      branches = branches.map(branch => {
         branch = branch.dataValues;
         branch.media = branch.__media.map(media => media.dataValues);
         delete branch.__media;
         return branch;
      });

      res.send(branches);

   } catch (err) {
      status_500(err, res);
   }
});

branches.get('/:id', async (req, res) => {

   try {

      // retrieve
      const id = JSON.parse(req.params.id) || null;
      let branch;

      if (id) {
         branch = await Branch.findByPk(id, { attributes: [ 'title', 'body' ]});

         if (!branch)
            return res.sendStatus(404);

         branch = branch.dataValues;

         branch.media = await Media.findAll({
            where: { branch: id },
            attributes: [ 'id', 'ext' ],
         });

         branch.media = branch.media.map(item => item.dataValues);

      } else {
         branch = {
            name: 'Welcome to ChatFAQ',
            body: 'What are you looking for?',
            media: [],
         }
      }

      const branches = await Branch.findAll({
         where: { parent: id },
         attributes: [ 'id', 'title', ],
      });

      branch.branches = branches.map(branch => branch.dataValues);

      res.send(branch);

   } catch (err) {
      status_500(err, res);
   }
});

branches.delete('/:id', async (req, res) => {

   try {

      const id = req.params.id;
      await Branch.destroy({ where: { id }});

      res.send();

   } catch (err) {
      status_500(err, res);
   }
});

module.exports = branches;