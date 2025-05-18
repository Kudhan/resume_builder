import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError('Invalid email');
      return;
    }

    if(!password){
      setError('Password is required');
    }

    setError(null);
    navigate('/dashboard');
  };

  return (
    <div className="w-[90vw] sm:w-[60vw] md:w-[40vw] lg:w-[33vw] p-6 md:p-8 flex flex-col justify-center mx-auto">
      <h3 className="text-lg font-semibold text-center text-black mb-2">Welcome Back</h3>
      <p className="text-xs text-center text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="sample@gmail.com"
          type="email"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Password"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary"
        >
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 my-3 text-center">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentPage('signup')}
            className="font-medium text-blue-600 underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
