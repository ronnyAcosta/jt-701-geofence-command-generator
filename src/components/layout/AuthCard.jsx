import PropTypes from 'prop-types';
import Title from './Title';
import GeofenceMark from '../icons/GeofenceMark';

const AuthCard = ({ title, subtitle, children }) => (
  <>
    <Title />

    <div className="auth-page">
      <section className="auth-card" aria-labelledby="auth-heading">
        <GeofenceMark />
        <h2 id="auth-heading" className="auth-heading">{title}</h2>
        {subtitle && <p className="auth-subheading">{subtitle}</p>}
        {children}
      </section>
    </div>
  </>
);

AuthCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default AuthCard;
