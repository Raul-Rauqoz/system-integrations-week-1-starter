const express = require('express');
const app = express();
const server = require('http').createServer(app);
const methodOverride = require('method-override');

const content = require('./content/cards.json');

let arr_data = [ { task: 'hard-coding', mark: false } ];

let arr_backup = [ 'hard-coding' ];

// Middlewares

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Templating engine setup

app.set('view engine', 'ejs');

// Enpoints

app.get('/guia', (req, res) => {
	res.render('index', { content });
});

app.get('/', (req, res) => {
	// res.status(200).render('homework', { arr_data });
	res.status(200).render('project', { arr_backup });
});

app.get('/add', (req, res) => {
	res.status(200).render('create');
});

app.post('/create', (req, res) => {
	arr_data.push({ task: req.body.task, mark: false });
	res.status(200).redirect('/');
});

app.put('/update', (req, res) => {
	arr_data[req.body.id].task = req.body.task;
	res.status(200).redirect('/');
});

app.get('/edit/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).render('edit', { task: arr_data[id], id });
});

app.get('/mark/:id', (req, res) => {
	const id = req.params.id;
	arr_data[id].mark = !arr_data[id].mark;
	res.status(200).redirect('/');
});

app.delete('/delete/:id', (req, res) => {
	arr_data.splice(req.params.id, 1);
	res.status(200).redirect('/');
});

app.put('/imark', (req, res) => {
	res.status(200).send();
});

app.post('/icreate', (req, res) => {
	const { task, id } = req.body;
	arr_backup.push(task);
	res.status(200).send();
});

app.put('/iupdate', (req, res) => {
	const { task, id } = req.body;
	arr_backup[id] = task;
	res.status(200).send();
});

app.delete('/idelete', (req, res) => {
	const { id } = req.body;
	arr_backup.splice(id, 1);
	res.status(200).send();
});

// Starting server.

server.listen(3030, () => {
	console.log('Listening on port 3030...');
});
