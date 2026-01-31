/**
 * Main Application Logic for School Research Prompt Generator
 * Handles form events, validation, and UI interactions
 * Phase 3: Enhanced validation, error display, loading states, accessibility
 * Phase 3.5: User guide, next steps guide, country warnings
 * Phase 3.7: Verification modal, notice banner expansion
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
    
    // Inline error elements
    const schoolNameError = document.getElementById('schoolNameError');
    const countryError = document.getElementById('countryError');
    const otherCountryError = document.getElementById('otherCountryError');
    const purposeError = document.getElementById('purposeError');
    const additionalUrlsError = document.getElementById('additionalUrlsError');
    
    // Guide elements
    const guideToggle = document.getElementById('guideToggle');
    const guideContent = document.getElementById('guideContent');
    
    // Country warning elements
    const countryWarning = document.getElementById('countryWarning');
    const countryWarningTitle = document.getElementById('countryWarningTitle');
    const countryWarningList = document.getElementById('countryWarningList');
    
    // Modal and notice banner elements
    const verificationModal = document.getElementById('verificationModal');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
    const noticeBanner = document.getElementById('noticeBanner');
    const noticeExpandBtn = document.getElementById('noticeExpandBtn');
    const noticeExpandPanel = document.getElementById('noticeExpandPanel');

    /**
     * Guide toggle handler
     */
    guideToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        guideContent.hidden = isExpanded;
    });

    /**
     * Notice banner expand/collapse handler (for mobile tap and desktop click)
     */
    noticeExpandBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleNoticePanel();
    });

    /**
     * Desktop hover handlers for notice banner
     */
    if (window.matchMedia('(hover: hover)').matches) {
        noticeBanner.addEventListener('mouseenter', function() {
            openNoticePanel();
        });
        
        noticeBanner.addEventListener('mouseleave', function() {
            closeNoticePanel();
        });
    }

    /**
     * Close notice panel when clicking outside
     */
    document.addEventListener('click', function(e) {
        if (!noticeBanner.contains(e.target)) {
            closeNoticePanel();
        }
    });

    function toggleNoticePanel() {
        const isExpanded = noticeExpandBtn.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeNoticePanel();
        } else {
            openNoticePanel();
        }
    }

    function openNoticePanel() {
        noticeExpandBtn.setAttribute('aria-expanded', 'true');
        noticeExpandPanel.hidden = false;
    }

    function closeNoticePanel() {
        noticeExpandBtn.setAttribute('aria-expanded', 'false');
        noticeExpandPanel.hidden = true;
    }

    /**
     * Modal handlers
     */
    function showVerificationModal() {
        verificationModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        modalConfirmBtn.focus();
    }

    function hideVerificationModal() {
        verificationModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scroll
        enableCopyButton();
    }

    function disableCopyButton() {
        copyBtn.classList.add('disabled');
        copyBtn.setAttribute('aria-disabled', 'true');
    }

    function enableCopyButton() {
        copyBtn.classList.remove('disabled');
        copyBtn.removeAttribute('aria-disabled');
    }

    modalConfirmBtn.addEventListener('click', function() {
        hideVerificationModal();
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && verificationModal.classList.contains('show')) {
            hideVerificationModal();
        }
    });

    // Close modal on overlay click
    verificationModal.addEventListener('click', function(e) {
        if (e.target === verificationModal) {
            hideVerificationModal();
        }
    });

    /**
     * Show/hide "Other" country input and country warnings based on selection
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
        
        // Show country-specific warnings
        showCountryWarnings(this.value);
    });

    /**
     * Display country-specific warnings
     * @param {string} country
     */
    function showCountryWarnings(country) {
        if (!country || country === 'Other') {
            countryWarning.style.display = 'none';
            return;
        }
        
        const countryInfo = countryData[country];
        if (!countryInfo || !countryInfo.warnings || countryInfo.warnings.length === 0) {
            countryWarning.style.display = 'none';
            return;
        }
        
        // Filter to show only critical warnings (those with ⚠️ or CRITICAL)
        const criticalWarnings = countryInfo.warnings.filter(w => 
            w.includes('⚠️') || w.includes('CRITICAL') || w.includes('重要')
        );
        
        // If no critical warnings, show first 2 general warnings
        const warningsToShow = criticalWarnings.length > 0 
            ? criticalWarnings 
            : countryInfo.warnings.slice(0, 2);
        
        if (warningsToShow.length === 0) {
            countryWarning.style.display = 'none';
            return;
        }
        
        // Update title with country name
        const countryNames = {
            'China': '中国',
            'Korea': '韓国',
            'Vietnam': 'ベトナム',
            'Taiwan': '台湾',
            'Thailand': 'タイ',
            'Indonesia': 'インドネシア',
            'Malaysia': 'マレーシア',
            'Philippines': 'フィリピン',
            'India': 'インド',
            'Japan': '日本'
        };
        countryWarningTitle.textContent = `${countryNames[country] || country} の重要な注意点`;
        
        // Populate warning list
        countryWarningList.innerHTML = warningsToShow
            .map(w => `<li>${w}</li>`)
            .join('');
        
        countryWarning.style.display = 'block';
        
        // Update placeholders based on country
        updatePlaceholders(country);
    }

    /**
     * Update input placeholders based on selected country
     * @param {string} country
     */
    function updatePlaceholders(country) {
        const schoolNameInput = document.getElementById('schoolName');
        const cityStateInput = document.getElementById('cityState');
        
        const placeholders = {
            'China': {
                schoolName: '例: Beijing No. 4 High School / 北京市第四中学',
                cityState: '例: Beijing / Shanghai / Guangzhou'
            },
            'Korea': {
                schoolName: '例: Seoul Foreign School / 서울외국인학교',
                cityState: '例: Seoul (서울) / Busan (부산)'
            },
            'Vietnam': {
                schoolName: '例: Le Hong Phong High School / Trường THPT Lê Hồng Phong',
                cityState: '例: Ho Chi Minh City / Hanoi'
            },
            'Taiwan': {
                schoolName: '例: Taipei Municipal Jianguo High School / 臺北市立建國高級中學',
                cityState: '例: Taipei (台北) / Kaohsiung (高雄)'
            },
            'Thailand': {
                schoolName: '例: Triam Udom Suksa School / โรงเรียนเตรียมอุดมศึกษา',
                cityState: '例: Bangkok / Chiang Mai'
            },
            'Indonesia': {
                schoolName: '例: SMA Negeri 3 Jakarta / Jakarta State High School 3',
                cityState: '例: Jakarta / Surabaya / Bandung'
            },
            'Malaysia': {
                schoolName: '例: Victoria Institution / SMK (P) Sri Aman',
                cityState: '例: Kuala Lumpur / Penang / Johor Bahru'
            },
            'Philippines': {
                schoolName: '例: Philippine Science High School / De La Salle Santiago Zobel',
                cityState: '例: Manila / Cebu / Davao'
            },
            'India': {
                schoolName: '例: Delhi Public School / Kendriya Vidyalaya',
                cityState: '例: New Delhi / Mumbai / Bangalore'
            },
            'Japan': {
                schoolName: '例: 開成高等学校 / Kaisei Senior High School',
                cityState: '例: 東京 / 大阪 / 名古屋'
            }
        };
        
        const defaultPlaceholders = {
            schoolName: '例: [School Name] High School / [現地語名]',
            cityState: '例: [City Name] / [State/Province]'
        };
        
        const ph = placeholders[country] || defaultPlaceholders;
        schoolNameInput.placeholder = ph.schoolName;
        cityStateInput.placeholder = ph.cityState;
    }

    /**
     * Step indicator management
     */
    const steps = document.querySelectorAll('.step');
    const stepLines = document.querySelectorAll('.step-line');
    const formSections = document.querySelectorAll('.form-section[data-section]');
    
    /**
     * Update step indicator based on form section focus
     */
    function updateStepIndicator(activeSection) {
        steps.forEach((step, index) => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            
            if (stepNum < activeSection) {
                step.classList.add('completed');
            } else if (stepNum === activeSection) {
                step.classList.add('active');
            }
        });
        
        stepLines.forEach((line, index) => {
            if (index < activeSection - 1) {
                line.classList.add('completed');
            } else {
                line.classList.remove('completed');
            }
        });
    }
    
    // Track which section is being interacted with
    formSections.forEach(section => {
        const sectionNum = parseInt(section.dataset.section);
        const inputs = section.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                updateStepIndicator(sectionNum);
            });
        });
    });

    /**
     * Clear error state on input
     */
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function() {
            // Find associated error span
            const errorSpanId = this.id + 'Error';
            const errorSpan = document.getElementById(errorSpanId);
            clearInputError(this, errorSpan);
        });
        input.addEventListener('change', function() {
            // Find associated error span
            const errorSpanId = this.id + 'Error';
            const errorSpan = document.getElementById(errorSpanId);
            clearInputError(this, errorSpan);
        });
    });

    /**
     * Form submission handler
     */
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form (this clears previous errors and sets new ones)
        const validationResult = validateForm();
        if (!validationResult.isValid) {
            // Scroll to first error smoothly
            scrollToError(validationResult.firstErrorElement);
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
        
        // Hide country warning
        countryWarning.style.display = 'none';
        
        // Clear any feedback
        copyFeedback.classList.remove('show');
        
        // Clear all inline errors
        clearAllInlineErrors();
        
        // Clear all input error states
        document.querySelectorAll('.input-error').forEach(el => {
            el.classList.remove('input-error');
        });
    });

    /**
     * Copy button handler
     */
    copyBtn.addEventListener('click', function() {
        // Check if button is disabled
        if (copyBtn.classList.contains('disabled')) {
            return;
        }
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
     * @returns {Object} { isValid: boolean, errors: Object[], firstErrorElement: HTMLElement }
     */
    function validateForm() {
        const errors = [];
        let firstErrorElement = null;
        
        // Clear all previous inline errors
        clearAllInlineErrors();
        
        // Check school name
        const schoolNameInput = document.getElementById('schoolName');
        const schoolName = schoolNameInput.value.trim();
        if (!schoolName) {
            const msg = '高校名を入力してください / Please enter school name';
            errors.push({ field: 'schoolName', message: msg });
            setInputError(schoolNameInput, schoolNameError, msg);
            if (!firstErrorElement) firstErrorElement = schoolNameInput;
        } else if (schoolName.length < 2) {
            const msg = '高校名は2文字以上 / School name: 2+ characters required';
            errors.push({ field: 'schoolName', message: msg });
            setInputError(schoolNameInput, schoolNameError, msg);
            if (!firstErrorElement) firstErrorElement = schoolNameInput;
        } else if (schoolName.length > 200) {
            const msg = '高校名は200文字以内 / School name: max 200 characters';
            errors.push({ field: 'schoolName', message: msg });
            setInputError(schoolNameInput, schoolNameError, msg);
            if (!firstErrorElement) firstErrorElement = schoolNameInput;
        }
        
        // Check country
        const country = countrySelect.value;
        if (!country) {
            const msg = '所在国を選択してください / Please select a country';
            errors.push({ field: 'country', message: msg });
            setInputError(countrySelect, countryError, msg);
            if (!firstErrorElement) firstErrorElement = countrySelect;
        }
        
        // Check other country if selected
        if (country === 'Other') {
            const otherCountry = otherCountryInput.value.trim();
            if (!otherCountry) {
                const msg = 'その他の国名を入力してください / Please enter country name';
                errors.push({ field: 'otherCountry', message: msg });
                setInputError(otherCountryInput, otherCountryError, msg);
                if (!firstErrorElement) firstErrorElement = otherCountryInput;
            } else if (otherCountry.length < 2) {
                const msg = '国名は2文字以上 / Country name: 2+ characters required';
                errors.push({ field: 'otherCountry', message: msg });
                setInputError(otherCountryInput, otherCountryError, msg);
                if (!firstErrorElement) firstErrorElement = otherCountryInput;
            }
        }
        
        // Check purpose
        const purpose = document.querySelector('input[name="purpose"]:checked');
        if (!purpose) {
            const msg = '調査目的を選択してください / Please select a research purpose';
            errors.push({ field: 'purpose', message: msg });
            setInlineError(purposeError, msg);
            if (!firstErrorElement) firstErrorElement = document.querySelector('input[name="purpose"]');
        }
        
        // Check additional URLs format (if provided)
        const additionalUrlsInput = document.getElementById('additionalUrls');
        const additionalUrls = additionalUrlsInput.value.trim();
        if (additionalUrls) {
            const urls = additionalUrls.split(',').map(u => u.trim()).filter(u => u);
            const urlPattern = /^https?:\/\/.+/i;
            const invalidUrls = urls.filter(u => !urlPattern.test(u));
            if (invalidUrls.length > 0) {
                const msg = 'URLはhttp://またはhttps://形式で / URL must start with http:// or https://';
                errors.push({ field: 'additionalUrls', message: msg });
                setInputError(additionalUrlsInput, additionalUrlsError, msg);
                if (!firstErrorElement) firstErrorElement = additionalUrlsInput;
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            firstErrorElement: firstErrorElement
        };
    }

    /**
     * Clear all inline errors
     */
    function clearAllInlineErrors() {
        // Clear inline error messages
        [schoolNameError, countryError, otherCountryError, purposeError, additionalUrlsError].forEach(el => {
            if (el) {
                el.textContent = '';
                el.classList.remove('show');
            }
        });
        
        // Clear input error states
        document.querySelectorAll('.input-error').forEach(input => {
            input.classList.remove('input-error');
            input.removeAttribute('aria-invalid');
        });
    }

    /**
     * Set input error state with inline message
     * @param {HTMLElement} input
     * @param {HTMLElement} errorSpan
     * @param {string} message
     */
    function setInputError(input, errorSpan, message) {
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');
        if (errorSpan) {
            setInlineError(errorSpan, message);
        }
    }

    /**
     * Set inline error message
     * @param {HTMLElement} errorSpan
     * @param {string} message
     */
    function setInlineError(errorSpan, message) {
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }

    /**
     * Clear input error state
     * @param {HTMLElement} input
     * @param {HTMLElement} errorSpan
     */
    function clearInputError(input, errorSpan) {
        input.classList.remove('input-error');
        input.removeAttribute('aria-invalid');
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.classList.remove('show');
        }
    }

    /**
     * Scroll to first error element smoothly
     * @param {HTMLElement} element
     */
    function scrollToError(element) {
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Focus after scroll completes
            setTimeout(() => {
                element.focus();
            }, 500);
        }
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
        
        // Disable copy button until modal is confirmed
        disableCopyButton();
        
        // Show verification modal
        showVerificationModal();
        
        // Scroll to output (after modal is closed, user will see the output)
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
            alert('Copy failed. Please select and copy manually. / コピー失敗。手動でコピーしてください。');
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
