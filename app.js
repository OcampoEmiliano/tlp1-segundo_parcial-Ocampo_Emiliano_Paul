const express = require('express');
const libros = require('./db');

app = express();

app.use(express.text());
app.use(express.json());

app.get('/books/', (req,res) => {
    res.json(libros)
});

app.get('/books/:id',(req,res) => {
    const id = parseint(req.params.id)
    res.json(libros)
    const getBooks = libros.find((books) => books.id === id)
    console.log(getBooks);
    res.json(getBooks)
});

app.post('/books/',(req,res) => {
    const id = new Date().getTime();
    const {titulo,autor,año} = req.body;
    const {newBook} = libros.push({id:id,title:titulo,author:autor,year:año});
    
    res.json({ message: "libro agregado",newBook});
});

app.put('/books/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const { titulo,autor,año } = req.body;
    const getbook = libros.find((libros) => libros.id === id);
    getbook.title = titulo;
    getbook.author = autor;
    getbook.year = parseint(año);
    console.log(getBook);

    res.json({ message: "libro actualizado" });
});

app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const getBook = libros.find((libros) => libros.id === id);
    const bookIndex = libros.indexOf(getBook);
    const deletedBook = libros.splice(bookIndex, 1);

    res.json({ message: "libro eliminado", deletedBook });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor en puerto ${PORT}`));