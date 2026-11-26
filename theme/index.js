'use strict';

const css = require('./styles.js');
const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => entities[char]);
const join = (values, separator = ' · ') => values.filter(Boolean).join(separator);

function link(url, label) {
  if (!label) return '';
  if (!/^(https?:\/\/|mailto:|tel:)/i.test(url ?? '')) return escape(label);
  return '<a href="' + escape(url) + '">' + escape(label) + '</a>';
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function date(value) {
  const [year, month] = String(value ?? '').split('-');
  return months[Number(month) - 1] ? months[Number(month) - 1] + ' ' + year : year;
}

function period({ startDate, endDate, date: singleDate }, ongoing) {
  if (!startDate) return date(endDate || singleDate);
  return join([date(startDate), date(endDate) || (ongoing ? 'Present' : '')], ' – ');
}

function paragraphs(text) {
  return String(text ?? '').split(/\n\s*\n/).filter((part) => part.trim())
    .map((part) => '<p>' + escape(part) + '</p>').join('');
}

function entry(item, title, subtitle, ongoing = false) {
  const when = period(item, ongoing);
  const details = join([subtitle, item.location, item.score, ...(item.courses ?? [])]);
  const highlights = item.highlights ?? [];
  return `<article class="entry">
  <header class="entry-head">
    <div>
      <h3>${link(item.url, title || subtitle)}</h3>
      ${details ? '<p class="byline">' + escape(details) + '</p>' : ''}
    </div>
    ${when ? '<p class="date">' + escape(when) + '</p>' : ''}
  </header>
  ${paragraphs(item.summary || item.description)}
  ${highlights.length ? '<ul>' + highlights.map((point) => '<li>' + escape(point) + '</li>').join('') + '</ul>' : ''}
  ${item.keywords?.length ? '<p class="byline">' + escape(item.keywords.join(', ')) + '</p>' : ''}
  </article>`;
}

function section(title, content, className = '') {
  if (!content) return '';
  return `<section class="section ${className}"><h2>${title}</h2><div class="section-content">${content}</div></section>`;
}

function searchMetadata(basics, seo, title) {
  const { canonicalUrl, description, socialImage } = seo;
  const person = {
    '@type': 'Person',
    '@id': basics.url + '#david-watson',
    name: basics.name,
    alternateName: seo.alternateNames,
    jobTitle: basics.label,
    url: basics.url,
    image: basics.image ? new URL(basics.image, canonicalUrl).href : undefined,
    sameAs: (basics.profiles ?? []).map(({ url }) => url).filter(Boolean),
  };
  const profile = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': canonicalUrl + '#profile',
    url: canonicalUrl,
    name: title,
    description,
    mainEntity: person,
  };
  const json = JSON.stringify(profile).replace(/</g, '\\u003c');

  return '<meta name="description" content="' + escape(description) + '">\n' +
    '  <link rel="canonical" href="' + escape(canonicalUrl) + '">\n' +
    '  <meta name="robots" content="max-image-preview:large">\n' +
    '  <meta property="og:type" content="profile">\n' +
    '  <meta property="og:title" content="' + escape(title) + '">\n' +
    '  <meta property="og:description" content="' + escape(description) + '">\n' +
    '  <meta property="og:url" content="' + escape(canonicalUrl) + '">\n' +
    '  <meta property="og:image" content="' + escape(socialImage) + '">\n' +
    '  <meta property="og:image:alt" content="' + escape(basics.name) + '">\n' +
    '  <meta name="twitter:card" content="summary_large_image">\n' +
    '  <link rel="icon" href="/favicon.ico" sizes="any">\n' +
    '  <link rel="apple-touch-icon" href="/apple-touch-icon.png">\n' +
    '  <script type="application/ld+json">' + json + '</script>';
}

function render(resume = {}, seo) {
  const { basics = {} } = resume;
  const title = seo
    ? basics.name + ' Resume | ' + basics.label
    : join([basics.name || 'Resume', basics.label], ' | ');
  const { location = {} } = basics;
  const locationText = join([location.city, location.region, location.countryCode], ', ');
  const portraitUrl = basics.image ?? '';
  const portrait = /^(https?:\/\/|[\w.-]+\/)/i.test(portraitUrl)
    ? '<img class="portrait" src="' + escape(portraitUrl) + '" width="400" height="400" alt="">'
    : '';
  const contacts = [
    escape(locationText),
    link('mailto:' + basics.email, basics.email),
    link('tel:' + basics.phone, basics.phone),
    link(basics.url, basics.url?.replace(/^https?:\/\//, '').replace(/\/$/, '')),
    ...(basics.profiles ?? []).map((profile) => link(profile.url, profile.network || profile.username)),
  ].filter(Boolean);
  const entries = (key, formatter) => (resume[key] ?? []).map(formatter).join('');
  const compact = (items, label, detail) => items.map((item) =>
    `<div class="compact-row"><h3>${escape(item[label])}</h3><p>${escape(detail(item))}</p></div>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)}</title>
  ${seo ? searchMetadata(basics, seo, title) : ''}
  <style>${css}</style>
</head>
<body>
  <div class="toolbar"><button id="print" type="button">Print / Save PDF</button></div>
  <main class="resume">
    <header class="masthead">
      ${portrait}
      <h1>${escape(seo?.displayName || basics.name || 'Resume')}</h1>
      ${basics.label ? '<p class="role">' + escape(basics.label) + '</p>' : ''}
      ${contacts.length ? '<ul class="contact" aria-label="Contact and profiles">' + contacts.map((contact) => '<li>' + contact + '</li>').join('') + '</ul>' : ''}
    </header>
    ${section('Profile', paragraphs(basics.summary))}
    ${section('Experience', entries('work', (job) => entry(job, job.position || job.name, job.position ? job.name : '', true)))}
    ${section('Skills', compact(resume.skills ?? [], 'name', (skill) => join([skill.level, skill.keywords?.join(', ')])), 'compact')}
    ${section('Education', entries('education', (item) => entry(item, item.institution, join([item.area, item.studyType]))))}
    ${section('Projects', entries('projects', (item) => entry(item, item.name, item.entity, true)))}
    ${section('Volunteer', entries('volunteer', (item) => entry(item, item.position || item.organization, item.position ? item.organization : '', true)))}
    ${section('Awards', entries('awards', (item) => entry(item, item.title, item.awarder)))}
    ${section('Certificates', entries('certificates', (item) => entry(item, item.name, item.issuer)))}
    ${section('Publications', entries('publications', (item) => entry({ ...item, date: item.releaseDate }, item.name, item.publisher)))}
    ${section('Languages', compact(resume.languages ?? [], 'language', (item) => item.fluency), 'compact')}
    ${section('Interests', compact(resume.interests ?? [], 'name', (item) => item.keywords?.join(', ')), 'compact')}
    ${section('References', entries('references', (item) => entry({ summary: item.reference }, item.name)))}
  </main>
  <script>document.getElementById('print').addEventListener('click', () => window.print());</script>
</body>
</html>
`;
}

module.exports = { render };
