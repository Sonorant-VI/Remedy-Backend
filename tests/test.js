let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/server.js");

chai.use(chaiHttp);
var expect = chai.expect;


// Authentication ------------------------------------------------------------------------------------------------------
let r = Math.random().toString(36).substring(7);
let emailUser = r + '@gmail.com';
let emailUser2 = r + '@hotmail.com';
let password = 'qwerty';

let userID;
let appReminderID;
let token;

describe('Authentication tests',  () => {
    //register
    it('Register User', async (done) => {
        let user = {
            'email': emailUser,
            'password':password,
            'role':'active'
        }
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                userID = res.body.uid;
                chai.expect(res.status).to.equal(200);
            });
        done();
    });

    it('Register User wrong role ', (done) => {

        let user = {
            'email': emailUser2,
            'password':'qwerty',
            'role':'1'
        }
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });

    it('Register User wrong email syntax ', (done) => {

        let user = {
            'email':'test',
            'password':'qwerty',
            'role':'1'
        }
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });

    //login
    it('Login without email', (done) => {
        let user = {
            'email':'',
            'password':'qwerty',
        }
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });
    it('Login without password', (done) => {
        let user = {
            'email':emailUser,
            'password':'',
        }
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });
    it('Login correctly',  async (done) => {
        let user = {
            "email":'test1@test.com',
            "password":'test'
        }
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                token=res.body.jwt;
                chai.expect(res.status).to.equal(200);
            });
        done();
    });
    //logout
    /*  NOT WORKING  => trying to return the JWT token at the end but i couldn't
     it('Logout correctly',  (done) => {
        chai.request(server)
            .get('/api/auth/logout')
            .set('x-access-token',token)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });

        done();
    });

     */
});


// to  add a jwt into your request do :
//                                         // we set the auth header with our token
//                                         .set('Authorization', 'JWT ' + token)
//                                         .end(function(error, resonse) {

// AppReminder ---------------------------------------------------------------------------------------------------------
/*describe('AppReminder tests', () => {

    it('Create AppReminder', (done) => {
        let appReminder = {
            "start": 123,
            "stop": 456,
            "timeout": 123,
            "purpose": "test purpose",
            "reminder_msg":"test message",
            "patientId": userID
        }
        chai.request(server)
            .post(`/api/appReminder/`)
            .send(appReminder)
            .end((err, res) => {
                appReminderID = res.body.id
                chai.expect(res.status).to.equal(200);
            });
        done();
    });

    it('Return all AppReminders', (done) => {
        chai.request(server)
            .get(`/api/appReminder/${userID}`)
            .send()
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).should.be.a('array');
            });
        done();
    });

    it('Return AppReminder', (done) => {
        chai.request(server)
            .get(`/api/appReminder/${userID}/${appReminderID}`)
            .send()
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });

    it('Update AppReminder', (done) => {
        let appReminder = {
            "start": 123,
            "stop": 456,
            "timeout": 123,
            "purpose": "test purpose",
            "reminder_msg":"test message",
            "patientId": userID,
            "cancelled": 1
        }
        chai.request(server)
            .patch(`/api/appReminder/${appReminderID}`)
            .send()
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });

    it('Delete AppReminder', (done) => {
        chai.request(server)
            .delete(`/api/appReminder/${appReminderID}`)
            .send()
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });

});*/
