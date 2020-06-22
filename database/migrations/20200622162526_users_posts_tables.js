
exports.up = function (knex) {
    return (
      knex.schema
        .createTable("users", (tbl) => {
          tbl.increments();
          tbl.string("email", 50).notNullable()
          tbl.string("password", 200).notNullable();
          tbl.string("firstName");
          tbl.string("location");
        })
        .createTable("posts", (tbl) => {
          tbl.increments();
          tbl.string("title").notNullable();
          tbl.string("location", 100).notNullable();
          tbl.string("description", 3500);
          tbl.string("date", 40);
          tbl.string("image");
          tbl
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        })
    );
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("posts")
      .dropTableIfExists("users")
  };
