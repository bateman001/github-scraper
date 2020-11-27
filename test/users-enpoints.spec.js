const supertest = require('supertest')
const db = require('../src/db-config')
const helpers = require('./test-helpers')
const app = require('../src/app')
const { expect } = require('chai')

describe('User Endpoint Functions', () => {
    before(async () => {
        await db.migrate.latest()
    })

    const { users } = helpers.makeFixtures()
    const testUser = users[0]
    
    after('disconnect from db', () => db.migrate.rollback())

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

            it('responds with 201 and empty array when user doesnt exist', () => {
                return supertest(app)
                .get(`/api/users/user`)
                .expect(201, [])
            })
        })
    })
})