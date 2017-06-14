// Change to test environment
process.env.NODE_ENV = 'test';

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

const should = chai.should();
chai.use(chaiHttp);

describe('documents', () => {
  /*
   * Test the /GET route
   */
  describe('/GET document', () => {
    it('it should GET all documents', (done) => {
      chai.request(server)
        .get('/api/documents')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST document', () => {
    it('it should POST a document', (done) => {
      const document = {
        title: 'Girl with the dragon tattoo',
        content: 'Be a great hacker and steal from rich folks',
      };
      chai.request(server)
        .post('/api/documents')
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document created successfully!');
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id document', () => {
    it('it should GET a document by the given id', (done) => {
      chai.request(server)
        .get('/api/documents/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('content');
          res.body.should.have.property('access');
          res.body.should.have.property('userId');
          done();
        });
    });

    it('it should not return a document', (done) => {
      chai.request(server)
        .get('/api/documents/0')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document is not available');
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id document', () => {
    it('it should UPDATE a document given the id', (done) => {
      const document = {
        title: 'Wisdom',
      };
      chai.request(server)
        .put('/api/documents/2')
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document Successfully updated!');
          done();
        });
    });

    it('it should UPDATE a document by the given id if an admin', (done) => {
      const document = {
        title: 'Knowledge',
      };
      chai.request(server)
        .put('/api/documents/2')
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document Successfully updated!');
          done();
        });
    });

    it('it should UPDATE a document by the given id if userId matches owners id', (done) => {
      const document = {
        title: 'Songs',
      };
      chai.request(server)
        .put('/api/documents/3')
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document Successfully updated!');
          done();
        });
    });
  });

  describe('/GET/?limit={integer}?offset={integer} pagination for documents', () => {
    it('it should GET documents based on query', (done) => {
      chai.request(server)
        .get('/api/documents/?limit=1&offset=1')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /GET/?title route
   */
  describe('/GET/?title search documents', () => {
    it('it should not GET a document by the given title', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=people')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Document is not available');
          done();
        });
    });

    it('it should GET a document by the given title', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=elixir')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.have.property('title').eql('elixir');
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id document', () => {
    it('it should DELETE a document given the id', (done) => {
      chai.request(server)
        .delete('/api/documents/4')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document successfully deleted');
          done();
        });
    });

    it('it should DELETE a document if an admin or owner is deleting it', (done) => {
      chai.request(server)
        .delete('/api/documents/3')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document successfully deleted');
          done();
        });
    });
  });
});