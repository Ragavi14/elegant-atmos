import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

export default function AdminLogin({ isAdmin, setIsAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (isAdmin) return <Navigate to="/admin/dashboard" replace />;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsAdmin();
        navigate('/admin/dashboard'); 
      } else {
        setError(data.message || 'Access Denied: Invalid Maintainer Credentials');
      }
    // } catch (err) {
    //   setError('Could not connect to secure authentication server.');
    // }
     } catch (err) {
  console.log(err);
  setError(err.message);
}
  };

 return (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#0f172a', // Forces a dark slate reset over the landing page background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999999, // Enforces absolute visibility over any fixed landing page headers
    fontFamily:"'Poppins', sans-serif"
  }}>
    <form onSubmit={handleLoginSubmit} style={styles.card}>
      <h2 style={styles.title}>ELEGANT ATMOS </h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.group}>
        <label style={styles.label}>Username</label>
        <input type="text" style={styles.input} value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div style={styles.group}>
        <label style={styles.label}>Password</label>
        <input type="password" style={styles.input} value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" style={styles.btn}>Login</button>
    </form>
  </div>
);
}

const styles = {
  container: { position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', backgroundColor:'#0f172a', display:'flex', justifyContent:'center', alignItems:'center', zIndex:999999, fontFamily:'sans-serif' },
  card: { width:'100%', maxWidth:'360px', padding:'35px', backgroundColor:'#fff', borderRadius:'10px', boxShadow:'0 10px 30px rgba(0,0,0,0.2)' },
  title: { margin:'0 0 20px 0', fontSize:'22px', color:'#1e293b', textAlign:'center', fontWeight:'bold' },
  group: { marginBottom:'15px' },
  label: { display:'block', marginBottom:'5px', fontSize:'14px', fontWeight:'600', color:'#475569' },
  input: { width:'100%', padding:'10px', boxSizing:'border-box', border:'1px solid #cbd5e1', borderRadius:'6px', color:'#000', fontSize:'15px' },
  btn: { fontFamily:"'Poppins', sans-serif", width:'100%', padding:'12px', backgroundColor:'#5F733C', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'bold', fontSize:'16px' },
  error: { color:'#b91c1c', backgroundColor:'#fef2f2', padding:'10px', borderRadius:'6px', fontSize:'13px', textAlign:'center', marginBottom:'15px' }
};