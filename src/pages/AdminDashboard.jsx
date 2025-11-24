import { useEffect, useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import LessonChart from "../components/dashboard/LessonChart";
import QuizChart from "../components/dashboard/QuizChart";
import PronunciationChart from "../components/dashboard/PronunciationChart";
import RecentActivities from "../components/dashboard/RecentActivities";
import UsersTable from "../components/dashboard/UsersTable";
import ApprovalsTable from "../components/dashboard/ApprovalsTable";
import TopListCard from "../components/dashboard/TopListCard";

import {
  getUserStats,
  getLessonStats,
  getQuizStats,
  getPronunciationStats,
  getLessonChartData,
  getQuizChartData,
  getPronunciationChartData,
  getRecentActivities,
  getUsersList,
  getPendingContent,
  updateContentStatus,
  updateUser,
  getTopTeachers,
  getTopLessons,
  getTopLearners,
} from "../services/firebaseStats.services";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [lessonCount, setLessonCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [pronunStats, setPronunStats] = useState({
    avgScore: 0,
    totalRecords: 0,
  });
  const [lessonChart, setLessonChart] = useState([]);
  const [quizChart, setQuizChart] = useState([]);
  const [pronunChart, setPronunChart] = useState([]);
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingContent, setPendingContent] = useState([]);

  const [activeTab, setActiveTab] = useState("overview"); // overview | approvals | users

  // Overview – top lists
  const [overviewPeriod, setOverviewPeriod] = useState("week"); // day | week | month | year
  const [topTeachers, setTopTeachers] = useState([]);
  const [topLessons, setTopLessons] = useState([]);
  const [topLearners, setTopLearners] = useState([]);

  // User detail panel
  const [selectedUser, setSelectedUser] = useState(null);
  const [editRole, setEditRole] = useState("learner");
  const [editStatus, setEditStatus] = useState("active");
  const [savingUser, setSavingUser] = useState(false);

  // Content detail modal
  const [selectedContent, setSelectedContent] = useState(null);

  // Loading flags cho skeleton
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingApprovals, setLoadingApprovals] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);

  // Dropdown account
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  useEffect(() => {
    loadBaseData();
  }, []);

  useEffect(() => {
    loadTopData(overviewPeriod);
  }, [overviewPeriod]);

  const loadBaseData = async () => {
    setLoadingOverview(true);
    setLoadingUsers(true);
    setLoadingApprovals(true);

    const [
      usersTotal,
      lessonsTotal,
      quizzesTotal,
      pronun,
      lessonChartData,
      quizChartData,
      pronunChartData,
      recent,
      usersList,
      pending,
    ] = await Promise.all([
      getUserStats(),
      getLessonStats(),
      getQuizStats(),
      getPronunciationStats(),
      getLessonChartData(),
      getQuizChartData(),
      getPronunciationChartData(),
      getRecentActivities(),
      getUsersList(),
      getPendingContent(),
    ]);

    setUserCount(usersTotal);
    setLessonCount(lessonsTotal);
    setQuizCount(quizzesTotal);
    setPronunStats(pronun);
    setLessonChart(lessonChartData);
    setQuizChart(quizChartData);
    setPronunChart(pronunChartData);
    setActivities(recent);
    setUsers(usersList);
    setPendingContent(pending);

    setLoadingOverview(false);
    setLoadingUsers(false);
    setLoadingApprovals(false);

    // load lần đầu cho top (tuần)
    loadTopData("week");
  };

  const loadTopData = async (period) => {
    setLoadingTop(true);
    const [teachers, lessons, learners] = await Promise.all([
      getTopTeachers(period),
      getTopLessons(period),
      getTopLearners(period),
    ]);
    setTopTeachers(teachers);
    setTopLessons(lessons);
    setTopLearners(learners);
    setLoadingTop(false);
  };

  const handleApprove = async (id) => {
    const updated = await updateContentStatus(id, "approved");
    setPendingContent((prev) =>
      prev.map((i) => (i.id === id ? updated : i))
    );
  };

  const handleReject = async (id, reason) => {
    const updated = await updateContentStatus(id, "rejected", reason);
    setPendingContent((prev) =>
      prev.map((i) => (i.id === id ? updated : i))
    );
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditStatus(user.status);
  };

  const handleSaveUser = async () => {
    if (!selectedUser) return;
    setSavingUser(true);
    try {
      const updated = await updateUser(selectedUser.id, {
        role: editRole,
        status: editStatus,
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === updated.id ? updated : u))
      );
      setSelectedUser(null);
    } finally {
      setSavingUser(false);
    }
  };

  const closeUserPanel = () => {
    if (savingUser) return;
    setSelectedUser(null);
  };

  const handleViewContent = (item) => {
    setSelectedContent(item);
  };

  const closeContentModal = () => {
    setSelectedContent(null);
  };

  const getUserCourses = () =>
    selectedUser?.progress?.courses || [];

  const getUserQuizProgress = () =>
    selectedUser?.progress?.quiz || null;

  // Build items cho TopListCard
  const teacherItems = topTeachers.map((t) => ({
    id: t.id,
    label: t.name,
    meta: `${t.lessonsCount} lessons · ${t.avgRating.toFixed(2)}/5`,
    value: `${t.avgRating.toFixed(2)}`,
  }));

  const lessonItems = topLessons.map((l) => ({
    id: l.id,
    label: l.title,
    meta: `by ${l.teacherName} · ${l.ratingCount} ratings`,
    value: `${l.avgRating.toFixed(2)}`,
  }));

  const learnerItems = topLearners.map((u) => ({
    id: u.id,
    label: u.name,
    meta: `${u.streakDays} study days · ${u.completionRate}% completion`,
    value: `${u.completionRate}%`,
  }));

  const todayLabel = new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  const toggleTheme = () => {
    document.body.classList.toggle("theme-light");
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setAccountMenuOpen(false);
    alert("Logout clicked (mock). BE sẽ gắn logic đăng xuất thật ở đây.");
  };

  return (
    <div className="dashboard-root">
      {/* TOP BAR giống mẫu Monex */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="brand-mark">EV</div>
          <div className="brand-text">
            <span className="brand-name">eLearnViet</span>
            <span className="brand-subtitle">
              Admin dashboard · {todayLabel}
            </span>
          </div>
        </div>

        <nav className="topbar-nav">
          <button
            className={`topbar-nav-btn ${
              activeTab === "overview" ? "topbar-nav-btn-active" : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`topbar-nav-btn ${
              activeTab === "approvals" ? "topbar-nav-btn-active" : ""
            }`}
            onClick={() => setActiveTab("approvals")}
          >
            Approvals
          </button>
          <button
            className={`topbar-nav-btn ${
              activeTab === "users" ? "topbar-nav-btn-active" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </nav>

        <div className="topbar-right">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Toggle light / dark mode"
          >
            🌓
          </button>

          <div className="account-wrapper">
            <button
              type="button"
              className="account-button"
              onClick={toggleAccountMenu}
            >
              <div className="avatar-circle">AD</div>
              <div className="account-meta">
                <span className="account-name">Admin</span>
                <span className="account-role">Super admin</span>
              </div>
              <span className="account-chevron">▾</span>
            </button>

            {accountMenuOpen && (
              <div className="account-menu">
                <button type="button">Profile</button>
                <button type="button">Settings</button>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ======= CONTENT SECTIONS ======= */}

      {/* Overview tab */}
      {activeTab === "overview" && (
        <>
          <section className="grid-3">
            {loadingOverview ? (
              <>
                <div className="card stats-card">
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "40%" }}
                  />
                  <div
                    className="skeleton skeleton-text-lg"
                    style={{ width: "70%", marginTop: 8 }}
                  />
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "55%", marginTop: 8 }}
                  />
                </div>
                <div className="card stats-card">
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "36%" }}
                  />
                  <div
                    className="skeleton skeleton-text-lg"
                    style={{ width: "60%", marginTop: 8 }}
                  />
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "48%", marginTop: 8 }}
                  />
                </div>
                <div className="card stats-card">
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "30%" }}
                  />
                  <div
                    className="skeleton skeleton-text-lg"
                    style={{ width: "65%", marginTop: 8 }}
                  />
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "40%", marginTop: 8 }}
                  />
                </div>
              </>
            ) : (
              <>
                <StatsCard
                  title="Total users"
                  value={userCount}
                  subtitle="Registered learners"
                />
                <StatsCard
                  title="Total lessons"
                  value={lessonCount}
                  subtitle="Published content"
                />
                <StatsCard
                  title="Quiz attempts"
                  value={quizCount}
                  subtitle="Completed quiz submissions"
                />
              </>
            )}
          </section>

          {/* Top insights block */}
          <section className="top-section">
            <div className="top-header-row">
              <div>
                <h2 className="card-title">Top insights</h2>
                <p className="top-card-subtitle">
                  Highest-rated teachers & lessons, plus most active learners.
                </p>
              </div>

              <select
                value={overviewPeriod}
                onChange={(e) => setOverviewPeriod(e.target.value)}
                className="top-period-select"
              >
                <option value="day">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
            </div>

            <div className="grid-3">
              {loadingTop ? (
                <>
                  <div className="card">
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "45%" }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "80%", marginTop: 10 }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "72%", marginTop: 6 }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "60%", marginTop: 6 }}
                    />
                  </div>
                  <div className="card">
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "45%" }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "80%", marginTop: 10 }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "72%", marginTop: 6 }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "60%", marginTop: 6 }}
                    />
                  </div>
                  <div className="card">
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "45%" }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "80%", marginTop: 10 }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "72%", marginTop: 6 }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "60%", marginTop: 6 }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <TopListCard
                    title="Top teachers"
                    subtitle="Based on learner ratings"
                    items={teacherItems}
                  />
                  <TopListCard
                    title="Top lessons"
                    subtitle="Rated lessons for the selected period"
                    items={lessonItems}
                  />
                  <TopListCard
                    title="Top learners"
                    subtitle="Most consistent learners & completion"
                    items={learnerItems}
                  />
                </>
              )}
            </div>
          </section>

          <section className="grid-3 charts-row">
            {loadingOverview ? (
              <>
                <div className="card">
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "50%" }}
                  />
                  <div
                    className="skeleton"
                    style={{ marginTop: 14, height: 180, borderRadius: 12 }}
                  />
                </div>
                <div className="card">
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "60%" }}
                  />
                  <div
                    className="skeleton"
                    style={{ marginTop: 14, height: 180, borderRadius: 12 }}
                  />
                </div>
                <div className="card">
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "55%" }}
                  />
                  <div
                    className="skeleton"
                    style={{ marginTop: 14, height: 180, borderRadius: 12 }}
                  />
                </div>
              </>
            ) : (
              <>
                <LessonChart data={lessonChart} />
                <QuizChart data={quizChart} />
                <PronunciationChart data={pronunChart} />
              </>
            )}
          </section>

          <section className="activities-row">
            {loadingOverview ? (
              <div className="card">
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "40%" }}
                />
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "80%", marginTop: 10 }}
                />
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "72%", marginTop: 6 }}
                />
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "68%", marginTop: 6 }}
                />
              </div>
            ) : (
              <RecentActivities list={activities} />
            )}
          </section>
        </>
      )}

      {/* Approvals tab */}
      {activeTab === "approvals" && (
        <section style={{ marginTop: 16 }}>
          {loadingApprovals ? (
            <div className="card">
              <div
                className="skeleton skeleton-text"
                style={{ width: "45%" }}
              />
              <div
                className="skeleton skeleton-text"
                style={{ width: "65%", marginTop: 6 }}
              />
              <div
                className="skeleton"
                style={{ marginTop: 14, height: 160, borderRadius: 12 }}
              />
            </div>
          ) : (
            <ApprovalsTable
              items={pendingContent}
              onApprove={handleApprove}
              onReject={handleReject}
              onView={handleViewContent}
            />
          )}
        </section>
      )}

      {/* Users tab */}
      {activeTab === "users" && (
        <section style={{ marginTop: 16 }}>
          {loadingUsers ? (
            <div className="card">
              <div
                className="skeleton skeleton-text"
                style={{ width: "40%" }}
              />
              <div
                className="skeleton skeleton-text"
                style={{ width: "70%", marginTop: 6 }}
              />
              <div
                className="skeleton"
                style={{ marginTop: 14, height: 200, borderRadius: 12 }}
              />
            </div>
          ) : (
            <UsersTable users={users} onEdit={handleEditUser} />
          )}
        </section>
      )}

      <footer className="dashboard-footer">
        <span>eLearnViet · Admin Dashboard (FE only – Firebase template ready)</span>
      </footer>

      {/* User side panel */}
      {selectedUser && (
        <div className="overlay" onClick={closeUserPanel}>
          <div
            className="side-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>User detail</h2>
            <p className="panel-subtitle">
              View and update user role, status & learning progress.
            </p>

            <div className="panel-field">
              <label>User ID</label>
              <div className="panel-field-value">{selectedUser.id}</div>
            </div>

            <div className="panel-field">
              <label>Full name</label>
              <div className="panel-field-value">{selectedUser.name}</div>
            </div>

            <div className="panel-field">
              <label>Email</label>
              <div className="panel-field-value">{selectedUser.email}</div>
            </div>

            <div className="panel-field">
              <label>Role</label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
              >
                <option value="learner">Learner</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="panel-field">
              <label>Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <div className="panel-field">
              <label>Created at</label>
              <div className="panel-field-value">
                {selectedUser.createdAt}
              </div>
            </div>

            {/* Learning progress – courses */}
            <div className="panel-field">
              <label>Courses in progress</label>
              {getUserCourses().length === 0 ? (
                <div className="panel-field-value">
                  No active course for this user.
                </div>
              ) : (
                <ul style={{ paddingLeft: 16, margin: "4px 0" }}>
                  {getUserCourses().map((course) => (
                    <li key={course.id} className="panel-field-value">
                      {course.name} – {course.progressPercent}%
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Learning progress – quiz summary */}
            <div className="panel-field">
              <label>Quiz performance</label>
              {getUserQuizProgress() ? (
                <div className="panel-field-value">
                  Average quiz score: {getUserQuizProgress().avgScore}%
                  <br />
                  Completion rate:{" "}
                  {getUserQuizProgress().completionRatePercent}%
                </div>
              ) : (
                <div className="panel-field-value">No quiz data.</div>
              )}
            </div>

            <div className="panel-actions">
              <button
                className="btn-secondary"
                onClick={closeUserPanel}
                disabled={savingUser}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleSaveUser}
                disabled={savingUser}
              >
                {savingUser ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content view modal */}
      {selectedContent && (
        <div className="overlay" onClick={closeContentModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Content detail</h2>
            <p className="panel-subtitle">
              Read full lesson/quiz content before approving.
            </p>

            {/* Meta info */}
            <div className="panel-field">
              <label>Type</label>
              <div className={`panel-pill pill-${selectedContent.type}`}>
                {selectedContent.type}
              </div>
            </div>

            <div className="panel-field">
              <label>Title</label>
              <div className="panel-field-value">
                {selectedContent.title}
              </div>
            </div>

            <div className="panel-field">
              <label>Level</label>
              <div className="panel-field-value">
                {selectedContent.level}
              </div>
            </div>

            <div className="panel-field">
              <label>Teacher</label>
              <div className="panel-field-value">
                {selectedContent.submittedBy}
              </div>
            </div>

            <div className="panel-field">
              <label>Submitted at</label>
              <div className="panel-field-value">
                {selectedContent.submittedAt}
              </div>
            </div>

            <div className="panel-field">
              <label>Short description</label>
              <div className="panel-field-value">
                {selectedContent.shortDescription || "—"}
              </div>
            </div>

            {/* Body content */}
            <div className="panel-field">
              <label>Content</label>
              <div className="content-body">
                {selectedContent.body || "No body content."}
              </div>
            </div>

            {/* Media (video/audio/image) */}
            {selectedContent.media &&
              selectedContent.media.length > 0 && (
                <div className="panel-field">
                  <label>Media</label>
                  <div className="content-media-list">
                    {selectedContent.media.map((m) => (
                      <div key={m.id} className="content-media-item">
                        <div className="panel-field-value">
                          {m.label}
                        </div>
                        {m.type === "video" && (
                          <video controls src={m.url} />
                        )}
                        {m.type === "audio" && (
                          <audio controls src={m.url} />
                        )}
                        {m.type === "image" && (
                          <img src={m.url} alt={m.label} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Attached files */}
            {selectedContent.files &&
              selectedContent.files.length > 0 && (
                <div className="panel-field">
                  <label>Attachments</label>
                  <div className="content-file-list">
                    {selectedContent.files.map((f) => (
                      <div key={f.id} className="content-file-item">
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {f.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Reviewer note */}
            <div className="panel-field">
              <label>Reviewer note</label>
              <div className="panel-field-value">
                {selectedContent.note || "—"}
              </div>
            </div>

            <div className="panel-actions">
              <button
                className="btn-primary"
                onClick={closeContentModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
