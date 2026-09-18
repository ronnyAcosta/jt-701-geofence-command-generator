import ThemeToggle from '../ui/ThemeToggle';

const Title = () => {
  return (
    <div style={{ position: 'relative' }}>
      <h1 className='title'>JT701 - Geofence Commands Generator</h1>
      <ThemeToggle style={{ position: 'absolute', top: '50%', right: '1.2vw', transform: 'translateY(-50%)', color: 'inherit' }} />
    </div>
  )
}

export default Title