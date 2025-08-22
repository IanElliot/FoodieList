import { createApp } from '@/app';
import { config } from '@/config/env';
const app = createApp();
app.listen(config.port, ()=> console.log(`FoodieList API v3 on http://localhost:${config.port}`));
