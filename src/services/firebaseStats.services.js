// /**
//  * User object (expected shape)
//  *
//  * {
//  *   id: string;
//  *   name: string;
//  *   email: string;
//  *   role: 'learner' | 'teacher' | 'admin';
//  *   status: 'active' | 'blocked';
//  *   createdAt: string; // ISO string hoặc định dạng đã format
//  *   progress?: {
//  *     courses?: Array<{
//  *       id: string;
//  *       name: string;
//  *       progressPercent: number; // 0-100
//  *     }>;
//  *     quiz?: {
//  *       avgScore: number;               // 0-100
//  *       completionRatePercent: number;  // 0-100
//  *     };
//  *   };
//  * }
//  */

// /**
//  * Pending content (lesson / quiz) object
//  *
//  * {
//  *   id: string;
//  *   type: 'lesson' | 'quiz';
//  *   title: string;
//  *   level: string; // e.g. 'MOET 1'
//  *   submittedBy: string; // teacher name
//  *   submittedAt: string; // date time string
//  *   status: 'pending' | 'approved' | 'rejected';
//  *   note?: string; // reviewer note
//  *   shortDescription?: string;
//  *   body?: string;
//  *   media?: Array<{
//  *     id: string;
//  *     type: 'video' | 'audio' | 'image';
//  *     label: string;
//  *     url: string;
//  *   }>;
//  *   files?: Array<{
//  *     id: string;
//  *     name: string;
//  *     url: string;
//  *   }>;
//  * }
//  */

// /**
//  * Top teacher / lesson / learner items
//  *
//  * Teacher:
//  * {
//  *   id: string;
//  *   name: string;
//  *   avgRating: number;    // 0-5
//  *   lessonsCount: number;
//  * }
//  *
//  * Lesson:
//  * {
//  *   id: string;
//  *   title: string;
//  *   teacherName: string;
//  *   avgRating: number;    // 0-5
//  *   ratingCount: number;
//  * }
//  *
//  * Learner:
//  * {
//  *   id: string;
//  *   name: string;
//  *   streakDays: number;
//  *   completionRate: number; // 0-100
//  * }
//  */

// /// ==================
// /// OVERVIEW STATS
// /// ==================

// /**
//  * Total registered users.
//  */
// export const getUserStats = async () => {
//   // TODO BE: replace with real query (e.g. Firestore count / Cloud Function)
//   return 0;
// };

// /**
//  * Total published lessons.
//  */
// export const getLessonStats = async () => {
//   // TODO BE: replace with real query
//   return 0;
// };

// /**
//  * Total quiz attempts.
//  */
// export const getQuizStats = async () => {
//   // TODO BE: thay bằng số lượt làm quiz thật
//   return 0;
// };

// /**
//  * Pronunciation stats summary.
//  * Return object: { avgScore: number, totalRecords: number }
//  */
// export const getPronunciationStats = async () => {
//   // TODO BE: replace with real aggregation
//   return {
//     avgScore: 0,
//     totalRecords: 0,
//   };
// };

// /**
//  * Lesson distribution by MOET level for bar chart.
//  * Example item: { level: 'MOET 1', count: 10 }
//  */
// export const getLessonChartData = async () => {
//   // TODO BE: trả về dữ liệu thật theo level
//   return [];
// };

// /**
//  * Quiz performance trend (line chart) – e.g. over days.
//  * Example item: { day: 'Mon', avgScore: 72 }
//  */
// export const getQuizChartData = async () => {
//   // TODO BE: trả về dữ liệu thật (by day / week ...)
//   return [];
// };

// /**
//  * Pronunciation score trend (area chart).
//  * Example item: { day: 'Mon', avgScore: 84 }
//  */
// export const getPronunciationChartData = async () => {
//   // TODO BE: trả về dữ liệu thật
//   return [];
// };

// /**
//  * Recent activities timeline.
//  * Example item: { action: string, user: string, time: string }
//  */
// export const getRecentActivities = async () => {
//   // TODO BE: lấy từ log activity (Firestore / Logging / Cloud Function)
//   return [];
// };

