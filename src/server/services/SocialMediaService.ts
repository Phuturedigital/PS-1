import { OAuth2Client } from 'google-auth-library';
import { Facebook, Instagram, LinkedIn } from '../integrations';
import { User } from '../models/User';
import { Analytics } from '../models/Analytics';
import { logger } from '../utils/logger';

export class SocialMediaService {
  private fb: Facebook;
  private ig: Instagram;
  private li: LinkedIn;

  constructor() {
    this.fb = new Facebook();
    this.ig = new Instagram();
    this.li = new LinkedIn();
  }

  async connectPlatform(userId: string, platform: string, authCode: string) {
    try {
      let accessToken, refreshToken, platformUserId;

      switch (platform) {
        case 'facebook':
          ({ accessToken, refreshToken, platformUserId } = await this.fb.authenticate(authCode));
          break;
        case 'instagram':
          ({ accessToken, refreshToken, platformUserId } = await this.ig.authenticate(authCode));
          break;
        case 'linkedin':
          ({ accessToken, refreshToken, platformUserId } = await this.li.authenticate(authCode));
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      await User.findByIdAndUpdate(userId, {
        $push: {
          socialAccounts: {
            platform,
            accessToken,
            refreshToken,
            platformUserId,
            connected: true
          }
        }
      });

      return { success: true };
    } catch (error) {
      logger.error(`Error connecting ${platform}:`, error);
      throw error;
    }
  }

  async fetchAnalytics(userId: string, platform: string, dateRange: { start: Date; end: Date }) {
    try {
      const user = await User.findById(userId);
      const account = user.socialAccounts.find(acc => acc.platform === platform);

      if (!account || !account.connected) {
        throw new Error(`${platform} account not connected`);
      }

      let analyticsData;
      switch (platform) {
        case 'facebook':
          analyticsData = await this.fb.getAnalytics(account.accessToken, dateRange);
          break;
        case 'instagram':
          analyticsData = await this.ig.getAnalytics(account.accessToken, dateRange);
          break;
        case 'linkedin':
          analyticsData = await this.li.getAnalytics(account.accessToken, dateRange);
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      // Store analytics data
      await Analytics.create({
        userId,
        platform,
        date: new Date(),
        ...analyticsData
      });

      return analyticsData;
    } catch (error) {
      logger.error(`Error fetching ${platform} analytics:`, error);
      throw error;
    }
  }
}