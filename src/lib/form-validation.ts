import type { FormEvent } from "react";

type ValidatableField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function isValidatableField(target: EventTarget | null): target is ValidatableField {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

export function markInvalidFields(form: HTMLFormElement) {
  const fields = form.querySelectorAll<ValidatableField>("input, textarea, select");
  fields.forEach((field) => {
    if (!field.willValidate) return;
    field.dataset.invalid = field.validity.valid ? "false" : "true";
  });
}

export function handleInvalidSubmit(event: FormEvent<HTMLFormElement>) {
  const form = event.currentTarget;
  if (form.checkValidity()) return false;

  event.preventDefault();
  form.classList.add("form--validate");
  markInvalidFields(form);

  const firstInvalid = form.querySelector<ValidatableField>(
    "input[data-invalid='true'], textarea[data-invalid='true'], select[data-invalid='true']",
  );
  firstInvalid?.focus();
  return true;
}

export function handleFieldValidationOnInput(event: FormEvent<HTMLFormElement>) {
  if (!isValidatableField(event.target)) return;
  if (!event.target.willValidate) return;
  event.target.dataset.invalid = event.target.validity.valid ? "false" : "true";
}
