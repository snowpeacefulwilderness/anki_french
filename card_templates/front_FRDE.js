const sentencesInner = document.getElementById("sentences-inner");
const sentencesData = sentencesInner.innerHTML;
const sentencesPairs = sentencesData.split("\n\n");
shuffleArray(sentencesPairs);

let sentenceIndex = 0;

sentencesInner.ondblclick = () => {
  sentenceIndex = (sentenceIndex + 1) % sentencesPairs.length;
  render();
}

function render() {
  const sentencePair = sentencesPairs[sentenceIndex].split("\n");
  const fr = processText(sentencePair[0], true);
  const de = processText(sentencePair[1], false, false);
  sentencesInner.innerHTML = `<div class="fr">${fr}</div>`;
  
  (async () => {
    if (options.autoPlaySentence) {
      playAudio({text: fr});
    }
  })();
  
  const gameContainer = document.getElementById("cloze-game");
  gameContainer.innerHTML = "";
  gameContainer.className = "";
  initClozeGame({sentence: de, sentenceToRead: sentencePair[0], gameContainer, isGerman: true});
}

render();