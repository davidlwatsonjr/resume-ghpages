'use strict';

const { writeFileSync } = require('node:fs');
const { join } = require('node:path');
const { render } = require('./theme');

writeFileSync(join(__dirname, 'v2.html'), render(require('./resume.json')));
