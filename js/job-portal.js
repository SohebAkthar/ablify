// ============================================
// JOB PORTAL - COMPLETE WITH API INTEGRATION
// Abilify Project - Final Version
// ============================================

console.log('🚀 Job Portal JS Loaded!');

// ============================================
// ADZUNA API CONFIGURATION
// ============================================

const ADZUNA_APP_ID = '';
const ADZUNA_APP_KEY = '';
const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs/in/search';

console.log('🔑 API Credentials loaded!');

// Track current page for pagination
let currentPage = 1;
let currentSearchQuery = 'developer';
let currentLocation = '';
let allJobs = []; // Store all fetched jobs for filtering

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Loaded - Initializing Job Portal...');
    
    loadUserData();
    loadThemePreference();
    initializeSalaryRange();
    
    // Initial job load
    searchJobs();
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu')) {
            closeUserDropdown();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeJobDetails();
        }
    });
    
    console.log('✅ Job Portal Initialized Successfully!');
});

// ============================================
// USER DATA MANAGEMENT
// ============================================

function loadUserData() {
    const userName = sessionStorage.getItem('username') || 'Guest';
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    console.log('👤 User loaded:', userName);
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function goBackToDashboard() {
    console.log('🏠 Navigating back to dashboard...');
    window.location.href = 'dashboard.html';
}

function goToProfile() {
    console.log('👤 Going to profile...');
    alert('Profile page coming soon! 🚧');
}

function goToSavedJobs() {
    console.log('📚 Going to saved jobs...');
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (savedJobs.length === 0) {
        alert('You have no saved jobs yet! 📭\n\nClick the bookmark icon on any job to save it.');
    } else {
        alert(`You have ${savedJobs.length} saved job(s)! 📚\n\nSaved Jobs page coming soon!`);
    }
}

// ============================================
// USER MENU DROPDOWN
// ============================================

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        console.log('📋 User menu toggled');
    }
}

function closeUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
    }
}

// ============================================
// THEME MANAGEMENT
// ============================================

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('jobPortalTheme', 'dark');
        console.log('🌙 Dark mode enabled');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('jobPortalTheme', 'light');
        console.log('☀️ Light mode enabled');
    }
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('jobPortalTheme');
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
        console.log('🌙 Loaded dark mode from preferences');
    } else {
        body.classList.remove('dark-mode');
        icon.className = 'fas fa-moon';
        console.log('☀️ Loaded light mode from preferences');
    }
}

// ============================================
// ACCESSIBILITY FEATURES
// ============================================

let fontSizeLevel = 0;

function toggleFontSize() {
    const body = document.body;
    
    if (fontSizeLevel === 0) {
        body.classList.add('large-font');
        fontSizeLevel = 1;
        console.log('🔤 Large font enabled');
        showNotification('Font size increased');
    } else {
        body.classList.remove('large-font');
        fontSizeLevel = 0;
        console.log('🔤 Normal font restored');
        showNotification('Font size normal');
    }
}

