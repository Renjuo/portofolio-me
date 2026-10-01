// ============================================================
//  TERJEMAHAN CHATBOT - portfolio/data/translations.js
//  Bahasa: en (Inggris), zh (Mandarin), fr (Prancis).
//  Kunci setiap entri = nilai `topik` di data/knowledge.js.
//  Kalau menambah topik baru di knowledge.js, tambahkan juga di sini
//  (kalau tidak ada, chatbot memakai jawaban bahasa Indonesia).
// ============================================================

export const LANGS = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
  { code: "fr", label: "FR" },
];

export const uiText = {
  en: {
    namaBot: "Rafli's Assistant",
    sapaan:
      "Hi! I'm Rafli's assistant. Ask me anything about Rafli: internships, projects, skills, education, or how to contact him.",
    fallback:
      "Sorry, I can only answer questions about Rafli (experience, projects, skills, education, contact). Try asking about one of those.",
    terimaKasih: "You're welcome! Anything else you'd like to know about Rafli?",
    saran: ["Who is Rafli?", "Where does Rafli work now?", "What are his projects?", "How can I contact Rafli?"],
    placeholder: "Ask about Rafli...",
    kirim: "SEND",
  },
  zh: {
    namaBot: "Rafli 的助手",
    sapaan: "你好！我是 Rafli 的助手。你可以问我关于 Rafli 的任何问题：实习经历、项目、技能、教育背景或联系方式。",
    fallback: "抱歉，我只能回答关于 Rafli 的问题（经历、项目、技能、教育、联系方式）。请试着问其中一个吧。",
    terimaKasih: "不客气！还有什么想了解 Rafli 的吗？",
    saran: ["Rafli 是谁？", "Rafli 现在在哪里工作？", "他做过哪些项目？", "怎么联系 Rafli？"],
    placeholder: "问问关于 Rafli 的事...",
    kirim: "发送",
  },
  fr: {
    namaBot: "Assistant de Rafli",
    sapaan:
      "Bonjour ! Je suis l'assistant de Rafli. Posez-moi vos questions sur Rafli : stages, projets, compétences, formation ou comment le contacter.",
    fallback:
      "Désolé, je ne peux répondre qu'aux questions sur Rafli (expérience, projets, compétences, formation, contact). Essayez l'un de ces sujets.",
    terimaKasih: "Avec plaisir ! Autre chose à savoir sur Rafli ?",
    saran: ["Qui est Rafli ?", "Où travaille Rafli actuellement ?", "Quels sont ses projets ?", "Comment contacter Rafli ?"],
    placeholder: "Posez une question sur Rafli...",
    kirim: "ENVOYER",
  },
};

