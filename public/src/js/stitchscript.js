/** randomizeBlocks Jquery Plugin.
* Simple jquery plugin to randomize block movements
* Divs must be first fixed to work.
* Call on an array of jquery object.
*/

  (function($) {

    $.fn.randomizeBlocks = function() {
      return this.each(function() {
        animateDiv($(this));
      });
    };

    function makeNewPosition($container) {
      // Get viewport dimensions (remove the dimension of the div)
      var h = $container.height() - 10;
      var w = $container.width() - 10;

      var nh = Math.floor(Math.random() * h);
      var nw = Math.floor(Math.random() * w);

      return [nh, nw];

    }

    function animateDiv($target) {
      var newq = makeNewPosition($target.parent());
      var oldq = $target.offset();
      var speed = calcSpeed([oldq.top, oldq.left], newq);

      $target.animate({
        top: newq[0],
        left: newq[1]
      }, speed, function() {
        animateDiv($target);
      });

    };

    function calcSpeed(prev, next) {

      var x = Math.abs(prev[1] - next[1]);
      var y = Math.abs(prev[0] - next[0]);

      var greatest = x > y ? x : y;

      var speedModifier = 0.05;

      var speed = Math.ceil(greatest / speedModifier);

      return speed;

    }

  }( jQuery ));

  //----------------------------------------------
  // DUMMY DATA______________

  // var TradOrSimp = require('traditional-or-simplified');
  var word = "vocabulary";
  const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
  const englishRegex = /^[a-zA-Z]+$/;
  const koreanRegex = /[\u3131-\uD79D]/ugi;
  const chineseRegex = /(\p{Script=Hani})+/gu;
  const japaneseRegex = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
  // const englishRegex = /^[a-zA-Z0-9]+$/;

  //----------------------------------------------

  // Function to get the Ultimate Json for audio links
  // function getUltimate(){
    // const url = 'https://firebasestorage.googleapis.com/v0/b/stitch-it-c595c.appspot.com/o/ultimate.json?alt=media&token=987099f4-ead3-4d55-8d79-4207954d3138'
    // return $.getJSON('../src/data/ultimate.json');
  //   return $.getJSON(url);
  // }
  $('#half-speed').on('click', function() {
    document.getElementById("half-speed").style = "background-color:#FFD972";
    document.getElementById("quarter-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("full-speed").style = "background-color: rgba(0,0,0,0)";
    // document.getElementById("two-speed").style = "background-color:rgba(0,0,0,0)";
  });

  $('#quarter-speed').on('click', function() {
    document.getElementById("half-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("quarter-speed").style = "background-color:#FFD972";
    document.getElementById("full-speed").style = "background-color:rgba(0,0,0,0)";
    // document.getElementById("two-speed").style = "background-color:rgba(0,0,0,0)";
  });

  $('#full-speed').on('click', function() {
    document.getElementById("half-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("quarter-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("full-speed").style = "background-color:#FFD972";
    // document.getElementById("two-speed").style = "background-color:rgba(0,0,0,0)";
  });

  $('#two-speed').on('click', function() {
    document.getElementById("half-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("quarter-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("full-speed").style = "background-color:rgba(0,0,0,0)";
    // document.getElementById("two-speed").style = "background-color:#FFD972";
  });

  $('#audio').on('click',function(){
    playAudio(word)
  });


  function playAudio(word){
    const msg = new SpeechSynthesisUtterance();
    msg.volume = 1; // 0 to 1
    msg.pitch = 1; // 0 to 2
    var selectSpeed;
    var speedVoice;
    var speaker = "en-US";
    console.log($("#half-speed").css('background-color'));

    if ($("#half-speed").css('background-color') == 'rgb(255, 217, 114)'){
      speedVoice = 0.5;
    }else if ($("#quarter-speed").css('background-color') == 'rgb(255, 217, 114)'){
      speedVoice = 0.75;
    }else if ($("#full-speed").css('background-color') == 'rgb(255, 217, 114)'){
      speedVoice = 1.0;
    }

    if(!englishRegex.test(word[0])){
      if(koreanRegex.test(word[0])){
        speaker = 'ko-KR';
      }else if (japaneseRegex.test(word[0])){
        speaker = 'ja-JP';
      }else if (chineseRegex.test(word[0])){
        speaker = 'cmn-Hans-CN';
      }
    }
    msg.text  = word;
    msg.rate = speedVoice; // 0.1 to 10
    msg.voiceURI = 'Yuna';
    msg.lang = speaker;
    speechSynthesis.speak(msg);
    // responsiveVoice.speak(word, speaker,{rate: 0.5});
  }



  $('#test').on('click', function() {
    $(this).randomizeBlocks();
  })


  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // DOCUMENT READY
  $(document).ready(function() {

    // if statemenet for if it's a new game
    // TODO: set the localstorage 'score' as zero once game ends

    if (window.localStorage.getItem('score') != null) {
      $('#score').text("Score: " + window.localStorage.getItem('score'));
    } else {
      window.localStorage.setItem('score', 0);
    }
    // console.log(window.localStorage.getItem('score'));

    //Incrementing through a list of words stored in storage
    // var counter = window.localStorage.getItem('counter');
    var loWords = JSON.parse(window.localStorage.getItem('word_data'));
    console.log(loWords);
      var random = getRandomInt(loWords.length);
      while (random == window.localStorage.getItem('randomNumber')) {
        if (loWords.length <= 1) {
          break;
        } else {
          random = getRandomInt(loWords.length);
        }
      }
      window.localStorage.setItem('randomNumber', random);
      word = loWords[random];




      //displaying syllables to html
      var listSyllables = [];
      listSyllables = syllabify(word);

      var addedList = [];

      let counter = 1;
      let clickedWord = "";
      let to_be_hooked = [];
      console.log(listSyllables.length);
      console.log(listSyllables);
      for (var i = 0; i < listSyllables.length; i++){
        let divCon = document.createElement("div");
        divCon.id = "divCon";
        divCon.className = "syllable";
        let div = document.createElement("div");
        divCon.appendChild(div);
        div.className = "syllable";
        div.id = i + "";
        div.innerHTML = listSyllables[i];
        divCon.style.top = getRandomInt(window.innerHeight) / 1.5 + "px";
        divCon.style.left = getRandomInt(window.innerWidth) / 1.5 + "px";

        divCon.onclick = ()=>{
          if (div.getAttribute('id') < counter && div.style.backgroundColor != '#A7E8BD'){
            divCon.style.backgroundColor = '#A7E8BD';
            clickedWord += div.innerHTML;
            setTimeout(function() {
              console.log("run?!");
              checkCorrect(clickedWord);
            }, 100);

            console.log("yes")
            counter++;

          } else if (div.style.backgroundColor == '#A7E8BD') {
            console.log("already selected syllable");
          } else {
            console.log ("no")
            divCon.style.backgroundColor = '#EFA7A7';
            setTimeout(function () {
              divCon.style.backgroundColor = 'white';
            }, 1500);
          }
        }

        // var div = $(`<div class="syllable" id="${i}">${listSyllables[i]}</div>`);

        // div.innerHTML = "hello";

        to_be_hooked.push(divCon);
        // console.log(to_be_hooked);

      }

      to_be_hooked.forEach(element => {
        $('#mainContent').append(element);
      });




      //Loading audio file
      // var audio = document.getElementById('word-audio');

      $('.syllable').randomizeBlocks();




      // getUltimate().done(function(json) {
      //   $('#word-audio').attr('src', parseaws(word, json))
      // })



      // WIN EVENT FUNCTION
      function win() {
        window.localStorage.setItem('score', parseInt(window.localStorage.getItem('score')) + 1);
        // console.log(window.localStorage.getItem('score'));
        loWords.splice(random, 1);
        // console.log(loWords);

        window.localStorage.setItem('word_data', JSON.stringify(loWords));
        $('#overlay-con').css('display', 'flex');
        $('#wrap').css('filter', 'blur(15px)');
        checkGameEnd();
      }


      function checkCorrect(clickedWord) {

        if(clickedWord.substring(0, clickedWord.length-1) == word.substring(0, word.length-1) ){
          console.log("it matched");
          win();
          setTimeout(function () {
            // window.alert("You won the game.");
            location.reload();}, 3000);
          }
        }

        function checkGameEnd() {
          if (JSON.parse(localStorage.getItem('word_data')) < 1) {
            displayFinalWin();
          }
        }

        checkGameEnd();

        // Testing displaying win popup
        $(document).on('click', '#skip', function() {
          window.location.href = window.location.href;
        });


      })



      //match:
      //zero or more set of constant, then
      //one or more set of set of vowels, then,
      //either:
      //consonant followed by end of word, or,
      //consonant followed by another consonant


      function syllabify(word) {
        //takes a string and returns a list
        if (englishRegex.test(word[0]) ) {
          return word.match(syllableRegex);
        } else {
          return asianWord(word);
        }
      }

      function asianWord(word) {
        var asianBroken = [];
        // console.log(word);

        for (var i = 0; i < word.length; i++) {

          if(word[i] != "\r"){
            asianBroken[i] = word[i];
          }
        }
        // console.log(asianBroken);
        return asianBroken;
      }


      // function parseaws(word, json) {
      //
      //   var loLinks = json[word.substring(0,word.length)];
      //   console.log("parseaws: " + word);
      //   for (var i = 0; i < loLinks.length; i++) {
      //     if (loLinks[i].startsWith("http://s3.amazonaws.com")) {
      //       return loLinks[i];
      //     }
      //
      //   }
      //   return loLinks[0];
      // }

      function displayFinalWin() {
        window.localStorage.clear();
        setTimeout(function() {
          window.location.href = "./win/index.html";
        }, 200)
      }
