import {jsPDF} from 'jspdf';
import {getScaledDimensions} from '../utils/get-scaled-dimensions';
import {FONT_SIZES, FONT_WEIGHTS} from '../constants';
import {getDimensionsFromBase64} from '../utils/get-dimensions-from-base64';
import {fetchBase64} from '../utils/fetch-base64';

export type PrintLink = {
  text: string;
  url: string;
  size: number;
}

export type PrintText = {
  text: string;
  size?: number;
  weight?: string;
}

export type PrintBlock = {
  text: string;
  size: number;
}

export type PrintImage = {
  id: number;
  total: number;
  url: string;
}

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
    this.resetPosition();
  }

  public printLink({
    text,
    url,
    size,
  }: PrintLink): void {
    this.doc.setFontSize(size || this.size).setFont(this.font, this.weight);
    this.doc.textWithLink(text, this.x, this.y, {url});
    this.movePosition(size);
  }

  public printText({
    text,
    size,
    weight,
  }: PrintText): void {
    this.doc.setFontSize(size || this.size).setFont(this.font, weight || this.weight);
    this.doc.text(text, this.x, this.y);
    this.movePosition(size);
  }

  public printBreak(): void {
    this.doc.setLineWidth(0.01);
    this.doc.line(this.x, this.y, this.width, this.y);
    this.movePosition();
  }

  public printBlock({
    text,
    size,
  }: PrintBlock): void {
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

  public async printImage({
    id,
    total,
    url,
  }: PrintImage): Promise<void> {
    // Test image accessibility first
    let base64;
    try {
      base64 = await fetchBase64(url);
    } catch {
      return;
    }

    if (!this.isPositionNewPage()) {
      this.printNewPage();
    }

    // Header
    this.printText({
      text: this.name,
      size: FONT_SIZES.small,
    });

    this.printText({
      text: `Image ${id} / ${total}`,
      size: FONT_SIZES.small,
    });

    this.printBreak();

    // Image
    const dimensions = await getDimensionsFromBase64(base64);
    const scaledDimensions = getScaledDimensions(
      dimensions.width,
      dimensions.height,
      this.width,
      this.height,
    );

    this.doc.addImage(
      base64,
      'JPEG',
      this.x,
      this.y,
      scaledDimensions.width,
      scaledDimensions.height,
    );
  }

  public save(): void {
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

  private isPositionNewPage() {
    return this.x === this.init.x && this.y === this.init.y;
  }

  private movePosition(size = this.size) {
    this.y += 0.5 * size / 24;
  }

  private resetPosition() {
    this.x = this.init.x;
    this.y = this.init.y;
  }

  private printNewPage() {
    this.doc.addPage();
    this.resetPosition();
  }
}
