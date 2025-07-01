function extractFrames() {
  return Array.from(document.querySelectorAll('iframe, frame')).map(element => ({
    type: element.tagName.toLowerCase(),
    outerHTML: element.outerHTML,
    title: element.getAttribute('title'),
  }));
}

function extractImages() {
  return Array.from(document.querySelectorAll('img, svg, area')).map(element => ({
    type: element.tagName.toLowerCase(),
    outerHTML: element.outerHTML,
    src: element.getAttribute('src'),
    alt: element.getAttribute('alt'),
    role: element.getAttribute('role'),
    title: element.getAttribute('title'),
    ariaLabel: element.getAttribute('aria-label'),
    ariaLabelledBy: element.getAttribute('aria-labelledby'),
  }));
}

function extractDocumentData() {
  return {
    title: document.title,
    documentElement: { lang: document.documentElement.lang },
    doctype: document.doctype
      ? `<!DOCTYPE ${document.doctype.name} PUBLIC "${document.doctype.publicId}" "${document.doctype.systemId}">`
      : null,
    firstChild: { nodeType: document.firstChild?.nodeType },
  };
}

window.A11YLINT_PLAYWRIGHT = {
  extractFrames,
  extractImages,
  extractDocumentData,
};
