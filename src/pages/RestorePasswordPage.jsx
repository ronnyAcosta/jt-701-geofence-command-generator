import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config-firebase';
import FormField from '../components/input/FormField';
import AuthCard from '../components/layout/AuthCard';
import { toast } from 'sonner';

const RestorePasswordPage = () => {

  const [email, setEmail] = useState('');

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    await sendPasswordResetEmail(auth, email)
      .then(() => toast.success("Password reset email sent"))
      .catch((e)=> toast.error("Error sending password reset email"));
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your account email and we'll send you a link to choose a new password."
    >
      <form className="auth-form" method='post' onSubmit={handleSubmit}>
        <div className="row">
          <FormField
            icon="email"
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <button type='submit' className='btn auth-submit waves-effect waves-light'>Send reset link</button>
      </form>

      <p className="auth-footer">
        <Link to="/login" className="auth-link">Back to log in</Link>
      </p>
    </AuthCard>
  )
}

export default RestorePasswordPage;
