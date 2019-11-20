// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

// Set up ajaxified forms
document.querySelectorAll('form[data-update-target-selector]')
    .forEach(form => {
    const document = form.ownerDocument;
    
    // Set up submitter property on submit button click
    // This lets us include the button value in form data.
    // And lets us disable the button while submitting.
    form.addEventListener('click', evt => {
        form.submitter = evt.target.closest('[type=submit]')
    });

    form.addEventListener('submit', evt => {
        evt.preventDefault();
    
        const formData = new FormData(form);
        if (form.submitter) {
            formData.append(form.submitter.name, form.submitter.value);
            form.submitter.setAttribute('disabled', 'disabled');
        }
        fetch(form.action, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XmlHttpRequest'
            },
            body: formData
        })
        .then(response => {
            if (form.submitter) {
                form.submitter.removeAttribute('disabled');
        }
        if (!response.ok) throw response;
            return response.text()
        }).then(html => {
             const updateTarget = form.querySelector(form.dataset.updateTargetSelector)
                || document.querySelector(form.dataset.updateTargetSelector);
            if (updateTarget) {
                updateTarget.innerHTML = html
            }
            // Clear inputs
            form.reset();
        })
    })
});