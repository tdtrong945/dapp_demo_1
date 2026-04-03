const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'your_jwt_secret_key_here'; // Thay đổi trong production

app.use(cors());
app.use(express.json());

// Khởi tạo database
const db = new sqlite3.Database('./members.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    createTables();
  }
});

// Tạo bảng members
function createTables() {
  db.run(`CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'member',
    metamask_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating members table:', err.message);
    } else {
      console.log('Members table created or already exists.');
    }
  });
}

// Middleware xác thực JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// API Routes

// Đăng ký
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO members (username, password, role) VALUES (?, ?, ?)`,
      [username, hashedPassword, 'member'],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Username already exists' });
          }
          return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({
          message: 'Registration successful',
          userId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Đăng nhập
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get(`SELECT * FROM members WHERE username = ?`, [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          metamask_address: user.metamask_address
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
});

// Đăng nhập bằng MetaMask
app.post('/api/login-metamask', (req, res) => {
  const { metamaskAddress } = req.body;

  if (!metamaskAddress) {
    return res.status(400).json({ error: 'MetaMask address is required' });
  }

  db.get(`SELECT * FROM members WHERE LOWER(metamask_address) = LOWER(?)`,
    [metamaskAddress],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(404).json({ error: 'No account linked to this MetaMask address' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          metamask_address: user.metamask_address
        }
      });
    }
  );
});

// Lấy thông tin member hiện tại
app.get('/api/member', authenticateToken, (req, res) => {
  db.get(`SELECT id, username, role, metamask_address, created_at FROM members WHERE id = ?`,
    [req.user.id],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user });
    }
  );
});

// Liên kết MetaMask
app.post('/api/link-metamask', authenticateToken, (req, res) => {
  const { metamaskAddress } = req.body;

  if (!metamaskAddress) {
    return res.status(400).json({ error: 'MetaMask address is required' });
  }

  db.run(`UPDATE members SET metamask_address = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [metamaskAddress, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'MetaMask linked successfully' });
    }
  );
});

// Admin: Lấy danh sách tất cả members
app.get('/api/admin/members', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  db.all(`SELECT id, username, role, metamask_address, created_at FROM members ORDER BY created_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({ members: rows });
    }
  );
});

// Admin: Cập nhật member
app.put('/api/admin/members/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { role, metamask_address } = req.body;
  const memberId = req.params.id;

  db.run(`UPDATE members SET role = ?, metamask_address = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [role, metamask_address, memberId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Member not found' });
      }

      res.json({ message: 'Member updated successfully' });
    }
  );
});

// Admin: Xóa member
app.delete('/api/admin/members/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const memberId = req.params.id;

  db.run(`DELETE FROM members WHERE id = ?`, [memberId], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ message: 'Member deleted successfully' });
  });
});

// Tạo admin mặc định (chỉ chạy một lần)
app.post('/api/setup-admin', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    db.run(`INSERT OR IGNORE INTO members (username, password, role) VALUES (?, ?, ?)`,
      ['admin', hashedPassword, 'admin'],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({ message: 'Admin setup completed' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});