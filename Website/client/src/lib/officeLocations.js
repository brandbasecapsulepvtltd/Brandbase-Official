/** Office locations shared by ContactInfo and GlobalPresence */
export const OFFICE_LOCATIONS = {
  'india-mumbai': {
    id: 'india-mumbai',
    name: 'India (Mumbai) – Headquarters',
    city: 'Mumbai',
    country: 'India',
    region: 'Asia Pacific',
    role: 'Headquarters',
    isHQ: true,
    lat: 19.1463,
    lng: 72.8529,
    address: 'Brandbase Capsule Pvt. Ltd, R-34A, Office No. 34, NESCO IT Park, Goregaon East, Mumbai, Maharashtra 400063',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.117952282899!2d72.8529381752071!3d19.146313482072753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7e5376da39f%3A0x21e298050ae587f!2sBrandbase%20Capsule%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1768378539865!5m2!1sen!2sin',
  },
  'usa-lasvegas': {
    id: 'usa-lasvegas',
    name: 'USA (Las Vegas) – North America Office',
    city: 'Las Vegas',
    country: 'United States',
    region: 'North America',
    role: 'Regional Office',
    lat: 36.1337,
    lng: -115.1541,
    address: 'Paradise Road Business Center, Paradise Rd, Las Vegas, NV 89109, USA',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.495874028415!2d-115.15413948473072!3d36.13367668009005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c43b7f8a5e1f%3A0x2d6b1e1f9c8b7a6!2sParadise%20Rd%2C%20Las%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1700000001001!5m2!1sen!2sus',
  },
  'uk-birmingham': {
    id: 'uk-birmingham',
    name: 'UK (Birmingham) – Europe Operations',
    city: 'Birmingham',
    country: 'United Kingdom',
    region: 'Europe',
    role: 'Regional Office',
    lat: 52.4511,
    lng: -1.723,
    address: 'The Business Quarter, Coventry Rd, Birmingham B40 1PA, United Kingdom',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.903228873081!2d-1.72297818420538!3d52.45109297980296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870b1f0b5b9e7f1%3A0x5c4d3e2b1a0f9e8!2sCoventry%20Rd%2C%20Birmingham!5e0!3m2!1sen!2suk!4v1700000001002!5m2!1sen!2suk',
  },
  'saudi-riyadh': {
    id: 'saudi-riyadh',
    name: 'Saudi Arabia (Riyadh) – Middle East Office',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    region: 'Middle East',
    role: 'Regional Office',
    lat: 24.8425,
    lng: 46.727,
    address: 'Riyadh Front Business District, Airport Road, Riyadh 13412, Saudi Arabia',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.112883449912!2d46.72695437519745!3d24.84245377792317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f02a7b9a7c7c9%3A0x9d8e7f6a5b4c3d2!2sRiyadh%20Front!5e0!3m2!1sen!2ssa!4v1700000001003!5m2!1sen!2ssa',
  },
  singapore: {
    id: 'singapore',
    name: 'Singapore – Asia-Pacific Office',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia Pacific',
    role: 'Regional Office',
    lat: 1.2836,
    lng: 103.8589,
    address: 'Bayfront Plaza, Marina Bay, Singapore 018956',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.809231918633!2d103.85891531538578!3d1.283593699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19119f7f8a8b%3A0x4e5d6c7b8a9f0e1!2sBayfront%20Plaza!5e0!3m2!1sen!2ssg!4v1700000001004!5m2!1sen!2ssg',
  },
  'europe-germany-frankfurt': {
    id: 'europe-germany-frankfurt',
    name: 'Europe (Frankfurt) – EU Operations',
    city: 'Frankfurt',
    country: 'Germany',
    region: 'Europe',
    role: 'Regional Office',
    lat: 50.1111,
    lng: 8.6514,
    address: 'Skyline Plaza Business Area, Europa-Allee, 60327 Frankfurt am Main, Germany',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2564.420031210493!2d8.65139281571901!3d50.11110287942733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0b91d1e5c5a3%3A0x6f5e4d3c2b1a0!2sSkyline%20Plaza!5e0!3m2!1sen!2sde!4v1700000001005!5m2!1sen!2sde',
  },
};

export const OFFICE_LIST = Object.values(OFFICE_LOCATIONS);
