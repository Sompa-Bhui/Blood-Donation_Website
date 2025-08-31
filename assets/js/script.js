// assets/js/script.js

document.addEventListener('DOMContentLoaded', function() {
  // set year in footer
  const y = new Date().getFullYear();
  ['year','year-2','year-3','year-4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('cname').value.trim();
      const email = document.getElementById('cemail').value.trim();
      const message = document.getElementById('message').value.trim();
      // store locally (demo)
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      contacts.push({ name, email, message, date: new Date().toISOString() });
      localStorage.setItem('contacts', JSON.stringify(contacts));
      alert('Thank you! Your message is saved locally (demo).');
      contactForm.reset();
    });
  }

  // Donation form
  const donationForm = document.getElementById('donationForm');
  const pledgeList = document.getElementById('pledgeList');
  if (donationForm) {
    donationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const blood = document.getElementById('blood').value;
      const city = document.getElementById('city').value.trim();
      if (!name || !email || !blood || !city) {
        alert('Please fill all fields');
        return;
      }
      const pledges = JSON.parse(localStorage.getItem('pledges') || '[]');
      pledges.push({ name, email, blood, city, date: new Date().toLocaleString() });
      localStorage.setItem('pledges', JSON.stringify(pledges));
      renderPledges();
      donationForm.reset();
      alert('Pledge saved locally. Thank you for your willingness to donate!');
    });

    // render on load
    function renderPledges() {
      const pledges = JSON.parse(localStorage.getItem('pledges') || '[]');
      if (!pledgeList) return;
      pledgeList.innerHTML = '';
      if (pledges.length === 0) {
        pledgeList.innerHTML = '<li>No pledges yet</li>';
        return;
      }
      pledges.slice().reverse().forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.name} — ${p.blood} — ${p.city} (${p.date})`;
        pledgeList.appendChild(li);
      });
    }
    renderPledges();
  }
});
