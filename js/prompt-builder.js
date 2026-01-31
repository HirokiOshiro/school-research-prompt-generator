/**
 * Prompt Builder for School Research Prompt Generator
 * Generates structured prompts based on user input and country data
 */

const PromptBuilder = {
    /**
     * Main function to build the complete prompt
     * @param {Object} formData - Data from the form
     * @returns {string} - Generated prompt
     */
    buildPrompt: function(formData) {
        const country = formData.country === 'Other' ? formData.otherCountry : formData.country;
        const countryInfo = countryData[formData.country] || countryData['Other'];
        
        let prompt = '';
        
        // 1. Role and Context
        prompt += this.buildRoleSection(country, countryInfo);
        
        // 2. School Information
        prompt += this.buildSchoolInfoSection(formData, country);
        
        // 3. Investigation Purpose
        prompt += this.buildPurposeSection(formData.purpose);
        
        // 4. Country-specific Education Context
        if (formData.country !== 'Other') {
            prompt += this.buildEducationContextSection(countryInfo);
        }
        
        // 5. Required Information
        prompt += this.buildRequiredInfoSection();
        
        // 6. Search Strategy
        prompt += this.buildSearchStrategySection(formData, countryInfo);
        
        // 7. Official Sources
        prompt += this.buildSourcesSection(countryInfo, formData.additionalUrls);
        
        // 8. Output Format
        prompt += this.buildOutputFormatSection();
        
        // 9. Important Notes and Warnings
        prompt += this.buildWarningsSection(countryInfo);
        
        return prompt;
    },

    /**
     * Build the role/context section
     */
    buildRoleSection: function(country, countryInfo) {
        let section = `You are an expert researcher specializing in international education systems`;
        
        if (countryInfo.localName) {
            section += `, with particular expertise in the ${country} (${countryInfo.localName}) education system`;
        } else {
            section += `, conducting research on schools in ${country}`;
        }
        
        section += `. Your task is to investigate and collect comprehensive information about a high school for university admissions records at Ritsumeikan University, Japan.\n\n`;
        
        return section;
    },

    /**
     * Build the school information section
     */
    buildSchoolInfoSection: function(formData, country) {
        let section = `## School to Investigate\n\n`;
        section += `- **School Name:** ${formData.schoolName}\n`;
        section += `- **Country:** ${country}\n`;
        
        if (formData.cityState) {
            section += `- **City/State/Province:** ${formData.cityState}\n`;
        }
        
        if (formData.schoolType) {
            const schoolTypeLabels = {
                'Public': 'Public (公立)',
                'Private': 'Private (私立)',
                'International': 'International School'
            };
            section += `- **School Type (if known):** ${schoolTypeLabels[formData.schoolType] || formData.schoolType}\n`;
        }
        
        if (formData.curriculum && formData.curriculum.length > 0) {
            const curriculumLabels = {
                'IB': 'International Baccalaureate (IB)',
                'A-Level': 'A-Level / Cambridge',
                'AP': 'Advanced Placement (AP)',
                'National': 'National Curriculum',
                'Unknown': 'Unknown'
            };
            const curricula = formData.curriculum.map(c => curriculumLabels[c] || c).join(', ');
            section += `- **Curriculum (if known):** ${curricula}\n`;
        }
        
        section += '\n';
        return section;
    },

    /**
     * Build the investigation purpose section
     */
    buildPurposeSection: function(purpose) {
        const purposes = {
            'new': {
                title: 'New School Registration',
                description: 'Collect comprehensive information for initial database entry. Verify all core fields and determine eligibility standard.'
            },
            'update': {
                title: 'Information Update',
                description: 'Update existing school record with current information. Verify contact details, accreditation status, and any changes to programs.'
            },
            'verify': {
                title: 'Eligibility Verification',
                description: 'Confirm school credentials and determine applicable Ritsumeikan entrance eligibility standard (A, B, C, D, etc.). Focus on accreditation and program verification.'
            }
        };
        
        const purposeInfo = purposes[purpose] || purposes['new'];
        
        let section = `## Investigation Purpose\n\n`;
        section += `**${purposeInfo.title}**\n\n`;
        section += `${purposeInfo.description}\n\n`;
        
        return section;
    },

    /**
     * Build the country-specific education context section
     */
    buildEducationContextSection: function(countryInfo) {
        let section = `## ${countryInfo.localName ? countryInfo.localName + ' / ' : ''}Education System Context\n\n`;
        
        // Education structure
        section += `### Education Structure\n`;
        section += `- **Total Years:** ${countryInfo.educationSystem.totalYears} years\n`;
        section += `- **Structure:** ${countryInfo.educationSystem.structure}\n`;
        section += `- **High School Term:** ${countryInfo.educationSystem.highSchoolName}\n`;
        section += `- **Graduation Month:** ${countryInfo.educationSystem.graduationMonth}\n`;
        section += `- **Academic Calendar:** ${countryInfo.educationSystem.academicCalendar}\n\n`;
        
        // School Types
        section += `### School Types\n\n`;
        
        section += `**Academic (Generally Standard A Eligible):**\n`;
        countryInfo.schoolTypes.academic.forEach(type => {
            section += `- ${type}\n`;
        });
        section += '\n';
        
        section += `**Vocational (Requires Review or NOT Eligible):**\n`;
        countryInfo.schoolTypes.vocational.forEach(type => {
            section += `- ${type}\n`;
        });
        section += '\n';
        
        if (countryInfo.schoolTypes.international) {
            section += `**International:**\n`;
            countryInfo.schoolTypes.international.forEach(type => {
                section += `- ${type}\n`;
            });
            section += '\n';
        }
        
        return section;
    },

    /**
     * Build the required information section
     */
    buildRequiredInfoSection: function() {
        let section = `## Required Information to Collect\n\n`;
        
        section += `### Priority 1 (必須 - Critical for Eligibility)\n`;
        section += `| Field | Description |\n`;
        section += `|-------|-------------|\n`;
        section += `| SchoolName_EN | Official English name |\n`;
        section += `| SchoolName_Local | Name in local language |\n`;
        section += `| Country | Country name |\n`;
        section += `| YearsOfEducation | Total years in education system (e.g., 12) |\n`;
        section += `| SchoolCategory | Academic / Vocational / International |\n`;
        section += `| SchoolType | High School, Secondary School, etc. |\n`;
        section += `| Curricula | National, IB, A-Level, AP, etc. |\n\n`;
        
        section += `### Priority 2 (重要 - Supports Assessment)\n`;
        section += `| Field | Description |\n`;
        section += `|-------|-------------|\n`;
        section += `| PublicPrivate | Public or Private |\n`;
        section += `| Accreditation | WASC, CIS, Cognia, etc. |\n`;
        section += `| DiplomaExams | National exams, SAT, AP exams, etc. |\n`;
        section += `| DiplomaIssued | Name of diploma/certificate issued |\n`;
        section += `| State_EN / City_EN | Location details |\n`;
        section += `| URL | Official website |\n\n`;
        
        section += `### Priority 3 (補足 - When Available)\n`;
        section += `| Field | Description |\n`;
        section += `|-------|-------------|\n`;
        section += `| Address_EN | Full address |\n`;
        section += `| Phone / Email | Contact information |\n`;
        section += `| Founded | Year established |\n`;
        section += `| TotalStudents | Enrollment |\n`;
        section += `| Coed | Coeducational / Boys / Girls |\n\n`;
        
        return section;
    },

    /**
     * Build the search strategy section
     */
    buildSearchStrategySection: function(formData, countryInfo) {
        const schoolName = formData.schoolName;
        const city = formData.cityState || '[City]';
        
        let section = `## Search Strategy\n\n`;
        
        // English searches
        section += `### English Searches\n`;
        section += '```\n';
        countryInfo.searchQueries.english.forEach(query => {
            const formattedQuery = query
                .replace('[School Name]', schoolName)
                .replace('[City]', city)
                .replace('[Country]', formData.country);
            section += formattedQuery + '\n';
        });
        section += '```\n\n';
        
        // Local language searches (if enabled)
        if (formData.includeLocalSearch && countryInfo.searchQueries.local && countryInfo.searchQueries.local.length > 0) {
            section += `### ${countryInfo.localLanguage || 'Local Language'} Searches\n`;
            section += '```\n';
            countryInfo.searchQueries.local.forEach(query => {
                section += query + '\n';
            });
            section += '```\n';
            section += `*Replace [学校名]/[학교명]/[tên trường] with the school name in local language if known.*\n\n`;
        }
        
        // Accreditation verification
        section += `### Accreditation Verification\n`;
        section += `Search these databases to verify international accreditation:\n`;
        accreditationData.organizations.forEach(org => {
            section += `- **${org.name}** (${org.type}): ${org.url}\n`;
        });
        section += `\n⚠️ **Note:** ${accreditationData.warning}\n\n`;
        
        return section;
    },

    /**
     * Build the official sources section
     */
    buildSourcesSection: function(countryInfo, additionalUrls) {
        let section = `## Official Sources to Check\n\n`;
        
        countryInfo.officialSources.forEach(source => {
            section += `- **${source.name}:** ${source.url}\n`;
        });
        
        // Add user-specified URLs
        if (additionalUrls && additionalUrls.trim()) {
            section += `\n### Additional URLs to Check\n`;
            const urls = additionalUrls.split(',').map(url => url.trim()).filter(url => url);
            urls.forEach(url => {
                section += `- ${url}\n`;
            });
        }
        
        section += '\n';
        return section;
    },

    /**
     * Build the output format section
     */
    buildOutputFormatSection: function() {
        let section = `## Output Format\n\n`;
        section += `Provide your findings in the following structured format:\n\n`;
        section += '```\n';
        section += `## School Investigation Results

### Basic Information
| Field | Value | Source URL |
|-------|-------|------------|
| SchoolName_EN | | |
| SchoolName_Local | | |
| Country | | |
| State/Province | | |
| City | | |
| Address | | |
| Phone | | |
| Email | | |
| Website | | |

### School Classification
| Field | Value |
|-------|-------|
| SchoolType | |
| PublicPrivate | |
| SchoolCategory | Academic / Vocational / International |
| Founded | |
| Coed | |

### Academic Program
| Field | Value |
|-------|-------|
| YearsOfEducation | |
| Curricula | |
| DiplomaExams | |
| DiplomaIssued | |
| GraduationMonth | |

### Accreditation Status
| Organization | Status | Verification Source |
|--------------|--------|---------------------|
| WASC | Found / Not Found | |
| CIS | Found / Not Found | |
| Cognia | Found / Not Found | |
| NEASC | Found / Not Found | |
| ACSI | Found / Not Found | |
| IBO (IB) | Found / Not Found | |

### Eligibility Assessment
- **Recommended Standard:** Standard A / B / D / Requires Review
- **Confidence Level:** High / Medium / Low
- **Reasoning:** [Explanation]

### Notes and Concerns
[Any issues, missing information, or recommendations]

### Sources Used
1. [URL] - [What was found]
2. [URL] - [What was found]
`;
        section += '```\n\n';
        
        return section;
    },

    /**
     * Build the warnings and notes section
     */
    buildWarningsSection: function(countryInfo) {
        let section = `## Important Notes\n\n`;
        
        // Country-specific warnings
        if (countryInfo.warnings && countryInfo.warnings.length > 0) {
            countryInfo.warnings.forEach(warning => {
                section += `⚠️ ${warning}\n\n`;
            });
        }
        
        // Eligibility notes
        if (countryInfo.eligibilityNotes) {
            section += `### Eligibility Guidelines\n\n`;
            if (countryInfo.eligibilityNotes.standardA) {
                section += `- **Standard A:** ${countryInfo.eligibilityNotes.standardA}\n`;
            }
            if (countryInfo.eligibilityNotes.standardB) {
                section += `- **Standard B:** ${countryInfo.eligibilityNotes.standardB}\n`;
            }
            if (countryInfo.eligibilityNotes.standardD) {
                section += `- **Standard D:** ${countryInfo.eligibilityNotes.standardD}\n`;
            }
            if (countryInfo.eligibilityNotes.standardI) {
                section += `- **Standard I:** ${countryInfo.eligibilityNotes.standardI}\n`;
            }
            if (countryInfo.eligibilityNotes.vocationalWarning) {
                section += `- **⚠️ Vocational:** ${countryInfo.eligibilityNotes.vocationalWarning}\n`;
            }
            section += '\n';
        }
        
        // Special cases
        if (countryInfo.specialCases && countryInfo.specialCases.length > 0) {
            section += `### Special Cases\n\n`;
            countryInfo.specialCases.forEach(specialCase => {
                section += `**${specialCase.type}:**\n`;
                section += `${specialCase.description}\n`;
                if (specialCase.identification) {
                    section += `*Identification:* ${specialCase.identification}\n`;
                }
                if (specialCase.examples) {
                    section += `*Examples:* ${specialCase.examples}\n`;
                }
                section += '\n';
            });
        }
        
        // Vocabulary reference (if local search enabled and vocabulary exists)
        if (countryInfo.vocabularyReference && countryInfo.vocabularyReference.length > 0) {
            section += `### Key Vocabulary Reference\n\n`;
            section += `| English | Local | Romanization |\n`;
            section += `|---------|-------|---------------|\n`;
            countryInfo.vocabularyReference.forEach(vocab => {
                section += `| ${vocab.english} | ${vocab.local} | ${vocab.romanization} |\n`;
            });
            section += '\n';
        }
        
        return section;
    }
};

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PromptBuilder;
}
