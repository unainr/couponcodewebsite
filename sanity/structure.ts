import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('storeAdd').title('Add Store'),
      S.documentTypeListItem('addCoupon').title('Add Coupon'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('country').title('Country'),
      S.documentTypeListItem('coupontype').title('Coupon Type'),
      S.documentTypeListItem('featured').title('Featured'),
      S.documentTypeListItem('seasonal').title('Seasonal'),


    ]);
