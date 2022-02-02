import {getDate} from '../utils/get-date';
import {fetchAndConvertToBase64} from '../utils/fetch-and-convert-to-base64';
import {getDimensionsFromBase64} from '../utils/get-dimensions-from-base64';
import {
  PDF,
  PDFBlock,
  PDFBreak,
  PDFData,
  PDFImage,
  PDFLink,
  PDFText,
} from '../pdf/pdf';
import {FONT_SIZES, FONT_WEIGHTS} from '../constants'; // eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
const manifest = require('../../manifest.json');

interface Attribute {
  generic: boolean;
  key: string;
  key_label?: string;
  value: string;
  value_label: string;
  values: string[];
}

interface AdProps {
  ad_type: string;
  attributes: Attribute[];
  body: string;
  category_id: string;
  category_name: string;
  expiration_date: string;
  first_publication_date: string;
  has_phone: boolean;
  images: {
    nb_images: number;
    small_url: string;
    thumb_url: string;
    urls: string[];
    urls_large: string[];
    urls_thumb: string[];
  };
  index_date: string;
  list_id: number;
  location: {
    city: string;
    city_label: string;
    country_id: string;
    department_id: string;
    department_name: string;
    feature: {
      geometry: {
        coordinates: number[];
        type: string;
      };
      properties: null;
      type: string;
    };
    is_shape: boolean;
    lat: number;
    lng: number;
    provider: string;
    region_id: string;
    region_name: string;
    source: string;
    zipcode: string;
  };
  options: {
    booster: boolean;
    gallery: boolean;
    has_option: boolean;
    photosup: boolean;
    sub_toplist: boolean;
    urgent: boolean;
  };
  owner: {
    activity_sector: string;
    name: string;
    no_salesmen: boolean;
    store_id: string;
    type: string;
    user_id: string;
    siren?: string;
  };
  price: number[];
  price_calendar: null;
  price_cents: number;
  status: string;
  subject: string;
  url: string;
}

/**
 * @description Class representing an Ad.
 */
export class Ad {
  private props: AdProps;

  private now;

  private version: string = manifest.version;

  constructor(props: AdProps) {
    this.props = props;
    this.now = getDate();
  }

  private static getBreak(): PDFBreak[] {
    return [{
      isBreak: true,
    }];
  }

  public async export(): Promise<void> {
    const name = this.getName();
    const images = await this.getImages();

    const data: PDFData = [
      ...this.getHeader(),
      ...Ad.getBreak(),
      ...this.getTitle(),
      ...Ad.getBreak(),
      ...this.getSeller(),
      ...Ad.getBreak(),
      ...this.getAttributes(),
      ...Ad.getBreak(),
      ...this.getDescription(),
      ...images,
    ];

    const pdf = new PDF(name);
    pdf.run(data);
  }

  private async getImages(): Promise<PDFImage[]> {
    const data: PDFImage[] = [];
    let images = undefined;

    if (this.props.images.urls_large) {
      images = this.props.images.urls_large;
    } else if (this.props.images.urls) {
      images = this.props.images.urls;
    }

    if (images === undefined) {
      return data;
    }
    
    for (let k = 0; k < images.length; k++) {
      const image = images[k];
      const base64 = await fetchAndConvertToBase64(image);

      if (!base64) {
        return;
      }

      const dimensions = await getDimensionsFromBase64(base64);

      data.push(
        {
          isImage: true,
          id: k + 1,
          total: images.length,
          base64,
          width: dimensions.width,
          height: dimensions.height,
        },
      );
    }

    return data;
  }

  private getAttributes(): PDFText[] {
    const data: PDFText[] = [
      {
        text: 'Critères',
        weight: FONT_WEIGHTS.bold,
      },
    ];

    this.props.attributes.forEach((attribute: Attribute) => {
      const title = attribute.key_label;
      const value = attribute.value_label;

      if (title) {
        data.push(
          {
            text: `${title} : ${value}`,
            size: FONT_SIZES.small,
          },
        );
      }
    });

    return data;
  }

  private getDescription(): (PDFText|PDFBlock)[] {
    return [
      {
        // description title
        text: 'Description',
        size: FONT_SIZES.normal,
        weight: FONT_WEIGHTS.bold,
      },
      {
        // description
        isBlock: true,
        text: this.props.body,
        size: FONT_SIZES.small,
      },
    ];
  }

  private getSeller(): (PDFText|PDFLink)[] {
    let type = this.props.owner.type;

    if (type === 'private') {
      type = 'particulier';
    }

    const data: (PDFText|PDFLink)[] = [
      {
        text: 'Vendeur',
        size: FONT_SIZES.normal,
        weight: FONT_WEIGHTS.bold,
      },
      {
        isLink: true,
        text: `Vendeur ${type} : ${this.props.owner.name}`,
        url: `https://www.leboncoin.fr/profil/${this.props.owner.user_id}`,
        size: FONT_SIZES.small,
      },
    ];

    if (this.props.owner.siren) {
      data.push(
        {
          text: `SIREN : ${this.props.owner.siren}`,
          size: FONT_SIZES.xsmall,
        },
      );
    }

    return data;
  }

  private getTitle(): (PDFText|PDFLink)[] {
    return [
      {
        // title
        text: this.props.subject,
        weight: FONT_WEIGHTS.bold,
      },
      {
        // price
        text: `Prix : ${this.props.price[0].toString() || '?'} euros`,
        size: FONT_SIZES.small,
      },
      {
        // location
        text: `Lieu : ${this.props.location.city}, ${this.props.location.zipcode}, ${this.props.location.department_name}`,
        size: FONT_SIZES.small,
      },
      {
        // satellite
        text: `GPS : ${this.props.location.lat}, ${this.props.location.lng}`,
        size: FONT_SIZES.small,
      },
      {
        // google maps
        isLink: true,
        text: 'Google Maps',
        url: `https://www.google.com/maps/place/${this.props.location.lat},${this.props.location.lng}`,
        size: FONT_SIZES.xsmall,
      },
    ];
  }

  private getHeader(): (PDFText|PDFLink)[] {
    return [
      {
        // url
        isLink: true,
        text: this.props.url,
        url: this.props.url,
        size: FONT_SIZES.small,
      },
      {
        // category
        text: this.props.category_name,
        size: FONT_SIZES.small,
      },
      {
        // date of first publication
        text: `Première publication : ${this.props.first_publication_date}`,
        size: FONT_SIZES.xsmall,
      },
      {
        // date of latest update
        text: `Dernière mise à jour : ${this.props.index_date}`,
        size: FONT_SIZES.xsmall,
      },
      {
        text: `Edité le ${this.now.date} ${this.now.time}, version ${this.version}`,
        size: FONT_SIZES.xsmall,
      },
    ];
  }

  private getName() {
    return `${this.props.location.zipcode} - ${this.props.list_id} - ${this.props.subject} - ${this.props.price[0].toString()} euros`;
  }
}
