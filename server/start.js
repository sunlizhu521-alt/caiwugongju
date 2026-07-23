import 'dotenv/config';
import { app } from './app.js';

const port = Number(process.env.PORT || 4008);

app.listen(port, '0.0.0.0', () => {
  console.log(`caiwugongju running on port ${port}`);
});
