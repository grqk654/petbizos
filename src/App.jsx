import { useState, useEffect } from 'react'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:          '#faf9f6',
  bgWhite:     '#ffffff',
  bgWarm:      '#fff8f0',
  bgSection:   '#f4f2ee',
  amber:       '#BA7517',
  amberDark:   '#854F0B',
  amberLight:  '#FAEEDA',
  amberBorder: '#F5C878',
  blue:        '#185FA5',
  blueDark:    '#0C447C',
  blueLight:   '#E6F1FB',
  blueBorder:  '#B5D4F4',
  green:       '#3B6D11',
  greenLight:  '#EAF3DE',
  red:         '#A32D2D',
  redLight:    '#FCEBEB',
  text:        '#1a1a14',
  textDim:     '#5a5a4a',
  textMuted:   '#9a9a8a',
  border:      '#e8e4dc',
  borderDark:  '#d4cfc5',
  shadow:      '0 2px 12px rgba(26,26,20,0.08)',
  shadowSm:    '0 1px 4px rgba(26,26,20,0.06)',
}

const F = {
  display: "'Fraunces', serif",
  body:    "'DM Sans', sans-serif",
  mono:    "'DM Mono', monospace",
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const Logo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill={C.bgWarm}/>
    <circle cx="16" cy="16" r="12" fill="none" stroke={C.amber} strokeWidth="2"/>
    <path d="M11 18.5 C11 13.5 21 13.5 21 18.5" stroke={C.amber} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="12.5" cy="14.5" r="1.5" fill={C.amber}/>
    <circle cx="19.5" cy="14.5" r="1.5" fill={C.amber}/>
  </svg>
)

const Tag = ({ children, color = 'amber' }) => {
  const colors = {
    amber: { bg: C.amberLight, text: C.amberDark, border: C.amberBorder },
    blue:  { bg: C.blueLight,  text: C.blueDark,  border: C.blueBorder },
    green: { bg: C.greenLight, text: C.green,      border: '#C0DD97' },
    gray:  { bg: C.bgSection,  text: C.textDim,   border: C.border },
  }
  const s = colors[color] || colors.amber
  return (
    <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: s.text, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 20, padding: '3px 10px', display: 'inline-block' }}>
      {children}
    </span>
  )
}

const Card = ({ children, style, hover }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{ background: C.bgWhite, border: `1px solid ${hov ? C.borderDark : C.border}`, borderRadius: 14, padding: 24, boxShadow: hov ? C.shadow : C.shadowSm, transition: 'all 0.2s', cursor: hover ? 'pointer' : 'default', ...style }}>
      {children}
    </div>
  )
}

const SliderRow = ({ label, value, min, max, step = 1, onChange, format, minLabel, maxLabel }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
      <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim }}>{label}</label>
      <span style={{ fontFamily: F.mono, fontSize: 14, color: C.amber, fontWeight: 500 }}>{format ? format(value) : value}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
      style={{ width: '100%', accentColor: C.amber, cursor: 'pointer' }} />
    {(minLabel || maxLabel) && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{minLabel}</span>
        <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{maxLabel}</span>
      </div>
    )}
  </div>
)

const SelectRow = ({ label, value, options, onChange }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: '100%', background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontFamily: F.body, fontSize: 14, color: C.text, cursor: 'pointer', outline: 'none' }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
)

const Stat = ({ label, value, sub, accent }) => (
  <div style={{ background: accent ? C.blueLight : C.bgSection, border: `1px solid ${accent ? C.blueBorder : C.border}`, borderRadius: 12, padding: '18px 20px', textAlign: 'center' }}>
    <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
    <div style={{ fontFamily: F.mono, fontSize: 26, fontWeight: 500, color: accent ? C.blue : C.text, lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted, marginTop: 5 }}>{sub}</div>}
  </div>
)

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 14, marginBottom: 14 }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
        <span style={{ fontFamily: F.body, fontSize: 15, color: C.text, fontWeight: 500 }}>{q}</span>
        <span style={{ fontFamily: F.mono, color: C.amber, marginLeft: 12, fontSize: 18 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, lineHeight: 1.7, marginTop: 10, marginBottom: 0 }}>{a}</p>}
    </div>
  )
}

const AffiliateCTA = ({ title, desc, links }) => (
  <div style={{ background: C.blueLight, border: `1px solid ${C.blueBorder}`, borderRadius: 12, padding: 20, marginTop: 24 }}>
    <div style={{ fontFamily: F.mono, fontSize: 10, color: C.blue, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{title || 'Recommended'}</div>
    <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 14, lineHeight: 1.5 }}>{desc}</p>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {(links || []).map(l => (
        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: F.mono, fontSize: 12, color: C.blue, border: `1px solid ${C.blueBorder}`, borderRadius: 6, padding: '6px 14px', textDecoration: 'none', background: C.bgWhite }}>
          {l.name} →
        </a>
      ))}
    </div>
  </div>
)

const ToolCTA = ({ setPage }) => (
  <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginTop: 28, textAlign: 'center' }}>
    <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 12 }}>Run the numbers for your own dog</p>
    <button onClick={() => setPage('tools')}
      style={{ fontFamily: F.mono, fontSize: 13, color: C.bgWhite, background: C.amber, border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 500 }}>
      Open Free Calculators →
    </button>
  </div>
)

const fmt$ = v => '$' + Math.round(v).toLocaleString()

// ─── PROVIDER DATA ────────────────────────────────────────────────────────────
const neighborhoods = ['DUMBO / Brooklyn Heights','Williamsburg','Greenpoint','Park Slope','Carroll Gardens','Bushwick','Fort Greene','Bed-Stuy','Prospect Heights','Kensington','Sunset Park']
const categories = ['Trainers','Daycare','Dog Walkers','Groomers','Boarding']

// ─── URL SLUG MAPS ────────────────────────────────────────────────────────────
const catSlugMap = {
  'trainers':    'Trainers',
  'daycare':     'Daycare',
  'dog-walkers': 'Dog Walkers',
  'groomers':    'Groomers',
  'boarding':    'Boarding',
  'vets':        'Vets',
}
const hoodSlugMap = {
  'dumbo-brooklyn-heights': 'DUMBO / Brooklyn Heights',
  'williamsburg':           'Williamsburg',
  'greenpoint':             'Greenpoint',
  'park-slope':             'Park Slope',
  'carroll-gardens':        'Carroll Gardens',
  'bushwick':               'Bushwick',
  'fort-greene':            'Fort Greene',
  'bed-stuy':               'Bed-Stuy',
  'prospect-heights':       'Prospect Heights',
  'kensington':             'Kensington',
  'sunset-park':            'Sunset Park',
}
const catToSlug = Object.fromEntries(Object.entries(catSlugMap).map(([s,c]) => [c,s]))
const hoodToSlug = Object.fromEntries(Object.entries(hoodSlugMap).map(([s,h]) => [h,s]))

const catSEO = {
  'Trainers':    { h1: 'Dog Trainers in Brooklyn, NYC', desc: 'Find the best dog trainers in Brooklyn. Positive reinforcement, puppy classes, private sessions and more — all verified Brooklyn businesses.' },
  'Daycare':     { h1: 'Dog Daycare in Brooklyn, NYC', desc: 'Browse top-rated dog daycare centers in Brooklyn. Full-day play, socialization, and drop-in options across all neighborhoods.' },
  'Dog Walkers': { h1: 'Dog Walkers in Brooklyn, NYC', desc: 'Find trusted dog walkers in Brooklyn. Solo walks, group walks, GPS-tracked and insured — serving Williamsburg, Park Slope, Greenpoint and more.' },
  'Groomers':    { h1: 'Dog Groomers in Brooklyn, NYC', desc: 'Book a dog groomer in Brooklyn. Full-service grooming, mobile options, and breed specialists across Brooklyn neighborhoods.' },
  'Boarding':    { h1: 'Dog Boarding in Brooklyn, NYC', desc: 'Find dog boarding in Brooklyn. In-home boarding, private suites, and kennels — all verified Brooklyn pet businesses.' },
  'Vets':        { h1: 'Vets & Animal Clinics in Brooklyn, NYC', desc: 'Find a vet in Brooklyn. Full-service animal hospitals, wellness clinics, and urgent care for dogs and cats across Brooklyn.' },
}
const hoodSEO = (hood) => ({
  h1: `Pet Services in ${hood}, Brooklyn`,
  desc: `Find dog trainers, walkers, groomers, daycare, and boarding in ${hood}, Brooklyn. Verified local pet service providers.`,
})

