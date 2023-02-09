const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			products,
			toThousand
		})
	},
	detail: (req, res) => {
		let id = req.params.id;
		let product = products.find(p => p.id == id);
		console.log(product);
		res.render('detail', {
			product,
			toThousand
		});

	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {

		let image = req.file ? req.file.filename : 'default-imge.png';

		console.log(req.body);
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: image
		};

		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

		res.render('product-edit-form', { productToEdit });
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: productToEdit.image
		};

		let newProducts = products.map(product => {
			// product.id == productToEdit.id ? product = {...productToEdit} : product;
			if (product.id == productToEdit.id) {
				return product = {...productToEdit}
			}
			return product;
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id);

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');

	}
};

module.exports = controller;