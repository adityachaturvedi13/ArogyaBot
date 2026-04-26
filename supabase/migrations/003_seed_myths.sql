-- ArogyaBot Seed Data
-- Migration 003: 25 verified myth/fact pairs
-- Sources: WHO, CDC, MoHFW

-- ─── COVID (5) ───────────────────────────────────────────────────────────────

INSERT INTO myths (myth_text, fact_text, explanation, category, verified_by, language) VALUES
(
  'Drinking hot water or gargling with warm salt water can cure COVID-19.',
  'There is no evidence that hot water or gargling can cure or prevent COVID-19.',
  'While staying hydrated is good for general health, no temperature of water can kill the virus once it has entered your body. COVID-19 is treated with proper medical care.',
  'covid', 'WHO', 'en'
),
(
  'COVID-19 vaccines contain microchips for tracking people.',
  'COVID-19 vaccines do not contain microchips, nanobots, or any tracking devices.',
  'Vaccines contain mRNA or viral proteins, lipids, salts, and sugars — standard vaccine ingredients. This conspiracy theory has been thoroughly debunked by multiple health agencies worldwide.',
  'covid', 'CDC', 'en'
),
(
  'Homeopathy or Ayurveda can fully cure COVID-19.',
  'No alternative medicine system has been proven to cure COVID-19. WHO recommends evidence-based treatments.',
  'While traditional medicine may support general wellness, there is no scientific evidence that any alternative medicine can cure COVID-19. Always follow your doctor''s advice for COVID treatment.',
  'covid', 'WHO', 'en'
),
(
  'Wearing masks causes carbon dioxide poisoning and oxygen deficiency.',
  'Standard medical masks do not cause CO2 poisoning or significant oxygen reduction.',
  'Medical masks are designed to be breathable. CO2 molecules are small enough to pass through mask material easily. Healthcare workers wear masks for hours daily without any CO2-related issues.',
  'covid', 'CDC', 'en'
),
(
  'COVID-19 is just like the flu and is not dangerous.',
  'COVID-19 is significantly more dangerous than seasonal flu, with higher hospitalization and death rates.',
  'COVID-19 has a higher fatality rate, can cause long-term organ damage (Long COVID), and spreads more easily than influenza. Vaccination and precautions remain important.',
  'covid', 'WHO', 'en'
);

-- ─── VACCINES (5) ────────────────────────────────────────────────────────────

INSERT INTO myths (myth_text, fact_text, explanation, category, verified_by, language) VALUES
(
  'Vaccines cause autism in children.',
  'Extensive research involving millions of children has found NO link between vaccines and autism.',
  'The original 1998 study claiming this link was fraudulent and has been retracted. The author lost his medical license. Dozens of large-scale studies since then have confirmed vaccines do not cause autism.',
  'vaccines', 'WHO', 'en'
),
(
  'Too many vaccines at once overwhelm a child''s immune system.',
  'Children''s immune systems can safely handle multiple vaccines. The immune system encounters thousands of antigens daily.',
  'A child''s immune system responds to thousands of germs every day. The antigens in all childhood vaccines combined are a tiny fraction of what children naturally encounter.',
  'vaccines', 'CDC', 'en'
),
(
  'Natural immunity is always better than vaccine immunity.',
  'While natural infection can provide immunity, the risks of disease far outweigh the risks of vaccination.',
  'Some diseases like measles, polio, and tetanus can cause severe disability or death. Vaccines provide immunity without the dangerous side effects of the actual disease.',
  'vaccines', 'WHO', 'en'
),
(
  'The flu vaccine can give you the flu.',
  'Flu vaccines cannot give you the flu. Injectable flu vaccines contain inactivated (killed) virus.',
  'Some people may feel mild side effects like soreness or low-grade fever after vaccination — this is your immune system responding, not the flu. These symptoms resolve in 1-2 days.',
  'vaccines', 'CDC', 'en'
),
(
  'HPV vaccine is unnecessary and only for girls.',
  'HPV vaccine is recommended for both boys and girls and prevents several types of cancer.',
  'HPV can cause cervical, throat, anal, and penile cancers. Vaccinating both genders prevents the spread of HPV and protects everyone. The vaccine is most effective when given before age 15.',
  'vaccines', 'WHO', 'en'
);

-- ─── DENGUE (3) ──────────────────────────────────────────────────────────────

INSERT INTO myths (myth_text, fact_text, explanation, category, verified_by, language) VALUES
(
  'Papaya leaf juice is a proven cure for dengue fever.',
  'There is no scientifically proven cure for dengue. Papaya leaf extract may help increase platelet count but is not a cure.',
  'While some studies show papaya leaf extract might help with platelet count, dengue treatment requires proper medical monitoring, hydration, and rest. Never rely solely on home remedies for dengue.',
  'dengue', 'WHO', 'en'
),
(
  'Dengue spreads from person to person by touching or being near an infected person.',
  'Dengue does NOT spread through person-to-person contact. It spreads only through Aedes mosquito bites.',
  'Dengue is transmitted when an Aedes mosquito bites an infected person and then bites a healthy person. You cannot get dengue from touching, hugging, or being near someone with dengue.',
  'dengue', 'MoHFW', 'en'
),
(
  'Dengue only occurs in dirty, unhygienic areas.',
  'Dengue mosquitoes breed in clean, stagnant water — even in affluent neighborhoods.',
  'Aedes mosquitoes prefer clean, standing water in flower pots, coolers, tires, and water containers. Dengue cases are common even in well-maintained urban areas. Eliminating standing water is key prevention.',
  'dengue', 'MoHFW', 'en'
);

