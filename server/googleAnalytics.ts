import { BetaAnalyticsDataClient } from '@google-analytics/data';

interface AnalyticsData {
  pageViews: number;
  activeUsers: number;
  newUsers: number;
  sessions: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
}

export class GoogleAnalyticsService {
  private client: BetaAnalyticsDataClient | null = null;
  private propertyId: string;

  constructor() {
    this.propertyId = process.env.GA_PROPERTY_ID || '';
    
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      try {
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        this.client = new BetaAnalyticsDataClient({
          credentials: credentials,
        });
      } catch (error) {
        console.error('Failed to initialize Google Analytics client:', error);
      }
    }
  }

  async getAnalyticsData(dateRange: string = '30daysAgo'): Promise<AnalyticsData | null> {
    if (!this.client || !this.propertyId) {
      console.log('Google Analytics not configured. Missing credentials or property ID.');
      return null;
    }

    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: dateRange,
            endDate: 'today',
          },
        ],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' },
          { name: 'newUsers' },
          { name: 'sessions' },
        ],
        orderBys: [
          {
            metric: {
              metricName: 'screenPageViews',
            },
            desc: true,
          },
        ],
        limit: 10,
      });

      let totalPageViews = 0;
      let totalActiveUsers = 0;
      let totalNewUsers = 0;
      let totalSessions = 0;
      const topPages: Array<{ path: string; views: number }> = [];

      if (response.rows) {
        for (const row of response.rows) {
          const pagePath = row.dimensionValues?.[0]?.value || '';
          const pageViews = parseInt(row.metricValues?.[0]?.value || '0');
          const activeUsers = parseInt(row.metricValues?.[1]?.value || '0');
          const newUsers = parseInt(row.metricValues?.[2]?.value || '0');
          const sessions = parseInt(row.metricValues?.[3]?.value || '0');

          totalPageViews += pageViews;
          totalActiveUsers += activeUsers;
          totalNewUsers += newUsers;
          totalSessions += sessions;

          if (topPages.length < 5) {
            topPages.push({ path: pagePath, views: pageViews });
          }
        }
      }

      return {
        pageViews: totalPageViews,
        activeUsers: totalActiveUsers,
        newUsers: totalNewUsers,
        sessions: totalSessions,
        topPages,
      };
    } catch (error) {
      console.error('Error fetching Google Analytics data:', error);
      return null;
    }
  }

  async getRecentPageViews(): Promise<number | null> {
    if (!this.client || !this.propertyId) {
      return null;
    }

    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
          },
        ],
        metrics: [{ name: 'screenPageViews' }],
      });

      const pageViews = parseInt(response.rows?.[0]?.metricValues?.[0]?.value || '0');
      return pageViews;
    } catch (error) {
      console.error('Error fetching page views:', error);
      return null;
    }
  }
}

export const analyticsService = new GoogleAnalyticsService();
