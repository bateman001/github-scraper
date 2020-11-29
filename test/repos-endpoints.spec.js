const db = require('../src/db-config')
const helpers = require('./test-helpers')
const app = require('../src/app')
const supertest = require('supertest')
const { expect } = require('chai')

describe('Repo Endpoints', () => {
    before(async () => {
        await db.migrate.latest()
    })

    const { users, repos } = helpers.makeFixtures()
    const testRepo = repos[0]

    after('disconnect from db', async () => await db.migrate.rollback())

    before('cleanup', async () =>  await helpers.cleanTables(db))

    afterEach('cleanup', async () => await helpers.cleanTables(db))

    describe('api/repos', () => {
        context('POST api/repos', () => {
           it('reponds with a 201 after instering into db', () => {
               return supertest(app)
                    .post('/api/repos')
                    .send(testRepo)
                    .expect(201)
           }) 

           it('responds with 400 after inserting incomplete repo', () => {
               const incompleteUser = {
                   name: testRepo.name,
                   fullname: testRepo.fullname,
                   description: testRepo.description,
                   user_id: testRepo.user_id,
                   repo_url: testRepo.repo_url,
                   fork: testRepo.fork,
                   public_access: testRepo.public_access,
               }

               return supertest(app)
                .post('/api/repos')
                .send(incompleteUser)
                .expect(400, {
                    error: `Missing language in request params`
                })
           })
        })
       
        context('GET api/repos with data in db', () => {
            beforeEach('inserting repos', async () => {
                await helpers.seedUsersTable(db, users)
                await helpers.seedReposTable(db, repos)
            })

            it('reponds with 201 and array of repos', () => {
                return supertest(app)
                    .get('/api/repos')
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.be.a('array')
                    })
            })
        })
      
    })

    describe('/api/repos/:reponame', () => {
        context('GET /api/repos/:reponame', () => {
            beforeEach('inserting repos', async () => {
                await helpers.seedUsersTable(db, users)
                await helpers.seedReposTable(db, repos)
            })

            it('reponds with a 201 and expected repo', () => {
                return supertest(app)
                    .get(`/api/repos/${testRepo.name}`)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.be.an('array')
                        expect(res.body[0]).to.be.an('object')
                    })
            })
            
            it('responds with 404 when searching for repo that doesnt exist', () => {
                return supertest(app)
                    .get('/api/reps/unknown')
                    .expect(404)
            })
       
        })
    })
})