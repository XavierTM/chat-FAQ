const { default: axios } = require("axios");
const casual = require('casual');
const crypto = require('crypto');
const fs = require('fs/promises');
const chai = require('chai');
const chaiHttp = require("chai-http");
const Branch = require("../db/Branch");
const Contact = require("../db/Contact");

chai.use(chaiHttp);

async function waitForServer(url = `http://localhost:${process.env.PORT}`) {

   let success = false;

   while (!success) {
      try {
         await axios.get(url);
         success = true;
      } catch (err) {
         if (err.code !== 'ECONNREFUSED')
            success = true;
      }
   }
   
}




async function createBranch(attributes={}, count=1) {

   const data = [];

   for (let i = 0; i < count; i++) {
      data.push({
         title: casual.catch_phrase,
         body: casual.text,
         ...attributes,
      });
   }

   const branches = await Branch.bulkCreate(data);

   if (count === 1)
      return branches[0];

   return branches;
}

async function createContact(count=1) {

   const data = [];

   for (let i = 0; i < count; i++) {
      data.push({
         name: casual.name,
         email: casual.email,
         phone: casual.phone,
         bio: casual.text,
      });
   }

   const contacts = await Contact.bulkCreate(data);

   if (count === 1)
      return contacts[0];

   return contacts;
}


function createRequester() {
   return chai.request(`http://localhost:${process.env.PORT}`).keepOpen();
}



module.exports = {
   createBranch,
   createContact,
   createRequester,
   waitForServer
}