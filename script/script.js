
function guardarNotas(nombre, nota1, nota2, nota3) {
    
    var notas = JSON.parse(localStorage.getItem('notas')) || [];
  
   
    var nuevaNota = {
      nombre: nombre,
      notas: [nota1, nota2, nota3]
    };
    notas.push(nuevaNota);
  
    
    localStorage.setItem('notas', JSON.stringify(notas));
  }
  
  
  function obtenerNotas() {
    
    var notas = JSON.parse(localStorage.getItem('notas')) || [];
    return notas;
  }
  
 
  function calcularPromedio(notas) {
    var total = 0;
    for (var i = 0; i < notas.length; i++) {
      total += notas[i];
    }
    var promedio = total / notas.length;
    return promedio.toFixed(2); // 
  }
  
  
  function mostrarHistorial() {
    var historialContainer = document.getElementById('historial-container');
    historialContainer.innerHTML = '';
  
    var notas = obtenerNotas();
    if (notas.length === 0) {
      historialContainer.innerHTML = '<p>No hay notas guardadas.</p>';
      return;
    }
  
    var historialHTML = '';
    for (var i = 0; i < notas.length; i++) {
      var alumno = notas[i];
      var nombre = alumno.nombre;
      var notasAlumno = alumno.notas;
      var promedio = calcularPromedio(notasAlumno);
  
      historialHTML += '<div class="alumno">';
      historialHTML += '<h3>' + nombre + '</h3>';
      historialHTML += '<p>Notas: ' + notasAlumno.join(', ') + '</p>';
      historialHTML += '<p>Promedio: ' + promedio + '</p>';
      historialHTML += '</div>';
    }
  
    historialContainer.innerHTML = historialHTML;
  }
  
 
  var formulario = document.getElementById('formulario');
  formulario.addEventListener('submit', function(event) {
    event.preventDefault();
  
    var nombre = document.getElementById('nombre').value;
    var nota1 = parseFloat(document.getElementById('nota1').value);
    var nota2 = parseFloat(document.getElementById('nota2').value);
    var nota3 = parseFloat(document.getElementById('nota3').value);
  
    guardarNotas(nombre, nota1, nota2, nota3);
    mostrarHistorial();
  
    formulario.reset();
  });
  
  mostrarHistorial();
  