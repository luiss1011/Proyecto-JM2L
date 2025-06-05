const urlParams = new URLSearchParams(window.location.search);
  const mensaje = urlParams.get('mensaje');
  const error = urlParams.get('error');

  if (mensaje) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje,
      confirmButtonColor: '#3085d6',
      timer: 3000,
      timerProgressBar: true
    });
  }

  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
      confirmButtonColor: '#d33',
      timer: 4000,
      timerProgressBar: true
    });
  }
