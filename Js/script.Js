var fecha = new Date();

var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

var mesActual = meses[fecha.getMonth()];

var anoActual = fecha.getFullYear();

var totalIngresos = 0;
var totalEgresos = 0;


function agregarTransaccion() {
 
  var descripcion = document.getElementById('descripcion').value;
  var monto = parseFloat(document.getElementById('monto').value);
  if (descripcion.trim() === '' || isNaN(monto) || monto <= 0) {
    alert('Por favor, ingrese una descripción válida y un monto mayor que cero.');
    return;
  }
  totalIngresos += monto;

 
  agregarDetalleTransaccion(descripcion, monto, 'ingresos');


  actualizarTotales();
  mostrarResultado(descripcion, monto, 'income');
}

function agregarDetalleTransaccion(descripcion, monto, tipo) {
  var lista = document.getElementById(`lista-${tipo}`);
  var nuevaTransaccion = document.createElement('li');
  nuevaTransaccion.textContent = `${descripcion}: ${monto.toFixed(2)}`;
  lista.appendChild(nuevaTransaccion);
}

function actualizarTotales() {
  document.getElementById('total-ingresos').textContent = '+' + totalIngresos.toFixed(2);
  document.getElementById('total-egresos').textContent = '-' + totalEgresos.toFixed(2);
  var totalActualizado = totalIngresos - totalEgresos;
  document.getElementById('total').value = totalActualizado.toFixed(2);
}

function mostrarResultado(descripcion, monto, tipoTransaccion) {
  var resultado = document.getElementById('resultado');
  resultado.textContent = `Transacción (${tipoTransaccion}): ${descripcion} + ${monto.toFixed(2)}`;

  setTimeout(function() {
    resultado.textContent = '';
  }, 3000); 
}
