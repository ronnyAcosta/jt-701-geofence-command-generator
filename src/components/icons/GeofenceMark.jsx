
const FENCE_POINTS = [[10, 22], [34, 8], [56, 20], [52, 50], [18, 54]];
const FENCE_POLYGON = FENCE_POINTS.map((point) => point.join(',')).join(' ');

const GeofenceMark = () => (
  <svg className="auth-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <polygon className="auth-mark-fence" points={FENCE_POLYGON} />
    {FENCE_POINTS.map(([x, y]) => (
      <rect
        key={`${x}-${y}`}
        className="auth-mark-vertex"
        x={x - 4}
        y={y - 4}
        width="8"
        height="8"
        rx="1.5"
      />
    ))}
    <circle className="auth-mark-badge" cx="34" cy="33" r="10" />
    <text className="auth-mark-number" x="34" y="33" textAnchor="middle" dominantBaseline="central">
      1
    </text>
  </svg>
);

export default GeofenceMark