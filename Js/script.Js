document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia a los elementos del DOM
    const titulo = document.getElementById('titulo');
    const mes = document.getElementById('mes');
    const año = document.getElementById('año');
    const montoTotal = document.getElementById('montoTotal');
    const incomeText = document.getElementById('income-text');
    const expenseText = document.getElementById('expense-text');
    const expensePercentage = document.getElementById('expense');

    const transactionForm = document.getElementById('transaction-form');
    const transactionType = document.getElementById('transaction-type');
    const transactionDescription = document.getElementById('transaction-description');
    const transactionAmount = document.getElementById('transaction-amount');

    const incomeTableBody = document.querySelector('#income-table tbody');
    const expenseTableBody = document.querySelector('#expense-table tbody');

    // Arreglos para manejar las transacciones
    let ingresos = [];
    let egresos = [];

    // Función para agregar una nueva transacción
    function agregarTransaccion() {
        // Obtener valores del formulario
        const tipo = transactionType.value;
        const descripcion = transactionDescription.value.trim(); // Eliminar espacios en blanco al inicio y al final
        const monto = parseFloat(transactionAmount.value);

        // Validar campo de descripción
        if (descripcion === '') {
            alert('Por favor, ingrese una descripción.');
            return;
        }

        // Validar monto
        if (isNaN(monto) || monto <= 0) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }

        // Crear objeto de transacción
        const nuevaTransaccion = {
            tipo: tipo,
            descripcion: descripcion,
            monto: monto
        };

        // Agregar transacción al arreglo correspondiente
        if (tipo === 'income') {
            ingresos.push(nuevaTransaccion);
        } else {
            egresos.push(nuevaTransaccion);
        }

        // Actualizar tablas y totales
        actualizarTablas();
        calcularTotales();
    }

    // Función para actualizar las tablas de ingresos y egresos
    function actualizarTablas() {
        // Limpiar tablas
        incomeTableBody.innerHTML = '';
        expenseTableBody.innerHTML = '';

        // Llenar tablas con transacciones
        ingresos.forEach(function(transaccion) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${transaccion.descripcion}</td><td>${transaccion.monto.toFixed(2)}</td>`;
            incomeTableBody.appendChild(row);
        });

        egresos.forEach(function(transaccion) {
            const row = document.createElement('tr');
            const porcentaje = transaccion.monto * 100 / calcularTotalIngresos();
            row.innerHTML = `<td>${transaccion.descripcion}</td><td>${transaccion.monto.toFixed(2)}</td><td>${porcentaje.toFixed(2)}%</td>`;
            expenseTableBody.appendChild(row);
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

    // Función para calcular el porcentaje total de gastos
    function calcularPorcentajeGastos() {
        const totalIngresos = calcularTotalIngresos();
        const totalEgresos = calcularTotalEgresos();
        if (totalIngresos === 0) {
            return 0;
        }
        return (totalEgresos * 100 / totalIngresos).toFixed(2);
    }

    // Función para calcular y actualizar totales
    function calcularTotales() {
        const totalIngresos = calcularTotalIngresos();
        const totalEgresos = calcularTotalEgresos();
        const porcentajeGastos = calcularPorcentajeGastos();

        montoTotal.textContent = `Total disponible: ${(totalIngresos - totalEgresos).toFixed(2)}`;
        incomeText.textContent = `INGRESOS: ${totalIngresos.toFixed(2)}`;
        expenseText.textContent = `EGRESOS: ${totalEgresos.toFixed(2)}`;
        expensePercentage.textContent = `Porcentaje de gastos: ${porcentajeGastos}%`;
    }

    // Inicializar título con mes y año actual
    const fechaActual = new Date();
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    titulo.textContent = `Presupuesto de ${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`;
    mes.textContent = meses[fechaActual.getMonth()];
    año.textContent = fechaActual.getFullYear();

    // Manejar evento de envío del formulario de transacción
    transactionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar envío del formulario
        agregarTransaccion(); // Agregar transacción
    });
});

