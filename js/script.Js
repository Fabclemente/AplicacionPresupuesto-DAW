document.addEventListener('DOMContentLoaded', function () {
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

    let ingresos = [];
    let egresos = [];

    function agregarTransaccion() {
        const tipo = transactionType.value;
        const descripcion = transactionDescription.value.trim();
        const monto = parseFloat(transactionAmount.value);

        if (descripcion === '') {
            Swal.fire('Error', 'Por favor, ingrese una descripción.', 'error');
            return;
        }

        if (isNaN(monto) || monto <= 0) {
            Swal.fire('Error', 'Debes introducir un número válido.', 'error');
            return;
        }

        const nuevaTransaccion = {
            tipo: tipo,
            descripcion: descripcion,
            monto: monto
        };

        if (tipo === 'income') {
            ingresos.push(nuevaTransaccion);
        } else {
            egresos.push(nuevaTransaccion);
        }

        actualizarTablas();
        calcularTotales();
    }

    function actualizarTablas() {
        incomeTableBody.innerHTML = '';
        expenseTableBody.innerHTML = '';

        ingresos.forEach(function (transaccion) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${transaccion.descripcion}</td><td>${transaccion.monto.toFixed(2)}</td>`;
            incomeTableBody.appendChild(row);
        });

        egresos.forEach(function (transaccion) {
            const row = document.createElement('tr');
            const porcentaje = transaccion.monto * 100 / calcularTotalEgresos();
            row.innerHTML = `<td>${transaccion.descripcion}</td><td>${transaccion.monto.toFixed(2)}</td><td>${porcentaje.toFixed(2)}%</td>`;
            expenseTableBody.appendChild(row);
        });
    }

    function calcularTotalIngresos() {
        return ingresos.reduce((total, transaccion) => total + transaccion.monto, 0);
    }

    function calcularTotalEgresos() {
        return egresos.reduce((total, transaccion) => total + transaccion.monto, 0);
    }

    function calcularPorcentajeGastos() {
        const totalIngresos = calcularTotalIngresos();
        const totalEgresos = calcularTotalEgresos();
        if (totalIngresos === 0) {
            return 0;
        }
        return (totalEgresos * 100 / totalIngresos).toFixed(2);
    }

    function calcularTotales() {
        const totalIngresos = calcularTotalIngresos();
        const totalEgresos = calcularTotalEgresos();
        const porcentajeGastos = calcularPorcentajeGastos();

        montoTotal.textContent = `Total disponible: ${(totalIngresos - totalEgresos).toFixed(2)}`;
        incomeText.textContent = `INGRESOS: ${totalIngresos.toFixed(2)}`;
        expenseText.textContent = `EGRESOS: ${totalEgresos.toFixed(2)}`;
        expensePercentage.textContent = `Porcentaje de gastos: ${porcentajeGastos}%`;
    }

    const fechaActual = new Date();
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    titulo.textContent = `Presupuesto de ${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`;
    mes.textContent = meses[fechaActual.getMonth()];
    año.textContent = fechaActual.getFullYear();

    transactionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        agregarTransaccion();
    });
});

function mostrarIngresos(id) {
    var elemento = document.getElementById(id);
    var elemento1 = document.getElementById('expenses');
    elemento.style.display = "block";
    elemento1.style.display = "none";
    var btnIncome = document.getElementById('btn-Income');
    var btnExpense = document.getElementById('btn-Expense');
    btnIncome.style.backgroundColor = 'rgba(43,50,58,255)';
    btnExpense.style.backgroundColor = 'rgba(214,214,214,255)';
}

function mostrarEgresos(id) {
    var elemento = document.getElementById(id);
    var elemento1 = document.getElementById('incomes');
    elemento.style.display = "block";
    elemento1.style.display = "none";
    var btnIncome = document.getElementById('btn-Income');
    var btnExpense = document.getElementById('btn-Expense');
    btnIncome.style.backgroundColor = 'rgba(214,214,214,255)';
    btnExpense.style.backgroundColor = 'rgba(43,50,58,255)';
}
