'use strict';

const { writeFileSync } = require('node:fs');
const { join } = require('node:path');
const { render } = require('./theme');

writeFileSync(join(__dirname, 'index.html'), render(require('./resume.json')));
