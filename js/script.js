    let cliente = prompt('Ingrese su nombre completo')

    const productos = [
        {nombre: "almendras", precio: 1000},
        {nombre: "mani", precio: 500},
        {nombre: "nueces", precio: 700},
        ];

    let carrito = []

    let comprar = prompt(`Hola ${cliente} Bienvenid@ a FrutifitMix, desea realizar una compra? "si" - "no"`)

    while(comprar != "si" && comprar != "no");{
        alert('Porfavor ingrese "si" o "no"')
        comprar = prompt(`Hola ${cliente} Bienvenid@ a FrutifitMix, desea realizar una compra? "si" - "no"`)
    }

    if (comprar == "si"){
        comprar = prompt('Ingrese el producto que desea comprar: "Almendras" - "Mani" - "Nueces"')
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
    carrito.push({producto, kilos, precio})
    }
    else {
        alert ('Elija una opción válida')
        }
        comprar = prompt ('Desea comprar otro producto?')

        while(comprar === "no"){
            alert('¡Gracias por su visita, vuelva pronto!')
            break
        }
    }
    console.log(carrito)

    let total = function (precio){
    console.log(`${precio*kilos}`)
    }
    