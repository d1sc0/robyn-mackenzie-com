import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const contentDirs = [
  path.resolve('src/content/posts'),
  path.resolve('src/content/work'),
  path.resolve('src/content/pages'),
];

console.log('[pre-build] Running Sveltia CMS pre-build checks...');

for (const dir of contentDirs) {
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(raw);

      let changed = false;

      // Fix tags if parsed as string or null
      if (parsed.data.tags && typeof parsed.data.tags === 'string') {
        parsed.data.tags = parsed.data.tags.split(',').map(t => t.trim()).filter(Boolean);
        changed = true;
      }

      // Ensure pubDate is valid date or date string if present
      if (parsed.data.pubDate && typeof parsed.data.pubDate === 'string') {
        const d = new Date(parsed.data.pubDate);
        if (!isNaN(d.getTime())) {
          parsed.data.pubDate = d.toISOString().split('T')[0];
        }
      }

      if (changed) {
        const updated = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`[pre-build] Cleaned up ${file}`);
      }
    } catch (err) {
      console.warn(`[pre-build] Warning checking ${file}:`, err.message);
    }
  }
}

console.log('[pre-build] Checks completed successfully.');
