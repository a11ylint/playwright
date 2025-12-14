function extractFrames() {
  return Array.from(document.querySelectorAll('iframe, frame')).map(element => ({
    type: element.tagName.toLowerCase(),
    outerHTML: element.outerHTML,
    title: element.getAttribute('title'),
  }));
}

function extractHeadings() {
  return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')).map(element => ({
    type: 'heading',
    tagName: element.tagName.toLowerCase(),
    role: element.getAttribute('role'),
    ariaLevel: element.getAttribute('aria-level'),
    outerHTML: element.outerHTML,
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

function extractColorContrasts() {
  // Select all elements that contain visible text
  const textElements = Array.from(document.querySelectorAll('*')).filter(element => {
    // Check if the element has direct text (not just children)
    const hasDirectTextContent = Array.from(element.childNodes).some(
      node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0,
    );

    // Check if the element is visible
    const style = window.getComputedStyle(element);
    const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';

    return hasDirectTextContent && isVisible;
  });

  return textElements
    .map(element => {
      const computedStyle = window.getComputedStyle(element);
      const { fontSize, fontWeight, color, backgroundColor } = computedStyle;

      // Check if the element is inside a figure (usually contains images)
      if (element.closest('figure')) {
        return null; // Ignore this element
      }

      // For text color: take the computed color directly
      const textColorInner = color;

      // For background: look for the first non-transparent background up the hierarchy
      let backgroundElement = element;
      let backgroundColorInner = backgroundColor;

      // If the element's background is transparent, go up the hierarchy
      while (
        backgroundElement &&
        (backgroundColorInner === 'rgba(0, 0, 0, 0)' || backgroundColorInner === 'transparent')
      ) {
        backgroundElement = backgroundElement.parentElement;
        if (backgroundElement) {
          const parentStyle = window.getComputedStyle(backgroundElement);
          backgroundColorInner = parentStyle.backgroundColor;
        } else {
          // If we reach the top without finding a background, use white by default
          backgroundColorInner = 'rgb(255, 255, 255)';
        }
      }

      return {
        backgroundColor: backgroundColorInner,
        textColor: textColorInner,
        fontSize,
        fontWeight,
        outerHTML: element.outerHTML,
      };
    })
    .filter(item => item !== null); // Remove null elements
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

function extractLinks() {
  return Array.from(document.querySelectorAll('a, [role="link"]')).map(element => ({
    type: element.tagName.toLowerCase(),
    outerHTML: element.outerHTML,
    href: element.getAttribute('href'),
    textContent: element.textContent,
    title: element.getAttribute('title'),
    ariaLabel: element.getAttribute('aria-label'),
    ariaLabelledBy: element.getAttribute('aria-labelledby'),
  }));
}

window.A11YLINT_PLAYWRIGHT = {
  extractFrames,
  extractImages,
  extractColorContrasts,
  extractDocumentData,
  extractLinks,
  extractHeadings,
};