export const translations = {
  // ---------- PROFIL ----------
  Perkenalan: {
    en: {
      pertanyaan: ["who is rafli", "introduce yourself", "about rafli", "short profile", "full name"],
      jawaban:
        "Yahya Rafli Hidayah (usually called Rafli) is an Information Technology graduate from President University with a strong interest in Artificial Intelligence and Machine Learning. He has experience in web development and AI chatbot development through several internships, and is active in student organizations. He is known as adaptable, communicative, and a good team player.",
    },
    zh: {
      pertanyaan: ["Rafli 是谁", "介绍一下 Rafli", "关于 Rafli", "个人简介", "全名叫什么"],
      jawaban:
        "Yahya Rafli Hidayah（通常叫 Rafli）毕业于 President University 信息技术专业，对人工智能和机器学习有浓厚兴趣。他通过多次实习积累了网页开发和 AI 聊天机器人开发经验，也积极参加学生组织。他适应力强、善于沟通，并且喜欢团队合作。",
    },
    fr: {
      pertanyaan: ["qui est rafli", "présente-toi", "parle-moi de rafli", "profil", "nom complet"],
      jawaban:
        "Yahya Rafli Hidayah (appelé Rafli) est diplômé en Technologies de l'Information de la President University, avec un fort intérêt pour l'Intelligence Artificielle et le Machine Learning. Il a de l'expérience en développement web et en chatbots IA grâce à plusieurs stages, et il est actif dans des associations étudiantes. Il est reconnu pour son adaptabilité, sa communication et son esprit d'équipe.",
    },
  },
  "Status dan pekerjaan saat ini": {
    en: {
      pertanyaan: ["where does rafli work now", "current job", "what is rafli doing now", "current position", "current internship"],
      jawaban:
        "Currently (since September 2026) Rafli is a Web Developer intern at PT Testindo through the MagangHub program. He is working on adding a chart feature to one of the menus of an internal website, and redesigning the internal website.",
    },
    zh: {
      pertanyaan: ["Rafli 现在在哪里工作", "现在的工作", "目前在做什么", "现在的职位", "现在实习"],
      jawaban:
        "目前（自 2026 年 9 月起）Rafli 通过 MagangHub 项目在 PT Testindo 担任网页开发实习生。他正在为内部网站的某个菜单添加图表功能，并重新设计内部网站。",
    },
    fr: {
      pertanyaan: ["où travaille rafli actuellement", "travail actuel", "que fait rafli maintenant", "poste actuel", "stage actuel"],
      jawaban:
        "Actuellement (depuis septembre 2026), Rafli est stagiaire Développeur Web chez PT Testindo via le programme MagangHub. Il ajoute une fonctionnalité de graphiques à un menu d'un site web interne et en refait le design.",
    },
  },
  "Magang PT Testindo": {
    en: {
      pertanyaan: ["internship at testindo", "tasks at testindo", "chart on internal website", "internal website redesign", "what is maganghub"],
      jawaban:
        "PT Testindo (MagangHub), Web Developer Intern, since September 2026. Current tasks:\n- Adding a chart to one of the menus of the internal website\n- Redesigning the internal website",
    },
    zh: {
      pertanyaan: ["在 Testindo 实习", "Testindo 的工作内容", "内部网站图表", "内部网站重新设计", "MagangHub 是什么"],
      jawaban: "PT Testindo（MagangHub），网页开发实习生，自 2026 年 9 月起。目前的工作：\n- 在内部网站的某个菜单中添加图表\n- 重新设计内部网站",
    },
    fr: {
      pertanyaan: ["stage chez testindo", "missions chez testindo", "graphique site interne", "refonte du site interne", "qu'est-ce que maganghub"],
      jawaban:
        "PT Testindo (MagangHub), stagiaire Développeur Web, depuis septembre 2026. Missions actuelles :\n- Ajouter un graphique à l'un des menus du site web interne\n- Refaire le design du site web interne",
    },
  },

  // ---------- PENDIDIKAN ----------
  Pendidikan: {
    en: {
      pertanyaan: ["where did rafli study", "education", "university", "what major", "degree", "when did he graduate"],
      jawaban:
        "Rafli studied a Bachelor's degree in Information Technology at President University (Cikarang), September 2022 - October 2025. He has completed his bachelor thesis defense.",
    },
    zh: {
      pertanyaan: ["Rafli 在哪里上大学", "教育背景", "学历", "什么专业", "哪个大学毕业", "什么时候毕业"],
      jawaban: "Rafli 在 President University（芝卡朗）攻读信息技术学士学位，2022 年 9 月至 2025 年 10 月。他已完成本科毕业论文答辩。",
    },
    fr: {
      pertanyaan: ["où a étudié rafli", "formation", "études", "université", "quel diplôme", "quand a-t-il obtenu son diplôme"],
      jawaban:
        "Rafli a suivi une licence en Technologies de l'Information à la President University (Cikarang), de septembre 2022 à octobre 2025. Il a soutenu son mémoire de licence.",
    },
  },
  IPK: {
    en: { pertanyaan: ["what is rafli's gpa", "gpa", "grades", "grade point average"], jawaban: "Rafli's GPA is 3.34 out of 4.00." },
    zh: { pertanyaan: ["Rafli 的 GPA 是多少", "绩点", "成绩", "平均绩点"], jawaban: "Rafli 的 GPA 是 3.34（满分 4.00）。" },
    fr: { pertanyaan: ["quelle est la moyenne de rafli", "gpa", "notes", "moyenne générale"], jawaban: "La moyenne (GPA) de Rafli est de 3,34 sur 4,00." },
  },
  "Mata kuliah": {
    en: {
      pertanyaan: ["what courses did he take", "relevant courses", "subjects studied", "coursework"],
      jawaban:
        "Relevant courses: Natural Language Processing, Computer Vision, Intelligent Robotics, Web Programming, Server-Side Internet Programming, Computer Network. Also Artificial Intelligence, Deep Learning, Image Processing and Recognition, Database System, Network Security, Operating System Design, Distributed and Parallel System, 3D Computer Graphics and Animation, Object Oriented and Visual Programming, and Data Structure and Algorithm.",
    },
    zh: {
      pertanyaan: ["学过哪些课程", "相关课程", "主修课程", "学了什么课"],
      jawaban:
        "相关课程：自然语言处理、计算机视觉、智能机器人、网页编程、服务器端互联网编程、计算机网络。此外还有人工智能、深度学习、图像处理与识别、数据库系统、网络安全、操作系统设计、分布式与并行系统、3D 计算机图形与动画、面向对象与可视化编程，以及数据结构与算法。",
    },
    fr: {
      pertanyaan: ["quels cours a-t-il suivis", "cours pertinents", "matières étudiées"],
      jawaban:
        "Cours pertinents : Traitement du Langage Naturel, Vision par Ordinateur, Robotique Intelligente, Programmation Web, Programmation Internet côté serveur, Réseaux Informatiques. Également : Intelligence Artificielle, Deep Learning, Traitement et Reconnaissance d'Images, Bases de Données, Sécurité Réseau, Conception de Systèmes d'Exploitation, Systèmes Distribués et Parallèles, Infographie 3D et Animation, Programmation Orientée Objet et Visuelle, et Structures de Données et Algorithmes.",
    },
  },
  Sertifikat: {
    en: {
      pertanyaan: ["what certificates does rafli have", "certifications", "courses taken", "training"],
      jawaban:
        "Rafli's certificates: Generative AI for Information System (Puslitbang SDP3I), a Bachelor Defense Completion certificate, and a bachelor's recommendation letter.",
    },
    zh: {
      pertanyaan: ["Rafli 有哪些证书", "证书", "认证", "培训课程"],
      jawaban: "Rafli 的证书：Generative AI for Information System（Puslitbang SDP3I）、本科答辩完成证书，以及本科推荐信。",
    },
    fr: {
      pertanyaan: ["quels certificats a rafli", "certifications", "formations suivies"],
      jawaban:
        "Certificats de Rafli : Generative AI for Information System (Puslitbang SDP3I), un certificat de soutenance de licence, et une lettre de recommandation.",
    },
  },
  Prestasi: {
    en: {
      pertanyaan: ["rafli's achievements", "awards", "has he won any competition", "badminton competition"],
      jawaban:
        "Rafli won runner-up (2nd place) in the badminton competition at the Computing Sports and Games Olympics (CSGO), President University, on March 4, 2023.",
    },
    zh: {
      pertanyaan: ["Rafli 的成就", "获得过什么奖", "比赛获奖", "羽毛球比赛"],
      jawaban: "Rafli 于 2023 年 3 月 4 日在 President University 的 Computing Sports and Games Olympics（CSGO）羽毛球比赛中获得亚军（第二名）。",
    },
    fr: {
      pertanyaan: ["réussites de rafli", "prix", "a-t-il gagné une compétition", "tournoi de badminton"],
      jawaban:
        "Rafli a terminé deuxième du tournoi de badminton des Computing Sports and Games Olympics (CSGO) à la President University, le 4 mars 2023.",
    },
  },

  // ---------- SKILL ----------
  "Skill teknis": {
    en: {
      pertanyaan: ["what are rafli's skills", "technical skills", "tech stack", "programming languages", "what technologies does he know"],
      jawaban:
        "Rafli's technical skills:\n- Languages: Python, HTML, CSS, C++, PHP, plus knowledge of Java and JavaScript\n- Web: React, PHP + MySQL, ASP.NET, Flask, Figma for UI design\n- Databases: MySQL, SQL Server (SSMS)\n- AI/ML: NLP, computer vision, AI chatbots, Hugging Face Transformers, OpenCV\n- Game dev: Unreal Engine 5 (Blueprints)",
    },
    zh: {
      pertanyaan: ["Rafli 有什么技能", "技术技能", "技术栈", "会什么编程语言", "掌握哪些技术"],
      jawaban:
        "Rafli 的技术技能：\n- 语言：Python、HTML、CSS、C++、PHP，并了解 Java 和 JavaScript\n- 网页：React、PHP + MySQL、ASP.NET、Flask，用 Figma 做界面设计\n- 数据库：MySQL、SQL Server（SSMS）\n- AI/机器学习：自然语言处理、计算机视觉、AI 聊天机器人、Hugging Face Transformers、OpenCV\n- 游戏开发：Unreal Engine 5（Blueprints）",
    },
    fr: {
      pertanyaan: ["quelles sont les compétences de rafli", "compétences techniques", "stack technique", "langages de programmation", "technologies maîtrisées"],
      jawaban:
        "Compétences techniques de Rafli :\n- Langages : Python, HTML, CSS, C++, PHP, ainsi que des notions de Java et JavaScript\n- Web : React, PHP + MySQL, ASP.NET, Flask, Figma pour le design UI\n- Bases de données : MySQL, SQL Server (SSMS)\n- IA/ML : NLP, vision par ordinateur, chatbots IA, Hugging Face Transformers, OpenCV\n- Jeux vidéo : Unreal Engine 5 (Blueprints)",
    },
  },
  "Soft skill": {
    en: {
      pertanyaan: ["rafli's soft skills", "personality", "strengths", "character"],
      jawaban: "Rafli's soft skills: collaboration and teamwork, analytical thinking, networking, adaptability, and good communication.",
    },
    zh: {
      pertanyaan: ["Rafli 的软技能", "性格", "优点", "个性"],
      jawaban: "Rafli 的软技能：协作与团队合作、分析思维、人际交往、适应能力，以及良好的沟通能力。",
    },
    fr: {
      pertanyaan: ["savoir-être de rafli", "soft skills", "personnalité", "qualités", "points forts"],
      jawaban: "Soft skills de Rafli : collaboration et travail d'équipe, esprit d'analyse, networking, adaptabilité et bonne communication.",
    },
  },
  Bahasa: {
    en: {
      pertanyaan: ["what languages does rafli speak", "english level", "spoken languages"],
      jawaban: "Rafli speaks Indonesian (native) and English (upper intermediate).",
    },
    zh: {
      pertanyaan: ["Rafli 会说什么语言", "英语水平", "语言能力"],
      jawaban: "Rafli 的母语是印尼语，英语为中高级水平。",
    },
    fr: {
      pertanyaan: ["quelles langues parle rafli", "niveau d'anglais", "langues parlées"],
      jawaban: "Rafli parle indonésien (langue maternelle) et anglais (niveau intermédiaire supérieur).",
    },
  },
  "Minat AI": {
    en: {
      pertanyaan: ["what is rafli interested in", "why ai", "interest in ai and machine learning", "passion", "motivation"],
      jawaban:
        "Rafli is very interested in AI and machine learning development. He is motivated to build innovative AI-based solutions that solve real problems and make a positive impact in the IT industry.",
    },
    zh: {
      pertanyaan: ["Rafli 对什么感兴趣", "为什么喜欢人工智能", "人工智能和机器学习的兴趣", "热情", "动力"],
      jawaban: "Rafli 对人工智能和机器学习开发非常感兴趣。他希望打造基于 AI 的创新解决方案，解决实际问题，并为 IT 行业带来积极影响。",
    },
    fr: {
      pertanyaan: ["qu'est-ce qui intéresse rafli", "pourquoi l'ia", "intérêt pour l'intelligence artificielle", "passion", "motivation"],
      jawaban:
        "Rafli est passionné par le développement de l'IA et du machine learning. Il est motivé à créer des solutions innovantes basées sur l'IA pour résoudre de vrais problèmes et avoir un impact positif dans l'industrie informatique.",
    },
  },

  // ---------- PENGALAMAN KERJA / MAGANG ----------
  "Ringkasan pengalaman magang": {
    en: {
      pertanyaan: ["rafli's work experience", "internship history", "where has he interned", "career", "professional experience"],
      jawaban:
        "Rafli's internships (newest to oldest):\n- PT Testindo (MagangHub): Web Developer, since Sep 2026\n- Ministry of Cooperatives: AI Chatbot Developer, May-Sep 2025\n- Toya Bumi Bersih: Web Developer, Mar-Aug 2025\n- Global Onkolab Farma: IT Intern, Feb-Mar 2025\n- Financial Services Authority (OJK): Web Developer, Sep 2024-Jan 2025",
    },
    zh: {
      pertanyaan: ["Rafli 的工作经验", "实习经历", "在哪些公司实习过", "职业经历", "工作经历"],
      jawaban:
        "Rafli 的实习经历（从新到旧）：\n- PT Testindo（MagangHub）：网页开发，2026 年 9 月至今\n- 印尼合作社部：AI 聊天机器人开发，2025 年 5 月至 9 月\n- Toya Bumi Bersih：网页开发，2025 年 3 月至 8 月\n- Global Onkolab Farma：IT 实习生，2025 年 2 月至 3 月\n- 印尼金融服务管理局（OJK）：网页开发，2024 年 9 月至 2025 年 1 月",
    },
    fr: {
      pertanyaan: ["expérience professionnelle de rafli", "historique des stages", "où a-t-il fait ses stages", "carrière", "parcours"],
      jawaban:
        "Stages de Rafli (du plus récent au plus ancien) :\n- PT Testindo (MagangHub) : Développeur Web, depuis sept. 2026\n- Ministère des Coopératives : Développeur de Chatbot IA, mai-sept. 2025\n- Toya Bumi Bersih : Développeur Web, mars-août 2025\n- Global Onkolab Farma : Stagiaire IT, févr.-mars 2025\n- Autorité des Services Financiers (OJK) : Développeur Web, sept. 2024-janv. 2025",
    },
  },
  "Magang Kementerian Koperasi": {
    en: {
      pertanyaan: ["internship at the ministry of cooperatives", "kopdes merah putih chatbot", "chatbot development experience", "ai chatbot developer"],
      jawaban:
        "Ministry of Cooperatives, AI Chatbot Developer Intern (May-Sep 2025). Rafli developed an AI chatbot for kopdesmerahputih.kop.id, using Python for development, HTML for the front end, and JavaScript for the backend. He also worked with the team to collect the chatbot's training data.",
    },
    zh: {
      pertanyaan: ["在合作社部实习", "Kopdes Merah Putih 聊天机器人", "开发聊天机器人的经验", "AI 聊天机器人开发"],
      jawaban:
        "印尼合作社部，AI 聊天机器人开发实习生（2025 年 5 月至 9 月）。Rafli 为 kopdesmerahputih.kop.id 开发了 AI 聊天机器人，使用 Python 进行开发、HTML 做前端、JavaScript 做后端。他还与团队合作收集聊天机器人的训练数据。",
    },
    fr: {
      pertanyaan: ["stage au ministère des coopératives", "chatbot kopdes merah putih", "expérience de développement de chatbot", "développeur chatbot ia"],
      jawaban:
        "Ministère des Coopératives, stagiaire Développeur de Chatbot IA (mai-sept. 2025). Rafli a développé un chatbot IA pour kopdesmerahputih.kop.id, avec Python pour le développement, HTML pour le front-end et JavaScript pour le back-end. Il a aussi collecté les données d'entraînement du chatbot avec l'équipe.",
    },
  },
  "Magang Toya Bumi Bersih": {
    en: {
      pertanyaan: ["internship at toya bumi bersih", "sales monitoring dashboard", "web developer at toya"],
      jawaban:
        "Toya Bumi Bersih (a water treatment / water filter company), Web Developer Intern (Mar-Aug 2025). Rafli built and maintained a web dashboard to monitor the sales workflow and various divisions, using PHP (backend), React (front end), and SQL (database). He worked with the team to ensure smooth workflow integration and more efficient operations.",
    },
    zh: {
      pertanyaan: ["在 Toya Bumi Bersih 实习", "销售监控仪表板", "Toya 网页开发"],
      jawaban:
        "Toya Bumi Bersih（水处理/净水过滤公司），网页开发实习生（2025 年 3 月至 8 月）。Rafli 构建并维护了一个用于监控销售流程和各部门工作的网页仪表板，使用 PHP（后端）、React（前端）和 SQL（数据库）。他与团队合作，确保工作流程顺畅集成，提高运营效率。",
    },
    fr: {
      pertanyaan: ["stage chez toya bumi bersih", "tableau de bord de suivi des ventes", "développeur web chez toya"],
      jawaban:
        "Toya Bumi Bersih (entreprise de traitement / filtration d'eau), stagiaire Développeur Web (mars-août 2025). Rafli a créé et maintenu un tableau de bord web pour suivre le flux des ventes et les différentes divisions, avec PHP (back-end), React (front-end) et SQL (base de données). Il a collaboré avec l'équipe pour une intégration fluide et des opérations plus efficaces.",
    },
  },
  "Magang Global Onkolab Farma": {
    en: {
      pertanyaan: ["internship at global onkolab farma", "experience at a pharmaceutical company", "pct monitoring"],
      jawaban:
        "Global Onkolab Farma (an oncology pharmaceutical company), IT Intern (Feb-Mar 2025). Rafli developed and maintained the PCTmonitoring web dashboard to track workflows across divisions, using ASP.NET (backend), Figma (front-end design), and SSMS (database).",
    },
    zh: {
      pertanyaan: ["在 Global Onkolab Farma 实习", "制药公司的经验", "PCT 监控"],
      jawaban:
        "Global Onkolab Farma（肿瘤药物制药公司），IT 实习生（2025 年 2 月至 3 月）。Rafli 开发并维护了 PCTmonitoring 网页仪表板，用于监控各部门之间的工作流程，使用 ASP.NET（后端）、Figma（前端设计）和 SSMS（数据库）。",
    },
    fr: {
      pertanyaan: ["stage chez global onkolab farma", "expérience dans une entreprise pharmaceutique", "pct monitoring"],
      jawaban:
        "Global Onkolab Farma (entreprise pharmaceutique en oncologie), stagiaire IT (févr.-mars 2025). Rafli a développé et maintenu le tableau de bord web PCTmonitoring pour suivre les flux de travail entre divisions, avec ASP.NET (back-end), Figma (design front-end) et SSMS (base de données).",
    },
  },
  "Magang OJK": {
    en: {
      pertanyaan: ["internship at ojk", "experience at the financial services authority", "web developer at ojk"],
      jawaban:
        "Financial Services Authority (OJK), Web Developer Intern (Sep 2024-Jan 2025). Rafli developed and maintained web-based systems with PHP and MySQL to support OJK's internal operations, and helped design and manage databases for more efficient and accessible data storage.",
    },
    zh: {
      pertanyaan: ["在 OJK 实习", "印尼金融服务管理局的经验", "OJK 网页开发"],
      jawaban:
        "印尼金融服务管理局（OJK），网页开发实习生（2024 年 9 月至 2025 年 1 月）。Rafli 使用 PHP 和 MySQL 开发并维护网页系统，支持 OJK 的内部运营，并参与设计和管理数据库，使数据存储更高效、更易访问。",
    },
    fr: {
      pertanyaan: ["stage à l'ojk", "expérience à l'autorité des services financiers", "développeur web à l'ojk"],
      jawaban:
        "Autorité des Services Financiers (OJK), stagiaire Développeur Web (sept. 2024-janv. 2025). Rafli a développé et maintenu des systèmes web en PHP et MySQL pour les opérations internes de l'OJK, et a participé à la conception et à la gestion des bases de données pour un stockage plus efficace et accessible.",
    },
  },

  // ---------- ORGANISASI & KEPANITIAAN ----------
  Organisasi: {
    en: {
      pertanyaan: ["organizational experience", "what organizations was he in", "committees", "student activities"],
      jawaban:
        "Rafli's organizational experience:\n- Vice Chairperson, President University Badminton Club (Jul 2023-Jul 2024)\n- Logistics, President Youth Leadership Camp / PYLC (May-Dec 2023)\n- Logistics, President University Sports Tournament / PUST (Sep-Dec 2023)\n- Fundraising and logistics, Community Service (Jun-Jul 2023)\n- Marketing and logistics, D'MIE GOD (Jan-May 2023)",
    },
    zh: {
      pertanyaan: ["组织经历", "参加过哪些组织", "委员会经历", "校园活动"],
      jawaban:
        "Rafli 的组织经历：\n- President University 羽毛球俱乐部副主席（2023 年 7 月至 2024 年 7 月）\n- President Youth Leadership Camp（PYLC）后勤（2023 年 5 月至 12 月）\n- President University Sports Tournament（PUST）后勤（2023 年 9 月至 12 月）\n- 社区服务募捐与后勤（2023 年 6 月至 7 月）\n- D'MIE GOD 市场营销与后勤（2023 年 1 月至 5 月）",
    },
    fr: {
      pertanyaan: ["expérience associative", "dans quelles organisations", "comités", "activités étudiantes"],
      jawaban:
        "Expérience associative de Rafli :\n- Vice-président du President University Badminton Club (juil. 2023-juil. 2024)\n- Logistique, President Youth Leadership Camp / PYLC (mai-déc. 2023)\n- Logistique, President University Sports Tournament / PUST (sept.-déc. 2023)\n- Collecte de fonds et logistique, Community Service (juin-juil. 2023)\n- Marketing et logistique, D'MIE GOD (janv.-mai 2023)",
    },
  },
  "PUBC Wakil Ketua": {
    en: {
      pertanyaan: ["vice chairperson of the badminton club", "role in pubc", "president university badminton club"],
      jawaban:
        "Rafli was Vice Chairperson of the President University Badminton Club (PUBC), July 2023-July 2024. He worked with the chairperson on innovative ideas for the club, stood in for the chairperson when needed to keep leadership running, and conducted field surveys to improve the player experience and club performance.",
    },
    zh: {
      pertanyaan: ["羽毛球俱乐部副主席", "在 PUBC 的角色", "President University 羽毛球俱乐部"],
      jawaban:
        "Rafli 于 2023 年 7 月至 2024 年 7 月担任 President University 羽毛球俱乐部（PUBC）副主席。他与主席合作为俱乐部提出创新想法，在主席缺席时代为领导，并开展实地调查以提升球员体验和俱乐部表现。",
    },
    fr: {
      pertanyaan: ["vice-président du club de badminton", "rôle au pubc", "president university badminton club"],
      jawaban:
        "Rafli a été vice-président du President University Badminton Club (PUBC), de juillet 2023 à juillet 2024. Il a travaillé avec le président sur des idées innovantes, l'a remplacé en son absence pour assurer la continuité, et a mené des enquêtes de terrain pour améliorer l'expérience des joueurs et les performances du club.",
    },
  },
  PYLC: {
    en: {
      pertanyaan: ["what is pylc", "role in president youth leadership camp", "pylc logistics"],
      jawaban:
        "President Youth Leadership Camp (PYLC), Logistics member (May-Dec 2023). PYLC is a seminar and camp to shape young leaders. Rafli coordinated the procurement and distribution of supplies, managed venue setup and teardown, and oversaw transportation and inventory.",
    },
    zh: {
      pertanyaan: ["PYLC 是什么", "在青年领袖营的角色", "PYLC 后勤"],
      jawaban:
        "President Youth Leadership Camp（PYLC），后勤成员（2023 年 5 月至 12 月）。PYLC 是一个培养青年领袖的研讨会和营地活动。Rafli 负责协调物资采购和分发，管理场地布置和拆除，并监督交通和库存。",
    },
    fr: {
      pertanyaan: ["qu'est-ce que le pylc", "rôle au president youth leadership camp", "logistique pylc"],
      jawaban:
        "President Youth Leadership Camp (PYLC), membre de la logistique (mai-déc. 2023). Le PYLC est un séminaire et camp pour former de jeunes leaders. Rafli a coordonné l'achat et la distribution du matériel, géré l'installation et le démontage du site, et supervisé le transport et l'inventaire.",
    },
  },
  PUST: {
    en: {
      pertanyaan: ["what is pust", "president university sports tournament", "role in the sports tournament"],
      jawaban:
        "President University Sports Tournament (PUST), Logistics member (Sep-Dec 2023). Rafli was responsible for sourcing and managing supplies for all divisions, ensuring their availability and condition, and coordinating on-time delivery. He also worked with other committee members to quickly resolve logistics issues.",
    },
    zh: {
      pertanyaan: ["PUST 是什么", "President University 体育锦标赛", "在体育比赛中的角色"],
      jawaban:
        "President University Sports Tournament（PUST），后勤成员（2023 年 9 月至 12 月）。Rafli 负责为所有部门采购和管理物资，确保物资充足且状况良好，并协调按时送达。他还与其他委员会成员合作，快速解决后勤问题。",
    },
    fr: {
      pertanyaan: ["qu'est-ce que le pust", "president university sports tournament", "rôle dans le tournoi sportif"],
      jawaban:
        "President University Sports Tournament (PUST), membre de la logistique (sept.-déc. 2023). Rafli était chargé de trouver et gérer le matériel de toutes les divisions, d'en assurer la disponibilité et l'état, et de coordonner les livraisons à temps. Il a aussi travaillé avec les autres membres du comité pour résoudre rapidement les problèmes logistiques.",
    },
  },
  "Community Service": {
    en: {
      pertanyaan: ["rafli's social activities", "community service orphanage", "rumah harapan", "fundraising", "charity"],
      jawaban:
        "Community Service in Cikarang (Jun-Jul 2023), as a Fundraising and Logistics member supporting the \"Rumah Harapan\" orphanage. Rafli led fundraising through food sales (as a reseller using existing networks and platforms), handled deliveries, coordinated procurement, and oversaw logistics so the event ran smoothly.",
    },
    zh: {
      pertanyaan: ["Rafli 的社会活动", "孤儿院社区服务", "Rumah Harapan", "募捐", "慈善"],
      jawaban:
        "芝卡朗社区服务（2023 年 6 月至 7 月），担任募捐与后勤成员，支持 \"Rumah Harapan\" 孤儿院。Rafli 通过销售食品（利用现有人脉和平台做分销）主导募捐，负责物品配送、协调采购，并监督后勤，确保活动顺利进行。",
    },
    fr: {
      pertanyaan: ["activités sociales de rafli", "bénévolat orphelinat", "rumah harapan", "collecte de fonds", "caritatif"],
      jawaban:
        "Community Service à Cikarang (juin-juil. 2023), membre collecte de fonds et logistique pour soutenir l'orphelinat « Rumah Harapan ». Rafli a mené la collecte de fonds via la vente de nourriture (en revendeur via les réseaux et plateformes existants), géré les livraisons, coordonné les achats et supervisé la logistique pour le bon déroulement de l'événement.",
    },
  },
  "D'MIE GOD": {
    en: {
      pertanyaan: ["experience at dmie god", "spicy noodle business", "has he run a business", "marketing and logistics"],
      jawaban:
        "D'MIE GOD (a spicy noodle business in Cikarang), Marketing and Logistics (Jan-May 2023). In logistics, Rafli optimized delivery routes and managed ingredient and packaging stock. In marketing, he created social media content (Instagram, WhatsApp) and ran product sampling at the campus canteen to raise brand awareness among students.",
    },
    zh: {
      pertanyaan: ["在 D'MIE GOD 的经历", "辣面生意", "做过生意吗", "市场营销和后勤"],
      jawaban:
        "D'MIE GOD（芝卡朗的辣面生意），市场营销与后勤（2023 年 1 月至 5 月）。在后勤方面，Rafli 优化配送路线并管理食材和包装库存。在营销方面，他制作社交媒体内容（Instagram、WhatsApp），并在校园食堂开展产品试吃，提高学生对品牌的认知度。",
    },
    fr: {
      pertanyaan: ["expérience chez dmie god", "entreprise de nouilles épicées", "a-t-il eu une entreprise", "marketing et logistique"],
      jawaban:
        "D'MIE GOD (entreprise de nouilles épicées à Cikarang), Marketing et Logistique (janv.-mai 2023). En logistique, Rafli a optimisé les itinéraires de livraison et géré les stocks d'ingrédients et d'emballages. En marketing, il a créé du contenu pour les réseaux sociaux (Instagram, WhatsApp) et organisé des dégustations à la cantine du campus pour accroître la notoriété de la marque auprès des étudiants.",
    },
  },

  // ---------- PROYEK ----------
  "Daftar proyek": {
    en: {
      pertanyaan: ["what are his projects", "project portfolio", "projects he has built", "rafli's work", "list of projects"],
      jawaban:
        "Rafli's projects:\n1. Horror Game (Jul 2024): a horror game in Unreal Engine 5\n2. Speech Summarizer (Mar 2024): meeting minutes generator from speech\n3. Camera Detect (Oct 2023): real-time face and eye detection with OpenCV\nThere is also the AI chatbot for kopdesmerahputih.kop.id and various web dashboards from his internships.",
    },
    zh: {
      pertanyaan: ["他做过哪些项目", "项目作品集", "做过什么作品", "Rafli 的作品", "项目列表"],
      jawaban:
        "Rafli 的项目：\n1. Horror Game（2024 年 7 月）：用 Unreal Engine 5 制作的恐怖游戏\n2. Speech Summarizer（2024 年 3 月）：根据语音生成会议纪要\n3. Camera Detect（2023 年 10 月）：使用 OpenCV 实时检测人脸和眼睛\n此外还有 kopdesmerahputih.kop.id 的 AI 聊天机器人，以及实习期间开发的多个网页仪表板。",
    },
    fr: {
      pertanyaan: ["quels sont ses projets", "portfolio de projets", "projets réalisés", "réalisations de rafli", "liste des projets"],
      jawaban:
        "Projets de Rafli :\n1. Horror Game (juil. 2024) : jeu d'horreur sous Unreal Engine 5\n2. Speech Summarizer (mars 2024) : générateur de comptes rendus de réunion à partir de la voix\n3. Camera Detect (oct. 2023) : détection de visages et d'yeux en temps réel avec OpenCV\nIl y a aussi le chatbot IA de kopdesmerahputih.kop.id et plusieurs tableaux de bord web réalisés en stage.",
    },
  },
  "Proyek Horror Game": {
    en: {
      pertanyaan: ["tell me about the horror game project", "unreal engine horror game", "what game did he make", "how does the horror game work"],
      jawaban:
        "Horror Game (July 2024) was built with Unreal Engine 5 using Blueprints. It is a tense single-player game: the player must find tools on the map to fight an AI-controlled monster, while being able to hide (e.g. in wardrobes) and pick up items. Rafli worked on character animation, the monster AI, AI animation, and sound effects via the event graph. Character and map design were assisted by online platforms.",
    },
    zh: {
      pertanyaan: ["介绍一下恐怖游戏项目", "虚幻引擎恐怖游戏", "做过什么游戏", "恐怖游戏怎么玩"],
      jawaban:
        "Horror Game（2024 年 7 月）使用 Unreal Engine 5 的 Blueprints 制作。这是一款紧张的单人游戏：玩家必须在地图上找到工具来对抗由 AI 控制的怪物，同时可以躲藏（例如躲进衣柜）并拾取物品。Rafli 负责角色动画、怪物 AI、AI 动画，以及通过事件图实现音效。角色和地图设计借助了在线平台。",
    },
    fr: {
      pertanyaan: ["parle-moi du projet de jeu d'horreur", "jeu d'horreur unreal engine", "quel jeu a-t-il créé", "comment fonctionne le jeu d'horreur"],
      jawaban:
        "Horror Game (juillet 2024) a été réalisé avec Unreal Engine 5 en Blueprints. C'est un jeu solo angoissant : le joueur doit trouver des outils sur la carte pour affronter un monstre contrôlé par IA, tout en pouvant se cacher (par exemple dans une armoire) et ramasser des objets. Rafli a travaillé sur l'animation des personnages, l'IA du monstre, l'animation de l'IA et les effets sonores via l'event graph. Le design des personnages et de la carte a été aidé par des plateformes en ligne.",
    },
  },
  "Proyek Speech Summarizer": {
    en: {
      pertanyaan: ["tell me about the speech summarizer project", "automatic meeting minutes", "minutes of meeting from voice", "how does speech to text work"],
      jawaban:
        "Speech Summarizer (March 2024) is a website that creates minutes of meeting (MoM) from speech: it records speech, converts it to text, summarizes it, and lets you download the result as a .txt file. Tech: HTML, CSS, JavaScript (front end), Python + Flask (server), SpeechRecognition, Hugging Face Transformers (summarization), spaCy and NLTK (lemmatization), and langdetect (language detection).",
    },
    zh: {
      pertanyaan: ["介绍一下语音摘要项目", "自动会议纪要", "语音生成会议记录", "语音转文字怎么实现"],
      jawaban:
        "Speech Summarizer（2024 年 3 月）是一个根据语音生成会议纪要（MoM）的网站：录制语音、转成文字、生成摘要，然后可以下载为 .txt 文件。技术：HTML、CSS、JavaScript（前端），Python + Flask（服务器），SpeechRecognition，Hugging Face Transformers（摘要），spaCy 和 NLTK（词形还原），以及 langdetect（语言检测）。",
    },
    fr: {
      pertanyaan: ["parle-moi du projet speech summarizer", "compte rendu de réunion automatique", "procès-verbal à partir de la voix", "comment fonctionne la reconnaissance vocale"],
      jawaban:
        "Speech Summarizer (mars 2024) est un site qui génère des comptes rendus de réunion (MoM) à partir de la voix : il enregistre la parole, la convertit en texte, la résume, puis permet de télécharger le résultat en .txt. Technologies : HTML, CSS, JavaScript (front-end), Python + Flask (serveur), SpeechRecognition, Hugging Face Transformers (résumé), spaCy et NLTK (lemmatisation) et langdetect (détection de langue).",
    },
  },
  "Proyek Camera Detect": {
    en: {
      pertanyaan: ["tell me about the camera detect project", "face detection with a camera", "computer vision project", "haar cascade"],
      jawaban:
        "Camera Detect (October 2023; the portfolio version says Oct 2024) is a Python computer vision program that analyzes a camera feed in real time. Using OpenCV and pre-trained Haar Cascade classifiers, it detects faces and eyes and displays the results with annotations in a window.",
    },
    zh: {
      pertanyaan: ["介绍一下摄像头检测项目", "用摄像头检测人脸", "计算机视觉项目", "Haar 级联"],
      jawaban:
        "Camera Detect（2023 年 10 月；作品集版本写的是 2024 年 10 月）是一个用 Python 编写的计算机视觉程序，可实时分析摄像头画面。它使用 OpenCV 和预训练的 Haar Cascade 分类器检测人脸和眼睛，并在窗口中以标注形式显示结果。",
    },
    fr: {
      pertanyaan: ["parle-moi du projet camera detect", "détection de visage avec une caméra", "projet de vision par ordinateur", "haar cascade"],
      jawaban:
        "Camera Detect (octobre 2023 ; la version du portfolio indique oct. 2024) est un programme Python de vision par ordinateur qui analyse le flux d'une caméra en temps réel. Grâce à OpenCV et à des classificateurs Haar Cascade pré-entraînés, il détecte les visages et les yeux et affiche les résultats annotés dans une fenêtre.",
    },
  },
  "Pengalaman membuat chatbot AI": {
    en: {
      pertanyaan: ["has he built a chatbot", "ai chatbot experience", "chatbots made by rafli"],
      jawaban:
        "Yes. During his internship at the Ministry of Cooperatives (May-Sep 2025), Rafli developed an AI chatbot for kopdesmerahputih.kop.id and helped collect its training data with the team. The assistant you're talking to right now was also built by Rafli for his portfolio.",
    },
    zh: {
      pertanyaan: ["做过聊天机器人吗", "AI 聊天机器人经验", "Rafli 做的聊天机器人"],
      jawaban:
        "做过。在印尼合作社部实习期间（2025 年 5 月至 9 月），Rafli 为 kopdesmerahputih.kop.id 开发了 AI 聊天机器人，并与团队一起收集训练数据。你现在正在对话的这个助手也是 Rafli 为他的作品集制作的。",
    },
    fr: {
      pertanyaan: ["a-t-il créé un chatbot", "expérience en chatbot ia", "chatbots créés par rafli"],
      jawaban:
        "Oui. Pendant son stage au Ministère des Coopératives (mai-sept. 2025), Rafli a développé un chatbot IA pour kopdesmerahputih.kop.id et a collecté ses données d'entraînement avec l'équipe. L'assistant avec qui vous parlez en ce moment a aussi été créé par Rafli pour son portfolio.",
    },
  },

  // ---------- KONTAK & LAIN-LAIN ----------
  Kontak: {
    en: {
      pertanyaan: ["how to contact rafli", "rafli's email", "contact", "linkedin", "instagram", "social media"],
      jawaban:
        "You can reach Rafli via:\n- Email: yahyarafli.hidayah04@gmail.com\n- LinkedIn: yahyahidayah77\n- Instagram: ren.juo_",
    },
    zh: {
      pertanyaan: ["怎么联系 Rafli", "Rafli 的邮箱", "联系方式", "领英", "社交媒体", "电子邮件"],
      jawaban: "你可以通过以下方式联系 Rafli：\n- 邮箱：yahyarafli.hidayah04@gmail.com\n- LinkedIn：yahyahidayah77\n- Instagram：ren.juo_",
    },
    fr: {
      pertanyaan: ["comment contacter rafli", "email de rafli", "contact", "coordonnées", "réseaux sociaux", "linkedin"],
      jawaban:
        "Vous pouvez contacter Rafli via :\n- Email : yahyarafli.hidayah04@gmail.com\n- LinkedIn : yahyahidayah77\n- Instagram : ren.juo_",
    },
  },
  Lokasi: {
    en: {
      pertanyaan: ["where does rafli live", "rafli's location", "where is rafli based", "which city"],
      jawaban: "Rafli lives in DKI Jakarta, Indonesia (WIB time zone). He studied in Cikarang.",
    },
    zh: {
      pertanyaan: ["Rafli 住在哪里", "Rafli 的所在地", "在哪个城市", "居住地"],
      jawaban: "Rafli 居住在印度尼西亚雅加达首都特区（西印尼时间 WIB）。他在芝卡朗读的大学。",
    },
    fr: {
      pertanyaan: ["où habite rafli", "localisation de rafli", "où est basé rafli", "quelle ville"],
      jawaban: "Rafli habite à DKI Jakarta, en Indonésie (fuseau horaire WIB). Il a fait ses études à Cikarang.",
    },
  },
  Hobi: {
    en: {
      pertanyaan: ["rafli's hobbies", "what does he do in his free time", "favorite sport", "what does he like"],
      jawaban:
        "Rafli enjoys badminton. He was runner-up in the campus CSGO badminton competition and served as Vice Chairperson of his university's badminton club. He is also interested in game development.",
    },
    zh: {
      pertanyaan: ["Rafli 的爱好", "业余时间做什么", "喜欢的运动", "兴趣爱好"],
      jawaban: "Rafli 喜欢打羽毛球。他曾在校园 CSGO 羽毛球比赛中获得亚军，并担任大学羽毛球俱乐部副主席。他也对游戏开发很感兴趣。",
    },
    fr: {
      pertanyaan: ["loisirs de rafli", "que fait-il pendant son temps libre", "sport préféré", "passe-temps"],
      jawaban:
        "Rafli aime le badminton. Il a terminé deuxième du tournoi de badminton CSGO de son campus et a été vice-président du club de badminton de son université. Il s'intéresse aussi au développement de jeux vidéo.",
    },
  },
  "Asal daerah": {
    en: {
      pertanyaan: ["where is rafli from", "hometown", "where was he born", "origin"],
      jawaban: "Rafli is from Medan, North Sumatra. He now lives in DKI Jakarta and studied in Cikarang.",
    },
    zh: {
      pertanyaan: ["Rafli 是哪里人", "家乡在哪里", "出生在哪里", "来自哪里"],
      jawaban: "Rafli 来自北苏门答腊省棉兰。他现在居住在雅加达首都特区，大学在芝卡朗就读。",
    },
    fr: {
      pertanyaan: ["d'où vient rafli", "ville natale", "où est-il né", "origine"],
      jawaban: "Rafli est originaire de Medan, dans le nord de Sumatra. Il vit maintenant à DKI Jakarta et a étudié à Cikarang.",
    },
  },
};
