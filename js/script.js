    let cliente = prompt('Ingrese su nombre completo')

    const productos = [
        {nombre: "almendras", precio: 1000},
        {nombre: "mani", precio: 500},
        {nombre: "nueces", precio: 700},
        ];

    let carrito = []

    let comprar = prompt(`Hola ${cliente} Bienvenid@ a FrutifitMix, desea realizar una compra? "si" - "no"`)

    while(comprar != "si" && comprar != "no"){
        alert('Porfavor ingrese "si" o "no"')
        comprar = prompt(`Hola ${cliente} Bienvenid@ a FrutifitMix, desea realizar una compra? "si" - "no"`)
    }

    if (comprar == "si"){
        comprar = alert('Nuestos productos y precios por kg son: "Almendras $1000" - "Mani $500" - "Nueces $700"')
    }
    else if (comprar == "no"){
        alert('¡Gracias por su visita, vuelva pronto!')
    }
    
    while(comprar != "no"){
    let producto = prompt ('Ingrese el producto que desea comprar: "Almendras" - "Mani" - "Nueces"')

    if(producto == "almendras" || producto == "mani" || producto == "nueces"){
        switch(producto)
        {
        case "almendras":
            precio = 1000
            break;
        case "mani":
            precio = 500
            break;
        case "nueces":
            precio = 700
            break;
        default:
            break;
        }
        let kilos = parseInt(prompt('Cuántos KG desea comprar?'))
        while(isNaN(kilos)){
            alert('Porfavor ingrese solo valores numéricos')
            kilos = parseInt(prompt('Cuántos KG desea comprar?'))
        }
    carrito.push({producto, kilos, precio})
        let precioporkg = 0
        function total (kilos, precio){
            precioporkg = kilos*precio
            }
        total(kilos, precio, producto);
        alert(`Agregaste ${kilos}kg de ${producto} al carrito`)
        console.log(`El total a pagar por ${kilos}kg de ${producto} es de $${precioporkg}`)
    }
    else {
        alert ('Elija una opción válida')
        }
        comprar = prompt ('Desea comprar otro producto? "si" - "no"')

        while(comprar != "si" && comprar != "no"){
            alert('Porfavor ingrese "si" o "no"')
            comprar = prompt ('Desea comprar otro producto? "si" - "no"')
        }
        while(comprar === "no"){
            alert('¡Gracias por su visita, vuelva pronto!')
            break
        }
    }