/**
 * HydroShine Auto Spa - Main Interactive Script
 * Handles Navigation, WhatsApp Booking Message Generation, and UI Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-links, .nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Set minimum date for booking picker to today
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // 4. WhatsApp Interactive Booking Generator
  const bookingForm = document.getElementById('quick-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cust-name').value.trim();
      const phone = document.getElementById('cust-phone').value.trim();
      const vehicle = document.getElementById('cust-vehicle').value.trim();
      const plate = document.getElementById('cust-plate').value.trim();
      const service = document.getElementById('cust-service').value;
      const date = document.getElementById('booking-date').value;
      const time = document.getElementById('booking-time').value;

      // Construct friendly, professional WhatsApp message
      let message = `*NEW BOOKING REQUEST - HydroShine Auto Spa*\n\n`;
      message += `👤 *Customer Name:* ${name || 'Customer'}\n`;
      if (phone) message += `📞 *Mobile:* ${phone}\n`;
      message += `🚗 *Vehicle:* ${vehicle || 'Not specified'}\n`;
      if (plate) message += `🔢 *Plate No:* ${plate}\n`;
      message += `✨ *Selected Service:* ${service}\n`;
      if (date) message += `📅 *Preferred Date:* ${date}\n`;
      if (time) message += `⏰ *Preferred Time:* ${time}\n`;
      message += `📍 *Location:* Cedre Villa Community Center, Dubai Silicon Oasis\n\n`;
      message += `Please confirm my appointment slot. Thank you!`;

      // Official WhatsApp Number: +971 555 300 500
      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/971507006611?text=${encodedMsg}`;

      // Open WhatsApp in new tab / app
      window.open(whatsappUrl, '_blank');
    });
  }

  // 5. Select Package and Scroll into Booking Form
  window.selectPackage = (packageName) => {
    const serviceSelect = document.getElementById('cust-service');
    const bookingSection = document.getElementById('booking');
    
    if (serviceSelect) {
      // Find matching option or set value
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.toLowerCase().includes(packageName.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6. Copy Address Utility
  const copyBtn = document.getElementById('copy-address-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const address = "DSO-CV-COMM-G-Car wash-Parking 2, Plot-08-689-Cedre Villa - Community Center, Dubai Silicon Oasis, Dubai, UAE";
      navigator.clipboard.writeText(address).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Address Copied!";
        copyBtn.style.color = "#10b981";
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.style.color = "";
        }, 2200);
      });
    });
  }
});
