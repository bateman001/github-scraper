
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      knex('users').insert([
        {id: 1, username: 'user1', avatar_url: 'avatar1_url', user_url: 'user1_url', github_id: '123', repo_api_url: 'repo_api_url' },
        {id: 2, username: 'user2', avatar_url: 'avatar2_url', user_url: 'user2_url', github_id: '234', repo_api_url: 'repo2_api_url'},
        {id: 3, username: 'user3', avatar_url: 'avatar3_url', user_url: 'user3_url', github_id: '345', repo_api_url: 'repo3_api_url'}
      ])
      .then(function () {
        // Inserts seed entries
        knex('repos').insert([
          {id: 1, user_id: '123', name: 'repo1', fullname: 'user1/repo1', description: 'this is repo1', public_access: false, repo_url: 'repo1_url', fork: false, language: 'HTML'},
          {id: 2, user_id: '123', name: 'repo2', fullname: 'user1/repo2', description: 'this is repo2', public_access: true, repo_url: 'repo2_url', fork: false, language: 'Javascript'},
          {id: 3, user_id: '234', name: 'repo3', fullname: 'user2/repo3', description: 'this is repo3', public_access: false, repo_url: 'repo3_url', fork: true, language: 'HTML'},
          {id: 4, user_id: '345', name: 'repo4', fullname: 'user3/repo4', description: 'this is repo4', public_access: true, repo_url: 'repo4_url', fork: true, language: 'Python'}
        ])
        
      })
    });
};
