let chai = require("chai");
let chaiHttp =require("chai-http");
let server = require("../src/server.js");

chai.use(chaiHttp);


describe('/POST Register User', () => {
    it('Create User Testing', (done) => {
        let user = {
            'email': 'test34@gmail.com',
            'password':'qwerty',
            'role':'active'
        }
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
    });
});