// /// ==================
// /// USERS (LIST + UPDATE)
// /// ==================

// /**
//  * User list for Users tab.
//  * See "User object" type ở comment phía trên.
//  */
// export const getUsersList = async () => {
//   // TODO BE: query users + progress summary
//   // FE chỉ cần mảng users. Tạm thời trả về [] để không lỗi giao diện.
//   return [];
// };

// /**
//  * Update user role / status.
//  * @param {string} id
//  * @param {{ role?: string; status?: string }} updates
//  * @returns updated user object
//  */
// export const updateUser = async (id, updates) => {
//   // TODO BE:
//   // - Update Firestore / call Cloud Function
//   // - Trả về user sau khi cập nhật
//   // FE tạm thời merge object để không bị crash.
//   return {
//     id,
//     ...updates,
//   };
// };

// /// ==================
// /// APPROVALS (LESSON & QUIZ)
// /// ==================

// /**
//  * List lesson / quiz waiting for approval.
//  * See "Pending content" type ở trên.
//  */
// export const getPendingContent = async () => {
//   // TODO BE: query content có status = 'pending' (và cả approved/rejected nếu cần)
//   return [];
// };

// /**
//  * Update content status (approve / reject).
//  * @param {string} id
//  * @param {'approved' | 'rejected' | 'pending'} newStatus
//  * @param {string} note optional reviewer note
//  */
// export const updateContentStatus = async (id, newStatus, note = "") => {
//   // TODO BE:
//   // - Update Firestore / call Cloud Function
//   // - Gửi notification / email cho teacher nếu cần
//   // - Return bản ghi content sau khi update
//   return {
//     id,
//     status: newStatus,
//     note,
//   };
// };

// /// ==================
// /// TOP INSIGHTS (Overview)
// /// ==================

// /**
//  * Chuẩn hóa period từ FE.
//  * FE gửi 'day' | 'week' | 'month' | 'year'.
//  * BE có thể dùng để route sang query / function khác nhau.
//  */
// const normalizePeriod = (period) => {
//   if (!["day", "week", "month", "year"].includes(period)) return "week";
//   return period;
// };

// /**
//  * Top teachers theo period.
//  * @param {'day' | 'week' | 'month' | 'year'} period
//  */
// export const getTopTeachers = async (period = "week") => {
//   const p = normalizePeriod(period);
//   // TODO BE: trả về danh sách teachers tương ứng với period p
//   return [];
// };

// /**
//  * Top lessons theo period.
//  */
// export const getTopLessons = async (period = "week") => {
//   const p = normalizePeriod(period);
//   // TODO BE: trả về danh sách lessons tương ứng với period p
//   return [];
// };

// /**
//  * Top learners theo period.
//  */
// export const getTopLearners = async (period = "week") => {
//   const p = normalizePeriod(period);
//   // TODO BE: trả về danh sách learners tương ứng với period p
//   return [];
// };



// MOCK DATA ONLY – nhóm BE sẽ thay bằng Firestore + Cloud Functions thật

// ================== MOCK DATA ==================

// Users + learning progress
let mockUsers = [
  {
    id: "u001",
    name: "User A",
    email: "userA@example.com",
    role: "learner",
    status: "active",
    createdAt: "2025-10-01",
    progress: {
      courses: [
        {
          id: "course1",
          name: "MOET 1 – Greetings",
          progressPercent: 45,
        },
        {
          id: "course2",
          name: "MOET 2 – Family",
          progressPercent: 20,
        },
      ],
      quiz: {
        avgScore: 78,
        completionRatePercent: 60,
      },
    },
  },
  {
    id: "u002",
    name: "User B",
    email: "userB@example.com",
    role: "learner",
    status: "active",
    createdAt: "2025-10-05",
    progress: {
      courses: [
        {
          id: "course3",
          name: "MOET 1 – Alphabet & Sounds",
          progressPercent: 80,
        },
      ],
      quiz: {
        avgScore: 84,
        completionRatePercent: 72,
      },
    },
  },
  {
    id: "u003",
    name: "Teacher A",
    email: "teacherA@example.com",
    role: "teacher",
    status: "active",
    createdAt: "2025-10-10",
    progress: {
      courses: [],
      quiz: {
        avgScore: 0,
        completionRatePercent: 0,
      },
    },
  },
  {
    id: "u004",
    name: "Admin 1",
    email: "admin1@example.com",
    role: "admin",
    status: "active",
    createdAt: "2025-10-12",
    progress: {
      courses: [],
      quiz: {
        avgScore: 0,
        completionRatePercent: 0,
      },
    },
  },
];

