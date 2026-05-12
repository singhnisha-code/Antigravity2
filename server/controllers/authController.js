// Placeholder for Auth Controller
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Logic for registration
    res.status(201).json({ message: 'User registered successfully', user: { email, name, role: 'user' } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Logic for login
    res.status(200).json({ 
      message: 'Logged in successfully', 
      token: 'dummy-jwt-token',
      user: { email, name: 'Shubham Singh', role: 'admin' } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  res.status(200).json({ user: { email: 'admin@rudra.com', name: 'Shubham Singh', role: 'admin' } });
};
