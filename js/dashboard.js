// ============================================
// EMAILJS INITIALIZATION
// ============================================

(function() {
    emailjs.init("dxfmkYFP5__yBEdSL");
})();

// ============================================
// DASHBOARD INITIALIZATION
// ============================================

// Global variable to track SOS status
let sosActive = false;

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Load theme preference
    loadThemePreference();
    
    // Initialize location for SOS
    initializeLocation();
    
    // Set last login time
    setLastLoginTime();
    
    // Load emergency contacts
    loadEmergencyContacts();
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-dropdown')) {
            closeUserDropdown();
        }
    });
});

// ============================================
// AUTHENTICATION
// ============================================

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// ============================================
// USER DATA MANAGEMENT
// ============================================

function loadUserData() {
    // Get user data from sessionStorage
    const userName = sessionStorage.getItem('username') || 'Guest User';
    const userEmail = sessionStorage.getItem('user') || 'guest@abilify.com';
    
    // Extract first name
    const firstName = userName.split(' ')[0];
    
    // Update sidebar user card
    document.getElementById('sidebarUserName').textContent = userName;
    document.getElementById('sidebarUserEmail').textContent = userEmail;
    
    // Update header user dropdown
    document.getElementById('headerUserName').textContent = userName;
    
    // Update welcome banner
    document.getElementById('welcomeUserName').textContent = firstName;
}

function setLastLoginTime() {
    const now = new Date();
    const options = { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const timeString = now.toLocaleDateString('en-US', options);
    
    document.getElementById('lastLoginTime').textContent = timeString;
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('mainWrapper');
    const overlay = document.getElementById('overlay');
    
    // Check if we're on mobile or desktop
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile behavior: slide sidebar in/out
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    } else {
        // Desktop behavior: collapse sidebar and expand content
        sidebar.classList.toggle('active');
        mainWrapper.classList.toggle('expanded');
    }
}


function showDashboard() {
    // Already on dashboard, just make sure nav item is active
    setActiveNav(0);
}

function setActiveNav(index) {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ============================================
// MODULE NAVIGATION
// ============================================

function navigateToModule(page) {
    window.location.href = page;
}

// ============================================
// USER DROPDOWN
// ============================================

function toggleUserDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('active');
}

function closeUserDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.remove('active');
}

function showProfile() {
    closeUserDropdown();
    alert('Profile page coming soon!');
}

function showSettings() {
    closeUserDropdown();
    alert('Settings page coming soon!');
}

// ============================================
// DARK/LIGHT MODE TOGGLE
// ============================================

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
    } else {
        body.classList.remove('dark-mode');
        icon.className = 'fas fa-moon';
    }
}

// ============================================
// SOS FUNCTIONALITY - GREEN/RED TOGGLE
// ============================================

let userLocation = null;

function initializeLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                updateLocationDisplay();
            },
            function(error) {
                console.error('Location error:', error);
                const locationText = document.getElementById('locationText');
                if (locationText) {
                    locationText.textContent = 'Location access denied. Please enable location services.';
                }
            }
        );
    } else {
        const locationText = document.getElementById('locationText');
        if (locationText) {
            locationText.textContent = 'Geolocation is not supported by this browser.';
        }
    }
}

function updateLocationDisplay() {
    if (userLocation) {
        const locationText = document.getElementById('locationText');
        if (locationText) {
            locationText.textContent = 
                `Lat: ${userLocation.latitude.toFixed(4)}, Lng: ${userLocation.longitude.toFixed(4)}`;
        }
    }
}

// Activate SOS (from header button)
function activateSOS() {
    if (sosActive) {
        // If already active, deactivate
        deactivateSOS();
    } else {
        // If not active, show panel
        showSOSPanel();
    }
}

// Show SOS Panel
function showSOSPanel() {
    const sosPanel = document.getElementById('sosPanel');
    const overlay = document.getElementById('overlay');
    
    sosPanel.classList.add('active');
    overlay.classList.add('active');
    
    // Refresh location
    initializeLocation();
}

// Close SOS Panel
function closeSOSPanel() {
    const sosPanel = document.getElementById('sosPanel');
    const overlay = document.getElementById('overlay');
    
    sosPanel.classList.remove('active');
    overlay.classList.remove('active');
}

