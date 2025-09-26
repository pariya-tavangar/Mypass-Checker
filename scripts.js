// DOM Elements
        const passwordInput = document.getElementById('passwordInput');
        const togglePassword = document.getElementById('togglePassword');
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        const feedback = document.getElementById('feedback');
        const feedbackList = document.getElementById('feedbackList');
        const scoreValue = document.getElementById('scoreValue');
        
        // Criteria elements
        const lengthCriterion = document.getElementById('lengthCriterion');
        const uppercaseCriterion = document.getElementById('uppercaseCriterion');
        const lowercaseCriterion = document.getElementById('lowercaseCriterion');
        const numberCriterion = document.getElementById('numberCriterion');
        const specialCriterion = document.getElementById('specialCriterion');
        
        // Toggle password visibility
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🔒';
        });
        
        // Check password strength in real-time
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const result = checkPasswordStrength(password);
            updateUI(result);
        });
        
        // Password strength checker function
        function checkPasswordStrength(password) {
            let strength = 0;
            let feedback = [];
            
            // Length check
            if (password.length >= 8) {
                strength++;
            } else {
                feedback.push("Password should be at least 8 characters");
            }
            
            // Character variety checks
            if (/[a-z]/.test(password)) {
                strength++;
            } else {
                feedback.push("Add lowercase letters");
            }
            
            if (/[A-Z]/.test(password)) {
                strength++;
            } else {
                feedback.push("Add uppercase letters");
            }
            
            if (/[0-9]/.test(password)) {
                strength++;
            } else {
                feedback.push("Add numbers");
            }
            
            if (/[^A-Za-z0-9]/.test(password)) {
                strength++;
            } else {
                feedback.push("Add special characters");
            }
            
            // Common password check (simplified)
            const commonPasswords = ["password", "123456", "qwerty", "letmein", "admin", "welcome"];
            if (commonPasswords.includes(password.toLowerCase())) {
                strength = Math.max(0, strength - 2);
                feedback.push("This is a very common password - choose something more unique");
            }
            
            // Sequential characters check
            if (/(.)\1{2,}/.test(password)) {
                strength = Math.max(0, strength - 1);
                feedback.push("Avoid repeated characters (e.g., 'aaa')");
            }
            
            // Update criteria status
            updateCriteria(password);
            
            return {
                score: strength,
                feedback: feedback
            };
        }
        
        // Update criteria checkmarks
        function updateCriteria(password) {
            // Length
            if (password.length >= 8) {
                lengthCriterion.classList.add('valid');
                lengthCriterion.querySelector('i').textContent = '✅';
            } else {
                lengthCriterion.classList.remove('valid');
                lengthCriterion.querySelector('i').textContent = '❌';
            }
            
            // Uppercase
            if (/[A-Z]/.test(password)) {
                uppercaseCriterion.classList.add('valid');
                uppercaseCriterion.querySelector('i').textContent = '✅';
            } else {
                uppercaseCriterion.classList.remove('valid');
                uppercaseCriterion.querySelector('i').textContent = '❌';
            }
            
            // Lowercase
            if (/[a-z]/.test(password)) {
                lowercaseCriterion.classList.add('valid');
                lowercaseCriterion.querySelector('i').textContent = '✅';
            } else {
                lowercaseCriterion.classList.remove('valid');
                lowercaseCriterion.querySelector('i').textContent = '❌';
            }
            
            // Numbers
            if (/[0-9]/.test(password)) {
                numberCriterion.classList.add('valid');
                numberCriterion.querySelector('i').textContent = '✅';
            } else {
                numberCriterion.classList.remove('valid');
                numberCriterion.querySelector('i').textContent = '❌';
            }
            
            // Special characters
            if (/[^A-Za-z0-9]/.test(password)) {
                specialCriterion.classList.add('valid');
                specialCriterion.querySelector('i').textContent = '✅';
            } else {
                specialCriterion.classList.remove('valid');
                specialCriterion.querySelector('i').textContent = '❌';
            }
        }
        
        // Update UI based on password strength
        function updateUI(result) {
            const score = result.score;
            const feedbackItems = result.feedback;
            
            // Update strength bar and text
            const percentage = (score / 5) * 100;
            strengthBar.style.width = `${percentage}%`;
            
            // Set color based on strength
            if (score <= 1) {
                strengthBar.style.backgroundColor = '#e74c3c'; // Red
                strengthText.textContent = 'Very Weak';
                strengthText.style.color = '#e74c3c';
            } else if (score === 2) {
                strengthBar.style.backgroundColor = '#e67e22'; // Orange
                strengthText.textContent = 'Weak';
                strengthText.style.color = '#e67e22';
            } else if (score === 3) {
                strengthBar.style.backgroundColor = '#f1c40f'; // Yellow
                strengthText.textContent = 'Fair';
                strengthText.style.color = '#f1c40f';
            } else if (score === 4) {
                strengthBar.style.backgroundColor = '#2ecc71'; // Green
                strengthText.textContent = 'Strong';
                strengthText.style.color = '#2ecc71';
            } else {
                strengthBar.style.backgroundColor = '#27ae60'; // Dark Green
                strengthText.textContent = 'Very Strong';
                strengthText.style.color = '#27ae60';
            }
            
            // Update score display
            scoreValue.textContent = `${score}/5`;
            
            // Update feedback
            if (feedbackItems.length > 0 && passwordInput.value.length > 0) {
                feedback.style.display = 'block';
                feedbackList.innerHTML = '';
                
                feedbackItems.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    feedbackList.appendChild(li);
                });
            } else {
                feedback.style.display = 'none';
            }
            
            // Special case for empty password
            if (passwordInput.value.length === 0) {
                strengthBar.style.width = '0%';
                strengthText.textContent = 'Enter a password to check its strength';
                strengthText.style.color = '#7f8c8d';
                scoreValue.textContent = '0/5';
                feedback.style.display = 'none';
                
                // Reset criteria
                const criteria = document.querySelectorAll('.criterion');
                criteria.forEach(criterion => {
                    criterion.classList.remove('valid');
                    criterion.querySelector('i').textContent = '❌';
                });
            }
        }