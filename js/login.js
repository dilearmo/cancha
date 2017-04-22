/* global $ */
/* global toastr */
/* global localStorage */

$(document).ready(function() {
    if (typeof(Storage) !== "undefined") {
        var nombreUsuario = localStorage.getItem('NombreUsuario');
        if(nombreUsuario != undefined && nombreUsuario != "") {
            window.location.href = 'index.html';
        }
    } else {
        toastr.info("Lo sentimos,<br>su teléfono no es<br>compatible con esta<br>aplicación");
    }
});

function existeNombreUsuario() {
    var contrasena = $("#contrasena").val().trim();
    var nombreUsuario = $("#nombreUsuario").val().trim();
    if(nombreUsuario.length > 0 && contrasena.length > 0) { 
        $.ajax({
            url: "https://cancha-la-primavera-dilearmo.c9users.io/index.php/WSUsuario/existeNombreUsuario?nombreUsuario=" + nombreUsuario,
            timeout: 10000,
            dataType: 'jsonp',
            success: function(response) {
                if(response == true) {
                    validarCredenciales(nombreUsuario, contrasena);
                } else {
                    toastr.error("El nombre de usuario<br><b>" + nombreUsuario + "</b><br>no existe");
                }
            },
            error: function() {
                toastr.error("Error de conexión");
            }
        });
    } else {
        toastr.warning("Indique su nombre de usuario<br>y contraseña");
    }
}

function validarCredenciales(nombreUsuario, contrasena) {
    $.ajax({
        url: "https://cancha-la-primavera-dilearmo.c9users.io/index.php/WSUsuario/validarCredenciales?nombreUsuario="+nombreUsuario+"&contrasena="+contrasena,
        dataType: "jsonp",
        timeout: 10000,
        success: function(response) {
            if(response == false) {
                toastr.error("Nombre de usuario o <br>contraseña incorrectos");
            } else {
                guardarUsuarioEnSesion(response);
            }
        },
        error: function() {
            alert('Error');
            toastr.error("Error de conexión");
        }
    });
}

function guardarUsuarioEnSesion(usuario) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("IdUsuario", usuario.IdUsuario);
        localStorage.setItem("Nombre", usuario.Nombre);
        localStorage.setItem("Apellidos", usuario.Apellidos);
        localStorage.setItem("Telefono", usuario.Telefono);
        localStorage.setItem("NombreUsuario", usuario.NombreUsuario);
        localStorage.setItem("Correo", usuario.Correo);
        localStorage.setItem("Es_confiable", usuario.Es_confiable);
        localStorage.setItem("Es_administrador", usuario.Es_administrador);
        
        window.location.href = 'index.html';
    } else {
        toastr.info("Lo sentimos,<br>su teléfono no es<br>compatible con esta<br>aplicación");
    }
}

