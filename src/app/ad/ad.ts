import {getIsoDateTime} from '../utils/get-iso-date-time';
import {getDimensionsFromBase64} from '../utils/get-dimensions-from-base64';
import {
  PDFBlock,
  PDFBreak,
  PDFData,
  PDFImage,
  PDFLink,
  PDFText,
} from '../pdf/pdf';
import {FONT_SIZES, FONT_WEIGHTS} from '../constants';
import {convertToBase64} from '../utils/convert-to-base64';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const manifest = require('../../manifest.json');

export interface AdAttribute {
  generic: boolean;
  key: string;
  key_label?: string;
  value: string;
  value_label: string;
  values: string[];
}

export interface AdData {
  ad_type: string;
  attributes: AdAttribute[];
  body: string;
  category_id: string;
  category_name: string;
  expiration_date: string;
  first_publication_date: string;
  has_phone: boolean;
  is_boosted: boolean;
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

export type GetBreak = PDFBreak[]

export type GetHeader = (PDFText|PDFLink)[]

export type GetTitle = (PDFText|PDFLink)[]

export type GetSeller = (PDFText|PDFLink)[]

export type GetAttributes = PDFText[]

export type GetDescription = (PDFText|PDFBlock)[]

/**
 * @description Class representing an Ad.
 */
export class Ad {
  private readonly props: AdData;

  private readonly date: string;

  private readonly time: string;

  private readonly version: string = manifest.version;

  constructor(props: AdData) {
    this.props = props;
    const {date, time} = getIsoDateTime();
    this.date = date;
    this.time = time;
  }

  public get name(): string {
    if (this.props) {
      return this.getName();
    }
  }

  public static parseLeboncoin(): AdData {
    try {
      const node = document.getElementById('__NEXT_DATA__');
      const data = node.innerHTML;
      const json = JSON.parse(data);
      return json.props.pageProps.ad;
    } catch (error) {
      throw new Error('Unable to get ad data');
    }
  }

  private static getBreak(): GetBreak {
    return [{
      isBreak: true,
    }];
  }

  public async build(): Promise<PDFData> {
    const images = await this.getImages();

    return [
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
  }

  private getName() {
    return `${this.props.location.zipcode} - ${this.props.list_id} - ${this.props.subject} - ${this.props.price[0].toString()} euros`;
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
      const response = await fetch(image);
      const blob = await response.blob();
      const base64 = await convertToBase64(blob);

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

  private getAttributes(): GetAttributes {
    const data: PDFText[] = [
      {
        text: 'Critères',
        weight: FONT_WEIGHTS.bold,
      },
    ];

    this.props.attributes.forEach((attribute: AdAttribute) => {
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

  private getDescription(): GetDescription {
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

  private getSeller(): GetSeller {
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

  private getTitle(): GetTitle {
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

  private getHeader(): GetHeader {
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
        text: `Edité le ${this.date} ${this.time}, version ${this.version}`,
        size: FONT_SIZES.xsmall,
      },
    ];
  }
}
