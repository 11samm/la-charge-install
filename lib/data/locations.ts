import type { FaqItem } from './services'

export type LocationPage = {
  slug: string
  city: string
  h1: string
  description: string
  targetKeyword: string
  utility: string
  rebateProgram: string
  rebateAmount: string
  permitAuthority: string
  neighborhoods: string[]
  housingSignal: string
  localAngle: string
  mapQuery: string
  featuredServices: string[]
  faqs: FaqItem[]
}

export const locations: LocationPage[] = [
  {
    slug: 'ev-charger-installation-burbank',
    city: 'Burbank',
    h1: 'EV Charger Installation in Burbank, CA',
    description:
      'Permit-aware estimates and panel-upgrade guidance tailored for older homes.',
    targetKeyword: 'ev charger installation burbank ca',
    utility: 'Burbank Water & Power (BWP)',
    rebateProgram: 'BWP EV Charger Rebate',
    rebateAmount: 'up to $500',
    permitAuthority: 'Burbank Building & Safety',
    neighborhoods: ['Magnolia Park', 'Rancho District', 'Media District'],
    housingSignal:
      'Post-war bungalows and mid-century homes in Burbank frequently need panel upgrades before Level 2 charging can be added.',
    localAngle:
      'Burbank is served by its own utility, Burbank Water & Power, rather than LADWP — which means different rebate amounts, forms, and program contacts than neighboring cities.',
    mapQuery: 'EV charger installation Burbank CA',
    featuredServices: ['tesla-wall-connector', '200-amp-upgrade', '240v-outlet'],
    faqs: [
      {
        question: 'Does Burbank offer an EV charger rebate?',
        answer: 'Yes. Burbank Water & Power has offered EV charger incentives.',
      },
      {
        question: 'Do Burbank homes often need panel upgrades for EV charging?',
        answer:
          'Many older Burbank homes do, especially where the existing panel is 100A or already near capacity.',
      },
      {
        question: 'Who pulls permits for EV charger installs in Burbank?',
        answer:
          'Permits for EV charger installs in Burbank are handled through Burbank Building & Safety.',
      },
    ],
  },
  {
    slug: 'ev-charger-installation-glendale',
    city: 'Glendale',
    h1: 'EV Charger Installation in Glendale, CA',
    description:
      'Hillside and exterior runs where weatherproofing and longer conduit are part of a realistic scope.',
    targetKeyword: 'ev charger installation glendale ca',
    utility: 'Glendale Water & Power (GWP)',
    rebateProgram: 'GWP EV Charger Rebate',
    rebateAmount: '$250',
    permitAuthority: 'Glendale Building & Safety',
    neighborhoods: ['Chevy Chase Canyon', 'Rossmoyne', 'Sparr Heights'],
    housingSignal:
      'Hillside homes and older neighborhoods in Glendale often require exterior conduit runs, weatherproof installs, and panel work before EV charging is ready.',
    localAngle:
      'Glendale Water & Power has its own EV charger incentive structure, separate from LADWP and BWP. Hillside installs here also add outdoor conduit and mounting complexity not common in flatter neighborhoods.',
    mapQuery: 'EV charger installation Glendale CA',
    featuredServices: ['juicebox-charger', 'outdoor-ev-charger', 'main-service-panel'],
    faqs: [
      {
        question: 'How is Glendale different from nearby cities for EV charger installs?',
        answer:
          'Glendale has its own utility, its own rebate context, and many hillside homes that change installation complexity.',
      },
      {
        question: 'Is the Glendale rebate the same as LADWP?',
        answer:
          'No. Glendale Water & Power has different program details and incentive amounts than LADWP, so check GWP’s current terms when you plan your install.',
      },
      {
        question: 'Are outdoor EV charger installs common in Glendale?',
        answer:
          'Yes, especially in hillside neighborhoods where driveway and exterior-wall mounting are common.',
      },
    ],
  },
  {
    slug: 'ev-charger-installation-north-hollywood',
    city: 'North Hollywood',
    h1: 'EV Charger Installation in North Hollywood, CA',
    description:
      'Single-family, condos, and mixed-use—parking access and the right permit path before trucks roll.',
    targetKeyword: 'ev charger install north hollywood',
    utility: 'LADWP',
    rebateProgram: 'LADWP EV Charger Rebate',
    rebateAmount: 'up to $500',
    permitAuthority: 'Los Angeles Department of Building and Safety',
    neighborhoods: ['NoHo Arts District', 'Toluca Lake-adjacent blocks', 'Valley Village fringe'],
    housingSignal:
      'North Hollywood combines older single-family panel stock with condos and mixed-use properties — so both standard home EV installs and small commercial or shared-parking projects come up in this area.',
    localAngle:
      'North Hollywood is served by LADWP and includes a mix of single-family homes, condos, and mixed-use corridors — each with different charger mounting and permitting needs.',
    mapQuery: 'EV charger installation North Hollywood CA',
    featuredServices: ['level-2-charger', 'commercial', 'permit-inspection'],
    faqs: [
      {
        question: 'Do North Hollywood homeowners qualify for LADWP charger rebates?',
        answer: 'Yes. North Hollywood properties served by LADWP can qualify for up to $500 in EV charger rebates.',
      },
      {
        question: 'Are condo and multi-family installs different in North Hollywood?',
        answer:
          'Yes. Shared parking, panel access, and permitting can make these jobs more complex than a standard single-family garage install.',
      },
      {
        question: 'Are older panels common in North Hollywood homes?',
        answer:
          'Yes, especially in older single-family housing stock where EV charging often reveals panel limitations.',
      },
    ],
  },
  {
    slug: 'ev-charger-installation-pasadena',
    city: 'Pasadena',
    h1: 'EV Charger Installation in Pasadena, CA',
    description:
      'Historic and Craftsman stock—permit-aware estimates when undersized service shows up early.',
    targetKeyword: 'ev charger installation pasadena ca',
    utility: 'Pasadena Water & Power (PWP)',
    rebateProgram: 'PWP EV Ready Rebate',
    rebateAmount: 'program-based incentives',
    permitAuthority: 'Pasadena Planning & Community Development',
    neighborhoods: ['Bungalow Heaven', 'Madison Heights', 'San Rafael'],
    housingSignal:
      'Older Craftsman homes and historic districts in Pasadena often have 60A to 100A panels, so an EV install quote frequently leads to a panel or service-size conversation.',
    localAngle:
      "Pasadena Water & Power offers its own EV-related programs, and many of the city's historic Craftsman and bungalow homes have undersized electrical service that needs to be assessed before a charger is added.",
    mapQuery: 'EV charger installation Pasadena CA',
    featuredServices: ['garage-ev-charger', 'panel-upgrade', 'panel-upgrade-cost'],
    faqs: [
      {
        question: 'Do older Pasadena homes need panel upgrades for EV charging?',
        answer:
          'Very often. Historic and older residential areas frequently have undersized electrical systems relative to modern EV charging demand.',
      },
      {
        question: 'Does Pasadena have its own utility program?',
        answer:
          'Yes. Pasadena Water & Power has its own EV-related programs separate from LADWP or BWP.',
      },
      {
        question: 'Are EV permits different in Pasadena?',
        answer:
          'Yes. Permit applications in Pasadena go through Pasadena Planning & Community Development, which has its own review process and timelines.',
      },
    ],
  },
  {
    slug: 'ev-charger-installation-studio-city',
    city: 'Studio City',
    h1: 'EV Charger Installation in Studio City, CA',
    description:
      'Hillside Wall Connector and outdoor routes—quotes that match real wire paths, not best-case numbers.',
    targetKeyword: 'ev charger installation studio city',
    utility: 'LADWP',
    rebateProgram: 'LADWP EV Charger Rebate',
    rebateAmount: 'up to $500',
    permitAuthority: 'Los Angeles Department of Building and Safety',
    neighborhoods: ['Silver Triangle', 'Colfax Meadows', 'hillside homes near Coldwater Canyon'],
    housingSignal:
      'Studio City homes often have higher-end EV adoption but can require more expensive wiring routes, especially in hillside properties.',
    localAngle:
      'Studio City has a high concentration of Tesla owners and hillside properties — meaning Wall Connector installs and exterior wiring routes are common requests in this area.',
    mapQuery: 'EV charger installation Studio City CA',
    featuredServices: ['tesla-wall-connector', 'outdoor-ev-charger', '200-amp-upgrade'],
    faqs: [
      {
        question: 'Is Studio City a strong market for Tesla Wall Connector installs?',
        answer:
          'Yes. Studio City has some of the highest Tesla ownership density in the Valley, and Wall Connector installs with outdoor or hillside routing are common here.',
      },
      {
        question: 'Do hillside homes in Studio City cost more to wire for EV charging?',
        answer:
          'They often do because longer runs and more complex mounting paths can increase labor and material cost.',
      },
      {
        question: 'Does Studio City use LADWP rebates?',
        answer:
          'Yes. LADWP context is important here, especially when homeowners are comparing nearby cities with different utilities.',
      },
    ],
  },
  {
    slug: 'ev-charger-installation-van-nuys',
    city: 'Van Nuys',
    h1: 'EV Charger Installation in Van Nuys, CA',
    description:
      'Homes, apartments, and small commercial—routing and panel access scoped to the property type.',
    targetKeyword: 'ev charger installation van nuys',
    utility: 'LADWP',
    rebateProgram: 'LADWP EV Charger Rebate',
    rebateAmount: 'up to $500',
    permitAuthority: 'Los Angeles Department of Building and Safety',
    neighborhoods: ['Valley Glen-adjacent blocks', 'Sherman Way corridor', 'Van Nuys Civic Center area'],
    housingSignal:
      'Van Nuys mixes single-family homes, apartments, and commercial corridors, making it ideal for both home and commercial charging content.',
    localAngle:
      'Van Nuys includes single-family homes, apartment complexes, and commercial properties — each requiring different charger approaches for parking access, panel location, and permitting.',
    mapQuery: 'EV charger installation Van Nuys CA',
    featuredServices: ['level-2-charger', 'commercial', 'sub-panel-installation'],
    faqs: [
      {
        question: 'Is Van Nuys a good market for commercial EV charger installs?',
        answer:
          'Yes. Mixed-use properties and commercial corridors in Van Nuys mean commercial charging projects are common alongside residential installs.',
      },
      {
        question: 'Do Van Nuys homes qualify for LADWP charger rebates?',
        answer: "Many do. LADWP's EV charger rebate applies to most Van Nuys addresses.",
      },
      {
        question: 'Are same-day estimates realistic in Van Nuys?',
        answer:
          'That claim is credible here because contractor access and routing are easier than in more remote hillside areas.',
      },
    ],
  },
  {
    slug: 'ev-charger-installation-encino',
    city: 'Encino',
    h1: 'EV Charger Installation in Encino, CA',
    description:
      'Large-lot, 60s–70s panels common—EV-ready options when the garage outpaces the main service.',
    targetKeyword: 'ev charger installation encino ca',
    utility: 'LADWP',
    rebateProgram: 'LADWP EV Charger Rebate',
    rebateAmount: 'up to $500',
    permitAuthority: 'Los Angeles Department of Building and Safety',
    neighborhoods: ['Amestoy Estates', 'Rancho Estates', 'Ventura Boulevard corridor'],
    housingSignal:
      'Many Encino homes are large single-family properties with 1960s and 1970s panels that can still become bottlenecks for EV charging.',
    localAngle:
      'Many Encino homes are large, 1960s and 1970s-era properties — roomy enough to park two EVs but often under-paneled relative to modern charging demand.',
    mapQuery: 'EV charger installation Encino CA',
    featuredServices: ['ev-ready-panel', 'tesla-wall-connector', 'chargepoint-home-flex'],
    faqs: [
      {
        question: 'Are panel upgrades common in Encino homes?',
        answer:
          'Yes. Even in affluent neighborhoods, older panels can limit EV charging and lead to upgrade recommendations.',
      },
      {
        question: 'Does Encino use LADWP rebates?',
        answer: 'Yes. Most Encino addresses are served by LADWP and are eligible for applicable EV charger rebates.',
      },
      {
        question: 'Is Encino a good market for EV-ready panel upgrades?',
        answer:
          'Yes. Many Encino homeowners are planning for a second EV or a broader electrical update, which makes EV-ready panel sizing a practical choice.',
      },
    ],
  },
  {
    slug: 'ev-charger-installation-northridge',
    city: 'Northridge',
    h1: 'EV Charger Installation in Northridge, CA',
    description:
      'Post-quake builds to mid-century—diagnostics first so you upgrade only when the load math says so.',
    targetKeyword: 'ev charger installation northridge ca',
    utility: 'LADWP',
    rebateProgram: 'LADWP EV Charger Rebate',
    rebateAmount: 'up to $500',
    permitAuthority: 'Los Angeles Department of Building and Safety',
    neighborhoods: ['Porter Ranch-adjacent areas', 'CSUN area', 'Devonshire corridor'],
    housingSignal:
      'Northridge includes many newer or retrofitted homes where the right angle is often diagnostics and readiness rather than assuming every home needs a full upgrade.',
    localAngle:
      'Northridge includes a range of housing ages, from post-Northridge-earthquake rebuilds to older mid-century homes — so panel readiness varies and is worth checking before scheduling an install.',
    mapQuery: 'EV charger installation Northridge CA',
    featuredServices: ['sub-panel-installation', 'level-2-charger', 'ev-ready-panel'],
    faqs: [
      {
        question: 'Do Northridge homes always need a panel upgrade for EV charging?',
        answer:
          'No. Some homes may already have enough capacity, which is why a diagnostics-focused message works well for Northridge.',
      },
      {
        question: 'Does Northridge qualify for LADWP rebates?',
        answer:
          'Yes. LADWP rebate context should still be included alongside local installation guidance.',
      },
      {
        question: 'Is sub-panel installation common in Northridge?',
        answer:
          'It can be, especially for garages, additions, and layouts where power distribution needs to be extended efficiently.',
      },
    ],
  },
  {
    slug: 'ev-charger-installation-tujunga',
    city: 'Tujunga & Sunland',
    h1: 'EV Charger Installation in Tujunga and Sunland, CA',
    description:
      'Foothill lots and detached structures—longer runs, sub-panels, and older stock priced as real distance.',
    targetKeyword: 'ev charger installation tujunga sunland',
    utility: 'LADWP',
    rebateProgram: 'LADWP EV Charger Rebate',
    rebateAmount: 'up to $500',
    permitAuthority: 'Los Angeles Department of Building and Safety',
    neighborhoods: ['Foothill Boulevard corridor', 'Shadow Hills-adjacent areas', 'equestrian properties'],
    housingSignal:
      'Foothill properties can have longer conduit runs, older panel stock, detached structures, and more unusual installation paths than denser urban areas.',
    localAngle:
      'Tujunga and Sunland foothill properties often have detached garages, longer conduit paths, and older panel stock — details that change both the install scope and final price.',
    mapQuery: 'EV charger installation Tujunga CA',
    featuredServices: ['240v-outlet', 'panel-modernization', 'sub-panel-installation'],
    faqs: [
      {
        question: 'Are EV charger installs different in Tujunga and Sunland?',
        answer:
          'Yes. Foothill lots, detached structures, and longer electrical runs can change both scope and price.',
      },
      {
        question: 'Do older homes in Tujunga often need panel upgrades?',
        answer:
          'Yes. Many older homes in the foothill area benefit from panel modernization or added capacity before charging is installed.',
      },
      {
        question: 'Can outbuildings and detached garages support EV chargers?',
        answer:
          'Yes, but they often require sub-panels or longer wiring routes, which should be addressed in the estimate process.',
      },
    ],
  },
  {
    slug: 'ev-charger-installation-la-canada-altadena',
    city: 'La Cañada Flintridge & Altadena',
    h1: 'EV Charger Installation in La Cañada Flintridge and Altadena, CA',
    description:
      'SCE and LA County DRP—permit and program context for hillside custom homes outside LADWP.',
    targetKeyword: 'ev charger installation la canada flintridge',
    utility: 'Southern California Edison (SCE)',
    rebateProgram: 'SCE EV program',
    rebateAmount: 'utility-program dependent',
    permitAuthority: 'Los Angeles County permitting',
    neighborhoods: ['Flintridge hillsides', 'Altadena estates', 'La Cañada custom-home corridors'],
    housingSignal:
      'These areas combine high EV adoption, custom homes, hillside conditions, and county-based permitting rather than a city utility workflow.',
    localAngle:
      'La Cañada Flintridge and Altadena are served by Southern California Edison (SCE), not LADWP, and fall under Los Angeles County permitting rather than a city building department — two differences that affect your rebate, permit process, and contractor requirements.',
    mapQuery: 'EV charger installation La Canada Flintridge CA',
    featuredServices: ['outdoor-ev-charger', 'tesla-wall-connector', '200-amp-upgrade'],
    faqs: [
      {
        question: 'Why is this area different from other city pages?',
        answer:
          'La Cañada Flintridge and Altadena use Southern California Edison, not LADWP, and permits go through LA County rather than a city department. Both affect your rebate eligibility and the permit process.',
      },
      {
        question: 'Do La Cañada and Altadena homes often need premium outdoor installs?',
        answer:
          'Yes. Custom lots, driveways, and hillside placement make outdoor charger work especially relevant here.',
      },
      {
        question: 'Are permits handled through the city here?',
        answer:
          'Correct. Altadena and La Cañada Flintridge are unincorporated communities, so permits are filed with Los Angeles County rather than a city building department.',
      },
    ],
  },
]

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug)
}

export function getLocationPath(slug: string) {
  return `/locations/${slug}`
}
