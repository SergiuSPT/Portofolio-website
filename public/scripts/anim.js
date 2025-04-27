const target = document.getElementById('section-about-me');
console.log("Testing");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            target.classList.add('visible');
            observer.unobserve(target); // optional: stop observing after animation
        }
    });
}, { threshold: 0.1 }); // 10% of the element is visible

observer.observe(target);
