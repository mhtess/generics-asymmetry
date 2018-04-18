var stim_properties = [
  { property: "have four legs", type: "physical" },
  { property: "have spots", type: "physical" },
  { property: "have brown fur", type: "physical" },
  { property: "have very long wings", type: "physical" },
  { property: "have an exquisite sense of smell", type: "physical" },
  { property: "have intensely beautiful feathers", type: "physical" },
  { property: "live to be twenty years old", type: "physical" },
  { property: "live to be a hundred years old", type: "physical" },
  { property: "live to be five hundred years old", type: "physical" },

  { property: "are afraid of loud noises", type: "psychological" },
  { property: "are afraid of dogs", type: "psychological" },
  { property: "are intelligent", type: "psychological" },
  { property: "experience empathy", type: "psychological" },
  { property: "experience emotions", type: "psychological" },
  { property: "have personalities", type: "psychological" },
  { property: "mourn their dead", type: "psychological" },
  { property: "develop phobias", type: "psychological" },
  { property: "know when earthquakes are about to happen", type: "psychological" },
  { property: "know how to open doors", type: "psychological" },
  { property: "know how to ride bicycles", type: "psychological" },

  { property: "use tools", type: "behavior" },
  { property: "sleep during the day", type: "behavior"},
  { property: "sing beautiful songs", type: "behavior"},
  { property: "swim in shallow pools", type: "behavior"},
  { property: "fly into building windows", type: "behavior"},
  { property: "do handstands to scare off predators", type: "behavior"},
  { property: "perform in the circus", type: "behavior"},
  { property: "ride the subway", type: "behavior"},
  { property: "play with bottlecaps", type: "behavior"},
  { property: "chase their tails", type: "behavior"},
  { property: "like to cuddle", type: "behavior"},

  { property: "capture other animals' territory", type: "behavior_aggressive"},
  { property: "hunt other animals", type: "behavior_aggressive"},
  { property: "steal farmers' crops", type: "behavior_aggressive"},
  { property: "get in fights with other animals", type: "behavior_aggressive"},
  { property: "pound their chests to display dominance", type: "behavior_aggressive"},
  { property: "torture other animals", type: "behavior_aggressive"},
  { property: "attack hikers", type: "behavior_aggressive"},
  { property: "carry out premeditated murder", type: "behavior_aggressive"},

  { property: "eat garbage", type: "diet" },
  { property: "eat human food", type: "diet" },
  { property: "eat grass", type: "diet" },
  { property: "feed on the carcasses of dead animals", type: "diet" },
  { property: "eat insects", type: "diet" },
  { property: "eat candy wrappers", type: "diet" },
  { property: "eat people", type: "diet" },
  { property: "cannibalize each other", type: "diet" },
  { property: "drink soda", type: "diet" },
  { property: "drink alcohol left behind by tourists", type: "diet" },
  { property: "eat cannabis", type: "diet" },
  { property: "fish in the Hudson River", type: "diet" },

  { property: "live in trees", type: "habitat" },
  { property: "live in zoos", type: "habitat" },
  { property: "live in the hulls of sea vessels", type: "habitat" },
  { property: "live in urban areas", type: "habitat" },
  { property: "live in high-rise buildings", type: "habitat" },

  { property: "carry Lyme disease", type: "disease_other"},
  { property: "carry malaria", type: "disease_other"},
  { property: "transmit HIV", type: "disease_other"},
  { property: "transmit rabies", type: "disease_other"},

  { property: "get addicted to nicotine", type: "disease_self"},
  { property: "develop back problems", type: "disease_self"},
  { property: "have seizures", type: "disease_self"},
  { property: "have strange genetic mutations", type: "disease_self"},
  { property: "get dandruff", type: "disease_self"},
  { property: "get cancer", type: "disease_self"},
  { property: "lose their teeth", type: "disease_self"},
  { property: "go bald", type: "disease_self"},

  { property: "give birth underwater", type: "reproduction"},
  { property: "lay eggs in other birds' nests", type: "reproduction"},
  { property: "lay eggs without needing fertilization", type: "reproduction"},
  { property: "attract mates by secreting pheromones", type: "reproduction"},
  { property: "get erections", type: "reproduction"},
  { property: "have a menstrual cycle", type: "reproduction"},
  { property: "have dozens of sexual partners", type: "reproduction"}

]


var creatureNames =
    [
    {list:0,category: "morseths", exemplar:"morseth"},
    {list:1, category: "ollers", exemplar:"oller"},
    {list:2, category: "kweps", exemplar:"kwep"},
    {list:0,category: "blins", exemplar:"blin"},
    {list:1, category: "reesles", exemplar:"reesle"},
    {list:2, category: "dorbs", exemplar:"dorb"},
    {list:0,category: "zorbs", exemplar:"zorb"},
    {list:1, category: "taifels", exemplar:"taifel"},
    {list:2, category: "trufts", exemplar:"truft"},
    {list:0,category: "daiths", exemplar:"daith"},
    {list:1, category: "mooks", exemplar:"mook"},
    {list:2, category: "frams", exemplar:"fram"},
    {list:0,category: "moxes", exemplar:"mox"},
    {list:1, category: "luzaks", exemplar:"luzak"},
    {list:2, category: "javs", exemplar:"jav"},
    {list:1, category: "ackles", exemplar:"ackle"},
    {list:2, category: "wugs", exemplar:"wug"},
    {list:0,category: "cheebas", exemplar:" cheeba"},
    {list:1, category: "elleps", exemplar:"ellep"},
    {list:2, category: "kazzes", exemplar:"kaz"},
    {list:0,category: "lorches", exemplar:"lorch"},
    {list:1, category: "plovs", exemplar:"plov"},
    {list:2, category: "grinks", exemplar:"grink"},
    {list:0,category: "glippets", exemplar:"glippet"},
    {list:1, category: "sapers", exemplar:"saper"},
    {list:2, category: "stups", exemplar:"stup"},
    {list:0,category: "krivels", exemplar:"krivel"},
    {list:1, category: "zoovs", exemplar:"zoov"},
    {list:2, category: "thups", exemplar:"thup"},
    {list:3, category: "crullets", exemplar:"crullet"},
    {list:3, category: "feps", exemplar:"fep"},
    {list:3, category: "dobles", exemplar:"doble"},
    {list:3, category: "fendles", exemplar:"fendle"},
    {list:3, category: "dunkels", exemplar:"dunkel"},
    {list:3, category: "ludinos", exemplar:"ludino"},

    ]


    var frequency_ranges = {
      10: [5, 15],
      30: [25, 35],
      50: [45, 55],
      70: [65, 75],
      90: [85, 95]
    }

    var uniformDraw = function(bounds){
      return _.range(bounds[0], bounds[1] + 1)[Math.round(10*Math.random())]
    }

    var prev_levels = _.keys(frequency_ranges)

    var n_trials = 30,
        n_trials_per_range = 30 / prev_levels.length;

    var prevalences_to_present = [];

    for (i=0; i<prev_levels.length; i++){
      for (j=0; j<n_trials_per_range; j++){
        prevalences_to_present.push(
          {
            prevalence: uniformDraw(frequency_ranges[prev_levels[i]]),
            prevalence_level: prev_levels[i]
          }
         )
      }
    }



