import { useMemo, useState } from "react";

const ApprovalsTable = ({ items, onApprove, onReject, onView }) => {
  const [statusFilter, setStatusFilter] = useState("pending"); // pending/approved/rejected/all

  const filteredItems = useMemo(
    () =>
      items.filter((i) =>
        statusFilter === "all" ? true : i.status === statusFilter
      ),
    [items, statusFilter]
  );

  const pendingCount = useMemo(
    () => items.filter((i) => i.status === "pending").length,
    [items]
  );

  const handleApproveClick = (id) => {
    const ok = window.confirm("Approve this content and publish it?");
    if (!ok) return;
    onApprove(id);
  };

  const handleRejectClick = (id) => {
    const ok = window.confirm(
      "Reject this content? A reason will be sent back to the teacher."
    );
    if (!ok) return;
    const reason =
      window.prompt("Enter reject reason (optional):", "") || "";
    onReject(id, reason);
  };

  return (
    <div className="card">
      <div className="approvals-header">
        <div>
          <div className="card-header-row">
            <h2 className="card-title">Content approvals</h2>
            <span className="chip-soft">{pendingCount} pending</span>
          </div>
          <p className="approvals-subtitle">
            Review lessons and quizzes submitted by teachers before publishing.
          </p>
        </div>
        <div className="approvals-filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="users-select"
          >
            <option value="pending">Pending only</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All statuses</option>
          </select>
        </div>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Level</th>
              <th>Teacher</th>
              <th>Submitted at</th>
              <th>Status</th>
              <th>Reviewer note</th>
              <th style={{ width: 210 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((i) => (
              <tr key={i.id}>
                <td className={`pill pill-${i.type}`}>{i.type}</td>
                <td>{i.title}</td>
                <td>{i.level}</td>
                <td>{i.submittedBy}</td>
                <td>{i.submittedAt}</td>
                <td className={`pill pill-${i.status}`}>{i.status}</td>
                <td>{i.note || "—"}</td>
                <td>
                  <div className="approvals-actions">
                    <button
                      className="btn-secondary"
                      onClick={() => onView(i)}
                    >
                      View
                    </button>
                    <button
                      className="btn-approve"
                      disabled={i.status === "approved"}
                      onClick={() => handleApproveClick(i.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn-reject"
                      disabled={i.status === "rejected"}
                      onClick={() => handleRejectClick(i.id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: 12 }}>
                  No content matches the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalsTable;
