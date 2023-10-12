const contenedorCard = document.querySelector("#contenedorCard")
const abrirCarrito = document.querySelector("#abrirCarrito")
const contenedorModal = document.querySelector("#contenedorModal")

let carrito = []

let contenidoHeader = document.createElement("nav");
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

// const modalX = document.querySelector("#modal-x")
    // let cerrarModal = modalX
    // cerrarModal.addEventListener("click", () => {
    //     contenedorModal.style.display = "none"
    // })

    contenedorModal.appendChild(contenidoHeader);
    contenidoHeader.appendChild(modal)
    
    carrito.forEach((producto) => {
    let carritoModal = document.createElement("div")
    carritoModal.className = "carrito-Modal"
    carritoModal.innerHTML = 
    `<img src=${producto.img}
    <h5>${producto.nombre}</h5>
    <p>$${producto.precio}</p>`,

    contenedorModal.appendChild(carritoModal)
    })
})

const traerProductos = async () => {
    const respuesta = await fetch('./productos.json')
    const productos = await respuesta.json()

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
            });
        });
    });
}
traerProductos()
console.log(carrito);