function toggleContrast() {
    const body = document.body;
    body.classList.toggle('high-contrast');
    
    if (body.classList.contains('high-contrast')) {
        console.log('⚫⚪ High contrast enabled');
        showNotification('High contrast enabled');
    } else {
        console.log('⚫⚪ High contrast disabled');
        showNotification('High contrast disabled');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.background = '#2c5aa0';
    notification.style.color = 'white';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transition = 'opacity 0.3s';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ============================================
// FILTER MANAGEMENT
// ============================================

function toggleFilters() {
    const sidebar = document.getElementById('filtersSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
        console.log('🔍 Filters toggled');
    }
}

function resetFilters() {
    console.log('🔄 Resetting all filters...');
    
    const checkboxes = document.querySelectorAll('.filters-sidebar input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    document.getElementById('fullTime').checked = true;
    document.getElementById('remote').checked = true;
    document.getElementById('midLevel').checked = true;
    document.getElementById('disabilityFriendly').checked = true;
    
    const salaryRange = document.getElementById('salaryRange');
    if (salaryRange) {
        salaryRange.value = 25;
        updateSalaryValue(25);
    }
    
    showNotification('Filters reset to default');
    applyFilters(); // Re-apply filters
}

// ============================================
// SALARY RANGE SLIDER
// ============================================

function initializeSalaryRange() {
    const salaryRange = document.getElementById('salaryRange');
    if (salaryRange) {
        salaryRange.addEventListener('input', function() {
            updateSalaryValue(this.value);
        });
        salaryRange.addEventListener('change', function() {
            applyFilters(); // Apply filter when slider changes
        });
    }
}

function updateSalaryValue(value) {
    const salaryValueElement = document.getElementById('salaryValue');
    if (salaryValueElement) {
        salaryValueElement.textContent = `₹${value}L`;
    }
}

// ============================================
// APPLY FILTERS
// ============================================

function applyFilters() {
    console.log('🔍 Applying filters...');
    
    // If no jobs loaded yet, return
    if (allJobs.length === 0) return;
    
    let filteredJobs = [...allJobs];
    
    // Get filter values
    const fullTime = document.getElementById('fullTime')?.checked;
    const partTime = document.getElementById('partTime')?.checked;
    const contract = document.getElementById('contract')?.checked;
    const remote = document.getElementById('remote')?.checked;
    const onSite = document.getElementById('onSite')?.checked;
    const salaryMax = parseInt(document.getElementById('salaryRange')?.value || 25);
    
    // Apply job type filter
    if (fullTime || partTime || contract) {
        filteredJobs = filteredJobs.filter(job => {
            const jobType = (job.contract_type || 'permanent').toLowerCase();
            if (fullTime && (jobType.includes('permanent') || jobType.includes('full'))) return true;
            if (partTime && jobType.includes('part')) return true;
            if (contract && jobType.includes('contract')) return true;
            return false;
        });
    }
    
    // Apply work mode filter
    if (remote || onSite) {
        filteredJobs = filteredJobs.filter(job => {
            const location = (job.location?.display_name || '').toLowerCase();
            if (remote && location.includes('remote')) return true;
            if (onSite && !location.includes('remote')) return true;
            return false;
        });
    }
    
    // Apply salary filter
    filteredJobs = filteredJobs.filter(job => {
        if (job.salary_max) {
            const salaryInLPA = job.salary_max / 100000;
            return salaryInLPA <= salaryMax;
        }
        return true; // Include jobs without salary info
    });
    
    console.log(`✅ Filtered ${filteredJobs.length} jobs from ${allJobs.length} total`);
    
    displayJobs(filteredJobs);
    showNotification(`Showing ${filteredJobs.length} jobs`);
}

// ============================================
// QUICK FILTERS
// ============================================

function filterRemote() {
    toggleQuickFilter(event.target);
    console.log('🏠 Remote filter clicked');
    applyFilters();
}

function filterFullTime() {
    toggleQuickFilter(event.target);
    console.log('💼 Full-time filter clicked');
    applyFilters();
}

function filterAccessible() {
    toggleQuickFilter(event.target);
    console.log('♿ Accessibility filter clicked');
}

function toggleQuickFilter(button) {
    button.classList.toggle('active');
}

// ============================================
// FETCH JOBS FROM ADZUNA API
// ============================================

async function searchJobs() {
    const searchInput = document.getElementById('searchInput')?.value || 'developer';
    const locationInput = document.getElementById('locationInput')?.value || '';
    
    // Reset to page 1 for new search
    currentPage = 1;
    currentSearchQuery = searchInput;
    currentLocation = locationInput;
    
    console.log('🔍 Fetching jobs:', searchInput, 'in', currentLocation || 'India');
    
    showNotification(`Searching for "${searchInput}" jobs...`);
    
    try {
        const query = encodeURIComponent(searchInput);
        const location = encodeURIComponent(currentLocation || 'India');
        const url = `${ADZUNA_BASE_URL}/${currentPage}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${query}&where=${location}&results_per_page=20`;
        
        console.log('📡 API URL:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('✅ Jobs fetched:', data.count, 'total jobs found');
        console.log('📊 Showing:', data.results.length, 'jobs');
        
        allJobs = data.results; // Store all jobs
        displayJobs(data.results);
        
        showNotification(`Found ${data.count} jobs! Showing first ${data.results.length}`);
        
    } catch (error) {
        console.error('❌ Error fetching jobs:', error);
        showNotification('Error loading jobs. Please try again.');
    }
}

// ============================================
// DISPLAY JOBS ON PAGE
// ============================================

function displayJobs(jobs) {
    const jobsGrid = document.querySelector('.jobs-grid');
    
    if (!jobsGrid) {
        console.error('❌ Jobs grid not found!');
        return;
    }
    
    jobsGrid.innerHTML = '';
    
    if (jobs.length === 0) {
        jobsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No jobs found. Try different keywords!</p>';
        return;
    }
    
    jobs.forEach((job, index) => {
        const jobCard = createJobCard(job, index + 1);
        jobsGrid.appendChild(jobCard);
    });
    
    console.log('✅ Displayed', jobs.length, 'job cards');
}

// ============================================
// APPEND MORE JOBS (For Load More)
// ============================================

function appendJobs(jobs) {
    const jobsGrid = document.querySelector('.jobs-grid');
    
    if (!jobsGrid) {
        console.error('❌ Jobs grid not found!');
        return;
    }
    
    if (jobs.length === 0) {
        showNotification('No more jobs found!');
        return;
    }
    
    const existingJobsCount = jobsGrid.querySelectorAll('.job-card').length;
    
    jobs.forEach((job, index) => {
        const jobCard = createJobCard(job, existingJobsCount + index + 1);
        jobsGrid.appendChild(jobCard);
    });
    
    // Add new jobs to allJobs array
    allJobs = allJobs.concat(jobs);
    
    console.log('✅ Appended', jobs.length, 'more job cards');
}

// ============================================
// CREATE JOB CARD HTML
// ============================================

function createJobCard(job, jobId) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.onclick = () => openJobDetails(jobId);
    
    const title = job.title || 'Job Position';
    const company = job.company?.display_name || 'Company';
    const location = job.location?.display_name || 'Location';
    const salary = job.salary_min && job.salary_max 
        ? `₹${Math.round(job.salary_min/100000)}-${Math.round(job.salary_max/100000)} LPA`
        : 'Salary not specified';
    const jobType = job.contract_type || 'Full-time';
    const workMode = job.location?.display_name?.toLowerCase().includes('remote') ? 'Remote' : 'On-site';
    
    card.innerHTML = `
        <div class="job-card-header">
            <div class="company-logo">
                <i class="fas fa-building"></i>
            </div>
            <button class="save-btn" onclick="event.stopPropagation(); toggleSave(${jobId});">
                <i class="far fa-bookmark"></i>
            </button>
        </div>
        
        <h3 class="job-title">${title}</h3>
        <p class="company-name">${company}</p>
        
        <div class="job-details">
            <span class="detail-item">
                <i class="fas fa-map-marker-alt"></i>
                ${location}
            </span>
            <span class="detail-item">
                <i class="fas fa-rupee-sign"></i>
                ${salary}
            </span>
            <span class="detail-item">
                <i class="fas fa-briefcase"></i>
                ${jobType}
            </span>
            <span class="detail-item">
                <i class="fas fa-laptop-house"></i>
                ${workMode}
            </span>
        </div>
        
        <div class="job-tags">
            <span class="tag">💼 ${jobType}</span>
            <span class="tag">♿ Accessible</span>
        </div>
        
        <div class="job-card-footer">
            <span class="posted-time">
                <i class="far fa-clock"></i>
                ${getTimeAgo(job.created)}
            </span>
            <button class="apply-btn-small" onclick="event.stopPropagation(); window.open('${job.redirect_url}', '_blank');">
                Apply Now
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    return card;
}

// ============================================
// HELPER: GET TIME AGO
// ============================================

function getTimeAgo(dateString) {
    if (!dateString) return 'Recently posted';
    
    const now = new Date();
    const posted = new Date(dateString);
    const diffInMs = now - posted;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
}

// ============================================
// SORT FUNCTIONALITY
// ============================================

function sortJobs() {
    const sortBy = document.getElementById('sortBy').value;
    console.log('🔀 Sorting by:', sortBy);
    
    let sortedJobs = [...allJobs];
    
    if (sortBy === 'date') {
        sortedJobs.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (sortBy === 'salary') {
        sortedJobs.sort((a, b) => (b.salary_max || 0) - (a.salary_max || 0));
    }
    
    displayJobs(sortedJobs);
    showNotification(`Sorted by ${sortBy}`);
}

// ============================================
// JOB CARD INTERACTIONS
// ============================================

function toggleSave(jobId) {
    const saveBtn = event.target.closest('.save-btn');
    const icon = saveBtn.querySelector('i');
    
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    const jobIndex = savedJobs.indexOf(jobId);
    
    if (jobIndex === -1) {
        savedJobs.push(jobId);
        icon.classList.remove('far');
        icon.classList.add('fas');
        saveBtn.classList.add('saved');
        console.log('💾 Job', jobId, 'saved');
        showNotification('Job saved! 💾');
    } else {
        savedJobs.splice(jobIndex, 1);
        icon.classList.remove('fas');
        icon.classList.add('far');
        saveBtn.classList.remove('saved');
        console.log('🗑️ Job', jobId, 'removed from saved');
        showNotification('Job removed from saved');
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
}

function applyNow(jobId) {
    console.log('📝 Applying to job:', jobId);
    alert('🎯 Apply Now!\n\nJob ID: ' + jobId + '\n\nThis will redirect to the company\'s application page.');
}

// ============================================
// LOAD MORE JOBS (PAGINATION)
// ============================================

async function loadMoreJobs() {
    console.log('📚 Loading more jobs...');
    showNotification('Loading more jobs...');
    
    currentPage++;
    
    try {
        const query = encodeURIComponent(currentSearchQuery);
        const location = encodeURIComponent(currentLocation || 'India');
        const url = `${ADZUNA_BASE_URL}/${currentPage}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${query}&where=${location}&results_per_page=20`;
        
        console.log('📡 Fetching page', currentPage);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('✅ More jobs fetched:', data.results.length);
        
        appendJobs(data.results);
        
        showNotification(`Loaded ${data.results.length} more jobs!`);
        
        setTimeout(() => {
            const lastJob = document.querySelector('.jobs-grid .job-card:last-child');
            if (lastJob) {
                lastJob.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
        
    } catch (error) {
        console.error('❌ Error loading more jobs:', error);
        showNotification('Error loading more jobs. Please try again.');
        currentPage--;
    }
}

// ============================================
// JOB DETAILS MODAL
// ============================================

function openJobDetails(jobId) {
    console.log('👁️ Opening job details:', jobId);
    
    const modal = document.getElementById('jobDetailsModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateModalContent(jobId);
    }
}

function closeJobDetails() {
    const modal = document.getElementById('jobDetailsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        console.log('✖️ Job details closed');
    }
}

function updateModalContent(jobId) {
    const job = allJobs[jobId - 1] || allJobs[0];
    
    if (job) {
        document.getElementById('modalJobTitle').textContent = job.title || 'Job Position';
        document.getElementById('modalCompanyName').textContent = job.company?.display_name || 'Company';
        document.getElementById('modalLocation').textContent = job.location?.display_name || 'Location';
        document.getElementById('modalSalary').textContent = job.salary_min && job.salary_max 
            ? `₹${Math.round(job.salary_min/100000)}-${Math.round(job.salary_max/100000)} LPA`
            : 'Salary not specified';
    }
    
    console.log('📄 Modal updated with job:', jobId);
}

function toggleSaveModal() {
    console.log('💾 Save from modal clicked');
    showNotification('Job saved! 💾');
}

function applyFromModal() {
    console.log('📝 Apply from modal clicked');
    closeJobDetails();
    alert('🎯 Application Started!\n\nYou will be redirected to the company\'s application page.');
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeJobDetails();
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        console.warn('⚠️ User not logged in');
    }
}

// ============================================
// API READY
// ============================================

console.log('✅ All features working!');
console.log('🔑 API credentials configured!');
console.log('💡 Ready to fetch REAL jobs!');
console.log('🚀 Jobs loading automatically!');

// ============================================
// END OF JOB PORTAL JS
// ============================================
