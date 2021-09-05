
window.onload = function () {
	const strCarrito = localStorage.getItem("carrito")
	const carrito = JSON.parse(strCarrito);

	let html;
	if (carrito == null) {
		html = "<p class='msjCarrito'>No hay productos en el carrito</p>"
		$(".carritoHeader").css("color", "#fdf0e7")

	} else {
		html = generarHTMLCarrito(carrito)
		$(".carritoHeader").css("color", "green")

	}

	const carritoTotal = document.getElementById("carritoTotal")
	carritoTotal.innerHTML = html

	let modal = document.getElementsByClassName("mensaje")



	//Declaramos la url que vamos a usar para el POST
	const URLGET = "https://jsonplaceholder.typicode.com/posts"

	$("#realizarCompra").click(() => {

		if (carrito == null) {

			swal("Carrito Vacio", "Primero tiene que llenar el carrito", "info");

		}
		else {

			/*Realizo un post ficticio, en caso de obtener "success" se realiza correctamente la compra*/
			$.post(URLGET, carrito, (respuesta, estado) => {
				if (estado === "success") {
					  swal({
						title: "Quiere realizar la compra?",
						icon: "info",
						buttons: {cancel:"Cancelar", SI:true}
					  })
					  .then(()=> {

						if(true)
						{
							swal("Compra Realizada Correctamente!", "Muchas Gracias!", "success")
							.then(() => {
								localStorage.clear();
								location.reload();;
							})
	
						}
						
					  })
				
				}
			});
		}
	});
}

function generarHTMLCarrito(objeto) {

	let totalCarrito = objeto.reduce((currentTotal, prod) => {
		return prod.subtotal + currentTotal;
	}, 0)
	let html = "<table class='table'><tr><td>Nombre</td><td>Producto</td><td>Precio</td><td>Cantidad</td></tr>";

	objeto.forEach(prod => {
		html += `<tr>
		                <td>${prod.nombre}</td> 
		                <td><img src="./${prod.img}" widht="100" height="100"></td> 
                        <td>${prod.precio} $</td> 
		                <td>${prod.cantidad}</td> 
		              </tr>`
	})
	html += "</table>"
	html += `<h2 class="total"> Total: ${totalCarrito}$</h2>`

	return html
}

let limpiar = document.getElementById("limpiarCarrito")
limpiar.onclick = () => {
	swal({
		title: "Desea vaciar el carrito de compras?",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
		  swal("Carrito de compras vacio", {
			icon: "success",
		  })
		  .then(() => {
			localStorage.clear();
			location.reload();
		})
		}
	  })

}


