import {getIsoDateTime} from '../utils/get-iso-date-time';
import {PDF} from '../pdf/pdf';
import {FONT_SIZES, FONT_WEIGHTS} from '../constants';

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

/**
 * @description Class representing an Ad.
 */
export class Ad {
  private readonly props: AdData;

  private readonly date: string;

  private readonly time: string;

  private readonly version: string = manifest.version;

  private pdf: PDF;

  constructor(props: AdData = Ad.parseLeboncoin()) {
    this.props = props;
    const {date, time} = getIsoDateTime();
    this.date = date;
    this.time = time;
    this.pdf = new PDF(this.getName());
  }

  private static parseLeboncoin(): AdData {
    try {
      const node = document.getElementById('__NEXT_DATA__');
      const data = node.innerHTML;
      const json = JSON.parse(data);
      return json.props.pageProps.ad;
    } catch (error) {
      throw new Error('Unable to get ad data');
    }
  }

  public export(): void {
    this.pdf.save();
  }

  public async build(): Promise<void> {
    this.buildHeader();
    this.pdf.printBreak();
    this.buildTitle();
    this.pdf.printBreak();
    this.buildSeller();
    this.pdf.printBreak();
    this.printAttributes();
    this.pdf.printBreak();
    this.buildDescription();
    await this.buildImages();
  }

  private getName() {
    return `${this.props.location.zipcode} - ${this.props.list_id} - ${this.props.subject} - ${this.props.price[0].toString()} euros`;
  }

  private async buildImages(): Promise<void> {
    let images;

    if (this.props.images.urls_large) {
      images = this.props.images.urls_large;
    } else if (this.props.images.urls) {
      images = this.props.images.urls;
    }

    if (!images) {
      return;
    }

    for (let k = 0; k < images.length; k++) {
      const image = images[k];

      await this.pdf.printImage({
        id: k + 1,
        total: images.length,
        url: image,
      });
    }
  }

  private printAttributes(): void {
    const {bold} = FONT_WEIGHTS;
    const {small} = FONT_SIZES;

    // Title
    this.pdf.printText({
      text: 'Critères',
      weight: bold,
    });

    // Content
    this.props.attributes.forEach((attribute: AdAttribute) => {
      const title = attribute.key_label;
      const value = attribute.value_label;

      if (title) {
        this.pdf.printText({
          text: `${title} : ${value}`,
          size: small,
        });
      }
    });
  }

  private buildDescription(): void {
    const {bold} = FONT_WEIGHTS;
    const {normal, small} = FONT_SIZES;
    // Title
    this.pdf.printText({
      text: 'Description',
      size: normal,
      weight: bold,
    });

    // Content
    this.pdf.printBlock({
      text: this.props.body,
      size: small,
    });
  }

  private buildSeller(): void {
    const {type} = this.props.owner;

    // Seller
    this.pdf.printText({
      text: 'Vendeur',
      size: FONT_SIZES.normal,
      weight: FONT_WEIGHTS.bold,
    });

    // Link
    this.pdf.printLink({
      text: `Vendeur ${type === 'private' ? 'particulier' : type} : ${this.props.owner.name}`,
      url: `https://www.leboncoin.fr/profil/${this.props.owner.user_id}`,
      size: FONT_SIZES.small,
    });

    // SIREN
    if (this.props.owner.siren) {
      this.pdf.printText({
        text: `SIREN : ${this.props.owner.siren}`,
        size: FONT_SIZES.xsmall,
      });
    }
  }

  private buildTitle(): void {
    const {bold} = FONT_WEIGHTS;
    const {small, xsmall} = FONT_SIZES;

    // Title
    this.pdf.printText({
      text: this.props.subject,
      weight: bold,
    });

    // Price
    this.pdf.printText({
      text: `Prix : ${this.props.price[0].toString() || '?'} euros`,
      size: small,
    });

    // Location
    this.pdf.printText({
      text: `Lieu : ${this.props.location.city}, ${this.props.location.zipcode}, ${this.props.location.department_name}`,
      size: small,
    });

    // Satellite
    this.pdf.printText({
      text: `GPS : ${this.props.location.lat}, ${this.props.location.lng}`,
      size: small,
    });

    // Google Maps
    this.pdf.printLink({
      text: 'Google Maps',
      url: `https://www.google.com/maps/place/${this.props.location.lat},${this.props.location.lng}`,
      size: xsmall,
    });
  }

  private buildHeader(): void {
    const {small, xsmall} = FONT_SIZES;

    // URL
    this.pdf.printLink({
      text: this.props.url,
      url: this.props.url,
      size: small,
    });

    // Category
    this.pdf.printText({
      text: this.props.category_name,
      size: small,
    });

    // Date of publication
    this.pdf.printText({
      text: `Première publication : ${this.props.first_publication_date}`,
      size: xsmall,

    });

    // Date of last update
    this.pdf.printText({
      text: `Dernière mise à jour : ${this.props.index_date}`,
      size: xsmall,
    });

    // Date, time of creation and version
    this.pdf.printText({
      text: `Edité le ${this.date} ${this.time}, version ${this.version}`,
      size: xsmall,
    });
  }
}
