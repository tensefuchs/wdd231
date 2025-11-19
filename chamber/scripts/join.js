// Put current date-time into the hidden timestamp when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const ts = document.getElementById('timestamp');
  if (ts) {
    const now = new Date();
    // ISO string without seconds for readability
    const stamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ` +
                  `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    ts.value = stamp;
  }

  // Modal logic
  const openButtons = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('[data-close]');
  const modals = document.querySelectorAll('.modal');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(id);
      if (!modal) return;
      openModal(modal, btn);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (!modal) return;
      closeModal(modal);
    });
  });

  modals.forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) closeModal(m); // click backdrop to close
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = document.querySelector('.modal:not([hidden])');
      if (open) closeModal(open);
    }
  });
});

let lastTrigger = null;

function openModal(modal, trigger){
  lastTrigger = trigger || null;
  modal.hidden = false;

  // Basic focus trap: move focus to first focusable item in the modal
  const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusables.length) focusables[0].focus();
}

function closeModal(modal){
  modal.hidden = true;
  if (lastTrigger) {
    lastTrigger.focus();
    lastTrigger = null;
  }
}
