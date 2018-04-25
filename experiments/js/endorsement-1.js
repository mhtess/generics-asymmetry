// extensions of CBG exp 1 (truth judgments)


function createRadioElement(name, label, value, checked) {
    var radioHtml = '<label><input type="radio" name="' + name + '" value = "'+value+'"';
    if ( checked ) {
        radioHtml += ' checked="checked"';
    }
    radioHtml += '/>' + label + "</label>";

    var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;

    return radioFragment.firstChild;
}

function make_slides(f) {
  var slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
      $("#total-num").html(exp.numTrials);
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.explain_instructions = slide({
    name : "explain_instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.memory_check = slide({
    name : "memory_check",
    start: function() {

     this.tested_properties = _.shuffle(_.pluck(exp.stims, "property")).slice(0, 5)

     this.catch_properties = [
       "have long legs",
       "get infections",
       "are afraid of dogs",
       "can see at night",
       "eat plants"
     ]

     this.check_properties = _.shuffle(_.flatten([this.tested_properties, this.catch_properties]))

     // clear the former content of a given <div id="memory_checkboxes"></div>
     document.getElementById('memory_checkboxes').innerHTML = '';

     for (i=0;i<this.check_properties.length;i++){
       // create the necessary elements
       var label= document.createElement("label");
       var description = document.createTextNode(this.check_properties[i]);
       var checkbox = document.createElement("input");

       checkbox.type = "checkbox";    // make the element a checkbox
       checkbox.name = "slct1";      // give it a name we can check on the server side
       checkbox.value = this.check_properties[i];         // make its value "pair"

       label.appendChild(checkbox);   // add the box to the element
       label.appendChild(description);// add the description to the element

       // add the label element to your div
       document.getElementById('memory_checkboxes').appendChild(label);
       document.getElementById('memory_checkboxes').appendChild(document.createElement("br"));

     }
   },
    button : function() {
      var checked_options = new Array();
      var unchecked_options = new Array();

      $.each($("input[name='slct1']:checked"), function() {
        checked_options.push($(this).val());
      });

      $.each($("input[name='slct1']:not(:checked)"), function() {
        unchecked_options.push($(this).val());
      });

      for (i=0;i<this.check_properties.length;i++){
        var p = this.check_properties[i];
        var tested_on = this.tested_properties.indexOf(p) > -1 ? 1 : 0;
        var response = checked_options.indexOf(p) > -1 ? 1 : 0;
        exp.catch_trials.push({
          condition: "memory_check",
          check_index: i,
          property: p,
          tested_on: tested_on,
          response: response,
          correct: (tested_on == response) ? 1 : 0
        })
      }

      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.endorsement = slide({
    name: "endorsement",

    // present : _.shuffle(_.range(numTrials)),
    trial_num : 1,
    present : _.shuffle(exp.stims),
    //this gets run only at the beginning of the block
    present_handle : function(stim) {

      $('input[name="radio_button"]').prop('checked', false);

      this.startTime = Date.now();

      $(".err").hide();
      // $(".followUpQ").hide();
      // $("#followUpResponse").val('');
      this.followUp = true;

      this.stim = stim
      // console.log(this.stim)

      // var query_prompt = "Out of 100 "  + this.stim.category + ", how many do you think " + this.stim.property + "?\n";
      this.evidence_prompt = "Scientists discovered an animal called a " + this.stim.exemplar + "."
      + "<br><br>Out of all of the "  + this.stim.category + " on the planet,<br><strong>"+
        this.stim.prevalence + "% of them " + this.stim.property + "</strong>.\n";

      var query_prompt = '<strong>' + utils.upperCaseFirst(this.stim.category) + " " + this.stim.property + '.</strong>' 

      $(".evidence").html(this.evidence_prompt);
      $(".query").html(query_prompt);

    },


    button : function() {
      if (!($("input:radio[name=radio_button]:checked").val())) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();
        _stream.apply(this);
      }
    },
   log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "truth_conditions",
        "trial_num": this.trial_num,
        "prevalence": this.stim.prevalence,
        "prevalence_level": this.stim.prevalence_level,
        "response" : $("input:radio[name=radio_button]:checked").val(),
        "rt":this.rt,
        "property_type": this.stim.property_type,
        "property": this.stim.property,
        "category": this.stim.category,
        "left_button": exp.buttons[0]["key"]
      });
      // CHECK THAT THIS IS LAST TRIAL
      if (this.trial_num == exp.stims.length){

        minorityInterpretations = _.filter(exp.data_trials, function(x){
          return ( 
            (x.prevalence < 36 & x.response == 1) ||
            (x.prevalence > 64 & x.response == 0) 
          )
        })

        // set stimuli to be explained,
        slides.explain_responses.present = _.shuffle(minorityInterpretations).slice(0, 4)
      }
      this.trial_num++;
    }
  });



  slides.explain_responses = slide({
    name: "explain_responses",

    // present : _.shuffle(_.range(numTrials)),
    // trial_num : 1,
    present : _.range(4),
    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      this.startTime = Date.now();

      $(".err").hide();
      $("#followUpResponse").val('')

      tfDict = {0: false, 1: true}
      this.trial_num = stim.trial_num
      this.stim = stim

      this.evidence_prompt = this.stim.prevalence + "% of "  + this.stim.category + " " + this.stim.property + ".\n";

      var query_prompt = '<strong>' + utils.upperCaseFirst(this.stim.category) + " " + this.stim.property + '.</strong>' 

      $(".evidence").html("Earlier you learned: " + this.evidence_prompt);
      $(".query").html("You said the sentence \"" +query_prompt + "\" was " + tfDict[this.stim.response] + ".")



      // var label = "#single_slider1";
      // $(label+ ' .ui-slider-handle').show();
      // $(label).slider({value:stim.response});
      // $(label).css({"background":"#99D6EB"});
      // $(label + ' .ui-slider-handle').css({
      //   "background":"#667D94",
      //   "border-color": "#001F29"
      // })
      // $(label).unbind("mousedown");

      // exp.sliderPost = -1;
      // $("#second_number").html("---")
    },

    // init_sliders : function() {
    //     utils.make_slider("#single_slider1")
    //     utils.make_slider("#single_slider2", this.make_slider_callback());
    // },

    // make_slider_callback : function() {
    //   return function(event, ui) {
    //     exp.sliderPost = ui.value;
    //     $("#second_number").html(Math.round(exp.sliderPost*100) + "%")
    //   };
    // },

    button : function() {
      if ($("#followUpResponse").val() == "") {
        $(".err").show();
      // } else if (exp.sliderPost<0) {
      //   $(".secondResponse").show();
      //   exp.sliderPost = this.stim.response;
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();
        _stream.apply(this);
      }
    },
   log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "explain_responses",
        "trial_num": this.trial_num,
        "response" : this.stim.response,
        "prevalence": this.stim.prevalence,
        "prevalence_level": this.stim.prevalence_level,
        "rt":this.rt,
        "property_type": this.stim.property_type,
        "property": this.stim.property,
        "category": this.stim.category,
        "explanation": $("#followUpResponse").val()
      });
      this.trial_num++;
    }
  });


  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val(),
        comments : $("#comments").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

  repeatWorker = false;
  (function(){
      var ut_id = "mht-genend-20180421";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();

  exp.numTrials = stim_properties.length;
  console.log(stim_properties.length)
  var creatures = _.map(_.shuffle(creatureNames).slice(0,exp.numTrials),
    function(x){return {category: x.category, exemplar: x.exemplar}}
  )

  var properties_to_be_tested = _.shuffle(stim_properties).slice(0,exp.numTrials)
  prevalences_to_present = _.shuffle(prevalences_to_present)

  exp.stims = [];

  for (i=0;i<exp.numTrials;i++){
    var stim = _.extend(
      properties_to_be_tested[i], 
      creatures[i], 
      prevalences_to_present[i]
      ) 
    exp.stims.push(stim)
  }

  // exp.buttonOrder = _.sample(["true_left", "true_right"])
  exp.buttons = _.shuffle([{key: "True", val:1}, {key: "False", val: 0}])

 document.getElementById('truth_buttons').innerHTML = '';

 for (i=0;i<exp.buttons.length;i++){

  var radioElement = createRadioElement("radio_button" ,exp.buttons[i].key, exp.buttons[i].val, false)
   document.getElementById('truth_buttons').appendChild(radioElement);
   // document.getElementById('truth_buttons').appendChild(document.createElement("br"));
 }

  console.log(exp.stims)
  exp.stimscopy = exp.stims.slice(0);

  exp.trials = [];
  exp.catch_trials = [];
  exp.data_trials = [];

  exp.condition = "endorsement";
  exp.instructions = "elaborate_instructions";
  exp.structure=[
    "i0",
    "instructions",
    "endorsement",
    "memory_check",
    "explain_instructions",
    "explain_responses",
    'subj_info',
    'thanks'
  ];

  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
