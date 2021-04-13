let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/server.js");
let auth =require("../src/controllers/authentication.js");

chai.use(chaiHttp);
var expect = chai.expect;


// Authentication ------------------------------------------------------------------------------------------------------
let r = Math.random().toString(36).substring(7);
let emailUser = r + '@gmail.com';
let emailUser2 = r + '@hotmail.com';
let password = 'qwerty';

let userID;
let appReminderID;
let medReminderID;
let token;
let linkerID;
let linkedID;
function  createUser(){
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
}
function loginUser (){
    let user = {
        "email":emailUser,
        "password":password
    }
    chai.request(server)
        .post('/api/auth/login')
        .send(user)
        .end((err, res) => {
            chai.expect(res.status).to.equal(200);
            console.log(res.body.jwt);
            return res.body.jwt;
        });
}

describe('Authentication tests',  () => {
    //register
    it('Register User',  async () => {
       await createUser();
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

    it('Login correctly',  () => {
        let user = {
            "email":emailUser,
            "password":password
        }
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                console.log(res.body);
                chai.expect(res.status).to.equal(200);
                return res.body.jwt;
            });
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

// MedReminder ---------------------------------------------------------------------------------------------------------
describe('MedReminder tests', () => {

    // Create a new medication reminder
    it('Create MedReminder', (done) => {
        let medReminder = {
            "time": '2021-12-01 12:00:00',
            "timeout": 10,
            "brandName": "Astra Zeneca",
            "genericName": "generic",
            "verified":"0",
            "reminderMsg": "Take medication soon",
            "patientId": 1
        }
        chai.request(server)
            .post(`/api/medReminder/`)
            .send(medReminder)
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                medReminderID = res.body.id
                chai.expect(res.status).to.equal(200);
            });
        done();
    });
    it('Create MedReminder without user ID', (done) => {
        let medReminder = {
            "time": '2021-12-01 12:00:00',
            "timeout": 10,
            "brandName": "BRAND",
            "genericName": "GENERIC",
            "verified":"0",
            "reminderMsg": "Take medication soon"
        }
        chai.request(server)
            .post(`/api/medReminder/`)
            .send(medReminder)
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                medReminderID = res.body.id
                chai.expect(res.status).to.equal(400);
            });
        done();
    });
    it('Create MedReminder with incorrect date-time formatting', (done) => {
        let medReminder = {
            "time": '15:30 10/03/2021',
            "timeout": 10,
            "brandName": "BRAND",
            "genericName": "GENERIC",
            "verified":"0",
            "reminderMsg": "Take medication soon"
        }
        chai.request(server)
            .post(`/api/medReminder/`)
            .send(medReminder)
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                medReminderID = res.body.id
                chai.expect(res.status).to.equal(400);
            });
        done();
    });
    


    it('Return all MedReminders', (done) => {
        chai.request(server)
            .get(`/api/medReminder/${userID}`)
            .send()
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).should.be.a('array');
            });
        done();
    });

    // Return a single medication reminder
    it('Return MedReminder', (done) => {
        chai.request(server)
            .get(`/api/medReminder/${userID}/${medReminderID}`)
            .send()
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });
    it('Return MedReminder that does not exist', (done) => {
        chai.request(server)
            .get(`/api/medReminder/${userID}/0`)
            .send()
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });

    // Update a medication reminder
    it('Update MedReminder', (done) => {
        let medReminder = {
            "time": '2021-12-01 12:00:00',
            "timeout": 10,
            "brandName": "some brand",
            "genericName": "generic",
            "verified":"0",
            "reminderMsg": "Take medication soon",
            "patientId": 1
        }
        chai.request(server)
            .patch(`/api/medReminder/${medReminderID}`)
            .send(medReminder)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });

    // Delete a medication reminder
    it('Delete MedReminder', (done) => {
        chai.request(server)
            .delete(`/api/medReminder/${medReminderID}`)
            .send()
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });
    it('Delete MedReminder that does not exist', (done) => {
        chai.request(server)
            .delete(`/api/medReminder/0`)
            .send()
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });

});

// Links -------------------------------------------------------------------------------------------------------------
describe('Linking accounts tests', () => {

    // Requesting an account to be linked 

    // TODO:    Request, accept link test
    //          Return the list of links 
    //          Delete a link    

    /*it('Request a link', (done) => {
        let links = {
            "uid_linked": 1,
            "uid_linker": 2,
            "verified": "false"
        }
        chai.request(server)
            .post('/api/link/request')
            .send(links)
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                linked = res.body.uid_linked;
                linker = res.body.uid_linker;
                chai.expect(res.status).to.equal(200);
            });
        done();
    });*/

    /*it('Return the list of all links', (done) => {
        chai.request(server)
            .get(`/api/link/list/${userID}`)
            .send()
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).should.be.a('array');
            });
        done();
    });*/

    /*
    it('Delete a link', (done) => {
        chai.request(server)
            .delete(`/api/link/remove`)
            .send()
            .set('Authorization', 'JWT ' + token)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });*/

});