// Pending lessons/quizzes for Approvals
let mockPendingContent = [
  {
    id: "c001",
    type: "lesson",
    title: "MOET 2 – Unit 1: Family",
    level: "MOET 2",
    submittedBy: "Teacher A",
    submittedAt: "2025-11-18 09:30",
    status: "pending",
    note: "",
    shortDescription: "Basic vocabulary and sentences about family members.",
    body:
      "In this lesson, learners practice vocabulary about family members " +
      "(father, mother, sister, brother, grandparents, etc.) and simple " +
      "sentences like: 'This is my mother', 'He is my brother'. " +
      "The lesson combines reading, listening and speaking activities.",
    media: [
      {
        id: "m1",
        type: "video",
        label: "Intro video – Family topic",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "m2",
        type: "audio",
        label: "Listening – Family dialogue",
        url: "https://www.w3schools.com/html/horse.mp3",
      },
    ],
    files: [
      {
        id: "f1",
        name: "Family-vocabulary-worksheet.pdf",
        url: "#",
      },
      {
        id: "f2",
        name: "Family-picture-cards.zip",
        url: "#",
      },
    ],
  },
  {
    id: "c002",
    type: "quiz",
    title: "Quiz – MOET 1: Greetings",
    level: "MOET 1",
    submittedBy: "Teacher B",
    submittedAt: "2025-11-18 10:15",
    status: "pending",
    note: "",
    shortDescription: "Multiple-choice quiz focusing on basic greetings.",
    body:
      "This quiz checks basic greeting expressions such as 'Hello', " +
      "'Good morning', 'Good evening', and simple question forms like " +
      "'How are you?'. It includes 10 multiple-choice questions.",
    media: [],
    files: [
      {
        id: "f3",
        name: "Quiz-greetings-export.xlsx",
        url: "#",
      },
    ],
  },
  {
    id: "c003",
    type: "lesson",
    title: "MOET 3 – Unit 4: School",
    level: "MOET 3",
    submittedBy: "Teacher C",
    submittedAt: "2025-11-19 08:20",
    status: "pending",
    note: "",
    shortDescription: "Lesson about school objects and classroom expressions.",
    body:
      "The lesson introduces vocabulary about school objects (book, pen, " +
      "ruler, board, desk, chair, etc.) and classroom expressions such as " +
      "'Open your book', 'Listen and repeat'. It also includes a short " +
      "reading passage about a day at school.",
    media: [
      {
        id: "m3",
        type: "image",
        label: "Classroom illustration",
        url: "https://via.placeholder.com/400x220.png?text=Classroom+Image",
      },
    ],
    files: [
      {
        id: "f4",
        name: "School-vocabulary-flashcards.pptx",
        url: "#",
      },
    ],
  },
];

