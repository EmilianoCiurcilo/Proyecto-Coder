const contenedorCard = document.querySelector("#contenedorCard")
const abrirCarrito = document.querySelector("#abrirCarrito")
const contenedorModal = document.querySelector("#contenedorModal")
const buscador = document.querySelector("#buscador")

let carrito = []

buscador.addEventListener("input", () => {
    const buscadorValue = buscador.value.trim().toLowerCase()

    if (buscadorValue == "") {
        traerProductos()
    } else {
        fetch("./productos.json")
            .then(resp => resp.json())
            .then(productos => {
                const productosFiltrados = productos.filter((productos) => productos.nombre.filter(buscadorValue))
                if (productosFiltrados.length > 0) {
                    mostrarProductos (productosFiltrados)
                } else {
                    // Swal.fire({
                    //     title: "Error",
                    //     text: "No se encontraron productos!",
                    //     icon: "error"
                    // })
                }
            })
    }
})

let contenidoHeader = document.createElement("nav");
contenidoHeader.className = "contenidoHeader"
contenidoHeader.innerHTML =
`<h2 class="titulo"> FrutiFitMix </h2>
<button id="logoCarrito" class="bi bi-cart-plus-fill"></button>`

abrirCarrito.appendChild(contenidoHeader)

const logoCarrito = document.querySelector("#logoCarrito")

logoCarrito.addEventListener("click", () => {
    contenedorModal.innerHTML = ""
    contenedorModal.style.display = "flex"
    let modal = document.createElement("div");
    modal.className = "modal"
    modal.innerHTML = 
    `<h2 class="modal-titulo"> TU CARRITO </h2>
    <button id="modal-x" class="bi bi-x-circle"></button>`

 const modalX = document.querySelector("#modal-x")

modalX.addEventListener("click", () => {
    contenedorModal.style.display = "none"
    })
    contenedorModal.appendChild(contenidoHeader);
    contenidoHeader.appendChild(modal)
    
    carrito.forEach((producto) => {
    let carritoModal = document.createElement("div")
    carritoModal.className = "carritoModal"
    carritoModal.innerHTML = 
    `
    <img src="${producto.img}">
    <h5>${producto.nombre}</h5>
    <p>$${producto.precio}</p>`,

    contenedorModal.appendChild(carritoModal)
    })

    const total = carrito.reduce ((acc, producto) => acc + producto.precio, 0 )

    const precioTotal = document.createElement("div");
    precioTotal.className = "precioTotal"
    precioTotal.innerHTML = `el total a pagar es $${total}`

    contenedorModal.appendChild(precioTotal)
})

const traerProductos = async () => {
    const respuesta = await fetch('./productos.json')
    const productos = await respuesta.json()
    mostrarProductos(productos)
}

function mostrarProductos (productos) {
    contenedorCard.innerHTML = ""
    productos.forEach((producto) => {
        let contenido = document.createElement("div");
        contenido.className = "card";
        contenido.innerHTML =
        `<img src=${producto.img} class="card-img-top">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <button id="agregar${producto.id}" class="btn btn-primary">Agregar al carrito</button>`
    
        contenedorCard.appendChild(contenido)
    
        let agregar = document.querySelector(`#agregar${producto.id}`)
            
        agregar.addEventListener("click", () => {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                categoria: producto.categoria,
                img: producto.img,
                });
            });
        });
    }

console.log(carrito);
traerProductos()
