import {Ad, AdData} from './ad';

const fakeData: AdData = {
  'list_id': 12345,
  'first_publication_date': '2022-01-05 01:01:01',
  'expiration_date': '2022-03-06 02:02:02',
  'index_date': '2022-02-02 03:03:03',
  'status': 'active',
  'category_id': '2',
  'category_name': 'Voitures',
  'subject': 'VOLVO',
  'body': 'VOLVO V60 B5 250 CV R-DESIGN BVA\\n\\nTVA récupérable pour les professionnels\\n\\nInformations générales:\\n\\n1 ère mise en circulation: 12/04/2021\\nCouleur extérieur: Noir\\nCouleur intérieur: Cuir Noir\\nPlaces: 5\\nPuissance fiscale: 15 cv\\nPuissance Din: 250 cv\\n\\nLes Plus de cette Volvo V60:\\n\\n- Véhicule 1 ère main\\n- Garantie 12 mois dans le réseau constructeur\\n- Extension de garantie possible jusqu\'à 36 mois\\n\\nOPTIONS:\\n\\n- Jantes Alu 19 pouces\\n- Phares xénons+ LED\\n- Hayon électrique\\n- Sièges chauffant avant\\n- Sièges électriques à mémoires\\n- Drive mode\\n- Caméra de recul\\n- Lecture des panneaux\\n- Son hifi Harman Kardon\\n- Lane keeping aid\\n- Détecteur d\'angle mort\\n- Sièges sport\\n- Accès et démarrage sans clef\\n- Rétroviseur Rabattable Electrique\\n- Aide au Stationnement avant et arrière\\n- Régulateur de Vitesse\\n- Volant multifonctions\\n- Climatisation automatiques bi-zones\\n- GPS Europe\\n- Téléphone\\n- Ordinateur de bord\\n\\nNos Engagements:\\n\\nVéhicule certifié non accidenté et kilométrage réel et certifié.\\nReprise possible de votre véhicule.\\nVéhicule en stock et garantie.\\nLivraison possible dans toute la France. (Tarif sur demande)',
  'ad_type': 'offer',
  'url': 'https://www.leboncoin.fr/voitures/12345.htm',
  'price': [
    45950,
  ],
  'price_cents': 4595000,
  'price_calendar': null,
  'images': {
    'thumb_url': 'http://localhost/main.jpg?rule=ad-thumb',
    'small_url': 'http://localhost/main.jpg?rule=ad-small',
    'nb_images': 10,
    'urls': [
      'http://localhost/main.jpg?rule=ad-image',
      'http://localhost/second.jpg?rule=ad-image',
    ],
    'urls_thumb': [
      'http://localhost/main.jpg?rule=ad-thumb',
      'http://localhost/second.jpg?rule=ad-thumb',
    ],
    'urls_large': [
      'http://localhost/main.jpg?rule=ad-large',
      'http://localhost/second.jpg?rule=ad-large',
    ],
  },
  'attributes': [
    {
      'key': 'activity_sector',
      'value': '1',
      'values': [
        '1',
      ],
      'value_label': '1',
      'generic': false,
    },
    {
      'key': 'brand',
      'value': 'Volvo',
      'values': [
        'Volvo',
      ],
      'key_label': 'Marque',
      'value_label': 'Volvo',
      'generic': true,
    },
    {
      'key': 'model',
      'value': 'V60',
      'values': [
        'V60',
      ],
      'key_label': 'Modèle',
      'value_label': 'V60',
      'generic': true,
    },
    {
      'key': 'regdate',
      'value': '2021',
      'values': [
        '2021',
      ],
      'key_label': 'Année-modèle',
      'value_label': '2021',
      'generic': true,
    },
    {
      'key': 'issuance_date',
      'value': '04/2021',
      'values': [
        '04/2021',
      ],
      'key_label': 'Mise en circulation',
      'value_label': '04/2021',
      'generic': true,
    },
    {
      'key': 'mileage',
      'value': '16385',
      'values': [
        '16385',
      ],
      'key_label': 'Kilométrage',
      'value_label': '16385 km',
      'generic': true,
    },
    {
      'key': 'fuel',
      'value': '1',
      'values': [
        '1',
      ],
      'key_label': 'Carburant',
      'value_label': 'Essence',
      'generic': true,
    },
    {
      'key': 'gearbox',
      'value': '2',
      'values': [
        '2',
      ],
      'key_label': 'Boîte de vitesse',
      'value_label': 'Automatique',
      'generic': true,
    },
    {
      'key': 'vehicle_type',
      'value': 'break',
      'values': [
        'break',
      ],
      'key_label': 'Type de véhicule',
      'value_label': 'Break',
      'generic': true,
    },
    {
      'key': 'vehicule_color',
      'value': 'noir',
      'values': [
        'noir',
      ],
      'key_label': 'Couleur',
      'value_label': 'Noir',
      'generic': true,
    },
    {
      'key': 'doors',
      'value': '5',
      'values': [
        '5',
      ],
      'key_label': 'Nombre de portes',
      'value_label': '5',
      'generic': true,
    },
    {
      'key': 'seats',
      'value': '5',
      'values': [
        '5',
      ],
      'key_label': 'Nombre de place(s)',
      'value_label': '5',
      'generic': true,
    },
    {
      'key': 'horsepower',
      'value': '15',
      'values': [
        '15',
      ],
      'key_label': 'Puissance fiscale',
      'value_label': '15 Cv',
      'generic': true,
    },
    {
      'key': 'horse_power_din',
      'value': '250',
      'values': [
        '250',
      ],
      'key_label': 'Puissance DIN',
      'value_label': '250 Ch',
      'generic': true,
    },
    {
      'key': 'vehicle_vsp',
      'value': 'avecpermis',
      'values': [
        'avecpermis',
      ],
      'key_label': 'Permis',
      'value_label': 'Avec permis',
      'generic': true,
    },
    {
      'key': 'car_contract',
      'value': '2',
      'values': [
        '2',
      ],
      'key_label': 'Soumis à LOA/LLD',
      'value_label': 'Oui',
      'generic': true,
    },
    {
      'key': 'custom_ref',
      'value': '1709',
      'values': [
        '1709',
      ],
      'key_label': 'Référence',
      'value_label': '1709',
      'generic': true,
    },
    {
      'key': 'is_import',
      'value': 'false',
      'values': [
        'false',
      ],
      'value_label': 'false',
      'generic': false,
    },
    {
      'key': 'critair',
      'value': '1',
      'values': [
        '1',
      ],
      'key_label': "Crit'air",
      'value_label': '1',
      'generic': true,
    },
    {
      'key': 'car_price_min',
      'value': '41743',
      'values': [
        '41743',
      ],
      'value_label': '41743',
      'generic': false,
    },
    {
      'key': 'car_price_max',
      'value': '46137',
      'values': [
        '46137',
      ],
      'value_label': '46137',
      'generic': false,
    },
    {
      'key': 'car_rotation_delay',
      'value': '54',
      'values': [
        '54',
      ],
      'value_label': '54',
      'generic': false,
    },
    {
      'key': 'spare_parts_availability',
      'value': 'non_renseignee',
      'values': [
        'non_renseignee',
      ],
      'key_label': 'Disponibilité des pièces détachées',
      'value_label': 'Non renseignée',
      'generic': true,
    },
  ],
  'location': {
    'country_id': 'FR',
    'region_id': '7',
    'region_name': 'Centre',
    'department_id': '123',
    'department_name': 'Indre-et-Loire',
    'city_label': 'Tours CEDEX',
    'city': 'Tours',
    'zipcode': '37390',
    'lat': 47.3248696,
    'lng': 1.0703005,
    'source': 'address',
    'provider': 'here',
    'is_shape': false,
    'feature': {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          1.0703005,
          47.3248696,
        ],
      },
      'properties': null,
    },
  },
  'owner': {
    'store_id': '987654321',
    'user_id': '123-456-789',
    'type': 'pro',
    'name': 'SARL lol',
    'siren': '008866442211',
    'no_salesmen': true,
    'activity_sector': '1',
  },
  'options': {
    'has_option': true,
    'booster': false,
    'photosup': true,
    'urgent': false,
    'gallery': false,
    'sub_toplist': false,
  },
  'has_phone': true,
  'is_boosted': true,
};

describe('Ad', () => {
  let ad: Ad;

  beforeEach(async () => {
    ad = new Ad(fakeData);
    await ad.build();
  });

  describe('ad', () => {
    it('should be defined', () => {
      expect(ad).toBeDefined();
    });
  });
});
