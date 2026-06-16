import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'hnoSS-Reference-Governance-Secret-2026';

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:3001', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// JSON File Database
const DATA_DIR = './data';
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const AUDIT_FILE = path.join(DATA_DIR, 'audit.json');
const INVITES_FILE = path.join(DATA_DIR, 'invitations.json');

// In-memory data
let users = [];
let sessions = [];
let auditLogs = [];
let invitations = [];

// Load data from JSON files
async function loadData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    try {
      const usersData = await fs.readFile(USERS_FILE, 'utf8');
      users = JSON.parse(usersData);
    } catch { users = []; }
    
    try {
      const sessionsData = await fs.readFile(SESSIONS_FILE, 'utf8');
      sessions = JSON.parse(sessionsData);
    } catch { sessions = []; }
    
    try {
      const auditData = await fs.readFile(AUDIT_FILE, 'utf8');
      auditLogs = JSON.parse(auditData);
    } catch { auditLogs = []; }
    
    try {
      const invitesData = await fs.readFile(INVITES_FILE, 'utf8');
      invitations = JSON.parse(invitesData);
    } catch { invitations = []; }
    
    // Seed default invitations if none exist
    if (invitations.length === 0) {
      const defaultCodes = [
        { code: 'HNOSS-VIP-2026', trust_level: 90, max_uses: 100, used_count: 0, is_active: 1, expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() },
        { code: 'NATO-ALLY-PARTNER', trust_level: 90, max_uses: 100, used_count: 0, is_active: 1, expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() },
        { code: 'UNGM-1172700', trust_level: 85, max_uses: 100, used_count: 0, is_active: 1, expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() },
        { code: 'TX-LAYER-ACCESS', trust_level: 95, max_uses: 50, used_count: 0, is_active: 1, expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() }
      ];
      invitations = defaultCodes;
      await saveData();
    }
    
    console.log(`✓ Loaded ${users.length} users, ${invitations.length} invitation codes`);
  } catch (err) {
    console.error('Error loading data:', err);
  }
}

// Save data to JSON files
async function saveData() {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    await fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
    await fs.writeFile(AUDIT_FILE, JSON.stringify(auditLogs, null, 2));
    await fs.writeFile(INVITES_FILE, JSON.stringify(invitations, null, 2));
  } catch (err) {
    console.error('Error saving data:', err);
  }
}

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  memberId: z.string().optional()
});

