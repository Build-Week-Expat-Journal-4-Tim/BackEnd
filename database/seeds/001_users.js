exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(generateUsers());
    });
};

function generateUsers(){
  return [
    {
      email: "tiffany@email.com",
      firstName: "Tiffany",
      password: "blah123"
    },
    {
      email: "coery@email.com",
      firstName: "Corey",
      password: "blah456"
    },
    {
      email: "olivia@email.com",
      firstName: "Olivia",
      password: "blah789"
    },
    {
      email: "Ava@email.com",
      firstName: "Ava",
      password: "blah147"
    },
    {
      email: "Tony@email.com",
      firstName: "Tony",
      password: "blah258"
    },
    {
      email: "Tyson@email.com",
      firstName: "Tyson",
      password: "blah369"
    }
  ]
}
