/*=====================================================
        CRUNCH CHEESE v0.0
        SISTEMA PROFESIONAL DE VENTAS
======================================================*/

/*=========================================
        CARRITO DEL PEDIDO
=========================================*/

let carritoPedido = [];

/*=====================================================
            NÚMERO DE PEDIDO
======================================================*/

function generarNumeroPedido() {

    const pedidoElemento = document.getElementById("numeroPedido");

    if (!pedidoElemento) return;

    const numero = String(numeroPedido).padStart(4, "0");

    pedidoElemento.textContent = numero;

}

/*=========================================
    ACTUALIZAR TABLA DEL PEDIDO
=========================================*/
function actualizarTablaPedido() {

    let lista =
        document.getElementById("listaPedido");

    let total =
        document.getElementById("totalPedido");

    lista.innerHTML = "";

    let sumaTotal = 0;

    carritoPedido.forEach(producto => {

        lista.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.subtotal.toLocaleString()}</td>
            </tr>
        `;

        sumaTotal += producto.subtotal;
    });

    total.textContent =
        sumaTotal.toLocaleString();
}

/*=========================================
    AGREGAR CLÁSICA
=========================================*/
function agregarClasica() {

    const producto =
        document.getElementById("productoClasica");

    const cantidad =
        Number(
            document.getElementById("cantidadClasica").value
        );

    carritoPedido.push({

        nombre:
            producto.options[
                producto.selectedIndex
            ].text,

        cantidad: cantidad,

        precio:
            Number(producto.value),

        subtotal:
            Number(producto.value) * cantidad
    });

    actualizarTablaPedido();
}

/*=========================================
    AGREGAR KRISPY
=========================================*/
function agregarKrispy() {

    const producto =
        document.getElementById("productoKrispy");

    const cantidad =
        Number(
            document.getElementById("cantidadKrispy").value
        );

    carritoPedido.push({

        nombre:
            producto.options[
                producto.selectedIndex
            ].text,

        cantidad: cantidad,

        precio:
            Number(producto.value),

        subtotal:
            Number(producto.value) * cantidad
    });

    actualizarTablaPedido();
}

/*=========================================
    AGREGAR FLAMING
=========================================*/
function agregarFlaming() {

    const producto =
        document.getElementById("productoFlaming");

    const cantidad =
        Number(
            document.getElementById("cantidadFlaming").value
        );

    carritoPedido.push({

        nombre:
            producto.options[
                producto.selectedIndex
            ].text,

        cantidad: cantidad,

        precio:
            Number(producto.value),

        subtotal:
            Number(producto.value) * cantidad
    });

    actualizarTablaPedido();
}
/*=====================================================
            CALCULAR PEDIDO
======================================================*/

function calcularPedido() {

    /*=========================================
            OBTENER CONTROLES
    =========================================*/

    const clienteInput = document.getElementById("cliente");
    const resumen = document.getElementById("resumenCompra");

    /*=========================================
            VALIDACIONES
    =========================================*/

    if (!clienteInput) {

        alert("No se encontró el campo del cliente.");

        return 0;

    }

    const cliente = clienteInput.value.trim();

    if (cliente === "") {

        alert("Ingrese el nombre del cliente.");

        return 0;

    }

    if (carritoPedido.length === 0) {

        alert("Debe agregar al menos un producto al pedido.");

        return 0;

    }

    /*=========================================
            CALCULAR PRODUCTOS
    =========================================*/

    let total = 0;

    let detalleProductos = "";

    carritoPedido.forEach(item => {

        total += item.subtotal;

        detalleProductos += `

            <tr>

                <td>${item.nombre}</td>

                <td style="text-align:center;">
                    ${item.cantidad}
                </td>

                <td style="text-align:right;">
                    $${item.subtotal.toLocaleString("es-CO")}
                </td>

            </tr>

        `;

    });

    /*=========================================
            RESUMEN
    =========================================*/

    if (resumen) {

        resumen.innerHTML = `

            <div class="resumen-pedido">

                <p>

                    <strong>Cliente:</strong>

                    ${cliente}

                </p>

                <br>

                <table class="tabla-resumen" width="100%">

                    <thead>

                        <tr>

                            <th>Producto</th>

                            <th>Cantidad</th>

                            <th>Subtotal</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${detalleProductos}

                    </tbody>

                </table>

                <br>

                <hr>

                <h2 style="color:#27ae60; text-align:center;">

                    💰 Total:
                    $${total.toLocaleString("es-CO")}

                </h2>

            </div>

        `;

    }

    return total;

}
/*=====================================================
                REALIZAR PEDIDO
======================================================*/

function realizarPedido() {

    /*=========================================
            VALIDAR CAJA ABIERTA
    =========================================*/

    if (!cajaAbierta) {

        alert("⚠ Debe abrir la caja antes de registrar pedidos.");
        return;

    }

    /*=========================================
            VALIDAR CLIENTE
    =========================================*/

    const cliente =
        document.getElementById("cliente").value.trim();

    if (cliente === "") {

        alert("⚠ Ingrese el nombre del cliente.");
        return;

    }

    /*=========================================
            VALIDAR TELÉFONO
    =========================================*/

    const telefono =
        document.getElementById("telefono").value.trim();

    if (telefono === "") {

        alert("⚠ Ingrese el número de celular.");
        return;

    }

    if (telefono.length !== 10 || isNaN(telefono)) {

        alert("⚠ Ingrese un número de celular válido.");
        return;

    }

    if (!telefono.startsWith("3")) {

        alert("⚠ El número celular debe iniciar por 3.");
        return;

    }

    /*=========================================
        VALIDAR TIPO DE CLIENTE
    =========================================*/

    const tipoCliente =
        document.getElementById("tipoCliente").value;

    if (tipoCliente === "") {

        alert("⚠ Seleccione el tipo de cliente.");
        return;

    }

    /*=========================================
            VALIDAR CURSO
    =========================================*/

    const curso =
        document.getElementById("curso").value.trim();

    if (curso === "") {

        alert("⚠ Ingrese el curso.");
        return;

    }

    /*=========================================
        CALCULAR EL PEDIDO
=========================================*/

const totalPedido = calcularPedido();

if (totalPedido === 0) {

    return;

}

/*=========================================
        FECHA Y HORA
=========================================*/

const ahora = new Date();

/*=========================================
        CREAR PEDIDO
=========================================*/

const pedido = {

    numero: numeroPedido,

    fecha: ahora.toLocaleDateString("es-CO"),

    hora: ahora.toLocaleTimeString("es-CO", {

        hour: "2-digit",

        minute: "2-digit"

    }),

    cliente: cliente,

    telefono: telefono,

    tipoCliente: tipoCliente,

    curso: curso,

    productos: [...carritoPedido],

    total: totalPedido,

    metodoPago:
        document.getElementById("metodoPago").value,

    estado: "En preparación"

};

/*=========================================
        GUARDAR PEDIDO
=========================================*/

ultimoPedido = pedido;

pedidos.push(pedido);

/*=========================================
        ACTUALIZAR CAJA
=========================================*/

ventasCaja += pedido.total;

totalPedidosCaja++;

switch (pedido.metodoPago) {

    case "Efectivo":
        totalEfectivo += pedido.total;
        break;

    case "Nequi":
        totalNequi += pedido.total;
        break;

    case "Daviplata":
        totalDaviplata += pedido.total;
        break;

    case "Transferencia":
        totalTransferencia += pedido.total;
        break;

}

/*=========================================
        GUARDAR INFORMACIÓN
=========================================*/

guardarPedidos();

guardarCaja();

/*=========================================
        ACTUALIZAR PANTALLAS
=========================================*/

actualizarCaja();

if (typeof actualizarDashboard === "function") {

    actualizarDashboard();

}

if (typeof actualizarReportes === "function") {

    actualizarReportes();

}

if (typeof actualizarHistorial === "function") {

    actualizarHistorial();

}

if (typeof actualizarPedidosProceso === "function") {

    actualizarPedidosProceso();

}

/*=========================================
        REGISTRAR CLIENTE
=========================================*/

if (typeof registrarCliente === "function") {

    registrarCliente(

        cliente,

        telefono,

        pedido.productos,

        pedido.total

    );

}

/*=========================================
        GENERAR TICKET
=========================================*/

if (typeof generarTicket === "function") {

    generarTicket(pedido);

}

/*=========================================
        NUEVO CONSECUTIVO
=========================================*/

numeroPedido++;

generarNumeroPedido();

/*=========================================
        MENSAJE FINAL
=========================================*/

alert("✅ Pedido registrado correctamente.");

/*=====================================================
                LIMPIAR FORMULARIO
======================================================*/

function limpiarFormulario() {

    document.getElementById("cliente").value = "";

    document.getElementById("telefono").value = "";

    document.getElementById("curso").value = "";

    document.getElementById("tipoCliente").selectedIndex = 0;

    document.getElementById("producto").selectedIndex = 0;

    document.getElementById("KrispyconPapas").selectedIndex = 0;

    document.getElementById("cantidad").value = 1;

    document.getElementById("cantidad-KrispyconPapas").value = 1;

    document
        .querySelectorAll('input[name="extra"]')
        .forEach(check => {

            check.checked = false;

        });

    carritoPedido = [];

    actualizarTablaPedido();

    const resumen =
        document.getElementById("resumenCompra");

    if (resumen) {

        resumen.innerHTML = "";

    }

}
/*=====================================================
            OBTENER TOTAL DEL PEDIDO
======================================================*/

function obtenerTotal() {

    /*=========================================
            PRODUCTO
    =========================================*/

    const producto = Number(
        document.getElementById("producto").value
    );

    let subtotal = producto;

    /*=========================================
            CANTIDAD
    =========================================*/

    const cantidad =
        Number(
            document.getElementById("cantidad").value
        );

    /*=========================================
            VALIDAR CANTIDAD
    =========================================*/

    if (cantidad <= 0) {

        return 0;

    }

    /*=========================================
            TOTAL
    =========================================*/

    return subtotal * cantidad;

}
/*=====================================================
                ELIMINAR PEDIDO
======================================================*/

function eliminarPedido(indice) {

    const confirmar = confirm(

        "¿Desea eliminar este pedido?"

    );

    if (!confirmar) {

        return;

    }

    pedidos.splice(indice, 1);

    guardarPedidos();

    actualizarDashboard();

    actualizarReportes();

    actualizarHistorial();

    actualizarPedidosProceso();

    actualizarCaja();

    actualizarClientes();

    alert("✅ Pedido eliminado correctamente.");

}
/*=====================================================
                PEDIDO LISTO
======================================================*/

function pedidoListo(indice) {

    // Validar que el pedido exista

    if (!pedidos[indice]) {

        return;

    }

    pedidos[indice].estado = "Listo para entregar";

    guardarPedidos();

    actualizarDashboard();

    actualizarReportes();

    actualizarHistorial();

    actualizarPedidosProceso();

    actualizarCaja();

}

/*=====================================================
                ENTREGAR PEDIDO
======================================================*/

function entregarPedido(indice) {

    // Validar que el pedido exista

    if (!pedidos[indice]) {

        return;

    }

    // Validar estado

    if (pedidos[indice].estado !== "Listo para entregar") {

        alert("⚠ Primero marque el pedido como LISTO.");

        return;

    }

    pedidos[indice].estado = "Entregado";

    guardarPedidos();

    actualizarDashboard();

    actualizarReportes();

    actualizarHistorial();

    actualizarPedidosProceso();

    actualizarCaja();

    alert("✅ Pedido entregado correctamente.");

 }
}