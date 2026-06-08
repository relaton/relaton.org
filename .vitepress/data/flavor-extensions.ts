import type { FlavorExtensionData } from '../types'
import { iso } from './flavor-ext/iso'
import { iec } from './flavor-ext/iec'
import { ietf } from './flavor-ext/ietf'
import { itu } from './flavor-ext/itu'
import { nist } from './flavor-ext/nist'
import { bipm } from './flavor-ext/bipm'
import { _3gpp } from './flavor-ext/3gpp'
import { ieee } from './flavor-ext/ieee'
import { w3c } from './flavor-ext/w3c'

export const flavorExtensions: Record<string, FlavorExtensionData> = {
  iso,
  iec,
  ietf,
  itu,
  nist,
  bipm,
  '3gpp': _3gpp,
  ieee,
  w3c,
}
