import { readFile, writeFile } from 'node:fs/promises';

const source = await readFile(new URL('./src/data/mockData.ts', import.meta.url), 'utf8');
const prefix = 'export const properties: Property[] = ';
const start = source.indexOf(prefix) + prefix.length;
const end = source.indexOf(';\n\nexport const blogPosts', start);
const properties = JSON.parse(source.slice(start, end));

const countBy = (selector) => Object.entries(properties.reduce((result, property) => {
  const key = selector(property) || 'Неуточнено';
  result[key] = (result[key] || 0) + 1;
  return result;
}, {})).sort((left, right) => right[1] - left[1]);

const inventory = {
  total: properties.length,
  transactions: countBy((property) => property.transactionBg),
  types: countBy((property) => property.propertyTypeBg),
  cities: countBy((property) => property.cityKey),
  areas: countBy((property) => property.locationBg.replace(/^град Пловдив,\s*/i, 'Пловдив — ').replace(/^област Пловдив,\s*/i, '')),
};

const markdownTable = (rows) => `| Категория | Обяви |\n|---|---:|\n${rows.map(([label, count]) => `| ${label} | ${count} |`).join('\n')}`;
const report = `# Каталожни приоритети за съдържание и local SEO\n\nКаталогът съдържа **${inventory.total}** активни обяви. Локалните страници и редакционните теми следва да бъдат изграждани първо за местата и типовете с най-голямо реално покритие, за да не се създава тънко или несвързано със собствените оферти съдържание.\n\n## Сделки\n\n${markdownTable(inventory.transactions)}\n\n## Типове имоти\n\n${markdownTable(inventory.types)}\n\n## Основни локации\n\n${markdownTable(inventory.cities.slice(0, 15))}\n\n## Извод за приоритизация\n\nПървите landing pages и редакционни страници трябва да обвързват реално покритите локации и типове имоти с практически теми за купувача: проверка на имот, финансиране, регулация/УПИ, оценка, договори и организация на оглед. За всяка локална страница следва да се показват актуалните филтрирани обяви, а не само общ SEO текст.\n`;

await writeFile(new URL('./CATALOG_CONTENT_PRIORITIES.md', import.meta.url), report, 'utf8');
console.log(JSON.stringify(inventory, null, 2));
