/**
 * Country-specific education data for School Research Prompt Generator
 * Phase 1: China, Korea, Vietnam
 */

const countryData = {
    // ===== CHINA =====
    "China": {
        localName: "中国",
        localLanguage: "Chinese (Simplified)",
        educationSystem: {
            totalYears: 12,
            structure: "Primary (6 years) + Junior Secondary (3 years) + Senior Secondary (3 years)",
            highSchoolName: "高中 (Gaozhong)",
            graduationMonth: "June/July",
            academicCalendar: "September - June"
        },
        schoolTypes: {
            academic: [
                "普通高中 (Regular High School) - Eligible for Standard A",
                "重点中学 (Key School) - Prestigious government-designated schools"
            ],
            vocational: [
                "职业高中 (Vocational High School) - NOT eligible for Standard A",
                "中专 (Secondary Specialized School) - NOT eligible for Standard A",
                "技工学校 (Technical School) - NOT eligible"
            ],
            international: [
                "国际学校 (International School) - Check Standard B/D",
                "国际部 (International Department) - Check accreditation"
            ]
        },
        officialSources: [
            { name: "Ministry of Education (教育部)", url: "http://www.moe.gov.cn/" },
            { name: "China Higher Education Student Info (学信网)", url: "https://www.chsi.com.cn/" },
            { name: "Beijing Education Commission (北京市教育委员会)", url: "http://jw.beijing.gov.cn/" },
            { name: "Shanghai Education Commission (上海市教育委员会)", url: "https://edu.sh.gov.cn/" },
            { name: "Guangdong Education Department (广东省教育厅)", url: "http://edu.gd.gov.cn/" },
            { name: "Jiangsu Education Department (江苏省教育厅)", url: "http://jyt.jiangsu.gov.cn/" },
            { name: "Zhejiang Education Department (浙江省教育厅)", url: "http://jyt.zj.gov.cn/" }
        ],
        searchQueries: {
            english: [
                "[School Name] [City] China high school",
                "[School Name] official website",
                "[School Name] WASC accreditation"
            ],
            local: [
                "[学校名] 官网",
                "[学校名] 学校简介",
                "[学校名] 招生信息",
                "[城市] [学校名] 高级中学",
                "site:edu.cn [学校名]"
            ]
        },
        warnings: [
            "CRITICAL: Verify the school is 普通高中 (regular high school), NOT 职业高中 (vocational) or 中专 (technical secondary)",
            "Provincial education databases are often more comprehensive than national ones",
            "Many legitimate Chinese schools have limited English web presence",
            "If the school has 国际部 (International Department), verify accreditation separately"
        ],
        eligibilityNotes: {
            standardA: "普通高中 (Regular High School) graduates with 12 years of education",
            standardB: "Schools with WASC, CIS, Cognia, or other recognized accreditation",
            vocationalWarning: "职业高中 and 中专 graduates are NOT eligible for Standard A"
        },
        vocabularyReference: [
            { english: "High School", local: "高中 / 高级中学", romanization: "Gaozhong" },
            { english: "Graduation Certificate", local: "毕业证书", romanization: "Biye Zhengshu" },
            { english: "College Entrance Exam", local: "高考", romanization: "Gaokao" },
            { english: "Public School", local: "公立学校", romanization: "Gongli Xuexiao" },
            { english: "Private School", local: "私立学校 / 民办学校", romanization: "Sili / Minban Xuexiao" },
            { english: "Key School", local: "重点中学", romanization: "Zhongdian Zhongxue" },
            { english: "Vocational High School", local: "职业高中", romanization: "Zhiye Gaozhong" }
        ]
    },

    // ===== KOREA =====
    "Korea": {
        localName: "한국",
        localLanguage: "Korean",
        educationSystem: {
            totalYears: 12,
            structure: "Primary (6 years) + Middle (3 years) + High (3 years)",
            highSchoolName: "고등학교 (Godeunghakgyo)",
            graduationMonth: "February",
            academicCalendar: "March - February"
        },
        schoolTypes: {
            academic: [
                "일반고 (General High School) - Standard A eligible",
                "특수목적고/특목고 (Specialized High School) - Foreign language, science, arts - Standard A eligible",
                "자율형사립고/자사고 (Autonomous Private High School) - Standard A eligible",
                "자율형공립고 (Autonomous Public High School) - Standard A eligible"
            ],
            vocational: [
                "특성화고 (Specialized Vocational High School) - Requires Review",
                "마이스터고 (Meister High School) - Industry-specific vocational - Requires Review"
            ],
            international: [
                "International schools (SIS, KIS, etc.) - Check Standard B/D"
            ]
        },
        officialSources: [
            { name: "School Info (학교알리미)", url: "https://www.schoolinfo.go.kr/" },
            { name: "Ministry of Education (교육부)", url: "https://www.moe.go.kr/" },
            { name: "Korea Education Statistics (교육통계서비스)", url: "https://kess.kedi.re.kr/" },
            { name: "Seoul Metropolitan Office of Education", url: "https://www.sen.go.kr/" },
            { name: "Busan Metropolitan Office of Education", url: "https://www.pen.go.kr/" },
            { name: "Gyeonggi Provincial Office of Education", url: "https://www.goe.go.kr/" }
        ],
        searchQueries: {
            english: [
                "[School Name] [City] Korea high school",
                "[School Name] official website",
                "site:schoolinfo.go.kr [School Name]"
            ],
            local: [
                "[학교명] 학교알리미",
                "[학교명] 학교정보",
                "[학교명] 고등학교 공시정보",
                "[지역] [학교명] 고등학교"
            ]
        },
        warnings: [
            "Use 학교알리미 (schoolinfo.go.kr) as the primary verification source",
            "특성화고 and 마이스터고 require careful review - document specific program type",
            "Korean schools in Japan (朝鮮高級学校) require Standard I individual review - NOT Standard A",
            "Verify school type: 일반고 vs 특성화고 vs 마이스터고"
        ],
        eligibilityNotes: {
            standardA: "일반고, 특목고, 자사고 graduates with 12 years of education",
            standardI: "朝鮮高級学校 (Korean schools in Japan) require individual review",
            vocationalWarning: "특성화고 and 마이스터고 require individual assessment"
        },
        specialCases: [
            {
                type: "Korean Schools in Japan (朝鮮高級学校)",
                description: "Korean ethnic schools in Japan (朝鮮高級学校) are NOT eligible under Standard A. They require individual review under Standard I.",
                identification: "School name contains 朝鮮 + 高級学校 (e.g., 東京朝鮮中高級学校)"
            }
        ],
        vocabularyReference: [
            { english: "High School", local: "고등학교", romanization: "Godeunghakgyo" },
            { english: "Graduation Certificate", local: "졸업증명서", romanization: "Joreop Jeungmyeongseo" },
            { english: "College Entrance Exam (CSAT)", local: "수능", romanization: "Suneung" },
            { english: "Public School", local: "공립학교", romanization: "Gongnip Hakgyo" },
            { english: "Private School", local: "사립학교", romanization: "Sarip Hakgyo" },
            { english: "General High School", local: "일반고등학교", romanization: "Ilban Godeunghakgyo" },
            { english: "Foreign Language High School", local: "외국어고등학교", romanization: "Oegugeo Godeunghakgyo" }
        ]
    },

    // ===== VIETNAM =====
    "Vietnam": {
        localName: "Việt Nam",
        localLanguage: "Vietnamese",
        educationSystem: {
            totalYears: 12,
            structure: "Primary (5 years) + Lower Secondary (4 years) + Upper Secondary (3 years)",
            highSchoolName: "Trung học phổ thông (THPT)",
            graduationMonth: "May/June",
            academicCalendar: "September - May"
        },
        schoolTypes: {
            academic: [
                "Trường THPT công lập (Public High School) - Standard A eligible",
                "Trường THPT tư thục (Private High School) - Standard A eligible",
                "Trường THPT chuyên (Specialized/Gifted High School) - Standard A eligible"
            ],
            vocational: [
                "Trường nghề (Vocational School) - NOT eligible for Standard A",
                "Trung cấp (Intermediate Vocational) - NOT eligible for Standard A"
            ],
            other: [
                "Trung tâm GDTX (Continuing Education Center) - Requires Review",
                "Trường quốc tế (International School) - Check Standard B/D"
            ]
        },
        officialSources: [
            { name: "Ministry of Education (Bộ GD&ĐT)", url: "https://moet.gov.vn/" },
            { name: "Hanoi Department of Education", url: "https://hanoi.edu.vn/" },
            { name: "Ho Chi Minh City Department of Education", url: "https://hcm.edu.vn/" },
            { name: "Da Nang Department of Education", url: "https://danang.edu.vn/" },
            { name: "Education Testing and Quality Assurance", url: "https://qdgd.edu.vn/" }
        ],
        searchQueries: {
            english: [
                "[School Name] Vietnam high school",
                "[School Name] THPT official website",
                "[School Name] Ho Chi Minh City / Hanoi high school"
            ],
            local: [
                "Trường THPT [tên trường] [tỉnh/thành phố]",
                "[tên trường] THPT thông tin trường",
                "[tên trường] website chính thức",
                "Sở GD&ĐT [tỉnh] trường THPT [tên]",
                "site:edu.vn [tên trường]"
            ]
        },
        warnings: [
            "Verify the school is THPT (upper secondary), NOT THCS (lower secondary only)",
            "Many Vietnamese schools have limited English web presence - use provincial education department records",
            "Trường nghề (vocational) and Trung cấp are NOT eligible for Standard A",
            "Trung tâm GDTX (Continuing Education) requires careful review",
            "Search with and without Vietnamese diacritics (Hà Nội vs Ha Noi)"
        ],
        eligibilityNotes: {
            standardA: "THPT graduates (Trường THPT công lập, tư thục, chuyên) with 12 years of education",
            specializedSchools: "Trường THPT chuyên (specialized/gifted schools) are fully eligible under Standard A",
            vocationalWarning: "Trường nghề and Trung cấp are NOT eligible for Standard A"
        },
        specialCases: [
            {
                type: "Specialized High Schools (Trường THPT chuyên)",
                description: "Elite public schools for gifted students. Fully eligible under Standard A.",
                examples: "THPT chuyên Hà Nội - Amsterdam, THPT chuyên Lê Hồng Phong, THPT Năng khiếu"
            }
        ],
        vocabularyReference: [
            { english: "High School", local: "Trường THPT / Trung học phổ thông", romanization: "-" },
            { english: "Junior High", local: "Trường THCS / Trung học cơ sở", romanization: "-" },
            { english: "Graduation", local: "Tốt nghiệp", romanization: "-" },
            { english: "Diploma", local: "Bằng tốt nghiệp", romanization: "-" },
            { english: "Public School", local: "Trường công lập", romanization: "-" },
            { english: "Private School", local: "Trường tư thục", romanization: "-" },
            { english: "Specialized School", local: "Trường chuyên", romanization: "-" },
            { english: "Vocational School", local: "Trường nghề", romanization: "-" },
            { english: "National Graduation Exam", local: "Kỳ thi tốt nghiệp THPT", romanization: "-" }
        ]
    },

    // ===== OTHER (Generic Template) =====
    "Other": {
        localName: null,
        localLanguage: null,
        educationSystem: {
            totalYears: "Verify locally",
            structure: "Varies by country",
            highSchoolName: "Upper Secondary / High School",
            graduationMonth: "Varies",
            academicCalendar: "Varies"
        },
        schoolTypes: {
            academic: ["Regular/General High School - Check local requirements"],
            vocational: ["Vocational/Technical schools - Requires Review"],
            international: ["International schools - Check Standard B/D accreditation"]
        },
        officialSources: [
            { name: "WASC Directory", url: "https://www.acswasc.org/wasc/schools-directory/" },
            { name: "CIS Directory", url: "https://www.cis.org/find-a-cis-school" },
            { name: "Cognia Directory", url: "https://www.cognia.org/institutions/" },
            { name: "IB World Schools", url: "https://www.ibo.org/programmes/find-an-ib-school/" }
        ],
        searchQueries: {
            english: [
                "[School Name] [Country] high school",
                "[School Name] official website",
                "[School Name] accreditation WASC CIS",
                "[School Name] Ministry of Education [Country]"
            ],
            local: []
        },
        warnings: [
            "Verify the total years of education in this country's education system",
            "Check if the school type is academic (general) vs vocational",
            "Search for international accreditation (WASC, CIS, Cognia, NEASC, ACSI)",
            "Confirm the school is government-recognized"
        ],
        eligibilityNotes: {
            standardA: "12-year education completion in a recognized academic track",
            standardB: "Internationally accredited schools (WASC, CIS, Cognia, NEASC, ACSI)",
            standardD: "IB Diploma, A-Level, Abitur, or equivalent international qualifications"
        },
        vocabularyReference: []
    }
};

// Accreditation organizations data (for all countries)
const accreditationData = {
    organizations: [
        { name: "WASC", fullName: "Western Association of Schools and Colleges", url: "https://www.acswasc.org/wasc/schools-directory/", type: "Accreditation" },
        { name: "NEASC/ACE", fullName: "New England Association / ACE", url: "https://www.aceisglobal.org/", type: "Accreditation" },
        { name: "Cognia", fullName: "Cognia (formerly AdvancED/SACS)", url: "https://www.cognia.org/institutions/", type: "Accreditation" },
        { name: "CIS", fullName: "Council of International Schools", url: "https://www.cis.org/find-a-cis-school", type: "Accreditation" },
        { name: "ACSI", fullName: "Association of Christian Schools International", url: "https://www.acsi.org/school-services/accreditation", type: "Accreditation" },
        { name: "COBIS", fullName: "Council of British International Schools", url: "https://www.cobis.org.uk/membership/our-members", type: "Membership (NOT Accreditation)" }
    ],
    warning: "COBIS is primarily a MEMBERSHIP organization, not accreditation. COBIS membership alone does NOT qualify for Standard B."
};

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { countryData, accreditationData };
}
