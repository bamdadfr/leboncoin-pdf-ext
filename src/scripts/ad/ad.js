import {PDF} from '../pdf/pdf';
import {Header} from './blocks/header';
import {Title} from './blocks/title';
import {Seller} from './blocks/seller';
import {Description} from './blocks/description';
import {Attributes} from './blocks/attributes';
import {Images} from './blocks/images';

/**
 * @description Class representing an Ad.
 */
export class Ad {
    #json

    /**
     * @param {object} data - Next.js data object.
     */
    constructor(data) {
      const json = JSON.parse(data);
      this.#json = json.props.pageProps.ad;
    }

    /**
     * @description Renders the Ad.
     */
    async export() {
      const name = `${this.#json.location.zipcode} - ${this.#json.list_id} - ${this.#json.subject} - ${this.#json.price[0].toString()} euros`;
      const pdf = new PDF(name);
      const header = Header(this.#json, pdf);
      const title = Title(this.#json, pdf);
      const seller = Seller(this.#json, pdf);
      const description = Description(this.#json, pdf);
      const attributes = Attributes(this.#json, pdf);
      const images = await Images(this.#json);

      const data = [
        ...header,
        ...title,
        ...seller,
        ...attributes,
        ...description,
        ...images,
      ];

      pdf.run(data);
    }
}
