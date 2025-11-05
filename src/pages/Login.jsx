function Login() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Sign In to CampusConnect</h2>
        <p>Welcome back! Please sign in to continue.</p>

        <button className="google-btn">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
          Continue with Google
        </button>

        <div className="divider">or</div>

        <input type="email" placeholder="Enter your email address" />
        <button className="continue-btn">Continue →</button>

        <p className="signup-text">
          Don’t have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;