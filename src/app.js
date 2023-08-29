import express  from "express";
// Importo mi archivo 
import productInstance from "./productManager.js";
const app = express();
// Query param
app.use(express.urlencoded({extended:true}));


app.get('/products', (req, res) => {
    const products = productInstance.getProducts();
    // Leo el limite del query y lo paso a int para trabajarlo en mi funcion, ya que el id de mi producto es autogenerado en int
    const limit = parseInt(req.query.limit); 

    //Compruebo que limit no sea nulo y que sea mayor a 0 para chequearlo
    if (!isNaN(limit) && limit > 0) {
        const limitedProducts = products.slice(0, limit);
        // Devuelvo los productos solicitados
        res.send({ products: limitedProducts });
    } else {
        // Si no recibo limit devuelvo los products
        res.send({ products });
    }
});

app.get('/products/:id', (req, res) => {
    // guardo en una constante el id que recibo y lo guardo como int por la reutilizacion de mi función
    const id = parseInt(req.params.id);
    // llamo a la funcion getProductById de mi ProductManager
    const product = productInstance.getProductsById(id);

    // Compruebo que el resultado de la búsqueda no coincida con el return de mi función que era un 'not found'
    if (product !== 'Not found') {
        res.send({ product });
    } else {
        // si coincide ese string, devuelvo el mensaje de que no existe un producto con ese id
        res.send('No existe un producto con ese id');
    }
});

app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080");
})

