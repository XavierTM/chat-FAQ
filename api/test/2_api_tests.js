

const { waitForServer,  createRequester, createBranch, createContact, } = require("./utils");
const chai = require('chai');
const casual = require("casual");
const { assert, expect } = chai;
const chaiHttp = require('chai-http');
const chaiSpies = require('chai-spies');
const Branch = require("../db/Branch");
const Media = require("../db/Media");
const randomString = require('random-base64-string');
const randomBase64String = require("random-base64-string");
const fs = require('fs/promises');
const { MEDIA_DIR } = require("../constants");
const Contact = require("../db/Contact");

chai.use(chaiHttp);
chai.use(chaiSpies);

const requester = createRequester();


suite('API tests', function() {

   this.beforeAll(async () => {
      await waitForServer();

      // create spies on fs
      chai.spy.on(fs, [ 'writeFile', 'unlink' ]);

      chai.spy.on(fs, 'readFile', () => {
         const array = [];

         const iMax = casual.integer(200, 300);

         for (let i = 0; i <= iMax; i++)
            array.push(casual.integer(0, 255));

         return Buffer.from(array);
      });
   });

   suite('Branches', function() {

      test('Create branch', async () => {

         const payload = {
            title: casual.catch_phrase,
            body: casual.text,
         }

         const res = await requester
            .post('/api/branches')
            .send(payload);

         assert.equal(res.status, 200);

         // schema
         assert.isNumber(res.body.id);

         // check db
         const branch = await Branch.findOne({ order: [[ 'id', 'DESC' ]]});
         assert.isObject(branch);

         assert.equal(branch.title, payload.title);
         assert.equal(branch.body, payload.body);

      });

      test('Retrieve branches', async () => {

         // create some data
         const branches = await createBranch({}, casual.integer(5, 10));

         const res = await requester
            .get('/api/branches')
            .send();

         assert.equal(res.status, 200);

         // check schema
         assert.isArray(res.body);

         assert.isObject(res.body[0]);
         assert.isNumber(res.body[0]);
         assert.isString(res.body[0].title);
         assert.isString(res.body[0].body);
         assert.isArray(res.body[0].media);

         assert.isAtLeast(res.body.length, branches.length);
         

      });


      test('Delete branch', async () => {

         let branch = await createBranch();

         const res = await requester
            .delete(`/api/branches/${branch.id}`)
            .send();

         assert.equal(res.status, 200);

         // check db
         branch = await Branch.findByPk(branch.id);
         assert.isNull(branch);

      });

      test('Chat', async () => {

         // initial message
         const topLevelBranches = await createBranch({}, casual.integer(5, 10));

         let res = await requester
            .get(`/api/branches/null`)
            .send();

         assert.equal(res.status, 200);

         // check schema
         assert.isObject(res.body);
         assert.isString(res.body[0].name);
         assert.isString(res.body[0].body);
         assert.isArray(res.body[0].media);
         assert.isArray(res.body[0].branches);

         // subsequent message
         const topLevelBranch = topLevelBranches[0];
         const branches = await createBranch({ parent: topLevelBranch.id }, casual.integer(5, 10))

         res = await requester
            .get(`/api/branches/${topLevelBranch.id}`)
            .send();

         // check schema
         assert.equal(res.body.branches.length, branches.length);


      });

   });

   suite('Media', function() {

      test('Create media', async () => {

         const branch = await createBranch();

         const payload = {
            ext: casual.random_element([ 'pdf', 'png', 'docx' ]),
            data: randomBase64String(casual.integer(100, 200)),
            branch: branch.id,
         }

         const res = await requester
            .post('/api/media')
            .send(payload);

         assert.equal(res.status, 200);

         // schema
         assert.isNumber(res.body.id);

         // check db
         const media = await Media.findOne({ where: { branch: branch.id }});
         assert.isObject(media);
         assert.equal(media.ext, payload.ext);

         // check spies
         const filePath = `${MEDIA_DIR}/${media.id}.${media.ext}`;
         expect(fs.writeFile).to.have.been.called.with(filePath);

      });

      test('Delete media', async () => {

         const branch = await createBranch();

         let media = await Media.create({
            ext: casual.random_element([ 'pdf', 'png', 'docx' ]),
            branch: branch.id,
         });

         const res = await requester
            .delete(`/api/media/${media.id}`)
            .send();

         assert.equal(res.status, 200);  

         // check spies
         const filePath = `${MEDIA_DIR}/${media.id}.${media.ext}`;
         expect(fs.unlink).to.have.been.called.with(filePath);

         // check db
         media = await Media.findByPk(media.id);
         assert.isNull(media);

      });



   });

   suite('Contacts', function() {

      test('Create contact', async () => {

   
         const payload = {
            name: casual.name,
            email: casual.email.toLowerCase(),
            phone: casual.phone,
            bio: casual.text,
         }

         const res = await requester
            .post('/api/contacts')
            .send(payload);

         assert.equal(res.status, 200);

         // schema
         assert.isNumber(res.body.id);

         // check db
         const contact = await Contact.findOne({ order: [ 'id', 'DESC' ] });
         assert.isObject(contact);
         assert.equal(contact.name, payload.name);
         assert.equal(contact.email, payload.email);
         assert.equal(contact.phone, payload.phone);
         assert.equal(contact.bio, payload.bio);


      });

      test('Retrrieve contacts', async () => {

         const contacts = await createContact(casual.integer(5, 10));

         const res = await requester
            .get(`/api/contacts`)
            .send();

         assert.equal(res.status, 200);

         // check schema
         assert.isArray(res.body);
         assert.isAtLeast(res.body.length, contacts.length);
         assert.isNumber(res.body[0].id);
         assert.isString(res.body[0].name);
         assert.isString(res.body[0].email);
         assert.isString(res.body[0].phone);
         assert.isString(res.body[0].bio);
         

      });

      test('Delete contact', async () => {

         const contact = await createContact();


         const res = await requester
            .delete(`/api/contacts/${contact.id}`)
            .send();

         assert.equal(res.status, 200);

      
         // check db
         contact = await Contact.findByPk(contact.id);
         assert.isNull(contact);

      });



   });

   
});