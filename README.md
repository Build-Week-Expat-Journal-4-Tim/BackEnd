# Backend

User Schema EXAMPLE: (what is returned to the user and AVAILABLE to add)
{
        "id": 1 **AUTO GENERATED, NO NEED TO ADD**
        "email": "tiffany@email.com",
        "password": "blah123",
        "firstName": "Tiffany",
        "location": null
}

Posts Schema EXAMPLE: (what is returned to the user and AVAILABLE to add)
{
    "id": 2, **AUTO GENERATED, NO NEED TO ADD**
    "title": "Lincoln Monument",
    "location": "Washington D. C.",
    "description": "THis is an amazing piece of history!!!!",
    "date": "Feb. 28th, 2007",
    "image": "https://unsplash.com/photos/28nk2O5RjMo",
    "user_id": 1
}


ENDPOINTS:
Base URL: https://expatjournalbackend4.herokuapp.com

POST methods:
'/api/auth/register' -to register  **MUST INCLUDE email, password, firstName ***
'/api/auth/login' - to login  **MUST INCLUDE email, password ***
'/api/posts/' - to make a post  **MUST INCLUDE title, location, user_id**

GET methods:
'/api/user/' - to get ALL users
'/api/user/:id' - to get user by id
'/api/posts/' - to get ALL posts
'/api/posts/:id' - to get posts by id

PUT methods:
'/api/posts/:id' - to update a post by id **must include title, location, user_id

DELETE methods:
'/api/user/:id' - to delete user by id
'/api/posts/:id' - to delete a post by id
