/**
 * Main Application Logic for School Research Prompt Generator
 * Handles form events, validation, and UI interactions
 * Phase 3: Enhanced validation, error display, loading states, accessibility
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('promptForm');
    const countrySelect = document.getElementById('country');
    const otherCountryGroup = document.getElementById('otherCountryGroup');
    const otherCountryInput = document.getElementById('otherCountry');
    const outputSection = document.getElementById('outputSection');
    const outputPrompt = document.getElementById('outputPrompt');
    const copyBtn = document.getElementById('copyBtn');
    const copyFeedback = document.getElementById('copyFeedback');
    const resetBtn = document.getElementById('resetBtn');
    const generateBtn = document.getElementById('generateBtn');
    const errorContainer = document.getElementById('errorContainer');
    const errorList = document.getElementById('errorList');
    const errorClose = document.getElementById('errorClose');

    /**
     * Show/hide "Other" country input based on selection
     */
    countrySelect.addEventListener('change', function() {
        if (this.value === 'Other') {
            otherCountryGroup.style.display = 'block';
            otherCountryInput.setAttribute('required', 'required');
            otherCountryInput.setAttribute('aria-required', 'true');
        } else {
            otherCountryGroup.style.display = 'none';
            otherCountryInput.removeAttribute('required');
            otherCountryInput.removeAttribute('aria-required');
            otherCountryInput.value = '';
            clearInputError(otherCountryInput);
        }
        clearInputError(countrySelect);
    });

    /**
     * Clear error state on input
     */
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function() {
            clearInputError(this);
        });
        input.addEventListener('change', function() {
            clearInputError(this);
        });
    });

    /**
     * Error close button handler
     */
    errorClose.addEventListener('click', function() {
        hideErrors();
    });

    /**
     * Form submission handler
     */
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous errors
        hideErrors();
        
        // Validate form
        const validationResult = validateForm();
        if (!validationResult.isValid) {
            showErrors(validationResult.errors);
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Simulate brief processing delay for UX (actual generation is instant)
        setTimeout(() => {
            // Collect form data
            const formData = collectFormData();
            
            // Generate prompt
            const prompt = PromptBuilder.buildPrompt(formData);
            
            // Display output
            displayOutput(prompt);
            
            // Hide loading state
            setLoadingState(false);
        }, 300);
    });

    /**
     * Reset button handler
     */
    form.addEventListener('reset', function() {
        // Hide output section
        outputSection.style.display = 'none';
        
        // Hide "Other" country input
        otherCountryGroup.style.display = 'none';
        
        // Clear any feedback
        copyFeedback.classList.remove('show');
        
        // Hide errors
        hideErrors();
        
        // Clear all input error states
        document.querySelectorAll('.input-error').forEach(el => {
            el.classList.remove('input-error');
        });
    });

    /**
     * Copy button handler
     */
    copyBtn.addEventListener('click', function() {
        copyToClipboard();
    });

    /**
     * Keyboard shortcut: Ctrl/Cmd + Enter to generate
     */
    form.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            generateBtn.click();
        }
    });

    /**
     * Validate the form
     * @returns {Object} { isValid: boolean, errors: string[] }
     */
    function validateForm() {
        const errors = [];
        
        // Check school name
        const schoolNameInput = document.getElementById('schoolName');
        const schoolName = schoolNameInput.value.trim();
        if (!schoolName) {
            errors.push('高校名を入力してください。');
            setInputError(schoolNameInput);
        } else if (schoolName.length < 2) {
            errors.push('高校名は2文字以上で入力してください。');
            setInputError(schoolNameInput);
        } else if (schoolName.length > 200) {
            errors.push('高校名は200文字以内で入力してください。');
            setInputError(schoolNameInput);
        }
        
        // Check country
        const country = countrySelect.value;
        if (!country) {
            errors.push('所在国を選択してください。');
            setInputError(countrySelect);
        }
        
        // Check other country if selected
        if (country === 'Other') {
            const otherCountry = otherCountryInput.value.trim();
            if (!otherCountry) {
                errors.push('その他の国名を入力してください。');
                setInputError(otherCountryInput);
            } else if (otherCountry.length < 2) {
                errors.push('国名は2文字以上で入力してください。');
                setInputError(otherCountryInput);
            }
        }
        
        // Check purpose
        const purpose = document.querySelector('input[name="purpose"]:checked');
        if (!purpose) {
            errors.push('調査目的を選択してください。');
        }
        
        // Check additional URLs format (if provided)
        const additionalUrlsInput = document.getElementById('additionalUrls');
        const additionalUrls = additionalUrlsInput.value.trim();
        if (additionalUrls) {
            const urls = additionalUrls.split(',').map(u => u.trim()).filter(u => u);
            const urlPattern = /^https?:\/\/.+/i;
            const invalidUrls = urls.filter(u => !urlPattern.test(u));
            if (invalidUrls.length > 0) {
                errors.push('URLはhttp://またはhttps://で始まる形式で入力してください。');
                setInputError(additionalUrlsInput);
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Set input error state
     * @param {HTMLElement} input
     */
    function setInputError(input) {
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');
    }

    /**
     * Clear input error state
     * @param {HTMLElement} input
     */
    function clearInputError(input) {
        input.classList.remove('input-error');
        input.removeAttribute('aria-invalid');
    }

    /**
     * Show error messages
     * @param {string[]} errors
     */
    function showErrors(errors) {
        errorList.innerHTML = errors.map(err => `<li>${err}</li>`).join('');
        errorContainer.style.display = 'block';
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Focus first error input
        const firstErrorInput = document.querySelector('.input-error');
        if (firstErrorInput) {
            firstErrorInput.focus();
        }
    }

    /**
     * Hide error messages
     */
    function hideErrors() {
        errorContainer.style.display = 'none';
        errorList.innerHTML = '';
    }

    /**
     * Set loading state
     * @param {boolean} isLoading
     */
    function setLoadingState(isLoading) {
        const btnText = generateBtn.querySelector('.btn-text');
        const btnLoading = generateBtn.querySelector('.btn-loading');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            generateBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            generateBtn.disabled = false;
        }
    }

    /**
     * Collect all form data
     * @returns {Object}
     */
    function collectFormData() {
        // Get basic fields
        const schoolName = document.getElementById('schoolName').value.trim();
        const country = countrySelect.value;
        const otherCountry = otherCountryInput.value.trim();
        const cityState = document.getElementById('cityState').value.trim();
        const schoolType = document.getElementById('schoolType').value;
        const purpose = document.querySelector('input[name="purpose"]:checked').value;
        const includeLocalSearch = document.getElementById('includeLocalSearch').checked;
        const additionalUrls = document.getElementById('additionalUrls').value.trim();
        
        // Get curriculum checkboxes
        const curriculumCheckboxes = document.querySelectorAll('input[name="curriculum"]:checked');
        const curriculum = Array.from(curriculumCheckboxes).map(cb => cb.value);
        
        return {
            schoolName,
            country,
            otherCountry,
            cityState,
            schoolType,
            curriculum,
            purpose,
            includeLocalSearch,
            additionalUrls
        };
    }

    /**
     * Display the generated prompt
     * @param {string} prompt
     */
    function displayOutput(prompt) {
        outputPrompt.textContent = prompt;
        outputSection.style.display = 'block';
        
        // Scroll to output
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Focus output for accessibility
        outputPrompt.focus();
    }

    /**
     * Copy prompt to clipboard
     */
    async function copyToClipboard() {
        const text = outputPrompt.textContent;
        
        try {
            await navigator.clipboard.writeText(text);
            showCopyFeedback();
        } catch (err) {
            // Fallback for older browsers
            fallbackCopyToClipboard(text);
        }
    }

    /**
     * Fallback copy method for browsers that don't support clipboard API
     * @param {string} text
     */
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback();
        } catch (err) {
            alert('コピーに失敗しました。テキストを手動で選択してコピーしてください。');
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Show copy success feedback
     */
    function showCopyFeedback() {
        copyFeedback.classList.remove('show');
        // Trigger reflow to restart animation
        void copyFeedback.offsetWidth;
        copyFeedback.classList.add('show');
        
        // Remove class after animation
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    }
});
