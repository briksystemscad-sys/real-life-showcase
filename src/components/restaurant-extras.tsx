import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import table from '@/assets/gathering.jpg.asset.json';
import drink from '@/assets/citrus-drink.jpg.asset.json';
import grill from '@/assets/grill.jpg.asset.json';

const questions = [
  ['What’s in jerk seasoning?', 'Jerk blends typically bring together allspice, thyme, ginger and chilli. The heat is only one part of it: fragrant spice, smoke and citrus do the rest.'],
  ['Where should I start with the menu?', 'Start with jerk chicken and rice & peas for a classic combination, or explore curry goat and roti. Add plantain for sweetness and a sorrel fizz for a bright finish.'],
  ['What if I have an allergy or dietary requirement?', 'Ingredient descriptions are not a complete allergen list. Please confirm ingredients and preparation directly with the kitchen before ordering. Dietary suitability cannot be guaranteed here.'],
  ['Can I plan a gathering?', 'You can prepare a catering enquiry with your date, guest count and dietary needs. The planner downloads a personal draft; enquiries and bookings are not yet open.'],
];

export function RestaurantExtras() {
  return <>
    <section className="section journal" id="journal">
      <div className="section-head"><div><p className="eyebrow">Fire, flavour & company</p><h2 className="section-title">A taste of<br/>island life.</h2></div><p className="section-description">The inspiration behind the table: a patient fire, something bright in your glass, and food worth gathering for.</p></div>
      <div className="journal-grid">
        {[{image:table,title:'Make room at the table',note:'Food is better shared.'},{image:drink,title:'A little citrus. A little sunshine.',note:'Bright flavours, long conversations.'},{image:grill,title:'Let the fire do its thing',note:'Smoke, spice and a little patience.'}].map((item,i)=><figure className="journal-photo" key={item.title}><div className="journal-image"><img src={item.image.url} alt={i===0?'A long dining table set with glasses, plates and fresh flowers':i===1?'A refreshing iced drink with citrus garnish':'Grilled food with colourful vegetables'} loading="lazy" width={1200} height={1400}/><span className="journal-index">0{i+1} / ISLAND INSPIRATION</span></div><figcaption><h3>{item.title}</h3><p>{item.note}</p></figcaption></figure>)}
      </div>
    </section>
    <div className="questions-band"><section className="section dining-questions" id="questions"><div><p className="eyebrow">Before the first bite</p><h2 className="section-title">Good questions.<br/>Straight answers.</h2></div><Accordion type="single" collapsible className="restaurant-faq">{questions.map(([question,answer],i)=><AccordionItem value={`question-${i}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></section></div>
  </>;
}