const providers = [
  { id:1, name:'Dogboy NYC', category:'Trainers', neighborhood:'DUMBO / Brooklyn Heights', address:'362 Furman St, Brooklyn, NY 11201', rating:5.0, reviews:205, mobile:false, featured:true, desc:'Trainers serving DUMBO / Brooklyn Heights, Brooklyn.', phone:'', website:'http://www.dogboynyc.com/', booking:'https://www.dogboynyc.com/sign-up', tags:['Trainers', 'DUMBO / Brooklyn Heights'] },
  { id:2, name:'Pawmos Dog Training', category:'Trainers', neighborhood:'Park Slope', address:'121 5th Ave suite 117, Brooklyn, NY 11217', rating:5.0, reviews:157, mobile:false, featured:true, desc:'Trainers serving Park Slope, Brooklyn.', phone:'+1 917-557-9402', website:'http://www.pawmos.com/', booking:'', tags:['Trainers', 'Park Slope'] },
  { id:3, name:'MindfulPups', category:'Trainers', neighborhood:'Carroll Gardens', address:'136 Union St, Brooklyn, NY 11231', rating:5.0, reviews:154, mobile:false, featured:true, desc:'Trainers serving Carroll Gardens, Brooklyn.', phone:'+1 917-650-3783', website:'http://www.mindful-pups.com/', booking:'', tags:['Trainers', 'Carroll Gardens'] },
  { id:4, name:'Hustle Pups NYC', category:'Trainers', neighborhood:'Greenpoint', address:'511 Porter Ave, Brooklyn, NY 11222', rating:5.0, reviews:131, mobile:false, featured:true, desc:'Trainers serving Greenpoint, Brooklyn.', phone:'+1 929-284-1918', website:'http://hustlepupsnyc.com/', booking:'', tags:['Trainers', 'Greenpoint'] },
  { id:5, name:'KIBA K9s | World-Class Dog Training', category:'Trainers', neighborhood:'Bushwick', address:'209 Malcolm X Blvd, Brooklyn, NY 11221', rating:5.0, reviews:108, mobile:false, featured:true, desc:'Trainers serving Bushwick, Brooklyn.', phone:'+1 347-460-8442', website:'http://www.kibak9s.com/', booking:'', tags:['Trainers', 'Bushwick'] },
  { id:6, name:'JoJo & Co Pet Club', category:'Daycare', neighborhood:'Greenpoint', address:'6 Bell Slip, Brooklyn, NY 11222', rating:5.0, reviews:100, mobile:false, featured:true, desc:'Daycare serving Greenpoint, Brooklyn.', phone:'+1 646-404-2452', website:'http://jojopetclub.com/', booking:'https://app.squareup.com/appointments/book/mjc4bnp2dwvk97/LMWJQFXN2WHGP/start?rwg_token=AFd1xnEGElDhu0ARBNIxHEJTtog5DbtlasObd24Nvynkv7eydI4Hh3hpi3OksaQRYB8AlaFQmTSd2DPVWfZaPdLiD-PZWOiHPbM_IxkVEfJ_Inofefmeuuw%3D', tags:['Daycare', 'Greenpoint'] },
  { id:7, name:'NYC Doggystyle', category:'Dog Walkers', neighborhood:'Greenpoint', address:'81 Greenpoint Ave, Brooklyn, NY 11222', rating:5.0, reviews:96, mobile:false, featured:true, desc:'Dog Walkers serving Greenpoint, Brooklyn.', phone:'+1 347-824-5885', website:'http://www.nycdoggystyle.com/', booking:'', tags:['Dog Walkers', 'Greenpoint'] },
  { id:8, name:'Hounds Town - Brooklyn - Atlantic Ave', category:'Daycare', neighborhood:'Prospect Heights', address:'545 Vanderbilt Ave, Brooklyn, NY 11238', rating:5.0, reviews:68, mobile:false, featured:true, desc:'Daycare serving Prospect Heights, Brooklyn.', phone:'+1 929-730-7877', website:'https://houndstownusa.com/locations/brooklyn-atlantic-ave/%3Futm_source%3Dgoogle%26utm_medium%3Dmap%26utm_id%3Dbrooklyn-atlantice-ave', booking:'https://www.mytime.com/express_checkout/142672/157967?rwg_token=AFd1xnEavnMleiW34kbyKk89LdkEXIC6xocYF_Z83AMFDmJxo4zwSSQhH1-prBnKD-Inn9VI6lwxXzqn65wSAygrapBo63p15YMmXzqidEK3XUexHbe7v2o%3D', tags:['Daycare', 'Prospect Heights'] },
  { id:9, name:'Dog Park Grooming & Daycare - Professional Dog Grooming & Daycare Services', category:'Groomers', neighborhood:'Greenpoint', address:'89 Driggs Ave, Brooklyn, NY 11222', rating:5.0, reviews:68, mobile:false, featured:true, desc:'Groomers serving Greenpoint, Brooklyn.', phone:'+1 347-294-4178', website:'https://dogparkgrooming.com/', booking:'https://dogparkgrooming.com/', tags:['Groomers', 'Greenpoint'] },
  { id:10, name:'PumpkinPups Dog Training Inc.', category:'Trainers', neighborhood:'Kensington', address:'239 E 5th St, Brooklyn, NY 11218', rating:5.0, reviews:65, mobile:false, featured:true, desc:'Trainers serving Kensington, Brooklyn.', phone:'+1 646-727-0992', website:'http://www.pumpkinpups.com/', booking:'http://www.pumpkinpups.com/contact/', tags:['Trainers', 'Kensington'] },
  { id:11, name:'Pawsability Dog Club', category:'Daycare', neighborhood:'Bushwick', address:'1510 Gates Ave 2nd Floor, Brooklyn, NY 11237', rating:5.0, reviews:63, mobile:false, featured:true, desc:'Daycare serving Bushwick, Brooklyn.', phone:'+1 929-342-0872', website:'http://pawsabilitydogclub.com/', booking:'', tags:['Daycare', 'Bushwick'] },
  { id:12, name:'Canine Starr', category:'Trainers', neighborhood:'Bushwick', address:'169 Starr St, Brooklyn, NY 11237', rating:5.0, reviews:49, mobile:false, featured:true, desc:'Trainers serving Bushwick, Brooklyn.', phone:'+1 929-471-8112', website:'http://www.caninestarr.com/', booking:'', tags:['Trainers', 'Bushwick'] },
  { id:13, name:'Tails and Purr', category:'Boarding', neighborhood:'Bushwick', address:'175 Hopkins St, Brooklyn, NY 11206', rating:5.0, reviews:47, mobile:false, featured:true, desc:'Boarding serving Bushwick, Brooklyn.', phone:'+1 254-249-4236', website:'http://www.tailsandpurr.com/', booking:'https://booking.moego.pet/ol/landing?name=TailsPurr&source=gr&rwg_token=AFd1xnEPkCa-68Uc63slAACTavLIj6X3T1csQqNjwhYjEe2UQRWuh2VWeAGI6BbffqxElR8zTt_dEP03UTi6OYytAzE1ff0J4bR5fi1oxaOsO-FRvLhKy5I%3D', tags:['Boarding', 'Bushwick'] },
  { id:14, name:'Mike Preis Dog Training', category:'Trainers', neighborhood:'Fort Greene', address:'246 Vanderbilt Ave, Brooklyn, NY 11205', rating:5.0, reviews:42, mobile:false, featured:true, desc:'Trainers serving Fort Greene, Brooklyn.', phone:'+1 917-862-5704', website:'http://www.mikepreisdogtraining.com/', booking:'', tags:['Trainers', 'Fort Greene'] },
  { id:15, name:'New York Wolfpack', category:'Trainers', neighborhood:'Sunset Park', address:'635 4th Ave, Brooklyn, NY 11232', rating:5.0, reviews:36, mobile:false, featured:false, desc:'Trainers serving Sunset Park, Brooklyn.', phone:'+1 516-864-1873', website:'http://www.newyorkwolfpack.com/', booking:'https://www.newyorkwolfpack.com/book-online', tags:['Trainers', 'Sunset Park'] },
  { id:16, name:'Dogpark Daycare Boarding &Grooming', category:'Daycare', neighborhood:'Greenpoint', address:'605 Manhattan Ave, Brooklyn, NY 11222', rating:5.0, reviews:34, mobile:false, featured:false, desc:'Daycare serving Greenpoint, Brooklyn.', phone:'+1 347-294-0947', website:'http://dogparkdaycare2.com/', booking:'', tags:['Daycare', 'Greenpoint'] },
  { id:17, name:'Zen Dog Training', category:'Trainers', neighborhood:'Kensington', address:'450 6th St, Brooklyn, NY 11218', rating:5.0, reviews:30, mobile:false, featured:false, desc:'Trainers serving Kensington, Brooklyn.', phone:'+1 347-696-6387', website:'http://www.zendog.us/', booking:'https://www.zendog.us/servicesandrates-1-1', tags:['Trainers', 'Kensington'] },
  { id:18, name:'Brooklyn Pup Dog Training', category:'Trainers', neighborhood:'Fort Greene', address:'239 Dekalb Ave, Brooklyn, NY 11205', rating:5.0, reviews:27, mobile:false, featured:false, desc:'Trainers serving Fort Greene, Brooklyn.', phone:'+1 347-435-5768', website:'http://www.brooklynpup.com/', booking:'', tags:['Trainers', 'Fort Greene'] },
  { id:19, name:'Wag the Dog NYC--Urban Dog Training', category:'Trainers', neighborhood:'Williamsburg', address:'212 S 2nd St, Brooklyn, NY 11211', rating:5.0, reviews:23, mobile:false, featured:false, desc:'Trainers serving Williamsburg, Brooklyn.', phone:'+1 347-469-3971', website:'http://www.wagthedognyc.com/', booking:'', tags:['Trainers', 'Williamsburg'] },
  { id:20, name:'Smylish Dogs', category:'Trainers', neighborhood:'Bushwick', address:'380 Marcus Garvey Blvd, Brooklyn, NY 11221', rating:5.0, reviews:23, mobile:false, featured:false, desc:'Trainers serving Bushwick, Brooklyn.', phone:'', website:'http://smylishdogs.com/', booking:'', tags:['Trainers', 'Bushwick'] },
  { id:21, name:'Empire of the Dog Brooklyn', category:'Trainers', neighborhood:'Williamsburg', address:'415 Grand St Suite #1, Brooklyn, NY 11211', rating:5.0, reviews:22, mobile:false, featured:false, desc:'Trainers serving Williamsburg, Brooklyn.', phone:'+1 917-723-5233', website:'http://www.empireofthedog.com/', booking:'', tags:['Trainers', 'Williamsburg'] },
  { id:22, name:'Dog Folks', category:'Daycare', neighborhood:'Williamsburg', address:'208 S 3rd St, Brooklyn, NY 11211', rating:5.0, reviews:19, mobile:false, featured:false, desc:'Daycare serving Williamsburg, Brooklyn.', phone:'+1 917-329-0178', website:'http://www.dogfolksnyc.com/', booking:'', tags:['Daycare', 'Williamsburg'] },
  { id:23, name:'All Dogs in the City Greenpoint', category:'Daycare', neighborhood:'Greenpoint', address:'36 Huron St, Brooklyn, NY 11222', rating:5.0, reviews:17, mobile:false, featured:false, desc:'Daycare serving Greenpoint, Brooklyn.', phone:'+1 718-576-3416', website:'https://alldogsinthecity.com/', booking:'', tags:['Daycare', 'Greenpoint'] },
  { id:24, name:'New York Dog Lovers - Dog Walker', category:'Dog Walkers', neighborhood:'Williamsburg', address:'447 Graham Ave, Brooklyn, NY 11211', rating:5.0, reviews:16, mobile:false, featured:false, desc:'Dog Walkers serving Williamsburg, Brooklyn.', phone:'', website:'', booking:'', tags:['Dog Walkers', 'Williamsburg'] },
  { id:25, name:'A Wild K9', category:'Trainers', neighborhood:'Prospect Heights', address:'203 Underhill Ave, Brooklyn, NY 11238', rating:5.0, reviews:15, mobile:false, featured:false, desc:'Trainers serving Prospect Heights, Brooklyn.', phone:'', website:'https://awildk9.com/', booking:'https://awildk9.com/contact/', tags:['Trainers', 'Prospect Heights'] },
  { id:26, name:'Hair of the Dog', category:'Trainers', neighborhood:'Park Slope', address:'142 10th St, Brooklyn, NY 11215', rating:5.0, reviews:11, mobile:false, featured:false, desc:'Trainers serving Park Slope, Brooklyn.', phone:'+1 718-864-0091', website:'http://www.hairofthedogtrainers.com/', booking:'', tags:['Trainers', 'Park Slope'] },
  { id:27, name:'Casper\'s Capers', category:'Trainers', neighborhood:'Bed-Stuy', address:'670 Lafayette Ave, Brooklyn, NY 11216', rating:5.0, reviews:10, mobile:false, featured:false, desc:'Trainers serving Bed-Stuy, Brooklyn.', phone:'', website:'http://casperscapers.com/', booking:'https://pocketsuite.io/book/casperscapers/items', tags:['Trainers', 'Bed-Stuy'] },
  { id:28, name:'Balanced Pack Training NYC', category:'Trainers', neighborhood:'Bushwick', address:'249 Tompkins Ave, Brooklyn, NY 11221', rating:5.0, reviews:9, mobile:false, featured:false, desc:'Trainers serving Bushwick, Brooklyn.', phone:'+1 929-379-7654', website:'https://www.balancedpacktrainingnyc.com/', booking:'', tags:['Trainers', 'Bushwick'] },
  { id:29, name:'Brooklyn Pup Dog Training', category:'Trainers', neighborhood:'Greenpoint', address:'124 Meserole Ave, Brooklyn, NY 11222', rating:5.0, reviews:7, mobile:false, featured:false, desc:'Trainers serving Greenpoint, Brooklyn.', phone:'+1 347-435-5768', website:'https://www.brooklynpup.com/', booking:'', tags:['Trainers', 'Greenpoint'] },
  { id:30, name:'Rescue Train Repeat', category:'Trainers', neighborhood:'Bushwick', address:'147 Thames St, Brooklyn, NY 11237', rating:5.0, reviews:7, mobile:false, featured:false, desc:'Trainers serving Bushwick, Brooklyn.', phone:'+1 347-904-1289', website:'http://www.rescuetrainrepeat.com/', booking:'https://www.rescuetrainrepeat.com/group-sessions', tags:['Trainers', 'Bushwick'] },
  { id:31, name:'Balanced Dogs', category:'Trainers', neighborhood:'Carroll Gardens', address:'522 Court St Apt 201, Brooklyn, NY 11231', rating:5.0, reviews:5, mobile:false, featured:false, desc:'Trainers serving Carroll Gardens, Brooklyn.', phone:'+1 908-294-1177', website:'', booking:'', tags:['Trainers', 'Carroll Gardens'] },
  { id:32, name:'Ruff to Ready Dog Training', category:'Trainers', neighborhood:'Williamsburg', address:'184 Kent Ave, Brooklyn, NY 11249', rating:5.0, reviews:4, mobile:false, featured:false, desc:'Trainers serving Williamsburg, Brooklyn.', phone:'+1 646-441-7966', website:'http://www.rufftoreadytraining.com/', booking:'https://www.rufftoreadytraining.com/schedule-appointment/', tags:['Trainers', 'Williamsburg'] },
  { id:33, name:'Love Pet Care Brooklyn', category:'Dog Walkers', neighborhood:'Williamsburg', address:'169 N 9th St, Brooklyn, NY 11211', rating:5.0, reviews:3, mobile:false, featured:false, desc:'Dog Walkers serving Williamsburg, Brooklyn.', phone:'+1 917-781-2210', website:'http://www.lovepetcare.com/', booking:'', tags:['Dog Walkers', 'Williamsburg'] },
  { id:34, name:'HappyPaw Dog walking and boarding', category:'Dog Walkers', neighborhood:'Williamsburg', address:'287 Bedford Ave apt. 11, Brooklyn, NY 11211', rating:5.0, reviews:1, mobile:false, featured:false, desc:'Dog Walkers serving Williamsburg, Brooklyn.', phone:'+1 929-473-4185', website:'', booking:'', tags:['Dog Walkers', 'Williamsburg'] },
  { id:35, name:'Dog daycare | Dogramblers', category:'Dog Walkers', neighborhood:'Williamsburg', address:'170 S 1st St, Brooklyn, NY 11211', rating:5.0, reviews:1, mobile:false, featured:false, desc:'Dog Walkers serving Williamsburg, Brooklyn.', phone:'+1 646-986-4668', website:'https://www.dogramblers.com/location', booking:'', tags:['Dog Walkers', 'Williamsburg'] },
  { id:36, name:'Dexter\'s Dog House', category:'Dog Walkers', neighborhood:'Bushwick', address:'161 Vernon Ave, Brooklyn, NY 11206', rating:5.0, reviews:0, mobile:false, featured:false, desc:'Dog Walkers serving Bushwick, Brooklyn.', phone:'+1 929-714-1487', website:'http://dextersdoghousebk.com/', booking:'', tags:['Dog Walkers', 'Bushwick'] },
  { id:37, name:'Tequira\'s Pet Services', category:'Dog Walkers', neighborhood:'Fort Greene', address:'Park Ave, Brooklyn, NY 11205', rating:5.0, reviews:0, mobile:false, featured:false, desc:'Dog Walkers serving Fort Greene, Brooklyn.', phone:'+1 646-504-9296', website:'https://www.rover.com/sit/tequic16782', booking:'', tags:['Dog Walkers', 'Fort Greene'] },
  { id:38, name:'DIGS Canine Hotel Spa & Daycare', category:'Daycare', neighborhood:'DUMBO / Brooklyn Heights', address:'238 Water St, Brooklyn, NY 11201', rating:4.9, reviews:402, mobile:false, featured:true, desc:'Daycare serving DUMBO / Brooklyn Heights, Brooklyn.', phone:'+1 631-832-3281', website:'http://www.digshotel.com/', booking:'https://www.digshotel.com/digs-book-online', tags:['Daycare', 'DUMBO / Brooklyn Heights'] },
  { id:39, name:'Brooklyn Pawffice', category:'Daycare', neighborhood:'Williamsburg', address:'522 Grand St, Brooklyn, NY 11211', rating:4.9, reviews:142, mobile:false, featured:true, desc:'Daycare serving Williamsburg, Brooklyn.', phone:'+1 929-258-8350', website:'https://brooklynpawffice.com/', booking:'https://brooklynpawffice.com/daycare/', tags:['Daycare', 'Williamsburg'] },
  { id:40, name:'The Dog Institute of Williamsburg', category:'Trainers', neighborhood:'Williamsburg', address:'125 Roebling St, Brooklyn, NY 11211', rating:4.9, reviews:113, mobile:false, featured:true, desc:'Trainers serving Williamsburg, Brooklyn.', phone:'+1 347-276-0882', website:'http://thedoginstitute.com/', booking:'', tags:['Trainers', 'Williamsburg'] },
  { id:41, name:'The Dog Behaviorist NYC', category:'Trainers', neighborhood:'DUMBO / Brooklyn Heights', address:'86 Fleet Pl #18F, Brooklyn, NY 11201', rating:4.9, reviews:103, mobile:false, featured:true, desc:'Trainers serving DUMBO / Brooklyn Heights, Brooklyn.', phone:'+1 309-620-4579', website:'https://www.dominikfeichtner.com/', booking:'https://www.dominikfeichtner.com/book-an-appointment', tags:['Trainers', 'DUMBO / Brooklyn Heights'] },
  { id:42, name:'PUPS Pet Club', category:'Daycare', neighborhood:'Park Slope', address:'302 Livingston St, Brooklyn, NY 11217', rating:4.9, reviews:93, mobile:false, featured:true, desc:'Daycare serving Park Slope, Brooklyn.', phone:'+1 646-216-8780', website:'https://www.pupspetclub.com/dobro%3Futm_campaign%3Dgmb', booking:'https://pupspetclub.portal.gingrapp.com/#/public/login', tags:['Daycare', 'Park Slope'] },
  { id:43, name:'Doggittude', category:'Daycare', neighborhood:'Park Slope', address:'356 Atlantic Ave, Brooklyn, NY 11217', rating:4.9, reviews:79, mobile:false, featured:true, desc:'Daycare serving Park Slope, Brooklyn.', phone:'+1 646-956-3511', website:'http://www.doggittude.com/', booking:'', tags:['Daycare', 'Park Slope'] },
  { id:44, name:'Acme Dog Run', category:'Daycare', neighborhood:'Park Slope', address:'188 6th St, Brooklyn, NY 11215', rating:4.9, reviews:74, mobile:false, featured:true, desc:'Daycare serving Park Slope, Brooklyn.', phone:'+1 718-935-9364', website:'http://www.acmedogrun.com/', booking:'', tags:['Daycare', 'Park Slope'] },
  { id:45, name:'Fido Playhouse', category:'Daycare', neighborhood:'Greenpoint', address:'975 Manhattan Ave Store #1, Brooklyn, NY 11222', rating:4.9, reviews:67, mobile:false, featured:true, desc:'Daycare serving Greenpoint, Brooklyn.', phone:'+1 646-384-8602', website:'http://fidoplayhouseny.com/', booking:'', tags:['Daycare', 'Greenpoint'] },
  { id:46, name:'Hounds Town - Dumbo', category:'Daycare', neighborhood:'DUMBO / Brooklyn Heights', address:'57 Jay St, Brooklyn, NY 11201', rating:4.9, reviews:57, mobile:false, featured:true, desc:'Daycare serving DUMBO / Brooklyn Heights, Brooklyn.', phone:'+1 917-909-1842', website:'https://houndstownusa.com/locations/dumbo/%3Futm_source%3Dgoogle%26utm_medium%3Dmap%26utm_id%3Ddumbo', booking:'https://www.mytime.com/express_checkout/140582/155721?rwg_token=AFd1xnGgVhvl8HD7zdNW99j5TTLDSYY5Shg_7bcSPysqGZZPjUIQ4S0mJP-FfSsznrYIio3DxJtOQDVzgXci6h1Ci-uQcBbgCg9MltpJeIwmrEeG5Gdp5ow%3D', tags:['Daycare', 'DUMBO / Brooklyn Heights'] },
  { id:47, name:'Not The Rug', category:'Dog Walkers', neighborhood:'Williamsburg', address:'281 N 7th St, Brooklyn, NY 11211', rating:4.9, reviews:42, mobile:false, featured:true, desc:'Dog Walkers serving Williamsburg, Brooklyn.', phone:'+1 347-610-9676', website:'http://nottherug.com/', booking:'https://www.nottherug.com/', tags:['Dog Walkers', 'Williamsburg'] },
  { id:48, name:'Your Spoiled Pets', category:'Daycare', neighborhood:'Fort Greene', address:'106 Flushing Ave, Brooklyn, NY 11205', rating:4.9, reviews:36, mobile:false, featured:false, desc:'Daycare serving Fort Greene, Brooklyn.', phone:'+1 347-987-3001', website:'https://yourspoiledpets-navyyard.com/', booking:'', tags:['Daycare', 'Fort Greene'] },
  { id:49, name:'Urban K-9 Dog Training', category:'Trainers', neighborhood:'Carroll Gardens', address:'314 Carroll St, Brooklyn, NY 11231', rating:4.9, reviews:28, mobile:false, featured:false, desc:'Trainers serving Carroll Gardens, Brooklyn.', phone:'+1 347-416-2535', website:'http://www.urbank-9.com/', booking:'', tags:['Trainers', 'Carroll Gardens'] },
  { id:50, name:'Dan\'s Pet Care - Brooklyn', category:'Dog Walkers', neighborhood:'Greenpoint', address:'42 West St Suite 235, Brooklyn, NY 11222', rating:4.9, reviews:0, mobile:false, featured:false, desc:'Dog Walkers serving Greenpoint, Brooklyn.', phone:'+1 516-551-1613', website:'http://danspetcare.com/', booking:'', tags:['Dog Walkers', 'Greenpoint'] },
  { id:51, name:'Happy Dogs', category:'Daycare', neighborhood:'Williamsburg', address:'32 N 6th St, Brooklyn, NY 11249', rating:4.8, reviews:101, mobile:false, featured:true, desc:'Daycare serving Williamsburg, Brooklyn.', phone:'+1 718-388-7091', website:'http://happydogsnyc.com/', booking:'', tags:['Daycare', 'Williamsburg'] },
  { id:52, name:'Buddy\'s Dog Den', category:'Daycare', neighborhood:'Williamsburg', address:'429 Graham Ave, Brooklyn, NY 11211', rating:4.8, reviews:83, mobile:false, featured:true, desc:'Daycare serving Williamsburg, Brooklyn.', phone:'+1 347-382-7101', website:'http://buddysdogden.com/', booking:'', tags:['Daycare', 'Williamsburg'] },
  { id:53, name:'My Two Dogs Dog Grooming & Dog Training', category:'Groomers', neighborhood:'Bushwick', address:'134 Boerum St, Brooklyn, NY 11206', rating:4.8, reviews:78, mobile:false, featured:true, desc:'Groomers serving Bushwick, Brooklyn.', phone:'+1 718-963-0400', website:'https://www.mytwodogsinc.com/', booking:'https://go.mytwodogsinc.com/client-redirect', tags:['Groomers', 'Bushwick'] },
  { id:54, name:'What\'s Up Dog', category:'Daycare', neighborhood:'Bushwick', address:'175 Knickerbocker Ave, Brooklyn, NY 11237', rating:4.8, reviews:76, mobile:false, featured:true, desc:'Daycare serving Bushwick, Brooklyn.', phone:'+1 929-210-0556', website:'http://www.whatsupdogbk.com/', booking:'https://www.whatsupdogbk.com/contact-us', tags:['Daycare', 'Bushwick'] },
  { id:55, name:'PUPS Pet Club', category:'Daycare', neighborhood:'Williamsburg', address:'89 Kent Ave, Brooklyn, NY 11249', rating:4.8, reviews:75, mobile:false, featured:true, desc:'Daycare serving Williamsburg, Brooklyn.', phone:'+1 646-870-4300', website:'https://pupspetclub.com/clubs/williamsburg/%3Futm_campaign%3Dgmb', booking:'https://pupspetclub.portal.gingrapp.com/#/public/login', tags:['Daycare', 'Williamsburg'] },
  { id:56, name:'Strutting Mutts | Dog Walkers | Day Care', category:'Daycare', neighborhood:'Williamsburg', address:'624 Grand St, Brooklyn, NY 11211', rating:4.8, reviews:57, mobile:false, featured:true, desc:'Daycare serving Williamsburg, Brooklyn.', phone:'+1 646-362-2271', website:'http://www.struttingmutts.com/', booking:'', tags:['Daycare', 'Williamsburg'] },
  { id:57, name:'Metro Dog Training', category:'Trainers', neighborhood:'Williamsburg', address:'175 Powers St, Brooklyn, NY 11211', rating:4.8, reviews:48, mobile:false, featured:true, desc:'Trainers serving Williamsburg, Brooklyn.', phone:'+1 646-718-2202', website:'https://metrodogtraining.com/', booking:'https://api.leadconnectorhq.com/widget/booking/0CydVvY4m9OpjxzCXS4c', tags:['Trainers', 'Williamsburg'] },
  { id:58, name:'Ciao Bow Wow', category:'Daycare', neighborhood:'Park Slope', address:'398 Atlantic Ave, Brooklyn, NY 11217', rating:4.8, reviews:30, mobile:false, featured:false, desc:'Daycare serving Park Slope, Brooklyn.', phone:'+1 347-987-4865', website:'http://www.ciaobowwowbklyn.com/', booking:'', tags:['Daycare', 'Park Slope'] },
  { id:59, name:'Calm Energy Dog Training', category:'Trainers', neighborhood:'Park Slope', address:'468 11th St, Brooklyn, NY 11215', rating:4.8, reviews:18, mobile:false, featured:false, desc:'Trainers serving Park Slope, Brooklyn.', phone:'', website:'http://calmenergydogtraining.com/videos', booking:'https://calmenergydogtraining.com/contact/', tags:['Trainers', 'Park Slope'] },
  { id:60, name:'Paws & Rec Inc.', category:'Dog Walkers', neighborhood:'Sunset Park', address:'857 4th Ave, Brooklyn, NY 11232', rating:4.8, reviews:0, mobile:false, featured:false, desc:'Dog Walkers serving Sunset Park, Brooklyn.', phone:'+1 718-954-9117', website:'http://www.pawsandrec.com/', booking:'', tags:['Dog Walkers', 'Sunset Park'] },
  { id:61, name:'PAWSIES', category:'Daycare', neighborhood:'Bushwick', address:'928 Flushing Ave, Brooklyn, NY 11206', rating:4.7, reviews:104, mobile:false, featured:false, desc:'Daycare serving Bushwick, Brooklyn.', phone:'+1 347-796-7597', website:'http://www.pawsiesnyc.com/', booking:'https://pawsiesnyc.gingrapp.com/front_end/login/email', tags:['Daycare', 'Bushwick'] },
  { id:62, name:'The Canine Corner', category:'Daycare', neighborhood:'Carroll Gardens', address:'303 Court St, Brooklyn, NY 11231', rating:4.7, reviews:91, mobile:false, featured:false, desc:'Daycare serving Carroll Gardens, Brooklyn.', phone:'+1 718-360-4900', website:'http://www.thecaninecorner.com/', booking:'', tags:['Daycare', 'Carroll Gardens'] },
  { id:63, name:'Go Doggy', category:'Daycare', neighborhood:'Williamsburg', address:'376 Bedford Ave, Brooklyn, NY 11249', rating:4.7, reviews:86, mobile:false, featured:false, desc:'Daycare serving Williamsburg, Brooklyn.', phone:'+1 347-844-9100', website:'http://www.godoggyny.com/', booking:'', tags:['Daycare', 'Williamsburg'] },
  { id:64, name:'Brooklyn Bark', category:'Dog Walkers', neighborhood:'DUMBO / Brooklyn Heights', address:'195 Montague St, Brooklyn, NY 11201', rating:4.7, reviews:56, mobile:false, featured:false, desc:'Dog Walkers serving DUMBO / Brooklyn Heights, Brooklyn.', phone:'+1 347-850-4982', website:'http://www.brooklynbark.com/%3Futm_source%3Dgoogle%26utm_medium%3Dwix_google_business_profile%26utm_campaign%3D9085021758033037111', booking:'http://www.brooklynbark.com/client-scheduling', tags:['Dog Walkers', 'DUMBO / Brooklyn Heights'] },
  { id:65, name:'Brooklyn Dog Training Center', category:'Trainers', neighborhood:'Park Slope', address:'10 Whitwell Pl, Brooklyn, NY 11215', rating:4.7, reviews:34, mobile:false, featured:false, desc:'Trainers serving Park Slope, Brooklyn.', phone:'+1 646-828-3551', website:'https://brooklyndogtrainingcenter.com/', booking:'', tags:['Trainers', 'Park Slope'] },
  { id:66, name:'HomeDoggy', category:'Groomers', neighborhood:'Park Slope', address:'123A 7th Ave, Brooklyn, NY 11215', rating:4.6, reviews:275, mobile:false, featured:false, desc:'Groomers serving Park Slope, Brooklyn.', phone:'+1 718-576-3918', website:'http://www.homedoggy.com/', booking:'https://homedoggy.com/#bookapt', tags:['Groomers', 'Park Slope'] },
  { id:67, name:'Woofs \'n Whiskers', category:'Boarding', neighborhood:'Carroll Gardens', address:'14 Coles St, Brooklyn, NY 11231', rating:4.6, reviews:130, mobile:false, featured:false, desc:'Boarding serving Carroll Gardens, Brooklyn.', phone:'+1 718-237-0298', website:'https://www.woofsnwhiskers.com/', booking:'https://woofsnwhiskers.com/book/make-a-reservation/', tags:['Boarding', 'Carroll Gardens'] },
  { id:68, name:'Michael Jackson Dog Training', category:'Trainers', neighborhood:'Bushwick', address:'995 Myrtle Ave, Brooklyn, NY 11206', rating:4.6, reviews:21, mobile:false, featured:false, desc:'Trainers serving Bushwick, Brooklyn.', phone:'+1 347-351-9343', website:'http://mjacksonk9.com/', booking:'', tags:['Trainers', 'Bushwick'] },
  { id:69, name:'LE DOGGIE COOL', category:'Daycare', neighborhood:'Williamsburg', address:'149 Wythe Ave, Brooklyn, NY 11249', rating:4.5, reviews:244, mobile:false, featured:false, desc:'Daycare serving Williamsburg, Brooklyn.', phone:'+1 347-294-0381', website:'http://www.ledoggiecool.com/', booking:'https://www.ledoggiecool.com/booking', tags:['Daycare', 'Williamsburg'] },
  { id:70, name:'Happy Dogs', category:'Daycare', neighborhood:'Williamsburg', address:'234 N 12th St, Brooklyn, NY 11211', rating:4.5, reviews:236, mobile:false, featured:false, desc:'Popular, hybrid facility featuring a pet store, a dog day-care center, a kennel & bathing services.', phone:'+1 718-388-7091', website:'http://happydogsnyc.com/mccarren-park%3Futm_source%3Dgbp', booking:'', tags:['Daycare', 'Williamsburg'] },
  { id:71, name:'HI-BK Doggy Daycare', category:'Daycare', neighborhood:'Park Slope', address:'76 Rockwell Pl, Brooklyn, NY 11217', rating:4.5, reviews:97, mobile:false, featured:false, desc:'Daycare serving Park Slope, Brooklyn.', phone:'+1 718-971-9605', website:'https://hi-bk.com/', booking:'', tags:['Daycare', 'Park Slope'] },
  { id:72, name:'Woofs \'n Whiskers, Too!', category:'Daycare', neighborhood:'DUMBO / Brooklyn Heights', address:'297 Warren St, Brooklyn, NY 11201', rating:4.5, reviews:8, mobile:false, featured:false, desc:'Daycare serving DUMBO / Brooklyn Heights, Brooklyn.', phone:'+1 718-237-0298', website:'https://woofsnwhiskers.com/woofs-n-whiskers-too/', booking:'https://woofsnwhiskers.com/book/make-a-reservation/', tags:['Daycare', 'DUMBO / Brooklyn Heights'] },
  { id:73, name:'Dogtopia of Myrtle Ave. - Brooklyn', category:'Daycare', neighborhood:'Fort Greene', address:'504 Myrtle Ave, Brooklyn, NY 11205', rating:4.4, reviews:46, mobile:false, featured:false, desc:'Daycare serving Fort Greene, Brooklyn.', phone:'+1 347-343-5330', website:'https://www.dogtopia.com/myrtleave-brooklyn/', booking:'https://www.dogtopia.com/myrtleave-brooklyn/meet-and-greet?utm_source=google-business-profile&utm_medium=meetandgreet&utm_campaign=appointmentbooking&utm_term=website&utm_content=requestmeetandgreet', tags:['Daycare', 'Fort Greene'] },
  { id:74, name:'PetSmart Dog Training', category:'Trainers', neighborhood:'DUMBO / Brooklyn Heights', address:'238 Atlantic Ave, Brooklyn, NY 11201', rating:4.0, reviews:9, mobile:false, featured:false, desc:'Trainers serving DUMBO / Brooklyn Heights, Brooklyn.', phone:'+1 718-852-2519', website:'https://stores.petsmart.com/ny/brooklyn/brooklyn-atlantic-ave/dog-training%3Futm_source%3Dgoogle%26utm_medium%3Dorganic%26utm_campaign%3Dgoogle-my-business', booking:'', tags:['Trainers', 'DUMBO / Brooklyn Heights'] },
  { id:75, name:'Petco Dog Training', category:'Trainers', neighborhood:'Park Slope', address:'81 7th Ave, Brooklyn, NY 11217', rating:3.5, reviews:2, mobile:false, featured:false, desc:'Trainers serving Park Slope, Brooklyn.', phone:'+1 718-230-5059', website:'https://stores.petco.com/ny/brooklyn/dog-training-brooklyn-ny-5717.html', booking:'https://www.petco.com/webapp/wcs/stores/servlet/PetcoServicesBookDogTrainingView?langId=-1&catalogId=10051&storeId=10151&store_number=5717', tags:['Trainers', 'Park Slope'] },
  { id:76, name:'Go Doggy', category:'Dog Walkers', neighborhood:'Williamsburg', address:'220 N 8th St, Brooklyn, NY 11211', rating:4.5, reviews:0, mobile:false, featured:false, desc:'Dog Walkers serving Williamsburg, Brooklyn.', phone:'+1 347-844-9100', website:'https://www.godoggyny.com/', booking:'', tags:['Dog Walkers', 'Williamsburg'] },
  { id:77, name:'Super Pup Dog Daycare (now open for bookings!)', category:'Dog Walkers', neighborhood:'Greenpoint', address:'41 West St, Brooklyn, NY 11222', rating:4.5, reviews:0, mobile:false, featured:false, desc:'Dog Walkers serving Greenpoint, Brooklyn.', phone:'', website:'http://www.superpupnyc.com/', booking:'', tags:['Dog Walkers', 'Greenpoint'] },
  { id:78, name:'The Furry Club', category:'Groomers', neighborhood:'Williamsburg', address:'303 Wythe Ave, Brooklyn, NY 11211', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Personalized grooming for dogs and cats. Includes bath, hand-dry, brush out, nail trim, ear cleaning. Creative grooming options available.', phone:'+1 347-608-2729', website:'https://thefurryclub.net', booking:'https://thefurryclub.net', tags:['Groomers', 'Williamsburg'] },
  { id:79, name:'Doggie Styles Pet Grooming', category:'Groomers', neighborhood:'Williamsburg', address:'229 Grand St, Brooklyn, NY 11211', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full grooming: oatmeal bath scrub, conditioning, hand blow-dry, brush-out, hair styling, nail trim, and ear cleansing.', phone:'+1 212-380-1564', website:'https://doggiestylesny.com', booking:'', tags:['Groomers', 'Williamsburg'] },
  { id:80, name:'Rapawzel Dog Grooming & Day Care', category:'Groomers', neighborhood:'Sunset Park', address:'222 22nd St, Brooklyn, NY 11232', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full grooming for dogs and cats, pet daycare, boarding, mobile grooming, and pet walking. Certified staff, multi-pet discounts.', phone:'+1 718-514-2887', website:'https://rapawzeldoggroomer.com', booking:'', tags:['Groomers', 'Sunset Park'] },
  { id:81, name:'Flossy Pet Pawlor', category:'Groomers', neighborhood:'DUMBO / Brooklyn Heights', address:'100 Prince St, Brooklyn, NY 11201', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full pet grooming services in Brooklyn. Highly rated by customers. Open Wed–Sun.', phone:'+1 347-335-0142', website:'https://flossypetpawlor.square.site', booking:'https://flossypetpawlor.square.site', tags:['Groomers', 'DUMBO / Brooklyn Heights'] },
  { id:82, name:'Bark Slope', category:'Groomers', neighborhood:'Park Slope', address:'427 5th Ave, Brooklyn, NY 11215', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full grooming for dogs and cats, self-service dog wash, raw food, treats, and accessories. Open daily.', phone:'+1 718-246-4600', website:'https://barkslopesalon.com', booking:'', tags:['Groomers', 'Park Slope'] },
  { id:83, name:'Woof Gang Bakery & Grooming Park Slope', category:'Groomers', neighborhood:'Park Slope', address:'217 7th Ave, Brooklyn, NY 11215', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full service grooming, premium treats, pet products, and fashion accessories. Community-focused Park Slope location.', phone:'+1 646-930-8609', website:'https://woofgangbakery.com', booking:'', tags:['Groomers', 'Park Slope'] },
  { id:84, name:'Animal Loving Care', category:'Groomers', neighborhood:'Carroll Gardens', address:'556 Court St, Brooklyn, NY 11231', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Grooming spa, dog daycare, supervised indoor and outdoor play, boarding, and socialization training.', phone:'+1 646-845-7773', website:'https://animallovingcare.com', booking:'', tags:['Groomers', 'Carroll Gardens'] },
  { id:85, name:'Sonia\'s Pet Grooming', category:'Groomers', neighborhood:'Park Slope', address:'471 7th Ave, Brooklyn, NY 11215', rating:4.7, reviews:0, mobile:false, featured:false, desc:'One-on-one artisanal grooming — one dog at a time — focused on comfort and building trust with pets.', phone:'+1 718-499-4040', website:'https://soniaspetgrooming.com', booking:'', tags:['Groomers', 'Park Slope'] },
  { id:86, name:'Le\' Pulga Pet Grooming', category:'Groomers', neighborhood:'Williamsburg', address:'102 Broadway, Brooklyn, NY 11211', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Grooming by appointment. Vaccination records required when booking.', phone:'+1 929-454-1467', website:'https://lepulganyc.com', booking:'', tags:['Groomers', 'Williamsburg'] },
  { id:87, name:'Happy Tails Holistic Pet Grooming', category:'Groomers', neighborhood:'Greenpoint', address:'48 Driggs Ave, Brooklyn, NY 11222', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Grooming, boarding, daycare, dog walking, and in-home services. Pick-up and drop-off available.', phone:'+1 718-383-2590', website:'https://happytailsbrooklyn.com', booking:'', tags:['Groomers', 'Greenpoint'] },
  { id:88, name:'Furry Pawz & Clawz Pet Salon', category:'Groomers', neighborhood:'Crown Heights', address:'521 Rogers Ave, Brooklyn, NY 11225', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Grooming with all-natural shampoo options plus training classes. Vaccination records required.', phone:'+1 929-234-6500', website:'https://furrypawz.com', booking:'', tags:['Groomers', 'Crown Heights'] },
  { id:89, name:'Pooch Purrfect', category:'Groomers', neighborhood:'Prospect Heights', address:'789 Washington Ave, Brooklyn, NY 11238', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Pet grooming services in Prospect Heights. Meet-and-greets and appointments available.', phone:'+1 718-399-9811', website:'https://poochpurrfect.com', booking:'', tags:['Groomers', 'Prospect Heights'] },
  { id:90, name:'Hook\'d On Pets Grooming, Daycare & Retail', category:'Groomers', neighborhood:'Carroll Gardens', address:'147 Pioneer St, Brooklyn, NY 11231', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Boutique grooming, cage-free boarding, daycare, walking, and retail. Complimentary bandana with every groom.', phone:'+1 347-689-2412', website:'https://hookdonpets.com', booking:'', tags:['Groomers', 'Carroll Gardens'] },
  { id:91, name:'Bushwick Bark', category:'Groomers', neighborhood:'Bushwick', address:'175 Knickerbocker Ave, Brooklyn, NY 11237', rating:4.7, reviews:0, mobile:false, featured:false, desc:'One-on-one grooming for dogs and cats by appointment. Self-serve dog wash walk-ins welcome.', phone:'+1 718-928-7772', website:'https://bushwickbark.com', booking:'', tags:['Groomers', 'Bushwick'] },
  { id:92, name:'Lilly\'s Pet Service', category:'Groomers', neighborhood:'Bushwick', address:'1397 Myrtle Ave, Brooklyn, NY 11237', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Dog grooming, boarding, daycare, and dog walking. Vaccination requirements enforced.', phone:'+1 347-593-5164', website:'https://lillyspetservicesny.com', booking:'', tags:['Groomers', 'Bushwick'] },
  { id:93, name:'Paws In Paradise NYC', category:'Groomers', neighborhood:'Park Slope', address:'410 5th Ave, Brooklyn, NY 11215', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Grooming, dog daycare, boarding, and dog walking. Open seven days a week.', phone:'+1 718-768-1888', website:'https://pawsinparadisenyc.com', booking:'', tags:['Groomers', 'Park Slope'] },
  { id:94, name:'Who\'s Your Doggy', category:'Groomers', neighborhood:'Bed-Stuy', address:'301A Halsey St, Brooklyn, NY 11216', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Pet store with experienced groomers, pet food, supplies, toys, and treats.', phone:'+1 718-455-5225', website:'https://wydbk.com', booking:'', tags:['Groomers', 'Bed-Stuy'] },
  { id:95, name:'Now You\'re Clean - Williamsburg', category:'Groomers', neighborhood:'Williamsburg', address:'228 Berry St, Brooklyn, NY 11211', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Boutique grooming and self-service dog wash. Private event space for pet pawties.', phone:'+1 332-257-2376', website:'https://nowyoureclean.com', booking:'', tags:['Groomers', 'Williamsburg'] },
  { id:96, name:'Bff Petwash', category:'Groomers', neighborhood:'Greenpoint', address:'192 Driggs Ave, Brooklyn, NY 11222', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Self-service pet wash stations in Greenpoint. Vaccination proof required.', phone:'+1 718-349-8705', website:'https://bffpetwash.com', booking:'', tags:['Groomers', 'Greenpoint'] },
  { id:97, name:'Strutting Mutts Boarding', category:'Boarding', neighborhood:'Williamsburg', address:'624 Grand St, Brooklyn, NY 11211', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding alongside daycare in Williamsburg. Small groups, supervised play.', phone:'+1 347-599-2892', website:'https://struttingmutts.com', booking:'https://struttingmutts.com', tags:['Boarding', 'Williamsburg'] },
  { id:98, name:'Le Doggie Cool Boarding', category:'Boarding', neighborhood:'Williamsburg', address:'149 Wythe Ave, Brooklyn, NY 11249', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding with cage-free play areas in Williamsburg. Online booking available.', phone:'+1 347-294-0381', website:'https://ledoggiecool.com', booking:'https://www.ledoggiecool.com/booking', tags:['Boarding', 'Williamsburg'] },
  { id:99, name:'Bedford Ave Pet Boarding', category:'Boarding', neighborhood:'Williamsburg', address:'335 Bedford Ave, Brooklyn, NY 11211', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Pet boarding and grooming in the heart of Williamsburg.', phone:'+1 929-295-0352', website:'', booking:'', tags:['Boarding', 'Williamsburg'] },
  { id:100, name:'Brooklyn Pet Spa', category:'Boarding', neighborhood:'Fort Greene', address:'481 Dekalb Ave, Brooklyn, NY 11205', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight pet boarding in Fort Greene. Home-away-from-home environment for dogs and cats.', phone:'+1 718-722-9336', website:'https://brooklynpetspa.com', booking:'https://brooklynpetspa.com/boarding', tags:['Boarding', 'Fort Greene'] },
  { id:101, name:'Broadway Pet Boarding', category:'Boarding', neighborhood:'Bushwick', address:'1060 Broadway, Brooklyn, NY 11221', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service pet boarding and grooming serving Bushwick and surrounding neighborhoods.', phone:'+1 718-483-9319', website:'', booking:'', tags:['Boarding', 'Bushwick'] },
  { id:102, name:'Animal Loving Care Boarding', category:'Boarding', neighborhood:'Carroll Gardens', address:'556 Court St, Brooklyn, NY 11231', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Cage-free boarding with indoor and outdoor supervised play areas. Slumber Pawty overnight stays.', phone:'+1 646-845-7773', website:'https://animallovingcare.com', booking:'', tags:['Boarding', 'Carroll Gardens'] },
  { id:103, name:'Canine Corner Boarding', category:'Boarding', neighborhood:'Carroll Gardens', address:'303 Court St, Brooklyn, NY 11231', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding alongside daycare in Carroll Gardens. Known for attentive care.', phone:'+1 718-360-4900', website:'https://thecaninecorner.com', booking:'', tags:['Boarding', 'Carroll Gardens'] },
  { id:104, name:'Bay Ridge Pet Boarding', category:'Boarding', neighborhood:'Bay Ridge', address:'8209 5th Ave, Brooklyn, NY 11209', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Pet boarding and daycare serving Bay Ridge and surrounding south Brooklyn neighborhoods.', phone:'+1 718-745-5400', website:'', booking:'', tags:['Boarding', 'Bay Ridge'] },
  { id:105, name:'Happy Tails Boarding', category:'Boarding', neighborhood:'Greenpoint', address:'48 Driggs Ave, Brooklyn, NY 11222', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding with pick-up and drop-off available. Vaccination records required.', phone:'+1 718-383-2590', website:'https://happytailsbrooklyn.com', booking:'', tags:['Boarding', 'Greenpoint'] },
  { id:106, name:'Dogtopia of Myrtle Ave Boarding', category:'Boarding', neighborhood:'Fort Greene', address:'504 Myrtle Ave, Brooklyn, NY 11205', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding with all-day play included at Fort Greene location. Webcam access available.', phone:'+1 347-343-5330', website:'https://dogtopia.com/myrtleave-brooklyn', booking:'https://www.dogtopia.com/myrtleave-brooklyn/meet-and-greet', tags:['Boarding', 'Fort Greene'] },
  { id:107, name:'Rapawzel Boarding', category:'Boarding', neighborhood:'Sunset Park', address:'222 22nd St, Brooklyn, NY 11232', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding and pet daycare in Sunset Park. Certified staff, multi-pet discounts.', phone:'+1 718-514-2887', website:'https://rapawzeldoggroomer.com', booking:'', tags:['Boarding', 'Sunset Park'] },
  { id:108, name:'Paws In Paradise Boarding', category:'Boarding', neighborhood:'Park Slope', address:'410 5th Ave, Brooklyn, NY 11215', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding and dog walking in Park Slope. Open seven days a week.', phone:'+1 718-768-1888', website:'https://pawsinparadisenyc.com', booking:'', tags:['Boarding', 'Park Slope'] },
  { id:109, name:'PAWSIES Boarding', category:'Boarding', neighborhood:'Bushwick', address:'928 Flushing Ave, Brooklyn, NY 11206', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Cage-free overnight boarding alongside daycare in Bushwick. Online check-in available.', phone:'+1 347-796-7597', website:'https://pawsiesnyc.com', booking:'https://pawsiesnyc.gingrapp.com/front_end/login/email', tags:['Boarding', 'Bushwick'] },
  { id:110, name:'Hook\'d On Pets Boarding', category:'Boarding', neighborhood:'Carroll Gardens', address:'147 Pioneer St, Brooklyn, NY 11231', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Cage-free overnight boarding in Carroll Gardens. Includes grooming and retail services.', phone:'+1 347-689-2412', website:'https://hookdonpets.com', booking:'', tags:['Boarding', 'Carroll Gardens'] },
  { id:111, name:'Lilly\'s Pet Service Boarding', category:'Boarding', neighborhood:'Bushwick', address:'1397 Myrtle Ave, Brooklyn, NY 11237', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding and daycare in Bushwick. Vaccination records required.', phone:'+1 347-593-5164', website:'https://lillyspetservicesny.com', booking:'', tags:['Boarding', 'Bushwick'] },
  { id:112, name:'Your Spoiled Pets Boarding', category:'Boarding', neighborhood:'Fort Greene', address:'106 Flushing Ave, Brooklyn, NY 11205', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding in Fort Greene near the Navy Yard. Attentive, small-group care.', phone:'+1 347-987-3001', website:'https://yourspoiledpets-navyyard.com', booking:'', tags:['Boarding', 'Fort Greene'] },
  { id:113, name:'Dog Park Daycare & Boarding', category:'Boarding', neighborhood:'Greenpoint', address:'605 Manhattan Ave, Brooklyn, NY 11222', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Overnight boarding with daycare services in Greenpoint. Park walks included.', phone:'+1 347-294-0947', website:'https://dogparkdaycare2.com', booking:'', tags:['Boarding', 'Greenpoint'] },
  { id:114, name:'Buddy\'s Dog Den Boarding', category:'Boarding', neighborhood:'Williamsburg', address:'429 Graham Ave, Brooklyn, NY 11211', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service boarding salon and spa in Williamsburg. Overnight suites with grooming add-ons.', phone:'+1 347-382-7101', website:'https://buddysdogden.com', booking:'', tags:['Boarding', 'Williamsburg'] },
  { id:115, name:'VERG South Brooklyn Emergency Boarding', category:'Boarding', neighborhood:'DUMBO / Brooklyn Heights', address:'318 Warren St, Brooklyn, NY 11201', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Veterinary supervised overnight boarding at Brooklyn\'s emergency animal hospital. 24/7 staff.', phone:'+1 718-522-9400', website:'https://verg-brooklyn.com', booking:'', tags:['Boarding', 'DUMBO / Brooklyn Heights'] },
  { id:116, name:'BluePearl Pet Hospital Boarding', category:'Boarding', neighborhood:'Park Slope', address:'190 3rd Ave, Brooklyn, NY 11217', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Veterinary-supervised boarding at Brooklyn\'s specialty and emergency animal hospital in Gowanus.', phone:'+1 718-522-9400', website:'https://bluepearlvet.com/hospital/brooklyn-ny', booking:'', tags:['Boarding', 'Park Slope'] },
  { id:117, name:'Oceanside Animal Clinic Boarding', category:'Boarding', neighborhood:'Flatbush', address:'2270 Flatbush Ave, Brooklyn, NY 11234', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Safe, comfortable boarding in a veterinary-supervised environment in south Brooklyn.', phone:'+1 718-258-0500', website:'https://oceansideanimalclinic.com', booking:'', tags:['Boarding', 'Flatbush'] },
  { id:118, name:'HomeDoggy Boarding', category:'Boarding', neighborhood:'Park Slope', address:'123A 7th Ave, Brooklyn, NY 11215', rating:4.7, reviews:0, mobile:false, featured:false, desc:'In-home boarding and overnight pet care in Park Slope. Grooming also available.', phone:'+1 718-576-3918', website:'https://homedoggy.com', booking:'https://homedoggy.com/#bookapt', tags:['Boarding', 'Park Slope'] },
  { id:119, name:'Animal Kind Veterinary Hospital', category:'Vets', neighborhood:'Park Slope', address:'365 7th Ave, Brooklyn, NY 11215', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service veterinary care in Park Slope. Wellness exams, vaccines, surgery, and urgent care.', phone:'+1 718-832-3899', website:'https://animalkind.com', booking:'https://animalkind.com', tags:['Vets', 'Park Slope'] },
  { id:120, name:'Bond Vet Park Slope', category:'Vets', neighborhood:'Park Slope', address:'319 3rd Ave, Brooklyn, NY 11215', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Modern vet clinic in Park Slope with urgent care, wellness, surgery, and dental. Walk-ins welcome.', phone:'+1 929-203-2043', website:'https://bondvet.com/c/park-slope-animal-hospital', booking:'https://bondvet.com/c/park-slope-animal-hospital', tags:['Vets', 'Park Slope'] },
  { id:121, name:'Hope Animal Hospital', category:'Vets', neighborhood:'Park Slope', address:'390 Atlantic Ave, Brooklyn, NY 11217', rating:4.7, reviews:0, mobile:false, featured:false, desc:'AAHA-accredited veterinary hospital serving Park Slope, Carroll Gardens, and Cobble Hill since 2003.', phone:'+1 718-852-4219', website:'https://vcahospitals.com/hope', booking:'https://vcahospitals.com/hope', tags:['Vets', 'Park Slope'] },
  { id:122, name:'Cobble Hill Animal Hospital', category:'Vets', neighborhood:'Park Slope', address:'345 Schermerhorn St, Brooklyn, NY 11217', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service veterinary hospital serving Cobble Hill, Boerum Hill, and Park Slope.', phone:'+1 718-643-8500', website:'', booking:'', tags:['Vets', 'Park Slope'] },
  { id:123, name:'Bond Vet Cobble Hill', category:'Vets', neighborhood:'DUMBO / Brooklyn Heights', address:'317 Atlantic Ave, Brooklyn, NY 11201', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Modern vet clinic in Cobble Hill with urgent care, wellness, surgery, and dental services.', phone:'+1 929-344-2226', website:'https://bondvet.com/c/cobble-hill-animal-hospital', booking:'https://bondvet.com/c/cobble-hill-animal-hospital', tags:['Vets', 'DUMBO / Brooklyn Heights'] },
  { id:124, name:'VERG Brooklyn Emergency Vet', category:'Vets', neighborhood:'DUMBO / Brooklyn Heights', address:'318 Warren St, Brooklyn, NY 11201', rating:4.7, reviews:0, mobile:false, featured:false, desc:'24-hour emergency and specialty veterinary hospital in Brooklyn Heights. Board-certified specialists.', phone:'+1 718-522-9400', website:'https://verg-brooklyn.com', booking:'', tags:['Vets', 'DUMBO / Brooklyn Heights'] },
  { id:125, name:'BluePearl Pet Hospital Brooklyn', category:'Vets', neighborhood:'Park Slope', address:'190 3rd Ave, Brooklyn, NY 11217', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Level II certified 24-hour emergency and specialty animal hospital in Gowanus. Surgery, neurology, oncology.', phone:'+1 718-522-9400', website:'https://bluepearlvet.com/hospital/brooklyn-ny', booking:'', tags:['Vets', 'Park Slope'] },
  { id:126, name:'Williamsburg Veterinary Clinic', category:'Vets', neighborhood:'Williamsburg', address:'117 Metropolitan Ave, Brooklyn, NY 11249', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service veterinary clinic in Williamsburg. Wellness, vaccines, diagnostics, and surgery.', phone:'+1 718-384-5858', website:'https://williamsburgvets.com', booking:'https://williamsburgvets.com', tags:['Vets', 'Williamsburg'] },
  { id:127, name:'Greenpoint Veterinary Hospital', category:'Vets', neighborhood:'Greenpoint', address:'111 Nassau Ave, Brooklyn, NY 11222', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service animal hospital in Greenpoint open 7 days a week including evenings.', phone:'+1 347-529-4345', website:'https://greenpointvet.com', booking:'', tags:['Vets', 'Greenpoint'] },
  { id:128, name:'Greenpoint Veterinary Care', category:'Vets', neighborhood:'Greenpoint', address:'211 McGuinness Blvd, Brooklyn, NY 11222', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Neighborhood veterinary practice in Greenpoint. Wellness, sick visits, and diagnostics.', phone:'+1 917-970-0950', website:'', booking:'', tags:['Vets', 'Greenpoint'] },
  { id:129, name:'All Creatures Veterinary Hospital', category:'Vets', neighborhood:'Prospect Heights', address:'643 Washington Ave, Brooklyn, NY 11238', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Comprehensive veterinary care in Prospect Heights. Serving Crown Heights, Bed-Stuy, and Clinton Hill.', phone:'+1 347-915-1420', website:'https://allcreaturesvetbrooklyn.com', booking:'', tags:['Vets', 'Prospect Heights'] },
  { id:130, name:'Prospect Heights Animal Hospital', category:'Vets', neighborhood:'Prospect Heights', address:'277 Flatbush Ave, Brooklyn, NY 11217', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service vet hospital with no appointment needed. Avian and exotic medicine, dentistry, and surgery.', phone:'+1 718-789-3647', website:'', booking:'', tags:['Vets', 'Prospect Heights'] },
  { id:131, name:'Franklin Ave Animal Hospital', category:'Vets', neighborhood:'Prospect Heights', address:'614 Franklin Ave, Brooklyn, NY 11238', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Neighborhood veterinary clinic on Franklin Ave serving Prospect Heights and Crown Heights.', phone:'+1 718-975-7080', website:'', booking:'', tags:['Vets', 'Prospect Heights'] },
  { id:132, name:'Crown Heights Animal Hospital', category:'Vets', neighborhood:'Prospect Heights', address:'753 Franklin Ave, Brooklyn, NY 11238', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service animal hospital serving Crown Heights, Prospect Heights, and Bed-Stuy.', phone:'+1 718-622-0052', website:'', booking:'', tags:['Vets', 'Prospect Heights'] },
  { id:133, name:'Bond Vet Bed-Stuy', category:'Vets', neighborhood:'Bed-Stuy', address:'1134 Fulton St, Brooklyn, NY 11216', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Modern vet clinic in Bed-Stuy with urgent care, wellness, surgery, and dental. Near Franklin Ave subway.', phone:'+1 929-399-2354', website:'https://bondvet.com/c/bed-stuy-animal-hospital', booking:'https://bondvet.com/c/bed-stuy-animal-hospital', tags:['Vets', 'Bed-Stuy'] },
  { id:134, name:'The Neighborhood Vet', category:'Vets', neighborhood:'Bushwick', address:'169 Central Ave, Brooklyn, NY 11221', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Board-certified emergency and critical care vet in Bushwick. Walk-ins welcome. In-home diagnostics available.', phone:'+1 718-456-2168', website:'', booking:'', tags:['Vets', 'Bushwick'] },
  { id:135, name:'Bushwick Veterinary Center', category:'Vets', neighborhood:'Bushwick', address:'4 Porter Ave, Brooklyn, NY 11237', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service veterinary clinic in Bushwick. Wellness, vaccines, and diagnostics.', phone:'+1 347-725-3900', website:'', booking:'', tags:['Vets', 'Bushwick'] },
  { id:136, name:'Heart of Brooklyn Veterinary Hospital', category:'Vets', neighborhood:'Prospect Heights', address:'944 Fulton St, Brooklyn, NY 11238', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service veterinary hospital offering medical, surgical, and critical care in Prospect Heights.', phone:'+1 718-636-4040', website:'https://heartofbrooklynveterinary.com', booking:'https://heartofbrooklynveterinary.com', tags:['Vets', 'Prospect Heights'] },
  { id:137, name:'One Love Animal Hospital', category:'Vets', neighborhood:'Park Slope', address:'277 Flatbush Ave, Brooklyn, NY 11217', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Comprehensive veterinary services in Brooklyn. Committed to keeping pets healthy and happy.', phone:'+1 718-789-4044', website:'https://onelovevet.com', booking:'https://onelovevet.com', tags:['Vets', 'Park Slope'] },
  { id:138, name:'Carroll Gardens Veterinary Group', category:'Vets', neighborhood:'Carroll Gardens', address:'455 Court St, Brooklyn, NY 11231', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service veterinary practice in Carroll Gardens. Routine check-ups, vaccines, and treatment.', phone:'+1 718-852-6700', website:'', booking:'', tags:['Vets', 'Carroll Gardens'] },
  { id:139, name:'Vetco Total Care Sunset Park', category:'Vets', neighborhood:'Sunset Park', address:'241 37th St, Brooklyn, NY 11232', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service veterinary hospital in Sunset Park. Routine wellness, vaccines, and comprehensive care.', phone:'+1 718-492-0800', website:'', booking:'', tags:['Vets', 'Sunset Park'] },
  { id:140, name:'Animal Clinic of Bay Ridge', category:'Vets', neighborhood:'Bay Ridge', address:'405 86th St, Brooklyn, NY 11209', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Small dog and cat practice in Bay Ridge since 1969. Preventive care, diagnostics, and surgery.', phone:'+1 718-833-0700', website:'https://animalclinicofbayridgebrooklyn.net', booking:'', tags:['Vets', 'Bay Ridge'] },
  { id:141, name:'Pure Paws Veterinary Care Clinton Hill', category:'Vets', neighborhood:'Fort Greene', address:'476 Myrtle Ave, Brooklyn, NY 11205', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Neighborhood veterinary clinic in Clinton Hill serving Fort Greene, Bed-Stuy, and surrounding areas.', phone:'+1 718-360-6677', website:'', booking:'', tags:['Vets', 'Fort Greene'] },
  { id:142, name:'Kensington Veterinary Clinic', category:'Vets', neighborhood:'Kensington', address:'290 McDonald Ave, Brooklyn, NY 11218', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Full-service veterinary clinic in Kensington. Wellness, vaccines, and diagnostic services.', phone:'+1 718-435-9100', website:'', booking:'', tags:['Vets', 'Kensington'] },
  { id:143, name:'Church Ave Animal Hospital', category:'Vets', neighborhood:'Kensington', address:'1103 Church Ave, Brooklyn, NY 11218', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Veterinary hospital on Church Ave serving Kensington and Flatbush pet owners.', phone:'+1 718-284-2100', website:'', booking:'', tags:['Vets', 'Kensington'] },
  { id:144, name:'Flatbush Veterinary Clinic', category:'Vets', neighborhood:'Flatbush', address:'764 Flatbush Ave, Brooklyn, NY 11226', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Community veterinary clinic on Flatbush Ave. Wellness exams, vaccines, and general care.', phone:'+1 718-282-0800', website:'', booking:'', tags:['Vets', 'Flatbush'] },
  { id:145, name:'5th Ave Veterinary Practice', category:'Vets', neighborhood:'Park Slope', address:'708 5th Ave, Brooklyn, NY 11215', rating:4.7, reviews:0, mobile:false, featured:false, desc:'Neighborhood veterinary practice on 5th Ave in Park Slope. Full wellness and diagnostic services.', phone:'+1 718-788-9099', website:'', booking:'', tags:['Vets', 'Park Slope'] }
]

// ─── CALCULATORS ──────────────────────────────────────────────────────────────
const AnnualCostCalc = () => {
  const [breed, setBreed] = useState('medium')
  const [lifestyle, setLifestyle] = useState('moderate')
  const [borough, setBorough] = useState('brooklyn')
  const [hasInsurance, setHasInsurance] = useState(0)

  const baseCosts = {
    small:  { food:600, vet:800, grooming:600 },
    medium: { food:900, vet:900, grooming:500 },
    large:  { food:1400, vet:1100, grooming:600 },
  }
  const lifestyleMult = { budget:0.75, moderate:1.0, premium:1.4 }
  const boroughMult = { brooklyn:1.0, manhattan:1.2, queens:0.9 }
  const b = baseCosts[breed]
  const lm = lifestyleMult[lifestyle]
  const bm = boroughMult[borough]
  const food = Math.round(b.food * lm * bm)
  const vet = Math.round(b.vet * bm)
  const grooming = Math.round(b.grooming * lm * bm)
  const walking = lifestyle === 'premium' ? 3600 : lifestyle === 'moderate' ? 1800 : 600
  const supplies = Math.round(400 * lm)
  const insurance = hasInsurance * 600
  const total = food + vet + grooming + walking + supplies + insurance

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Annual Dog Ownership Cost</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>See a realistic annual cost breakdown for owning a dog in NYC based on your situation.</p>
      <SelectRow label="Dog size" value={breed} onChange={setBreed} options={[{value:'small',label:'Small (under 20 lbs)'},{value:'medium',label:'Medium (20–60 lbs)'},{value:'large',label:'Large (60+ lbs)'}]} />
      <SelectRow label="Lifestyle" value={lifestyle} onChange={setLifestyle} options={[{value:'budget',label:'Budget-conscious'},{value:'moderate',label:'Moderate'},{value:'premium',label:'Premium / spoiled'}]} />
      <SelectRow label="Borough" value={borough} onChange={setBorough} options={[{value:'brooklyn',label:'Brooklyn'},{value:'manhattan',label:'Manhattan'},{value:'queens',label:'Queens / Other boroughs'}]} />
      <SliderRow label="Pet insurance" value={hasInsurance} min={0} max={1} step={1} onChange={setHasInsurance} format={v => v ? 'Yes (~$50/mo)' : 'No'} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
        <Stat label="Food" value={fmt$(food)} sub="per year" />
        <Stat label="Vet care" value={fmt$(vet)} sub="per year" />
        <Stat label="Grooming" value={fmt$(grooming)} sub="per year" />
        <Stat label="Walking" value={fmt$(walking)} sub="per year" />
        <Stat label="Supplies" value={fmt$(supplies)} sub="per year" />
        {hasInsurance ? <Stat label="Insurance" value={fmt$(insurance)} sub="per year" /> : <Stat label="Insurance" value="$0" sub="not included" />}
      </div>
      <Stat label="Estimated Total Annual Cost" value={fmt$(total)} sub={`≈ ${fmt$(Math.round(total/12))}/month`} accent />
      <AffiliateCTA title="Save on pet supplies" desc="Amazon Subscribe & Save and Chewy Autoship can cut your annual food and supply costs by 15–25%." links={[{name:'Chewy',url:'https://chewy.com'},{name:'Amazon Pet',url:'https://amazon.com/pet-supplies'}]} />
    </div>
  )
}

const DogFoodCalc = () => {
  const [weight, setWeight] = useState(30)
  const [age, setAge] = useState('adult')
  const [activity, setActivity] = useState('moderate')
  const [foodCost, setFoodCost] = useState(2.5)

  const rer = 70 * Math.pow(weight * 0.453592, 0.75)
  const factors = { puppy: 3.0, adult: { low:1.4, moderate:1.6, high:1.8, working:2.0 }, senior:1.2 }
  const factor = age === 'adult' ? factors.adult[activity] : factors[age]
  const dailyKcal = Math.round(rer * factor)
  const cupPerDay = (dailyKcal / 350).toFixed(1)
  const lbsPerMonth = Math.round((dailyKcal / 350) * 30 * 0.25)
  const monthlyCost = Math.round(lbsPerMonth * foodCost)

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Dog Food Calculator</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>Calculate how much your dog should eat daily and what it costs per month.</p>
      <SliderRow label="Dog weight (lbs)" value={weight} min={5} max={150} step={5} onChange={setWeight} format={v => v + ' lbs'} minLabel="5 lbs" maxLabel="150 lbs" />
      <SelectRow label="Life stage" value={age} onChange={setAge} options={[{value:'puppy',label:'Puppy (under 1 year)'},{value:'adult',label:'Adult (1–7 years)'},{value:'senior',label:'Senior (7+ years)'}]} />
      {age === 'adult' && <SelectRow label="Activity level" value={activity} onChange={setActivity} options={[{value:'low',label:'Low (mostly indoors)'},{value:'moderate',label:'Moderate (daily walks)'},{value:'high',label:'High (very active)'},{value:'working',label:'Working dog'}]} />}
      <SliderRow label="Food cost per lb ($)" value={foodCost} min={0.5} max={8} step={0.5} onChange={setFoodCost} format={v => '$' + v.toFixed(2)} minLabel="Budget" maxLabel="Premium" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 8 }}>
        <Stat label="Daily calories" value={dailyKcal.toLocaleString()} sub="kcal/day" />
        <Stat label="Daily food" value={cupPerDay + ' cups'} sub="approx." />
        <Stat label="Monthly cost" value={fmt$(monthlyCost)} accent />
      </div>
      <AffiliateCTA title="Top-rated dog food" desc="Chewy and Amazon carry the top vet-recommended brands with auto-ship discounts." links={[{name:'Chewy',url:'https://chewy.com'},{name:'Amazon Pet',url:'https://amazon.com/pet-supplies'}]} />
    </div>
  )
}

const InsuranceCalc = () => {
  const [premium, setPremium] = useState(50)
  const [deductible, setDeductible] = useState(250)
  const [reimbursement, setReimbursement] = useState(80)
  const [vetBill, setVetBill] = useState(2000)

  const annualPremium = premium * 12
  const afterDeductible = Math.max(0, vetBill - deductible)
  const payout = afterDeductible * (reimbursement / 100)
  const outOfPocket = vetBill - payout
  const netSavings = vetBill - outOfPocket - annualPremium
  const breakevenBill = annualPremium / (reimbursement / 100) + deductible
  const worthIt = netSavings > 0

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Pet Insurance Value Calculator</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>See if pet insurance saves you money based on your policy and a potential vet bill.</p>
      <SliderRow label="Monthly premium" value={premium} min={20} max={150} step={5} onChange={setPremium} format={v => '$' + v + '/mo'} minLabel="$20" maxLabel="$150" />
      <SliderRow label="Annual deductible" value={deductible} min={0} max={1000} step={50} onChange={setDeductible} format={v => '$' + v} />
      <SliderRow label="Reimbursement rate" value={reimbursement} min={50} max={100} step={10} onChange={setReimbursement} format={v => v + '%'} />
      <SliderRow label="Hypothetical vet bill" value={vetBill} min={500} max={10000} step={250} onChange={setVetBill} format={v => '$' + v.toLocaleString()} minLabel="$500" maxLabel="$10,000" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <Stat label="Annual premium cost" value={fmt$(annualPremium)} />
        <Stat label="Insurance payout" value={fmt$(payout)} />
        <Stat label="Your out-of-pocket" value={fmt$(outOfPocket)} />
        <Stat label="Net savings vs no insurance" value={netSavings > 0 ? fmt$(netSavings) : '-' + fmt$(Math.abs(netSavings))} accent />
      </div>
      <div style={{ background: worthIt ? C.greenLight : C.redLight, border: `1px solid ${worthIt ? '#C0DD97' : '#F09595'}`, borderRadius: 10, padding: 14 }}>
        <p style={{ fontFamily: F.body, fontSize: 14, color: worthIt ? C.green : C.red, fontWeight: 500, marginBottom: 4 }}>
          {worthIt ? `✓ Insurance saves you ${fmt$(netSavings)} on this bill.` : `✗ Insurance costs more than it saves for this bill size.`}
        </p>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 0 }}>
          Your break-even point: a vet bill of {fmt$(Math.round(breakevenBill))} or more makes insurance worth it annually.
        </p>
      </div>
      <AffiliateCTA title="Compare pet insurance plans" desc="Lemonade and Trupanion are highly rated for NYC pet owners. Get a quote in under 2 minutes." links={[{name:'Lemonade Pet',url:'https://lemonade.com/pet'},{name:'Trupanion',url:'https://trupanion.com'},{name:'Healthy Paws',url:'https://healthypawspetinsurance.com'}]} />
    </div>
  )
}

const VetBudgetCalc = () => {
  const [size, setSize] = useState('medium')
  const [age, setAge] = useState('adult')
  const [emergencyFund, setEmergencyFund] = useState(12)

  const routine = { small:{puppy:900,adult:650,senior:900}, medium:{puppy:1000,adult:750,senior:1050}, large:{puppy:1100,adult:850,senior:1200} }
  const emergency = { small:2500, medium:3500, large:5000 }
  const routineCost = routine[size][age]
  const emergCost = emergency[size]
  const monthlySet = Math.round(emergCost / emergencyFund)
  const total = routineCost + (monthlySet * 12)

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Vet Budget Planner</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>Plan your routine vet costs and build an emergency fund for unexpected bills in NYC.</p>
      <SelectRow label="Dog size" value={size} onChange={setSize} options={[{value:'small',label:'Small'},{value:'medium',label:'Medium'},{value:'large',label:'Large'}]} />
      <SelectRow label="Life stage" value={age} onChange={setAge} options={[{value:'puppy',label:'Puppy'},{value:'adult',label:'Adult'},{value:'senior',label:'Senior'}]} />
      <SliderRow label="Months to build emergency fund" value={emergencyFund} min={6} max={36} step={3} onChange={setEmergencyFund} format={v => v + ' months'} minLabel="6 mo" maxLabel="3 yrs" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <Stat label="Routine annual vet cost" value={fmt$(routineCost)} sub="NYC estimate" />
        <Stat label="Emergency fund target" value={fmt$(emergCost)} sub="recommended" />
        <Stat label="Monthly savings needed" value={fmt$(monthlySet)} sub="for emergency fund" accent />
        <Stat label="Total first-year budget" value={fmt$(total)} sub="routine + saving" />
      </div>
      <AffiliateCTA title="Find a vet in Brooklyn" desc="Use our directory to find a highly-rated vet in your neighborhood." links={[{name:'Browse Brooklyn Vets',url:'#directory'}]} />
    </div>
  )
}

const WalkerVsBoardingCalc = () => {
  const [walksPerWeek, setWalksPerWeek] = useState(5)
  const [walkCost, setWalkCost] = useState(25)
  const [boardingNights, setBoardingNights] = useState(14)
  const [boardingRate, setBoardingRate] = useState(65)

  const annualWalking = walksPerWeek * 52 * walkCost
  const annualBoarding = boardingNights * boardingRate
  const annualTotal = annualWalking + annualBoarding
  const monthlyAvg = Math.round(annualTotal / 12)

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Dog Walker vs Boarding Cost</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>Estimate your annual spending on dog walking and boarding combined.</p>
      <SliderRow label="Walks per week" value={walksPerWeek} min={1} max={14} step={1} onChange={setWalksPerWeek} format={v => v + ' walks'} minLabel="1" maxLabel="14" />
      <SliderRow label="Cost per walk" value={walkCost} min={15} max={60} step={5} onChange={setWalkCost} format={v => '$' + v} minLabel="$15" maxLabel="$60" />
      <SliderRow label="Boarding nights per year" value={boardingNights} min={0} max={60} step={1} onChange={setBoardingNights} format={v => v + ' nights'} minLabel="0" maxLabel="60" />
      <SliderRow label="Boarding rate per night" value={boardingRate} min={35} max={150} step={5} onChange={setBoardingRate} format={v => '$' + v + '/night'} minLabel="$35" maxLabel="$150" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 8 }}>
        <Stat label="Annual walking" value={fmt$(annualWalking)} />
        <Stat label="Annual boarding" value={fmt$(annualBoarding)} />
        <Stat label="Monthly average" value={fmt$(monthlyAvg)} accent />
      </div>
      <AffiliateCTA title="Find walkers & boarding in Brooklyn" desc="Browse verified dog walkers and boarding providers near you." links={[{name:'Browse Walkers',url:'#directory'},{name:'Browse Boarding',url:'#directory'}]} />
    </div>
  )
}

const PuppyFirstYearCalc = () => {
  const [size, setSize] = useState('medium')
  const [spayNeuter, setSpayNeuter] = useState(1)
  const [training, setTraining] = useState(1)

  const costs = {
    small:  { vet:1200, food:500, supplies:600, grooming:400 },
    medium: { vet:1400, food:800, supplies:700, grooming:350 },
    large:  { vet:1600, food:1200, supplies:800, grooming:400 },
  }
  const c = costs[size]
  const spayNeuterCost = spayNeuter * (size === 'small' ? 300 : size === 'medium' ? 400 : 500)
  const trainingCost = training * 600
  const licenses = 34
  const microchip = 50
  const total = c.vet + c.food + c.supplies + c.grooming + spayNeuterCost + trainingCost + licenses + microchip

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Puppy First Year Calculator</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>The first year with a puppy costs significantly more than ongoing years. Here's the full picture for NYC.</p>
      <SelectRow label="Dog size" value={size} onChange={setSize} options={[{value:'small',label:'Small'},{value:'medium',label:'Medium'},{value:'large',label:'Large'}]} />
      <SliderRow label="Include spay/neuter" value={spayNeuter} min={0} max={1} step={1} onChange={setSpayNeuter} format={v => v ? 'Yes' : 'No'} />
      <SliderRow label="Include puppy training classes" value={training} min={0} max={1} step={1} onChange={setTraining} format={v => v ? 'Yes' : 'No'} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
        <Stat label="Vet (incl. vaccines)" value={fmt$(c.vet)} />
        <Stat label="Food" value={fmt$(c.food)} />
        <Stat label="Supplies & gear" value={fmt$(c.supplies)} />
        <Stat label="Grooming" value={fmt$(c.grooming)} />
        {spayNeuter ? <Stat label="Spay/neuter" value={fmt$(spayNeuterCost)} /> : null}
        {training ? <Stat label="Training classes" value={fmt$(trainingCost)} /> : null}
      </div>
      <Stat label="Total First Year Cost (NYC)" value={fmt$(total)} sub="before walking, boarding, or insurance" accent />
      <AffiliateCTA title="New puppy checklist" desc="Get everything your puppy needs from Chewy's new puppy guide." links={[{name:'Chewy New Puppy',url:'https://chewy.com'},{name:'Amazon Puppy',url:'https://amazon.com'}]} />
    </div>
  )
}

const GroomingCostCalc = () => {
  const [coatType, setCoatType] = useState('medium')
  const [size, setSize] = useState('medium')
  const [freq, setFreq] = useState('6')

  const baseByCoat = {
    short:  { small:55,  medium:70,  large:85  },
    medium: { small:70,  medium:90,  large:115 },
    long:   { small:85,  medium:115, large:145 },
    curly:  { small:95,  medium:130, large:160 },
    double: { small:80,  medium:105, large:135 },
  }
  const freqNum = parseInt(freq)
  const perVisit = baseByCoat[coatType][size]
  const annual = perVisit * freqNum
  const brushSessions = freqNum > 6 ? 0 : Math.max(0, 12 - freqNum) * 15
  const totalAnnual = annual + brushSessions

  const coatLabels = { short:'Short coat', medium:'Medium coat', long:'Long / silky coat', curly:'Curly / wavy (Doodle, Poodle)', double:'Double coat (Husky, Lab, Golden)' }
  const freqLabel = { '12':'Monthly','9':'Every 5–6 weeks','6':'Every 8 weeks','4':'Every 3 months','2':'Twice a year' }

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Grooming Cost Estimator</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>Estimate your annual grooming costs in Brooklyn based on your dog's coat, size, and how often they need professional grooming.</p>
      <SelectRow label="Coat type" value={coatType} onChange={setCoatType} options={[
        {value:'short',label:'Short coat (Beagle, Boxer, Dalmatian)'},
        {value:'medium',label:'Medium coat (Labrador, Border Collie)'},
        {value:'long',label:'Long / silky coat (Shih Tzu, Maltese, Yorkie)'},
        {value:'curly',label:'Curly / wavy coat (Doodle, Poodle, Bichon)'},
        {value:'double',label:'Double coat (Husky, Golden, Aussie)'},
      ]} />
      <SelectRow label="Dog size" value={size} onChange={setSize} options={[
        {value:'small',label:'Small (under 20 lbs)'},
        {value:'medium',label:'Medium (20–60 lbs)'},
        {value:'large',label:'Large (60+ lbs)'},
      ]} />
      <SelectRow label="Grooming frequency" value={freq} onChange={setFreq} options={[
        {value:'12',label:'Monthly (every 4 weeks)'},
        {value:'9',label:'Every 5–6 weeks'},
        {value:'6',label:'Every 8 weeks'},
        {value:'4',label:'Every 3 months'},
        {value:'2',label:'Twice a year'},
      ]} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
        <Stat label="Cost per visit" value={fmt$(perVisit)} sub="Brooklyn avg" />
        <Stat label="Visits per year" value={freqNum} sub={freqLabel[freq]} />
        <Stat label="Grooming annual" value={fmt$(annual)} />
      </div>
      {brushSessions > 0 && (
        <div style={{ background: C.amberLight, border: `1px solid ${C.amberBorder}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
          <p style={{ fontFamily: F.body, fontSize: 13, color: C.amberDark, marginBottom: 0 }}>
            At {freqLabel[freq].toLowerCase()} grooming intervals, add ~{fmt$(brushSessions)}/yr for professional brush-out sessions between appointments to prevent matting.
          </p>
        </div>
      )}
      <Stat label="Estimated Total Annual Grooming Cost" value={fmt$(totalAnnual)} sub="Brooklyn pricing — excludes tips (15–20% standard)" accent />
      <AffiliateCTA title="Find a Brooklyn groomer" desc="Browse 22 verified grooming salons across Brooklyn — filter by neighborhood to find one near you." links={[{name:'Browse Groomers',url:'/directory/groomers'},{name:'Williamsburg Groomers',url:'/directory/williamsburg'},{name:'Park Slope Groomers',url:'/directory/park-slope'}]} />
    </div>
  )
}

const VaccineScheduleCalc = () => {
  const [lifeStage, setLifeStage] = useState('adult')
  const [lifestyle, setLifestyle] = useState('moderate')
  const [age, setAge] = useState(3)

  const vaccines = {
    puppy: [
      { name:'DHPP Series', required:true, freq:'3–4 doses, 3–4 weeks apart', note:'Core puppy series starting at 6–8 weeks' },
      { name:'Bordetella', required:true, freq:'Once, then annually', note:'Required by all Brooklyn daycare & boarding' },
      { name:'Rabies', required:true, freq:'Once at 12+ weeks, booster at 1yr', note:'NYC law — required for dog license' },
      { name:'Leptospirosis', required:lifestyle==='outdoor'||lifestyle==='moderate', freq:'2-dose series then annually', note:'Strongly recommended — NYC rat exposure risk' },
      { name:'Lyme', required:lifestyle==='outdoor', freq:'2-dose series then annually', note:'If visiting parks or wooded areas regularly' },
    ],
    adult: [
      { name:'Rabies', required:true, freq:'Every 3 years', note:'NYC law — keep certificate current for license' },
      { name:'DHPP Booster', required:true, freq:'Every 1–3 years', note:'Every 3 years after initial adult booster' },
      { name:'Bordetella', required:true, freq:'Every 6–12 months', note:'Required by daycare, boarding, and most groomers' },
      { name:'Leptospirosis', required:lifestyle==='outdoor'||lifestyle==='moderate', freq:'Annually', note:'NYC rat exposure — most Brooklyn vets recommend' },
      { name:'Lyme', required:lifestyle==='outdoor', freq:'Annually', note:'If regular park exposure' },
      { name:'Canine Influenza', required:lifestyle==='boarding', freq:'2-dose series then annually', note:'Some Brooklyn boarding facilities now require it' },
    ],
    senior: [
      { name:'Rabies', required:true, freq:'Every 3 years', note:'Required by law regardless of age' },
      { name:'DHPP Booster', required:true, freq:'Every 3 years', note:'Some vets may titre test instead of booster' },
      { name:'Bordetella', required:true, freq:'Every 6–12 months', note:'Required by any facility you use' },
      { name:'Leptospirosis', required:lifestyle!=='indoor', freq:'Annually', note:'Immune response may be lower — discuss with vet' },
      { name:'Wellness bloodwork', required:false, freq:'Every 6 months recommended', note:'Seniors benefit from more frequent screening' },
    ],
  }

  const current = vaccines[lifeStage]
  const estCost = lifeStage === 'puppy' ? 380 : lifeStage === 'senior' ? 320 : 280
  const extraCost = lifestyle === 'outdoor' ? 60 : lifestyle === 'boarding' ? 80 : 0

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>NYC Dog Vaccine Schedule</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>Get your dog's NYC-specific vaccine schedule based on life stage and lifestyle — including what Brooklyn facilities require.</p>
      <SelectRow label="Life stage" value={lifeStage} onChange={setLifeStage} options={[
        {value:'puppy',label:'Puppy (under 1 year)'},
        {value:'adult',label:'Adult (1–7 years)'},
        {value:'senior',label:'Senior (7+ years)'},
      ]} />
      <SelectRow label="Lifestyle" value={lifestyle} onChange={setLifestyle} options={[
        {value:'indoor',label:'Mostly indoor / minimal park time'},
        {value:'moderate',label:'Regular walks + dog parks'},
        {value:'outdoor',label:'High outdoor exposure / off-leash parks'},
        {value:'boarding',label:'Frequent boarding / daycare'},
      ]} />
      <div style={{ marginBottom: 20 }}>
        {current.map(v => (
          <div key={v.name} style={{ background: v.required ? C.bgWhite : C.bgSection, border: `1px solid ${v.required ? C.amberBorder : C.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: v.required ? C.amber : C.textMuted, marginTop: 5, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 3 }}>
                <span style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.text }}>{v.name}</span>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: v.required ? C.amber : C.textMuted, background: v.required ? C.amberLight : C.bgSection, border: `1px solid ${v.required ? C.amberBorder : C.border}`, borderRadius: 20, padding: '2px 10px' }}>{v.required ? 'Required' : 'Optional'}</span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 12, color: C.blue, marginBottom: 3 }}>{v.freq}</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted }}>{v.note}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <Stat label="Est. annual vaccine cost" value={fmt$(estCost + extraCost)} sub="Brooklyn vet pricing" />
        <Stat label="Wellness exam included" value="$80–$120" sub="separate from vaccines" accent />
      </div>
      <div style={{ background: C.blueLight, border: `1px solid ${C.blueBorder}`, borderRadius: 10, padding: 12, marginBottom: 16 }}>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.blueDark, marginBottom: 0 }}>
          <strong>NYC reminder:</strong> Your dog license requires a current rabies certificate. Keep a photo of all vaccine records in your phone — most Brooklyn groomers, daycares, and boarding facilities need them at check-in.
        </p>
      </div>
      <AffiliateCTA title="Find a Brooklyn vet" desc="Get your dog's vaccines updated at a verified Brooklyn veterinary clinic near you." links={[{name:'Browse Vets',url:'/directory/vets'},{name:'Vaccine Guide',url:'/dog-vaccines-nyc'}]} />
    </div>
  )
}

const BoardingVsSitterCalc = () => {
  const [nights, setNights] = useState(7)
  const [dogs, setDogs] = useState(1)
  const [boardingType, setBoardingType] = useState('facility')
  const [sitterType, setSitterType] = useState('inhome')

  const boardingRates = { facility:85, luxury:120, vet:110, daycare:75 }
  const sitterRates = { inhome:85, housesit:120, dropin:35 }

  const boardingCost = boardingRates[boardingType] * nights * dogs
  const sitterCost = sitterType === 'dropin'
    ? sitterRates.dropin * Math.ceil(nights * 3) * dogs
    : sitterRates[sitterType] * nights

  const cheaper = boardingCost < sitterCost ? 'boarding' : 'sitter'
  const diff = Math.abs(boardingCost - sitterCost)

  const boardingLabels = { facility:'Standard facility ($85/night)', luxury:'Luxury hotel-style ($120/night)', vet:'Vet-supervised boarding ($110/night)', daycare:'Daycare + boarding ($75/night)' }
  const sitterLabels = { inhome:'In-home pet sitter ($85/night)', housesit:'House-sitter stays with dog ($120/night)', dropin:'Drop-in visits only ($35/visit, 3x/day)' }

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Boarding vs Sitter Cost</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>Compare the real cost of Brooklyn facility boarding vs a professional pet sitter for your next trip.</p>
      <SliderRow label="Trip length (nights)" value={nights} min={1} max={30} step={1} onChange={setNights} format={v => v + ' nights'} minLabel="1 night" maxLabel="30 nights" />
      <SliderRow label="Number of dogs" value={dogs} min={1} max={4} step={1} onChange={setDogs} format={v => v === 1 ? '1 dog' : v + ' dogs'} minLabel="1" maxLabel="4" />
      <SelectRow label="Boarding option" value={boardingType} onChange={setBoardingType} options={[
        {value:'facility', label:'Standard facility ($85/night)'},
        {value:'daycare',  label:'Daycare + boarding ($75/night)'},
        {value:'luxury',   label:'Luxury hotel-style ($120/night)'},
        {value:'vet',      label:'Vet-supervised ($110/night)'},
      ]} />
      <SelectRow label="Sitter option" value={setSitterType} onChange={setSitterType} options={[
        {value:'inhome',   label:'In-home sitter at your place ($85/night)'},
        {value:'housesit', label:'House-sitter stays with dog ($120/night)'},
        {value:'dropin',   label:'Drop-in visits only ($35 × 3/day)'},
      ]} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <Stat label="Facility boarding" value={fmt$(boardingCost)} sub={`${nights} nights × $${boardingRates[boardingType]}`} accent={cheaper==='boarding'} />
        <Stat label="Pet sitter" value={fmt$(sitterCost)} sub={sitterType==='dropin' ? `${Math.ceil(nights*3)} visits` : `${nights} nights`} accent={cheaper==='sitter'} />
      </div>
      <div style={{ background: cheaper === 'boarding' ? C.blueLight : C.greenLight, border: `1px solid ${cheaper === 'boarding' ? C.blueBorder : '#C0DD97'}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <p style={{ fontFamily: F.body, fontSize: 14, color: cheaper === 'boarding' ? C.blue : C.green, fontWeight: 500, marginBottom: 4 }}>
          {cheaper === 'boarding' ? `✓ Facility boarding saves you ${fmt$(diff)} on this trip.` : `✓ A pet sitter saves you ${fmt$(diff)} on this trip.`}
        </p>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 0 }}>
          {dogs > 1 ? `Note: sitters typically charge per-household, not per-dog — boarding costs scale linearly with dog count.` : `Cost aside, consider your dog's personality: social dogs often thrive in facility boarding; anxious dogs do better with in-home sitters.`}
        </p>
      </div>
      <AffiliateCTA title="Find Brooklyn boarding or sitters" desc="Browse 24 verified boarding facilities across Brooklyn neighborhoods." links={[{name:'Browse Boarding',url:'/directory/boarding'},{name:'Boarding Guide',url:'/dog-boarding-brooklyn-guide'}]} />
    </div>
  )
}

const ApartmentDogCalc = () => {
  const [sqft, setSqft] = useState(700)
  const [energy, setEnergy] = useState('moderate')
  const [hours, setHours] = useState(8)
  const [outdoor, setOutdoor] = useState('daily')
  const [experience, setExperience] = useState('first')

  const scores = {
    space: sqft >= 800 ? 3 : sqft >= 600 ? 2 : sqft >= 400 ? 1 : 0,
    energy: energy === 'low' ? 3 : energy === 'moderate' ? 2 : 1,
    hours: hours <= 4 ? 3 : hours <= 7 ? 2 : hours <= 9 ? 1 : 0,
    outdoor: outdoor === 'twice' ? 3 : outdoor === 'daily' ? 2 : 1,
    experience: experience === 'experienced' ? 2 : experience === 'some' ? 1 : 0,
  }
  const total = Object.values(scores).reduce((a,b) => a+b, 0)
  const max = 14

  const rating = total >= 11 ? 'Excellent' : total >= 8 ? 'Good' : total >= 5 ? 'Manageable' : 'Challenging'
  const ratingColor = total >= 11 ? C.green : total >= 8 ? C.blue : total >= 5 ? C.amber : C.red
  const ratingBg = total >= 11 ? C.greenLight : total >= 8 ? C.blueLight : total >= 5 ? C.amberLight : C.redLight

  const goodBreeds = total >= 8
    ? ['Greyhound / Whippet','French Bulldog','Cavalier King Charles Spaniel','Shih Tzu / Maltese','Basset Hound','Adult rescue (known temperament)']
    : total >= 5
    ? ['Shih Tzu','Cavalier King Charles Spaniel','Maltese','French Bulldog','Pug']
    : ['Consider a cat or low-maintenance breed','Shih Tzu','Chihuahua (with training)']

  const watchOut = energy === 'high'
    ? 'With high-energy preferences, a dog walker or daycare will be essential — budget $200–$400/month.'
    : hours >= 9
    ? 'At 9+ hours away daily, a midday dog walker or daycare is strongly recommended for most dogs.'
    : sqft < 500
    ? 'Under 500 sq ft, prioritize low-energy breeds and plan for significant outdoor time.'
    : 'Your setup looks solid for a well-matched breed.'

  return (
    <div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Apartment Dog Matcher</div>
      <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>Find out how well your NYC apartment lifestyle matches dog ownership — and which breeds are best suited to your setup.</p>
      <SliderRow label="Apartment size (sq ft)" value={sqft} min={300} max={1400} step={50} onChange={setSqft} format={v => v.toLocaleString() + ' sq ft'} minLabel="300" maxLabel="1,400" />
      <SelectRow label="Preferred energy level" value={energy} onChange={setEnergy} options={[
        {value:'low',      label:'Low energy — calm, relaxed, happy lounging'},
        {value:'moderate', label:'Moderate energy — daily walks, weekend adventures'},
        {value:'high',     label:'High energy — active owner, long runs, dog sports'},
      ]} />
      <SliderRow label="Hours away from home daily" value={hours} min={2} max={12} step={1} onChange={setHours} format={v => v + ' hours'} minLabel="2 hrs" maxLabel="12 hrs" />
      <SelectRow label="Outdoor access" value={outdoor} onChange={setOutdoor} options={[
        {value:'twice',   label:'Multiple times daily + dog park access'},
        {value:'daily',   label:'2–3 solid walks per day'},
        {value:'limited', label:'Limited — rely mostly on quick walks'},
      ]} />
      <SelectRow label="Dog ownership experience" value={experience} onChange={setExperience} options={[
        {value:'experienced', label:'Experienced — owned and trained multiple dogs'},
        {value:'some',        label:'Some experience — had a dog before'},
        {value:'first',       label:'First-time dog owner'},
      ]} />
      <div style={{ background: ratingBg, border: `1px solid ${ratingColor}20`, borderRadius: 12, padding: 20, marginBottom: 16, textAlign: 'center' }}>
        <div style={{ fontFamily: F.mono, fontSize: 12, color: ratingColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Apartment compatibility</div>
        <div style={{ fontFamily: F.display, fontSize: 32, fontWeight: 600, color: ratingColor, marginBottom: 6 }}>{rating}</div>
        <div style={{ fontFamily: F.body, fontSize: 13, color: C.textDim }}>{total} / {max} score</div>
      </div>
      <div style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Best breed matches for your setup</div>
        {goodBreeds.map(b => (
          <div key={b} style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, padding: '5px 0', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: C.amber }}>✓</span>{b}
          </div>
        ))}
      </div>
      <div style={{ background: C.amberLight, border: `1px solid ${C.amberBorder}`, borderRadius: 10, padding: 12, marginBottom: 16 }}>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.amberDark, marginBottom: 0 }}>💡 {watchOut}</p>
      </div>
      <AffiliateCTA title="Find Brooklyn trainers and services" desc="Browse trainers, dog walkers, and daycare across Brooklyn to support your new dog." links={[{name:'Browse Trainers',url:'/directory/trainers'},{name:'Dog Walkers',url:'/directory/dog-walkers'},{name:'Apartment Dog Guide',url:'/best-dogs-nyc-apartments'}]} />
    </div>
  )
}

const tools = [
  { id:'annual',    label:'Annual Ownership Cost',   icon:'🐾', component:AnnualCostCalc },
  { id:'food',      label:'Dog Food Calculator',      icon:'🥣', component:DogFoodCalc },
  { id:'insurance', label:'Pet Insurance Value',      icon:'🛡️', component:InsuranceCalc },
  { id:'vet',       label:'Vet Budget Planner',       icon:'🏥', component:VetBudgetCalc },
  { id:'walking',   label:'Walker vs Boarding Cost',  icon:'🦮', component:WalkerVsBoardingCalc },
  { id:'puppy',     label:'Puppy First Year',         icon:'🐶', component:PuppyFirstYearCalc },
  { id:'grooming',  label:'Grooming Cost Estimator',  icon:'✂️', component:GroomingCostCalc },
  { id:'vaccines',  label:'NYC Vaccine Schedule',     icon:'💉', component:VaccineScheduleCalc },
  { id:'sitter',    label:'Boarding vs Sitter Cost',  icon:'🏡', component:BoardingVsSitterCalc },
  { id:'apartment', label:'Apartment Dog Matcher',    icon:'🏢', component:ApartmentDogCalc },
]

// ─── ARTICLES ─────────────────────────────────────────────────────────────────
const articles = [
  {
    id: 'cost-of-owning-dog-nyc',
    title: 'How Much Does It Really Cost to Own a Dog in NYC?',
    tag: 'COSTS',
    desc: 'From food to vet bills to dog walkers — the honest annual number for NYC dog ownership.',
    content: () => (
      <>
        <p>Owning a dog in New York City costs between $3,000 and $8,000+ per year depending on the dog's size, your lifestyle, and your neighborhood. Manhattan runs the highest. Brooklyn sits in the middle. Queens tends to be the most affordable borough for pet ownership costs.</p>
        <h3>The Big Five Costs</h3>
        <p><strong>Food:</strong> $600–$1,400/year depending on size and quality. Premium grain-free kibble runs 2–3x the price of standard brands.</p>
        <p><strong>Veterinary care:</strong> $700–$1,200/year for routine wellness. Budget an additional $2,000–$5,000 emergency fund — it's not if, it's when.</p>
        <p><strong>Dog walking:</strong> NYC dog walkers charge $25–$45 per 30-minute walk. Five walks a week adds up to $6,500–$11,700 annually — often the single largest line item.</p>
        <p><strong>Grooming:</strong> $350–$700/year for most breeds. Double-coated and long-haired breeds cost more and need grooming every 6–8 weeks.</p>
        <p><strong>Boarding:</strong> $55–$120/night in Brooklyn. For two weeks of vacation per year, that's $770–$1,680 annually.</p>
        <h3>The NYC Premium</h3>
        <p>Every service costs 20–40% more in NYC than the national average. Dog walking is the biggest example — the national average is around $20/walk; in Brooklyn it starts at $25 and often runs $35+ for solo walks.</p>
        <FAQItem q="Is it cheaper to own a dog in Brooklyn vs Manhattan?" a="Yes, noticeably. Grooming, boarding, and training services in Brooklyn typically run 15–25% less than equivalent services in Manhattan. Dog walkers are similarly priced, but Brooklyn has more competitive options." />
        <FAQItem q="What's the cheapest dog to own in NYC?" a="Smaller dogs are cheaper across almost every category — less food, lower vet costs, cheaper boarding, and often lower grooming costs. Mixed breeds also tend to have fewer hereditary health issues than purebreds, reducing lifetime vet costs." />
      </>
    )
  },
  {
    id: 'dog-friendly-parks-brooklyn',
    title: 'Best Dog-Friendly Parks in Brooklyn (With Off-Leash Hours)',
    tag: 'BROOKLYN',
    desc: 'Prospect Park, McCarren Park, and 6 more spots where your dog can actually run free.',
    content: () => (
      <>
        <p>Brooklyn has some of the best urban dog parks in the country — if you know where to go and when. Off-leash hours vary by park and season, so knowing the rules saves you from unnecessary fines.</p>
        <h3>Prospect Park</h3>
        <p>The crown jewel of Brooklyn dog parks. Off-leash hours are 9pm–9am daily, plus all day in designated off-leash areas near the Long Meadow and Nethermead. Free, massive, and perfect for high-energy dogs. The park also has a dedicated dog beach area near the Boathouse.</p>
        <h3>McCarren Park (Williamsburg/Greenpoint)</h3>
        <p>A dedicated fenced dog run near the Driggs Ave entrance. No off-leash hours needed — the run is enclosed. Popular with the Williamsburg crowd. Gets crowded on weekends; best on weekday mornings.</p>
        <h3>Fort Greene Park</h3>
        <p>A hilly, wooded park popular with Fort Greene and Clinton Hill dog owners. Off-leash hours 9pm–9am. The elevated sections give you a break from the flat streetscape.</p>
        <h3>Owl's Head Park (Bay Ridge)</h3>
        <p>Waterfront park with stunning views of the harbor. Dedicated dog run near the main entrance. Less crowded than Prospect Park, great for dogs who get overwhelmed by large groups.</p>
        <FAQItem q="Do I need a permit to use off-leash areas in Brooklyn?" a="No permit is required for off-leash hours in NYC parks. Your dog must be licensed with NYC (required by law — $8.50/year for spayed/neutered dogs, $34/year otherwise) and vaccinated." />
        <FAQItem q="What's the fine for off-leash violations in NYC?" a="$100 for a first offense in areas and hours where leashes are required. NYC parks enforcement does ticket, particularly in heavily-used parks like Prospect Park during peak daytime hours." />
      </>
    )
  },
  {
    id: 'find-dog-groomer-brooklyn',
    title: 'How to Find a Trustworthy Dog Groomer in Brooklyn',
    tag: 'GROOMING',
    desc: 'What to look for, what to ask, and the red flags that tell you to walk away.',
    content: () => (
      <>
        <p>A good groomer is one of the most important relationships you'll build as a dog owner in NYC. The wrong one can traumatize your dog, damage their coat, or — in rare but real cases — cause injury. Here's how to find the right one.</p>
        <h3>What to Look For</h3>
        <p><strong>Transparent practices:</strong> A good groomer will let you watch the process, at least for the first session. Anyone who refuses to let you observe your dog at any point is a red flag.</p>
        <p><strong>Fear-free approach:</strong> Ask directly — "how do you handle anxious dogs?" Look for answers that mention patience, breaks, and positive reinforcement. Avoid anyone who mentions muzzle use as a first resort.</p>
        <p><strong>Cage-free options:</strong> Some Brooklyn groomers offer cage-free grooming where dogs aren't kenneled between services. Worth paying more for anxious dogs.</p>
        <h3>What to Ask Before Booking</h3>
        <p>What products do you use? How long will the appointment take? Do you do the full groom yourself or hand off mid-process? What happens if my dog is too anxious to complete the groom?</p>
        <h3>Red Flags</h3>
        <p>Refusing to show you the space. Vague answers about products. No reviews or only generic 5-star reviews with no detail. Significantly lower prices than the market rate.</p>
        <FAQItem q="How often should I groom my dog?" a="Double-coated dogs need brushing 2–3x per week and professional grooming 2–4x per year. Long-haired breeds need professional grooming every 6–8 weeks. Short-haired dogs can often go 3–4 months between professional sessions." />
        <FAQItem q="What's a fair price for grooming in Brooklyn?" a="Expect $60–$100 for a small dog, $80–$130 for a medium dog, and $100–$160 for a large dog. Mobile grooming runs $20–$40 higher than salon grooming due to convenience." />
      </>
    )
  },
  {
    id: 'is-pet-insurance-worth-it',
    title: 'Is Pet Insurance Worth It in NYC? The Honest Math',
    tag: 'INSURANCE',
    desc: "Pet insurance sounds smart, but the math isn't always obvious. Here's how to run it.",
    content: () => (
      <>
        <p>Pet insurance can save you thousands — or cost you more than you'd ever spend at the vet. Whether it makes sense depends on your dog's breed, your financial situation, and how you think about risk.</p>
        <h3>When Pet Insurance Makes Sense</h3>
        <p>Purebred dogs with known health risks (French Bulldogs, Cavalier King Charles Spaniels, German Shepherds). Young dogs where you're locking in a low rate before pre-existing conditions develop. Owners who don't have a $3,000–$5,000 emergency fund available.</p>
        <h3>When It Probably Doesn't</h3>
        <p>Healthy mixed breeds. Older dogs where premiums are high and pre-existing conditions are excluded. Owners who could self-insure by putting $100–$150/month into a dedicated pet savings account.</p>
        <h3>The NYC Factor</h3>
        <p>Emergency vet care in NYC is 30–50% more expensive than national averages. A ruptured ACL that costs $3,500 elsewhere might cost $5,000–$7,000 at a Manhattan emergency animal hospital. That raises the value of insurance for NYC pet owners compared to the national average.</p>
        <FAQItem q="What's the average pet insurance premium in NYC?" a="Expect $40–$90/month for a young, healthy dog in NYC. Premiums increase with age and vary significantly by breed. French Bulldogs and other brachycephalic breeds run 40–60% higher than average." />
        <FAQItem q="What does pet insurance not cover?" a="Most policies exclude pre-existing conditions, dental disease, grooming, preventive care (unless you add a wellness rider), and breeding costs. Read the exclusions carefully before purchasing." />
      </>
    )
  },
  {
    id: 'dog-walking-vs-boarding',
    title: "Dog Walking vs Boarding: What's Best for Your Dog?",
    tag: 'SERVICES',
    desc: "Both serve different needs. Here's how to decide — and what it actually costs in Brooklyn.",
    content: () => (
      <>
        <p>Dog walking and boarding solve different problems. Walking is about daily exercise and routine. Boarding is about overnight and multi-day care when you're away. Most NYC dog owners need both, but the right balance depends on your schedule and your dog.</p>
        <h3>Dog Walking — What to Know</h3>
        <p>Solo walks (one dog, one walker) are safer and better for your dog but cost more — $30–$45 per 30-minute walk in Brooklyn. Group walks ($20–$28) are fine for social, well-trained dogs. Daily walking via a regular walker provides consistency and socialization that most apartment dogs need.</p>
        <h3>Boarding — What to Know</h3>
        <p>In-home boarding is typically less stressful than kennel boarding for dogs that aren't used to kennels. Facility boarding offers more structure and often more staff oversight. Both options in Brooklyn run $55–$95/night.</p>
        <h3>The Hybrid: Dog Daycare</h3>
        <p>Daycare fills the gap between walking and boarding. It's a full day of supervised play — ideal for high-energy dogs whose owners work long hours. Brooklyn daycare runs $35–$60/day with monthly memberships available.</p>
        <FAQItem q="Is boarding stressful for dogs?" a="It depends on the dog. Dogs that are well-socialized often thrive in boarding environments. More anxious or territorial dogs do better with in-home boarding or a trusted pet-sitter. The first time is usually the hardest — most dogs adjust by the second or third stay." />
        <FAQItem q="How do I find a trustworthy dog walker in Brooklyn?" a="Look for GPS-tracked walks, insurance, and real reviews with specific details. Ask for a meet-and-greet before committing. Red flags include walkers who refuse to share walk routes or can't tell you who exactly walks your dog each day." />
      </>
    )
  },
  {
    id: 'how-to-choose-dog-trainer-nyc',
    title: 'How to Choose a Dog Trainer in NYC',
    tag: 'TRAINING',
    desc: "Certifications matter. Methods matter more. Here's what separates good trainers from bad ones.",
    content: () => (
      <>
        <p>Dog training in NYC is an unregulated industry. Anyone can call themselves a trainer. Knowing what to look for — and what to avoid — makes a significant difference in outcomes for your dog.</p>
        <h3>Certifications Worth Looking For</h3>
        <p>CPDT-KA (Certified Professional Dog Trainer) is the gold standard for individual trainers. KPA-CTP (Karen Pryor Academy) indicates strong force-free methodology training. These aren't required but signal a trainer has been evaluated by peers.</p>
        <h3>Methods — The Most Important Factor</h3>
        <p>Force-free, positive reinforcement training is backed by the strongest scientific evidence and is recommended by the American Veterinary Society of Animal Behavior. Avoid trainers who use prong collars, e-collars (shock collars), alpha/dominance theory, or any method involving physical punishment.</p>
        <h3>Private vs Group Classes</h3>
        <p>Group classes (typically $150–$300 for a 6-week series) are ideal for basic obedience and puppy socialization. Private training ($100–$200/session in NYC) is better for specific behavioral issues, reactive dogs, or owners who need personalized instruction.</p>
        <FAQItem q="How long does dog training take?" a="Basic obedience — sit, stay, come, leash manners — can be established in 6–8 weeks of consistent practice. Behavioral issues like reactivity or aggression take months of work. Training is ongoing; it's a habit, not a one-time event." />
        <FAQItem q="Can I train my dog myself?" a="Yes, for basic obedience. But for behavioral problems — reactivity, resource guarding, aggression — a professional trainer is strongly recommended. DIY approaches to serious behavioral issues can make things worse." />
      </>
    )
  },
  {
    id: 'dog-vaccinations-nyc',
    title: 'What Vaccinations Does My Dog Need in NYC?',
    tag: 'HEALTH',
    desc: 'Required vs recommended — and what NYC specifically adds to the list.',
    content: () => (
      <>
        <p>NYC has specific vaccination requirements for dogs, particularly if you use boarding facilities, dog parks, or daycare. Here's a clear breakdown of what's legally required, what's strongly recommended, and what's optional.</p>
        <h3>Required by NYC Law</h3>
        <p><strong>Rabies:</strong> Required by law for all dogs over 3 months. Initial vaccine, then booster at 1 year, then every 3 years. Your dog must have a current rabies certificate — it's required for the NYC dog license.</p>
        <h3>Required by Most Facilities</h3>
        <p><strong>DHPP:</strong> Core vaccine, typically given as a puppy series then every 1–3 years.</p>
        <p><strong>Bordetella (Kennel Cough):</strong> Required by virtually all NYC boarding and daycare facilities. Given every 6–12 months.</p>
        <h3>Strongly Recommended for NYC Dogs</h3>
        <p><strong>Leptospirosis:</strong> NYC's rat population makes this a real risk. The bacteria is spread through rat urine in water and soil. Most NYC vets strongly recommend this vaccine, especially for dogs that spend time in parks.</p>
        <FAQItem q="How much do dog vaccines cost in Brooklyn?" a="A wellness exam plus core vaccines (DHPP, Bordetella, Rabies) typically runs $200–$350 at a Brooklyn vet clinic. Low-cost vaccine clinics are available through NYC Animal Care Centers for income-qualifying owners." />
        <FAQItem q="How do I get a NYC dog license?" a="Apply online through the NYC DOHMH website. You'll need proof of current rabies vaccination and proof of spay/neuter (if applicable). Cost is $8.50/year for spayed/neutered dogs, $34/year for intact dogs." />
      </>
    )
  },
  {
    id: 'budget-for-vet-bills',
    title: 'How Much Should I Budget for Vet Bills?',
    tag: 'COSTS',
    desc: 'Routine, unexpected, and emergency — the three buckets every NYC dog owner needs to plan for.',
    content: () => (
      <>
        <p>Vet bills are the most unpredictable part of dog ownership. A healthy dog can go years with only routine expenses — then a single emergency can cost more than everything else combined. Planning in three buckets helps.</p>
        <h3>Bucket 1: Routine Annual Care ($650–$1,200)</h3>
        <p>Annual wellness exam, vaccines (DHPP, Bordetella, Rabies), heartworm test and prevention, flea/tick prevention, and dental cleaning every 1–2 years. In NYC, expect the high end of this range.</p>
        <h3>Bucket 2: Expected Unexpected ($300–$800/year)</h3>
        <p>Ear infections, skin issues, minor injuries, GI problems — these happen to virtually every dog. Budget $300–$800/year for non-emergency sick visits.</p>
        <h3>Bucket 3: True Emergency Fund ($2,500–$5,000)</h3>
        <p>Cruciate ligament tears, foreign body ingestion, bloat, cancer diagnosis — major medical events that happen at least once in most dogs' lives. NYC emergency vet care is expensive: after-hours emergency exam fees alone start at $150–$200, before any treatment.</p>
        <FAQItem q="What are the most expensive dog health issues?" a="Cruciate (ACL) repairs run $3,500–$6,000 per leg in NYC. Cancer treatment can run $5,000–$15,000+. Bloat surgery is $3,000–$7,000 and requires immediate action." />
        <FAQItem q="Should I use a credit card or payment plan for vet emergencies?" a="CareCredit is the most widely accepted veterinary financing option and offers 0% interest promotional periods. Most NYC emergency vet clinics accept it. It's worth having the card before an emergency, not applying for it during one." />
      </>
    )
  },
  {
    id: 'dog-friendly-restaurants-brooklyn',
    title: 'Best Dog-Friendly Restaurants and Bars in Brooklyn',
    tag: 'BROOKLYN',
    desc: 'Patios, bars, and cafes that genuinely welcome dogs — not just tolerate them.',
    content: () => (
      <>
        <p>Brooklyn has a thriving dog-friendly dining scene, particularly in Park Slope, Williamsburg, and Carroll Gardens. The distinction between "allows dogs on the patio" and "actively welcomes dogs" matters.</p>
        <h3>What Counts as Dog-Friendly</h3>
        <p>A truly dog-friendly spot has outdoor seating with space for your dog to sit comfortably, ideally provides water bowls without being asked, has staff that seem genuinely pleased to see dogs, and is located on a block where your dog can settle without constant pedestrian stress.</p>
        <h3>Park Slope</h3>
        <p>The most dog-dense neighborhood in Brooklyn. Numerous Seventh Avenue cafes and restaurants allow dogs on their sidewalk patios. The proximity to Prospect Park makes it natural — dog owners stop in after morning park runs constantly.</p>
        <h3>Williamsburg</h3>
        <p>Several bars along Wythe and Bedford have large outdoor areas that are de facto dog hangouts on weekends.</p>
        <h3>Red Hook</h3>
        <p>The waterfront area has several spots with large outdoor areas and a relaxed atmosphere. Less foot traffic than other neighborhoods means calmer environments for anxious dogs.</p>
        <FAQItem q="Are dogs allowed inside NYC restaurants?" a="No — NYC Health Code prohibits dogs inside food service establishments, with the exception of certified service animals. Only outdoor seating (patios, sidewalk tables) can accommodate pet dogs." />
        <FAQItem q="What's the etiquette for bringing dogs to restaurant patios?" a="Keep your dog leashed and close to your chair, not blocking walkways. Bring your own water bowl or ask — don't assume the restaurant has one. Make sure your dog is well-exercised before arriving." />
      </>
    )
  },
  {
    id: 'first-year-puppy-guide',
    title: 'First Year with a Puppy in NYC: What to Expect and Budget For',
    tag: 'PUPPIES',
    desc: "The first year is the hardest and the most expensive. Here's the full honest picture for NYC.",
    content: () => (
      <>
        <p>Getting a puppy in NYC is harder and more expensive than almost anywhere else in the country. Apartments are smaller, streets are louder, and services cost more. But it's also uniquely rewarding — NYC dogs tend to be exceptionally well-socialized due to constant exposure.</p>
        <h3>The First 8 Weeks Home</h3>
        <p>Expect sleep deprivation, house training accidents, and a complete restructuring of your schedule. Puppies under 4 months need to go outside every 2–3 hours. In an apartment building, that means multiple elevator trips at 2am. This phase passes — but it's real.</p>
        <h3>Socialization Is Critical — and NYC Helps</h3>
        <p>The window for primary socialization closes around 16 weeks. NYC is actually ideal for this — your puppy will encounter strangers, traffic, subway sounds, other dogs, skateboards, and food smells constantly. Lean into it. Every positive experience during this window shapes behavior for life.</p>
        <h3>The First Year Budget (NYC)</h3>
        <p>Expect $4,000–$8,000 for the first year. This includes the higher one-time costs (spay/neuter, puppy vaccine series, initial gear, training classes) that don't repeat in subsequent years. Year 2 and beyond typically runs $2,500–$5,000 depending on size and lifestyle.</p>
        <h3>Finding a Puppy in NYC</h3>
        <p>Adopt first — NYC ACC and countless rescue organizations have puppies regularly. If purchasing from a breeder, insist on visiting the facility, meeting the parents, and seeing health certifications. Avoid pet stores — they source from commercial breeding operations regardless of what they tell you.</p>
        <FAQItem q="What's the best breed for NYC apartment life?" a="The best apartment dog is one that matches your activity level and noise tolerance, regardless of size. Low-energy large dogs (Greyhounds, Basset Hounds) can do better in apartments than high-energy small dogs (Jack Russell Terriers). The key variables are energy level, barking tendency, and separation anxiety risk." />
        <FAQItem q="Do I need a dog-friendly apartment to have a dog in NYC?" a="Your lease matters. Many NYC apartments prohibit dogs or have weight/breed restrictions. Review your lease carefully and get written permission if needed. Some buildings have grandfathering rules — if a dog has lived there openly for 3 months, the landlord may lose the right to enforce a no-pets clause." />
      </>
    )
  },
  {
    id: 'how-often-bathe-dog',
    title: 'How Often Should You Bathe Your Dog? A Practical Guide for NYC Owners',
    tag: 'GROOMING',
    desc: 'The answer depends on breed, coat type, and lifestyle — here\'s how to figure out the right schedule for your dog.',
    content: () => (
      <>
        <p>How often you should bathe your dog depends on three things: coat type, skin condition, and how dirty your dog actually gets. For most dogs in NYC — where street grime, puddles, and dog park mud are facts of life — bathing more frequently than the national average is often justified.</p>
        <h3>General Bathing Frequency by Coat Type</h3>
        <p><strong>Short-coated dogs</strong> (Beagles, Boxers, Dachshunds): Every 6–8 weeks. Their coats repel dirt naturally and over-bathing strips essential oils. A quick wipe-down with a damp cloth handles everyday city grime.</p>
        <p><strong>Double-coated dogs</strong> (Labs, Huskies, Golden Retrievers): Every 4–6 weeks. The undercoat traps debris and odor. Regular brushing between baths is essential — matting in a double coat holds moisture and causes skin problems.</p>
        <p><strong>Long-haired and silky-coated dogs</strong> (Shih Tzus, Maltese, Yorkshire Terriers): Every 3–4 weeks. These coats tangle easily and collect everything from the street. Professional grooming is usually necessary to maintain coat health.</p>
        <p><strong>Curly and wavy-coated dogs</strong> (Poodles, Doodles, Portuguese Water Dogs): Every 3–4 weeks. Curly coats don't shed naturally and mat quickly without regular washing and brushing. Most Doodle owners find professional grooming every 6–8 weeks with home baths in between works best.</p>
        <p><strong>Wrinkled and skin-fold breeds</strong> (Bulldogs, Pugs, Shar Peis): Every 2–3 weeks for full baths, but fold cleaning needs to happen weekly at minimum. Skin folds trap moisture and bacteria — the leading cause of skin infections in these breeds.</p>
        <h3>The NYC Factor</h3>
        <p>City dogs walk on sidewalks that have seen everything. Urine, chemicals, garbage residue, and construction dust accumulate on paws and belly fur quickly. Many NYC dog owners add a quick paw wipe or foot rinse after walks — this extends the time between full baths considerably without stripping coat oils.</p>
        <h3>Signs You're Bathing Too Often</h3>
        <p>Dry, flaky skin, excessive scratching, and a dull or brittle coat all suggest you're over-bathing. Stripping natural oils with frequent washing actually makes dogs smell worse faster — the skin overproduces oil to compensate.</p>
        <h3>Signs You're Not Bathing Often Enough</h3>
        <p>A persistent "dog smell" that doesn't go away after a bath, greasy or clumped fur, and skin redness or irritation all suggest your bathing schedule isn't frequent enough — or that there's an underlying skin condition worth a vet visit.</p>
        <FAQItem q="Can I use human shampoo on my dog?" a="No. Human shampoo is formulated for human skin pH (4.5–5.5). Dog skin has a higher pH (6.2–7.4). Using human products regularly disrupts the skin's protective barrier and leads to dryness, irritation, and infection risk. Use a shampoo formulated specifically for dogs." />
        <FAQItem q="Should I bathe my dog before or after grooming?" a="If you're going to a professional groomer, let them handle the bath — it's included in the service and they'll do it in the right sequence. For home baths between grooming appointments, a good rule: brush first to remove mats and loose fur, then bathe, then dry thoroughly before a final brush-out." />
        <FAQItem q="How do I find a good dog groomer in Brooklyn?" a="Look for groomers who offer one-on-one appointments (not assembly-line grooming), use fear-free handling techniques, and can show you their space. Brooklyn has excellent independent groomers across Williamsburg, Park Slope, Greenpoint, and Carroll Gardens." />
        <AffiliateCTA title="Find a Brooklyn groomer" desc="Browse verified dog groomers across Brooklyn neighborhoods — from Park Slope boutiques to Williamsburg salons." links={[{name:'Browse Groomers',url:'/directory/groomers'},{name:'Williamsburg Groomers',url:'/directory/williamsburg'}]} />
      </>
    )
  },
  {
    id: 'dog-vaccines-nyc',
    title: 'How Often Do Dogs Need Vaccines in NYC? Required vs Recommended',
    tag: 'HEALTH',
    desc: 'NYC has specific vaccination laws and facility requirements. Here\'s exactly what your dog needs and when.',
    content: () => (
      <>
        <p>Dog vaccination requirements in NYC go beyond the standard national guidelines. Between NYC law, boarding facility requirements, and the specific disease risks of city life — particularly leptospirosis from rats — NYC dogs typically need more vaccines than the national baseline.</p>
        <h3>Required by New York City Law</h3>
        <p><strong>Rabies vaccine:</strong> Legally required for all dogs over 3 months old. Initial vaccine, booster at 1 year, then every 3 years. Proof of current rabies vaccination is required to obtain and renew an NYC dog license. Fines for non-compliance can reach $200.</p>
        <h3>Required by Virtually All Brooklyn Facilities</h3>
        <p>If you plan to use boarding, daycare, training classes, or grooming salons — which require dogs to interact with other dogs — expect these to be mandatory:</p>
        <p><strong>DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza):</strong> Initial series as a puppy, booster at 1 year, then every 1–3 years depending on your vet's protocol. Parvovirus is a serious risk in urban environments where dogs share common outdoor spaces.</p>
        <p><strong>Bordetella (Kennel Cough):</strong> Required by virtually every NYC boarding and daycare facility. Given every 6–12 months. High contagion in city dog parks and facilities means this is genuinely important — not just paperwork.</p>
        <h3>Strongly Recommended for NYC Dogs Specifically</h3>
        <p><strong>Leptospirosis:</strong> This is the NYC-specific vaccine most pet owners nationally skip — but Brooklyn vets strongly recommend it. Leptospira bacteria is spread through rat urine contaminating water and soil. NYC's rat population makes park soil and puddles a genuine transmission risk. Leptospirosis causes kidney and liver failure in dogs and can be fatal. Given annually.</p>
        <p><strong>Lyme disease:</strong> If your dog visits Prospect Park, Fort Greene Park, or any wooded area regularly, tick exposure is real. Ask your vet whether Lyme vaccination is appropriate based on your dog's outdoor exposure.</p>
        <h3>Typical NYC Vaccine Schedule Summary</h3>
        <p>Puppies (8–16 weeks): DHPP series, Bordetella, Rabies at 12+ weeks. Adult annual vaccines: Bordetella, Leptospirosis. Every 1–3 years: DHPP booster, Rabies booster.</p>
        <FAQItem q="How much do dog vaccines cost in Brooklyn?" a="A wellness exam with core vaccines (DHPP, Rabies, Bordetella) at a Brooklyn vet typically runs $200–$350. Adding Leptospirosis and Lyme brings it to $280–$420. Low-cost vaccine clinics operate periodically through NYC Animal Care Centers — worth checking their schedule for budget-conscious owners." />
        <FAQItem q="What happens if my dog's vaccines lapse?" a="Rabies lapse makes your NYC dog license invalid and puts you at legal risk. More practically, your dog will be turned away by boarding facilities, daycare centers, and many grooming salons. Most facilities require proof within 30 days of expiration at minimum — don't let it slide more than a month." />
        <FAQItem q="Can I get my dog vaccinated at a Brooklyn clinic without an appointment?" a="Some Brooklyn vets offer walk-in vaccine clinics on specific days — call ahead. Bond Vet locations offer urgent-care-style appointments without long waits. NYC Animal Care Centers periodically host low-cost vaccine events, which are announced on their website." />
        <AffiliateCTA title="Find a Brooklyn vet" desc="Browse verified veterinary clinics across Brooklyn neighborhoods — from DUMBO to Park Slope to Kensington." links={[{name:'Browse Vets',url:'/directory/vets'},{name:'Emergency Vets',url:'/emergency-vet-brooklyn'}]} />
      </>
    )
  },
  {
    id: 'emergency-vet-brooklyn',
    title: 'Emergency Vet in Brooklyn: Where to Go and What to Do',
    tag: 'HEALTH',
    desc: 'When your pet needs urgent care in Brooklyn, every minute counts. Here\'s where to go, what it costs, and how to prepare.',
    content: () => (
      <>
        <p>A pet emergency in NYC at 2am is one of the most stressful experiences a dog owner can have. Knowing exactly where to go before it happens — and having a plan — makes a real difference when every minute counts.</p>
        <h3>True 24-Hour Emergency Hospitals in Brooklyn</h3>
        <p><strong>VERG Brooklyn (Veterinary Emergency & Referral Group)</strong> at 318 Warren St, Brooklyn Heights, is the primary 24-hour emergency and specialty animal hospital for Brooklyn. Board-certified specialists in surgery, neurology, cardiology, and critical care. They also have a south Brooklyn location at 2220 Flatbush Ave for east Brooklyn residents.</p>
        <p><strong>BluePearl Pet Hospital Brooklyn</strong> at 190 Third Ave (Gowanus) is a Level II VECCS-certified 24-hour emergency facility with dedicated surgical suites for neurosurgery, soft tissue surgery, and orthopedic surgery. For complex cases requiring specialist care, BluePearl is the top-tier option in Brooklyn.</p>
        <h3>Urgent Care Options (Extended Hours, Not 24/7)</h3>
        <p><strong>Bond Vet</strong> locations in Park Slope, Cobble Hill, and Bed-Stuy offer urgent care — treating conditions that fall between a routine exam and a true emergency — at roughly half the cost of a traditional emergency hospital. They're open late but not 24 hours. For non-life-threatening urgent issues (limping, vomiting, eye problems, minor lacerations), Bond Vet is often the smarter first call.</p>
        <h3>What Counts as a True Emergency</h3>
        <p>Go directly to an emergency hospital for: difficulty breathing, suspected poisoning, inability to urinate (especially in male dogs), seizures lasting more than 3 minutes, suspected broken bones, collapse or unresponsiveness, bloat symptoms (distended abdomen, unproductive retching), eye injuries, and uncontrolled bleeding.</p>
        <p>Urgent care (Bond Vet, next-day vet) is appropriate for: limping without weight-bearing loss, vomiting or diarrhea without blood, minor cuts, suspected ear infections, and mild lethargy without other symptoms.</p>
        <h3>What Emergency Vet Care Costs in Brooklyn</h3>
        <p>Emergency exam fee alone: $150–$250. After-hours emergency visits for common issues: $400–$800. Surgery or hospitalization: $2,000–$8,000+. This is why a dedicated pet emergency fund of $2,500–$5,000 or a pet insurance policy is strongly recommended for NYC owners.</p>
        <h3>Before an Emergency Happens</h3>
        <p>Save VERG's number in your phone now: (718) 522-9400. Know the address of your nearest Bond Vet. Keep a copy of your dog's vaccine records in your phone's photos — emergency hospitals need them. Have CareCredit activated before an emergency, not during one.</p>
        <FAQItem q="Does pet insurance cover emergency vet visits in Brooklyn?" a="Yes — most pet insurance policies cover emergency care, diagnostics, hospitalization, and surgery. The key is having the policy before the emergency, not after. Pre-existing conditions are excluded, so insuring a young, healthy dog is far more cost-effective than waiting until something goes wrong." />
        <FAQItem q="What's the ASPCA Animal Poison Control number?" a="(888) 426-4435 — save it now. Available 24/7. There's a $95 consultation fee but it's worth it — they'll tell you immediately whether your dog needs emergency care or is safe at home, and they'll coordinate with your emergency vet." />
        <AffiliateCTA title="Is pet insurance worth it for Brooklyn dogs?" desc="Emergency vet care in NYC costs 30–50% more than national averages. Run the numbers with our calculator." links={[{name:'Pet Insurance Calculator',url:'/tools'},{name:'Compare Plans',url:'/guides/is-pet-insurance-worth-it'}]} />
      </>
    )
  },
  {
    id: 'dog-boarding-brooklyn-guide',
    title: 'Dog Boarding in Brooklyn: A Complete Neighborhood Guide',
    tag: 'SERVICES',
    desc: 'What to expect, what to ask, what it costs, and the best boarding options across Brooklyn neighborhoods.',
    content: () => (
      <>
        <p>Finding reliable dog boarding in Brooklyn means navigating more options than most cities — and more variation in quality. From luxury hotel-style facilities in DUMBO to in-home boarding in Carroll Gardens to cage-free daycare-plus-boarding in Williamsburg, Brooklyn's boarding landscape reflects the borough's diversity.</p>
        <h3>Types of Boarding Available in Brooklyn</h3>
        <p><strong>Facility boarding:</strong> Dedicated pet hotels or daycare centers that offer overnight stays. Dogs sleep in private suites or shared spaces and are supervised by overnight staff. DIGS Hotel in DUMBO, Brooklyn Pawffice in Williamsburg, and Hounds Town in Prospect Heights and DUMBO are the standout facility options. Expect $65–$120/night.</p>
        <p><strong>Daycare-plus-boarding:</strong> Facilities that run daycare during the day and transition dogs to boarding overnight. Often the most social environment — dogs spend the day with friends rather than in a kennel. Doggittude in Park Slope, PAWSIES in Bushwick, and Strutting Mutts in Williamsburg operate this model. Expect $60–$100/night.</p>
        <p><strong>In-home boarding:</strong> A professional keeps your dog in their home. Typically smaller groups (2–4 dogs max), more personalized attention, and lower stress for dogs that don't do well in facility environments. Animal Loving Care in Carroll Gardens and Brooklyn Bark in Brooklyn Heights offer this model. Expect $65–$95/night.</p>
        <p><strong>Vet-supervised boarding:</strong> Boarding at a veterinary facility. Important for dogs with medical conditions, seniors, or post-surgery recovery. VERG and Animal Hospital of Brooklyn offer this. More expensive ($90–$150/night) but medically appropriate when needed.</p>
        <h3>What to Ask Before Booking</h3>
        <p>How many dogs are in the facility overnight? Who supervises them and how often? Where do dogs sleep — private rooms, shared space, or crates? What happens if my dog gets sick? What vaccinations are required? Can I visit the facility before booking? The answers tell you more than any marketing copy.</p>
        <h3>Brooklyn Boarding by Neighborhood</h3>
        <p><strong>Williamsburg/Greenpoint:</strong> The highest concentration of boarding options in Brooklyn. Brooklyn Pawffice, Strutting Mutts, Happy Dogs, and Buddy's Dog Den all operate in this area. Great for North Brooklyn residents — multiple high-quality options with real competition keeping standards up.</p>
        <p><strong>DUMBO/Brooklyn Heights:</strong> DIGS Hotel is the premium facility option — private suites, webcam access, and daycare included. Hounds Town Dumbo offers a more affordable alternative on Jay St. Both serve downtown Brooklyn well.</p>
        <p><strong>Park Slope/Carroll Gardens:</strong> Doggittude, Animal Loving Care, Canine Corner, and Woofs 'n Whiskers serve south Brooklyn. Animal Loving Care is particularly strong for dogs that need more personalized attention.</p>
        <FAQItem q="How far in advance should I book boarding in Brooklyn?" a="For weekends and holidays, 2–4 weeks in advance is standard at popular facilities. Summer and holiday weeks (Thanksgiving, Christmas, July 4th) book out 4–8 weeks in advance. Good facilities fill up fast — don't assume availability." />
        <FAQItem q="What vaccinations do Brooklyn boarding facilities require?" a="The universal minimum: Rabies, DHPP, and Bordetella. Most also require Leptospirosis. Some require an influenza vaccine. You'll need to provide written proof from your vet — photos of vaccine records on your phone are usually acceptable. Requirements vary by facility so confirm before booking." />
        <AffiliateCTA title="Browse Brooklyn boarding options" desc="145 verified providers across Brooklyn including 24 boarding facilities organized by neighborhood." links={[{name:'Browse Boarding',url:'/directory/boarding'},{name:'Williamsburg Boarding',url:'/directory/williamsburg'}]} />
      </>
    )
  },
  {
    id: 'nyc-dog-license',
    title: 'How to Get an NYC Dog License: Cost, Requirements, and Renewal',
    tag: 'HEALTH',
    desc: 'NYC law requires all dogs over 4 months to be licensed. Here\'s the full process, what it costs, and what happens if you skip it.',
    content: () => (
      <>
        <p>Every dog over 4 months old living in New York City is legally required to have a current NYC dog license. It's one of those rules most new dog owners in Brooklyn learn about after the fact — but it's straightforward to comply with and the consequences of skipping it are real.</p>
        <h3>What You Need Before You Apply</h3>
        <p><strong>Proof of current rabies vaccination:</strong> A certificate from your vet showing the vaccine date and expiration. The license period cannot extend beyond your dog's rabies vaccine expiration, so make sure your rabies is current before applying.</p>
        <p><strong>Proof of spay/neuter (if applicable):</strong> A letter or certificate from your vet. This dramatically reduces the cost — it's worth getting before you apply.</p>
        <p>That's it. You don't need proof of other vaccines, a vet exam, or a microchip (though microchipping is strongly recommended separately).</p>
        <h3>How Much It Costs</h3>
        <p>Spayed/neutered dogs: $8.50/year or $17 for 2 years. Intact (unaltered) dogs: $34/year. Senior owners (65+) with a spayed/neutered dog: $2.00/year. The cost difference between altered and unaltered dogs is significant — if you're planning to spay or neuter your dog anyway, do it before licensing and save $25/year.</p>
        <h3>How to Apply</h3>
        <p>Online at nyc.gov (search "dog license") — the fastest method. By mail using the paper application. In person at any NYC Animal Care Center location. Online is by far the easiest: upload your vaccine certificate, pay with a credit card, and receive your license by mail within 2–3 weeks.</p>
        <h3>Renewal</h3>
        <p>NYC dog licenses must be renewed annually (or every 2 years if you choose the 2-year option). You'll receive a renewal notice by mail. The renewal can be completed online with the same process as the original application. The most common reason people miss renewal: they move and the notice goes to an old address. Update your address in the system when you move.</p>
        <h3>What Happens If You Don't License Your Dog</h3>
        <p>NYC Animal Control officers and police can issue fines of $35–$200 for unlicensed dogs. More practically, if your dog is picked up by Animal Control without a license, there's no quick way to identify you as the owner — the reunification process is slower and your dog may be held for the full stray hold period before you're contacted.</p>
        <FAQItem q="Does my dog need to wear the license tag?" a="Yes — NYC law requires the license tag to be on your dog's collar at all times outdoors. In practice enforcement focuses on licensing compliance rather than tag-wearing, but the tag is your dog's fastest path home if they get lost." />
        <FAQItem q="Can I get a NYC dog license if my dog's rabies vaccine is expired?" a="No. You need to get the rabies vaccine updated at your vet first, then apply for the license. This is a common situation — new residents discover their dog's vaccine paperwork from another state doesn't match what NYC requires. Visit a Brooklyn vet to update vaccines first." />
        <AffiliateCTA title="Find a Brooklyn vet for vaccines" desc="Most Brooklyn vets handle license paperwork as part of a routine wellness visit. Browse verified clinics near you." links={[{name:'Browse Vets',url:'/directory/vets'},{name:'Vaccine Guide',url:'/dog-vaccines-nyc'}]} />
      </>
    )
  },
  {
    id: 'best-dogs-nyc-apartments',
    title: 'Best Dogs for NYC Apartments: What Actually Works vs What People Think',
    tag: 'BROOKLYN',
    desc: 'Size isn\'t the most important factor. Here\'s what actually predicts apartment compatibility in New York City.',
    content: () => (
      <>
        <p>The most common mistake NYC apartment dog shoppers make: optimizing for size. Small dogs, they assume, are apartment dogs. The reality is more nuanced — and some of the best apartment dogs in the city are surprisingly large.</p>
        <h3>The Four Variables That Actually Matter</h3>
        <p><strong>Energy level:</strong> A high-energy small dog (Jack Russell Terrier, Miniature Pinscher) is far harder to manage in a 600 sq ft apartment than a low-energy large dog. Energy level predicts how much exercise a dog needs to stay calm indoors — and in NYC, that exercise has to come from structured walks and outings, not a backyard.</p>
        <p><strong>Barking tendency:</strong> In an apartment building, excessive barking creates neighbor conflicts and lease violations. Breeds with strong alerting instincts (Chihuahuas, Miniature Schnauzers, Beagles, Shetland Sheepdogs) can be challenging in dense urban housing regardless of size.</p>
        <p><strong>Separation anxiety risk:</strong> NYC owners often work long hours. Breeds that bond intensely and struggle with alone time (Vizslas, Weimaraners, many Velcro breeds) may need a dog walker or daycare every day — which is manageable but should be budgeted for.</p>
        <p><strong>Heat and cold tolerance:</strong> NYC summers get hot, and brachycephalic breeds (Bulldogs, Pugs, French Bulldogs) can overheat quickly. If you don't have reliable AC and a ground-floor or easy outdoor access, flat-faced breeds require more management in summer.</p>
        <h3>Breeds That Genuinely Do Well in Brooklyn Apartments</h3>
        <p><strong>Greyhounds and Whippets:</strong> Counterintuitive but genuinely great apartment dogs. Low energy indoors, minimal barking, and they're perfectly happy with two solid walks a day and a Prospect Park sprint on weekends. One of the most popular breeds among Park Slope and Carroll Gardens residents.</p>
        <p><strong>Basset Hounds:</strong> Calm, low-energy, apartment-tolerant. The howling tendency can be an issue, but well-exercised Bassets are remarkably mellow indoors.</p>
        <p><strong>French Bulldogs:</strong> Genuinely apartment-sized and low-energy. The tradeoffs: significant health costs (brachycephalic syndrome, spinal issues), higher pet insurance premiums, and sensitivity to heat. Popular in Brooklyn for good reason — just go in eyes open on the vet bills.</p>
        <p><strong>Cavalier King Charles Spaniels:</strong> Adaptable, affectionate, moderate energy. Do well in smaller spaces. Health watch: mitral valve disease is prevalent in the breed — a reputable breeder and early cardiac screening matters.</p>
        <p><strong>Shih Tzus and Bichon Frises:</strong> Low-shedding, low-energy, minimal barking tendency, adaptable to small spaces. Popular for a reason.</p>
        <p><strong>Mixed breeds from rescue:</strong> Adult rescue dogs with established temperaments are often the best apartment choice — you know what you're getting rather than guessing at a puppy's adult energy level.</p>
        <h3>Breeds to Think Carefully About</h3>
        <p>High-drive working breeds (Border Collies, Australian Shepherds, Huskies) can work in apartments with extraordinary exercise commitment — but most owners underestimate what that looks like in practice. Huskies in particular tend to be vocal and high-energy in ways that apartment building neighbors don't appreciate.</p>
        <FAQItem q="Do weight restrictions in NYC apartments apply to all dogs?" a="Weight limits in NYC leases are typically set by individual landlords and management companies — there's no citywide standard. Common restrictions are 25 lbs or 40 lbs. Breed restrictions are also common. Always review your lease and get written permission in writing before bringing a dog home." />
        <FAQItem q="Is it worth hiring a dog trainer when getting an apartment dog?" a="For most first-time NYC dog owners, yes. Basic obedience (loose leash walking, recall, calm greetings) makes an enormous quality-of-life difference in a dense urban environment. A well-trained dog is also a dog that doesn't create neighbor conflicts. One group class is often enough to set good habits." />
        <AffiliateCTA title="Find a Brooklyn dog trainer" desc="31 verified trainers across Brooklyn — from Williamsburg to Park Slope to Carroll Gardens." links={[{name:'Browse Trainers',url:'/directory/trainers'},{name:'Puppy First Year Guide',url:'/guides/first-year-puppy-guide'}]} />
      </>
    )
  },
  {
    id: 'dog-groomers-williamsburg',
    title: 'Best Dog Groomers in Williamsburg, Brooklyn (2026)',
    tag: 'GROOMING',
    desc: 'The top-rated grooming salons in Williamsburg — what they offer, what they cost, and how to book.',
    content: () => (
      <>
        <p>Williamsburg has one of the highest concentrations of dog groomers in Brooklyn, reflecting the neighborhood's density of young professional dog owners. The options range from boutique appointment-only salons to self-service wash stations to full-service grooming combined with daycare. Here's what's worth knowing about the Williamsburg grooming scene.</p>
        <h3>What Makes Williamsburg Grooming Different</h3>
        <p>The density of groomers in Williamsburg creates real competition — which generally keeps standards high and prices competitive relative to Manhattan. Most Williamsburg groomers work by appointment (walk-ins are rare), and many have waiting lists for regular clients. Building a relationship with one groomer who knows your dog is worth more than shopping around for the cheapest option.</p>
        <h3>Top Williamsburg Grooming Options</h3>
        <p><strong>The Furry Club</strong> (303 Wythe Ave) offers personalized grooming for dogs and cats with creative styling options, including pet-safe coloring. They specialize in all breeds and offer a full menu from basic baths to show-style cuts.</p>
        <p><strong>Doggie Styles Pet Grooming</strong> (229 Grand St) is a neighborhood staple offering oatmeal bath treatments, hand blow-drying, and full styling. Open Tuesday through Saturday — call ahead for appointments.</p>
        <p><strong>Now You're Clean – Williamsburg</strong> (228 Berry St) is the self-service dog wash option in the neighborhood, with grooming packages and a private event space for pet parties. Their self-service stations are a good middle ground for dogs that do fine with bathing but don't need a full groom.</p>
        <p><strong>Le' Pulga Pet Grooming</strong> (102 Broadway) is appointment-based and requires vaccination records when booking — a good sign that they're serious about animal health and safety.</p>
        <p><strong>Buddy's Dog Den</strong> (429 Graham Ave) combines grooming with daycare and boarding. The integrated model is convenient if your dog is already enrolled for daycare — you can schedule grooming on the same day.</p>
        <h3>What to Expect to Pay</h3>
        <p>Small dog full groom: $65–$95. Medium dog: $85–$130. Large dog or double coat: $100–$160. Doodles typically run $120–$170 due to coat complexity. Add-ons (teeth brushing, nail grinding, anal gland expression) are usually $10–$20 each. Prices have increased significantly since 2022 — anyone charging significantly below this range warrants a closer look at what's included.</p>
        <FAQItem q="How far in advance should I book a groomer in Williamsburg?" a="Popular groomers in Williamsburg book 2–3 weeks out for regular appointments. If you want a specific day of the week (Saturday is the hardest), book further in advance. First appointments at a new salon are often the hardest to get — once you're a regular client, scheduling gets easier." />
        <FAQItem q="Do Williamsburg groomers require vaccination records?" a="Most do, particularly for dogs that interact with other animals or staff. At minimum expect rabies and Bordetella (kennel cough) to be required. Some require DHPP as well. Have your vet records accessible on your phone — most groomers accept a photo." />
        <AffiliateCTA title="Browse all Brooklyn groomers" desc="22 verified grooming salons across Brooklyn — filter by neighborhood to find one near you." links={[{name:'All Groomers',url:'/directory/groomers'},{name:'Grooming Guide',url:'/guides/find-dog-groomer-brooklyn'}]} />
      </>
    )
  },
  {
    id: 'dog-trainers-williamsburg',
    title: 'Best Dog Trainers in Williamsburg, Brooklyn (2026)',
    tag: 'TRAINING',
    desc: 'Verified trainers in Williamsburg — positive reinforcement methods, puppy classes, reactive dog specialists, and more.',
    content: () => (
      <>
        <p>Williamsburg and the surrounding North Brooklyn area has a strong concentration of dog trainers, with options ranging from group puppy classes to private in-home behavioral work. The neighborhood's density of first-time dog owners — many navigating apartment living with reactive or undersocialized dogs — has driven demand for quality training resources.</p>
        <h3>What to Look for in a Williamsburg Dog Trainer</h3>
        <p>Dog training is unregulated in New York — anyone can call themselves a trainer. In Williamsburg, the best trainers use positive reinforcement methods exclusively, hold certifications from recognized bodies (CPDT-KA, KPA-CTP), and can give clear explanations of their methodology. Avoid anyone who uses physical corrections, prong collars, or e-collars (shock collars) — these methods increase anxiety and aggression.</p>
        <h3>Top Rated Williamsburg Trainers</h3>
        <p><strong>The Dog Institute of Williamsburg</strong> (125 Roebling St) is one of the highest-rated training programs in Brooklyn with over 113 reviews averaging 4.9 stars. They specialize in structured training with a science-based methodology. Class days are Tuesday and Thursday mornings.</p>
        <p><strong>Metro Dog Training</strong> (175 Powers St) offers both onsite training sessions and virtual options, with a specialty in reactive dogs and leash manners. LGBTQ+ friendly and well-reviewed by the Williamsburg community.</p>
        <p><strong>Wag the Dog NYC</strong> (212 S 2nd St) is a perfect-5-star rated operation focusing on urban dog training — manners for apartment and street life, which is exactly what most Williamsburg owners need.</p>
        <p><strong>Empire of the Dog Brooklyn</strong> (415 Grand St) is a boutique training program with strong reviews and a focus on building a genuine working relationship between dog and owner rather than just drilling obedience commands.</p>
        <p><strong>Ruff to Ready Dog Training</strong> (184 Kent Ave) offers appointment-based training with online booking, positive reinforcement focus, and good availability for new clients.</p>
        <h3>Group Classes vs Private Training</h3>
        <p>Group classes ($150–$300 for a 6-week series) are ideal for puppies, basic obedience, and socialization. Private sessions ($120–$200/session) are worth the investment for reactive dogs, aggression issues, or when you need fast results before a specific situation (new baby, moving, a problematic behavior that's gotten worse). Most trainers offer a free consultation call — use it to assess fit before committing.</p>
        <FAQItem q="How long does dog training take to show results?" a="Basic obedience improvements (sit, stay, loose leash walking) are typically visible within 2–4 weeks of consistent practice. Behavioral issues like reactivity or resource guarding take 3–6 months of sustained work. Training is a habit, not a one-time fix — the dog learns during sessions and generalizes through daily reinforcement at home." />
        <FAQItem q="Can I train my dog myself without a professional?" a="For basic manners, yes — there are excellent online resources and classes. For behavioral issues (reactivity, aggression, severe separation anxiety), professional guidance is strongly recommended. Attempting to fix serious behavioral problems without professional support can make them worse." />
        <AffiliateCTA title="Browse all Brooklyn trainers" desc="31 verified dog trainers across Brooklyn, organized by neighborhood." links={[{name:'All Trainers',url:'/directory/trainers'},{name:'How to Choose a Trainer',url:'/guides/how-to-choose-dog-trainer-nyc'}]} />
      </>
    )
  },
]

// ─── NAV ──────────────────────────────────────────────────────────────────────
const Nav = ({ page, setPage }) => (
  <nav style={{ background: C.bgWhite, borderBottom: `1px solid ${C.border}`, padding: '0 24px', position: 'sticky', top: 0, zIndex: 100, height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: C.shadowSm }}>
    <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
      <Logo size={28} />
      <span style={{ fontFamily: F.display, fontSize: 20, fontWeight: 600, color: C.text, letterSpacing: '-0.02em' }}>PetBizOS</span>
    </button>
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {[['home','Home'],['directory','Find Services'],['tools','Owner Tools'],['guides','Guides']].map(([p,l]) => (
        <button key={p} onClick={() => setPage(p)}
          style={{ fontFamily: F.body, fontSize: 14, color: page.startsWith(p) && p !== 'home' ? C.amber : page === p && p === 'home' ? C.amber : C.textDim, background: 'none', border: 'none', padding: '6px 14px', cursor: 'pointer', fontWeight: page === p ? 500 : 400 }}>
          {l}
        </button>
      ))}
      <button onClick={() => setPage('forbusiness')}
        style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.blue, background: C.blueLight, border: `1px solid ${C.blueBorder}`, borderRadius: 8, padding: '7px 16px', cursor: 'pointer', marginLeft: 8 }}>
        For Businesses →
      </button>
    </div>
  </nav>
)

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ setPage }) => {
  const [serviceFilter, setServiceFilter] = useState('all')
  const [hoodFilter, setHoodFilter] = useState('all')

  return (
    <div>
      {/* Hero */}
      <div style={{ background: C.bgWarm, borderBottom: `1px solid ${C.amberBorder}`, padding: '72px 24px 64px' }}>
        <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: F.mono, fontSize: 11, color: C.amber, background: C.amberLight, border: `1px solid ${C.amberBorder}`, borderRadius: 20, padding: '4px 14px', marginBottom: 20, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={C.amber}/></svg>
            Brooklyn-first · NYC
          </div>
          <h1 style={{ fontFamily: F.display, fontSize: 'clamp(38px,5.5vw,62px)', fontWeight: 600, color: C.text, lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Your city has great<br /><em style={{ color: C.amber, fontStyle: 'italic' }}>pet people.</em><br />We help you find them.
          </h1>
          <p style={{ fontFamily: F.body, fontSize: 17, color: C.textDim, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.6 }}>
            Groomers, walkers, trainers, vets, and boarding — verified and organized by Brooklyn neighborhood.
          </p>
          <div style={{ display: 'flex', gap: 10, maxWidth: 560, margin: '0 auto 20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}
              style={{ flex: 1, minWidth: 160, background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none', cursor: 'pointer', boxShadow: C.shadowSm }}>
              <option value="all">What do you need?</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={hoodFilter} onChange={e => setHoodFilter(e.target.value)}
              style={{ flex: 1, minWidth: 160, background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none', cursor: 'pointer', boxShadow: C.shadowSm }}>
              <option value="all">Your neighborhood</option>
              {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <button onClick={() => setPage('directory')}
              style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.bgWhite, background: C.amber, border: 'none', borderRadius: 10, padding: '12px 28px', cursor: 'pointer', boxShadow: C.shadowSm }}>
              Search
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            {['Free for pet owners','145 Brooklyn providers','Real Google data'].map(t => (
              <span key={t} style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: C.amber }}>✓</span>{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Service categories */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 24px 0' }}>
        <h2 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 600, color: C.text, marginBottom: 6, letterSpacing: '-0.02em' }}>Browse by service</h2>
        <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 28 }}>All providers are based in Brooklyn.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 52 }}>
          {[
            { cat:'Trainers',    icon:'🎓', count:31, color:C.amberLight, border:C.amberBorder, slug:'trainers' },
            { cat:'Daycare',     icon:'☀', count:28, color:C.blueLight,  border:C.blueBorder,  slug:'daycare' },
            { cat:'Dog Walkers', icon:'🦮', count:13, color:C.greenLight, border:'#C0DD97',     slug:'dog-walkers' },
            { cat:'Groomers',    icon:'✂', count:22,  color:C.amberLight, border:C.amberBorder, slug:'groomers' },
            { cat:'Boarding',    icon:'🏠', count:24,  color:C.blueLight,  border:C.blueBorder,  slug:'boarding' },
            { cat:'Vets',        icon:'🏥', count:27,  color:C.greenLight, border:'#C0DD97',     slug:'vets' },
          ].map(({ cat, icon, count, color, border, slug }) => (
            <button key={cat} onClick={() => setPage(`directory/${slug}`)}
              style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: '20px 22px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: C.shadowSm }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderDark; e.currentTarget.style.boxShadow = C.shadow }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = C.shadowSm }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: color, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: F.body, fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 3 }}>{cat}</div>
              <div style={{ fontFamily: F.mono, fontSize: 12, color: C.textMuted }}>{count > 0 ? `${count} in Brooklyn` : `${count} in Brooklyn`}</div>
            </button>
          ))}
        </div>

        {/* Neighborhoods */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 600, color: C.text, marginBottom: 6, letterSpacing: '-0.02em' }}>Browse by neighborhood</h2>
          <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 24 }}>Find providers in your specific corner of Brooklyn.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {neighborhoods.map(n => (
              <button key={n} onClick={() => setPage(`directory/${hoodToSlug[n]}`)}
                style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 20, padding: '8px 18px', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = C.amberLight; e.currentTarget.style.borderColor = C.amberBorder; e.currentTarget.style.color = C.amberDark }}
                onMouseLeave={e => { e.currentTarget.style.background = C.bgWhite; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textDim }}>
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Featured providers */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 600, color: C.text, marginBottom: 4, letterSpacing: '-0.02em' }}>Featured providers</h2>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, margin: 0 }}>Highly rated, verified businesses in Brooklyn.</p>
            </div>
            <button onClick={() => setPage('directory')} style={{ fontFamily: F.mono, fontSize: 13, color: C.amber, background: 'none', border: `1px solid ${C.amberBorder}`, borderRadius: 8, padding: '8px 18px', cursor: 'pointer' }}>View all →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {providers.filter(p => p.featured).slice(0,4).map(p => (
              <div key={p.id} style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, boxShadow: C.shadowSm }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: C.amberLight, border: `1px solid ${C.amberBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: 13, fontWeight: 500, color: C.amber, flexShrink: 0 }}>
                    {p.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.text }}>{p.name}</span>
                      <Tag color="amber">Featured</Tag>
                    </div>
                    <div style={{ fontFamily: F.body, fontSize: 13, color: C.textDim }}>{p.neighborhood} · ⭐ {p.rating} ({p.reviews} reviews)</div>
                  </div>
                </div>
                <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.5, marginBottom: 8 }}>{p.desc}</p>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted }}>📍 {p.address}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools preview */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 600, color: C.text, marginBottom: 4, letterSpacing: '-0.02em' }}>Free tools for dog owners</h2>
          <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 28 }}>Run the real numbers on dog ownership in NYC — costs, food, insurance, and more.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
            {tools.map(t => (
              <button key={t.id} onClick={() => setPage('tools')}
                style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: C.shadowSm }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.blueBorder; e.currentTarget.style.boxShadow = C.shadow }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = C.shadowSm }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{t.icon}</div>
                <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 2 }}>{t.label}</div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.blue }}>Open →</div>
              </button>
            ))}
          </div>
        </div>

        {/* Articles preview */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
            <div>
              <h2 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 600, color: C.text, marginBottom: 4, letterSpacing: '-0.02em' }}>Brooklyn dog guides</h2>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, margin: 0 }}>Practical answers for NYC pet owners.</p>
            </div>
            <button onClick={() => setPage('guides')} style={{ fontFamily: F.mono, fontSize: 13, color: C.amber, background: 'none', border: `1px solid ${C.amberBorder}`, borderRadius: 8, padding: '8px 18px', cursor: 'pointer' }}>All guides →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {articles.slice(0,3).map(a => (
              <button key={a.id} onClick={() => setPage(a.id)}
                style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: C.shadowSm }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderDark; e.currentTarget.style.boxShadow = C.shadow }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = C.shadowSm }}>
                <Tag>{a.tag}</Tag>
                <h3 style={{ fontFamily: F.body, fontSize: 15, fontWeight: 500, color: C.text, margin: '10px 0 8px', lineHeight: 1.4 }}>{a.title}</h3>
                <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, margin: 0, lineHeight: 1.5 }}>{a.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── DIRECTORY PAGE ───────────────────────────────────────────────────────────
// ─── DIRECTORY INTRO CONTENT ──────────────────────────────────────────────────
const hoodIntro = {
  'Williamsburg': 'Williamsburg is one of Brooklyn\'s most dog-dense neighborhoods — you\'ll rarely walk a block without passing another dog. The North Brooklyn pet services scene is competitive and high-quality, with strong options across every category from trainers to daycare to boarding.',
  'Greenpoint': 'Greenpoint\'s tight-knit community vibe extends to its pet services. The neighborhood shares much of the same provider pool as Williamsburg but tends to be slightly quieter and easier for anxious dogs navigating street life.',
  'Park Slope': 'Park Slope is ground zero for Brooklyn dog culture — Prospect Park, wide brownstone sidewalks, and a high concentration of families with dogs. The neighborhood has excellent vets, groomers, trainers, and boarding options, with more competition than almost any other Brooklyn neighborhood.',
  'Bushwick': 'Bushwick\'s growing dog-owner population has driven a strong wave of new pet services. Trainers and daycare options in particular have proliferated — and prices tend to run slightly lower than Williamsburg or Park Slope.',
  'Carroll Gardens': 'Carroll Gardens and the surrounding Red Hook/Cobble Hill area has a walkable, neighborhood-feel pet services scene. Strong vet options and boarding, with a community vibe that makes building long-term relationships with providers easy.',
  'Fort Greene': 'Fort Greene\'s pet services scene serves the dense professional dog-owner population near the Navy Yard and Clinton Hill. Solid vets and trainers, with easy access to both Fort Greene Park and Prospect Park.',
  'DUMBO / Brooklyn Heights': 'DUMBO and Brooklyn Heights sit at the top of Brooklyn geographically and in terms of pet service density. DIGS Hotel, multiple Bond Vet locations, and VERG emergency hospital all serve this area — the most complete pet services cluster in the borough.',
  'Bed-Stuy': 'Bed-Stuy\'s rapidly growing dog-owner population is well-served by Bond Vet, local trainers, and a number of grooming options. The neighborhood has strong transit access and several trainers specializing in urban dog behavior.',
  'Prospect Heights': 'Prospect Heights sits between Park Slope\'s resources and Crown Heights\' quieter blocks. All Creatures Veterinary Hospital, Crown Heights Animal Hospital, and Hounds Town Atlantic Ave serve the neighborhood well.',
  'Kensington': 'Kensington is underrated as a pet services neighborhood — multiple vets on Church Ave and McDonald Ave, and several excellent trainers including PumpkinPups and Zen Dog who specifically serve south Brooklyn residents.',
  'Sunset Park': 'Sunset Park has several grooming and boarding options, with Vetco Total Care providing full-service veterinary care. The neighborhood is convenient for Bay Ridge and Greenwood Heights residents seeking local options.',
}

const catIntro = {
  'Trainers': 'Brooklyn has 31 verified dog trainers across the borough. Look for trainers who use positive reinforcement exclusively — it\'s the only method backed by veterinary behavioral science and the standard among Brooklyn\'s best-reviewed trainers. Certifications like CPDT-KA signal that a trainer has been evaluated by peers.',
  'Daycare': 'Brooklyn\'s 28 daycare centers range from cage-free social play facilities to structured training-integrated programs. The best fit depends on your dog\'s temperament — social dogs thrive in group play, anxious dogs do better in smaller-group or structured environments.',
  'Dog Walkers': 'Brooklyn\'s 13 verified dog walkers offer solo and group walk options across North Brooklyn and beyond. Solo walks cost more but are safer and better for reactive dogs. GPS tracking and insurance are the baseline standard — any serious walker should offer both.',
  'Groomers': 'Brooklyn\'s 22 grooming salons span everything from appointment-only boutique studios to self-service wash stations. Pricing reflects coat complexity — Doodles and double-coated breeds typically cost 20–40% more than average. Building a relationship with one groomer who knows your dog is worth more than price-shopping.',
  'Boarding': 'Brooklyn\'s 24 boarding facilities include luxury hotel-style suites, cage-free daycare-plus-boarding, in-home boarding, and vet-supervised options. Book 2–4 weeks in advance for weekends; holiday weeks fill 4–8 weeks out at popular facilities.',
  'Vets': 'Brooklyn\'s 27 verified veterinary clinics and hospitals include 24-hour emergency specialists (VERG, BluePearl), urgent care chains (Bond Vet), and neighborhood practices that have served specific communities for decades. Building a relationship with a primary vet before an emergency is always the right move.',
}

const DirectoryPage = ({ setPage, initialCat = 'all', initialHood = 'all' }) => {
  const [catFilter, setCatFilter] = useState(initialCat)
  const [hoodFilter, setHoodFilter] = useState(initialHood)
  const [featuredOnly, setFeaturedOnly] = useState(false)

  const filtered = providers.filter(p =>
    (catFilter === 'all' || p.category === catFilter) &&
    (hoodFilter === 'all' || p.neighborhood === hoodFilter) &&
    (!featuredOnly || p.featured)
  )

  // SEO-aware heading
  const seo = catFilter !== 'all' && catSEO[catFilter]
    ? catSEO[catFilter]
    : hoodFilter !== 'all'
    ? hoodSEO(hoodFilter)
    : { h1: 'Find Pet Services Near You', desc: '145 verified providers across Brooklyn. Free to browse.' }

  const handleCatChange = (val) => {
    setCatFilter(val)
    setHoodFilter('all')
    const slug = val === 'all' ? 'directory' : `directory/${catToSlug[val] || val.toLowerCase().replace(/ /g,'-')}`
    window.history.pushState({}, '', '/' + slug)
  }
  const handleHoodChange = (val) => {
    setHoodFilter(val)
    setCatFilter('all')
    const slug = val === 'all' ? 'directory' : `directory/${hoodToSlug[val] || val.toLowerCase().replace(/ /g,'-')}`
    window.history.pushState({}, '', '/' + slug)
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <Tag color="amber">Brooklyn Directory</Tag>
      <h1 style={{ fontFamily: F.display, fontSize: 36, fontWeight: 600, color: C.text, margin: '12px 0 8px', letterSpacing: '-0.02em' }}>{seo.h1}</h1>
      <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: hoodIntro[hoodFilter] || catIntro[catFilter] ? 16 : 32 }}>{seo.desc}</p>
      {(hoodIntro[hoodFilter] || catIntro[catFilter]) && (
        <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, lineHeight: 1.7, marginBottom: 32, paddingLeft: 16, borderLeft: `3px solid ${C.amberBorder}` }}>
          {catIntro[catFilter] || hoodIntro[hoodFilter]}
        </p>
      )}

      {/* Filters */}
      <div style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 20px', marginBottom: 28, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', boxShadow: C.shadowSm }}>
        <select value={catFilter} onChange={e => handleCatChange(e.target.value)}
          style={{ flex: 1, minWidth: 160, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '9px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none', cursor: 'pointer' }}>
          <option value="all">All services</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={hoodFilter} onChange={e => handleHoodChange(e.target.value)}
          style={{ flex: 1, minWidth: 160, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '9px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none', cursor: 'pointer' }}>
          <option value="all">All neighborhoods</option>
          {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: F.body, fontSize: 14, color: C.textDim, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <input type="checkbox" checked={featuredOnly} onChange={e => setFeaturedOnly(e.target.checked)} style={{ accentColor: C.amber, cursor: 'pointer', width: 16, height: 16 }} />
          Top rated only
        </label>
        <div style={{ fontFamily: F.mono, fontSize: 12, color: C.textMuted, marginLeft: 'auto' }}>{filtered.length} providers</div>
      </div>

      {/* Results */}
      <div style={{ display: 'grid', gap: 14 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: C.textMuted, fontFamily: F.body }}>No providers found for that filter combination.</div>
        ) : filtered.map(p => (
          <div key={p.id} style={{ background: C.bgWhite, border: `1px solid ${p.featured ? C.amberBorder : C.border}`, borderRadius: 14, padding: 22, boxShadow: C.shadowSm, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: p.featured ? C.amberLight : C.bgSection, border: `1px solid ${p.featured ? C.amberBorder : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: p.featured ? C.amber : C.textDim, flexShrink: 0 }}>
              {p.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.body, fontSize: 16, fontWeight: 500, color: C.text }}>{p.name}</span>
                {p.featured && <Tag color="amber">Top Rated</Tag>}
                <Tag color="blue">{p.category}</Tag>
              </div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 6 }}>
                📍 {p.address} · ⭐ {p.rating} ({p.reviews} reviews)
              </div>
              {p.phone && <div style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 8 }}>📞 {p.phone}</div>}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                {p.website && (
                  <a href={p.website} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: F.mono, fontSize: 12, color: C.blue, border: `1px solid ${C.blueBorder}`, borderRadius: 6, padding: '5px 12px', textDecoration: 'none', background: C.blueLight }}>
                    Website →
                  </a>
                )}
                {p.booking && (
                  <a href={p.booking} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: F.mono, fontSize: 12, color: C.bgWhite, border: 'none', borderRadius: 6, padding: '5px 12px', textDecoration: 'none', background: C.amber }}>
                    Book Now →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Business CTA */}
      <div style={{ background: C.blueLight, border: `2px solid ${C.blueBorder}`, borderRadius: 16, padding: 28, marginTop: 40, textAlign: 'center' }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.blue, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Are you a pet service provider?</div>
        <h3 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 600, color: C.text, marginBottom: 8 }}>Get your business listed in Brooklyn's pet directory</h3>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 20 }}>Free to list. Featured placement available. Limited spots per neighborhood.</p>
        <button onClick={() => setPage('apply')} style={{ fontFamily: F.mono, fontSize: 13, color: C.bgWhite, background: C.blue, border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 500 }}>Apply for Listing →</button>
      </div>
    </div>
  )
}

// ─── TOOLS PAGE ───────────────────────────────────────────────────────────────
const ToolsPage = () => {
  const [active, setActive] = useState('annual')
  const ActiveTool = tools.find(t => t.id === active)?.component || AnnualCostCalc

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <Tag color="blue">Free Tools</Tag>
      <h1 style={{ fontFamily: F.display, fontSize: 36, fontWeight: 600, color: C.text, margin: '12px 0 8px', letterSpacing: '-0.02em' }}>NYC Dog Owner Calculators</h1>
      <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 36 }}>Ten free tools to understand dog ownership in New York City — costs, grooming, vaccines, boarding, apartment fit, and more.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: 12, position: 'sticky', top: 80, boxShadow: C.shadowSm }}>
          {tools.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              style={{ width: '100%', background: active === t.id ? C.blueLight : 'none', border: active === t.id ? `1px solid ${C.blueBorder}` : '1px solid transparent', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <span style={{ fontFamily: F.body, fontSize: 13, color: active === t.id ? C.blue : C.textDim, fontWeight: active === t.id ? 500 : 400, lineHeight: 1.3 }}>{t.label}</span>
            </button>
          ))}
        </div>
        <Card>
          <ActiveTool />
        </Card>
      </div>
    </div>
  )
}

// ─── GUIDES PAGE ──────────────────────────────────────────────────────────────
const GuidesPage = ({ setPage }) => (
  <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
    <Tag>Guides</Tag>
    <h1 style={{ fontFamily: F.display, fontSize: 36, fontWeight: 600, color: C.text, margin: '12px 0 8px', letterSpacing: '-0.02em' }}>Brooklyn Dog Owner Guides</h1>
    <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 40 }}>Practical, NYC-specific answers to the questions every dog owner has.</p>
    <div style={{ display: 'grid', gap: 12 }}>
      {articles.map(a => (
        <button key={a.id} onClick={() => setPage(a.id)}
          style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 20, transition: 'all 0.2s', boxShadow: C.shadowSm }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderDark; e.currentTarget.style.boxShadow = C.shadow }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = C.shadowSm }}>
          <div style={{ flex: 1 }}>
            <Tag>{a.tag}</Tag>
            <h2 style={{ fontFamily: F.body, fontSize: 16, fontWeight: 500, color: C.text, margin: '10px 0 6px', lineHeight: 1.3 }}>{a.title}</h2>
            <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, margin: 0, lineHeight: 1.5 }}>{a.desc}</p>
          </div>
          <span style={{ fontFamily: F.mono, color: C.amber, fontSize: 18, flexShrink: 0 }}>→</span>
        </button>
      ))}
    </div>
  </div>
)

// ─── ARTICLE PAGE ─────────────────────────────────────────────────────────────
const ArticlePage = ({ article, setPage }) => {
  const Content = article.content
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      <button onClick={() => setPage('guides')} style={{ fontFamily: F.mono, fontSize: 12, color: C.textMuted, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 0 }}>← All Guides</button>
      <Tag>{article.tag}</Tag>
      <h1 style={{ fontFamily: F.display, fontSize: 'clamp(26px,4vw,38px)', fontWeight: 600, color: C.text, margin: '14px 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{article.title}</h1>
      <p style={{ fontFamily: F.body, fontSize: 16, color: C.textDim, borderLeft: `3px solid ${C.amberBorder}`, paddingLeft: 16, lineHeight: 1.6, marginBottom: 36 }}>{article.desc}</p>
      <style>{`
        .art-body h3 { font-family: ${F.display}; color: ${C.text}; font-size: 20px; font-weight: 600; margin: 32px 0 12px; letter-spacing: -0.01em; }
        .art-body p { font-family: ${F.body}; font-size: 15px; color: ${C.textDim}; line-height: 1.8; margin-bottom: 16px; }
        .art-body strong { color: ${C.text}; }
      `}</style>
      <div className="art-body"><Content /></div>
      <ToolCTA setPage={setPage} />
      <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>More guides</div>
        <div style={{ display: 'grid', gap: 10 }}>
          {articles.filter(a => a.id !== article.id).slice(0,3).map(a => (
            <button key={a.id} onClick={() => setPage(a.id)}
              style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 18px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.15s', boxShadow: C.shadowSm }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.borderDark}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <span style={{ fontFamily: F.body, fontSize: 14, color: C.text }}>{a.title}</span>
              <span style={{ color: C.amber }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── FOR BUSINESS PAGE ────────────────────────────────────────────────────────
const ForBusinessPage = ({ setPage }) => {
  const spots = { 'Williamsburg': 3, 'Park Slope': 2, 'Greenpoint': 2, 'Bushwick': 1, 'DUMBO / Brooklyn Heights': 0 }
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <Tag color="blue">For Businesses</Tag>
      <h1 style={{ fontFamily: F.display, fontSize: 'clamp(28px,4vw,42px)', fontWeight: 600, color: C.text, margin: '14px 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>Get found by NYC pet owners<br />who are ready to book.</h1>
      <p style={{ fontFamily: F.body, fontSize: 16, color: C.textDim, maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>Structured neighborhood visibility for independent groomers, walkers, trainers, and vets. Free to list. Featured placement available — limited per neighborhood.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 36 }}>
        <Stat label="Monthly pet owner searches" value="4,200+" accent />
        <Stat label="NYC neighborhoods covered" value="11" />
        <Stat label="Featured spots per neighborhood" value="5 max" />
      </div>

      <div style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginBottom: 28, boxShadow: C.shadowSm }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Featured spots available now</div>
        {Object.entries(spots).map(([hood, filled]) => (
          <div key={hood} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontFamily: F.body, fontSize: 14, color: C.text, minWidth: 200 }}>{hood}</span>
            <div style={{ display: 'flex', gap: 5 }}>
              {Array.from({length:5}).map((_,i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i < filled ? C.blue : C.border, border: `1px solid ${i < filled ? C.blueDark : C.borderDark}` }} />
              ))}
            </div>
            <span style={{ fontFamily: F.mono, fontSize: 12, color: filled >= 5 ? C.red : C.green }}>{filled >= 5 ? 'Full' : `${5 - filled} open`}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <Card>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Listing tiers</div>
          {[
            { name:'Free listing', price:'$0', desc:'Name, location, contact, category', badge:null },
            { name:'Featured placement', price:'$49/mo', desc:'Pinned top of neighborhood · max 5', badge:'Popular' },
            { name:'Multi-neighborhood', price:'$99/mo', desc:'Featured across 3 neighborhoods', badge:'Pro' },
          ].map(t => (
            <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
              <div>
                <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {t.name} {t.badge && <Tag color={t.badge === 'Popular' ? 'blue' : 'amber'}>{t.badge}</Tag>}
                </div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: C.textDim }}>{t.desc}</div>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 14, color: C.blue, fontWeight: 500, whiteSpace: 'nowrap', marginLeft: 16 }}>{t.price}</div>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>What's included</div>
          {[
            { f:'Business profile page', soon:false },
            { f:'Neighborhood directory listing', soon:false },
            { f:'Google review display', soon:false },
            { f:'Contact + booking link', soon:false },
            { f:'Lead inquiry form', soon:false },
            { f:'Booking calendar', soon:true },
            { f:'Client CRM', soon:true },
          ].map(item => (
            <div key={item.f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ color: item.soon ? C.textMuted : C.green, fontSize: 13 }}>{item.soon ? '◦' : '✓'}</span>
              <span style={{ fontFamily: F.body, fontSize: 13, color: item.soon ? C.textMuted : C.textDim }}>{item.f}</span>
              {item.soon && <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '1px 7px', marginLeft: 'auto' }}>Soon</span>}
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[['1','Apply','Submit your business info'],['2','Approval','Verified within 48hrs'],['3','Go live','Appear in search results'],['4','Get leads','Pet owners find you']].map(([n,t,d]) => (
          <div key={n} style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.blueLight, border: `1px solid ${C.blueBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: 12, color: C.blue, margin: '0 auto 10px', fontWeight: 500 }}>{n}</div>
            <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 3 }}>{t}</div>
            <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
      </div>

      <div style={{ background: C.blueLight, border: `2px solid ${C.blueBorder}`, borderRadius: 16, padding: 28, textAlign: 'center' }}>
        <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 600, color: C.text, marginBottom: 8 }}>Ready to get more visibility?</div>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, marginBottom: 20 }}>Free to list. Upgrade anytime. No long-term contracts.</p>
        <button onClick={() => setPage('apply')} style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500, color: C.bgWhite, background: C.blue, border: 'none', borderRadius: 8, padding: '11px 28px', cursor: 'pointer' }}>Apply for Listing →</button>
      </div>
    </div>
  )
}

// ─── APPLY PAGE ───────────────────────────────────────────────────────────────
const EMAILJS_SERVICE  = 'service_9ikdka3'
const EMAILJS_TEMPLATE = 'template_036xeys'
const EMAILJS_KEY      = 'uvhNvbG5tetEAtRYW'

const sendEmail = async (params) => {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id:  EMAILJS_SERVICE,
      template_id: EMAILJS_TEMPLATE,
      user_id:     EMAILJS_KEY,
      template_params: params,
    })
  })
  if (!res.ok) throw new Error('EmailJS send failed')
}

const ApplyPage = ({ setPage }) => {
  const [form, setForm] = useState({ name:'', category:'', neighborhood:'', address:'', phone:'', website:'', email:'', desc:'', tier:'free' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.category || !form.neighborhood) {
      setError('Please fill in all required fields.')
      return
    }
    setSending(true)
    setError('')
    try {
      await sendEmail({
        business_name: form.name,
        category:      form.category,
        neighborhood:  form.neighborhood,
        address:       form.address || 'Not provided',
        phone:         form.phone   || 'Not provided',
        email:         form.email,
        website:       form.website || 'Not provided',
        tier:          form.tier,
        message:       form.desc    || 'No description provided',
      })
      setSubmitted(true)
    } catch (e) {
      setError('Something went wrong. Please try again or email apply@petbizos.com directly.')
    } finally {
      setSending(false)
    }
  }

  if (submitted) return (
    <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 20 }}>🐾</div>
      <h1 style={{ fontFamily: F.display, fontSize: 32, fontWeight: 600, color: C.text, marginBottom: 12 }}>Application received!</h1>
      <p style={{ fontFamily: F.body, fontSize: 16, color: C.textDim, lineHeight: 1.7, marginBottom: 28 }}>
        Thanks for applying to PetBizOS. We review applications within 48 hours and will reach out to <strong>{form.email}</strong> once your listing is approved.
      </p>
      <button onClick={() => setPage('directory')}
        style={{ fontFamily: F.mono, fontSize: 13, color: C.bgWhite, background: C.amber, border: 'none', borderRadius: 8, padding: '11px 28px', cursor: 'pointer', fontWeight: 500 }}>
        Browse the Directory →
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>
      <button onClick={() => setPage('forbusiness')} style={{ fontFamily: F.mono, fontSize: 12, color: C.textMuted, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 0 }}>← For Businesses</button>
      <Tag color="blue">List Your Business</Tag>
      <h1 style={{ fontFamily: F.display, fontSize: 36, fontWeight: 600, color: C.text, margin: '12px 0 8px', letterSpacing: '-0.02em' }}>Apply for a Listing</h1>
      <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 32 }}>Free to list. We review and approve within 48 hours.</p>

      <Card>
        {/* Business name */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>Business name *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Brooklyn Bark Co."
            style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none' }} />
        </div>

        {/* Category + Neighborhood */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div>
            <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>Service category *</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none', cursor: 'pointer' }}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
              <option value="Vets">Vets & Clinics</option>
            </select>
          </div>
          <div>
            <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>Primary neighborhood *</label>
            <select value={form.neighborhood} onChange={e => set('neighborhood', e.target.value)}
              style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none', cursor: 'pointer' }}>
              <option value="">Select neighborhood</option>
              {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Address */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>Street address</label>
          <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Main St, Brooklyn, NY 11201"
            style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none' }} />
        </div>

        {/* Phone + Email */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div>
            <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>Phone number</label>
            <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(718) 555-0100"
              style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>Email address *</label>
            <input value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@yourbusiness.com" type="email"
              style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none' }} />
          </div>
        </div>

        {/* Website */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>Website URL</label>
          <input value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://yourbusiness.com"
            style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none' }} />
        </div>

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 8 }}>Brief description of your business</label>
          <textarea value={form.desc} onChange={e => set('desc', e.target.value)} rows={3} placeholder="Tell pet owners what makes your service stand out..."
            style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none', resize: 'vertical' }} />
        </div>

        {/* Tier */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, display: 'block', marginBottom: 12 }}>Listing tier</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { value:'free',     label:'Free',              price:'$0/mo',   desc:'Standard listing' },
              { value:'featured', label:'Featured',          price:'$49/mo',  desc:'Top of neighborhood' },
              { value:'pro',      label:'Multi-neighborhood',price:'$99/mo',  desc:'3 neighborhoods' },
            ].map(t => (
              <button key={t.value} onClick={() => set('tier', t.value)}
                style={{ background: form.tier === t.value ? C.blueLight : C.bg, border: `2px solid ${form.tier === t.value ? C.blue : C.border}`, borderRadius: 10, padding: '14px 12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: form.tier === t.value ? C.blue : C.text, marginBottom: 2 }}>{t.label}</div>
                <div style={{ fontFamily: F.mono, fontSize: 13, color: form.tier === t.value ? C.blue : C.amber, fontWeight: 500, marginBottom: 4 }}>{t.price}</div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: C.textMuted }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={sending}
          style={{ width: '100%', fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: C.bgWhite, background: sending ? C.textMuted : C.blue, border: 'none', borderRadius: 10, padding: '14px', cursor: sending ? 'not-allowed' : 'pointer' }}>
          {sending ? 'Sending...' : 'Submit Application →'}
        </button>
        {error && <p style={{ fontFamily: F.body, fontSize: 13, color: C.red, textAlign: 'center', marginTop: 10 }}>{error}</p>}
        <p style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted, textAlign: 'center', marginTop: 10 }}>
          * Required fields. We review all applications within 48 hours.
        </p>
      </Card>
    </div>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{ borderTop: `1px solid ${C.border}`, background: C.bgWhite, padding: '40px 24px', marginTop: 60 }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Logo size={24} />
        <div>
          <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 600, color: C.text }}>PetBizOS</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted }}>Brooklyn's pet services platform</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {[['directory','Find Services'],['tools','Owner Tools'],['guides','Guides'],['forbusiness','For Businesses']].map(([p,l]) => (
          <button key={p} onClick={() => setPage(p)} style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{l}</button>
        ))}
      </div>
      <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted }}>© 2026 PetBizOS · Brooklyn, NYC</div>
    </div>
  </footer>
)

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
const urlToPage = (pathname) => pathname.replace(/^\//, '') || 'home'
const pageToUrl = (page) => page === 'home' ? '/' : '/' + page
export default function App() {
  const [page, setPage] = useState(() => urlToPage(window.location.pathname))

  useEffect(() => {
    const handlePop = () => setPage(urlToPage(window.location.pathname))
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (newPage) => {
    window.history.pushState({}, '', pageToUrl(newPage))
    setPage(newPage)
    window.scrollTo(0, 0)
  }
  const article = articles.find(a => a.id === page)

  // Parse directory sub-routes
  const isDirectory = page === 'directory' || page.startsWith('directory/')
  const dirSlug = page.startsWith('directory/') ? page.replace('directory/', '') : null
  const dirCat  = dirSlug && catSlugMap[dirSlug]  ? catSlugMap[dirSlug]  : 'all'
  const dirHood = dirSlug && hoodSlugMap[dirSlug] ? hoodSlugMap[dirSlug] : 'all'

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 2px; background: ${C.border}; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${C.amber}; cursor: pointer; border: 2px solid white; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
        select, input[type=number] { outline: none; }
        button { outline: none; }
      `}</style>
      <Nav page={page} setPage={navigate}/>
      {page === 'home' && <HomePage setPage={navigate}/>}
      {isDirectory && <DirectoryPage setPage={navigate} initialCat={dirCat} initialHood={dirHood}/>}
      {page === 'tools' && <ToolsPage />}
      {page === 'guides' && <GuidesPage setPage={navigate}/>}
      {page === 'forbusiness' && <ForBusinessPage setPage={navigate}/>}
      {page === 'apply' && <ApplyPage setPage={navigate}/>}
      {article && <ArticlePage article={article} setPage={navigate}/>}
      <Footer setPage={navigate}/>
    </div>
  )
}
