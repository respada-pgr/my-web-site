//
// main.js - Script principal para la gestión de la página principal
// Aquí se cargan las configuraciones, se inicializa la página y se configuran los eventos
//

// Variable global para almacenar la configuración de la página
let cfg = {
    defaultLang: "en", 
    browserLang: "",
    currentLang: "en",    
    version: "",
    email: "",
    uiTexts: {},
    projectsData: []
};

// Función para cambiar el idioma y volver a renderizar la página
function setLanguage(lang) {
    cfg.currentLang = lang;
    renderPage(cfg);
}

// Cargar la configuración desde los archivos JSON
async function loadConfigurationFile() {
    const siteCfg = await loadJSONFile("data/site.cfg.json");
    cfg.defaultLang = siteCfg.defaultLang;
    cfg.uiTexts = siteCfg.uiTexts;    

    const projectCfg = await loadJSONFile("data/project.cfg.json");
    cfg.projectsData = projectCfg.projects;
}

// Cargar la configuración específica de la página (idioma, versión, email) desde el HTML
function loadPageConfiguration() {
    const browserLang = navigator.language || navigator.userLanguage;
    const lang = browserLang.startsWith("es") ? "es" : "en";
    cfg.currentLang = cfg.uiTexts[lang] ? lang : cfg.defaultLang;

    cfg.version = document.querySelector('meta[name="version"]')?.content || cfg.version;
    cfg.email = document.querySelector('meta[name="reply-to"]')?.content || cfg.email;
}

// Configurar eventos de la página (eventos para botones, enlaces, etc.)
function configureEvents() {
}

// Función principal de inicialización
async function init() {
    console.log("%c Respada Portfolio> Loading page...", "background: #00d4ff; color: #0b0f1a; font-weight: bold; border-radius: 4px; padding: 2px 6px;");
    await loadConfigurationFile();
    loadPageConfiguration();
    console.log(`%c Respada Portfolio> Version: ${cfg.version}`, "background: #00d4ff; color: #0b0f1a; font-weight: bold; border-radius: 4px; padding: 2px 6px;");    
    renderPage(cfg);
    configureEvents();
    console.log("%c Respada Portfolio> Page loaded.", "background: #00d4ff; color: #0b0f1a; font-weight: bold; border-radius: 4px; padding: 2px 6px;");
}

// Esperamos a que el DOM esté completamente cargado antes de inicializar la página
document.addEventListener('DOMContentLoaded', init);


