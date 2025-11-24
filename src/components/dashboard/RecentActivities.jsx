const RecentActivities = ({ list }) => {
  return (
    <div className="card">
      <h2 className="card-title">Recent Activities</h2>
      <ul className="activity-list">
        {list.map((item, idx) => (
          <li key={idx} className="activity-item">
            <div className="activity-main">{item.action}</div>
            <div className="activity-meta">
              {item.user} • {item.time}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
