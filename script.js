document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-async-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector("[data-form-status]");
    const originalLabel = button.innerHTML;

    button.disabled = true;
    button.textContent = "Sending...";
    status.className = status.className.replace(/\sform-status-(success|error)/g, "");
    status.textContent = "";

    try {
      await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors",
      });

      form.reset();
      status.classList.add("form-status-success");
      status.textContent = form.elements.formType.value === "support"
        ? "Thanks. Your support request has been sent."
        : "You're on the list. We'll let you know when Amprov is ready.";
    } catch {
      status.classList.add("form-status-error");
      status.textContent = "We couldn't send that right now. Please try again.";
    } finally {
      button.disabled = false;
      button.innerHTML = originalLabel;
    }
  });
});
