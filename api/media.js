const Joi = require("@xavisoft/joi");
const { Router } = require("express");
const Media = require("./db/Media");
const fs = require('fs/promises');
const { MEDIA_DIR } = require("./constants");

const media = Router();

media.post('/', async (req, res) => {
   try {

      // validation
      const schema = {
         ext: Joi.string().required(),
         data: Joi.string().base64().required(),
         branch: Joi.number().integer().required(),
      }

      const error = Joi.getError(req.body, schema); 
      if (error)
         return res.status(400).send(error);

      // create db
      const { ext, branch } = req.body;
      const { id } = await Media.create({ ext, branch });

      const filePath = `${MEDIA_DIR}/${id}.${ext}`
      await fs.writeFile(filePath, req.body.data, 'base64');

      res.send({ id });

   } catch (err) {
      status_500(err, res);
   }
});

media.delete('/:id', async (req, res) => {
   try {

      // retrieve
      const id = req.params.id;
      const media = await Media.findByPk(id);
      const ext = media.ext;

      // detele DB entry
      await media.destroy();

      // delete from DISK
      const filePath = `${MEDIA_DIR}/${id}.${ext}`;
      await fs.unlink(filePath);

      res.send();

   } catch (err) {
      status_500(err, res);
   }
});

module.exports = media;