/**
 * Country-specific education data for School Research Prompt Generator
 * Phase 1: China, Korea, Vietnam
 * Phase 2: Taiwan, Thailand, Indonesia, Malaysia, Philippines, India, Japan
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
    },

    // ===== TAIWAN =====
    "Taiwan": {
        localName: "台灣",
        localLanguage: "Traditional Chinese",
        educationSystem: {
            totalYears: 12,
            structure: "Primary (6 years) + Junior High (3 years) + Senior High (3 years)",
            highSchoolName: "高級中等學校 (高中)",
            graduationMonth: "June",
            academicCalendar: "September - June"
        },
        schoolTypes: {
            academic: [
                "普通型高中 (Regular High School) - Standard A eligible",
                "單科型高中 (Specialized Single-Subject High School) - Standard A eligible",
                "綜合型高中 (Comprehensive High School) - Standard A (verify academic track)"
            ],
            vocational: [
                "技術型高中/高職 (Technical/Vocational High School) - Requires Review",
                "五專 (5-year Junior College) - NOT high school equivalent"
            ],
            international: [
                "International schools - Check Standard B/D"
            ]
        },
        officialSources: [
            { name: "Ministry of Education (教育部)", url: "https://www.edu.tw/" },
            { name: "Senior High School Info System", url: "https://www.senior.edu.tw/" },
            { name: "K-12 Education Administration (國教署)", url: "https://www.k12ea.gov.tw/" },
            { name: "Taipei City Education Bureau", url: "https://www.doe.gov.taipei/" },
            { name: "New Taipei Education Bureau", url: "https://www.ntpc.edu.tw/" }
        ],
        searchQueries: {
            english: [
                "[School Name] Taiwan high school",
                "[School Name] official website",
                "[School Name] senior high school Taipei"
            ],
            local: [
                "[學校名] 官網",
                "[學校名] 學校簡介",
                "[學校名] 高級中學",
                "[縣市] [學校名] 高中",
                "site:edu.tw [學校名]"
            ]
        },
        warnings: [
            "Taiwan uses Traditional Chinese (繁體字), NOT Simplified Chinese",
            "Verify school type: 普通型高中 (academic) vs 技術型高中 (vocational)",
            "綜合型高中 students - verify if they were in academic or vocational track",
            "五專 (5-year junior college) is NOT equivalent to high school"
        ],
        eligibilityNotes: {
            standardA: "普通型高中 and 單科型高中 graduates with 12 years of education",
            comprehensiveNote: "綜合型高中 - verify student's specific track (academic vs vocational)",
            vocationalWarning: "技術型高中 (高職) requires individual review"
        },
        vocabularyReference: [
            { english: "High School", local: "高中 / 高級中學", romanization: "Gaozhong" },
            { english: "University Entrance Exam", local: "學測 (GSAT)", romanization: "Xuece" },
            { english: "Diploma", local: "高中畢業證書", romanization: "Gaozhong Biye Zhengshu" },
            { english: "Public School", local: "公立", romanization: "Gongli" },
            { english: "Private School", local: "私立", romanization: "Sili" },
            { english: "Vocational High School", local: "技術型高中 / 高職", romanization: "Gaozhi" }
        ]
    },

    // ===== THAILAND =====
    "Thailand": {
        localName: "ประเทศไทย",
        localLanguage: "Thai",
        educationSystem: {
            totalYears: 12,
            structure: "Primary (6 years) + Lower Secondary (3 years) + Upper Secondary (3 years)",
            highSchoolName: "มัธยมศึกษาตอนปลาย (M.4-M.6)",
            graduationMonth: "March",
            academicCalendar: "May - March"
        },
        schoolTypes: {
            academic: [
                "โรงเรียนรัฐบาล (Government School) - Standard A eligible",
                "โรงเรียนเอกชน (Private School) - Standard A eligible",
                "โรงเรียนสาธิต (Demonstration School) - Standard A eligible"
            ],
            vocational: [
                "วิทยาลัยอาชีวศึกษา (Vocational College) - Requires Review",
                "ปวช. (Vocational Certificate) - NOT equivalent to M.6"
            ],
            international: [
                "โรงเรียนนานาชาติ (International School) - Check Standard B/D"
            ]
        },
        officialSources: [
            { name: "Ministry of Education (กระทรวงศึกษาธิการ)", url: "https://www.moe.go.th/" },
            { name: "OBEC (สพฐ.) - Basic Education", url: "https://www.obec.go.th/" },
            { name: "OPEC (สช.) - Private Education", url: "https://www.opec.go.th/" },
            { name: "School Database (BOPP)", url: "https://data.bopp-obec.info/" }
        ],
        searchQueries: {
            english: [
                "[School Name] Thailand high school",
                "[School Name] Bangkok school",
                "[School Name] official website"
            ],
            local: [
                "โรงเรียน[ชื่อโรงเรียน]",
                "โรงเรียน[ชื่อ] มัธยมศึกษา",
                "[ชื่อโรงเรียน] ข้อมูลโรงเรียน",
                "[ชื่อโรงเรียน] สพฐ",
                "site:obec.go.th [school name]"
            ]
        },
        warnings: [
            "Verify school offers มัธยมศึกษาตอนปลาย (M.4-M.6 / upper secondary)",
            "วิทยาลัยอาชีวศึกษา (Vocational College) is different from academic high school",
            "Thailand has many international schools - check accreditation for Standard B",
            "Buddhist schools (โรงเรียนพระปริยัติธรรม) require careful review"
        ],
        eligibilityNotes: {
            standardA: "Graduates completing M.6 (มัธยมศึกษาปีที่ 6) with 12 years of education",
            standardB: "International schools with WASC, CIS, etc. accreditation",
            vocationalWarning: "Vocational certificate (ปวช.) is NOT equivalent to M.6"
        },
        vocabularyReference: [
            { english: "High School", local: "โรงเรียนมัธยม", romanization: "Rongrian Matthayom" },
            { english: "Upper Secondary", local: "มัธยมศึกษาตอนปลาย", romanization: "Matthayom Suksa Ton Plai" },
            { english: "Grade 12 (M.6)", local: "มัธยมศึกษาปีที่ 6 (ม.6)", romanization: "Matthayom 6" },
            { english: "Government School", local: "โรงเรียนรัฐบาล", romanization: "Rongrian Ratthaban" },
            { english: "Private School", local: "โรงเรียนเอกชน", romanization: "Rongrian Ekachon" },
            { english: "Demonstration School", local: "โรงเรียนสาธิต", romanization: "Rongrian Sathit" }
        ]
    },

    // ===== INDONESIA =====
    "Indonesia": {
        localName: "Indonesia",
        localLanguage: "Indonesian (Bahasa Indonesia)",
        educationSystem: {
            totalYears: 12,
            structure: "Primary (6 years) + Junior Secondary (3 years) + Senior Secondary (3 years)",
            highSchoolName: "Sekolah Menengah Atas (SMA)",
            graduationMonth: "May/June",
            academicCalendar: "July - June"
        },
        schoolTypes: {
            academic: [
                "SMA Negeri (Public Academic High School) - Standard A eligible",
                "SMA Swasta (Private Academic High School) - Standard A eligible",
                "Madrasah Aliyah/MA (Islamic High School) - Standard A eligible",
                "MAN (Public Islamic High School) - Standard A eligible"
            ],
            vocational: [
                "SMK Negeri (Public Vocational High School) - Requires Review",
                "SMK Swasta (Private Vocational High School) - Requires Review"
            ],
            international: [
                "International schools - Check Standard B/D"
            ]
        },
        officialSources: [
            { name: "Ministry of Education (Kemendikbud)", url: "https://www.kemdikbud.go.id/" },
            { name: "DAPODIK (School Database)", url: "https://dapo.kemdikbud.go.id/" },
            { name: "EMIS (Islamic School Database)", url: "https://emispendis.kemenag.go.id/" },
            { name: "Ministry of Religious Affairs", url: "https://kemenag.go.id/" }
        ],
        searchQueries: {
            english: [
                "[School Name] Indonesia high school",
                "[School Name] Jakarta/Surabaya/Bandung",
                "[School Name] SMA official website"
            ],
            local: [
                "SMA [nama sekolah] [kota/provinsi]",
                "SMAN [nomor] [kota]",
                "Madrasah Aliyah [nama] [kota]",
                "[nama sekolah] profil sekolah",
                "[nama sekolah] NPSN",
                "site:dapo.kemdikbud.go.id [nama sekolah]"
            ]
        },
        warnings: [
            "Indonesia has dual ministry system: Kemendikbud (SMA/SMK) and Kemenag (MA/MAN)",
            "SMA = Academic, SMK = Vocational, MA = Islamic (academic equivalent)",
            "NPSN (school registration number) can verify school status in DAPODIK",
            "Both SMA and MA issue equivalent diplomas (Ijazah)"
        ],
        eligibilityNotes: {
            standardA: "SMA and MA (Madrasah Aliyah) graduates with 12 years of education",
            islamicSchools: "Madrasah Aliyah (MA/MAN) is academically equivalent to SMA - Standard A eligible",
            vocationalWarning: "SMK (Vocational) requires individual review"
        },
        vocabularyReference: [
            { english: "Academic High School", local: "SMA (Sekolah Menengah Atas)", romanization: "-" },
            { english: "Vocational High School", local: "SMK (Sekolah Menengah Kejuruan)", romanization: "-" },
            { english: "Islamic High School", local: "Madrasah Aliyah (MA)", romanization: "-" },
            { english: "Public", local: "Negeri", romanization: "-" },
            { english: "Private", local: "Swasta", romanization: "-" },
            { english: "Diploma", local: "Ijazah", romanization: "-" },
            { english: "School Registration Number", local: "NPSN", romanization: "-" }
        ]
    },

    // ===== MALAYSIA =====
    "Malaysia": {
        localName: "Malaysia",
        localLanguage: "Malay (Bahasa Malaysia), Chinese, Tamil",
        educationSystem: {
            totalYears: "11-13 (see notes)",
            structure: "Primary (6) + Lower Secondary (3) + Upper Secondary (2) + Pre-U (1-2)",
            highSchoolName: "Sekolah Menengah",
            graduationMonth: "Varies by qualification",
            academicCalendar: "January - November"
        },
        schoolTypes: {
            academic: [
                "SMK (National Secondary School) - SPM only = 11 years (NOT sufficient)",
                "Form 6 / STPM - 13 years total - Standard A eligible",
                "Matriculation - 12 years total - Standard A eligible",
                "Chinese Independent School (独中) - UEC 12 years - Requires Review"
            ],
            vocational: [
                "SMK Vocational Track - Requires Review",
                "Technical Schools (SMT) - Requires Review"
            ],
            international: [
                "International schools (A-Level, IB) - Check Standard D"
            ]
        },
        officialSources: [
            { name: "Ministry of Education (MOE)", url: "https://www.moe.gov.my/" },
            { name: "Malaysian Examinations Council (STPM)", url: "https://www.mpm.edu.my/" },
            { name: "Malaysian Examinations Syndicate (SPM)", url: "https://www.lp.moe.gov.my/" },
            { name: "Matriculation Division", url: "https://www.matrikulasi.gov.my/" },
            { name: "Dong Zong (Chinese Independent Schools)", url: "https://www.dongzong.my/" }
        ],
        searchQueries: {
            english: [
                "[School Name] Malaysia secondary school",
                "[School Name] SPM STPM",
                "[School Name] official website"
            ],
            local: [
                "Sekolah Menengah [nama sekolah]",
                "SMK [nama sekolah] [negeri]",
                "[nama sekolah] laman web rasmi",
                "[学校名] 独立中学",
                "[学校名] 华文独中"
            ]
        },
        warnings: [
            "⚠️ CRITICAL: SPM alone (Form 5) = only 11 years - NOT sufficient for Standard A",
            "Student must have STPM (Form 6), Matriculation, or equivalent for Standard A",
            "Chinese Independent Schools (独中) issue UEC - requires careful review",
            "Determine exact qualification: SPM only vs SPM+STPM vs SPM+Matric vs UEC"
        ],
        eligibilityNotes: {
            standardA: "STPM (Form 6, 13 years) or Matriculation (12 years) required",
            standardD: "A-Level, IB Diploma holders",
            criticalWarning: "SPM alone (11 years) does NOT meet Standard A requirements",
            chineseIndependent: "UEC from Chinese Independent Schools (独中) requires individual review"
        },
        specialCases: [
            {
                type: "SPM vs STPM",
                description: "SPM (Sijil Pelajaran Malaysia) is Form 5 = 11 years only. STPM (Sijil Tinggi Persekolahan Malaysia) is Form 6 = 13 years total.",
                identification: "Check student's final qualification certificate"
            },
            {
                type: "Chinese Independent Schools (独中)",
                description: "60 Chinese-medium schools issuing UEC (Unified Examination Certificate). 12 years total but requires review as UEC is not universally recognized.",
                identification: "School name often includes 独立中学"
            }
        ],
        vocabularyReference: [
            { english: "Secondary School", local: "Sekolah Menengah", romanization: "-" },
            { english: "SPM Certificate", local: "Sijil Pelajaran Malaysia", romanization: "-" },
            { english: "STPM Certificate", local: "Sijil Tinggi Persekolahan Malaysia", romanization: "-" },
            { english: "Chinese Independent School", local: "华文独立中学 / 独中", romanization: "Duzhong" },
            { english: "UEC", local: "统考 (Unified Examination Certificate)", romanization: "Tongkao" },
            { english: "Matriculation", local: "Matrikulasi", romanization: "-" }
        ]
    },

    // ===== PHILIPPINES =====
    "Philippines": {
        localName: "Pilipinas",
        localLanguage: "Filipino, English",
        educationSystem: {
            totalYears: "10 (pre-2018) or 12+ (K-12, 2018+)",
            structure: "K-12: Kinder (1) + Elementary (6) + JHS (4) + SHS (2) = 13 years",
            highSchoolName: "Senior High School (SHS)",
            graduationMonth: "March/April",
            academicCalendar: "June - March or August - May"
        },
        schoolTypes: {
            academic: [
                "Public SHS - Standard A eligible (K-12 graduates 2018+)",
                "Private SHS - Standard A eligible (K-12 graduates 2018+)",
                "Science High School - Standard A eligible"
            ],
            vocational: [
                "TVL Track (Technical-Vocational-Livelihood) - Still SHS, Standard A eligible"
            ],
            preK12: [
                "Pre-K-12 graduates (before 2018) - Only 10 years - Requires Review"
            ]
        },
        officialSources: [
            { name: "Department of Education (DepEd)", url: "https://www.deped.gov.ph/" },
            { name: "DepEd K-12 Information", url: "https://www.deped.gov.ph/k-to-12/" },
            { name: "Commission on Higher Education (CHED)", url: "https://ched.gov.ph/" },
            { name: "TESDA (Technical-Vocational)", url: "https://www.tesda.gov.ph/" }
        ],
        searchQueries: {
            english: [
                "[School Name] Philippines high school",
                "[School Name] [City] high school",
                "[School Name] DepEd accredited",
                "[School Name] senior high school"
            ],
            local: []
        },
        warnings: [
            "⚠️ CRITICAL: Check student's graduation year!",
            "Pre-2018 graduates: Old 10-year system - may NOT meet Standard A",
            "2018+ graduates: K-12 system (12+ years) - meets Standard A",
            "K-12 was fully implemented starting 2018 (first SHS graduates)"
        ],
        eligibilityNotes: {
            standardA: "K-12 graduates (2018 onwards) with completed Senior High School - 12+ years",
            preK12Warning: "⚠️ Graduates BEFORE 2018 completed only 10 years - requires individual review",
            allTracks: "All SHS tracks (Academic, TVL, Sports, Arts) complete 12+ years under K-12"
        },
        specialCases: [
            {
                type: "K-12 Transition (CRITICAL)",
                description: "Philippines transitioned to K-12 system. First K-12 graduates were in 2018. Pre-2018 graduates only have 10 years of education.",
                identification: "Check graduation year: Before 2018 = 10 years, 2018+ = 12+ years"
            }
        ],
        vocabularyReference: [
            { english: "Senior High School", local: "Senior High School (SHS)", romanization: "-" },
            { english: "Junior High School", local: "Junior High School (JHS)", romanization: "-" },
            { english: "Grade 12", local: "Grade 12", romanization: "-" },
            { english: "K-12 System", local: "K to 12 Program", romanization: "-" },
            { english: "DepEd", local: "Department of Education", romanization: "-" }
        ]
    },

    // ===== INDIA =====
    "India": {
        localName: "भारत / India",
        localLanguage: "Hindi, English, Regional Languages",
        educationSystem: {
            totalYears: 12,
            structure: "Primary (5) + Upper Primary (3) + Secondary (2) + Higher Secondary (2) = 10+2 Pattern",
            highSchoolName: "Higher Secondary / Senior Secondary (Class 11-12)",
            graduationMonth: "March/April",
            academicCalendar: "April - March"
        },
        schoolTypes: {
            academic: [
                "CBSE Schools (Central Board) - Standard A eligible",
                "CISCE/ISC Schools (Private Board) - Standard A eligible",
                "State Board Schools - Standard A eligible",
                "Kendriya Vidyalaya (Central Schools) - Standard A eligible",
                "Navodaya Vidyalaya - Standard A eligible"
            ],
            vocational: [
                "Vocational streams in some boards - Requires Review"
            ],
            international: [
                "IB Schools - Standard D eligible",
                "Cambridge (IGCSE/A-Level) Schools - Standard D (A-Level)"
            ]
        },
        officialSources: [
            { name: "CBSE (Central Board)", url: "https://www.cbse.gov.in/" },
            { name: "CBSE School Directory", url: "https://www.cbse.gov.in/cbsenew/SchoolDirectory.html" },
            { name: "CISCE (ISC Board)", url: "https://www.cisce.org/" },
            { name: "CISCE School Search", url: "https://www.cisce.org/SchoolSearch.aspx" },
            { name: "Ministry of Education", url: "https://www.education.gov.in/" },
            { name: "UDISE+ (School Data)", url: "https://udiseplus.gov.in/" }
        ],
        searchQueries: {
            english: [
                "[School Name] CBSE affiliation",
                "[School Name] ICSE ISC",
                "[School Name] [State] board",
                "[School Name] [City] India",
                "site:cbse.gov.in [School Name]"
            ],
            local: []
        },
        warnings: [
            "India follows 10+2 pattern: Class 10 + Class 11-12 = 12 years total",
            "Multiple boards: CBSE, CISCE (ISC), State Boards - all provide 12 years",
            "CBSE schools have Affiliation Numbers - can be verified on CBSE website",
            "Class 12 board examination is required for Standard A eligibility"
        ],
        eligibilityNotes: {
            standardA: "Class 12 (10+2) graduates from CBSE, ISC, or State Boards - 12 years of education",
            standardD: "IB Diploma or A-Level holders",
            verification: "CBSE Affiliation Number or CISCE School Code can verify school status"
        },
        vocabularyReference: [
            { english: "Higher Secondary", local: "उच्च माध्यमिक / Higher Secondary", romanization: "-" },
            { english: "Class 12", local: "कक्षा 12 / Class XII", romanization: "-" },
            { english: "CBSE", local: "Central Board of Secondary Education", romanization: "-" },
            { english: "ISC", local: "Indian School Certificate", romanization: "-" },
            { english: "Board Exam", local: "बोर्ड परीक्षा / Board Examination", romanization: "-" }
        ]
    },

    // ===== JAPAN =====
    "Japan": {
        localName: "日本",
        localLanguage: "Japanese",
        educationSystem: {
            totalYears: 12,
            structure: "Primary (6 years) + Junior High (3 years) + High School (3 years)",
            highSchoolName: "高等学校 (Kōtōgakkō)",
            graduationMonth: "March",
            academicCalendar: "April - March"
        },
        schoolTypes: {
            academic: [
                "全日制高等学校 (Full-time High School) - Standard eligible",
                "中等教育学校 (Secondary Education School, 6-year) - Standard eligible"
            ],
            reviewRequired: [
                "定時制高等学校 (Part-time High School) - Review needed",
                "通信制高等学校 (Correspondence High School) - Review needed",
                "高等専門学校/高専 (Technical College, 3rd year) - Review needed",
                "専修学校高等課程 (Specialized Training School) - Review needed",
                "各種学校 (Miscellaneous School) - Review needed"
            ],
            international: [
                "International schools in Japan - Check Standard B or C"
            ]
        },
        officialSources: [
            { name: "文部科学省 (MEXT)", url: "https://www.mext.go.jp/" },
            { name: "学校基本調査", url: "https://www.mext.go.jp/b_menu/toukei/chousa01/kihon/1267995.htm" },
            { name: "全国学校データ (Gaccom)", url: "https://www.gaccom.jp/" },
            { name: "私学事業団", url: "https://www.shigaku.go.jp/" },
            { name: "高等学校等コード表", url: "https://www.dnc.ac.jp/" }
        ],
        searchQueries: {
            english: [
                "[School Name] Japan high school",
                "[School Name] official website",
                "[School Name] Tokyo/Osaka/etc."
            ],
            local: [
                "[学校名] 公式サイト",
                "[学校名] 高等学校",
                "[学校名] 学校情報",
                "[都道府県] [学校名] 高校",
                "site:ed.jp [学校名]"
            ]
        },
        warnings: [
            "Japan domestic schools have specific eligibility categories",
            "各種学校 (Miscellaneous School) category often includes international schools",
            "高等専門学校 (Kosen) requires specific year of completion verification",
            "Some correspondence schools (通信制) may require individual review"
        ],
        eligibilityNotes: {
            standard: "全日制高等学校 and 中等教育学校 graduates are eligible",
            standardC: "MEXT-accredited international schools in Japan qualify under Standard C",
            reviewCases: "Part-time, correspondence, and specialized schools require individual review"
        },
        vocabularyReference: [
            { english: "High School", local: "高等学校 / 高校", romanization: "Kōtōgakkō / Kōkō" },
            { english: "Full-time High School", local: "全日制高等学校", romanization: "Zennichi-sei" },
            { english: "Correspondence High School", local: "通信制高等学校", romanization: "Tsūshin-sei" },
            { english: "Technical College", local: "高等専門学校 (高専)", romanization: "Kōsen" },
            { english: "Diploma", local: "卒業証明書", romanization: "Sotsugyō Shōmeisho" },
            { english: "Public School", local: "公立", romanization: "Kōritsu" },
            { english: "Private School", local: "私立", romanization: "Shiritsu" }
        ]
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
