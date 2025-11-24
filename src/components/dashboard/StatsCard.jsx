const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="card stats-card">
      <div className="stats-card-header">
        <div className="stats-title">{title}</div>
        <span className="stats-dot" />
      </div>
      <div className="stats-main">{value}</div>
      {subtitle && <div className="stats-subtitle">{subtitle}</div>}
    </div>
  );
};

export default StatsCard;
