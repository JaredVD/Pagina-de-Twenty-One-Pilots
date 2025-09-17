document.addEventListener("DOMContentLoaded", function() {
    crearGaleria();
    iniciarModal();
    navegacionFija();
    resaltarEnlace();
    scrollNav();
});

function crearGaleria(){
    const cantidad = 6
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i <= cantidad; i++){
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
            <source srcset="img/imagenesGaleria/galeria${i}.avif" type="image/avif"/>
            <source srcset="img/imagenesGaleria/galeria${i}.webp" type="image/webp"/>
            <img loading="lazy" width="1080" height="1080" src="img/imagenesGaleria/galeria${i}.jpg" alt="imagen de galeria" data-imagen-id="${i}"/>
        `;
        
        galeria.appendChild(imagen);
    }
}

function navegacionFija() {
    const barra = document.querySelector('.navegador_fondo');
    const texto = document.querySelector('.historia__texto');

    document.addEventListener('scroll', function() {
        if(texto.getBoundingClientRect().bottom < 0){
            barra.classList.add('navegacion_fondo--fijo');
        } else {
            barra.classList.remove('navegacion_fondo--fijo');
        }
});
}

function iniciarModal() {
    // Seleccionar los elementos del Modal que ya existen en el HTML
    const modal = document.querySelector('.modal');
    const modalImagen = document.querySelector('#jpg');
    const modalImagen2 = document.querySelector('#avif');
    const modalImagen3 = document.querySelector('#webp')
    const botonCerrar = document.querySelector('.modal__cerrar');
    const galeria = document.querySelector('.galeria-imagenes');
    const body = document.querySelector('body');

    // Event Delegation para escuchar clics en la galería
    galeria.addEventListener('click', function(e) {
        // Nos aseguramos que el clic fue en una imagen
        if (e.target.tagName === 'IMG') {
            const id = e.target.dataset.imagenId;
            mostrarImagen(id);
        }
    });
    
     // Función para mostrar la imagen
    function mostrarImagen(id) {
        const barra = document.querySelector('.navegador_fondo');
        // Cambiamos la fuente de la imagen del modal
        modalImagen.width="1080"
        modalImagen.height="1080"
        modalImagen.src = `img/galeria${id}.jpg`;
        modalImagen2.srcset = `img/galeria${id}.avif`;
        modalImagen3.srcset = `img/galeria${id}.webp`;
        // Añadimos la clase para hacer visible el modal (¡y disparar la transición!)
        modal.classList.add('modal--visible');
        body.classList.add('no-scroll'); 
        barra.classList.remove('navegacion_fondo--fijo');
        
    }

    // Función para cerrar el modal
    function cerrarModal() {
        // Quitamos la clase para ocultar el modal (¡disparando la transición de cierre!)
        
        modal.classList.remove('modal--visible');
        body.classList.remove('no-scroll');
        barra.classList.add('navegacion_fondo--fijo');
        
    }

    // Eventos para cerrar el modal solo pulsando el boton de x
    botonCerrar.addEventListener('click', cerrarModal);
}

function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const section = document.querySelectorAll('section');
        const navlinks = document.querySelectorAll('.navegador a');

        let actual ='';
        section.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if(window.scrollY >= sectionTop - sectionHeight / 3){
                actual = section.id 
            }
        });
        navlinks.forEach((link) => {
            link.classList.remove('activo');
            if(link.getAttribute('href') == `#${actual}`){
                link.classList.add('activo');
            }
        })
    }
    )
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegador a');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: "smooth"});

        })
    })
}