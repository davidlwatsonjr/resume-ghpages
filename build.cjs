'use strict';

const { writeFileSync } = require('node:fs');
const { join } = require('node:path');
const { render } = require('./theme');

const seo = {
  canonicalUrl: 'https://resume.davidlwatsonjr.com/',
  description: 'Resume of David Lee Watson Jr., senior engineering manager, software engineer, and full-stack developer. View experience, skills, and education.',
  alternateNames: [
    'David Watson',
    'David Lee Watson',
    'David Watson Jr.',
    'David L. Watson Jr.',
    'David L Watson Jr.',
  ],
  socialImage: 'https://davidlwatsonjr.com/assets/david-watson-social.jpg',
};

writeFileSync(join(__dirname, 'index.html'), render(require('./resume.json'), { ...seo, displayName: 'David Watson' }));
