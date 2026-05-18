//
// utils.js --- Utility functions for the application
//
async function loadJSONFile(filePath) {
    try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`Error loading JSON (${filePath}):`, err);
        return null;
    }
}

function translateUI(lang, langTexts) {
    const texts = langTexts[lang];
    if (!texts) return console.warn(`Language not found: ${lang}`);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.innerHTML = texts[el.dataset.i18n] ?? el.innerHTML;
    });
}


