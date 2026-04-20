(() => {
    const status = document.getElementById("vimeo-status");
    const videoContainer = document.getElementById("vimeo-video");
    const meta = document.getElementById("vimeo-meta");

    if (!status || !videoContainer || !meta) {
        return;
    }

    const escapeHtml = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;"
    })[char]);

    const renderFallback = (video) => {
        status.textContent = "No se pudo cargar el reproductor, pero el servicio web fue consultado.";
        meta.innerHTML = `
            <a href="${escapeHtml(video.source_url)}" class="btn btn-outline-light btn-sm" target="_blank" rel="noreferrer">
                Abrir video en Vimeo
            </a>
        `;
    };

    const renderVideo = (video) => {
        if (!video.html) {
            renderFallback(video);
            return;
        }

        status.textContent = video.demo
            ? "Mostrando respaldo local del servicio."
            : "Video cargado desde Vimeo.";
        videoContainer.classList.remove("d-none");
        videoContainer.innerHTML = video.html;
        meta.innerHTML = `
            <p class="mb-1"><strong>${escapeHtml(video.title)}</strong></p>
            <p class="text-light-emphasis mb-0">
                Proveedor: ${escapeHtml(video.provider_name)} |
                Autor: ${escapeHtml(video.author_name)}
            </p>
        `;
    };

    fetch("/servicios/video-destacado")
        .then(response => {
            if (!response.ok) {
                throw new Error("Respuesta no exitosa");
            }

            return response.json();
        })
        .then(data => {
            renderVideo(data.video || {});
        })
        .catch(() => {
            status.textContent = "No se pudo consultar el servicio web.";
        });
})();
