// Rehype plugin: markdown tables only ever produce header-row <th> cells
// (GFM tables have no row headers), so every <th> inside a <thead> gets
// scope="col" for a proper header/data-cell association.
import { visit } from 'unist-util-visit';

export default function rehypeTableHeaders() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'thead') return;
      visit(node, 'element', (cell) => {
        if (cell.tagName === 'th') {
          cell.properties = { ...cell.properties, scope: 'col' };
        }
      });
    });
  };
}
