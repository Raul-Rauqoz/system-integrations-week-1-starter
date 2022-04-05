const express = require('express');
const app = express();
const server = require('http').createServer(app);

const content = require('./content/cards.json');

let arr_data = [ 'hard-coding' ];

// Middlewares

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Templating engine setup

app.set('view engine', 'ejs');

// Enpoints

app.get('/', (req, res) => {
	res.render('index', { content });
});

app.get('/app', (req, res) => {
	res.render('homework', { arr_data });
});

app.get('/add', (req, res) => {
	res.render('create');
});

app.post('/create', (req, res) => {
	arr_data.push(req.body.task);
	res.redirect('/app');
});

app.post('/update', (req, res) => {
	arr_data[req.body.id] = req.body.task;
	res.redirect('/app');
});

app.get('/edit/:id', (req, res) => {
	const id = req.params.id;
	res.render('edit', { task: arr_data[id], id });
});

app.get('/delete/:id', (req, res) => {
	arr_data.splice(req.params.id, 1);
	res.redirect('/app');
});

// Starting server.

server.listen(3030, () => {
	console.log('Listening on port 3030...');
});
