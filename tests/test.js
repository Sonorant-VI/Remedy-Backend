let chai = require("chai");
let chaiHttp =require("chai-http");
let server = require("../src/server.js");

chai.use(chaiHttp);


describe('/POST Register User', () => {
    it('Create User', (done) => {
        let r = Math.random().toString(36).substring(7);
        let user = {
            'email': r+'@gmail.com',
            'password':'qwerty',
            'role':'active'
        }
        console.log(r);
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });

    it('Create User wrong role ', (done) => {

        let user = {
            'email':'U89EZhoiflknsd@gmail.com',
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
    it('Create User wrong email syntax ', (done) => {

        let user = {
            'email':'coms/skqosk/',
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



});


