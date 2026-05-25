// ---------- МНОГОСТРАНИЧНОСТЬ ----------
const pages = ['home', 'services', 'doctors', 'appointment', 'contacts'];
const navItems = document.querySelectorAll('.nav-links li');
const footerLinks = document.querySelectorAll('.footer-link');

function showPage(pageId) {
    pages.forEach(pid => {
        const el = document.getElementById(pid);
        if (el) el.classList.remove('active-page');
    });
    const active = document.getElementById(pageId);
    if (active) active.classList.add('active-page');
    navItems.forEach(item => {
        const val = item.getAttribute('data-page');
        if (val === pageId) item.classList.add('active-page');
        else item.classList.remove('active-page');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        if (page) showPage(page);
    });
});
footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const page = link.getAttribute('data-page');
        if (page) showPage(page);
    });
});

document.getElementById('toAppointmentBtn')?.addEventListener('click', () => showPage('appointment'));
document.getElementById('toServicesBtn')?.addEventListener('click', () => showPage('services'));

// ---------- УСЛУГИ С КАРТИНКАМИ ----------
const servicesData = [
    { name: "Консультация и осмотр", desc: "Первичный приём с составлением плана лечения, рентген-диагностика включена.", price: "Бесплатно", img: "img/Услуги/Осмотр.jpg" },
    { name: "Лечение кариеса", desc: "Использование фотополимеров, восстановление формы зуба за одно посещение.", price: "от 3 500 ₽", img: "img/Услуги/Лечение_Кариеса.jpg" },
    { name: "Профессиональная чистка", desc: "Ультразвук + AirFlow, снятие налёта и зубного камня.", price: "2 500 ₽", img: "img/Услуги/ПрофЧистка.webp" },
    { name: "Отбеливание ZOOM", desc: "Безопасное отбеливание на 4-6 тонов за сеанс.", price: "12 000 ₽", img: "img/Услуги/Отбеливание ZOOM.png" },
    { name: "Керамические виниры", desc: "Эстетическое восстановление передних зубов.", price: "от 18 000 ₽", img: "img/Услуги/Керамические виниры.jpg" },
    { name: "Имплантация под ключ", desc: "Установка имплантата + коронка, гарантия 5 лет.", price: "от 35 000 ₽", img: "img/Услуги/Имплантация под ключ.webp" }
];
const servicesGrid = document.getElementById('servicesGrid');
if (servicesGrid) {
    servicesGrid.innerHTML = '';
    servicesData.forEach(s => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
                <img class="service-img" src="${s.img}" alt="${s.name}" loading="lazy" onerror="this.src='https://placehold.co/600x400/e2edf2/2c7da0?text=Нет+изображения'">
                <h3>${s.name}</h3>
                <p>${s.desc}</p>
                <div class="price">${s.price}</div>
                <button class="btn-primary service-order" data-service-name="${s.name}">Записаться</button>
            `;
        servicesGrid.appendChild(card);
    });
    document.querySelectorAll('.service-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceName = btn.getAttribute('data-service-name');
            showPage('appointment');
            const select = document.getElementById('serviceSelect');
            if (select) {
                for (let i = 0; i < select.options.length; i++) {
                    if (select.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });
}

// ---------- ВРАЧИ С ФОТОГРАФИЯМИ ----------
// Добавьте свои изображения в папку img/ и укажите правильные пути в свойстве photo.
// Если картинка не загрузится, покажется заглушка.
const doctors = [
    { name: "Петрова Анна Викторовна", spec: "Терапевт-стоматолог", exp: "Стаж 12 лет", img: "img/Врачи/doctor_anna.jpg" },
    { name: "Иванов Дмитрий Сергеевич", spec: "Ортопед, имплантолог", exp: "Стаж 9 лет", img: "img/Врачи/doctor_dmitry.jpg" },
    { name: "Смирнова Елена Павловна", spec: "Детский стоматолог", exp: "Стаж 8 лет", img: "img/Врачи/doctor_elena.jpg" },
    { name: "Кузнецов Алексей Андреевич", spec: "Хирург-стоматолог", exp: "Стаж 15 лет", img: "img/Врачи/doctor_alexey.jpg" }
];
const doctorsContainer = document.getElementById('doctorsList');
if (doctorsContainer) {
    doctorsContainer.innerHTML = '';
    doctors.forEach(d => {
        const card = document.createElement('div');
        card.className = 'doctor-card';
        card.innerHTML = `
                <img class="doctor-img" src="${d.photo}" alt="${d.name}" loading="lazy" onerror="this.src='https://placehold.co/140x140/e2edf2/2c7da0?text=Фото'">
                <h3>${d.name}</h3>
                <p>${d.spec}</p>
                <small>${d.exp}</small>
            `;
        doctorsContainer.appendChild(card);
    });
}

// ---------- ВАЛИДАЦИЯ ФОРМЫ ЗАПИСИ ----------
const appForm = document.getElementById('appointmentForm');
const fullnameInp = document.getElementById('fullname');
const phoneInp = document.getElementById('phone');
const emailInp = document.getElementById('email');
const dateInp = document.getElementById('date');
const privacyChk = document.getElementById('privacyCheck');

function validateFullname() {
    const val = fullnameInp.value.trim();
    if (!val) return "Укажите ваши фамилию и имя.";
    if (val.length < 3) return "Введите полное имя (минимум 3 символа).";
    return "";
}
function validatePhone() {
    let val = phoneInp.value.trim();
    if (!val) return "Номер телефона обязателен.";
    const digits = val.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d{10,11}$/.test(digits)) return "Введите 10 или 11 цифр (например, 9123456789).";
    return "";
}
function validateEmail() {
    const val = emailInp.value.trim();
    if (val === "") return "";
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!re.test(val)) return "Введите корректный email (например, name@domain.ru).";
    return "";
}
function validateDate() {
    const selected = dateInp.value;
    if (!selected) return "Выберите дату визита.";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(selected);
    if (selectedDate < today) return "Дата не может быть в прошлом.";
    return "";
}
function validatePrivacy() {
    return privacyChk.checked ? "" : "Необходимо дать согласие на обработку данных.";
}

function clearAppErrors() {
    document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
    document.getElementById('fullnameError').innerText = '';
    document.getElementById('phoneError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('dateError').innerText = '';
    document.getElementById('privacyError').innerText = '';
}

if (appForm) {
    appForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearAppErrors();

        let isValid = true;
        const nameErr = validateFullname();
        if (nameErr) { document.getElementById('fullnameError').innerText = nameErr; fullnameInp.classList.add('error-border'); isValid = false; }
        const phoneErr = validatePhone();
        if (phoneErr) { document.getElementById('phoneError').innerText = phoneErr; phoneInp.classList.add('error-border'); isValid = false; }
        const emailErr = validateEmail();
        if (emailErr) { document.getElementById('emailError').innerText = emailErr; emailInp.classList.add('error-border'); isValid = false; }
        const dateErr = validateDate();
        if (dateErr) { document.getElementById('dateError').innerText = dateErr; dateInp.classList.add('error-border'); isValid = false; }
        const privacyErr = validatePrivacy();
        if (privacyErr) { document.getElementById('privacyError').innerText = privacyErr; isValid = false; }

        if (!isValid) return;

        const successDiv = document.getElementById('appointmentSuccess');
        successDiv.innerHTML = '<div class="success-message">Заявка успешно отправлена. Наш администратор свяжется с вами в ближайшее время для подтверждения записи.</div>';
        appForm.reset();
        dateInp.value = new Date().toISOString().slice(0, 10);
        setTimeout(() => successDiv.innerHTML = '', 6000);
    });
    fullnameInp.addEventListener('blur', () => { const err = validateFullname(); document.getElementById('fullnameError').innerText = err; if (err) fullnameInp.classList.add('error-border'); else fullnameInp.classList.remove('error-border'); });
    phoneInp.addEventListener('blur', () => { const err = validatePhone(); document.getElementById('phoneError').innerText = err; if (err) phoneInp.classList.add('error-border'); else phoneInp.classList.remove('error-border'); });
    emailInp.addEventListener('blur', () => { const err = validateEmail(); document.getElementById('emailError').innerText = err; if (err) emailInp.classList.add('error-border'); else emailInp.classList.remove('error-border'); });
    dateInp.addEventListener('blur', () => { const err = validateDate(); document.getElementById('dateError').innerText = err; if (err) dateInp.classList.add('error-border'); else dateInp.classList.remove('error-border'); });
    privacyChk.addEventListener('change', () => { if (privacyChk.checked) document.getElementById('privacyError').innerText = ''; });
}

// ---------- ФОРМА КОНТАКТОВ ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let ok = true;
        const cName = document.getElementById('contactName');
        const cEmail = document.getElementById('contactEmail');
        const cMsg = document.getElementById('contactMessage');
        const nameErrSpan = document.getElementById('contactNameError');
        const emailErrSpan = document.getElementById('contactEmailError');
        const msgErrSpan = document.getElementById('contactMessageError');

        nameErrSpan.innerText = ''; emailErrSpan.innerText = ''; msgErrSpan.innerText = '';
        cName.classList.remove('error-border'); cEmail.classList.remove('error-border'); cMsg.classList.remove('error-border');

        if (!cName.value.trim()) { nameErrSpan.innerText = 'Введите ваше имя'; cName.classList.add('error-border'); ok = false; }
        const emailVal = cEmail.value.trim();
        if (!emailVal || !/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(emailVal)) { emailErrSpan.innerText = 'Укажите корректный email'; cEmail.classList.add('error-border'); ok = false; }
        if (!cMsg.value.trim()) { msgErrSpan.innerText = 'Напишите текст сообщения'; cMsg.classList.add('error-border'); ok = false; }

        if (ok) {
            document.getElementById('contactSuccessMsg').innerHTML = '<div class="success-message">Ваше сообщение отправлено. Мы ответим вам в рабочие часы.</div>';
            contactForm.reset();
            setTimeout(() => document.getElementById('contactSuccessMsg').innerHTML = '', 5000);
        }
    });
}
