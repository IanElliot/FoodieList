import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'FoodieList',
  slug: 'foodielist',
  scheme: 'foodielist',
  platforms: ['ios','android','web'],
  extra: {
    apiBaseUrl: process.env.API_BASE_URL ?? 'http://127.0.0.1:3001/api'
  }
});
