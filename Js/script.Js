var fecha = new Date();

var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

var mesActual = meses[fecha.getMonth()];

var anoActual = fecha.getFullYear();

document.getElementById('mes').textContent = mesActual;
document.getElementById('año').textContent = anoActual;