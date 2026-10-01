document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".search-button");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const query = window.prompt("What would you like to find on Boumed?");

            if (!query) {
                return;
            }

            const match = [...document.querySelectorAll("main h1, main h2, main h3, main p")]
                .find((element) => element.textContent.toLowerCase().includes(query.toLowerCase()));

            if (match) {
                match.scrollIntoView({ behavior: "smooth", block: "center" });
                match.animate(
                    [
                        { backgroundColor: "rgba(52, 156, 221, 0)" },
                        { backgroundColor: "rgba(52, 156, 221, 0.18)" },
                        { backgroundColor: "rgba(52, 156, 221, 0)" }
                    ],
                    { duration: 1200, easing: "ease-out" }
                );
            } else {
                window.alert(`No results found for “${query}”.`);
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.forEach((navLink) => navLink.classList.remove("active"));
            link.classList.add("active");
        });
    });

    if (sections.length > 0 && "IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const matchingLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);

                    if (matchingLink) {
                        navLinks.forEach((link) => link.classList.remove("active"));
                        matchingLink.classList.add("active");
                    }
                });
            },
            { rootMargin: "-35% 0px -55%" }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

});