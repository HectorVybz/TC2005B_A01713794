(() => {
    const panel = document.getElementById("personajes-ajax");
    const form = document.getElementById("personajes-search-form");
    const input = document.getElementById("personajes-search");
    const status = document.getElementById("personajes-search-status");
    const list = document.getElementById("personajes-list");

    if (!panel || !form || !input || !status || !list) {
        return;
    }

    const csrfToken = panel.dataset.csrfToken;
    const canEdit = panel.dataset.canEdit === "true";

    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;"
    })[char]);

    const renderStatus = (message, isError = false) => {
        status.textContent = message;
        status.className = isError ? "text-warning mt-2" : "text-light-emphasis mt-2";
    };

    const renderPersonajes = (personajes) => {
        if (personajes.length === 0) {
            list.innerHTML = '<div class="col-12"><div class="alert alert-info">No se encontraron personajes.</div></div>';
            return;
        }

        list.innerHTML = personajes.map((personaje) => {
            const editLink = canEdit
                ? `<a href="/personajes/editar/${personaje.id}" class="btn btn-warning btn-sm">Editar</a>`
                : "";

            return `
                <div class="col-md-4 mb-4">
                    <div class="card bg-secondary text-light h-100">
                        <img src="${escapeHtml(personaje.imgUrl)}" class="card-img-top" alt="${escapeHtml(personaje.nombre)}">
                        <div class="card-body">
                            <h5 class="card-title">${escapeHtml(personaje.nombre)}</h5>
                            <p class="card-text">${escapeHtml(personaje.descripcion)}</p>
                            <a href="/personajes/${personaje.id}" class="btn btn-primary btn-sm">Ver detalle</a>
                            ${editLink}
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        renderStatus("Buscando personajes...");

        try {
            const response = await fetch("/personajes/buscar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "csrf-token": csrfToken
                },
                body: JSON.stringify({ termino: input.value })
            });

            if (!response.ok) {
                throw new Error("Respuesta no exitosa");
            }

            const data = await response.json();
            renderPersonajes(data.personajes || []);
            renderStatus(`Resultados encontrados: ${(data.personajes || []).length}`);
        } catch (error) {
            renderStatus("No se pudo completar la busqueda asincrona.", true);
        }
    });
})();
