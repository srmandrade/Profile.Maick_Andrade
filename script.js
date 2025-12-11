// script.js

document.addEventListener("DOMContentLoaded", () => {
    const btnPdf = document.getElementById("btn-pdf");

    if (btnPdf) {
        btnPdf.addEventListener("click", handleDownloadPdf);
    }
});

/**
 * Gera o PDF do conteúdo principal do currículo
 * usando jsPDF (renderização HTML).
 */
async function handleDownloadPdf() {
    const cvRoot = document.getElementById("cv-root");

    if (!cvRoot) {
        alert("Não foi possível localizar o conteúdo do currículo para gerar o PDF.");
        return;
    }

    try {
        // Ativa o "modo PDF" (remove sombras, overflow etc.)
        document.body.classList.add("pdf-mode");

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4"
        });

        await doc.html(cvRoot, {
            callback: function (docInstance) {
                docInstance.save("Curriculo_Maick_Andrade.pdf");
                document.body.classList.remove("pdf-mode");
            },
            margin: [24, 24, 24, 24],
            autoPaging: "text",
            html2canvas: {
                scale: 0.75,
                useCORS: true
            }
        });
    } catch (err) {
        console.error(err);
        document.body.classList.remove("pdf-mode");
        alert(
            "Ocorreu um erro ao gerar o PDF. Verifique se está conectado à internet (para carregar a biblioteca jsPDF) e tente novamente."
        );
    }
}
