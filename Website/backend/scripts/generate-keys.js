const { generateApiKey } = require('../middleware/authMiddleware');

console.log('\n🔐 Generating API Keys...');
console.log('==========================\n');

const apiKey = generateApiKey();
const adminApiKey = generateApiKey();

console.log('Regular API Key (for frontend):');
console.log(`API_KEY=${apiKey}\n`);

console.log('Admin API Key (for protected endpoints):');
console.log(`ADMIN_API_KEY=${adminApiKey}\n`);

console.log('📋 Add these to your .env file');
console.log('==========================\n');

console.log('💡 Usage:');
console.log('- Regular API Key: For read-only or limited access');
console.log('- Admin API Key: For full CRUD operations');
console.log('\n⚠️  Keep these keys secure! Do not commit to version control.');