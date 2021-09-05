/*Declaracion de carrito de compras y verifico si hay informacion en el Storage*/
let carritoDeCompras = [];
const strCarrito = localStorage.getItem("carrito")
const carrito = JSON.parse(strCarrito);

if (carrito == null) {
  carritoDeCompras = [];
  $(".carritoHeader").css("color", "#fdf0e7")

} else {
  carritoDeCompras = carrito;
  $(".carritoHeader").css("color", "green")

}

/*Declaracion de mi funcion constructora*/

class ProductoAnadido {
  constructor(producto, cantidad) {
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.id = producto.id;
    this.img = producto.img;
    this.cantidad = cantidad;
    this.subtotal = producto.precio * cantidad
  }
}

/*Obtnego la etiqueta del html*/
let container = document.getElementById("container");

/*Declaracion del listado de Productos*/
const listadoProductos = [
  { nombre: "Acuarela Neutral", precio: 500, id: 1, stock: 25, img: "multimedia/tienda5.jpeg", },
  { nombre: "Acuarela Ramitas", precio: 480, id: 2, stock: 50, img: "multimedia/tienda4.jpeg", },
  { nombre: "Acuarela Tonos", precio: 600, id: 3, stock: 20, img: "multimedia/tienda3.jpeg", },
  { nombre: "Acuarela Calidos", precio: 750, id: 4, stock: 10, img: "multimedia/tienda1.jpeg", },
  { nombre: "Acuarela Salvaje", precio: 450, id: 5, stock: 3, img: "multimedia/tienda2.jpeg", },
  { nombre: "Acuarela Naturaleza", precio: 450, id: 6, stock: 5, img: "multimedia/carrusel1.jpeg", },
  { nombre: "Señalador Campestre", precio: 150, id: 7, stock: 10, img: "multimedia/carrusel3.jpeg", },
  { nombre: "Señalador Pino", precio: 250, id: 8, stock: 15, img: "multimedia/senalador3.jpeg", },
  { nombre: "Agenda Campestre", precio: 850, id: 9, stock: 20, img: "multimedia/agenda.jpeg", },
]

/*"imprimir" Dinamicamente los productos*/

tiendaDinamica(listadoProductos);


function tiendaDinamica(productsArray) {

/*Borro todos los productos que existan en el html*/

  let cell = document.getElementById("container");

  if (cell.hasChildNodes()) {
    while (cell.childNodes.length >= 1) {
      cell.removeChild(cell.firstChild);
    }
  }

  productsArray.forEach((product) => {

  /*Declaracion de las etiquetas de la tienda dinmica*/
    let div = document.createElement("div");
    div.setAttribute("class", "cuadro");

    let img = document.createElement("img");
    img.setAttribute("class", "imgCuadro");

    let pNombre = document.createElement("p");
    pNombre.setAttribute("class", "nombreCuadro");

    let pPrecio = document.createElement("p");

    let simbolo = document.createElement("i");
    simbolo.setAttribute("class", "fas fa-cart-plus fa-lg")

    let button = document.createElement("button");
    button.setAttribute("class", "boton");

    img.src = `${product.img}`
    pNombre.innerHTML = `${product.nombre}`;
    pPrecio.innerHTML = `$${product.precio}`;
    button.innerHTML = `AGREGAR `;

    div.appendChild(img);
    div.appendChild(pNombre);
    div.appendChild(pPrecio);
    div.appendChild(button);
    button.appendChild(simbolo);


    button.addEventListener("click", () => {
      let contador
      let auxCarrito = carritoDeCompras.findIndex(a => a.id === product.id)
      $(".carritoHeader").css("color", "green")

      if (auxCarrito === -1) {
        item = new ProductoAnadido(product, 1)
        carritoDeCompras.push(item)
        contador = document.createElement("input")
        contador.value = 1;
      }
      else {
        carritoDeCompras[auxCarrito].cantidad = carritoDeCompras[auxCarrito].cantidad + 1;
        carritoDeCompras[auxCarrito].subtotal = carritoDeCompras[auxCarrito].cantidad * carritoDeCompras[auxCarrito].precio;
        contador = document.createElement("input")
        contador.value = carritoDeCompras[auxCarrito].cantidad;
      }

      localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))

      $("#sumar").fadeIn("slow", function () { $("#sumar").fadeOut(1000) })

      /*Una vez agregado el primer producto se genera un boton de sumar otro de restar y el input de cantidades*/

      button.parentNode.removeChild(button)

      let contendorBotones = document.createElement("div")
      contendorBotones.setAttribute("class", "botonera")
      let eliminar = document.createElement("button")
      eliminar.setAttribute("class", "botonSumaResta");
      let sumar = document.createElement("button")
      sumar.setAttribute("class", "botonSumaResta");


      eliminar.innerHTML = `-`;
      sumar.innerHTML = `+`;


      contendorBotones.appendChild(eliminar)
      contendorBotones.appendChild(contador)
      contendorBotones.appendChild(sumar)

      div.appendChild(contendorBotones)

      /*Funcion para sumar productos*/
      sumar.onclick = () => {
        let cantidad = contador.value
        let aux = listadoProductos.filter((prod) => prod.id === product.id)


        if (cantidad < aux[0].stock) {
          cantidad++
          $("#sumar").fadeIn("slow", function () { $("#sumar").fadeOut(1000) })

        }
        else {
          swal("No hay stock :(", "Disculpe las molestias", "info");
        }

        contador.value = cantidad;

        let auxPos = carritoDeCompras.findIndex(a => a.id === product.id);

        carritoDeCompras[auxPos].cantidad = cantidad;
        carritoDeCompras[auxPos].subtotal = cantidad * carritoDeCompras[auxPos].precio;

        localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))

      }


      /*Funcion para eliminar productos*/

      eliminar.onclick = () => {
        let cantidad = contador.value

        if (cantidad != 0) {
          cantidad--
          $("#restar").fadeIn("slow", function () { $("#restar").fadeOut(1000) })
        }

        else {
          swal("Cantidad Incorrecta", "No puede ser menor a cero", "info");
        }

        contador.value = cantidad;

        let auxPos = carritoDeCompras.findIndex(a => a.id === product.id);

        carritoDeCompras[auxPos].cantidad = cantidad;
        carritoDeCompras[auxPos].subtotal = cantidad * carritoDeCompras[auxPos].precio;

        localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))

      }

    }

    );

    container.appendChild(div);
  });
}


function busqueda() {

  const palabra = document.getElementById("buscador").value

  if (palabra == "") {
    tiendaDinamica(listadoProductos) //mostrar todos los productos	
  } else {
    productosTemp = listadoProductos.filter(prod => prod.nombre.toUpperCase().includes(palabra.toUpperCase()));
    
    tiendaDinamica(productosTemp)
    if(productosTemp.length===0)
    {
      $("#container").append(`<p></p><p class='msjBusqueda'>No encontramos resultados para "${palabra}" </p>`)
  
    }

  }
}