/**
 * Service to interact with /api/carparks and /api/health
 */

export interface CarparkApiResponse {
  success: boolean;
  source: string;
  accountKeyConfigured: boolean;
  totalFetched: number;
  timestamp: string;
  message?: string;
  data: any[];
}

export interface ApiHealthResponse {
  status: string;
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  credentials: {
    LTA_ACCOUNT_KEY: {
      configured: boolean;
      masked: string;
      hint: string;
    };
  };
  integrations: {
    ltaDataMall: {
      status: string;
      endpoint: string;
      latencyMs: number | null;
      agenciesCovered: string[];
    };
  };
}

export async function fetchLiveCarparkAvailability(
  filterType?: string
): Promise<CarparkApiResponse> {
  try {
    const url = filterType ? `/api/carparks?type=${filterType}` : '/api/carparks';
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) {
      throw new Error(`Failed to fetch live carparks: ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn('[LTA Service] API request error, relying on cached data:', err);
    return {
      success: false,
      source: 'offline_cache',
      accountKeyConfigured: false,
      totalFetched: 0,
      timestamp: new Date().toISOString(),
      message: err.message,
      data: []
    };
  }
}

export async function fetchApiHealth(): Promise<ApiHealthResponse | null> {
  try {
    const res = await fetch('/api/health', { headers: { accept: 'application/json' } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
