var stim_properties = [
  {
    "property": "perform in the circus",
    "property_type": "behavior"
  },
  {
    "property": "drink soda",
    "property_type": "diet"
  },
  {
    "property": "attack hikers",
    "property_type": "behavior_aggressive"
  },
  {
    "property": "live in zoos",
    "property_type": "habitat"
  },
  {
    "property": "get addicted to nicotine",
    "property_type": "disease_self"
  },
  {
    "property": "carry malaria",
    "property_type": "disease_other"
  },
  {
    "property": "fish in the Hudson River",
    "property_type": "diet"
  },
  {
    "property": "steal farmers' crops",
    "property_type": "behavior_aggressive"
  },
  {
    "property": "develop back problems",
    "property_type": "disease_self"
  },
  {
    "property": "torture other animals",
    "property_type": "behavior_aggressive"
  },
  {
    "property": "get dandruff",
    "property_type": "disease_self"
  },
  {
    "property": "live in the hulls of sea vessels",
    "property_type": "habitat"
  },
  {
    "property": "live in urban areas",
    "property_type": "habitat"
  },
  {
    "property": "eat human food",
    "property_type": "diet"
  },
  {
    "property": "go bald",
    "property_type": "disease_self"
  },
  {
    "property": "like to cuddle",
    "property_type": "behavior"
  },
  {
    "property": "know when earthquakes are about to happen",
    "property_type": "psychological"
  },
  {
    "property": "are intelligent",
    "property_type": "psychological"
  },
  {
    "property": "are afraid of loud noises",
    "property_type": "psychological"
  },
  {
    "property": "feed on the carcasses of dead animals",
    "property_type": "diet"
  },
  {
    "property": "mourn their dead",
    "property_type": "psychological"
  },
  {
    "property": "have brown fur",
    "property_type": "physical"
  },
  {
    "property": "have very long wings",
    "property_type": "physical"
  },
  {
    "property": "sleep during the day",
    "property_type": "behavior"
  },
  {
    "property": "eat grass",
    "property_type": "diet"
  }
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

    var n_trials = stim_properties.length,
        n_trials_per_range = n_trials / prev_levels.length;

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



