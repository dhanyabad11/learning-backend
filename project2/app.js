const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store items
let items = [];

// POST route to add a new item
app.post('/items', (req, res) => {
    const item = { id: Date.now().toString(), ...req.body }; // Add a unique ID to the item
    items.push(item);
    res.status(201).send(item);
});

// GET route to retrieve all items
app.get('/items', (req, res) => {
    res.send(items);
});

// PUT route to update an item by ID
app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    let itemFound = false;

    console.log("Received PUT request for ID:", id);
    console.log("Updated item data:", updatedItem);

    items = items.map(item => {
        if (item.id === id) {
            itemFound = true;
            console.log("Item found, updating:", item);
            return { id, ...updatedItem }; // Ensure the ID is preserved
        }
        return item;
    });

    if (itemFound) {
        res.send({ id, ...updatedItem });
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});


// DELETE route to remove an item by ID
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const initialLength = items.length;
    items = items.filter(item => item.id !== id);

    if (items.length < initialLength) {
        res.send({ message: 'Item deleted' });
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
