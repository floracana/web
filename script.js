document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contactButton = document.getElementById('contact-button');

    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const topOffset = targetSection.getBoundingClientRect().top + window.scrollY - 135;
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
        }
      });
    });

    if (contactButton) {
      contactButton.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const topOffset = targetSection.getBoundingClientRect().top + window.scrollY - 135;
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
        }
      });
    }
});

document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const options = dropdown.querySelectorAll('.dropdown-options li');
  const hiddenInput = dropdown.querySelector('input[type="hidden"]');

  toggle.classList.add('placeholder');
  toggle.textContent = 'Select language..';
  hiddenInput.value = '';

  toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.getAttribute('data-value');
      const label = option.textContent;

      toggle.textContent = label;
      toggle.classList.remove('placeholder');
      hiddenInput.value = value;
      dropdown.classList.remove('open');
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});
