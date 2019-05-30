const fs = require('fs');
const fg = require('fast-glob');

let ids = {};

function gatherIds(node) {
	if (node.altId) {
		ids[node.id] = true;
		ids[node.altId] = true;
	}
	if (node.children) {
		node.children.forEach(gatherIds);
	}
}

fg.sync(['data/**/*.json'])
	.map(fn => fs.readFileSync(fn, 'utf-8'))
	.map(raw => JSON.parse(raw))
	.forEach(gatherIds);

const output = Object.keys(ids).sort().map(id => `${id}\tLorem ipsum for ${id}`).join('\n');
fs.writeFileSync('data/lorem-tooltips.tsv', output);