function sendEmergencyAlert() {
    if (!userLocation) {
        alert('Unable to send alert. Location not available.');
        return;
    }
    
    // Get emergency contacts from localStorage
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    
    if (contacts.length === 0) {
        alert('No emergency contacts found. Please add contacts first.');
        return;
    }
    
    // Toggle SOS to EMERGENCY mode (RED)
    sosActive = true;
    toggleSOSState();
    
    // Get user name
    const userName = sessionStorage.getItem('username') || 'Abilify User';
    
    // Create Google Maps link
    const mapLink = `https://maps.google.com/?q=${userLocation.latitude},${userLocation.longitude}`;
    
    let emailsSent = 0;
    let emailsFailed = 0;
    
    console.log(`📧 Sending emails to ${contacts.length} contacts...`);
    
    // Send INDIVIDUAL email to EACH contact
    contacts.forEach((contact, index) => {
        const templateParams = {
            user_name: userName,
            message: 'HELP ME! I need immediate assistance!',
            latitude: userLocation.latitude.toFixed(6),
            longitude: userLocation.longitude.toFixed(6),
            map_link: mapLink,
            timestamp: new Date().toLocaleString(),
            to_email: contact.email  // Single email only
        };
        
        // Delay each email by 1 second to avoid rate limiting
        setTimeout(() => {
            console.log(`Sending to: ${contact.name} (${contact.email})...`);
            
            emailjs.send('service_wthktsd', 'template_tnura8r', templateParams)
                .then(function(response) {
                    emailsSent++;
                    console.log(`✅ SUCCESS ${emailsSent}/${contacts.length}: Email sent to ${contact.name} (${contact.email}) - Status: ${response.status}`);
                })
                .catch(function(error) {
                    emailsFailed++;
                    console.error(`❌ FAILED: Could not send to ${contact.name} (${contact.email})`, error);
                });
        }, index * 1500); // 1.5 seconds delay between each email
    });
    
    // Show success message
    alert('🚨 EMERGENCY ALERT ACTIVATED!\n\n' +
          `📧 Sending individual emails to ${contacts.length} contacts:\n` +
          contacts.map(c => `• ${c.name} (${c.email})`).join('\n') + '\n\n' +
          '⏱️ Emails will be sent in 1-2 seconds intervals.\n' +
          '📍 Your location is being shared.\n' +
          '🔴 SOS Status: EMERGENCY MODE\n\n' +
          '🖥️ Check browser console (F12) for status.\n' +
          '📧 Check email inboxes in 1-2 minutes.\n\n' +
          'To deactivate, click the SOS button again.');
    
    // Save to alert history
    saveAlertToHistory();
}




// Toggle SOS State (GREEN ↔ RED)
function toggleSOSState() {
    const sosBtn = document.getElementById('sosBtn');
    const floatingSosBtn = document.getElementById('floatingSosBtn');
    const statusIndicator = document.getElementById('statusIndicator');
    const emergencyBtn = document.getElementById('emergencyBtn');
    
    if (sosActive) {
        // Change to EMERGENCY (RED)
        sosBtn.classList.add('emergency');
        floatingSosBtn.classList.add('emergency');
        statusIndicator.classList.remove('safe');
        statusIndicator.classList.add('emergency');
        statusIndicator.querySelector('h4').textContent = 'Status: EMERGENCY';
        emergencyBtn.classList.add('emergency');
        emergencyBtn.querySelector('span').textContent = 'DEACTIVATE EMERGENCY';
        emergencyBtn.onclick = deactivateSOS;
    } else {
        // Change to SAFE (GREEN)
        sosBtn.classList.remove('emergency');
        floatingSosBtn.classList.remove('emergency');
        statusIndicator.classList.remove('emergency');
        statusIndicator.classList.add('safe');
        statusIndicator.querySelector('h4').textContent = 'Status: Safe';
        emergencyBtn.classList.remove('emergency');
        emergencyBtn.querySelector('span').textContent = 'ACTIVATE EMERGENCY';
        emergencyBtn.onclick = sendEmergencyAlert;
    }
}

// Deactivate SOS
function deactivateSOS() {
    if (confirm('Deactivate emergency mode?')) {
        sosActive = false;
        toggleSOSState();
        alert('✓ Emergency mode deactivated.\nSOS Status: SAFE');
    }
}

function saveAlertToHistory() {
    const history = JSON.parse(localStorage.getItem('sosHistory') || '[]');
    
    const newAlert = {
        timestamp: new Date().toISOString(),
        location: userLocation,
        status: 'sent'
    };
    
    history.unshift(newAlert);
    
    // Keep only last 10 alerts
    if (history.length > 10) {
        history.pop();
    }
    
    localStorage.setItem('sosHistory', JSON.stringify(history));
}

// ============================================
// EMERGENCY CONTACTS MANAGEMENT
// ============================================

function showAddContact() {
    const name = prompt('Enter contact name:');
    if (!name) return;
    
    const phone = prompt('Enter contact phone number:');
    if (!phone) return;
    
    const email = prompt('Enter contact email:');
    if (!email) return;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Add contact to localStorage
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    
    contacts.push({
        id: Date.now(),
        name: name,
        phone: phone,
        email: email
    });
    
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
    
    alert('✓ Emergency contact added successfully!');
    loadEmergencyContacts();
}

function loadEmergencyContacts() {
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    const contactList = document.getElementById('contactList');
    
    if (!contactList) return;
    
    if (contacts.length === 0) {
        contactList.innerHTML = '<p>No contacts added yet</p>';
        return;
    }
    
    contactList.innerHTML = contacts.map(contact => `
        <div class="contact-item">
            <div class="contact-info">
                <strong>${contact.name}</strong>
                <p>${contact.phone}</p>
                <p>${contact.email}</p>
            </div>
            <button onclick="deleteContact(${contact.id})" class="delete-contact">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function deleteContact(id) {
    if (!confirm('Delete this contact?')) return;
    
    let contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    contacts = contacts.filter(c => c.id !== id);
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
    
    alert('✓ Contact deleted successfully!');
    loadEmergencyContacts();
}

// ============================================
// ABOUT MODAL
// ============================================

function showAbout() {
    const modal = document.getElementById('aboutModal');
    modal.classList.add('active');
}

function closeAbout() {
    const modal = document.getElementById('aboutModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('aboutModal');
    if (e.target === modal) {
        closeAbout();
    }
});

// ============================================
// CLOSE ALL PANELS
// ============================================

function closeAllPanels() {
    const sosPanel = document.getElementById('sosPanel');
    const overlay = document.getElementById('overlay');
    const sidebar = document.getElementById('sidebar');
    
    sosPanel.classList.remove('active');
    overlay.classList.remove('active');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    }
}

// ============================================
// LOGOUT
// ============================================

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session data
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // Close sidebar and overlay on desktop
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
});