// Top data by period (day/week/month/year)
// Ở đây mock giống nhau cho đơn giản, sau này BE dựa period filter để tính thật
const topTeachersByPeriod = {
  day: [
    { id: "t1", name: "Teacher A", avgRating: 4.9, lessonsCount: 12 },
    { id: "t2", name: "Teacher B", avgRating: 4.8, lessonsCount: 9 },
    { id: "t3", name: "Teacher C", avgRating: 4.7, lessonsCount: 7 },
  ],
  week: [
    { id: "t1", name: "Teacher A", avgRating: 4.92, lessonsCount: 18 },
    { id: "t2", name: "Teacher B", avgRating: 4.86, lessonsCount: 14 },
    { id: "t3", name: "Teacher D", avgRating: 4.75, lessonsCount: 10 },
  ],
  month: [
    { id: "t1", name: "Teacher A", avgRating: 4.93, lessonsCount: 30 },
    { id: "t5", name: "Teacher E", avgRating: 4.88, lessonsCount: 16 },
    { id: "t2", name: "Teacher B", avgRating: 4.85, lessonsCount: 22 },
  ],
  year: [
    { id: "t1", name: "Teacher A", avgRating: 4.95, lessonsCount: 80 },
    { id: "t2", name: "Teacher B", avgRating: 4.9, lessonsCount: 72 },
    { id: "t6", name: "Teacher F", avgRating: 4.88, lessonsCount: 65 },
  ],
};

const topLessonsByPeriod = {
  day: [
    {
      id: "l1",
      title: "MOET 2 – Unit 1: Family",
      teacherName: "Teacher A",
      avgRating: 4.9,
      ratingCount: 24,
    },
    {
      id: "l2",
      title: "MOET 1 – Greetings",
      teacherName: "Teacher B",
      avgRating: 4.8,
      ratingCount: 18,
    },
  ],
  week: [
    {
      id: "l1",
      title: "MOET 2 – Unit 1: Family",
      teacherName: "Teacher A",
      avgRating: 4.92,
      ratingCount: 56,
    },
    {
      id: "l3",
      title: "MOET 3 – School Life",
      teacherName: "Teacher C",
      avgRating: 4.87,
      ratingCount: 41,
    },
    {
      id: "l2",
      title: "MOET 1 – Greetings",
      teacherName: "Teacher B",
      avgRating: 4.85,
      ratingCount: 38,
    },
  ],
  month: [
    {
      id: "l4",
      title: "MOET 2 – Daily Routines",
      teacherName: "Teacher A",
      avgRating: 4.93,
      ratingCount: 120,
    },
    {
      id: "l1",
      title: "MOET 2 – Unit 1: Family",
      teacherName: "Teacher A",
      avgRating: 4.91,
      ratingCount: 96,
    },
    {
      id: "l5",
      title: "MOET 1 – Alphabet & Sounds",
      teacherName: "Teacher B",
      avgRating: 4.88,
      ratingCount: 80,
    },
  ],
  year: [
    {
      id: "l6",
      title: "MOET 3 – Vietnam Culture",
      teacherName: "Teacher G",
      avgRating: 4.95,
      ratingCount: 210,
    },
    {
      id: "l4",
      title: "MOET 2 – Daily Routines",
      teacherName: "Teacher A",
      avgRating: 4.93,
      ratingCount: 180,
    },
    {
      id: "l5",
      title: "MOET 1 – Alphabet & Sounds",
      teacherName: "Teacher B",
      avgRating: 4.9,
      ratingCount: 160,
    },
  ],
};

const topLearnersByPeriod = {
  day: [
    {
      id: "u001",
      name: "User A",
      streakDays: 5,
      completionRate: 40,
    },
    {
      id: "u002",
      name: "User B",
      streakDays: 4,
      completionRate: 55,
    },
  ],
  week: [
    {
      id: "u002",
      name: "User B",
      streakDays: 7,
      completionRate: 72,
    },
    {
      id: "u001",
      name: "User A",
      streakDays: 6,
      completionRate: 68,
    },
    {
      id: "u005",
      name: "User C",
      streakDays: 5,
      completionRate: 60,
    },
  ],
  month: [
    {
      id: "u002",
      name: "User B",
      streakDays: 18,
      completionRate: 80,
    },
    {
      id: "u005",
      name: "User C",
      streakDays: 15,
      completionRate: 76,
    },
    {
      id: "u001",
      name: "User A",
      streakDays: 14,
      completionRate: 70,
    },
  ],
  year: [
    {
      id: "u010",
      name: "User D",
      streakDays: 120,
      completionRate: 92,
    },
    {
      id: "u002",
      name: "User B",
      streakDays: 100,
      completionRate: 88,
    },
    {
      id: "u001",
      name: "User A",
      streakDays: 90,
      completionRate: 85,
    },
  ],
};

