function isValidatableField(target) {
    return (target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement);
}
export function markInvalidFields(form) {
    const fields = form.querySelectorAll("input, textarea, select");
    fields.forEach((field) => {
        if (!field.willValidate)
            return;
        field.dataset.invalid = field.validity.valid ? "false" : "true";
    });
}
export function handleInvalidSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity())
        return false;
    event.preventDefault();
    form.classList.add("form--validate");
    markInvalidFields(form);
    const firstInvalid = form.querySelector("input[data-invalid='true'], textarea[data-invalid='true'], select[data-invalid='true']");
    firstInvalid === null || firstInvalid === void 0 ? void 0 : firstInvalid.focus();
    return true;
}
export function handleFieldValidationOnInput(event) {
    if (!isValidatableField(event.target))
        return;
    if (!event.target.willValidate)
        return;
    event.target.dataset.invalid = event.target.validity.valid ? "false" : "true";
}
