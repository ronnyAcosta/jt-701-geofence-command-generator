import ThemeToggle from '../ui/ThemeToggle';

const Title = () => {
  return (
    <div className="title-bar">
      <h1 className="title-bar-name">
        <span className="title-bar-brand">JT701</span>
        <span className="title-bar-descriptor">Geofence Command Generator</span>
      </h1>
      <ThemeToggle style={{ color: 'inherit' }} />
    </div>
  )
}

export default Title