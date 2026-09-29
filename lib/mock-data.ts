export type Category = "TWK" | "TIU" | "TKP";

export type ExamStatus = "tersedia" | "belum-dimulai" | "selesai";

export type Participant = {
  id: string;
  name: string;
  username: string;
  email?: string;
  password?: string;
  nip: string;
  institution: string;
  tempatLahir?: string;
  tglLahir?: string | Date | null;
  tmt?: string | Date | null;
  noHp?: string;
};

export type ExamMaterial = { code: Category; name: string; count: number };

export type Exam = {
  slug: string;
  title: string;
  level: string;
  date: string;
  endDate: string;
  totalQuestions: number;
  durationMinutes: number;
  passingGrade: number;
  description: string;
  status: ExamStatus;
  materials: ExamMaterial[];
};

export type QuestionOption = { id: string; text: string; score: number };

export type BankQuestion = {
  id: string;
  category: Category;
  text: string;
  options: QuestionOption[];
};

export type ExamResult = {
  slug: string;
  score: number;
  maxScore: number;
  correct: number;
  wrong: number;
  unanswered: number;
  total: number;
  passingGrade: number;
  passed: boolean;
  startedAt: number;
  finishedAt: number;
  categoryScores: { code: Category; score: number; max: number }[];
};



const standardMaterials: ExamMaterial[] = [
  { code: "TWK", name: "Tes Wawasan Kebangsaan", count: 20 },
  { code: "TIU", name: "Tes Intelegensi Umum", count: 20 },
  { code: "TKP", name: "Tes Karakteristik Pribadi", count: 20 },
];

export const exams: Exam[] = [
  {
    slug: "tes-pengangkatan-ahli-pertama",
    title: "Tes Pengangkatan Ahli Pertama",
    level: "Ahli Pertama",
    date: "25 Oktober 2026",
    endDate: "30 Oktober 2026",
    totalQuestions: 60,
    durationMinutes: 90,
    passingGrade: 180,
    description:
      "Ujian simulasi kompetensi jabatan fungsional untuk pengangkatan jenjang Ahli Pertama.",
    status: "tersedia",
    materials: standardMaterials,
  },
  {
    slug: "uji-kompetensi-kenaikan-ahli-muda",
    title: "Uji Kompetensi Kenaikan Jenjang Ahli Muda",
    level: "Ahli Muda",
    date: "26 November 2026",
    endDate: "30 November 2026",
    totalQuestions: 60,
    durationMinutes: 90,
    passingGrade: 195,
    description:
      "Uji kompetensi bagi pejabat fungsional yang akan naik jenjang dari Ahli Pertama ke Ahli Muda.",
    status: "belum-dimulai",
    materials: standardMaterials,
  },
  {
    slug: "tryout-seleksi-kompetensi-dasar",
    title: "Try Out Seleksi Kompetensi Dasar",
    level: "Ahli Pertama",
    date: "14 September 2026",
    endDate: "18 September 2026",
    totalQuestions: 60,
    durationMinutes: 90,
    passingGrade: 180,
    description:
      "Latihan seleksi kompetensi dasar untuk membiasakan peserta dengan sistem CAT.",
    status: "selesai",
    materials: standardMaterials,
  },
];

export function getExam(slug: string) {
  return exams.find((exam) => exam.slug === slug);
}

const binary = (correct: number, options: string[]): QuestionOption[] =>
  options.map((text, i) => ({
    id: `o${i + 1}`,
    text,
    score: i === correct ? 5 : 0,
  }));

const graded = (options: [string, number][]): QuestionOption[] =>
  options.map(([text, score], i) => ({ id: `o${i + 1}`, text, score }));

/**
 * Contoh bank soal. Sistem aslinya menyimpan ±7.000 soal di server;
 * mockup ini hanya memuat 15 soal contoh dengan struktur data yang sama.
 */
