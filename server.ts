import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/signup', (req, res) => {
    const { email, source, plan_intent, utm } = req.body;
    console.log('[API] Signup:', { email, source, plan_intent, utm });
    
    // Mock success
    res.json({ 
      success: true, 
      message: 'Signed up successfully',
      referral_code: 'ALPHA_QUANT'
    });
  });

  app.get('/api/me', (req, res) => {
    res.json({
      referral_code: 'ALPHA_QUANT',
      referral_stats: {
        count: 12,
        max: 50
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
