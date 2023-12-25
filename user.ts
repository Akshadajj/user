import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid'; // Library for UUIDs

const app = express();
app.use(express.json());

interface User {
  id: string;
  name: string;
  email: string;
  hobbies: string[];
}

let users: User[] = []; // For demonstration purposes (in-memory database)

// GET all users
app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// GET user by ID
app.get('/api/users/:userId', (req: Request, res: Response) => {
  const userId: string = req.params.userId;

  if (!uuidv4.valid(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

// POST create new user
app.post('/api/users', (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    hobbies: []
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user by ID
app.put('/api/users/:userId', (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  const { name, email }: { name?: string; email?: string } = req.body;

  if (!uuidv4.valid(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (name) {
    users[userIndex].name = name;
  }
  if (email) {
    users[userIndex].email = email;
  }

  res.status(200).json(users[userIndex]);
});

// DELETE user by ID
app.delete('/api/users/:userId', (req: Request, res: Response) => {
  const userId: string = req.params.userId;

  if (!uuidv4.valid(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.sendStatus(204);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Handling non-existing endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found: The requested resource does not exist' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging purposes

  res.status(500).json({ error: 'Internal Server Error: Something went wrong' });
});

// Start the server
const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${PORT}`);
});