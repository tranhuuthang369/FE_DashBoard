const TopListCard = ({ title, subtitle, items }) => {
  return (
    <div className="card top-card">
      <div className="top-card-header">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="top-card-subtitle">{subtitle}</p>}
      </div>
      <ul className="top-list">
        {items.length === 0 && (
          <li className="top-list-item">
            <div className="top-main">
              <div className="top-label">No data for this period.</div>
            </div>
          </li>
        )}

        {items.map((item, index) => (
          <li key={item.id || index} className="top-list-item">
            <div className="top-rank">#{index + 1}</div>
            <div className="top-main">
              <div className="top-label">{item.label}</div>
              {item.meta && (
                <div className="top-meta">{item.meta}</div>
              )}
            </div>
            {item.value !== undefined && item.value !== null && (
              <div className="top-value">{item.value}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopListCard;
