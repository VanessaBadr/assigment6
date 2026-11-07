import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { Recipe } from "./models/Recipe.js";

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const dbUri = process.env.MONGODB_URI;

app.use(express.json());

// GET all recipes
app.get("/api/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET one recipe
app.get("/api/recipes/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// POST create recipe
app.post("/api/recipes", async (req, res) => {
    const { name, ingredients, instructions } = req.body || {};

    if (
        typeof name !== "string" || !name.trim() ||
        typeof ingredients !== "string" || !ingredients.trim() ||
        typeof instructions !== "string" || !instructions.trim()
    ) {
        return res.status(400).json({ error: "Name, ingredients and instructions are required" });
    }

    try {
        const recipe = await Recipe.create({
            name,
            ingredients,
            instructions
        });

        res.status(201).json(recipe);
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Server error" });
    }
});

// PUT update recipe
app.put("/api/recipes/:id", async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, instructions } = req.body || {};

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    if (
        typeof name !== "string" || !name.trim() ||
        typeof ingredients !== "string" || !ingredients.trim() ||
        typeof instructions !== "string" || !instructions.trim()
    ) {
        return res.status(400).json({ error: "Name, ingredients and instructions are required" });
    }

    try {
        const recipe = await Recipe.findByIdAndUpdate(
            id,
            { name, ingredients, instructions },
            { new: true, runValidators: true }
        );

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.json(recipe);
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Server error" });
    }
});

// DELETE recipe
app.delete("/api/recipes/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const recipe = await Recipe.findByIdAndDelete(id);

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Handle invalid JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).json({ error: "Invalid JSON" });
    }

    res.status(500).json({ error: "Server error" });
});

// Connect to MongoDB and start server
try {
    await mongoose.connect(dbUri);

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
}