-- ─── MALARIA (3) ─────────────────────────────────────────────────────────────

INSERT INTO myths (myth_text, fact_text, explanation, category, verified_by, language) VALUES
(
  'Malaria spreads from one person to another like the common cold.',
  'Malaria does NOT spread person-to-person. It is transmitted only through infected Anopheles mosquito bites.',
  'The malaria parasite (Plasmodium) requires the Anopheles mosquito as a vector. You cannot catch malaria from being near someone who has it, sharing food, or casual contact.',
  'malaria', 'WHO', 'en'
),
(
  'Malaria only occurs in rural and forested areas.',
  'Malaria can occur in urban areas too, especially in tropical and subtropical regions with stagnant water.',
  'While malaria is more common in rural areas, urban malaria is a growing concern in India. Construction sites, blocked drains, and water tanks in cities can also breed malaria-carrying mosquitoes.',
  'malaria', 'MoHFW', 'en'
),
(
  'Eating garlic or certain foods can prevent malaria.',
  'No food or dietary supplement has been proven to prevent malaria. Prevention requires mosquito bite avoidance and prophylactic medication.',
  'The only proven malaria prevention methods are using mosquito nets (especially insecticide-treated nets), applying repellents, wearing long sleeves, and taking prescribed anti-malarial drugs when traveling to endemic areas.',
  'malaria', 'WHO', 'en'
);

-- ─── NUTRITION (4) ───────────────────────────────────────────────────────────

INSERT INTO myths (myth_text, fact_text, explanation, category, verified_by, language) VALUES
(
  'Eating cold foods or drinking cold water causes colds and coughs.',
  'Colds are caused by viruses, not by cold food or beverages. Temperature of food does not affect your susceptibility to colds.',
  'The common cold is caused by rhinoviruses and other pathogens, not by temperature. Cold weather may make people gather indoors more, increasing virus spread, but cold food itself does not cause illness.',
  'nutrition', 'CDC', 'en'
),
(
  'Eating after 8 PM causes weight gain.',
  'Weight gain is caused by consuming more calories than you burn, regardless of when you eat.',
  'Your body processes food the same way at any hour. What matters for weight management is total calorie intake, nutritional quality, and physical activity — not the time on the clock.',
  'nutrition', 'CDC', 'en'
),
(
  'Megadoses of Vitamin C can prevent all illnesses.',
  'While Vitamin C supports immune function, megadoses do not prevent all illnesses and can cause side effects.',
  'The recommended daily intake of Vitamin C is 65-90mg for adults. Excessive doses (over 2000mg) can cause digestive issues and kidney stones. A balanced diet with fruits and vegetables provides adequate Vitamin C.',
  'nutrition', 'WHO', 'en'
),
(
  'Detox teas and juice cleanses can cleanse your liver and remove toxins.',
  'Your liver and kidneys naturally detoxify your body. There is no scientific evidence that detox teas or cleanses improve this process.',
  'The liver is remarkably efficient at filtering toxins on its own. Many "detox" products contain laxatives or diuretics that can cause dehydration. The best way to support liver health is a balanced diet and limiting alcohol.',
  'nutrition', 'CDC', 'en'
);

-- ─── MENTAL HEALTH (5) ──────────────────────────────────────────────────────

INSERT INTO myths (myth_text, fact_text, explanation, category, verified_by, language) VALUES
(
  'Mental illness is a sign of personal weakness or lack of willpower.',
  'Mental illness is a medical condition caused by biological, psychological, and environmental factors — not weakness.',
  'Mental health conditions involve changes in brain chemistry, genetics, and life experiences. They are as real as physical illnesses like diabetes or heart disease. Seeking help is a sign of strength, not weakness.',
  'mental_health', 'WHO', 'en'
),
(
  'Depression is a choice — people can just snap out of it if they try harder.',
  'Depression is a serious medical condition that cannot be overcome by willpower alone. It often requires professional treatment.',
  'Depression involves changes in brain chemistry and neural pathways. It is not a mood that can be switched off. Treatment may include therapy, medication, lifestyle changes, or a combination. Recovery is possible with proper support.',
  'mental_health', 'WHO', 'en'
),
(
  'Therapy and counseling are only for people with severe mental illness.',
  'Therapy benefits everyone — from everyday stress and relationship issues to clinical conditions.',
  'Just as you visit a doctor for physical checkups, mental health support is valuable for everyone. Therapy can help with stress management, grief, life transitions, self-improvement, and building resilience.',
  'mental_health', 'WHO', 'en'
),
(
  'Yoga and meditation alone can completely cure clinical depression.',
  'While yoga and meditation are beneficial complementary practices, they are not a substitute for professional treatment of clinical depression.',
  'Yoga and meditation can reduce stress and improve well-being, and they are often recommended alongside professional treatment. However, moderate to severe depression typically requires therapy, and sometimes medication, for effective management.',
  'mental_health', 'MoHFW', 'en'
),
(
  'Talking about suicide encourages people to attempt it.',
  'Talking openly and compassionately about suicide actually reduces risk. It gives people permission to seek help.',
  'Research shows that asking someone directly about suicidal thoughts does NOT increase their risk. It creates a safe space for them to share their feelings and seek help. If someone is in crisis, call NIMHANS (080-46110007) or iCall (9152987821).',
  'mental_health', 'WHO', 'en'
);
