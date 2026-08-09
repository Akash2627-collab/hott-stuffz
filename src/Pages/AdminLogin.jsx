import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin')
    } catch (err) {
      setError('Wrong email or password. Try again.')
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      backgroundColor: '#F3F1EA'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '48px',
        width: '400px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontFamily: 'Rye, serif',
          color: '#A31621',
          marginBottom: '8px',
          fontSize: '24px'
        }}>
          Admin Login
        </h1>
        <p style={{
          color: '#4A4540',
          fontSize: '13px',
          marginBottom: '32px'
        }}>
          Hott Stuffz Dashboard
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #4A4540',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            marginBottom: '16px',
            boxSizing: 'border-box'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #4A4540',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            marginBottom: '24px',
            boxSizing: 'border-box'
          }}
        />

        {error && (
          <p style={{ color: '#A31621', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#A31621',
            color: '#F3F1EA',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default AdminLogin