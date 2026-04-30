document.addEventListener('DOMContentLoaded', function () {
    // Locate the registration form element using the DOM API
    const form = document.getElementById('registrationForm');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});


function handleFormSubmit(event) {
    // Stop the browser from reloading / navigating away
    event.preventDefault();

    // Reference to the form element that triggered the event
    const form = event.target;

    // Object that will hold every collected field value
    const formData = {};

    formData.firstName = form.firstName.value.trim();
    formData.lastName  = form.lastName.value.trim();
    formData.email     = form.email.value.trim();
    formData.age       = form.age.value;
    formData.phone     = form.phone.value.trim();
    formData.course    = form.course.value;
    formData.message   = form.message.value.trim();

    const statusRadios = form.querySelectorAll('input[name="studentStatus"]');
    formData.studentStatus = 'Not specified'; // default fallback

    for (let i = 0; i < statusRadios.length; i++) {
        if (statusRadios[i].checked) {
            formData.studentStatus = statusRadios[i].value;
            break; // stop looping once the checked radio is found
        }
    }

    const interestBoxes    = form.querySelectorAll('input[name="interests"]');
    const selectedInterests = [];

    for (let i = 0; i < interestBoxes.length; i++) {
        if (interestBoxes[i].checked) {
            selectedInterests.push(interestBoxes[i].value);
        }
    }

    if (selectedInterests.length === 0) {
        formData.interests = 'None selected';
    } else {
        formData.interests = selectedInterests.join(', ');
    }

    generateResultsPage(formData);
}


function generateResultsPage(data) {
    const newTab = window.open('', '_blank');

    if (!newTab) {
        alert('Pop-ups appear to be blocked. Please allow pop-ups and try again.');
        return;
    }

    newTab.document.documentElement.setAttribute('lang', 'en');

    const charset = newTab.document.createElement('meta');
    charset.setAttribute('charset', 'UTF-8');
    newTab.document.head.appendChild(charset);

    const viewport = newTab.document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    newTab.document.head.appendChild(viewport);

    const titleEl = newTab.document.createElement('title');
    titleEl.textContent = 'Registration Summary - Academia Classica';
    newTab.document.head.appendChild(titleEl);

    const link = newTab.document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'css/style.css';
    newTab.document.head.appendChild(link);

    const pageStyle = newTab.document.createElement('style');
    pageStyle.textContent =
        'body { padding: 2rem; background-color: #FAF8F3; }' +
        '.summary-wrapper { max-width: 860px; margin: 0 auto; background: #fff;' +
        '  padding: 2.5rem; border: 1px solid #D4CEC4; border-radius: 8px; }' +
        '.success-banner { background: linear-gradient(135deg,#2C1810,#5C4033);' +
        '  color: #FAF8F3; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;' +
        '  text-align: center; }' +
        '.success-banner h1 { margin-bottom: .5rem; }' +
        'h2 { color: #2C1810; margin: 1.5rem 0 .5rem; }' +
        '.back-home-btn { display: block; width: fit-content; margin: 2rem auto 0; }';
    newTab.document.head.appendChild(pageStyle);

    const wrapper = newTab.document.createElement('div');
    wrapper.className = 'summary-wrapper';
    newTab.document.body.appendChild(wrapper);

    // Success banner
    const banner = newTab.document.createElement('div');
    banner.className = 'success-banner';
    const bannerHeading = newTab.document.createElement('h1');
    bannerHeading.textContent = 'Registration Successful!';
    banner.appendChild(bannerHeading);
    const bannerSub = newTab.document.createElement('p');
    bannerSub.textContent = 'Welcome to Academia Classica. Your scholarly journey begins now.';
    banner.appendChild(bannerSub);
    wrapper.appendChild(banner);

    const heading = newTab.document.createElement('h2');
    heading.textContent = 'Your Registration Details';
    wrapper.appendChild(heading);

    const subtext = newTab.document.createElement('p');
    subtext.textContent = 'Please keep a record of the information below for your reference.';
    wrapper.appendChild(subtext);

    const table = newTab.document.createElement('table');

    const thead = newTab.document.createElement('thead');
    const headerRow = newTab.document.createElement('tr');
    const th1 = newTab.document.createElement('th');
    th1.textContent = 'Field';
    const th2 = newTab.document.createElement('th');
    th2.textContent = 'Information Provided';
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = newTab.document.createElement('tbody');

    const rows = [
        ['Full Name',          data.firstName + ' ' + data.lastName],
        ['Email Address',      data.email],
        ['Age',                data.age],
        ['Phone Number',       data.phone],
        ['Primary Course',     formatCourseName(data.course)],
        ['Student Status',     formatStudentStatus(data.studentStatus)],
        ['Areas of Interest',  data.interests],
        ['Personal Statement', data.message],
    ];

    // Loop through each row entry and build the corresponding table row
    for (let i = 0; i < rows.length; i++) {
        const tr = newTab.document.createElement('tr');

        const tdLabel = newTab.document.createElement('td');
        tdLabel.textContent = rows[i][0];

        const tdValue = newTab.document.createElement('td');
        tdValue.textContent = rows[i][1];

        tr.appendChild(tdLabel);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    wrapper.appendChild(table);

    const backLink = newTab.document.createElement('a');
    backLink.href       = 'index.html';
    backLink.className  = 'btn back-home-btn';
    backLink.textContent = 'Return to Homepage';
    wrapper.appendChild(backLink);
}


function formatCourseName(code) {
    if (code === 'literature') {
        return 'Classical Literature';
    } else if (code === 'philosophy') {
        return 'Philosophy';
    } else if (code === 'history') {
        return 'History';
    } else if (code === 'rhetoric') {
        return 'Rhetoric & Public Speaking';
    } else if (code === 'languages') {
        return 'Ancient Languages';
    } else {
        return code;
    }
}


function formatStudentStatus(code) {
    if (code === 'fullTime') {
        return 'Full-time Student';
    } else if (code === 'partTime') {
        return 'Part-time Student';
    } else if (code === 'professional') {
        return 'Working Professional';
    } else if (code === 'other') {
        return 'Other';
    } else {
        return code;
    }
}