
class producto {
    constructor(producto, cantidad) {
        this.precio = producto.precio;
        this.cantidad = cantidad;
        this.precioTotal = producto.precio;
    }
    agregarUnidad() {
        this.cantidad++;
    }
    sacarUnidad() {
        this.cantidad--;
    }
    actualizarPrecioTotal() {
        this.precioTotal = this.precio * this.cantidad;
    }
}
const productos = [
    {
    id: "FS1",
    nombre: "Almendras", 
    precio: 1000,
    categoria: "frutos secos",
    img:"./imagenes/almendras.jpg"
    },
    {
    id: "FS2",
    nombre: "Mani", 
    precio: 500,
    categoria: "frutos secos",
    img:"./imagenes/mani.jpeg"
    },      
    {
    id: "FS3",
    nombre: "Nueces", 
    precio: 700,
    categoria: "frutos secos",
    img:"./imagenes/nueces.jpg"
    },
    {
    id : "FD1",
    nombre: "Pasas de uva negras", 
    precio: 200,
    categoria: "frutas deshidratados",
    img:"./imagenes/pasas-negras.png"
    },
    {
    id : "FD2",
    nombre: "Pasas de uva rubias", 
    precio: 250,
    categoria: "frutas deshidratados",
    img:"./imagenes/pasas-rubias.jpg"
    },
    {
    id : "C1",
    nombre: "Aritos frutales", 
    precio: 200,
    categoria: "cereales",
    img:"./imagenes/aritos-frutales.png"        
    },
    {
    id : "C2",
    nombre: "Almohaditas", 
    precio: 300,
    categoria: "cereales",
    img:"./imagenes/almohaditas.png"       
    },
    {
    id : "C3",
    nombre: "Copos de maiz", 
    precio: 300,
    categoria: "cereales",
    img:"./imagenes/copos-de-maiz.jpg"
    },
    ];

function chequearCarritoStorage() {
    let contenidoStorage = JSON.parse(localStorage.getItem("carritoStorage"));

    if (contenidoStorage) {
        let carrito = [];
        for (const objeto of contenidoStorage) {
            let producto = new producto(objeto, objeto.cantidad);
            producto.precioFinal();

            carrito.push(producto)}
    }
    tabla(carrito);

    return carrito;
}

const contenedor = document.querySelector("#contenedorCard")

productos.forEach((producto) => {
    let contenedorProducto = document.createElement("div")
    contenedorProducto.classList.add("cardProducto")
    contenedorProducto.style.width ="18rem"
    
    contenedorProducto.innerHTML =`
    <div class="card" style="width: 18rem;">
    <img src="${producto.img}" class="card-img-top">
    <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">$${producto.precio}</p>
    <a id="agregar${producto.id}" class="btn btn-primary">Agregar al carrito</a>
    </div>
    </div>`

    contenedor.appendChild(contenedorProducto);

    let boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener("click", () => agregarProducto(producto.id))
})

function agregarProducto(idProducto){
    let productoEnCarrito = carrito.find((producto) => producto.id === idProducto);

    if (productoEnCarrito) {
        
        let index = carrito.findIndex((elemento) => elemento.id === productoEnCarrito.id);
        carrito[index].agregarUnidad();
    }
    else{
        let cantidad = 1;
        carrito.push(new producto(productos[idProducto], cantidad));
    }
    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
    tabla(carrito);
}

function eliminarDelCarrito(id) {
    let producto = carrito.find((producto) => producto.id === id);
    let index = carrito.findIndex((elemento) => elemento.id === producto.id);
    if (producto.cantidad > 1) {
        carrito[index].sacarUnidad();
    }
    else{
        carrito.splice(index, 1);
    }
    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
    tabla(carrito);
}
function eliminarCarrito() {
    carrito.length = 0;
    localStorage.removeItem("carritoStorage");

    document.querySelector("#carrito").innerHTML = "";
    document.querySelector("#acciones").innerHTML = "";
}
function obtenerPrecioTotal(carrito) {
    return carrito.reduce((total, elemento) => total + elemento.precioTotal, 0);
}
function tabla(carrito) {
    let precioTotal = obtenerPrecioTotal(carrito);
    let contenedor = document.querySelector("#carrito");
    contenedor.innerHTML = "";

    let tabla = document.createElement("div");

    tabla.innerHTML = `
        <table id="tablaCarrito" class="table table-striped">
            <thead>         
                <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">
            </tbody>
        </table>
    `;

    contenedor.appendChild(tabla);

    let bodyTabla = document.getElementById("bodyTabla");

    for (let producto of carrito) {
        let datos = document.createElement("tr");
        datos.innerHTML = `
            <td>${alfajor.marca}</td>
            <td>${alfajor.cantidad}</td>
            <td>$${alfajor.precioTotal}</td>`;

        bodyTabla.appendChild(datos);
    }
    let accionesCarrito = document.getElementById("acciones-carrito");
    accionesCarrito.innerHTML = `
		<h5>PrecioTotal: $${precioTotal}</h5></br>`;
}
