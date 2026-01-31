/**
 * Main Application Logic for School Research Prompt Generator
 * Handles form events, validation, and UI interactions
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

    /**
     * Show/hide "Other" country input based on selection
     */
    countrySelect.addEventListener('change', function() {
        if (this.value === 'Other') {
            otherCountryGroup.style.display = 'block';
            otherCountryInput.setAttribute('required', 'required');
        } else {
            otherCountryGroup.style.display = 'none';
            otherCountryInput.removeAttribute('required');
            otherCountryInput.value = '';
        }
    });

    /**
     * Form submission handler
     */
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Collect form data
        const formData = collectFormData();
        
        // Generate prompt
        const prompt = PromptBuilder.buildPrompt(formData);
        
        // Display output
        displayOutput(prompt);
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
    });

    /**
     * Copy button handler
     */
    copyBtn.addEventListener('click', function() {
        copyToClipboard();
    });

    /**
     * Validate the form
     * @returns {boolean}
     */
    function validateForm() {
        // Check required fields
        const schoolName = document.getElementById('schoolName').value.trim();
        const country = countrySelect.value;
        const purpose = document.querySelector('input[name="purpose"]:checked');
        
        if (!schoolName) {
            alert('高校名を入力してください。');
            document.getElementById('schoolName').focus();
            return false;
        }
        
        if (!country) {
            alert('所在国を選択してください。');
            countrySelect.focus();
            return false;
        }
        
        if (country === 'Other') {
            const otherCountry = otherCountryInput.value.trim();
            if (!otherCountry) {
                alert('その他の国名を入力してください。');
                otherCountryInput.focus();
                return false;
            }
        }
        
        if (!purpose) {
            alert('調査目的を選択してください。');
            return false;
        }
        
        return true;
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
