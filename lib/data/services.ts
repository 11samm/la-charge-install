export type FaqItem = {
  question: string
  answer: string
}

export type ServicePage = {
  slug: string
  category: 'ev' | 'panel'
  title: string
  shortTitle: string
  h1: string
  description: string
  targetKeyword: string
  minPrice: number
  maxPrice: number
  intro: string
  localAngle: string
  panelAngle: string
  processBody: string
  upgradeBody: string
  featuredCitySlug: string
  featuredCityName: string
  highlights: string[]
  faqs: FaqItem[]
  relatedSlugs: string[]
}

const evServices: ServicePage[] = [
  {
    slug: 'tesla-wall-connector',
    category: 'ev',
    title: 'Tesla Wall Connector Installation',
    shortTitle: 'Tesla Wall Connector',
    h1: 'Tesla Wall Connector Installation in Los Angeles',
    description:
      'Fast, code-compliant Tesla Wall Connector installations for San Fernando Valley homes—expert site assessment, permits, and panel coordination from licensed electricians.',
    targetKeyword: 'tesla wall connector installation los angeles',
    minPrice: 800,
    maxPrice: 1800,
    intro:
      'The Tesla Wall Connector delivers up to 48A of Level 2 charging—enough to add roughly 30–44 miles of range per hour, depending on your vehicle. Our licensed C-10 network handles site review, permit filing, panel evaluation, and a clean install that meets local code.',
    localAngle:
      'We install Wall Connectors for homeowners across Burbank, Studio City, Encino, Pasadena, Northridge, and the broader San Fernando Valley—coordinated with your utility territory (LADWP, BWP, GWP, PWP, or SCE) and local permit rules.',
    panelAngle:
      'If your home still has a 100A or 150A service, your crew flags capacity limits before you commit—so you avoid a failed inspection, nuisance trips, or a charger you cannot run at full amperage.',
    processBody:
      'Request an estimate and we match you to a vetted contractor. They confirm mounting location, wire path, and breaker space; pull permits where required; install a dedicated circuit sized for the Wall Connector; and walk you through final inspection and setup.',
    upgradeBody:
      'Charger projects often discover an undersized panel. If your main service cannot support the new load, we point you to EV-triggered panel and service upgrades—not generic electrical work—so you stay in one coordinated process.',
    featuredCitySlug: 'ev-charger-installation-studio-city',
    featuredCityName: 'Studio City',
    highlights: [
      'Placement planning for garages, driveways, and exterior walls',
      'Permit-aware work aligned with your city or county authority',
      'Load and breaker review before the install is scheduled',
    ],
    faqs: [
      {
        question: 'How much does Tesla Wall Connector installation cost in Los Angeles?',
        answer:
          'Most single-family installs land between $800 and $1,800 depending on wire run length, breaker availability, wall type, and whether a panel upgrade is required.',
      },
      {
        question: 'Do I need a permit for a Tesla charger install?',
        answer:
          'In most San Fernando Valley cities, yes. Requirements vary by jurisdiction and utility. Your estimate includes which permits apply and who handles them.',
      },
      {
        question: 'Can my existing panel support a Tesla Wall Connector?',
        answer:
          'Sometimes, but many 100A and 150A panels cannot support both existing household load and a dedicated EV circuit without load management or an upgrade.',
      },
    ],
    relatedSlugs: ['level-2-charger', 'garage-ev-charger', 'permit-inspection'],
  },
  {
    slug: 'chargepoint-home-flex',
    category: 'ev',
    title: 'ChargePoint Home Flex Installation',
    shortTitle: 'ChargePoint Home Flex',
    h1: 'ChargePoint Home Flex Installation in Los Angeles',
    description:
      'Licensed ChargePoint Home Flex installation with amperage settings matched to your panel, clear pricing, and help navigating local permits and utility rebates.',
    targetKeyword: 'chargepoint home flex install burbank',
    minPrice: 800,
    maxPrice: 1700,
    intro:
      'The ChargePoint Home Flex is a flexible 40A–50A Level 2 charger homeowners choose for adjustable output and app control. We install the dedicated 240V circuit, match settings to your electrical capacity, and set you up to charge every night with confidence.',
    localAngle:
      'From Burbank and Glendale to Van Nuys and Encino, rebate programs and utility rules differ. We help you understand what applies in your service area and build that into a realistic, permitted install.',
    panelAngle:
      'The Home Flex’s amp range only helps if your panel has the capacity. We size the circuit and breakers to your service—so you get the charging speed you pay for, not a surprise overload.',
    processBody:
      'You share your address and a photo of your panel. A licensed electrician confirms indoor or outdoor placement, NEMA or hardwire configuration, and permit needs—then provides a range before work is scheduled.',
    upgradeBody:
      'If the estimate shows no spare breaker space or a maxed 100A service, we explain next steps: load management, sub-panel, or a full EV-readiness upgrade, always tied back to home charging safety.',
    featuredCitySlug: 'ev-charger-installation-burbank',
    featuredCityName: 'Burbank',
    highlights: [
      'Configuration guidance for amperage and cable length to the panel',
      'Rebate- and program-aware planning for LADWP, BWP, GWP, and PWP',
      'Garage, driveway, and exterior mounting with weather-appropriate methods',
    ],
    faqs: [
      {
        question: 'Is ChargePoint Home Flex a Level 2 charger?',
        answer:
          'Yes. It is a popular 240V Level 2 home charger, typically installed on a dedicated circuit with breaker protection sized for the selected output.',
      },
      {
        question: 'Can I install ChargePoint on a NEMA 14-50 outlet?',
        answer:
          'Many homes use a NEMA 14-50. Others are better served with hardwiring, especially for outdoor or high-use setups where a permanent install improves reliability and code compliance.',
      },
      {
        question: 'Will I need a panel upgrade for ChargePoint?',
        answer:
          'If your panel is at or near capacity, you may need an upgrade, a new circuit from a sub-panel, or a load-control device. The estimate should identify that before you buy the charger.',
      },
    ],
    relatedSlugs: ['level-2-charger', '240v-outlet', 'outdoor-ev-charger'],
  },
  {
    slug: 'emporia-ev-charger',
    category: 'ev',
    title: 'Emporia EV Charger Installation',
    shortTitle: 'Emporia EV Charger',
    h1: 'Emporia EV Charger Installation in Los Angeles',
    description:
      'Reliable Emporia smart charger installation in the San Fernando Valley—fair pricing, licensed electricians, and honest answers about your panel and rebates.',
    targetKeyword: 'emporia ev charger installation san fernando valley',
    minPrice: 750,
    maxPrice: 1600,
    intro:
      'Emporia’s smart Level 2 charger pairs with app-based scheduling and often appeals to value-focused buyers. We deliver the same professional install as premium brands: correct breaker sizing, grounded wiring, and a permit-friendly job you can show at resale.',
    localAngle:
      'We work across the Valley and adjacent LA communities—so whether you are in the Hills, the flats, or closer to the 405, you get a crew that knows local utilities and city permit paths.',
    panelAngle:
      'A lower hardware price does not change electrical math. We still confirm your service can run a 40A+ circuit safely—so Emporia does not become a lesson in overloaded panels.',
    processBody:
      'Submit your project details. We check Wi-Fi near the install location, distance to the panel, and whether a NEMA or hardwired plan fits. You receive a clear scope and price band before a truck rolls.',
    upgradeBody:
      'When the panel cannot support a new EV circuit, we outline EV-triggered upgrade options in plain language, with one coordinated path from problem to charging.',
    featuredCitySlug: 'ev-charger-installation-encino',
    featuredCityName: 'Encino',
    highlights: [
      'Straightforward estimates without cutting corners on code',
      'Dedicated 240V paths for post-war and mid-century homes',
      'Panel readiness review included in the quote process',
    ],
    faqs: [
      {
        question: 'How much does it cost to install an Emporia EV charger?',
        answer:
          'Most installs fall between $750 and $1,600, with higher costs when trenching, exterior mounting, or significant panel work is required.',
      },
      {
        question: 'Is Emporia a good fit for older homes?',
        answer:
          'Yes—older homes just need a careful look at service size, breaker space, and wire path. That is standard for every job we take.',
      },
      {
        question: 'Does an Emporia charger qualify for local rebates?',
        answer:
          'Rebates depend on your utility and current program terms. We point you to the right program for LADWP, BWP, GWP, PWP, or SCE and what documentation you need.',
      },
    ],
    relatedSlugs: ['chargepoint-home-flex', '240v-outlet', 'garage-ev-charger'],
  },
  {
    slug: 'juicebox-charger',
    category: 'ev',
    title: 'JuiceBox EV Charger Installation',
    shortTitle: 'JuiceBox Charger',
    h1: 'JuiceBox EV Charger Installation in Los Angeles',
    description:
      'JuiceBox Level 2 installation with clear outdoor and garage options, licensed workmanship, and pricing that accounts for your site—not generic “starting at” bait.',
    targetKeyword: 'juicebox charger install glendale ca',
    minPrice: 800,
    maxPrice: 1700,
    intro:
      'JuiceBox is a well-known 240V home charger with flexible mounting and app features. We install the right circuit, disconnect, and overcurrent protection so your unit operates safely in California’s climate and code environment.',
    localAngle:
      'Foothill properties, older wiring, and mixed hillside lots are common from Glendale to Tujunga. We have crews experienced with longer conduit runs, exterior disconnects, and local AHJ requirements.',
    panelAngle:
      'Exterior and long-run installs can stress a marginal panel. We confirm total load before you invest in a charger location that might force a service upgrade—transparently, up front.',
    processBody:
      'We document parking layout, path from panel to charger, and exposure to sun and weather. The quote reflects trenching, conduit, and strapping—not a one-size line item that changes on install day.',
    upgradeBody:
      'If your estimate shows a 100A or crowded panel, we help you plan EV capacity first—often pairing JuiceBox with a sub-panel or main upgrade so you are not stuck at Level 1 speeds.',
    featuredCitySlug: 'ev-charger-installation-glendale',
    featuredCityName: 'Glendale',
    highlights: [
      'Indoor and outdoor installs with code-correct clearances and wiring methods',
      'Honest lead times and what drives price (length of run, breaker work, ground)',
      'Coordination for permits in cities across the Valley and LA County DRP',
    ],
    faqs: [
      {
        question: 'Can a JuiceBox charger be installed outdoors?',
        answer:
          'Yes, with a suitable location, raintight enclosure or rated unit, and wiring methods approved for the exposure. Your quote should list any weatherization scope.',
      },
      {
        question: 'Do I need a permit for JuiceBox installation?',
        answer:
          'In most incorporated cities, yes for new 240V circuits. Requirements vary. We help identify the authority and whether the job is plan-check or over-the-counter.',
      },
      {
        question: 'What increases the price of a JuiceBox install?',
        answer:
          'Longer wire runs, outdoor conduit, sub-panel or service work, and lack of spare breaker space are the most common adders.',
      },
    ],
    relatedSlugs: ['outdoor-ev-charger', 'level-2-charger', 'permit-inspection'],
  },
  {
    slug: 'level-2-charger',
    category: 'ev',
    title: 'Level 2 EV Charger Installation',
    shortTitle: 'Level 2 Charger',
    h1: 'Level 2 EV Charger Installation in Los Angeles',
    description:
      'Level 2 (240V) home charging installation in Los Angeles and the San Fernando Valley—faster daily charging, transparent pricing, and support from quote to permit.',
    targetKeyword: 'level 2 ev charger installation los angeles',
    minPrice: 750,
    maxPrice: 1800,
    intro:
      'Level 2 charging uses a 240V dedicated circuit to deliver many times the speed of a standard wall outlet—what most EV owners need for daily driving. We install the right amperage, breaker, and wiring for your home and charger, whether you already own hardware or are still shopping.',
    localAngle:
      'LADWP, BWP, GWP, PWP, and SCE each have different rebate forms and service rules. We keep installs aligned with your utility so you are not paying twice for rework or missed paperwork.',
    panelAngle:
      '“Level 2” only performs as expected when your main service and panel have headroom. We treat every job as a capacity check, not a race to mount hardware.',
    processBody:
      'Share your home’s location and panel photo. We match you with a pro who names the circuit size, expected permit, and a price range. After approval, the crew runs cable, sets the breaker, and labels the new circuit to code.',
    upgradeBody:
      'If your home needs a panel or service upgrade to add Level 2 safely, you hear it during the first estimate—then we can route you to EV-specific panel service pages, not a random electrical menu.',
    featuredCitySlug: 'ev-charger-installation-van-nuys',
    featuredCityName: 'Van Nuys',
    highlights: [
      'Brand-agnostic advice when you are choosing between major chargers',
      'Realistic price bands before you sign with a shop',
      'Emphasis on safe capacity for overnight and daily use',
    ],
    faqs: [
      {
        question: 'How much does Level 2 EV charger installation cost?',
        answer:
          'Many installs in greater Los Angeles fall between $750 and $1,800 before rebates, depending on charger type, run length, and panel condition.',
      },
      {
        question: 'How fast is a Level 2 charger compared with Level 1?',
        answer:
          'Level 2 typically adds roughly 20–30+ miles of range per hour, versus a few miles per hour on 120V—enough to refill most daily drives overnight.',
      },
      {
        question: 'Do I need a 200-amp panel for Level 2 charging?',
        answer:
          'Not always, but 100A and 150A homes often need an upgrade, sub-feed, or load management. Your electrician confirms with a load calculation.',
      },
    ],
    relatedSlugs: ['tesla-wall-connector', '240v-outlet', 'garage-ev-charger'],
  },
  {
    slug: 'garage-ev-charger',
    category: 'ev',
    title: 'Garage EV Charger Installation',
    shortTitle: 'Garage EV Charger',
    h1: 'Garage EV Charger Installation in Los Angeles',
    description:
      'Garage EV charger installation with clean conduit runs, smart placement, and support for attached and detached garage layouts in Valley homes.',
    targetKeyword: 'garage ev charger install near me',
    minPrice: 750,
    maxPrice: 1600,
    intro:
      'The garage is where most home charging happens. We plan mounting height, cord reach, and the shortest code-compliant path to your panel so you are not tripping on cables or overpaying for unnecessary wire length.',
    localAngle:
      'Valley lots include attached one-car garages, side-load spaces, and detached structures common in Burbank, Pasadena, and North Hollywood. We price for your actual path—not a theoretical short run.',
    panelAngle:
      'A distant garage or sub-panel can reveal that your main service is too small. We plan for that before drywall repair or paint—so the charger location does not outrun your capacity.',
    processBody:
      'We review where you park, where the main panel lives, and whether a sub-panel already feeds the garage. The proposal lists conduit, straps, and finish expectations so there are no surprises at completion.',
    upgradeBody:
      'When a detached garage needs its own sub-panel or heavier feeder, we break out that work alongside the EV circuit—so you get one project plan for a garage that is truly EV-ready.',
    featuredCitySlug: 'ev-charger-installation-pasadena',
    featuredCityName: 'Pasadena',
    highlights: [
      'Layout-friendly mounting for one- and two-car spaces',
      'Options for NEMA 14-50 or hardwire based on your charger and code',
      'Upfront look at when a sub-panel is smarter than a long homerun',
    ],
    faqs: [
      {
        question: 'Can you install an EV charger in a detached garage?',
        answer:
          'Yes. Detached garages may need trenching, a larger feed, or a local sub-panel. We quote the full path, not just the last ten feet to the wall.',
      },
      {
        question: 'What is the best location inside a garage for a charger?',
        answer:
          'Ideally on the same side you park, with the cord reaching the charge port without blocking doors—while keeping clearances, ventilation, and panel access per code.',
      },
      {
        question: 'Does a garage EV charger always need hardwiring?',
        answer:
          'No. Some setups use a NEMA 14-50. Hardwiring is often better for high daily mileage and for outdoor-adjacent walls where a corded setup is a trip hazard.',
      },
    ],
    relatedSlugs: ['level-2-charger', '240v-outlet', 'sub-panel-installation'],
  },
  {
    slug: 'outdoor-ev-charger',
    category: 'ev',
    title: 'Outdoor EV Charger Installation',
    shortTitle: 'Outdoor EV Charger',
    h1: 'Outdoor EV Charger Installation in Los Angeles',
    description:
      'Weather-smart outdoor EV charger installation—proper NEMA ratings, secure mounting, and code-compliant routing for driveways and exterior walls.',
    targetKeyword: 'outdoor ev charger installation los angeles',
    minPrice: 900,
    maxPrice: 2200,
    intro:
      'Outdoor charging works when the install accounts for weather, sun, and physical protection. We select raintight fittings, correct wire types, and mounting that keeps your cable off the ground and your family safe.',
    localAngle:
      'Steep driveways, narrow side yards, and hillside lots from Studio City to La Cañada are common in our service area. We measure your real path and quote for slope, distance, and finishes.',
    panelAngle:
      'Outdoor runs often cost more in wire and labor—which is when homeowners learn their panel is maxed. We pair exterior scope with an honest service-size conversation so you are not surprised mid-project.',
    processBody:
      'We confirm the best wall or post location, grounding method, and whether a disconnect is required. Your written scope includes conduit, strap spacing, and who handles stucco or stucco repair expectations.',
    upgradeBody:
      'If the run length or new load pushes you past a safe 100A service, we schedule panel or service work as part of an EV-first plan—not as a separate mystery ticket.',
    featuredCitySlug: 'ev-charger-installation-la-canada-altadena',
    featuredCityName: 'La Cañada Flintridge & Altadena',
    highlights: [
      'Exterior-rated hardware and wiring methods for California exposure',
      'Clearances and working space planned for inspection and maintenance',
      'Transparent handling of longer runs and tougher wall surfaces',
    ],
    faqs: [
      {
        question: 'Can an EV charger be installed outside?',
        answer:
          'Yes, with listed equipment, proper protection from direct spray, and wiring suitable for wet or damp locations where required by code.',
      },
      {
        question: 'Does outdoor EV charger installation cost more?',
        answer:
          'Often yes—longer conduit, weatherproof gear, and wall or post work add labor and material. Your estimate should itemize those differences.',
      },
      {
        question: 'Are permits required for outdoor chargers?',
        answer:
          'Usually for new 240V branch circuits. City vs. county authority depends on your address; we help identify the right department.',
      },
    ],
    relatedSlugs: ['garage-ev-charger', 'permit-inspection', 'main-service-panel'],
  },
  {
    slug: '240v-outlet',
    category: 'ev',
    title: '240V Outlet for EV Charging',
    shortTitle: '240V Outlet',
    h1: '240V Outlet Installation for EV Charging in Los Angeles',
    description:
      'Dedicated 240V outlet installation for plug-in EV chargers—NEMA 14-50 and other configurations with correct breaker sizing and grounded circuits.',
    targetKeyword: '240v outlet installation ev car los angeles',
    minPrice: 500,
    maxPrice: 1400,
    intro:
      'A 240V outlet is often the simplest way to run a plug-in Level 2 charger—if your panel has space and amperage. We install the right breaker, wire gauge, and outlet type so you are not relying on an extension cord or an overloaded circuit.',
    localAngle:
      'Post-war Valley homes frequently have full panels or fuse challenges. We photograph the label, count spaces, and confirm grounded service before quoting a “simple” outlet job.',
    panelAngle:
      'Many outlet jobs turn into panel conversations: no spare poles, aluminum feeders, or 100A mains. We tell you before you buy the charger, not after the first cut-in.',
    processBody:
      'You upload a clear panel photo and your charging plans. We specify NEMA type, circuit ampacity, and whether your jurisdiction wants a permit. After approval, installation is typically a same-day or next-visit job when materials are on hand.',
    upgradeBody:
      'If the panel cannot take another 2-pole breaker, we walk you through tandem limitations, sub-panel options, or an EV-triggered upgrade—your call, with numbers attached.',
    featuredCitySlug: 'ev-charger-installation-tujunga',
    featuredCityName: 'Tujunga & Sunland',
    highlights: [
      'Correct NEMA configuration for your charger cord and vehicle',
      'Breaker and wire sized for continuous EV load',
      'Straight talk when the job is bigger than an outlet',
    ],
    faqs: [
      {
        question: 'Is a 240V outlet enough for home EV charging?',
        answer:
          'For many drivers, yes—especially with a plug-in Level 2 unit. Daily miles, vehicle max draw, and panel capacity still need to match.',
      },
      {
        question: 'How much does a 240V outlet installation cost?',
        answer:
          'Most installs range from $500 to $1,400, before factoring panel work, long runs, or utility-specific requirements.',
      },
      {
        question: 'What is a NEMA 14-50 outlet?',
        answer:
          'A common 240V 50A-style receptacle used by many plug-in EV chargers. Your vehicle and charger cord determine the right NEMA pairing—do not guess from a forum post.',
      },
    ],
    relatedSlugs: ['level-2-charger', 'nema-14-50-outlet', 'ev-ready-panel'],
  },
  {
    slug: 'permit-inspection',
    category: 'ev',
    title: 'EV Charger Permit & Inspection',
    shortTitle: 'Permit & Inspection',
    h1: 'EV Charger Permit and Inspection in Los Angeles',
    description:
      'Understand EV charger permits and inspections in your area—what to file, who inspects, and how licensed work keeps your home insurable and compliant.',
    targetKeyword: 'ev charger permit los angeles',
    minPrice: 750,
    maxPrice: 1800,
    intro:
      'Permits exist to verify that new electrical load is installed safely. When you work with our network, pulling the right permit and passing inspection are part of the job—not an afterthought that voids your warranty or insurance.',
    localAngle:
      'Glendale, Burbank, Pasadena, LADWP territory, and SCE-served county pockets all have different counters and checklists. We route your project to pros who file in the correct jurisdiction.',
    panelAngle:
      'Inspectors look at the full path: breaker, wire, charger, and sometimes the panel’s ability to support the new load. If an upgrade is required, it is documented in the same permit family where applicable.',
    processBody:
      'Your contractor completes the application, posts the job card, and schedules rough or final inspection as required. You get copies of the permit and sign-off for your records—handy for resale and insurance.',
    upgradeBody:
      'If the authority having jurisdiction requires panel correction before approving a new EV circuit, we explain the finding and next steps in plain English, with EV charging as the reason for the work.',
    featuredCitySlug: 'ev-charger-installation-glendale',
    featuredCityName: 'Glendale',
    highlights: [
      'Permit-aware process from a licensed C-10 perspective',
      'Clarity on city vs. county and typical inspection expectations',
      'Documentation you can file with a home sale or insurer',
    ],
    faqs: [
      {
        question: 'Do I need a permit to install an EV charger in Los Angeles County?',
        answer:
          'Usually for new 240V circuits. The specific city or county building department can confirm; we handle filing where the job is in our scope.',
      },
      {
        question: 'Who handles the inspection for an EV charger install?',
        answer:
          'The local building department (or County DRP in unincorporated areas) sets inspection scheduling after the licensed contractor completes the work to code.',
      },
      {
        question: 'Can I skip the permit to save money?',
        answer:
          'We do not recommend it. Unpermitted work can create fire risk, void coverage, and complicate a home sale. The estimate should include proper permitting as part of safe installation.',
      },
    ],
    relatedSlugs: ['level-2-charger', 'outdoor-ev-charger', 'panel-upgrade'],
  },
  {
    slug: 'commercial',
    category: 'ev',
    title: 'Commercial EV Charger Installation',
    shortTitle: 'Commercial EV Charger',
    h1: 'Commercial EV Charger Installation in the San Fernando Valley',
    description:
      'Commercial and workplace EV charging—planning, installation coordination, and capacity upgrades for small retail, office, and multi-tenant properties.',
    targetKeyword: 'commercial ev charger install san fernando valley',
    minPrice: 2500,
    maxPrice: 12000,
    intro:
      'Workplace and retail EV charging is about availability, access control, and future load. We help scope 208V or 480V service, new feeders, and smart sharing so employees and customers get reliable charge sessions.',
    localAngle:
      'Van Nuys, North Hollywood, Encino, and Burbank have dense corridors of small commercial space. We align with your utility, landlord, and any tenant improvement rules before equipment ships.',
    panelAngle:
      'Commercial sites often outgrow a single charger fast. We plan for the second and third port now—so you are not ripping up asphalt twice for capacity that should have been staged.',
    processBody:
      'We start with a site walk or plans: service size, spare capacity, and parking layout. A licensed contractor delivers a design-build style proposal with a realistic timeline and permit path for your city.',
    upgradeBody:
      'When a commercial job needs a new sub-panel, switchgear, or service upgrade, we bundle EV load with other tenant loads when possible—one coordinated project, one inspection cycle where practical.',
    featuredCitySlug: 'ev-charger-installation-van-nuys',
    featuredCityName: 'Van Nuys',
    highlights: [
      'Multi-circuit and load-planning for shared parking',
      'Experience with stricter commercial inspection paths',
      'Higher-value projects with clear change-order discipline',
    ],
    faqs: [
      {
        question: 'How much does commercial EV charger installation cost?',
        answer:
          'Small business installs often start in the low thousands; multi-circuit and garage infrastructure projects scale with trenching, switchgear, and utility work.',
      },
      {
        question: 'Are rebates available for commercial chargers?',
        answer:
          'Some utilities offer business programs that change by year. We help you check current LADWP, BWP, GWP, PWP, or SCE business incentives when you plan the job.',
      },
      {
        question: 'Can existing panels support commercial EV charging?',
        answer:
          'Sometimes. Many sites need new feeders, a larger service, or a dedicated EV sub-panel. A load study tells the truth before you commit to port count.',
      },
    ],
    relatedSlugs: ['sub-panel-installation', 'ev-ready-panel', 'main-service-panel'],
  },
]

