document.addEventListener("DOMContentLoaded", function() {
    const animatedElements = document.querySelectorAll(".animated-text");

    animatedElements.forEach(function(element) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});
