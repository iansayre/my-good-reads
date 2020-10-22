interface IndustryIdentifier {
  type: string,
  identifier: string
}

interface VolumeInfo {
  title: string,
  subtitle: string,
  authors: string[],
  publisher: string,
  publishedDate: string,
  description: string,
  industryIdentifiers: IndustryIdentifier[],
  readingModes: object,
  pageCount: number,
  printType: string,
  categories: string[],
  maturityRating: string,
  allowAnonLogging: boolean,
  contentVersion: string,
  panelizationSummary: {
    containsEpubBubbles: boolean,
    containsImageBubbles: boolean
  },
  imageLinks: {
    smallThumbnail: string,
    thumbnail: string,
  },
  language: string,
  previewLink: string,
  infoLink: string,
  canonicalVolumeLink: string
}

interface Price {
  amount: number,
  currencyCode: string
}

interface OfferPrice {
  amountInMicros: number,
  currencyCode: string
}

interface Offer {
  finskyOfferType: number,
  listPrice: OfferPrice,
  retailPrice: OfferPrice,
  giftable: boolean
}

interface SaleInfo {
  country: string,
  saleability: string,
  isEbook: boolean,
  listPrice: Price,
  retailPrice: Price,
  buyLink: string,
  offers: Offer[]
}

interface AccessInfo {
  country: string,
  viewability: string,
  embeddable: boolean,
  publicDomain: boolean,
  textToSpeechPermission: string,
  epub: {
    isAvailable: boolean
  },
  pdf: {
    isAvailable: boolean
  }
  webReaderLink: string,
  accessViewStatus: string,
  quoteSharingAllowed: boolean
}

export interface BooksItem {
  kind: string,
  id: string,
  etag: string,
  selfLink: string,
  volumeInfo: VolumeInfo,
  saleInfo: SaleInfo,
  accessInfo: AccessInfo,
  searchInfo: {
    textSnippet: string
  }
}


export interface AvailableBooks {
  kind: string
  totalItems: number,
  items: BooksItem[]
}