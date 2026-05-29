import katex from 'katex';

export function renderLatex(source) {
  return katex.renderToString(source, { displayMode: true, throwOnError: false });
}
