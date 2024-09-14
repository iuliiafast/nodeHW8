import express from 'express';
import sequelize from './db.js';
import Book from './models/book.js'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Sequelize with Express!');
});

app.post('/books', async (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.status(400).json({ error: 'All fields (title, author, year) are required.' });
    }
    const newBook = await Book.create({
      title,
      author,
      year,
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create a new book' });
  }
});

app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await Book.update(
      { title, author, year },
      { where: { id } }
    );

    const updatedBook = await Book.findByPk(id);
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await Book.destroy({ where: { id } });

    res.json({ message: `Book with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});