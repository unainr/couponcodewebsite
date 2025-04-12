import { defineQuery } from "next-sanity";

export const FETCH_STORE = defineQuery(`*[_type == "storeAdd"] {
    _id,
    name,
    description,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
  }
  `);

  export const FETCH_STORE_BY_SLUG = defineQuery(`*[_type == "storeAdd" && slug.current == $slug][0] {
    _id,
    name,
    description,
    homeurl,
    affiliate,
    metatitle,
    metadescription,
    metakeywords,
    "slug": slug.current,
    "country": country->name,
    "category": category->name,
    "images": images[].asset->url,
    "coupons": *[_type == "addCoupon" && references(^._id)] {
      _id,
      coupontitle,
      description,
      couponurl,
      couponcode,
      "coupontype": coupontype->name,
      publishdate,
      expiredate,
      "featured": featured->name
    }
  }
  `);
  


  // category
  // Query to fetch all coupons for a specific category by category name
export const COUPONS_BY_CATEGORY_NAME_QUERY = `
*[_type == "addCoupon" && store->category->name == $category] {
  _id,
  coupontitle,
  description,
  couponurl,
  couponcode,
  publishdate,
  expiredate,
  "storeName": store->name,
  "storeImage": store->images[0].asset->url,
  "couponTypeName": coupontype->name,
  "categoryName": store->category->name
}
`

// Query to fetch all stores by category name
export const STORES_BY_CATEGORY_NAME_QUERY = `
*[_type == "storeAdd" && category->name == $category] {
  _id,
  name,
  "slug": slug.current,
  description,
  homeurl,
  affiliate,
  "imageUrl": images[0].asset->url,
  "categoryName": category->name,
  "countryName": country->name
}
`


// fetch all categories
export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "count": count(*[_type == "storeAdd" && references(^._id)])
  }
`;

// fetch all coupons type 
export const ALL_COUPON_TYPES_QUERY = `
 *[_type == "coupontype"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
  }`

// Query to fetch a single coupon type by slug
export const COUPON_TYPE_QUERY = `
  *[_type == "coupontype" && slug.current == $coupontype][0] {
    _id,
    name,
    "slug": slug.current
  }
`;

// Query to fetch all coupons related to a specific coupon type
export const COUPONS_BY_TYPE_QUERY = `
 *[_type == "addCoupon" && coupontype->_id == $coupontypeId] {
    _id,
    coupontitle,
    description,
    couponurl,
    couponcode,
    "coupontype": coupontype->name,
    publishdate,
    expiredate,
    "featured": featured->name,
    "storeImage": store->images[0].asset->url,
    "storeSlug": store->slug.current,
  }
`;

  // fetch all countries
  export const ALL_COUNTRIES_QUERY = `
   *[_type == "country"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
  }
  `
  // fetch all seasons
  export const ALL_SEASONS_QUERY = `
   *[_type == "seasonal"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
  }
  `

  export const SEASON_TYPE_QUERY = `
  *[_type == "seasonal" && slug.current == $season][0] {
    _id,
    name,
    "slug": slug.current
  }`

  export const COUPONS_BY_SEASON_QUERY = `
  *[_type == "addCoupon" && seasonal->_id == $seasonId] {
    _id,
    coupontitle,
    description,
    couponurl,
    couponcode,
    "coupontype": coupontype->name,
    publishdate,
    expiredate,
    "featured": featured->name,
    "storeImage": store->images[0].asset->url,
    "storeSlug": store->slug.current,
    "seasonName": seasonal->name
  }
`

// Search query that searches across both coupons and stores
export const SEARCH_QUERY = `{
  "coupons": *[_type == "addCoupon" && (
    coupontitle match $searchTerm || 
    description match $searchTerm || 
    couponcode match $searchTerm
  )] {
    _id,
    coupontitle,
    description,
    couponurl,
    couponcode,
    "coupontype": coupontype->name,
    publishdate,
    expiredate,
    "featured": featured->name,
    "storeImage": store->images[0].asset->url,
    "storeSlug": store->slug.current,
    "storeName": store->name,
    "seasonName": seasonal->name,
    "_type": "coupon"
  },
  "stores": *[_type == "storeAdd" && (
    name match $searchTerm ||
    description match $searchTerm ||
    slug.current match $searchTerm
  )] {
    _id,
    name,
    description,
    homeurl,
    affiliate,
    "slug": slug.current,
    "imageUrl": images[0].asset->url,
    "categoryName": category->name,
    "countryName": country->name,
    "_type": "store"
  }
}`;