export const questionBank: BankQuestion[] = [
  {
    id: "TWK-0001",
    category: "TWK",
    text: "Pancasila sebagai dasar negara Republik Indonesia secara resmi disahkan oleh PPKI pada tanggal…",
    options: binary(3, [
      "1 Juni 1945",
      "22 Juni 1945",
      "17 Agustus 1945",
      "18 Agustus 1945",
      "29 Mei 1945",
    ]),
  },
  {
    id: "TWK-0002",
    category: "TWK",
    text: 'Semboyan "Bhinneka Tunggal Ika" yang tercantum pada lambang negara Garuda Pancasila berasal dari kitab…',
    options: binary(0, [
      "Sutasoma karya Mpu Tantular",
      "Negarakertagama karya Mpu Prapanca",
      "Arjunawiwaha karya Mpu Kanwa",
      "Pararaton",
      "Bharatayudha karya Mpu Sedah",
    ]),
  },
  {
    id: "TWK-0003",
    category: "TWK",
    text: "Berdasarkan UUD NRI Tahun 1945, lembaga negara yang berwenang mengubah dan menetapkan Undang-Undang Dasar adalah…",
    options: binary(0, [
      "Majelis Permusyawaratan Rakyat",
      "Dewan Perwakilan Rakyat",
      "Presiden bersama DPR",
      "Mahkamah Konstitusi",
      "Dewan Perwakilan Daerah",
    ]),
  },
  {
    id: "TWK-0004",
    category: "TWK",
    text: "Sikap yang paling mencerminkan pengamalan sila ketiga Pancasila dalam lingkungan kerja instansi pemerintah adalah…",
    options: binary(2, [
      "Menjalankan ibadah sesuai keyakinan masing-masing",
      "Memberikan bantuan kepada pegawai yang kurang mampu",
      "Mengutamakan kepentingan organisasi dan persatuan di atas kepentingan pribadi atau golongan",
      "Mengambil keputusan berdasarkan suara terbanyak",
      "Menghormati hak asasi setiap pegawai",
    ]),
  },
  {
    id: "TWK-0005",
    category: "TWK",
    text: "Peristiwa Sumpah Pemuda yang menegaskan satu tanah air, satu bangsa, dan satu bahasa persatuan terjadi pada tahun…",
    options: binary(2, ["1908", "1926", "1928", "1930", "1945"]),
  },
  {
    id: "TIU-0001",
    category: "TIU",
    text: "Tentukan bilangan berikutnya dari deret berikut: 2, 6, 12, 20, 30, …",
    options: binary(1, ["40", "42", "44", "36", "48"]),
  },
  {
    id: "TIU-0002",
    category: "TIU",
    text: "Semua ASN wajib menjaga integritas. Sebagian pegawai di kantor X adalah ASN. Kesimpulan yang paling tepat adalah…",
    options: binary(0, [
      "Sebagian pegawai di kantor X wajib menjaga integritas",
      "Semua pegawai di kantor X wajib menjaga integritas",
      "Semua pegawai di kantor X adalah ASN",
      "Tidak ada pegawai di kantor X yang wajib menjaga integritas",
      "Pegawai yang menjaga integritas pasti ASN",
    ]),
  },
  {
    id: "TIU-0003",
    category: "TIU",
    text: "DOKTER : RUMAH SAKIT = GURU : …",
    options: binary(0, ["Sekolah", "Murid", "Buku", "Kapur", "Pelajaran"]),
  },
  {
    id: "TIU-0004",
    category: "TIU",
    text: "Suatu pekerjaan dapat diselesaikan oleh 6 orang dalam 12 hari. Jika pekerjaan tersebut dikerjakan oleh 9 orang dengan kemampuan yang sama, waktu yang dibutuhkan adalah…",
    options: binary(1, ["6 hari", "8 hari", "9 hari", "10 hari", "18 hari"]),
  },
  {
    id: "TIU-0005",
    category: "TIU",
    text: "Sinonim dari kata KONKLUSI adalah…",
    options: binary(0, [
      "Kesimpulan",
      "Pendahuluan",
      "Gagasan",
      "Perdebatan",
      "Pertanyaan",
    ]),
  },
  {
    id: "TKP-0001",
    category: "TKP",
    text: "Menjelang jam pulang kantor, atasan memberikan tugas mendesak yang harus selesai esok pagi. Sikap Anda adalah…",
    options: graded([
      [
        "Menyelesaikan tugas tersebut dengan sungguh-sungguh meskipun harus lembur",
        5,
      ],
      [
        "Mengerjakan sebagian, lalu melanjutkannya besok pagi sebelum jam kerja",
        4,
      ],
      ["Meminta rekan kerja untuk membantu menyelesaikannya", 3],
      ["Menanyakan apakah tenggat waktunya dapat diundur", 2],
      ["Menolak karena jam kerja sudah hampir berakhir", 1],
    ]),
  },
  {
    id: "TKP-0002",
    category: "TKP",
    text: "Rekan satu tim melakukan kesalahan input data yang berdampak pada laporan tim. Yang Anda lakukan adalah…",
    options: graded([
      [
        "Membantu memperbaiki data dan bersama-sama menyusun langkah pencegahan",
        5,
      ],
      [
        "Memberi tahu rekan tersebut secara pribadi agar segera memperbaikinya",
        4,
      ],
      ["Melaporkan kesalahan tersebut kepada atasan", 3],
      ["Membiarkan karena itu bukan tanggung jawab Anda", 2],
      ["Menyampaikan kesalahan tersebut di depan anggota tim lainnya", 1],
    ]),
  },
  {
    id: "TKP-0003",
    category: "TKP",
    text: "Seorang warga datang ke loket layanan dan menyampaikan keluhan dengan nada marah. Tindakan Anda adalah…",
    options: graded([
      [
        "Mendengarkan dengan tenang, memahami masalahnya, lalu memberi solusi sesuai prosedur",
        5,
      ],
      ["Meminta warga tersebut menenangkan diri terlebih dahulu", 4],
      ["Mengarahkan warga ke bagian pengaduan", 3],
      ["Meminta warga datang kembali di lain waktu", 2],
      [
        "Membalas dengan nada yang sama agar warga tersebut tidak semena-mena",
        1,
      ],
    ]),
  },
  {
    id: "TKP-0004",
    category: "TKP",
    text: "Kantor Anda mulai menggunakan aplikasi persuratan elektronik yang belum Anda kuasai. Sikap Anda adalah…",
    options: graded([
      [
        "Segera mempelajarinya melalui panduan dan pelatihan agar dapat bekerja optimal",
        5,
      ],
      ["Bertanya kepada rekan yang sudah mahir saat menemui kendala", 4],
      ["Menunggu pelatihan resmi dari kantor", 3],
      ["Tetap menggunakan cara manual selama masih diperbolehkan", 2],
      ["Meminta rekan mengerjakan bagian yang menggunakan aplikasi", 1],
    ]),
  },
  {
    id: "TKP-0005",
    category: "TKP",
    text: "Pihak yang sedang mengurus perizinan di unit Anda menawarkan bingkisan sebagai tanda terima kasih. Sikap Anda adalah…",
    options: graded([
      [
        "Menolak dengan sopan dan menjelaskan bahwa layanan diberikan tanpa imbalan",
        5,
      ],
      [
        "Menolak dan melaporkan kejadian tersebut kepada unit pengendali gratifikasi",
        4,
      ],
      ["Menerima lalu segera melaporkannya kepada atasan", 3],
      ["Menerima jika nilainya kecil", 2],
      ["Menerima karena diberikan secara sukarela", 1],
    ]),
  },
];

/** Hasil contoh untuk demo bila halaman hasil dibuka langsung tanpa mengerjakan ujian. */
export const mockResult: ExamResult = {
  slug: "tes-pengangkatan-ahli-pertama",
  score: 236,
  maxScore: 300,
  correct: 41,
  wrong: 17,
  unanswered: 2,
  total: 60,
  passingGrade: 180,
  passed: true,
  startedAt: Date.UTC(2026, 9, 12, 1, 0, 12),
  finishedAt: Date.UTC(2026, 9, 12, 2, 16, 48),
  categoryScores: [
    { code: "TWK", score: 75, max: 100 },
    { code: "TIU", score: 80, max: 100 },
    { code: "TKP", score: 81, max: 100 },
  ],
};
