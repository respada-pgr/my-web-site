//
// main.ui.js - Lógica de UI para la página principal
//
let uiCfg = {
    closedPrivacyToast: false,
    closeToastScrollY: 150
};

function showPrivacyToast() {
    const toast = document.getElementById('privacy-toast');
    if (toast && window.scrollY <= uiCfg.closeToastScrollY) {
        toast.classList.remove('hidden');
        window.addEventListener('scroll', autoCloseToastOnScroll);
    }
}

function closePrivacyToast() {
    const toast = document.getElementById('privacy-toast');
    if (toast) {
        toast.classList.add('hidden');
        // Dejamos de escuchar el scroll para ahorrar recursos
        window.removeEventListener('scroll', autoCloseToastOnScroll);
        uiCfg.closedPrivacyToast = true;
    }
}

function autoCloseToastOnScroll() {
    // Si el usuario baja más de 150px, cerramos el aviso automáticamente
    if (window.scrollY > uiCfg.closeToastScrollY) {
        closePrivacyToast();
    }
}

function renderProjects(currentLang, projectsData) {
    const container = document.getElementById('project-container');
    const template = document.getElementById('card-template');
    container.innerHTML = "";

    projectsData.forEach(p => {
        const clone = template.content.cloneNode(true);
        const langData = p[currentLang];

        clone.querySelector('.card-title').textContent = langData.titulo;
        clone.querySelector('.card-desc').textContent = langData.desc;
        clone.querySelector('.project-link').href = p.link;

        const tagsDiv = clone.querySelector('.tags');
        p.tags.forEach(tag => {
            const s = document.createElement('span');
            s.className = 'tag';
            s.textContent = tag;
            tagsDiv.appendChild(s);
        });

        container.appendChild(clone);
    });
}

function renderPage(config) {
    //Configurar el enlace de Email
    const mailLink = document.getElementById('mail-link');
    if (mailLink && config.email) {
        mailLink.href = `mailto:${config.email}`;
        // Opcional: que el texto del botón sea el correo
        // mailLink.textContent = email;
    }

    //Configurar switcher idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === config.currentLang);
    });

    //Traducir textos estáticos
    translateUI(config.currentLang, config.uiTexts);

    // Renderizar proyectos
    renderProjects(config.currentLang, config.projectsData);

    //Actualizar el indicador de versión en el footer
    const prefix = config.currentLang === 'es' ? 'Versión' : 'Version';
    const versionDisplay = document.getElementById('app-version-display');
    if (versionDisplay) versionDisplay.textContent = `${prefix} ${config.version}`;

    if (!uiCfg.closedPrivacyToast) {
        showPrivacyToast();
    }
}