const panelServices: ServicePage[] = [
  {
    slug: 'panel-upgrade',
    category: 'panel',
    title: 'Electrical Panel Upgrade',
    shortTitle: 'Panel Upgrade',
    h1: 'Electrical Panel Upgrade for EV Charging in Los Angeles',
    description:
      'Electrical panel upgrades sized for home EV charging—more capacity, modern breakers, and a safe path to a dedicated Level 2 circuit.',
    targetKeyword: 'electrical panel upgrade los angeles',
    minPrice: 2000,
    maxPrice: 6000,
    intro:
      'A panel upgrade is often the unlock for reliable Level 2 charging at home. We replace or expand service equipment so a dedicated EV circuit is legal, inspectable, and built for daily use.',
    localAngle:
      'Housing from the 1940s through the 1990s across Glendale, Pasadena, Burbank, and the Valley still runs 100A or crowded panels. We focus on the EV use case, not a generic service menu.',
    panelAngle:
      'We never position panel work as a standalone upsell. The story is: your EV plan needs a safe, calculated amount of new load—and the panel is how you get it.',
    processBody:
      'A licensed electrician reviews your current service, grounding, and breaker layout. The proposal lists new panel size, utility coordination if needed, and a timeline. After install, the EV circuit can be scheduled on known-good capacity.',
    upgradeBody:
      'Local detail matters: city permit fees, dry utility rules, and whether you are in a wildland interface can affect the plan. We connect that nuance to your home’s real address—not a national template.',
    featuredCitySlug: 'ev-charger-installation-pasadena',
    featuredCityName: 'Pasadena',
    highlights: [
      'EV-driven load calcs, not “while we are here” add-ons',
      'Modern equipment with room for the next vehicle or kitchen load',
      'One narrative from charger lead to safe capacity',
    ],
    faqs: [
      {
        question: 'How much does an electrical panel upgrade cost in Los Angeles?',
        answer:
          'Many EV-related upgrades land between $2,000 and $6,000 depending on service amperage, equipment condition, and whether the utility has to change the meter or service lateral.',
      },
      {
        question: 'Why would an EV charger require a panel upgrade?',
        answer:
          'If there is not enough service capacity, breaker space, or modern grounding to add a 30A–50A continuous load, the main panel must be increased or replaced to meet code.',
      },
      {
        question: 'Can I install the charger first and upgrade later?',
        answer:
          'Only if the existing service is already calculated as safe. Most undersized services need correction before a new 240V EV circuit is energized.',
      },
    ],
    relatedSlugs: ['200-amp-upgrade', 'ev-ready-panel', 'panel-upgrade-cost'],
  },
  {
    slug: '200-amp-upgrade',
    category: 'panel',
    title: '200 Amp Panel Upgrade',
    shortTitle: '200 Amp Upgrade',
    h1: '200 Amp Panel Upgrade for EV Charging in Los Angeles',
    description:
      '200-amp electrical service and panel upgrades for EV-ready homes—room for today’s Level 2 load and tomorrow’s second EV or all-electric appliances.',
    targetKeyword: '200 amp panel upgrade cost los angeles',
    minPrice: 2500,
    maxPrice: 6500,
    intro:
      'A 200A main service is the most common “future-proof” step when a 100A or 150A panel cannot support a new 40A–50A EV circuit plus the rest of the house. We size the new service, coordinate with the utility, and keep your EV project on track.',
    localAngle:
      'Valley and foothill homes from Sherman Oaks to La Crescenta run the gamut of vintage mains and sub-standard grounding. We plan utility coordination early so your EV timeline does not slip.',
    panelAngle:
      'A 200A upgrade is not about selling steel—it is about giving your EV a dedicated, legal slice of total capacity with margin for the rest of modern life.',
    processBody:
      'The crew documents your meter configuration, main disconnect, and panel location. A quote covers equipment, labor, permit, and known utility steps. You approve before the service change is requested.',
    upgradeBody:
      'Where AHJs require seismic strapping, mast repair, or grounding upgrades, we list those in the same EV-focused scope so the job passes inspection the first time.',
    featuredCitySlug: 'ev-charger-installation-burbank',
    featuredCityName: 'Burbank',
    highlights: [
      'Clear line-item for utility vs. in-panel labor',
      'Honest go/no-go for whether 200A is enough for your goals',
      'Tie-back to the charger and circuit you wanted from day one',
    ],
    faqs: [
      {
        question: 'Do I need a 200-amp panel for a home EV charger?',
        answer:
          'Not every home, but it is a strong fit when you are at 100A/125A, adding major load, or planning two EVs. A load calc decides.',
      },
      {
        question: 'What affects 200-amp panel upgrade cost?',
        answer:
          'Service entrance condition, main disconnect replacement, wire length, trenching, and whether the utility requires a new service drop or meter work.',
      },
      {
        question: 'Is a 200-amp upgrade worth it if I only have one EV?',
        answer:
          'Often yes—if you are already at capacity or plan kitchen remodels, A/C, or a second vehicle within the home’s life cycle.',
      },
    ],
    relatedSlugs: ['panel-upgrade', 'main-service-panel', 'panel-upgrade-cost'],
  },
  {
    slug: 'panel-modernization',
    category: 'panel',
    title: 'Panel Modernization (FPE / Zinsco)',
    shortTitle: 'Panel Modernization',
    h1: 'Panel Modernization for FPE and Zinsco Panels in Los Angeles',
    description:
      'Replace Federal Pacific, Zinsco, and other obsolete panels—especially when you are adding EV load that legacy equipment cannot carry safely.',
    targetKeyword: 'FPE stab-lok panel replacement los angeles',
    minPrice: 2500,
    maxPrice: 7000,
    intro:
      'Obsolete breakers and bus bars were never meant for 40A+ continuous EV loads. When you want reliable Level 2 charging, a modern panel with listed breakers is often non-negotiable for safety and insurance.',
    localAngle:
      'Foothill and post-war tracts in Tujunga, Sunland, and North Hollywood frequently still have FPE, Zinsco, or similar vintage gear. We treat replacement as a safety-first, EV-timed project.',
    panelAngle:
      'The EV “why now” is simple: a new charger is the first time a homeowner runs sustained load for hours on a bus that was already a known failure mode.',
    processBody:
      'We identify the manufacturer, available spaces, and grounding path. The proposal replaces with modern equipment, AFCI where required, and a clean load schedule that includes the EV branch.',
    upgradeBody:
      'We explain how this differs from a straight capacity bump—some homes need 200A at the same time. You see both on paper before choosing next steps.',
    featuredCitySlug: 'ev-charger-installation-tujunga',
    featuredCityName: 'Tujunga & Sunland',
    highlights: [
      'Safety case tied to your EV project, not a scare tactic',
      'Code-current equipment with labeled circuits',
      'Documentation for home sale and underwriter questions',
    ],
    faqs: [
      {
        question: 'Why is an FPE or Zinsco panel a problem for EV charging?',
        answer:
          'These designs have documented failure rates under load. Sustained EV current can stress a compromised bus or breaker in ways a toaster never would.',
      },
      {
        question: 'Does replacing an old panel increase home charging reliability?',
        answer:
          'Yes—modern, listed equipment and proper overcurrent protection reduce nuisance trips and fire risk, especially with daily L2 use.',
      },
      {
        question: 'Can a legacy panel pass EV charger inspection?',
        answer:
          'Some AHJs will fail unsafe gear outright. It is wiser to replace known obsolete equipment as part of the EV project before drywall is closed.',
      },
    ],
    relatedSlugs: ['panel-upgrade', 'main-service-panel', 'ev-ready-panel'],
  },
  {
    slug: 'sub-panel-installation',
    category: 'panel',
    title: 'Sub-Panel Installation',
    shortTitle: 'Sub-Panel Installation',
    h1: 'Sub-Panel Installation for EV Charging in Los Angeles',
    description:
      'Sub-panels for detached garages, ADUs, and long runs—distribute power cleanly so your EV charger is fed safely from a known capacity.',
    targetKeyword: 'sub panel installation for ev charger los angeles',
    minPrice: 1200,
    maxPrice: 3500,
    intro:
      'A sub-panel brings breakers and capacity closer to where you charge. It is a smart middle step when the main is far but your total service is still big enough to feed a new load.',
    localAngle:
      'Detached garages, pool houses, and rear ADUs in Northridge, Chatsworth, and Woodland-adjacent lots are classic sub-panel territory. We price feeder, conduit, and ground paths together.',
    panelAngle:
      'Sub-panels are not a workaround for a 60A main—but they are the right tool when the main has capacity and distance is the real problem for your EV run.',
    processBody:
      'We calculate feeder size, voltage drop, and whether the existing main has spare ampacity. The quote names the new panel location, disconnect rules, and how many open poles remain for the EV breaker.',
    upgradeBody:
      'If a sub is impossible without a main upgrade, you see that in the first calc—not after the first trench is open.',
    featuredCitySlug: 'ev-charger-installation-northridge',
    featuredCityName: 'Northridge',
    highlights: [
      'Designed around your parking and panel locations',
      'Honest about when a sub is cheaper than a long homerun',
      'Scalable if you add a second port later on the sub',
    ],
    faqs: [
      {
        question: 'Do I need a sub-panel for my EV charger?',
        answer:
          'Not always. It is common for detached buildings or long runs. If the main panel is nearby with space, a direct circuit may be enough.',
      },
      {
        question: 'Is a sub-panel cheaper than a full panel upgrade?',
        answer:
          'It can be, but only if your main service already has spare capacity. The feeder and installation still have a real cost.',
      },
      {
        question: 'Can a sub-panel make garage charger installation easier?',
        answer:
          'Yes. Local breakers near the garage can shorten runs, cut voltage drop, and make future work simpler.',
      },
    ],
    relatedSlugs: ['garage-ev-charger', 'main-service-panel', 'ev-ready-panel'],
  },
  {
    slug: 'main-service-panel',
    category: 'panel',
    title: 'Main Service Panel Replacement',
    shortTitle: 'Main Service Panel',
    h1: 'Main Service Panel Replacement for EV Charging in Los Angeles',
    description:
      'Main service and meter-main replacement for homes that need new equipment before a Level 2 EV circuit can be safely installed.',
    targetKeyword: 'main electrical panel replacement glendale',
    minPrice: 2500,
    maxPrice: 7000,
    intro:
      'Sometimes the main disconnect, meter socket, and service entrance—not just the branch breakers—are the blockers to EV load. We replace service equipment in coordination with the utility and your local inspector.',
    localAngle:
      'Older Glendale, Burbank, and Valley homes still have split-buss, crowded mains, and rusted service heads. We map weather exposure and grounding before quoting.',
    panelAngle:
      'The EV angle stays front and center: you are not “buying a new panel for fun,” you are making the service legal and sized for a charger the inspector will pass.',
    processBody:
      'A licensed electrical contractor details scope: service size, new main breaker, bond/ground, and any mast or riser work. The utility is notified for meter pulls or re-energization on schedule.',
    upgradeBody:
      'We keep permit packets EV-specific where possible: new calculated load, EV circuit mark-up, and why the main had to be replaced to support that load at all.',
    featuredCitySlug: 'ev-charger-installation-glendale',
    featuredCityName: 'Glendale',
    highlights: [
      'Service entrance work scoped with utility coordination in mind',
      'No mystery “electrical” package divorced from the charger you want',
      'Documentation for future solar or second EV pre-wiring',
    ],
    faqs: [
      {
        question: 'When does an EV charger quote lead to full panel replacement?',
        answer:
          'When the main disconnect is obsolete, the meter/main is a single point of failure, or total service is below what the new EV branch plus baseload requires.',
      },
      {
        question: 'How much does main service panel replacement cost?',
        answer:
          'Many EV-timed replacements run $2,500–$7,000 depending on service size, utility requirements, and whether riser or grounding must be modernized.',
      },
      {
        question: 'Does panel replacement include permits and inspection?',
        answer:
          'Yes—expect permits for service changes, plus inspection of the new main and grounding. A licensed C-10 handles that path.',
      },
    ],
    relatedSlugs: ['panel-upgrade', '200-amp-upgrade', 'permit-inspection'],
  },
  {
    slug: 'ev-ready-panel',
    category: 'panel',
    title: 'EV-Ready Panel Upgrade',
    shortTitle: 'EV-Ready Panel',
    h1: 'EV-Ready Panel Upgrade in Los Angeles',
    description:
      '“EV-ready” panel planning—enough space and capacity to add a Level 2 circuit now or on your next car without a second round of service work.',
    targetKeyword: 'ev ready panel upgrade los angeles',
    minPrice: 1800,
    maxPrice: 5000,
    intro:
      'EV readiness means the panel has the breaker space, bus rating, and service size to add a 40A–50A home charger now—or pre-wire for a future one—without a surprise redesign.',
    localAngle:
      'Housing in Encino, Sherman Oaks, and North Hollywood spans split-levels, ranch, and 1980s two-stories, each with different original service sizes. We plan for the house you have, not a blueprint generic.',
    panelAngle:
      'We treat the panel as the infrastructure for your EV, heat pump, and kitchen next decade—not a one-off part swap with no room to grow.',
    processBody:
      'We run through current loads, your EV model plans, and whether you want a blank EV breaker slot, full homerun, or just oversized conduit. The proposal matches rebate language where it applies in your area.',
    upgradeBody:
      'Rebate programs in some cities reward “EV-ready” rough-in. We can align the scope to program definitions when you are in an eligible service territory.',
    featuredCitySlug: 'ev-charger-installation-encino',
    featuredCityName: 'Encino',
    highlights: [
      'Space planning for a second driver or a future all-electric kitchen',
      'Clarity on “empty breaker” vs. true spare capacity in amps',
      'Pairs with NEMA, hardwire, or load-managed installs',
    ],
    faqs: [
      {
        question: 'What makes a panel EV-ready?',
        answer:
          'Adequate main service capacity, free breaker spaces, a labeled load calculation, and—often—a dedicated path stubbed to the future charger location.',
      },
      {
        question: 'Is an EV-ready panel upgrade different from a normal panel upgrade?',
        answer:
          'The gear may be similar, but the design intent is: reserve capacity and access for a defined EV load on a timeline you can live with.',
      },
      {
        question: 'Should I upgrade my panel before buying a charger?',
        answer:
          'If your home is 100A or the panel is full, yes—sequence planning avoids paying for two mobilizations and keeps your new car off slow charging.',
      },
    ],
    relatedSlugs: ['panel-upgrade', '200-amp-upgrade', '240v-outlet'],
  },
  {
    slug: 'nema-14-50-outlet',
    category: 'panel',
    title: 'NEMA 14-50 Outlet Installation',
    shortTitle: 'NEMA 14-50 Outlet',
    h1: 'NEMA 14-50 Outlet Installation for EV Charging in Los Angeles',
    description:
      'NEMA 14-50 and compatible 240V outlet installs for EV drivers—done with correct amperage, GFCI where required, and a panel that can handle the new circuit.',
    targetKeyword: 'nema 14-50 outlet installation los angeles',
    minPrice: 500,
    maxPrice: 1500,
    intro:
      'The NEMA 14-50 is a household name in EV threads—because it matches many mobile connectors and mid-tier chargers. We install it on the right wire and breaker, grounded and torqued, with your AHJ in mind (including 2020 NEC GFCI for garage outlets in many jurisdictions).',
    localAngle:
      'Garage shops and granny units across the Valley are full of 100A mains and shared sub-feeds. We check whether your 14-50 is even legal on your bus before you buy another cord.',
    panelAngle:
      'The outlet is the visible part; the panel tells the real story. If the story is “no room,” you find out in the same estimate, not the night you plug in.',
    processBody:
      'We confirm cord length, EV max draw, and local GFCI and disconnect rules. After installation, you get a test on load and a labeled circuit that matches the permit.',
    upgradeBody:
      'If the 14-50 plan fails the math, we pivot to a hardwire, smaller continuous load, or a main upgrade without losing the EV timeline.',
    featuredCitySlug: 'ev-charger-installation-burbank',
    featuredCityName: 'Burbank',
    highlights: [
      'Precise NEMA and breaker pairing to your equipment',
      'Transparent handling of 2020 NEC–style GFCI costs where they apply',
      'Natural bridge to full panel work when the outlet is not enough',
    ],
    faqs: [
      {
        question: 'What is a NEMA 14-50 outlet for EV charging?',
        answer:
          'A 240V four-wire receptacle commonly used for 40A continuous loads on 50A breakers, subject to the charger’s own instructions and local code.',
      },
      {
        question: 'Is a NEMA 14-50 outlet cheaper than hardwiring a charger?',
        answer:
          'Sometimes—unless GFCI, long runs, or a panel upgrade are required. Compare total installed cost, not just the price of a receptacle.',
      },
      {
        question: 'Do I still need panel work for a NEMA 14-50 outlet?',
        answer:
          'If you lack breaker space, grounded neutral path, or total ampacity, yes. A licensed electrician will document what is missing before install.',
      },
    ],
    relatedSlugs: ['240v-outlet', 'level-2-charger', 'panel-upgrade'],
  },
  {
    slug: 'panel-upgrade-cost',
    category: 'panel',
    title: 'Panel Upgrade Cost Guide',
    shortTitle: 'Panel Upgrade Cost',
    h1: 'Panel Upgrade Cost Guide for EV Charging in Los Angeles',
    description:
      'Realistic panel upgrade cost ranges for Los Angeles and Valley EV projects—what drives price, what is fixed vs. variable, and how to budget before you order a charger.',
    targetKeyword: 'how much does panel upgrade cost los angeles',
    minPrice: 2000,
    maxPrice: 7000,
    intro:
      'Most EV-minded panel upgrades in our area land between a few thousand and the mid-thousands, depending on service size, utility involvement, and how much of the service entrance must be modernized. We use EV load as the “why” so you are not overbuying for generic electrical marketing.',
    localAngle:
      'Pasadena, Burbank, and unincorporated island pockets can see different permit fees, fire setback rules, and dry utility response times. That affects calendar as much as dollars.',
    panelAngle:
      'Every number we publish ties back: you are not pricing “an electrician’s truck roll,” you are pricing safe capacity to run a 40A+ charger and keep the rest of the house on.',
    processBody:
      'The guide pairs with a photo-based estimate. Upload a panel image and the loads you know—EV model, A/C, cooking fuel—and a pro responds with a bracket that means something.',
    upgradeBody:
      'When your bracket overlaps utility upgrades (new drop, new meter socket, mast), we call those out as separate line items with typical ranges, not a single vague total.',
    featuredCitySlug: 'ev-charger-installation-pasadena',
    featuredCityName: 'Pasadena',
    highlights: [
      'Transparent bands instead of a fake single price',
      'EV-first framing, not a generic electrical catalog',
      'Clear call to a written estimate for your home',
    ],
    faqs: [
      {
        question: 'How much does a panel upgrade cost in Los Angeles?',
        answer:
          'Typical EV-timed work often falls in the low- to mid-thousands, with more complex service entrance projects reaching higher—especially with utility coordination or trenching.',
      },
      {
        question: 'Why does EV charging increase panel upgrade cost?',
        answer:
          'A dedicated 240V EV circuit is a new continuous load. If the service, bus, or breakers are already at their limit, the project grows to include a larger or new main and grounding.',
      },
      {
        question: 'Can I get a panel upgrade estimate without an on-site visit?',
        answer:
          'A clear main-panel photo, service size from the label, and a short load questionnaire often produce a useful initial range, with a site visit to finalize.',
      },
    ],
    relatedSlugs: ['panel-upgrade', '200-amp-upgrade', 'permit-inspection'],
  },
]

export const services = [...evServices, ...panelServices]

export const serviceGroups = {
  ev: evServices,
  panel: panelServices,
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function getServicePath(service: ServicePage) {
  return service.category === 'ev'
    ? `/ev-charger-installation/${service.slug}`
    : `/electrical-panel-services/${service.slug}`
}

