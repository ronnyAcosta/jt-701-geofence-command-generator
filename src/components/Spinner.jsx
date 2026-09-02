import PropTypes from 'prop-types';

// Wraps Materialize's native "Preloader" spinner markup.
// See: https://materializecss.com/preloader.html
const Spinner = ({ size = 'default', color = 'blue', centered = true }) => {
  const sizeClass = size === 'small' ? 'small' : size === 'big' ? 'big' : '';

  return (
    <div className={`preloader-wrapper ${sizeClass} active${centered ? ' center-align' : ''}`}>
      <div className={`spinner-layer spinner-${color}-only`}>
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'default', 'big']),
  color: PropTypes.oneOf(['blue', 'red', 'yellow', 'green']),
  centered: PropTypes.bool,
};

export default Spinner;