// ================== DASHBOARD OVERVIEW STATS ==================

export const getUserStats = async () => {
  return mockUsers.length;
};

export const getLessonStats = async () => {
  return 42;
};

export const getQuizStats = async () => {
  return 320;
};

export const getPronunciationStats = async () => {
  return {
    avgScore: 86,
    totalRecords: 540,
  };
};

export const getLessonChartData = async () => {
  return [
    { level: "MOET 1", count: 10 },
    { level: "MOET 2", count: 14 },
    { level: "MOET 3", count: 8 },
    { level: "MOET 4", count: 6 },
    { level: "MOET 5", count: 4 },
  ];
};

export const getQuizChartData = async () => {
  return [
    { day: "Mon", avgScore: 72 },
    { day: "Tue", avgScore: 76 },
    { day: "Wed", avgScore: 80 },
    { day: "Thu", avgScore: 78 },
    { day: "Fri", avgScore: 82 },
  ];
};

export const getPronunciationChartData = async () => {
  return [
    { day: "Mon", avgScore: 84 },
    { day: "Tue", avgScore: 86 },
    { day: "Wed", avgScore: 88 },
    { day: "Thu", avgScore: 87 },
    { day: "Fri", avgScore: 89 },
  ];
};

export const getRecentActivities = async () => {
  return [
    {
      action: "Teacher A submitted a new lesson",
      user: "Teacher A",
      time: "10 min ago",
    },
    {
      action: "Admin approved lesson ‘MOET 2 – Unit 1’",
      user: "Admin 1",
      time: "30 min ago",
    },
    {
      action: "User B completed pronunciation exercise",
      user: "User B",
      time: "1 hour ago",
    },
    {
      action: "User C passed quiz ‘Topic: Family’",
      user: "User C",
      time: "2 hours ago",
    },
  ];
};

// ================== USERS (MANAGEMENT + PROGRESS) ==================

export const getUsersList = async () => {
  await new Promise((res) => setTimeout(res, 150));
  return mockUsers;
};

export const updateUser = async (id, updates) => {
  await new Promise((res) => setTimeout(res, 150));
  mockUsers = mockUsers.map((u) =>
    u.id === id ? { ...u, ...updates } : u
  );
  const updated = mockUsers.find((u) => u.id === id);
  return updated;
};

// ================== APPROVALS (LESSON & QUIZ) ==================

export const getPendingContent = async () => {
  await new Promise((res) => setTimeout(res, 200));
  return mockPendingContent;
};

export const updateContentStatus = async (id, newStatus, note = "") => {
  await new Promise((res) => setTimeout(res, 200));
  mockPendingContent = mockPendingContent.map((item) =>
    item.id === id ? { ...item, status: newStatus, note } : item
  );
  const updated = mockPendingContent.find((i) => i.id === id);
  return updated;
};

// ================== TOP INSIGHTS (Overview) ==================

const normalizePeriod = (period) => {
  if (!["day", "week", "month", "year"].includes(period)) return "week";
  return period;
};

export const getTopTeachers = async (period = "week") => {
  const p = normalizePeriod(period);
  await new Promise((res) => setTimeout(res, 120));
  return topTeachersByPeriod[p] || [];
};

export const getTopLessons = async (period = "week") => {
  const p = normalizePeriod(period);
  await new Promise((res) => setTimeout(res, 120));
  return topLessonsByPeriod[p] || [];
};

export const getTopLearners = async (period = "week") => {
  const p = normalizePeriod(period);
  await new Promise((res) => setTimeout(res, 120));
  return topLearnersByPeriod[p] || [];
};
