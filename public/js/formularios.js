document.addEventListener('DOMContentLoaded', function() {
    // Contenedores relevantes
    const contenedores = {
        vacaciones: document.getElementById('contenedorVacaciones'),
        incapacidad: document.getElementById('contenedorIncapacidad'),
        permiso: document.getElementById('contenedorPermiso'),
        solicitudChofer: document.getElementById('contenedorSolicitudChofer'),
        mttoVehiculos: document.getElementById('contenedorMantenimientoVehiculos'),
        proveedores: document.getElementById('contenedorSolicitudProveedores'),
    };

    // Enlaces del menú
    const links = {
        vacaciones: document.getElementById('linkVacaciones'),
        incapacidad: document.getElementById('linkIncapacidad'),
        permiso: document.getElementById('linkPermisoPersonal'),
        solicitudChofer: document.getElementById('linkSolicitudChofer'),
        mttoVehiculos: document.getElementById('linkMttoVehiculos'),
        proveedores: document.getElementById('linkProveedores'),
    };

    // Botones de limpiar
    const botonesLimpiar = document.querySelectorAll('#botonLimpiar');

    ocultarTodosLosFormularios();

    function ocultarTodosLosFormularios() {
        Object.values(contenedores).forEach(contenedor => {
            if (contenedor) contenedor.style.display = 'none';
        });
    }

    // Eventos de los enlaces
    links.vacaciones?.addEventListener('click', (e) => mostrarFormulario(e, 'vacaciones'));
    links.incapacidad?.addEventListener('click', (e) => mostrarFormulario(e, 'incapacidad'));
    links.permiso?.addEventListener('click', (e) => mostrarFormulario(e, 'permiso'));
    links.solicitudChofer?.addEventListener('click', (e) => mostrarFormulario(e, 'solicitudChofer'));
    links.mttoVehiculos?.addEventListener('click', (e) => mostrarFormulario(e, 'mttoVehiculos'));
    links.proveedores?.addEventListener('click', (e) => mostrarFormulario(e, 'proveedores'));

    function mostrarFormulario(e, tipo) {
        e.preventDefault();
        ocultarTodosLosFormularios();
        if (contenedores[tipo]) {
            contenedores[tipo].style.display = 'block';
            actualizarTitulo(tipo);
            cerrarMenuMovil();
        }
    }

    function actualizarTitulo(tipo) {
        const titulos = {
            vacaciones: 'Vacaciones',
            incapacidad: 'Incapacidad',
            permiso: 'Permiso Personal',
            solicitudChofer: 'Solicitud de Chofer',
            mttoVehiculos: 'Mantenimiento de Vehículos',
            proveedores: 'Solicitud de Proveedores',
        };

        document.querySelectorAll('.encabezado h3').forEach(encabezado => {
            encabezado.innerHTML = `<i class="fas fa-user-tie"></i>Solicitud de ${titulos[tipo]}`;
        });
    }

    function cerrarMenuMovil() {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.add('collapsed');
        }
    }

    // Botones de limpiar
    botonesLimpiar.forEach(boton => {
        boton.addEventListener('click', function() {
            const formulario = this.closest('form');
            if (formulario) {
                formulario.reset();
                const seccion = formulario.querySelector('.seccion-formulario');
                if (seccion) {
                    seccion.classList.remove('seccion-activa');
                    setTimeout(() => seccion.classList.add('seccion-activa'), 10);
                }
            }
        });
    });

    // Formularios válidos
    configurarEnvioFormulario('formularioVacaciones');
    configurarEnvioFormulario('formularioIncapacidad');
    configurarEnvioFormulario('formularioPermisoPersonal');
    configurarEnvioFormulario('formularioSolicitudChofer');
    configurarEnvioFormulario('formularioMttov');
    configurarEnvioFormulario('formularioSolicitudProveedores');

    function configurarEnvioFormulario(idFormulario) {
        const formulario = document.getElementById(idFormulario);
        if (!formulario) return;

        formulario.addEventListener('submit', function(e) {
            if (!validarCamposComunes(this)) {
                e.preventDefault();
                return;
            }
            if (!validarFechas(this)) {
                e.preventDefault();
                return;
            }
        });
    }

    function validarFechas(formulario) {
        const fechaInicioInput = formulario.querySelector('input[name="fechaInicio"]');
        const fechaFinInput = formulario.querySelector('input[name="fechaFin"]');

        if (!fechaInicioInput || !fechaFinInput) return true;

        const fechaInicio = new Date(fechaInicioInput.value);
        const fechaFin = new Date(fechaFinInput.value);

        if (fechaInicio > fechaFin) {
            alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
            fechaInicioInput.focus();
            return false;
        }

        return true;
    }

    function validarCamposComunes(formulario) {
        const camposRequeridos = [
            formulario.querySelector('#numeroEmpleado'),
            formulario.querySelector('#nombreCompleto'),
            formulario.querySelector('#departamento'),
            formulario.querySelector('#puesto')
        ];

        for (const campo of camposRequeridos) {
            if (campo && !campo.value) {
                alert('Por favor complete todos los campos obligatorios');
                campo.focus();
                return false;
            }
        }
        return true;
    }
});

  document.querySelectorAll('.formulario-confirmacion').forEach(formulario => {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();
      Swal.fire({
        title: '¿Deseas enviar esta solicitud?',
        text: "No podrás modificarla después",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          formulario.submit();
        }
      });
    });
  });
