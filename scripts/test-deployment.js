// Test script for verifying Vercel deployment
const https = require('https');

// Configuration
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kevin2024!';

// Test endpoints
const endpoints = [
  { path: '/', method: 'GET', expectedStatus: 200 },
  { path: '/api/contact', method: 'OPTIONS', expectedStatus: 200 },
  { path: '/admin', method: 'GET', expectedStatus: 401 }, // Should require auth
];

// Test contact form submission
async function testContactForm() {
  console.log('Testing contact form submission...');
  
  const data = JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from deployment script'
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const url = new URL('/api/contact', SITE_URL);
    const req = (url.protocol === 'https:' ? https : require('http')).request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log(`Contact form test - Status: ${res.statusCode}`);
        console.log(`Response: ${responseData}`);
        resolve(res.statusCode === 201);
      });
    });

    req.on('error', (e) => {
      console.error(`Contact form test error: ${e.message}`);
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

// Test admin endpoint with auth
async function testAdminAuth() {
  console.log('Testing admin authentication...');
  
  const auth = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64');
  
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`
    }
  };

  return new Promise((resolve, reject) => {
    const url = new URL('/admin', SITE_URL);
    const req = (url.protocol === 'https:' ? https : require('http')).request(url, options, (res) => {
      console.log(`Admin auth test - Status: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    });

    req.on('error', (e) => {
      console.error(`Admin auth test error: ${e.message}`);
      reject(e);
    });

    req.end();
  });
}

// Run all tests
async function runTests() {
  console.log(`Testing deployment at: ${SITE_URL}\n`);
  
  let passed = 0;
  let failed = 0;

  // Test basic endpoints
  for (const endpoint of endpoints) {
    try {
      const url = new URL(endpoint.path, SITE_URL);
      const options = { method: endpoint.method };
      
      await new Promise((resolve, reject) => {
        const req = (url.protocol === 'https:' ? https : require('http')).request(url, options, (res) => {
          const success = res.statusCode === endpoint.expectedStatus;
          console.log(`${endpoint.method} ${endpoint.path} - Expected: ${endpoint.expectedStatus}, Got: ${res.statusCode} ${success ? '✓' : '✗'}`);
          
          if (success) passed++;
          else failed++;
          
          resolve();
        });

        req.on('error', (e) => {
          console.error(`Error testing ${endpoint.path}: ${e.message}`);
          failed++;
          reject(e);
        });

        req.end();
      });
    } catch (error) {
      // Error already logged
    }
  }

  // Test contact form
  try {
    const contactSuccess = await testContactForm();
    if (contactSuccess) passed++;
    else failed++;
  } catch (error) {
    failed++;
  }

  // Test admin with auth
  try {
    const adminSuccess = await testAdminAuth();
    if (adminSuccess) passed++;
    else failed++;
  } catch (error) {
    failed++;
  }

  // Summary
  console.log(`\n========== Test Summary ==========`);
  console.log(`Total tests: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`==================================`);
  
  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(console.error);