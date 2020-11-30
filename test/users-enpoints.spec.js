const db = require('../src/db-config')
const helpers = require('./test-helpers')
const app = require('../src/app')
const supertest = require('supertest')
const { expect } = require('chai')

describe('User Endpoints', () => {
    before(async () => {
        await db.migrate.latest()
    })

    const { users, repos } = helpers.makeFixtures()
    const testUser = users[0]
    const testRepo = repos[0]

    after('disconnect from db', async () => {
       await db.migrate.rollback()
    })

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))    
    
    describe('api/users enpoint', () => {
        context('POST api/users/', () => {
            it('responds with 200 after posting user to database', () => {
                return supertest(app)
                    .post('/api/users')
                    .send(testUser)
                    .expect(201)
            })

            it('responds with 400 after sending an incomplete user', () => {
                const incompleteUser = {
                    username: testUser.username,
                    avatar_url: testUser.avatar_url,
                    github_id: testUser.github_id,
                    user_url: testUser.user_url,
                }
                return supertest(app)
                    .post('/api/users')
                    .send(incompleteUser)
                    .expect(400, {
                        error: `Missing repo_api_url in reqest body`
                    })
            })
        })
        context('GET api/users when no users in database', () => {
            it('repsonds with 201 and empty array when no users', () => {
                return supertest(app)
                    .get(`/api/users`)
                    .expect(201, [])
            })

        })
        context('GET api/users when there are users in database', () => {
            beforeEach('insert users', async () => {
                await helpers.seedUsersTable(db, users)
            })

            it('responds with 201 and array of users', () => {
                return supertest(app)
                .get('/api/users')
                .expect(201)
                .expect(res => {
                    expect(res.body).to.be.a('array')
                    expect(res.body).to.have.lengthOf(users.length)
                })
            })
                    
        })
    }) 
    
    describe('api/users/:username', () => {
        context('GET api/users/:username', () => {
            beforeEach('insert users', async () => {
                await helpers.seedUsersTable(db, testUser)
            })

            it('responds with 201 and testUser', () => {
                return supertest(app)
                    .get(`/api/users/${testUser.username}`)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.be.a('array')
                        expect(res.body[0]).to.contain.key('id')
                        expect(res.body[0].username).to.eql(testUser.username)
                        expect(res.body[0].user_url).to.eql(testUser.user_url)
                        expect(res.body[0].avatar_url).to.eql(testUser.avatar_url)
                        expect(res.body[0].repo_api_url).to.eql(testUser.repo_api_url)
                    })
            })

            it('responds with 404 and error message when user doesnt exist', () => {
                return supertest(app)
                .get(`/api/users/user`)
                .expect(404,{
                    error: `Username user does not exist`
                })
            })
        })
    })

    describe('api/users/:username/repos', () => {
        context('GET api/users/:username/repos', () => {
            beforeEach('insert users and repos', async() => {
                await helpers.seedUsersTable(db, testUser)
                await helpers.seedReposTable(db, testRepo)
            })
            it('responds with a 201 and repo, when asking for a specific user', () => {
                return supertest(app)
                    .get(`/api/users/${testUser.username}/repos`)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.be.a('array')
                        expect(res.body[0].name).to.be.eql(testRepo.name)
                        expect(res.body[0].fullname).to.be.eql(testRepo.fullname)
                        expect(res.body[0].language).to.be.eql(testRepo.language)
                        expect(res.body[0].description).to.be.eql(testRepo.description)
                        expect(res.body[0].repo_url).to.be.eql(testRepo.repo_url)
                    })
            })

            it('responds with a 201 and empty array when asking for user not in db', () => {
                return supertest(app)
                    .get(`/api/users/someone/repos`)
                    .expect(201, [])
            })
        })
    })

    describe('/api/users/:username/repos/:reponame', () => {
        beforeEach('insert users', async () => {
            await helpers.seedUsersTable(db, users)
            await helpers.seedReposTable(db, repos)
        })

        context('given there are users repos in the database', () => {

            it('will return with a 201 and the users repo', () => {
                return supertest(app)
                    .get(`/api/users/${testUser.username}/repos/${testRepo.name}`)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.be.a('array')
                        expect(res.body[0]).to.be.a('object')
                        expect(res.body[0].name).to.eql(testRepo.name)
                        expect(res.body[0].repo_url).to.eql(testRepo.repo_url)
                        expect(res.body[0].fullname).to.eql(testRepo.fullname)
                        expect(res.body[0].description).to.eql(testRepo.description)
                    })
            })

        })
   
        context('given there are no matching repos', () => {
            it('will repsond with a 201 and empty array', () => {
                return supertest(app)
                    .get(`/api/users/${testUser.username}/repos/randomrepos`)
                    .expect(201, [])
            })
            
            it('will respond with 201 and empty array when both name and repo arent in db', () => {
                return supertest(app)
                    .get('/api/users/asfsfas/repos/asfasf')
                    .expect(201, [])
            })
        })
    })
})