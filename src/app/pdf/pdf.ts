import {jsPDF} from 'jspdf';
import {getScaledDimensions} from '../utils/get-scaled-dimensions';
import {FONT_SIZES, FONT_WEIGHTS} from '../constants';

export type PDFLink = {
  isLink: boolean;
  text: string;
  url: string;
  size: number;
}

export type PDFText = {
  text: string;
  size?: number;
  weight?: string;
}

export type PDFBreak = {
  isBreak: boolean;
}

export type PDFBlock = {
  isBlock: boolean;
  text: string;
  size: number;
}

export type PDFImage = {
  isImage: boolean;
  id: number;
  total: number;
  width: number;
  height: number;
  base64: string;
}

export type PDFData = (PDFLink | PDFText | PDFBreak | PDFBlock | PDFImage)[];

export class PDF {
  // eslint-disable-next-line new-cap
  private readonly doc = new jsPDF('p', 'in', 'letter');

  private readonly name;

  private init = {
    x: 0.5,
    y: 0.5,
  };

  private x: number = this.init.x;

  private y: number = this.init.y;

  private readonly width: number = this.doc.internal.pageSize.getWidth() - this.x;

  private readonly height: number = this.doc.internal.pageSize.getHeight() - this.y;

  private readonly font = 'times';

  private readonly weight = FONT_WEIGHTS.normal

  private readonly size = FONT_SIZES.normal

  constructor(filename: string) {
    this.name = filename;
  }

  public export(data: PDFData): void {
    this.resetPosition();
    this.iterate(data);
    this.save();
  }

  private iterate(data: PDFData) {
    data.forEach((el: (PDFBlock & PDFBreak & PDFImage & PDFLink & PDFText)) => {
      if (el.isBlock) {
        return this.printBlock(el);
      } else if (el.isBreak) {
        return this.printBreak();
      } else if (el.isImage) {
        return this.printImage(el);
      } else if (el.isLink) {
        return this.printLink(el);
      } else {
        return this.printText(el);
      }
    });
  }

  private movePosition(size = this.size) {
    this.y += 0.5 * size / 24;
  }

  private resetPosition() {
    this.x = this.init.x;
    this.y = this.init.y;
  }

  private printText({
    text,
    size,
    weight,
  }: PDFText) {
    this.doc.setFontSize(size || this.size).setFont(this.font, weight || this.weight);
    this.doc.text(text, this.x, this.y);
    this.movePosition(size);
  }

  private printLink({
    text,
    url,
    size,
  }: PDFLink) {
    this.doc.setFontSize(size || this.size).setFont(this.font, this.weight);
    this.doc.textWithLink(text, this.x, this.y, {url});
    this.movePosition(size);
  }

  private printBlock({
    text,
    size,
  }: PDFBlock) {
    const lines = this.doc
      .setFontSize(size || this.size)
      .setFont(this.font, this.weight)
      .splitTextToSize(text, 7.5);

    const pageHeight = this.doc.internal.pageSize.height;

    lines.forEach((line: string) => {
      const isOvertop = Math.round(this.y + 1) > pageHeight;
      if (isOvertop) {
        this.printNewPage();
      }

      this.doc.text(line, this.x, this.y);
      this.movePosition(size);
    });
  }

  private printNewPage() {
    this.doc.addPage();
    this.resetPosition();
  }

  private printBreak() {
    this.doc.setLineWidth(0.01);
    this.doc.line(this.x, this.y, this.width, this.y);
    this.movePosition();
  }

  private printImage({
    id,
    total,
    base64,
    width,
    height,
  }: PDFImage) {
    if (this.x !== this.init.x || this.y !== this.init.y) {
      this.printNewPage();
    }

    const size = FONT_SIZES.small;

    this.printText({
      text: this.name,
      size,
    });
    this.printText({
      text: `Image ${id} / ${total}`,
      size,
    });
    this.printBreak();

    const maxWidth = this.width;
    const maxHeight = this.height;
    const dimensions = getScaledDimensions(width, height, maxWidth, maxHeight);

    this.doc.addImage(base64, 'JPEG', this.x, this.y, dimensions.width, dimensions.height);
  }

  private save() {
    const blobData = this.doc.output('blob');
    const a = document.createElement('a');

    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');

    const blob = new Blob([blobData], {
      type: 'application/pdf',
    });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = this.name + '.pdf';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
