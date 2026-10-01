/**
 * Vercel Serverless Function: /api/health
 * Health check & diagnostic monitor for ParkWhere Live APIs
 *
 * Checks:
 * - Server uptime & timestamp
 * - LTA_ACCOUNT_KEY presence in Vercel environment variables
 * - Upstream LTA DataMall connectivity
 * - System runtime parameters
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,HEAD');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const accountKey = process.env.LTA_ACCOUNT_KEY || process.env.VITE_LTA_ACCOUNT_KEY || '';
  const isKeyConfigured = Boolean(
    accountKey && accountKey.trim() !== '' && accountKey !== 'YOUR_LTA_DATAMALL_ACCOUNT_KEY'
  );

  let ltaConnectionStatus = 'pending_key';
  let ltaPingLatencyMs = null;

  if (isKeyConfigured) {
    const startTime = Date.now();
    try {
      // Test ping to LTA DataMall v2 endpoint with a short timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(
        'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$top=1',
        {
          method: 'GET',
          headers: {
            AccountKey: accountKey.trim(),
            accept: 'application/json'
          },
          signal: controller.signal
        }
      );
      clearTimeout(timeoutId);
      ltaPingLatencyMs = Date.now() - startTime;

      if (response.ok) {
        ltaConnectionStatus = 'operational';
      } else {
        ltaConnectionStatus = `error_http_${response.status}`;
      }
    } catch (e) {
      ltaPingLatencyMs = Date.now() - startTime;
      ltaConnectionStatus = e.name === 'AbortError' ? 'timeout' : 'unreachable';
    }
  }

  const memory = process.memoryUsage ? process.memoryUsage() : null;

  const healthData = {
    status: isKeyConfigured && ltaConnectionStatus === 'operational' ? 'healthy' : 'ready',
    service: 'ParkWhere Live Civic API Gateway',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'production',
    credentials: {
      LTA_ACCOUNT_KEY: {
        configured: isKeyConfigured,
        masked: isKeyConfigured
          ? `${accountKey.slice(0, 3)}••••••••${accountKey.slice(-3)}`
          : 'not_set_in_vercel_env',
        hint: isKeyConfigured
          ? 'API Key loaded from environment'
          : 'Add LTA_ACCOUNT_KEY in Vercel Project Settings > Environment Variables'
      }
    },
    integrations: {
      ltaDataMall: {
        status: ltaConnectionStatus,
        endpoint: 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2',
        latencyMs: ltaPingLatencyMs,
        agenciesCovered: ['HDB', 'LTA', 'URA']
      },
      endpoints: {
        carparks: '/api/carparks',
        health: '/api/health'
      }
    },
    system: {
      nodeVersion: process.version,
      memory: memory
        ? {
            rssMb: Math.round(memory.rss / (1024 * 1024)),
            heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024)),
            heapTotalMb: Math.round(memory.heapTotal / (1024 * 1024))
          }
        : 'unavailable'
    }
  };

  return res.status(200).json(healthData);
}
