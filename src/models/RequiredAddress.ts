import ExtendedAddress from './ExtendedAddress'
import { type NullableString } from './NullableString'

export default class RequiredAddress extends ExtendedAddress {
  constructor (
    street1: string,
    street2: string,
    city: string,
    state: string,
    zip: string,
    countyCode?: NullableString) {
    super(zip, street1, street2, city, state, countyCode ?? null)
  }
}
