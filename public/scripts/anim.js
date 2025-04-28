console.log("anim.js loaded ✅");

const targets = document.querySelectorAll('.hidden'); // select ALL elements with this class

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // optional: stop observing once animated
        }
    });
}, { threshold: 0.1 }); // Adjust threshold as needed

targets.forEach(target => {
    observer.observe(target);
});
