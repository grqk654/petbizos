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
const fmt$d = (v, d = 0) => '$' + v.toFixed(d)

// ─── PROVIDER DATA ────────────────────────────────────────────────────────────
const neighborhoods = ['Park Slope','Williamsburg','Crown Heights','Fort Greene','Bushwick','Bay Ridge','Greenpoint','Cobble Hill','DUMBO','Carroll Gardens']
const categories = ['Groomers','Dog Walkers','Trainers','Vets','Boarding','Daycare']

const providers = [
  { id:1, name:'Brooklyn Grooming Co.', category:'Groomers', neighborhood:'Park Slope', rating:4.9, reviews:84, mobile:true, featured:true, desc:'Mobile and in-salon grooming for all breeds. Specializing in doodles and double-coated dogs.', phone:'(718) 555-0101', tags:['Mobile','All breeds','Doodle specialist'] },
  { id:2, name:'Pawfect Cuts', category:'Groomers', neighborhood:'Williamsburg', rating:4.8, reviews:61, mobile:false, featured:true, desc:'Full-service grooming studio. Walk-ins welcome on weekdays.', phone:'(718) 555-0102', tags:['Walk-ins','Full service'] },
  { id:3, name:'The Grooming Parlor', category:'Groomers', neighborhood:'Park Slope', rating:4.7, reviews:43, mobile:false, featured:false, desc:'Appointment-based boutique grooming in the heart of Park Slope.', phone:'(718) 555-0103', tags:['Boutique','By appointment'] },
  { id:4, name:'Prospect Park Walkers', category:'Dog Walkers', neighborhood:'Park Slope', rating:4.9, reviews:112, mobile:false, featured:true, desc:'Solo and group walks in and around Prospect Park. GPS tracked, insured.', phone:'(718) 555-0201', tags:['GPS tracked','Insured','Solo & group'] },
  { id:5, name:'BK Dog Walker', category:'Dog Walkers', neighborhood:'Williamsburg', rating:4.7, reviews:78, mobile:false, featured:true, desc:'Reliable daily walks across Williamsburg and Greenpoint.', phone:'(718) 555-0202', tags:['Daily walks','Greenpoint coverage'] },
  { id:6, name:'Happy Tails Walking', category:'Dog Walkers', neighborhood:'Crown Heights', rating:4.8, reviews:55, mobile:false, featured:false, desc:'Crown Heights based walker serving surrounding neighborhoods.', phone:'(718) 555-0203', tags:['Crown Heights','Flexible scheduling'] },
  { id:7, name:'Brooklyn K9 Training', category:'Trainers', neighborhood:'Park Slope', rating:5.0, reviews:34, mobile:false, featured:true, desc:'Positive reinforcement training for puppies through adult dogs. Group and private sessions.', phone:'(718) 555-0301', tags:['Positive reinforcement','Puppy classes','Private & group'] },
  { id:8, name:'Urban Dog Training NYC', category:'Trainers', neighborhood:'Williamsburg', rating:4.8, reviews:47, mobile:true, featured:false, desc:'In-home and virtual training. Specializing in reactive dogs and leash manners.', phone:'(718) 555-0302', tags:['In-home','Reactive dogs','Virtual available'] },
  { id:9, name:'Animal Kind Veterinary', category:'Vets', neighborhood:'Park Slope', rating:4.9, reviews:203, mobile:false, featured:true, desc:'Full-service veterinary care. Wellness exams, vaccines, surgery, and urgent care.', phone:'(718) 555-0401', tags:['Full service','Urgent care','Surgery'] },
  { id:10, name:'Cobble Hill Animal Hospital', category:'Vets', neighborhood:'Cobble Hill', rating:4.8, reviews:156, mobile:false, featured:true, desc:'Family vet clinic serving Cobble Hill and Carroll Gardens for over 20 years.', phone:'(718) 555-0402', tags:['Established','Family clinic','Full service'] },
  { id:11, name:'BK Pet Hotel', category:'Boarding', neighborhood:'Fort Greene', rating:4.9, reviews:89, mobile:false, featured:true, desc:'Luxury boarding with private suites, daily play groups, and webcam access.', phone:'(718) 555-0501', tags:['Private suites','Webcam','Play groups'] },
  { id:12, name:'Home Away Boarding', category:'Boarding', neighborhood:'Park Slope', rating:4.8, reviews:67, mobile:false, featured:false, desc:'In-home boarding with a professional dog lover. Small groups only.', phone:'(718) 555-0502', tags:['In-home','Small groups','Personalized'] },
  { id:13, name:'Play Brooklyn Daycare', category:'Daycare', neighborhood:'Williamsburg', rating:4.7, reviews:92, mobile:false, featured:true, desc:'All-day play and socialization. Drop-in and monthly membership options.', phone:'(718) 555-0601', tags:['Drop-in available','Membership','Socialization'] },
  { id:14, name:'Biscuit & Play', category:'Daycare', neighborhood:'Greenpoint', rating:4.8, reviews:58, mobile:false, featured:false, desc:'Small-batch daycare in Greenpoint. Maximum 12 dogs per session.', phone:'(718) 555-0602', tags:['Small batch','Greenpoint','Max 12 dogs'] },
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

const tools = [
  { id:'annual', label:'Annual Ownership Cost', icon:'🐾', component:AnnualCostCalc },
  { id:'food', label:'Dog Food Calculator', icon:'🥣', component:DogFoodCalc },
  { id:'insurance', label:'Pet Insurance Value', icon:'🛡️', component:InsuranceCalc },
  { id:'vet', label:'Vet Budget Planner', icon:'🏥', component:VetBudgetCalc },
  { id:'walking', label:'Walker vs Boarding Cost', icon:'🦮', component:WalkerVsBoardingCalc },
  { id:'puppy', label:'Puppy First Year', icon:'🐶', component:PuppyFirstYearCalc },
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
        <p>What products do you use? (Relevant for sensitive skin.) How long will the appointment take? Do you do the full groom yourself or hand off mid-process? What happens if my dog is too anxious to complete the groom?</p>
        <h3>Red Flags</h3>
        <p>Refusing to show you the space. Vague answers about products. No reviews or only generic 5-star reviews with no detail. Significantly lower prices than the market rate (usually means rushed, high-volume grooming).</p>
        <FAQItem q="How often should I groom my dog?" a="It depends on the breed. Double-coated dogs (Huskies, Labs) need brushing 2–3x per week and professional grooming 2–4x per year. Long-haired breeds (Shih Tzus, Maltese) need professional grooming every 6–8 weeks. Short-haired dogs can often go 3–4 months between professional sessions." />
        <FAQItem q="What's a fair price for grooming in Brooklyn?" a="Expect $60–$100 for a small dog, $80–$130 for a medium dog, and $100–$160 for a large dog. Mobile grooming runs $20–$40 higher than salon grooming due to convenience." />
      </>
    )
  },
  {
    id: 'is-pet-insurance-worth-it',
    title: 'Is Pet Insurance Worth It in NYC? The Honest Math',
    tag: 'INSURANCE',
    desc: 'Pet insurance sounds smart, but the math isn\'t always obvious. Here\'s how to run it.',
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
    title: 'Dog Walking vs Boarding: What\'s Best for Your Dog?',
    tag: 'SERVICES',
    desc: 'Both serve different needs. Here\'s how to decide — and what it actually costs in Brooklyn.',
    content: () => (
      <>
        <p>Dog walking and boarding solve different problems. Walking is about daily exercise and routine. Boarding is about overnight and multi-day care when you're away. Most NYC dog owners need both, but the right balance depends on your schedule and your dog.</p>
        <h3>Dog Walking — What to Know</h3>
        <p>Solo walks (one dog, one walker) are safer and better for your dog but cost more — $30–$45 per 30-minute walk in Brooklyn. Group walks ($20–$28) are fine for social, well-trained dogs. Daily walking via a regular walker provides consistency and socialization that most apartment dogs need.</p>
        <h3>Boarding — What to Know</h3>
        <p>In-home boarding (a professional keeping your dog in their home) is typically less stressful than kennel boarding for dogs that aren't used to kennels. Facility boarding offers more structure and often more staff oversight. Both options in Brooklyn run $55–$95/night.</p>
        <h3>The Hybrid: Dog Daycare</h3>
        <p>Daycare fills the gap between walking and boarding. It's a full day of supervised play — ideal for high-energy dogs whose owners work long hours. Brooklyn daycare runs $35–$60/day with monthly memberships available.</p>
        <FAQItem q="Is boarding stressful for dogs?" a="It depends on the dog. Dogs that are well-socialized and used to other dogs often thrive in boarding environments. More anxious or territorial dogs do better with in-home boarding or a trusted pet-sitter. The first time is usually the hardest — most dogs adjust by the second or third stay." />
        <FAQItem q="How do I find a trustworthy dog walker in Brooklyn?" a="Look for GPS-tracked walks, insurance, and real reviews with specific details. Ask for a meet-and-greet before committing. Red flags include walkers who refuse to share walk routes or can't tell you who exactly walks your dog each day." />
      </>
    )
  },
  {
    id: 'how-to-choose-dog-trainer-nyc',
    title: 'How to Choose a Dog Trainer in NYC',
    tag: 'TRAINING',
    desc: 'Certifications matter. Methods matter more. Here\'s what separates good trainers from bad ones.',
    content: () => (
      <>
        <p>Dog training in NYC is an unregulated industry. Anyone can call themselves a trainer. Knowing what to look for — and what to avoid — makes a significant difference in outcomes for your dog.</p>
        <h3>Certifications Worth Looking For</h3>
        <p>CPDT-KA (Certified Professional Dog Trainer) is the gold standard for individual trainers. KPA-CTP (Karen Pryor Academy) indicates strong force-free methodology training. These aren't required but signal a trainer has been evaluated by peers.</p>
        <h3>Methods — The Most Important Factor</h3>
        <p>Force-free, positive reinforcement training is backed by the strongest scientific evidence and is recommended by the American Veterinary Society of Animal Behavior. Avoid trainers who use prong collars, e-collars (shock collars), alpha/dominance theory, or any method involving physical punishment. These approaches can increase aggression and anxiety.</p>
        <h3>Private vs Group Classes</h3>
        <p>Group classes (typically $150–$300 for a 6-week series) are ideal for basic obedience and puppy socialization. Private training ($100–$200/session in NYC) is better for specific behavioral issues, reactive dogs, or owners who need personalized instruction.</p>
        <FAQItem q="How long does dog training take?" a="Basic obedience — sit, stay, come, leash manners — can be established in 6–8 weeks of consistent practice. Behavioral issues like reactivity or aggression take months of work. Training is ongoing; it's a habit, not a one-time event." />
        <FAQItem q="Can I train my dog myself?" a="Yes, for basic obedience. There are excellent online resources and books. But for behavioral problems — reactivity, resource guarding, aggression — a professional trainer is strongly recommended. DIY approaches to serious behavioral issues can make things worse." />
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
        <h3>Required by Most Facilities (Daycare, Boarding, Dog Parks)</h3>
        <p><strong>DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza):</strong> Core vaccine, typically given as a puppy series then every 1–3 years.</p>
        <p><strong>Bordetella (Kennel Cough):</strong> Required by virtually all NYC boarding and daycare facilities. Given every 6–12 months. Particularly important given the density of dogs in NYC parks and facilities.</p>
        <h3>Strongly Recommended for NYC Dogs</h3>
        <p><strong>Leptospirosis:</strong> NYC's rat population makes this a real risk. The bacteria is spread through rat urine in water and soil. Most NYC vets strongly recommend this vaccine, especially for dogs that spend time in parks.</p>
        <FAQItem q="How much do dog vaccines cost in Brooklyn?" a="A wellness exam plus core vaccines (DHPP, Bordetella, Rabies) typically runs $200–$350 at a Brooklyn vet clinic. Low-cost vaccine clinics are available through NYC Animal Care Centers and some rescue organizations for income-qualifying owners." />
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
        <p>Annual wellness exam, vaccines (DHPP, Bordetella, Rabies), heartworm test and prevention, flea/tick prevention, and dental cleaning every 1–2 years. In NYC, expect the high end of this range — vet exam fees alone often run $80–$120.</p>
        <h3>Bucket 2: Expected Unexpected ($300–$800/year)</h3>
        <p>Ear infections, skin issues, minor injuries, GI problems — these happen to virtually every dog. Budget $300–$800/year for non-emergency sick visits. Dogs with allergies or chronic conditions will sit at the higher end of this range.</p>
        <h3>Bucket 3: True Emergency Fund ($2,500–$5,000)</h3>
        <p>Cruciate ligament tears, foreign body ingestion, bloat, cancer diagnosis — major medical events that happen at least once in most dogs' lives. NYC emergency vet care is expensive: after-hours emergency exam fees alone start at $150–$200, before any treatment.</p>
        <FAQItem q="What are the most expensive dog health issues?" a="Cruciate (ACL) repairs run $3,500–$6,000 per leg in NYC. Cancer treatment can run $5,000–$15,000+. Bloat surgery is $3,000–$7,000 and requires immediate action. Hip dysplasia surgery is $3,500–$7,000 per hip." />
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
        <p>Brooklyn has a thriving dog-friendly dining scene, particularly in Park Slope, Williamsburg, and Carroll Gardens. The distinction between "allows dogs on the patio" and "actively welcomes dogs" matters — here's what to look for.</p>
        <h3>What Counts as Dog-Friendly</h3>
        <p>A truly dog-friendly spot has outdoor seating with space for your dog to sit comfortably, ideally provides water bowls without being asked, has staff that seem genuinely pleased to see dogs, and is located on a block where your dog can settle without constant pedestrian stress.</p>
        <h3>Park Slope</h3>
        <p>The most dog-dense neighborhood in Brooklyn. Numerous Seventh Avenue cafes and restaurants allow dogs on their sidewalk patios. The proximity to Prospect Park makes it natural — dog owners stop in after morning park runs constantly.</p>
        <h3>Williamsburg</h3>
        <p>Several bars along Wythe and Bedford have large outdoor areas that are de facto dog hangouts on weekends. The neighborhood's density of young professionals with dogs creates a natural dog-friendly culture.</p>
        <h3>Red Hook</h3>
        <p>The waterfront area has several spots with large outdoor areas and a relaxed atmosphere that suits dogs well. Less foot traffic than other neighborhoods means calmer environments for anxious dogs.</p>
        <FAQItem q="Are dogs allowed inside NYC restaurants?" a="No — NYC Health Code prohibits dogs inside food service establishments, with the exception of certified service animals. Only outdoor seating (patios, sidewalk tables) can accommodate pet dogs." />
        <FAQItem q="What's the etiquette for bringing dogs to restaurant patios?" a="Keep your dog leashed and close to your chair, not blocking walkways. Bring your own water bowl or ask — don't assume the restaurant has one. Make sure your dog is well-exercised before arriving. A tired dog is a good restaurant dog." />
      </>
    )
  },
  {
    id: 'first-year-puppy-guide',
    title: 'First Year with a Puppy in NYC: What to Expect and Budget For',
    tag: 'PUPPIES',
    desc: 'The first year is the hardest and the most expensive. Here\'s the full honest picture for NYC.',
    content: () => (
      <>
        <p>Getting a puppy in NYC is harder and more expensive than almost anywhere else in the country. Apartments are smaller, streets are louder, and services cost more. But it's also uniquely rewarding — NYC dogs tend to be exceptionally well-socialized due to constant exposure. Here's what to actually expect.</p>
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
          {/* Search */}
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
            {['Free for pet owners','340+ NYC providers','Verified listings'].map(t => (
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
            { cat:'Groomers', icon:'✂', count:6, color:C.amberLight, border:C.amberBorder },
            { cat:'Dog Walkers', icon:'🦮', count:8, color:C.blueLight, border:C.blueBorder },
            { cat:'Trainers', icon:'🎓', count:4, color:C.greenLight, border:'#C0DD97' },
            { cat:'Vets & Clinics', icon:'🏥', count:6, color:C.amberLight, border:C.amberBorder },
            { cat:'Boarding', icon:'🏠', count:5, color:C.blueLight, border:C.blueBorder },
            { cat:'Daycare', icon:'☀', count:4, color:C.greenLight, border:'#C0DD97' },
          ].map(({ cat, icon, count, color, border }) => (
            <button key={cat} onClick={() => setPage('directory')}
              style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: '20px 22px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: C.shadowSm }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderDark; e.currentTarget.style.boxShadow = C.shadow }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = C.shadowSm }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: color, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: F.body, fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 3 }}>{cat}</div>
              <div style={{ fontFamily: F.mono, fontSize: 12, color: C.textMuted }}>{count} in Brooklyn</div>
            </button>
          ))}
        </div>

        {/* Neighborhoods */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 600, color: C.text, marginBottom: 6, letterSpacing: '-0.02em' }}>Browse by neighborhood</h2>
          <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 24 }}>Find providers in your specific corner of Brooklyn.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {neighborhoods.map(n => (
              <button key={n} onClick={() => setPage('directory')}
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
                <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tags.map(t => <Tag key={t} color="gray">{t}</Tag>)}
                </div>
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
const DirectoryPage = () => {
  const [catFilter, setCatFilter] = useState('all')
  const [hoodFilter, setHoodFilter] = useState('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)

  const filtered = providers.filter(p =>
    (catFilter === 'all' || p.category === catFilter) &&
    (hoodFilter === 'all' || p.neighborhood === hoodFilter) &&
    (!featuredOnly || p.featured)
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <Tag color="amber">Brooklyn Directory</Tag>
      <h1 style={{ fontFamily: F.display, fontSize: 36, fontWeight: 600, color: C.text, margin: '12px 0 8px', letterSpacing: '-0.02em' }}>Find Pet Services Near You</h1>
      <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 32 }}>Verified providers across Brooklyn. Free to browse.</p>

      {/* Filters */}
      <div style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 20px', marginBottom: 28, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', boxShadow: C.shadowSm }}>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ flex: 1, minWidth: 160, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '9px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none', cursor: 'pointer' }}>
          <option value="all">All services</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={hoodFilter} onChange={e => setHoodFilter(e.target.value)}
          style={{ flex: 1, minWidth: 160, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '9px 14px', fontFamily: F.body, fontSize: 14, color: C.text, outline: 'none', cursor: 'pointer' }}>
          <option value="all">All neighborhoods</option>
          {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: F.body, fontSize: 14, color: C.textDim, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <input type="checkbox" checked={featuredOnly} onChange={e => setFeaturedOnly(e.target.checked)} style={{ accentColor: C.amber, cursor: 'pointer', width: 16, height: 16 }} />
          Featured only
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
                {p.featured && <Tag color="amber">Featured</Tag>}
                <Tag color="blue">{p.category}</Tag>
                {p.mobile && <Tag color="green">Mobile</Tag>}
              </div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginBottom: 8 }}>
                📍 {p.neighborhood} · ⭐ {p.rating} ({p.reviews} reviews) · {p.phone}
              </div>
              <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, lineHeight: 1.5, marginBottom: 10 }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.tags.map(t => <Tag key={t} color="gray">{t}</Tag>)}
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
        <button style={{ fontFamily: F.mono, fontSize: 13, color: C.bgWhite, background: C.blue, border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 500 }}>Apply for Listing →</button>
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
      <p style={{ fontFamily: F.body, fontSize: 15, color: C.textDim, marginBottom: 36 }}>Six free tools to understand the real costs of dog ownership in New York City.</p>
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
const ForBusinessPage = () => {
  const spots = { 'Park Slope': 3, 'Williamsburg': 2, 'Crown Heights': 1, 'Fort Greene': 1, 'Bushwick': 0 }
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <Tag color="blue">For Businesses</Tag>
      <h1 style={{ fontFamily: F.display, fontSize: 'clamp(28px,4vw,42px)', fontWeight: 600, color: C.text, margin: '14px 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>Get found by NYC pet owners<br />who are ready to book.</h1>
      <p style={{ fontFamily: F.body, fontSize: 16, color: C.textDim, maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>Structured neighborhood visibility for independent groomers, walkers, trainers, and vets. Free to list. Featured placement available — limited per neighborhood.</p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 36 }}>
        <Stat label="Monthly pet owner searches" value="4,200+" accent />
        <Stat label="NYC neighborhoods covered" value="18" />
        <Stat label="Featured spots per neighborhood" value="5 max" />
      </div>

      {/* Scarcity */}
      <div style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginBottom: 28, boxShadow: C.shadowSm }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Featured spots available now</div>
        {Object.entries(spots).map(([hood, filled]) => (
          <div key={hood} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontFamily: F.body, fontSize: 14, color: C.text, minWidth: 140 }}>{hood}</span>
            <div style={{ display: 'flex', gap: 5 }}>
              {Array.from({length:5}).map((_,i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i < filled ? C.blue : C.border, border: `1px solid ${i < filled ? C.blueDark : C.borderDark}` }} />
              ))}
            </div>
            <span style={{ fontFamily: F.mono, fontSize: 12, color: filled >= 5 ? C.red : C.green }}>{filled >= 5 ? 'Full' : `${5 - filled} open`}</span>
          </div>
        ))}
      </div>

      {/* Tiers */}
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

      {/* Process */}
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
        <button style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500, color: C.bgWhite, background: C.blue, border: 'none', borderRadius: 8, padding: '11px 28px', cursor: 'pointer' }}>Apply for Listing →</button>
      </div>
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
  const [page, setPage] = useState('home')
  const article = articles.find(a => a.id === page)

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
      <Nav page={page} setPage={setPage} />
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'directory' && <DirectoryPage />}
      {page === 'tools' && <ToolsPage />}
      {page === 'guides' && <GuidesPage setPage={setPage} />}
      {page === 'forbusiness' && <ForBusinessPage />}
      {article && <ArticlePage article={article} setPage={setPage} />}
      <Footer setPage={setPage} />
    </div>
  )
}
