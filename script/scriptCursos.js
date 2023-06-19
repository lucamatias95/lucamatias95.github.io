$(document).ready(function() {
  function iniciarSesion(event) {
    event.preventDefault();

    let email = $('#email').val();
    let nombre = $('#nombre').val();
    let apellido = $('#apellido').val();

    if (email !== '' && nombre !== '' && apellido !== '') {
      var data = {
        email: email,
        nombre: nombre,
        apellido: apellido
      };

      localStorage.setItem('sesion', JSON.stringify(data));

      $('.cursos-container').show();
      $('#checkout-form').show();
      $('#login-container').hide();
    } else {
      console.log('Por favor, completa todos los campos');
      alert('Por favor, completa todos los campos');
    }
  }

  function agregarAlCarrito(cursoId) {
    let curso = obtenerCursoPorId(cursoId);
    let carrito = obtenerCarrito();

    carrito.push(curso);
    guardarCarrito(carrito);
    mostrarCarrito();
  }

  function obtenerCursoPorId(cursoId) {
    let cursos = [
      { id: 1, titulo: 'Curso de Diseño gráfico', descripcion: 'Aprende a diseñar ilustraciones digitales!' },
      { id: 2, titulo: 'Curso de Diseño de páginas web', descripcion: 'Aprende a programar desde cero!' },
      { id: 3, titulo: 'Curso de diseño de indumentaria', descripcion: 'Aprende a diseñar la ropa de tus sueños!' },
      { id: 4, titulo: 'Curso de Marketing digital', descripcion: 'Aprende a diseñar estrategias de marketing!' }
    ];

    return cursos.find(curso => curso.id === cursoId);
  }

  function obtenerCarrito() {
    let carrito = localStorage.getItem('carrito');
    if (carrito) {
      return JSON.parse(carrito);
    } else {
      return [];
    }
  }

  function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function mostrarCarrito() {
    let carritoElement = $('#carrito');
    carritoElement.empty();

    let carrito = obtenerCarrito();

    carrito.forEach(curso => {
      let li = $('<li>').text(curso.titulo);
      carritoElement.append(li);
    });
  }

  function finalizarCompra(event) {
    event.preventDefault();

    let telefono = $('#telefono').val();

    if (telefono) {
      alert('Gracias, nos estaremos comunicando al número ' + telefono + ' para finalizar la compra');
      localStorage.removeItem('carrito');
      mostrarCarrito();
    } else {
      alert('Debes ingresar un número de teléfono válido');
    }
  }

  $('.cursos-container').hide();
  $('#checkout-form').hide();

  let sesion = localStorage.getItem('sesion');
  if (sesion) {
    $('.cursos-container').show();
    $('#checkout-form').show();
    $('#login-container').hide();
  }

  $('#login-form').submit(iniciarSesion);
  $('#checkout-form').submit(finalizarCompra);

  $('.curso.oculto').show();

  mostrarCarrito();

  $('.curso button').click(function() {
    let cursoId = $(this).closest('.curso').index() + 1;
    agregarAlCarrito(cursoId);
  });
});
