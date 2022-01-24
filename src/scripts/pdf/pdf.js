import {jsPDF} from 'jspdf';
import {
  getMaxDimensions,
} from '../utils/get-max-dimensions';
import {PdfConstants} from './pdf.constants';

/**
 * @description Class for generating PDFs.
 */
export class PDF {
  #doc;

  #name;

  #font = 'times';

  #pos;

  /**
   * @param {string} name - File name
   */
  constructor(name) {
    // eslint-disable-next-line new-cap
    this.#doc = new jsPDF('p', 'in', 'letter');
    this.#name = name;
    this.#pos = PdfConstants.position;
  }

  /**
   * @description Initialize cursor position
   */
  #initialize() {
    this.#pos.reset();
    this.#pos.width = this.#doc.internal.pageSize.getWidth() - this.#pos.x;
    this.#pos.height = this.#doc.internal.pageSize.getHeight() - this.#pos.y;
  }

  /**
   * @description Save PDF with invisible anchor
   */
  #save() {
    const blobData = this.#doc.output('blob');
    const a = document.createElement('a');

    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');

    const blob = new Blob([blobData], {
      type: 'application/pdf',
    });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = this.#name + '.pdf';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  /**
   * @description Print a line of text
   * @param {string} text - Text to print
   * @param {number} [size] - Font size
   * @param {string} [weight] - Font weight
   */
  #printText(
    text,
    size = PdfConstants.fontSize.normal,
    weight = PdfConstants.fontWeight.normal,
  ) {
    this.#doc.setFontSize(size).setFont(this.#font, weight);
    this.#doc.text(this.#pos.x, this.#pos.y, text);
    this.#pos.spacer(size);
  }

  /**
   * @description Print a line of text with a link
   * @param {string} text - Text to print
   * @param {string} url - Target URL
   * @param {number} [size] - Font size
   * @param {string} [weight] - Font weight
   */
  #printLink(
    text,
    url,
    size = PdfConstants.fontSize.normal,
    weight = PdfConstants.fontWeight.normal,
  ) {
    this.#doc.setFontSize(size).setFont(this.#font, weight);
    this.#doc.textWithLink(text, this.#pos.x, this.#pos.y, {url});
    this.#pos.spacer(size);
  }

  /**
   * @description Print a paragraph
   * @param {string} text - Text to print
   * @param {number} [size] - Font size
   * @param {string} [weight] - Font weight
   */
  #printBlock(
    text,
    size = PdfConstants.fontSize.normal,
    weight = PdfConstants.fontWeight.normal,
  ) {
    const lines = this.#doc
      .setFontSize(size)
      .setFont(this.#font, weight)
      .splitTextToSize(text, 7.5);

    const pageHeight = this.#doc.internal.pageSize.height;

    lines.forEach((line) => {
      const isOvertop = Math.round(this.#pos.y + 1) > pageHeight;
      if (isOvertop) {
        this.#printNewPage();
      }

      this.#doc.text(this.#pos.x, this.#pos.y, line);
      this.#pos.spacer(size);
    });
  }

  /**
   * @description Print a new page
   */
  #printNewPage() {
    this.#doc.addPage();
    this.#pos.reset();
  }

  /**
   * @description Print a horizontal line
   */
  #printHR() {
    this.#doc.setLineWidth(0.01);
    this.#doc.line(this.#pos.x, this.#pos.y, this.#pos.width, this.#pos.y);
    this.#pos.spacer();
  }

  /**
   * @description Print an image
   * @param {number} id - Image ID
   * @param {number} total - Total number of images
   * @param {string} _url - Image URL (unused)
   * @param {string} base64 - Image base64 data
   * @param {number} width - Image width
   * @param {number} height - Image height
   */
  #printImage(
    id,
    total,
    _url,
    base64,
    width,
    height,
  ) {
    if (this.#pos.x !== this.#pos.init.x || this.#pos.y !== this.#pos.init.y) {
      this.#printNewPage();
    }

    this.#printText(this.#name, PdfConstants.fontSize.small);
    this.#printText(`Image ${id} / ${total}`, PdfConstants.fontSize.small);
    this.#printHR();

    const maxWidth = this.#pos.width;
    const maxHeight = this.#pos.height;
    const dimensions = getMaxDimensions(width, height, maxWidth, maxHeight);

    this.#doc.addImage(base64, 'JPEG', this.#pos.x, this.#pos.y, dimensions.width, dimensions.height);
  }

  /**
   * @description Iterate and render all entries
   * @param {Array.<*>} array - Array of entries
   */
  #iterate(array) {
    array.forEach((el) => {
      if (el.isSpacer) {
        return this.#pos.spacer();
      } else if (el.isBlock) {
        return this.#printBlock(el.text, el.size, el.type);
      } else if (el.isPageBreak) {
        return this.#printNewPage();
      } else if (el.isHR) {
        return this.#printHR();
      } else if (el.isImage) {
        return this.#printImage(el.id, el.total, el.url, el.base64, el.width, el.height);
      } else if (el.isLink) {
        return this.#printLink(el.text, el.url, el.size);
      } else {
        return this.#printText(el.text, el.size, el.type);
      }
    });
  }

  /**
   * @description Run the PDF generation
   * @param {Array} data - Data to render
   */
  run(data) {
    this.#initialize();
    this.#iterate(data);
    this.#save();
  }
}
