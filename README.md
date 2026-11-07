# Recipes REST API - Project Description
This project is a REST API for managing recipes using Node.js, Express, MongoDB, and Mongoose.
The API allows users to add, view, update, and delete recipes. Each recipe contains a name, ingredients, and instructions. All recipes are stored in a MongoDB database.

# How to Run
1. Open the project folder in VS Code.
2. Open the terminal and run npm install to install the dependencies.
3. Create a .env file and add your MongoDB connection string and port:
MONGODB_URI=your_mongodb_connection_string
PORT=3000
4. Replace your_mongodb_connection_string with your MongoDB Atlas connection string.
5. Run npm start to start the server.
The server runs on port 3000.

# API Routes
1. GET /api/recipes
Returns all recipes stored in the database.
Status: 200 OK
Example request:
curl -i http://localhost:3000/api/recipes

Example response:
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Chocolate Cake",
    "ingredients": "Flour, eggs, sugar",
    "instructions": "Mix ingredients and bake."
  }
]

2. GET /api/recipes/:id
Returns a specific recipe using its ID.
Status: 200 OK if found, 404 Not Found if the recipe does not exist.
Example request:
curl -i http://localhost:3000/api/recipes/507f1f77bcf86cd799439011

Example response:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Chocolate Cake",
  "ingredients": "Flour, eggs, sugar",
  "instructions": "Mix ingredients and bake."
}

3. POST /api/recipes
Creates a new recipe by providing its name, ingredients, and instructions.
Status: 201 Created
Example request:
curl -i -X POST http://localhost:3000/api/recipes \
-H "Content-Type: application/json" \
-d '{"name":"Chocolate Cake","ingredients":"Flour, eggs, sugar","instructions":"Mix ingredients and bake."}'

Example response:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Chocolate Cake",
  "ingredients": "Flour, eggs, sugar",
  "instructions": "Mix ingredients and bake."
}

4. PUT /api/recipes/:id
Updates an existing recipe using its ID. The name, ingredients, and instructions must all be provided.
Status: 200 OK if updated, 404 Not Found if the recipe does not exist.
Example request:
curl -i -X PUT http://localhost:3000/api/recipes/507f1f77bcf86cd799439011 \
-H "Content-Type: application/json" \
-d '{"name":"Vanilla Cake","ingredients":"Flour, eggs, vanilla","instructions":"Mix ingredients and bake for 35 minutes."}'

Example response:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Vanilla Cake",
  "ingredients": "Flour, eggs, vanilla",
  "instructions": "Mix ingredients and bake for 35 minutes."
}

5. DELETE /api/recipes/:id
Deletes a recipe using its ID.
Status: 204 No Content if deleted, 404 Not Found if the recipe does not exist.
Example request:
curl -i -X DELETE http://localhost:3000/api/recipes/507f1f77bcf86cd799439011

Example response:
HTTP/1.1 204 No Content

# Error Handling
The API handles invalid requests and database errors using HTTP status codes.

* 400 Bad Request: Invalid ID, missing required fields, or invalid JSON.
* 404 Not Found: The requested recipe does not exist.
* 500 Internal Server Error: An unexpected server or database error occurs.

Example of an invalid request:
curl -i http://localhost:3000/api/recipes/123

Example response:
{
  "error": "Invalid id"
}

# Testing
The API was tested using curl commands in the terminal.
All five CRUD operations were tested successfully:

* GET: Retrieve all recipes.
* GET by ID: Retrieve one recipe.
* POST: Create a recipe.
* PUT: Update a recipe.
* DELETE: Delete a recipe.

Additional tests were performed for missing fields, invalid IDs, and recipes that do not exist.

The curl commands provided above can be used to test the API. Replace the example recipe IDs with actual IDs returned by MongoDB.

# Database
MongoDB Atlas is used to store the recipes. Mongoose is used to connect the application to the database and manage the recipe data.

The .env file contains the database connection string and is excluded from Git using .gitignore since it contains my personal credentials.