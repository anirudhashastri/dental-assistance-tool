// script.js
document.addEventListener("DOMContentLoaded", function() {
    const scrollLinks = document.querySelectorAll('.scroll-link');

    for (let i = 0; i < scrollLinks.length; i++) {
        scrollLinks[i].addEventListener('click', function(event) {
            event.preventDefault();
            const target = this.getAttribute('href');
            const location = document.querySelector(target).offsetTop;

            window.scrollTo({
                left: 0,
                top: location - 100,
                behavior: 'smooth'
            });
        });
    }
});
