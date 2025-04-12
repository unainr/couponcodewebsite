export interface Store {
  _id: string;
  name: string;
  description: string;
  slug: string;
  imageUrl: string;
}

export interface StoreCouponProps {
  _id: string;
  name: string;
  description: string;
  homeurl: string;
  affiliate: string;
  metatitle: string;
  metadescription: string;
  metakeywords: string;
  country: string;
  category: string;
  images: string[];
  coupons: {
    _id: string;
    coupontitle: string;
    description: string;
    couponurl: string;
    couponcode: string;
    coupontype: string;
    publishdate: string;
    expiredate: string;
    featured: string;
  }[];
}

export interface CouponProps {
  code: string;
  id?: string
  description: string;
  expiryDate: string;
  updateDate: string;
  storeImage?: string;
  couponTitle: string;
  coupontype?: string;
  couponurl: string;
  featured: string;
  slug?: string;
  isExpired?: boolean;
}

export type Category = {
  _id: string;
  name: string;
  slug: string; // Add slug field
};

export interface NavBarClientProps {
  categories: Category[];
  couponTypes:Category[];
  season:Category[];
}