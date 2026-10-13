// ============================================================
//  DATA CHATBOT - portfolio/data/knowledge.js
//  Sumber: CV + PDF portofolio + info internship terbaru.
//  Untuk menambah / mengubah jawaban, edit file ini saja.
// ============================================================

export const config = {
  namaBot: "Asisten Rafli",
  sapaan:
    "Halo! Saya asisten Rafli. Tanyakan apa saja tentang Rafli: pengalaman magang, proyek, skill, pendidikan, atau cara menghubunginya.",
  fallback:
    "Maaf, saya hanya bisa menjawab pertanyaan seputar Rafli (pengalaman, proyek, skill, pendidikan, kontak). Coba tanyakan salah satunya ya.",
  saran: [
    "Siapa Rafli?",
    "Sekarang Rafli kerja di mana?",
    "Apa saja proyeknya?",
    "Bagaimana cara menghubungi Rafli?",
  ],
};

export const knowledge = [
  // ---------- PROFIL ----------
  {
    topik: "Perkenalan",
    pertanyaan: ["siapa rafli", "kenalkan dirimu", "tentang rafli", "who is rafli", "profil singkat", "nama lengkap"],
    kata_kunci: ["rafli", "yahya", "hidayah", "profil", "perkenalan", "about", "diri", "nama"],
    jawaban:
      "Yahya Rafli Hidayah (biasa dipanggil Rafli) adalah lulusan S1 Teknologi Informasi President University dengan minat kuat pada Artificial Intelligence dan Machine Learning. Ia berpengalaman di web development dan pengembangan chatbot AI lewat beberapa magang, serta aktif berorganisasi. Ia dikenal adaptif, komunikatif, dan suka bekerja dalam tim.",
  },
  {
    topik: "Status dan pekerjaan saat ini",
    pertanyaan: ["sekarang kerja di mana", "lagi ngapain sekarang", "kegiatan saat ini", "pekerjaan sekarang", "current job", "what is rafli doing now", "magang sekarang", "posisi saat ini"],
    kata_kunci: ["sekarang", "saat ini", "current", "now", "testindo", "maganghub", "magang hub", "web developer", "intern", "internship", "kerja", "pekerjaan"],
    jawaban:
      "Saat ini (sejak September 2026) Rafli menjalani magang sebagai Web Developer di PT Testindo melalui program MagangHub. Tugas yang sedang dikerjakan: menambahkan fitur chart pada salah satu menu di website internal, dan melakukan redesign website internal.",
  },
  {
    topik: "Magang PT Testindo",
    pertanyaan: ["magang di testindo", "apa tugas di testindo", "chart di website internal", "redesign website internal", "apa itu maganghub", "kerjaan di pt testindo"],
    kata_kunci: ["testindo", "maganghub", "chart", "grafik", "redesign", "website internal", "dashboard", "web developer", "september 2026", "tugas"],
    jawaban:
      "PT Testindo (MagangHub), Web Developer Intern, sejak September 2026. Tugas yang dikerjakan saat ini:\n- Menambahkan chart pada salah satu menu di website internal\n- Me-redesign tampilan website internal",
  },

  // ---------- PENDIDIKAN ----------
  {
    topik: "Pendidikan",
    pertanyaan: ["kuliah di mana", "pendidikan terakhir", "jurusan apa", "lulusan mana", "education", "universitas rafli", "kapan lulus"],
    kata_kunci: ["pendidikan", "kuliah", "universitas", "president university", "kampus", "jurusan", "lulus", "sarjana", "s1", "bachelor", "information technology", "teknologi informasi", "education", "degree"],
    jawaban:
      "Rafli menempuh S1 Information Technology di President University (Cikarang), September 2022 - Oktober 2025. Ia sudah menyelesaikan sidang skripsi (bachelor defense).",
  },
  {
    topik: "IPK",
    pertanyaan: ["berapa ipk rafli", "nilai ipk", "gpa rafli", "indeks prestasi"],
    kata_kunci: ["ipk", "gpa", "nilai", "indeks prestasi", "grade"],
    jawaban: "IPK Rafli 3.34 dari skala 4.00.",
  },
  {
    topik: "Mata kuliah",
    pertanyaan: ["mata kuliah apa saja", "pelajaran yang dipelajari", "relevant course", "kuliah tentang apa"],
    kata_kunci: ["mata kuliah", "course", "subject", "nlp", "natural language processing", "computer vision", "robotics", "deep learning", "image processing", "database", "network security", "computer network", "web programming", "operating system", "data structure", "algoritma", "3d graphics"],
    jawaban:
      "Mata kuliah relevan: Natural Language Processing, Computer Vision, Intelligent Robotics, Web Programming, Server-Side Internet Programming, Computer Network. Selain itu juga Artificial Intelligence, Deep Learning, Image Processing and Recognition, Database System, Network Security, Operating System Design, Distributed and Parallel System, 3D Computer Graphics and Animation, Object Oriented and Visual Programming, serta Data Structure and Algorithm.",
  },
  {
    topik: "Sertifikat",
    pertanyaan: ["ada sertifikat apa", "sertifikasi rafli", "certification", "kursus yang diikuti"],
    kata_kunci: ["sertifikat", "sertifikasi", "certificate", "certification", "generative ai", "puslitbang", "sdp3i", "pelatihan", "kursus"],
    jawaban: "Sertifikat Rafli: Generative AI for Information System (Puslitbang SDP3I), sertifikat Completion Bachelor Defense, dan surat rekomendasi sarjana.",
  },
  {
    topik: "Prestasi",
    pertanyaan: ["prestasi rafli", "pernah juara apa", "achievement", "lomba badminton", "penghargaan"],
    kata_kunci: ["prestasi", "juara", "achievement", "runner-up", "runner up", "csgo", "lomba", "kompetisi", "penghargaan", "award", "badminton"],
    jawaban:
      "Rafli meraih runner-up (juara 2) pada kompetisi badminton Computing Sports and Games Olympics (CSGO) di President University pada 4 Maret 2023.",
  },

  // ---------- SKILL ----------
  {
    topik: "Skill teknis",
    pertanyaan: ["apa skill rafli", "keahlian rafli", "teknologi yang dikuasai", "tech stack", "bahasa pemrograman apa", "programming language", "bisa coding apa"],
    kata_kunci: ["skill", "keahlian", "kemampuan", "teknologi", "tools", "bahasa pemrograman", "python", "html", "css", "c++", "java", "javascript", "js", "php", "mysql", "sql", "react", "asp.net", "figma", "ssms", "flask", "unreal engine", "programming", "stack"],
    jawaban:
      "Skill teknis Rafli:\n- Bahasa: Python, HTML, CSS, C++, PHP, serta pengetahuan Java dan JavaScript\n- Web: React, PHP + MySQL, ASP.NET, Flask, Figma untuk desain UI\n- Database: MySQL, SQL Server (SSMS)\n- AI/ML: NLP, computer vision, chatbot AI, Hugging Face Transformers, OpenCV\n- Game dev: Unreal Engine 5 (Blueprints)",
  },
  {
    topik: "Soft skill",
    pertanyaan: ["soft skill rafli", "kepribadian", "kelebihan rafli", "karakter"],
    kata_kunci: ["soft skill", "teamwork", "kerja sama", "kolaborasi", "analytical", "analisis", "networking", "adaptability", "adaptif", "komunikasi", "kepribadian"],
    jawaban: "Soft skill Rafli: kolaborasi dan kerja tim, berpikir analitis, networking, adaptif, serta komunikasi yang baik.",
  },
  {
    topik: "Bahasa",
    pertanyaan: ["bisa bahasa apa", "kemampuan bahasa inggris", "languages spoken", "bahasa yang dikuasai"],
    kata_kunci: ["bahasa", "language", "inggris", "english", "indonesia", "upper intermediate"],
    jawaban: "Rafli menguasai Bahasa Indonesia (native) dan Bahasa Inggris (upper intermediate).",
  },
  {
    topik: "Minat AI",
    pertanyaan: ["minat rafli di bidang apa", "kenapa tertarik ai", "background ai dan machine learning", "passion rafli", "motivasi"],
    kata_kunci: ["ai", "artificial intelligence", "machine learning", "ml", "minat", "passion", "motivasi", "interest", "inovasi", "solusi"],
    jawaban:
      "Rafli sangat tertarik pada pengembangan AI dan machine learning. Ia termotivasi membuat solusi inovatif berbasis AI untuk menyelesaikan masalah nyata dan memberi dampak positif di industri IT.",
  },
  {
    topik: "Minat di bidang AI",
    pertanyaan: ["minat AI yang rafli kuasai dan sukai", "kenapa tertarik ai", "background ai dan machine learning", "passion rafli", "motivasi"],
    kata_kunci: ["ai", "artificial intelligence", "machine learning", "generative ai", "ml", "minat", "passion", "motivasi", "interest", "inovasi", "solusi"],
    jawaban:
      "Rafli sangat tertarik pada pengembangan AI dan machine learning. Rafli juga mengikuti kursus Generative AI untuk Information System. Ia termotivasi membuat solusi inovatif berbasis AI untuk menyelesaikan masalah nyata dan memberi dampak positif di industri IT.",
  },

  // ---------- PENGALAMAN KERJA / MAGANG ----------
  {
    topik: "Ringkasan pengalaman magang",
    pertanyaan: ["pengalaman kerja rafli", "riwayat magang", "pernah magang di mana saja", "experience", "karir rafli", "daftar internship", "pengalaman profesional"],
    kata_kunci: ["pengalaman", "experience", "magang", "internship", "intern", "karir", "career", "riwayat", "kerja", "perusahaan"],
    jawaban:
      "Riwayat magang Rafli (terbaru ke terlama):\n- PT Testindo (MagangHub): Web Developer, sejak Sep 2026\n- Kementerian Koperasi: AI Chatbot Developer, Mei-Sep 2025\n- Toya Bumi Bersih: Web Developer, Mar-Agu 2025\n- Global Onkolab Farma: IT Intern, Feb-Mar 2025\n- Otoritas Jasa Keuangan (OJK): Web Developer, Sep 2024-Jan 2025",
  },
  {
    topik: "Magang Kementerian Koperasi",
    pertanyaan: ["magang di kementerian koperasi", "chatbot kopdes merah putih", "pengalaman membuat chatbot", "ai chatbot developer", "kopdesmerahputih"],
    kata_kunci: ["kementerian koperasi", "koperasi", "kemenkop", "chatbot", "kopdes", "merah putih", "kopdesmerahputih", "ai chatbot", "ministry of cooperatives", "pemerintah", "train"],
    jawaban:
      "Kementerian Koperasi, AI Chatbot Developer Intern (Mei-Sep 2025). Rafli mengembangkan chatbot AI untuk kopdesmerahputih.kop.id, memakai Python untuk pengembangan, HTML untuk front end, dan JavaScript untuk backend. Ia juga berkolaborasi dengan tim untuk mengumpulkan data pelatihan chatbot.",
  },
  {
    topik: "Magang Toya Bumi Bersih",
    pertanyaan: ["magang di toya bumi bersih", "dashboard monitoring penjualan", "pengalaman web developer toya"],
    kata_kunci: ["toya bumi bersih", "toya", "water treatment", "filter air", "dashboard", "monitoring", "sales", "penjualan", "php", "react", "sql"],
    jawaban:
      "Toya Bumi Bersih (perusahaan water treatment / filter air), Web Developer Intern (Mar-Agu 2025). Rafli membangun dan mengelola dashboard web untuk memantau alur kerja penjualan dan berbagai divisi, dengan PHP (backend), React (front end), dan SQL (database). Ia berkolaborasi dengan tim agar integrasi alur kerja berjalan mulus dan operasional lebih efisien.",
  },
  {
    topik: "Magang Global Onkolab Farma",
    pertanyaan: ["magang di global onkolab farma", "pengalaman di perusahaan farmasi", "pct monitoring"],
    kata_kunci: ["global onkolab farma", "onkolab", "farmasi", "pharmaceutical", "onkologi", "pct", "pctmonitoring", "asp.net", "figma", "ssms", "healthcare"],
    jawaban:
      "Global Onkolab Farma (perusahaan farmasi onkologi), IT Intern (Feb-Mar 2025). Rafli mengembangkan dan mengelola dashboard web PCTmonitoring untuk memantau alur kerja antar divisi, memakai ASP.NET (backend), Figma (desain front end), dan SSMS (database).",
  },
  {
    topik: "Magang OJK",
    pertanyaan: ["magang di ojk", "pengalaman di otoritas jasa keuangan", "web developer ojk"],
    kata_kunci: ["ojk", "otoritas jasa keuangan", "financial services authority", "keuangan", "php", "mysql", "database", "sistem internal"],
    jawaban:
      "Otoritas Jasa Keuangan (OJK), Web Developer Intern (Sep 2024-Jan 2025). Rafli mengembangkan dan mengelola sistem berbasis web dengan PHP dan MySQL untuk mendukung operasional internal OJK, serta ikut merancang dan mengelola database agar penyimpanan data lebih efisien dan mudah diakses.",
  },

  // ---------- ORGANISASI & KEPANITIAAN ----------
  {
    topik: "Organisasi",
    pertanyaan: ["pengalaman organisasi", "aktif di organisasi apa", "kepanitiaan yang diikuti", "organization"],
    kata_kunci: ["organisasi", "organization", "panitia", "kepanitiaan", "komite", "committee", "logistik", "logistic", "aktif", "kegiatan kampus"],
    jawaban:
      "Pengalaman organisasi Rafli:\n- Wakil Ketua President University Badminton Club (Jul 2023-Jul 2024)\n- Logistik President Youth Leadership Camp / PYLC (Mei-Des 2023)\n- Logistik President University Sports Tournament / PUST (Sep-Des 2023)\n- Penggalangan dana dan logistik Community Service (Jun-Jul 2023)\n- Marketing dan logistik D'MIE GOD (Jan-Mei 2023)",
  },
  {
    topik: "PUBC Wakil Ketua",
    pertanyaan: ["wakil ketua badminton club", "peran di pubc", "president university badminton club", "vice chairperson"],
    kata_kunci: ["pubc", "badminton club", "wakil ketua", "vice chairperson", "vice chair", "ketua", "klub", "badminton", "survei", "leadership"],
    jawaban:
      "Rafli menjabat Vice Chairperson President University Badminton Club (PUBC), Juli 2023-Juli 2024. Ia berkolaborasi dengan ketua untuk mengembangkan ide inovatif bagi klub, menggantikan ketua saat berhalangan agar kepemimpinan tetap berjalan, dan melakukan survei lapangan untuk meningkatkan pengalaman pemain dan performa klub.",
  },
  {
    topik: "PYLC",
    pertanyaan: ["apa itu pylc", "peran di president youth leadership camp", "logistik pylc"],
    kata_kunci: ["pylc", "president youth leadership camp", "leadership camp", "camp", "logistik", "logistic", "seminar", "pengadaan", "procurement"],
    jawaban:
      "President Youth Leadership Camp (PYLC), anggota Logistik (Mei-Des 2023). PYLC adalah seminar dan camp untuk membentuk pemimpin muda. Rafli mengoordinasikan pengadaan dan distribusi perlengkapan, mengelola pemasangan dan pembongkaran venue, serta mengawasi transportasi dan inventaris barang.",
  },
  {
    topik: "PUST",
    pertanyaan: ["apa itu pust", "president university sports tournament", "peran di turnamen olahraga"],
    kata_kunci: ["pust", "sports tournament", "turnamen", "olahraga", "sport", "logistik", "logistic", "inventaris", "supplies"],
    jawaban:
      "President University Sports Tournament (PUST), anggota Logistik (Sep-Des 2023). Rafli bertanggung jawab mencari dan mengelola perlengkapan untuk semua divisi, memastikan ketersediaan dan kondisinya, serta mengoordinasikan pengiriman tepat waktu. Ia juga bekerja sama dengan panitia lain untuk menyelesaikan kendala logistik dengan cepat.",
  },
  {
    topik: "Community Service",
    pertanyaan: ["kegiatan sosial rafli", "community service panti asuhan", "rumah harapan", "penggalangan dana"],
    kata_kunci: ["community service", "sosial", "social project", "panti asuhan", "orphanage", "rumah harapan", "fundraising", "penggalangan dana", "donasi", "charity", "cikarang"],
    jawaban:
      "Community Service di Cikarang (Jun-Jul 2023), sebagai anggota Fundraising dan Logistik untuk mendukung panti asuhan \"Rumah Harapan\". Rafli memimpin penggalangan dana lewat penjualan makanan (sebagai reseller memakai jaringan dan platform yang ada), mengurus pengiriman barang, mengoordinasikan pengadaan, dan mengawasi logistik agar acara berjalan lancar.",
  },
  {
    topik: "D'MIE GOD",
    pertanyaan: ["pengalaman di dmie god", "bisnis mie pedas", "pernah berbisnis", "marketing dan logistik"],
    kata_kunci: ["dmie god", "d'mie god", "mie", "noodle", "mie pedas", "bisnis", "fnb", "food and beverage", "marketing", "pemasaran", "logistik", "instagram", "whatsapp", "sampling"],
    jawaban:
      "D'MIE GOD (bisnis mie pedas, Cikarang), Marketing dan Logistik (Jan-Mei 2023). Di logistik, Rafli mengoptimalkan rute pengiriman dan mengelola stok bahan serta kemasan. Di marketing, ia membuat konten media sosial (Instagram, WhatsApp) dan mengadakan sampling produk di kantin kampus untuk meningkatkan brand awareness di kalangan mahasiswa.",
  },

  // ---------- PROYEK ----------
  {
    topik: "Daftar proyek",
    pertanyaan: ["apa saja proyeknya", "portofolio proyek", "project yang pernah dibuat", "karya rafli", "pernah bikin apa", "list project"],
    kata_kunci: ["proyek", "project", "portofolio", "portfolio", "karya", "dibuat", "membuat", "aplikasi", "buat"],
    jawaban:
      "Proyek Rafli:\n1. Horror Game (Jul 2024): game horor Unreal Engine 5\n2. Speech Summarizer (Mar 2024): pembuat notulen rapat dari suara\n3. Camera Detect (Oct 2023): deteksi wajah dan mata real-time dengan OpenCV\nSelain itu ada chatbot AI kopdesmerahputih.kop.id dan berbagai dashboard web dari magangnya.",
  },
  {
    topik: "Proyek Horror Game",
    pertanyaan: ["ceritakan proyek horror game", "game horor unreal engine", "bikin game apa", "cara kerja horror game"],
    kata_kunci: ["horror", "horor", "game", "unreal engine", "ue5", "blueprint", "monster", "animasi", "animation", "sound", "hiding", "lemari", "permainan"],
    jawaban:
      "Horror Game (Juli 2024) dibuat dengan Unreal Engine 5 memakai Blueprints. Ini game single-player yang tegang: pemain harus menemukan alat di peta untuk melawan monster yang dikendalikan AI, sambil bisa bersembunyi (misalnya di lemari) dan mengambil item. Rafli mengerjakan animasi karakter, AI monster, animasi AI, dan efek suara lewat event graph. Desain karakter dan peta dibantu platform online.",
  },
  {
    topik: "Proyek Speech Summarizer",
    pertanyaan: ["ceritakan proyek speech summarizer", "notulen rapat otomatis", "minutes of meeting dari suara", "cara kerja speech to text"],
    kata_kunci: ["speech", "summarizer", "notulen", "mom", "minutes of meeting", "rapat", "suara", "voice", "flask", "speechrecognition", "transformers", "hugging face", "spacy", "nltk", "langdetect", "rangkuman", "ringkas", "txt"],
    jawaban:
      "Speech Summarizer (Maret 2024) adalah website untuk membuat notulen rapat (MoM) dari suara: merekam ucapan, mengubahnya jadi teks, meringkasnya, lalu hasilnya bisa diunduh sebagai file .txt. Teknologi: HTML, CSS, JavaScript (front end), Python + Flask (server), SpeechRecognition, Transformers Hugging Face (ringkasan), spaCy dan NLTK (lemmatization), dan langdetect (deteksi bahasa).",
  },
  {
    topik: "Proyek Camera Detect",
    pertanyaan: ["ceritakan proyek camera detect", "deteksi wajah dengan kamera", "computer vision project", "haar cascade"],
    kata_kunci: ["camera", "detect", "kamera", "wajah", "face", "mata", "eye", "opencv", "haar cascade", "computer vision", "real-time", "deteksi", "python"],
    jawaban:
      "Camera Detect (Oktober 2023, versi portofolio menulis Oct 2024) adalah program Python dengan computer vision yang menganalisis kamera secara real-time. Memakai OpenCV dan pre-trained Haar Cascade classifier, program mendeteksi wajah dan mata lalu menampilkan hasilnya dengan anotasi di sebuah jendela.",
  },
  {
    topik: "Pengalaman membuat chatbot AI",
    pertanyaan: ["pernah bikin chatbot", "pengalaman ai chatbot", "chatbot yang dibuat rafli"],
    kata_kunci: ["chatbot", "bot", "ai", "kopdes", "kementerian koperasi", "train", "data", "nlp"],
    jawaban:
      "Ya. Selama magang di Kementerian Koperasi (Mei-Sep 2025), Rafli mengembangkan chatbot AI untuk kopdesmerahputih.kop.id dan ikut mengumpulkan data pelatihannya bersama tim. Asisten yang sedang kamu ajak bicara ini juga dibuat Rafli untuk portofolionya.",
  },

  // ---------- KONTAK & LAIN-LAIN ----------
  {
    topik: "Kontak",
    pertanyaan: ["cara menghubungi rafli", "email rafli", "kontak rafli", "how to contact", "hubungi", "linkedin rafli", "instagram rafli"],
    kata_kunci: ["kontak", "contact", "email", "hubungi", "linkedin", "instagram", "ig", "github", "sosmed", "media sosial", "surel"],
    jawaban:
      "Kamu bisa menghubungi Rafli lewat:\n- Email: yahyarafli.hidayah04@gmail.com\n- LinkedIn: yahyahidayah77\n- Github: https://github.com/Renjuo ",
  },
  {
    topik: "Lokasi",
    pertanyaan: ["tinggal di mana", "lokasi rafli", "domisili rafli", "where is rafli based", "asal kota"],
    kata_kunci: ["lokasi", "tinggal", "domisili", "kota", "jakarta", "dki", "indonesia", "location", "based", "wib", "cikarang"],
    jawaban: "Rafli berdomisili di DKI Jakarta, Indonesia (zona waktu WIB). Ia kuliah di Cikarang.",
  },
  {
    topik: "Hobi",
    pertanyaan: ["hobi rafli", "kegiatan di waktu luang", "hobbies", "olahraga favorit", "suka main apa"],
    kata_kunci: ["hobi", "hobby", "minat", "waktu luang", "olahraga", "sport", "badminton", "bulu tangkis", "suka", "favorit", "game", "boxing"],
    jawaban:
      "Rafli suka badminton. Ia pernah menjadi runner-up kompetisi badminton CSGO di kampus dan menjabat Wakil Ketua klub badminton universitasnya. Ia juga tertarik pada game development.",
  },
  {
    topik: "Asal daerah",
    pertanyaan: ["asal rafli dari mana", "rafli orang mana", "kampung halaman", "lahir di mana", "where is rafli from", "suku apa"],
    kata_kunci: ["asal", "dari mana", "orang mana", "kampung", "kampung halaman", "lahir", "kelahiran", "daerah", "hometown", "origin", "from", "suku"],
    jawaban: "Rafli berasal dari Medan, Sumatera Utara. Sekarang ia berdomisili di DKI Jakarta dan kuliah di Cikarang.",
  },
];
