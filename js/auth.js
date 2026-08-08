// Auth.js - Firebase Authentication with Enhanced UI Features

// ======================
// PASSWORD TOGGLE FUNCTIONALITY
// ======================
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.getElementById(inputId + '-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Make togglePassword available globally
window.togglePassword = togglePassword;


// ======================
// LOGIN FORM SUBMISSION
// ======================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields!');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-primary-custom');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Logging in...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            // Firebase Sign In
            const userCredential = await window.signInWithEmailAndPassword(
                window.firebaseAuth,
                email,
                password
            );
            
            // Store user info
            const user = userCredential.user;
            sessionStorage.setItem('user', user.email);
            sessionStorage.setItem('userId', user.uid);
            sessionStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userId', user.uid);
            
            // Success - Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
            
        } catch (error) {
            console.error('Login Error:', error);
            
            // Restore button state
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
            
            // User-friendly error messages
            let errorMessage = 'Login failed. ';
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address format.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many failed attempts. Please try again later.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Invalid email or password.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your internet connection.';
                    break;
                default:
                    errorMessage = error.message;
            }
            
            alert(errorMessage);
        }
    });
}


// ======================
// SIGNUP FORM SUBMISSION
// ======================
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const terms = document.getElementById('terms') ? document.getElementById('terms').checked : true;
        
        // Validation checks
        if (!fullname || !email || !password || !confirmPassword) {
            alert('Please fill in all fields!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }
        
        if (!terms) {
            alert('Please accept the Terms & Conditions!');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-primary-custom');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Creating account...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            // Firebase Sign Up
            const userCredential = await window.createUserWithEmailAndPassword(
                window.firebaseAuth,
                email,
                password
            );
            
            // Store user info
            const user = userCredential.user;
            sessionStorage.setItem('user', user.email);
            sessionStorage.setItem('username', fullname);
            sessionStorage.setItem('userId', user.uid);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('userName', fullname);
            
            // Success message and redirect
            alert('Account created successfully! Redirecting to dashboard...');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
            
        } catch (error) {
            console.error('Signup Error:', error);
            
            // Restore button state
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
            
            // User-friendly error messages
            let errorMessage = 'Signup failed. ';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already registered. Please login instead.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address format.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password is too weak. Use a stronger password.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your internet connection.';
                    break;
                default:
                    errorMessage = error.message;
            }
            
            alert(errorMessage);
        }
    });
}


// ======================
// GOOGLE SIGN-IN (LOGIN PAGE)
// ======================
const googleLoginBtn = document.getElementById('googleLogin');
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async function() {
        // Show loading state
        const originalContent = this.innerHTML;
        this.innerHTML = '<i class="fab fa-google"></i> <span>Signing in...</span>';
        this.disabled = true;
        
        try {
            const provider = new window.GoogleAuthProvider();
            const result = await window.signInWithPopup(window.firebaseAuth, provider);
            
            // Store user info
            const user = result.user;
            sessionStorage.setItem('user', user.email);
            sessionStorage.setItem('userId', user.uid);
            sessionStorage.setItem('username', user.displayName || '');
            sessionStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('userName', user.displayName || '');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
            
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            
            // Restore button state
            this.innerHTML = originalContent;
            this.disabled = false;
            
            alert('Google Sign-In failed: ' + error.message);
        }
    });
}


// ======================
// GOOGLE SIGN-UP (SIGNUP PAGE)
// ======================
const googleSignupBtn = document.getElementById('googleSignup');
if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', async function() {
        // Show loading state
        const originalContent = this.innerHTML;
        this.innerHTML = '<i class="fab fa-google"></i> <span>Signing up...</span>';
        this.disabled = true;
        
        try {
            const provider = new window.GoogleAuthProvider();
            const result = await window.signInWithPopup(window.firebaseAuth, provider);
            
            // Store user info
            const user = result.user;
            sessionStorage.setItem('user', user.email);
            sessionStorage.setItem('userId', user.uid);
            sessionStorage.setItem('username', user.displayName || '');
            sessionStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('userName', user.displayName || '');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
            
        } catch (error) {
            console.error('Google Sign-Up Error:', error);
            
            // Restore button state
            this.innerHTML = originalContent;
            this.disabled = false;
            
            alert('Google Sign-Up failed: ' + error.message);
        }
    });
}


// ======================
// PAGE LOAD ANIMATION
// ======================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});
