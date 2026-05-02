exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("birds")
    .del()
// Inserts seed entries
    .then(() => knex("birds").insert([
      { 
        id: 1,
        bird_name: "Kōtare",
        bird_english_name: "Sacred Kingfisher",
        bird_img: "/images/kotare.png",
        bird_audio: "/audio/kotare.m4a",
        bird_rarity: "common",
        bird_nocturnal: false,
        bird_tag: "Native and found in Australia and parts of the Western Pacific. Said to be called the ‘Sacred Kingfisher’ due to their place in the philosophy of some pacific regions as able to influence the ocean waves.",
        bird_info: "Mostly recorded singly or in pairs. The breeding pair is the most normal social unit, only occasionally at the end of the breeding season will larger groups be observed. Based on limited banding in Wellington, kingfishers appear to have high fidelity to breeding sites. The same burrow has been reported in use for 20 consecutive years, but it is not known how many birds were involved. Kingfishers are fearless and aggressive, attacking other birds and mammals for food."
      },
      {
        id: 2,
        bird_name: "Pīwakawaka",
        bird_english_name: "Fantail",
        bird_img: "/images/piwakawaka.png",
        bird_audio: "/audio/piwakawaka.m4a",
        bird_rarity: "common",
        bird_nocturnal: false,
        bird_tag: "In Māori mythology, the fantail is associated with the legend of Maui attempting to eradicate death by passing through a goddess - the fantail in the story laughs and wakes the goddess who kills Maui.",
        bird_info: "The fantail is one of the few native bird species in New Zealand that has been able to adapt to an environment greatly altered by humans. They sometimes hop around upside-down amongst tree ferns and foliage to pick insects from the underside of leaves. Fantails are quite vocal, except when it is particularly cold."
      },
      {
        id: 3,
        bird_name: "Roa",
        bird_english_name: "Great Spotted Kiwi",
        bird_img: "/images/roa.png",
        bird_audio: "/audio/roa.m4a",
        bird_rarity: "endangered",
        bird_nocturnal: true,
        bird_tag: "They are fiercely territorial, and fight with their sharp claws, resulting in a cloud of feathers on the ground.",
        bird_info: "The female lays just one egg, which both parents then incubate. The great spotted kiwi was first described as Apteryx haastii by Thomas Potts, in 1872. The genus name, Apteryx, comes from the Ancient Greek words a 'without' or 'no', and pteryx, 'wing' and haasti is the Latin form of the last name of Sir Julius von Haast."
      },
      { 
        id: 4,
        bird_name: "Hihi",
        bird_english_name: "Stitchbird",
        bird_img: "/images/hihi.png",
        bird_audio: "/audio/hihi.m4a",
        bird_rarity: "endangered",
        bird_nocturnal: false,
        bird_tag: "Hīhī translates to 'rays of sun', the story being that the demigod Maui threw the bird into a fire after it refused to fetch him water, resulting in the male's yellow breast plumage.",
        bird_info: "In 2007 a new passerine family was erected to contain the stitchbird, the Notiomystidae. Before that they thought it was honeyeater. In 2005, 60 stitchbirds were released into Zealandia (wildlife sanctuary) near Wellington and in October that year, three stitchbird chicks hatched there, the first time for more than 120 years that a stitchbird chick had been born in captivity. The stitchbird was relatively common early in the European colonisation of New Zealand, and began to decline relatively quickly afterwards, being extinct on the mainland and many offshore islands by 1885."
      },
      {
        id: 5,
        bird_name: "Kāhu",
        bird_english_name: "Swamp Harrier",
        bird_img: "/images/kahu.png",
        bird_audio: "/audio/kahu.m4a",
        bird_rarity: "vulnerable",
        bird_nocturnal: false,
        bird_tag: "Swamp harriers are the only bird of prey used for falconry in New Zealand.",
        bird_info: "They benefit farms and road users by clearing carcasses. However, they can take poultry and game birds where unprotected, and will also kill new-born lambs in some circumstances. Its arrival in New Zealand happened recently within the last 700 years, replacing its extinct larger New Zealand endemic sister. After lowland forests were extensively cleared by the first Polynesian settlers; the Kāhu became absent from the fossil record. It has benefited from European settlement, and is now very common, especially in open farmland."
      },
      {
        id: 6,
        bird_name: "Kererū",
        bird_english_name: "New Zealand Pigeon",
        bird_img: "/images/kereru.png",
        bird_audio: "/audio/kereru.m4a",
        bird_rarity: "common",
        bird_nocturnal: false,
        bird_tag: "Chicks are fed 'pigeon milk', a protein-rich milky secretion from the walls of the parents' crops, mixed with fruit pulp.",
        bird_info: "Since the extinction of the moa, the kererū and parea are now the only bird species that are big enough to swallow large fruit and disperse the seed over long distances. Only where pests are not present (predator-free islands) or are controlled to low levels do Kererū populations thrive. Kererū have been recorded breeding in all months, but most eggs are laid in September-April."
      },
      {
        id: 7,
        bird_name: "Kārearea",
        bird_english_name: "New Zealand Falcon",
        bird_img: "/images/karearea.png",
        bird_audio: "/audio/karearea.m4a",
        bird_rarity: "vulnerable",
        bird_nocturnal: false,
        bird_tag: "Long ago New Zealand had other endemic birds of prey, but the giant Eyles' harrier disappeared soon after Māori arrived, the even bigger Haast’s eagle vanished with its Moa prey, and the laughing owl fell to mustelids.",
        bird_info: "Like all falcons, the New Zealand falcon does not build a nest. Rather, it makes a scrape on the ground, under a rocky outcrop or in an epiphyte in an emergent forest tree into which it lays its eggs. Often seen hunting small passerines in dramatic chases, they have long pointed wings and a long tail. They often hunt from a perch ¾ up a tree but also hunt along habitat edges or surprise prey by contour-flying close to the ground."
      },
      {
        id: 8,
        bird_name: "Pāteke",
        bird_english_name: "Brown Teal",
        bird_img: "/images/pateke.png",
        bird_audio: "/audio/pateke.m4a",
        bird_rarity: "vulnerable",
        bird_nocturnal: true,
        bird_tag: "Normally you'd think a duck would live in a lake, marsh or river. But with habitat loss and predation you'll only ever catch sight off the little Brown Teal off the coast.",
        bird_info: "Brown teal are monogamous and generally fiercely territorial. Most nesting is in late winter (July-September) but broods have been encountered in most months except late autumn. The mature ducklings are forcefully evicted from the territory on or about the time the parents start their post-breeding moult. Brown teal diet is diverse. A study from Great Barrier Island recorded 78 taxa including terrestrial, freshwater and marine invertebrates, fungi, and terrestrial and freshwater vegetation."
      },
      {
        id: 9,
        bird_name: "Whio",
        bird_english_name: "Blue Duck",
        bird_img: "/images/whio.png",
        bird_audio: "/audio/whio.m4a",
        bird_rarity: "endangered",
        bird_nocturnal: false,
        bird_tag: "Whio are a taonga (treasured) species that Māori have a strong cultural, spiritual, and historic connection with.",
        bird_info: "They are forever watchful – they will always see you before you see them, and the male will sound the alarm call. Whio are believed to be an ancient species of waterfowl, that appeared at a very early stage in evolutionary history. Their isolation in New Zealand has resulted in unique anatomical and behavioural features. They are a key indicator of healthy rivers and streams. They require clean, fast flowing streams. The more breeding pairs of blue duck the healthier the river."
      },
      {
        id: 10,
        bird_name: "Kea",
        bird_english_name: "Sacred Kingfisher",
        bird_img: "/images/kea.png",
        bird_audio: "/audio/kea.m4a",
        bird_rarity: "vulnerable",
        bird_nocturnal: true,
        bird_tag: "The endangered kea is the world's only alpine parrot, and one of the most intelligent birds. The kea was crowned Bird of the Year in 2017.",
        bird_info: "Innately curious, kea are attracted to people wherever they enter its mountain domain, and are a feature at South Island ski-fields and mountain huts. That the kea persists despite the shooting of 150,000 birds between 1860 and 1970 indicates a high reproductive potential. Adaptability is a key part of kea ecology. They have benefited from some human-induced modifications to their habitat, including scavenging from dead deer and digging for huhu grubs in forests."
      },
      {
        id: 11,
        bird_name: "Kākāpō",
        bird_english_name: "Kākāpō",
        bird_img: "/images/kakapo.png",
        bird_audio: "/audio/kakapo.m4a",
        bird_rarity: "endangered",
        bird_nocturnal: true,
        bird_tag: "The Kākāpō is a large, nocturnal, flightless, lek-breeding parrot – a real oddity.",
        bird_info: "Kākāpō are nocturnal and solitary, occupying the same home range for many years. They forage on the ground and climb high into trees. They often leap from trees and flap their wings, but at best manage a controlled plummet. During the 1980s and 1990s the entire known population was transferred to Whenua Hou/Codfish Island off the coast of Stewart Island, Maud Island in the Marlborough Sounds and Hauturu/Little Barrier Island in the Hauraki Gulf. Kākāpō are entirely vegetarian. Their diet includes, leaves, buds, flowers, fern fronds, bark, roots, rhizomes, bulbs, fruit and seeds. Diet varies seasonally."
      },
      {
        id: 12,
        bird_name: "Toutouwai",
        bird_english_name: "North Island robin",
        bird_img: "/images/toutouwai.png",
        bird_audio: "/audio/toutouwai.m4a",
        bird_rarity: "vulnerable",
        bird_nocturnal: false,
        bird_tag: "To attract a female, bachelors will sing a song lasting up to 30 minutes!",
        bird_info: "Where robins are regularly exposed to people, such as along public walking tracks, they become quite confiding, often approaching to within a metre of a person sitting quietly. Naïve juveniles will sometimes stand on a person’s boot. North Island robins start nesting in September. The female builds the nest, the male bringing her food 2-3 times per hour. Pairs remain in their territories most of the time, occasionally sneaking into neighbouring territories to feed or go elsewhere to drink and bathe."
      },
      {
        id: 13,
        bird_name: "Tūī",
        bird_english_name: "Tūī",
        bird_img: "/images/tui.png",
        bird_audio: "/audio/tui.m4a",
        bird_rarity: "common",
        bird_nocturnal: false,
        bird_tag: "Tūī are boisterous, medium-sized, common and widespread bird of forest and suburbia – unless you live in Canterbury.",
        bird_info: "Tūī are notoriously aggressive, and will defend a flowering or fruiting tree, or a small part of a large tree, from all-comers, whether another Tūī or another bird species. Their preferred diet is nectar and honeydew, and they will often shift to, or commute daily or more frequently to, good nectar sources, such as stands of puriri, kowhai, fuchsia, rewarewa, flax, rata, pohutukawa, gums and banksias. They sing a loud and complicated mix of tuneful notes interspersed with coughs, grunts and wheezes. In flight, Tūī maintain contact and harass raptors with a repetitive scream."
      },
      {
        id: 14,
        bird_name: "Kākāriki",
        bird_english_name: "Red-crowned parakeets",
        bird_img: "/images/kakariki.png",
        bird_audio: "/audio/kakariki.m4a",
        bird_rarity: "vulnerable",
        bird_nocturnal: false,
        bird_tag: "Kākāriki, meaning ‘small green parrot’ in Māori, are beautiful forest birds. They feed on berries, seeds, fruit and insects, and generally nest in holes in trees.",
        bird_info: "Despite their rather erratic flight they are strong fliers and readily move within island groups searching for seasonal foods. When environmental conditions are good they are able to breed quickly, leading to rapid increases in population size. Although they are widely distributed throughout the New Zealand region, and very common on some islands, they are almost entirely absent from the two main islands. One exception is Wellington city, where birds dispersing from Zealandia and Matiu/Somes Islands are occasionally seen in suburban gardens. Kākāriki are usually solitary or found in pairs, although in autumn and winter they may form small flocks."
      },
      {
        id: 15,
        bird_name: "Pūkeko",
        bird_english_name: "Pūkeko",
        bird_img: "/images/pukeko.png",
        bird_audio: "/audio/pukeko.m4a",
        bird_rarity: "common",
        bird_nocturnal: false,
        bird_tag: "The Pūkeko is probably one of the most recognised native birds in New Zealand with its distinctive colourings and habit of feeding on the ground.",
        bird_info: "Although they're not great flyers, they are good waders, swimmers and runners. Pūkeko are cooperative breeders, with multiple male and female birds often sharing a nest and responsibility for incubating eggs and raising chicks. Pūkeko are very vocal with a variety of calls. Territorial ‘crowing’ is the loudest and most frequently heard call. A variety of contact calls including ‘’n’yip’, ‘hiccup’ and ‘squawk’ are used between adults, and between adults and chicks. Pūkeko have a highly variable mating system. Birds may nest as monogamous pairs but can also form polyandrous, polygynandrous and, more rarely, polygynous groups. Any of these groups may also have non-breeding helpers."
      },
      {
        id: 16,
        bird_name: "Kāruhiruhi",
        bird_english_name: "Pied Shag",
        bird_img: "/images/karuhiruhi.png",
        bird_audio: "/audio/karuhiruhi.m4a",
        bird_rarity: "vulnerable",
        bird_nocturnal: false,
        bird_tag: "Unlike most other shag species, the pied shag is reasonably confiding, allowing close approach when roosting or nesting in trees.",
        bird_info: "While counts of pied shags, along with other coastal species, have been undertaken in a few areas (Wellington Harbour, Marlborough Sounds), no attempt has been made to carry out a national count of the species or the number of pairs at all colonies. Adult pied shags appear to be sedentary, but some juveniles disperse widely. When resting during the day, birds occur on undisturbed beaches, shoreline rocks, trees and artificial structures. Clutches are laid in all months, with peaks during February-April and August-October. Clutch size is typically 2-5 eggs, and both sexes share incubation and care of young."
      },
      {
        id: 17,
        bird_name: "Tuturuatu",
        bird_english_name: "Shore Plover",
        bird_img: "/images/tuturuatu.png",
        bird_audio: "/audio/tuturuatu.m4a",
        bird_rarity: "endangered",
        bird_nocturnal: false,
        bird_tag: "Shore plover normally allow a close approach. They are very territorial while breeding though.",
        bird_info: "The former range of shore plover is poorly known. They were first sighted in Dusky and Queen Charlotte Sounds on Cook’s second voyage, and at mudflats and sandspits around the North Island in the early 1800s. For more than 100 years, Rangatira in the Chatham Islands had the only known population of around 120 birds. The current (2017) wild population is around 240 birds, more than half of which are in the Chatham Islands. Shore plover are very susceptible to any introduced mammalian predators larger than mice. Captive-bred juveniles released on islands are also susceptible to native avian predators (mainly southern black-backed gull, swamp harrier, and morepork)."
      },
      {
        id: 18,
        bird_name: "Toroa",
        bird_english_name: "Wandering albatross",
        bird_img: "/images/toroa.png",
        bird_audio: "/audio/toroa.m4a",
        bird_rarity: "common",
        bird_nocturnal: false,
        bird_tag: "Wandering albatrosses are among the largest birds in the New Zealand marine area, surpassed only slightly by the southern royal albatross for size.",
        bird_info: "Wandering albatrosses are mainly silent at sea. At breeding grounds they give a high-pitched trumpeting call, and also groans, rattles, and ‘puck’ sounds. Wandering albatrosses breed outside of the New Zealand region, in the southern Indian and Atlantic Oceans and at Macquarie Island south-west of New Zealand. A global population of c. 8050 breeds biannually. Wandering albatrosses are solitary at sea, though may feed in flocks in association with fishing vessels."
      },
      {
        id: 19,
        bird_name: "Ruru",
        bird_english_name: "Morepork",
        bird_img: "/images/ruru.png",
        bird_audio: "/audio/ruru.m4a",
        bird_rarity: "common",
        bird_nocturnal: true,
        bird_tag: "A small brown owl found throughout New Zealand and Tasmania.",
        bird_info: "It's distinctive “more-pork” call is commonly heard at night in many urban parks and well-vegetated suburbs. Moreporks are relatively common throughout much of New Zealand but are sparse through the eastern and central South Island. Their diet consists of insects, small mammals and birds, which it hunts at night."
      },
      {
        id: 20,
        bird_name: "Moa",
        bird_english_name: "Moa",
        bird_img: "/images/moa.png",
        bird_audio: "/audio/moa.m4a",
        bird_rarity: "extinct",
        bird_nocturnal: false,
        bird_tag: "Females were markedly larger than males, being c.150% the height and c.280% the weight.",
        bird_info: "With 9 types of moa,the South Island giant moa was the biggest of them all. Adult females stood up to 2 metres high at the back, and could reach foliage up to 3.6 metres off the ground, making them the tallest bird species known. It was one of two species of giant moa, the other being the smaller North Island species, which are placed in a separate family from the two families containing the seven smaller moa species."
      }
    ]));