const registerSchema = z.object({
  invitationCode: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(12),
  fullName: z.string().min(2),
  organization: z.string().optional(),
  position: z.string().optional(),
  country: z.string().optional(),
  mfaEnabled: z.boolean().optional(),
  passkeyEnabled: z.boolean().optional()
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.trustLevel = decoded.trustLevel;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Audit logging
async function logAudit(userId, action, details, ipAddress) {
  auditLogs.push({
    id: uuidv4(),
    user_id: userId,
    action,
    details: JSON.stringify(details),
    ip_address: ipAddress,
    timestamp: new Date().toISOString()
  });
  await saveData();
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'operational',
    service: 'HNOSS Reference Governance API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    
    // Validate invitation code
    const invitationIndex = invitations.findIndex(
      inv => inv.code === data.invitationCode && 
             inv.is_active === 1 &&
             new Date(inv.expires_at) > new Date()
    );
    
    if (invitationIndex === -1) {
      return res.status(400).json({ error: 'Invalid or expired invitation code' });
    }

    const invitation = invitations[invitationIndex];

    if (invitation.used_count >= invitation.max_uses) {
      return res.status(400).json({ error: 'Invitation code has reached maximum uses' });
    }

    // Check if email already exists
    const existing = users.find(u => u.email === data.email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);
    const userId = uuidv4();

    // Create user
    const newUser = {
      id: userId,
      email: data.email,
      password_hash: passwordHash,
      full_name: data.fullName,
      organization: data.organization || null,
      position: data.position || null,
      country: data.country || null,
      invitation_code: data.invitationCode,
      mfa_enabled: data.mfaEnabled ? 1 : 0,
      mfa_secret: null,
      passkey_enabled: data.passkeyEnabled ? 1 : 0,
      passkey_credential: null,
      trust_level: invitation.trust_level || 50,
      black_star_level: 1,
      is_verified: 1,
      created_at: new Date().toISOString(),
      last_login: null
    };
    users.push(newUser);

    // Update invitation usage
    invitation.used_count += 1;
    if (invitation.used_count >= invitation.max_uses) {
      invitation.is_active = 0;
    }

    await saveData();

    // Log audit
    await logAudit(userId, 'USER_REGISTERED', {
      email: data.email,
      organization: data.organization,
      invitationCode: data.invitationCode
    }, req.ip);

    // Generate token
    const token = jwt.sign(
      { userId, email: data.email, trustLevel: invitation.trust_level },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: userId,
        email: data.email,
        fullName: data.fullName,
        trustLevel: invitation.trust_level,
        isVerified: true
      },
      token
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    // Find user
    const user = users.find(u => u.email === data.email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(data.password, user.password_hash);
    if (!validPassword) {
      // Log failed attempt
      await logAudit(user.id, 'LOGIN_FAILED', { email: data.email }, req.ip);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if MFA is required
    if (user.mfa_enabled === 1) {
      return res.json({
        requiresMFA: true,
        tempToken: jwt.sign(
          { userId: user.id, email: user.email, mfaRequired: true },
          JWT_SECRET,
          { expiresIn: '5m' }
        )
      });
    }

    // Update last login
    user.last_login = new Date().toISOString();
    await saveData();

    // Create session
    const sessionId = uuidv4();
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        trustLevel: user.trust_level,
        blackStar: user.black_star_level
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    sessions.push({
      id: sessionId,
      user_id: user.id,
      token,
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      is_active: 1
    });
    await saveData();

    // Log audit
    await logAudit(user.id, 'LOGIN_SUCCESS', { sessionId }, req.ip);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        organization: user.organization,
        trustLevel: user.trust_level,
        blackStarLevel: user.black_star_level,
        isVerified: user.is_verified === 1
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify MFA
app.post('/api/auth/mfa/verify', async (req, res) => {
  const { tempToken, code } = req.body;

  try {
    const decoded = jwt.verify(tempToken, JWT_SECRET);
    if (!decoded.mfaRequired) {
      return res.status(400).json({ error: 'MFA not required for this session' });
    }

    // TODO: Implement actual TOTP verification
    // For now, accept any 6-digit code starting with verified users
    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({ error: 'Invalid MFA code format' });
    }

    const userId = decoded.userId;
    
    // Get user details
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create session
    const sessionId = uuidv4();
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        trustLevel: user.trust_level,
        blackStar: user.black_star_level
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    sessions.push({
      id: sessionId,
      user_id: user.id,
      token,
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      is_active: 1
    });
    await saveData();

    await logAudit(user.id, 'LOGIN_MFA_SUCCESS', { sessionId }, req.ip);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        organization: user.organization,
        trustLevel: user.trust_level,
        blackStarLevel: user.black_star_level,
        isVerified: user.is_verified === 1
      }
    });

  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired session' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    organization: user.organization,
    position: user.position,
    country: user.country,
    trustLevel: user.trust_level,
    blackStarLevel: user.black_star_level,
    isVerified: user.is_verified === 1,
    mfaEnabled: user.mfa_enabled === 1,
    passkeyEnabled: user.passkey_enabled === 1,
    createdAt: user.created_at,
    lastLogin: user.last_login
  });
});

// Logout
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const session = sessions.find(s => s.token === token);
  if (session) {
    session.is_active = 0;
    await saveData();
  }

  await logAudit(req.userId, 'LOGOUT', {}, req.ip);

  res.json({ success: true, message: 'Logged out successfully' });
});

// Get audit logs (admin only - trust level >= 80)
app.get('/api/audit/logs', authenticateToken, (req, res) => {
  if (req.trustLevel < 80) {
    return res.status(403).json({ error: 'Insufficient trust level' });
  }

  const logs = auditLogs
    .slice()
    .reverse()
    .slice(0, 100)
    .map(log => {
      const user = users.find(u => u.id === log.user_id);
      return {
        ...log,
        user_email: user?.email,
        user_name: user?.full_name
      };
    });

  res.json({ logs });
});

// Generate invitation code (admin only - trust level >= 90)
app.post('/api/admin/invitations', authenticateToken, async (req, res) => {
  if (req.trustLevel < 90) {
    return res.status(403).json({ error: 'Insufficient trust level for invitation generation' });
  }

  const { email, organization, trustLevel = 50, maxUses = 1 } = req.body;
  const code = `HNOSS-${uuidv4().slice(0, 8).toUpperCase()}`;

  invitations.push({
    code,
    email: email || null,
    organization: organization || null,
    trust_level: trustLevel,
    max_uses: maxUses,
    used_count: 0,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    is_active: 1
  });
  await saveData();

  await logAudit(req.userId, 'INVITATION_CREATED', { code, email, trustLevel }, req.ip);

  res.json({
    success: true,
    invitation: {
      code,
      email,
      organization,
      trustLevel,
      maxUses,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  });
});

// Start server
async function startServer() {
  await loadData();
  
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║  HNOSS Reference Governance API Server                     ║
║  Port: ${PORT}                                            ║
║  Environment: ${process.env.NODE_ENV || 'development'}                    ║
╚════════════════════════════════════════════════════════════╝
  `);
    console.log(`✓ API ready at http://127.0.0.1:${PORT}/api`);
    console.log(`✓ Health check: http://127.0.0.1:${PORT}/api/health`);
  });
}

startServer();
