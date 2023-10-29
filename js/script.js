const contenedorCard = document.querySelector("#contenedorCard")
const abrirCarrito = document.querySelector("#abrirCarrito")
const contenedorModal = document.querySelector("#contenedorModal")
const buscador = document.querySelector("#buscador")


let carrito = JSON.parse(localStorage.getItem("carritoStorge")) || [];

buscador.addEventListener("input", () => {
    const buscadorValue = buscador.value.trim().toUpperCase()

    if (buscadorValue == "") {
        traerProductos()
    } else {
        fetch("./productos.json")
            .then(resp => resp.json())
            .then(productos => {
                const productosFiltrados = productos.filter((productos) => productos.nombre.includes(buscadorValue))
                if (productosFiltrados.length > 0) {
                    mostrarProductos (productosFiltrados)
                } 
                else {
                    Swal.fire({
                        title: "Error",
                        text: "No se encontraron productos!",
                        icon: "error"
                    })
                }
            })
    }
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
        `
        <img src=${producto.img} class="card-img-top">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio * producto.cantidad}</p>
        <button id="agregar${producto.id}" class="btn btn-primary">Agregar al carrito</button>`
    
        contenedorCard.appendChild(contenido)
    
        let agregar = document.querySelector(`#agregar${producto.id}`)
        
        agregar.addEventListener("click", () => {

        const repetido = carrito.some((productoRepetido) => productoRepetido.id == producto.id)

            if(repetido){
                carrito.map((prod) => {
                    if(prod.id == producto.id){

                    prod.cantidad++
                    }
                })
            }
            else{
                carrito.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: producto.cantidad,
                    img: producto.img,
                }); 
            }
            guardarStorage()
        });
    });
}

let contenidoHeader = document.createElement("div");
contenidoHeader.className = "contenidoHeader"
contenidoHeader.innerHTML =
`<h2 class="titulo"> FrutiFitMix </h2>`

abrirCarrito.appendChild(contenidoHeader)

const eliminarProducto = (evento) => {
    const productoId = evento.target.getAttribute("id")
    carrito = carrito.filter((producto) => producto.id != productoId )

    guardarStorage()
    verCarrito()
}

const logoCarrito = document.createElement("button")
logoCarrito.className = "bi bi-cart-plus-fill"

contenidoHeader.appendChild(logoCarrito)

const verCarrito = () => {
    contenedorModal.innerHTML = 
    `<button id="modal-x" class="bi bi-x-circle modalHead"></button>
    <h2 class="modalHead">TU CARRITO</h2>`
    contenedorModal.style.display ="flex"
    
    const modalX = document.querySelector("#modal-x")

    modalX.addEventListener("click", () => {
    contenedorModal.style.display = "none"
    })
    
    contenedorModal.appendChild(modalX)

    carrito.forEach((producto) => {
    let carritoModal = document.createElement("div")
    carritoModal.className = "carritoModal"
    carritoModal.innerHTML = 
    `
    <img src="${producto.img}">
    <h5>${producto.nombre}</h5>
    <p>$${producto.precio * producto.cantidad}</p>
    <p>${producto.cantidad} UNIDAD/ES</p>`

    contenedorModal.appendChild(carritoModal)
    let eliminar = document.createElement("button")
    eliminar.setAttribute("id", producto.id)
    eliminar.className = "bi bi-x"
    
    carritoModal.appendChild(eliminar)
    eliminar.addEventListener("click", eliminarProducto)
    })
    
    const total = carrito.reduce ((acc, producto) => acc + producto.precio * producto.cantidad, 0 )

    const precioTotal = document.createElement("div")
    precioTotal.className = "precioTotal"
    precioTotal.innerHTML = 
    `<h2 class="piemodal">EL TOTAL A PAGAR ES DE $${total}</h2>`

    guardarStorage()
    
    const finalizarCompra = document.createElement("button")
    finalizarCompra.className = "btnFinalizarCompra"
    finalizarCompra.innerText = "FINALIZAR COMPRA"
    
    finalizarCompra.addEventListener("click", () => {
        Swal.fire({
        title: "Felicidades",
        text: "Su compra se realizó con éxito",
        icon: "success"
        })
        carrito.length = 0
        borrarCarrito()
        verCarrito()
    })

    const btnVaciar = document.createElement("button")
    btnVaciar.className = "btnCancelar"
    btnVaciar.innerText = "VACIAR CARRITO"
    btnVaciar.addEventListener("click", () => {
        Swal.fire({
        title: "Error",
        text: "No se pudo completar su compra",
        icon: "error"
        })
        carrito.length = 0
        borrarCarrito()
        verCarrito()
    })
    contenedorModal.appendChild(precioTotal)
    precioTotal.appendChild(finalizarCompra)
    precioTotal.appendChild(btnVaciar)
}

logoCarrito.addEventListener("click", verCarrito)


const guardarStorage = () => {
    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
}

const borrarCarrito = () => {
    localStorage.removeItem("carritoStorage", JSON.stringify(carrito))
}

traerProductos()