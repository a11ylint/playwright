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

function extractFormFields() {
  const formElements = Array.from(document.querySelectorAll('input, select, textarea'));

  return formElements.map(element => {
    const { id, title } = element;
    const ariaLabel = element.getAttribute('aria-label');
    const ariaLabelledby = element.getAttribute('aria-labelledby');

    // Check for associated label
    let hasLabelFor = false;
    let labelForId = null;
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) {
        hasLabelFor = true;
        labelForId = id;
      }
    }

    // Check for adjacent buttons (next and previous siblings)
    const nextSibling = element.nextElementSibling;
    const prevSibling = element.previousElementSibling;

    let hasAdjacentButton = false;
    let adjacentButtonHasValidLabel = false;

    const checkButton = button => {
      if (button && button.tagName.toLowerCase() === 'button') {
        hasAdjacentButton = true;
        const buttonAriaLabel = button.getAttribute('aria-label');
        const buttonAriaLabelledby = button.getAttribute('aria-labelledby');
        const buttonText = button.textContent?.trim();
        const buttonTitle = button.getAttribute('title');

        if (buttonAriaLabel || buttonAriaLabelledby || (buttonText && buttonText.length > 0) || buttonTitle) {
          adjacentButtonHasValidLabel = true;
        }
      }
    };

    checkButton(nextSibling);
    if (!adjacentButtonHasValidLabel) {
      checkButton(prevSibling);
    }

    // Check for hidden labels when there's an adjacent button
    let hasHiddenLabel = false;
    if (hasAdjacentButton && id) {
      const hiddenLabels = document.querySelectorAll(`label[for="${id}"]`);
      hiddenLabels.forEach(label => {
        const labelElement = label;
        const style = window.getComputedStyle(labelElement);
        const isVisuallyHidden =
          style.position === 'absolute' &&
          (style.left === '-10000px' ||
            style.left === '-9999px' ||
            style.clip === 'rect(0, 0, 0, 0)' ||
            style.clip === 'rect(0px, 0px, 0px, 0px)' ||
            style.clipPath === 'inset(50%)' ||
            style.width === '1px' ||
            style.height === '1px');

        if (isVisuallyHidden) {
          hasHiddenLabel = true;
        }
      });
    }

    return {
      type: element.tagName.toLowerCase(),
      id: id || undefined,
      ariaLabel: ariaLabel || undefined,
      ariaLabelledby: ariaLabelledby || undefined,
      title: title || undefined,
      outerHTML: element.outerHTML,
      hasLabelFor,
      labelForId,
      hasAdjacentButton,
      adjacentButtonHasValidLabel,
      hasHiddenLabel,
    };
  });
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
  extractColorContrasts,
  extractDocumentData,
  extractFormFields,
};
