// ============================================================
// GAMELAB - JAVASCRIPT
// ============================================================

const introModal = document.getElementById("introModal");
const playButton = document.getElementById("playButton");
const closeModal = document.getElementById("closeModal");
const modalOk = document.getElementById("modalOk");
const loginButton = document.getElementById("loginButton");
const searchButton = document.getElementById("searchButton");

// -------------------------
// Modal de introducción
// -------------------------

function openModal() {
    introModal.classList.add("show");
}

function hideModal() {
    introModal.classList.remove("show");
}

playButton.addEventListener("click", openModal);
closeModal.addEventListener("click", hideModal);
modalOk.addEventListener("click", hideModal);

introModal.addEventListener("click", (event) => {
    if (event.target === introModal) {
        hideModal();
    }
});


// -------------------------
// LOGIN
// -------------------------
// POR AHORA solo mostramos un mensaje.
// Tu compañero puede reemplazar esto por:
// window.location.href = "login.html";
// o por la conexión con su backend.

loginButton.addEventListener("click", () => {
    alert("Aquí se conectará el sistema de LOGIN.");
});


// -------------------------
// BUSCADOR
// -------------------------

searchButton.addEventListener("click", () => {
    const search = prompt("¿Qué proyecto quieres buscar?");

    if (!search) return;

    const cards = document.querySelectorAll(".project-card");
    let found = false;

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        if (text.includes(search.toLowerCase())) {
            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            card.animate(
                [
                    { transform: "scale(1)" },
                    { transform: "scale(1.03)" },
                    { transform: "scale(1)" }
                ],
                { duration: 500 }
            );

            found = true;
        }
    });

    if (!found) {
        alert("No encontramos ese proyecto.");
    }
});


// -------------------------
// Animación al aparecer
// -------------------------

const cards = document.querySelectorAll(
    ".project-card, .news-mini, .stats-panel, .about-panel"
);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08 }
);

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(15px)";
    card.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(card);
});
