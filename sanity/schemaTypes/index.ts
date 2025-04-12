import { type SchemaTypeDefinition } from 'sanity'
import { addCoupon } from './addcoupon'
import category from './category'
import country from './country'
import coupontype from './coupontype'
import featured from './featured'
import seasonal from './seasonal'
import { storeAdd } from './storeadd'




export const schema: { types: SchemaTypeDefinition[] } = {
  types: [storeAdd,addCoupon,category,country,coupontype,featured,seasonal],
}
