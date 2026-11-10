/**
 * DEV-ONLY generator for lib/mock/filler.generated.ts.
 *
 * This is the only file that imports @faker-js/faker (a devDependency). It is
 * never imported by application code, so faker cannot reach a production
 * bundle. The seed is fixed, so the output is deterministic.
 *
 *   pnpm mock:generate
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { faker } from '@faker-js/faker'

faker.seed(2026)

const COUNT = 24
const AREAS = [
  'Sector 4, Uttara',
  'Sector 7, Uttara',
  'Sector 11, Uttara',
  'Gulshan 1',
  'Gulshan 2',
  'Banani',
  'Baridhara DOHS',
  'Bashundhara R/A',
  'Dhanmondi',
  'Mirpur DOHS',
  'Nikunja 2',
  'Mohakhali DOHS'
]
const OPERATORS = ['17', '18', '19', '16', '15', '13']

const list = <T>(make: (index: number) => T): T[] => Array.from({ length: COUNT }, (_, i) => make(i))

const filler = {
  /** Bangladeshi mobile numbers */
  phones: list(() => `+880${faker.helpers.arrayElement(OPERATORS)}${faker.string.numeric(8)}`),
  /** Dhaka street addresses */
  addresses: list(
    () =>
      `House ${faker.number.int({ min: 2, max: 88 })}, Road ${faker.number.int({ min: 1, max: 27 })}, ${faker.helpers.arrayElement(AREAS)}, Dhaka`
  ),
  /** bKash / bank transfer style payment references */
  paymentReferences: list(() => `TXN${faker.string.alphanumeric({ length: 10, casing: 'upper' })}`),
  /** Application number suffixes */
  applicationCodes: list(() => faker.string.alphanumeric({ length: 8, casing: 'upper' })),
  /** ISO dates of birth for applicants (ages 4-16) */
  birthDates: list(() => faker.date.birthdate({ mode: 'age', min: 4, max: 16 }).toISOString().slice(0, 10)),
  /** Stable picsum seeds for filler photos */
  imageSeeds: list((i) => `ihsb-${faker.word.noun()}-${i}`),
  /** Lower-case handles for e-mail / LinkedIn slugs */
  handles: list(() => faker.string.alphanumeric({ length: 6, casing: 'lower' })),
  /** Minutes offsets used to scatter timestamps within a day */
  minuteOffsets: list(() => faker.number.int({ min: 0, max: 9 * 60 }))
}

const banner = `/**
 * GENERATED FILE - do not edit by hand.
 * Source: lib/mock/generate-filler.ts (faker.seed(2026)). Regenerate with \`pnpm mock:generate\`.
 * Static data so that @faker-js/faker never ships in a production bundle.
 */
`

const body = `export const filler = ${JSON.stringify(filler, null, 2)} as const\n`
const target = join(dirname(fileURLToPath(import.meta.url)), 'filler.generated.ts')
writeFileSync(target, banner + body)
console.log(`Wrote ${target}`)
