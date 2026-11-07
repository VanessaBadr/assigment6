#API Testing
The Recipes REST API was tested using curl commands in the terminal. The following tests cover all five CRUD operations and error handling.
The server must be running using npm start before executing the commands.

1. GET All Recipes
This request retrieves all recipes stored in MongoDB.
curl -i http://localhost:3000/api/recipes
Expected status: 200 OK
Expected response: A JSON array containing all saved recipes, or [] if the database is empty.

2. POST — Create a Recipe
This request adds a new recipe to the database.
curl -i -X POST http://localhost:3000/api/recipes \
-H "Content-Type: application/json" \
-d '{"name":"Chocolate Cake","ingredients":"Flour, eggs, sugar","instructions":"Mix ingredients and bake."}'
Expected status: 201 Created
Expected response: The newly created recipe, including its MongoDB _id.
Save the returned _id to use in the next requests.

3. GET Recipe by ID
This request retrieves one recipe using its ID.
Replace RECIPE_ID with the ID returned by the POST request.
curl -i http://localhost:3000/api/recipes/RECIPE_ID
Expected status: 200 OK
Expected response: The recipe matching the provided ID.

4. PUT — Update a Recipe
This request updates an existing recipe.
Replace RECIPE_ID with the ID of the recipe created earlier.
curl -i -X PUT http://localhost:3000/api/recipes/RECIPE_ID \
-H "Content-Type: application/json" \
-d '{"name":"Vanilla Cake","ingredients":"Flour, eggs, vanilla","instructions":"Mix ingredients and bake for 35 minutes."}'
Expected status: 200 OK
Expected response: The updated recipe with the name Vanilla Cake.

5. DELETE — Delete a Recipe
This request deletes an existing recipe.
Replace RECIPE_ID with the ID of the recipe created earlier.
curl -i -X DELETE http://localhost:3000/api/recipes/RECIPE_ID
Expected status: 204 No Content
Expected response: No response body.

6. POST — Missing Required Field
This request tests validation by submitting an empty recipe name.
curl -i -X POST http://localhost:3000/api/recipes \
-H "Content-Type: application/json" \
-d '{"name":"","ingredients":"Flour","instructions":"Bake."}'
Expected status: 400 Bad Request
Expected response:
{
  "error": "Name, ingredients and instructions are required"
}

7. GET — Invalid Recipe ID
This request tests an invalid MongoDB ID.
curl -i http://localhost:3000/api/recipes/123
Expected status: 400 Bad Request
Expected response:
{
  "error": "Invalid id"
}

8. GET — Recipe Not Found
This request uses a valid MongoDB ID format that does not match an existing recipe.
curl -i http://localhost:3000/api/recipes/000000000000000000000000
Expected status: 404 Not Found
Expected response:
{
  "error": "Recipe not found"
}

9. POST — Invalid JSON
This request tests how the API handles malformed JSON.
curl -i -X POST http://localhost:3000/api/recipes \
-H "Content-Type: application/json" \
-d '{"name":"Cake",}'
Expected status: 400 Bad Request
Expected response:
{
  "error": "Invalid JSON"
}

# Test Results
The API was tested using curl commands. All five CRUD operations worked successfully, and the API returned the expected HTTP status codes for the validation and error-handling cases tested.
The commands above can be used to repeat the tests with a running server and a MongoDB connection.