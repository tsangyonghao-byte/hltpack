const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('db-state.json', 'utf8'));

let sql = 'PRAGMA foreign_keys = OFF;\n';

// Helper to escape values for SQL
function escapeVal(val) {
  if (val === null || val === undefined) {
    return 'NULL';
  }
  if (typeof val === 'boolean') {
    return val ? 1 : 0;
  }
  if (typeof val === 'number') {
    return val;
  }
  if (typeof val === 'string') {
    return `'${val.replace(/'/g, "''")}'`;
  }
  return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
}

function makeInsertReplace(tableName, records) {
  if (records.length === 0) return '';
  let statements = '';
  for (const record of records) {
    const keys = Object.keys(record);
    const columns = keys.map(k => `\`${k}\``).join(', ');
    const values = keys.map(k => escapeVal(record[k])).join(', ');
    statements += `INSERT OR REPLACE INTO \`${tableName}\` (${columns}) VALUES (${values});\n`;
  }
  return statements;
}

// 1. Clean up records that are not in local state
const localNavIds = data.navItems.map(n => n.id);
const localProductIds = data.products.map(p => p.id);
const localCategoryIds = data.categories.map(c => c.id);
const localNewsIds = data.news.map(n => n.id);
const localBannerIds = data.banners.map(b => b.id);
const localSettingIds = data.settings.map(s => s.id);
const localCertificateIds = data.certificates.map(c => c.id);
const localLinkIds = data.links.map(l => l.id);
const localAdminUsernames = data.admins.map(a => a.username);

// We need to delete child navItems first to avoid foreign key constraints (if any)
sql += `-- Clean up obsolete child navigation items\n`;
if (localNavIds.length > 0) {
  sql += `DELETE FROM \`NavigationItem\` WHERE \`parentId\` IS NOT NULL AND \`id\` NOT IN (${localNavIds.map(escapeVal).join(', ')});\n`;
  sql += `DELETE FROM \`NavigationItem\` WHERE \`parentId\` IS NULL AND \`id\` NOT IN (${localNavIds.map(escapeVal).join(', ')});\n`;
} else {
  sql += `DELETE FROM \`NavigationItem\`;\n`;
}

sql += `-- Clean up obsolete records for other tables\n`;
if (localProductIds.length > 0) {
  sql += `DELETE FROM \`Product\` WHERE \`id\` NOT IN (${localProductIds.map(escapeVal).join(', ')});\n`;
} else {
  sql += `DELETE FROM \`Product\`;\n`;
}

if (localCategoryIds.length > 0) {
  sql += `DELETE FROM \`Category\` WHERE \`id\` NOT IN (${localCategoryIds.map(escapeVal).join(', ')});\n`;
} else {
  sql += `DELETE FROM \`Category\`;\n`;
}

if (localNewsIds.length > 0) {
  sql += `DELETE FROM \`News\` WHERE \`id\` NOT IN (${localNewsIds.map(escapeVal).join(', ')});\n`;
} else {
  sql += `DELETE FROM \`News\`;\n`;
}

if (localBannerIds.length > 0) {
  sql += `DELETE FROM \`Banner\` WHERE \`id\` NOT IN (${localBannerIds.map(escapeVal).join(', ')});\n`;
} else {
  sql += `DELETE FROM \`Banner\`;\n`;
}

if (localSettingIds.length > 0) {
  sql += `DELETE FROM \`SystemSetting\` WHERE \`id\` NOT IN (${localSettingIds.map(escapeVal).join(', ')});\n`;
} else {
  sql += `DELETE FROM \`SystemSetting\`;\n`;
}

if (localCertificateIds.length > 0) {
  sql += `DELETE FROM \`Certificate\` WHERE \`id\` NOT IN (${localCertificateIds.map(escapeVal).join(', ')});\n`;
} else {
  sql += `DELETE FROM \`Certificate\`;\n`;
}

if (localLinkIds.length > 0) {
  sql += `DELETE FROM \`FriendLink\` WHERE \`id\` NOT IN (${localLinkIds.map(escapeVal).join(', ')});\n`;
} else {
  sql += `DELETE FROM \`FriendLink\`;\n`;
}

if (localAdminUsernames.length > 0) {
  sql += `DELETE FROM \`AdminUser\` WHERE \`username\` NOT IN (${localAdminUsernames.map(escapeVal).join(', ')});\n`;
} else {
  sql += `DELETE FROM \`AdminUser\`;\n`;
}

sql += `\n-- Insert or update categories\n`;
sql += makeInsertReplace('Category', data.categories);

sql += `\n-- Insert or update products\n`;
sql += makeInsertReplace('Product', data.products);

sql += `\n-- Insert or update news\n`;
sql += makeInsertReplace('News', data.news);

sql += `\n-- Insert or update banners\n`;
sql += makeInsertReplace('Banner', data.banners);

sql += `\n-- Insert or update settings\n`;
sql += makeInsertReplace('SystemSetting', data.settings);

sql += `\n-- Insert or update certificates\n`;
sql += makeInsertReplace('Certificate', data.certificates);

sql += `\n-- Insert or update friend links\n`;
sql += makeInsertReplace('FriendLink', data.links);

sql += `\n-- Insert or update admin users\n`;
sql += makeInsertReplace('AdminUser', data.admins);

// NavigationItem order: parents first, then children
const parents = data.navItems.filter(item => !item.parentId);
const children = data.navItems.filter(item => item.parentId);

sql += `\n-- Insert or update parent navigation items\n`;
sql += makeInsertReplace('NavigationItem', parents);

sql += `\n-- Insert or update child navigation items\n`;
sql += makeInsertReplace('NavigationItem', children);

sql += `\n-- Re-enable foreign key constraints\nPRAGMA foreign_keys = ON;\n`;

fs.writeFileSync('sync-d1.sql', sql, 'utf8');
console.log('Successfully generated sync-d1.sql');
