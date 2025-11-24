import { useMemo, useState } from "react";

const UsersTable = ({ users, onEdit }) => {
  const [keyword, setKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchText =
        u.name.toLowerCase().includes(keyword.toLowerCase()) ||
        u.email.toLowerCase().includes(keyword.toLowerCase());
      const matchRole = roleFilter === "all" ? true : u.role === roleFilter;
      return matchText && matchRole;
    });
  }, [users, keyword, roleFilter]);

  const totalUsers = users.length;
  const visibleUsers = filteredUsers.length;

  return (
    <div className="card">
      <div className="users-header">
        <div>
          <h2 className="card-title">User Management</h2>
          <p className="users-subtitle">
            {visibleUsers === totalUsers
              ? `${totalUsers} users`
              : `${visibleUsers} / ${totalUsers} users`}
            {" · View, search and filter users, including learning progress."}
          </p>
        </div>
        <div className="users-filters">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="users-search"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="users-select"
          >
            <option value="all">All roles</option>
            <option value="learner">Learner</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created at</th>
              <th>Courses in progress</th>
              <th>Quiz performance</th>
              <th style={{ width: 110 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => {
              const courses = u.progress?.courses || [];
              const quiz = u.progress?.quiz || null;

              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td className={`pill pill-${u.role}`}>{u.role}</td>
                  <td className={`pill pill-${u.status}`}>{u.status}</td>
                  <td>{u.createdAt}</td>

                  {/* Courses in progress */}
                  <td>
                    {courses.length === 0 ? (
                      <span
                        style={{
                          color: "var(--text-soft)",
                          fontSize: 12,
                        }}
                      >
                        No active course
                      </span>
                    ) : (
                      <ul
                        style={{
                          paddingLeft: 16,
                          margin: 0,
                          listStyle: "disc",
                        }}
                      >
                        {courses.map((c) => (
                          <li
                            key={c.id}
                            style={{
                              fontSize: 12,
                              color: "var(--text-primary)",
                            }}
                          >
                            {c.name} – {c.progressPercent}%
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>

                  {/* Quiz performance */}
                  <td>
                    {quiz ? (
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--text-primary)",
                        }}
                      >
                        Avg score: {quiz.avgScore}%
                        <br />
                        Completion: {quiz.completionRatePercent}%
                      </div>
                    ) : (
                      <span
                        style={{
                          color: "var(--text-soft)",
                          fontSize: 12,
                        }}
                      >
                        No quiz data
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td>
                    <button
                      className="btn-secondary"
                      onClick={() => onEdit(u)}
                    >
                      View / Edit
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: 12 }}>
                  No users match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
