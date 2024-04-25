document.addEventListener('DOMContentLoaded', function () {
    // Selección de elementos del DOM
    const titulo = document.getElementById('titulo'); // Título del presupuesto
    const mes = document.getElementById('mes'); // Mes actual
    const año = document.getElementById('año'); // Año actual
    const montoTotal = document.getElementById('montoTotal'); // Total disponible
    const incomeText = document.getElementById('income-text'); // Texto de ingresos
    const expenseText = document.getElementById('expense-text'); // Texto de egresos
    const expensePercentage = document.getElementById('expense'); // Porcentaje de gastos

    const transactionForm = document.getElementById('transaction-form'); // Formulario de transacción
    const transactionType = document.getElementById('transaction-type'); // Tipo de transacción
    const transactionDescription = document.getElementById('transaction-description'); // Descripción de transacción
    const transactionAmount = document.getElementById('transaction-amount'); // Monto de transacción

    const incomeTableBody = document.querySelector('#income-table tbody'); // Cuerpo de la tabla de ingresos
    const expenseTableBody = document.querySelector('#expense-table tbody'); // Cuerpo de la tabla de egresos

    // Arreglos para almacenar ingresos y egresos
    let ingresos = [];
    let egresos = [];

    // Función para agregar una nueva transacción
    function agregarTransaccion() {
        const tipo = transactionType.value; // Tipo de transacción (ingreso o egreso)
        const descripcion = transactionDescription.value.trim(); // Descripción de la transacción
        const monto = parseFloat(transactionAmount.value); // Monto de la transacción

        // Validación de la descripción
        if (descripcion === '') {
            Swal.fire('Error', 'Por favor, ingrese una descripción.', 'error');
            return;
        }

        // Validación del monto
        if (isNaN(monto) || monto <= 0) {
            Swal.fire('Error', 'Debes introducir un número válido.', 'error');
            return;
        }

        // Creación de un objeto para la nueva transacción
        const nuevaTransaccion = {
            tipo: tipo,
            descripcion: descripcion,
            monto: monto
        };

        // Almacenamiento de la transacción en el arreglo correspondiente
        if (tipo === 'income') {
            ingresos.push(nuevaTransaccion);
        } else {
            egresos.push(nuevaTransaccion);
        }

        // Actualización de las tablas y los totales
        actualizarTablas();
        calcularTotales();
    }

    // Función para actualizar las tablas de ingresos y egresos
    function actualizarTablas() {
        incomeTableBody.innerHTML = ''; // Limpiar tabla de ingresos
        expenseTableBody.innerHTML = ''; // Limpiar tabla de egresos

        // Iterar sobre cada transacción de ingresos y agregarla a la tabla correspondiente
        ingresos.forEach(function (transaccion) {
            const row = document.createElement('tr'); // Crear fila
            row.innerHTML = `<td>${transaccion.descripcion}</td><td>${transaccion.monto.toFixed(2)}</td>`; // HTML de la fila
            incomeTableBody.appendChild(row); // Agregar fila a la tabla de ingresos
        });

        // Iterar sobre cada transacción de egresos y agregarla a la tabla correspondiente
        egresos.forEach(function (transaccion) {
            const row = document.createElement('tr'); // Crear fila
            const porcentaje = transaccion.monto * 100 / calcularTotalEgresos(); // Calcular porcentaje del total
            row.innerHTML = `<td>${transaccion.descripcion}</td><td>${transaccion.monto.toFixed(2)}</td><td>${porcentaje.toFixed(2)}%</td>`; // HTML de la fila
            expenseTableBody.appendChild(row); // Agregar fila a la tabla de egresos
        });
    }

    // Función para calcular el total de ingresos
    function calcularTotalIngresos() {
        return ingresos.reduce((total, transaccion) => total + transaccion.monto, 0);
    }

    // Función para calcular el total de egresos
    function calcularTotalEgresos() {
        return egresos.reduce((total, transaccion) => total + transaccion.monto, 0);
    }

    // Función para calcular el porcentaje de gastos
    function calcularPorcentajeGastos() {
        const totalIngresos = calcularTotalIngresos();
        const totalEgresos = calcularTotalEgresos();
        if (totalIngresos === 0) {
            return 0;
        }
        return (totalEgresos * 100 / totalIngresos).toFixed(2);
    }

    // Función para calcular los totales y actualizar la interfaz
    function calcularTotales() {
        const totalIngresos = calcularTotalIngresos();
        const totalEgresos = calcularTotalEgresos();
        const porcentajeGastos = calcularPorcentajeGastos();

        montoTotal.textContent = `Total disponible: ${(totalIngresos - totalEgresos).toFixed(2)}`; // Actualizar total disponible
        incomeText.textContent = `INGRESOS: ${totalIngresos.toFixed(2)}`; // Actualizar texto de ingresos
        expenseText.textContent = `EGRESOS: ${totalEgresos.toFixed(2)}`; // Actualizar texto de egresos
        expensePercentage.textContent = `Porcentaje de gastos: ${porcentajeGastos}%`; // Actualizar porcentaje de gastos
    }

    // Obtener fecha actual y actualizar elementos correspondientes
    const fechaActual = new Date();
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    titulo.textContent = `Presupuesto de ${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`; // Actualizar título
    mes.textContent = meses[fechaActual.getMonth()]; // Actualizar mes
    año.textContent = fechaActual.getFullYear(); // Actualizar año

    // Agregar evento al formulario de transacción
    transactionForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar comportamiento por defecto del formulario
        agregarTransaccion(); // Llamar a la función para agregar transacción
    });
});

// Función para mostrar la sección de ingresos
function mostrarIngresos(id) {
    var elemento = document.getElementById(id); // Obtener elemento por ID
    var elemento1 = document.getElementById('expenses'); // Obtener elemento de egresos
    elemento.style.display = "block"; // Mostrar elemento de ingresos
    elemento1.style.display = "none"; // Ocultar elemento de egresos
    var btnIncome = document.getElementById('btn-Income'); // Obtener botón de ingresos
    var btnExpense = document.getElementById('btn-Expense'); // Obtener botón de egresos
    btnIncome.style.backgroundColor = 'rgba(43,50,58,255)'; // Establecer color de fondo para botón de ingresos
    btnExpense.style.backgroundColor = 'rgba(214,214,214,255)'; // Establecer color de fondo para botón de egresos
}

// Función para mostrar la sección de egresos
function mostrarEgresos(id) {
    var elemento = document.getElementById(id); // Obtener elemento por ID
    var elemento1 = document.getElementById('incomes'); // Obtener elemento de ingresos
    elemento.style.display = "block"; // Mostrar elemento de egresos
    elemento1.style.display = "none"; // Ocultar elemento de ingresos
    var btnIncome = document.getElementById('btn-Income'); // Obtener botón de ingresos
    var btnExpense = document.getElementById('btn-Expense'); // Obtener botón de egresos
    btnIncome.style.backgroundColor = 'rgba(214,214,214,255)'; // Establecer color de fondo para botón de ingresos
    btnExpense.style.backgroundColor = 'rgba(43,50,58,255)'; // Establecer color de fondo para botón de egresos
}

