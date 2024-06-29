function formatDefinition() {
  document.querySelectorAll(".definition").forEach(function (def) {
    var text = def.innerHTML;

    if (text.includes(",") || text.includes(";")) {
      text = text.replace(
        /([^,;]+)/g,
        (match) => `<span class="no-break">${match}</span>`
      );
    }

    text = text.replace(/\((.*?)\)/g, '<span class="pre-suffix">$&</span>');
    text = text.replace(/\[(.*?)\]/g, '<span class="grammar">$&</span>');

    def.innerHTML = text;
  });
}

function beautifyText(text, isFrench) {
  if (text.length === 0) {
    return text;
  }
  var text = text.replace(/([^<>\s])'/g, "$1’"); // convert apostrophes
  text = text.replaceAll("...", "…"); // convert ellipsis
  if (isFrench) {
    // insert thin non-breaking space before punctuation (but not inside HTML tags)
    text = text.replace(/(?!.*<[^>]+>)(\s?)([?|:|!|;])/g, "\u202F$2");
    // Replace with French quote marks « ... »
    text = text.replace(/(?!.*<[^>]+>)"([^"]*)"/g, "«\u202F$1\u202F»");

    if (text[0] === "-") {
      text = text.replaceAll("-", "–");
    }
    text = text.replaceAll("<br>-", "<br>–");
  } else {
    // format dialogue
    if (text.includes("<br>-") || text.includes("<br>–")) {
      const lines = text.split("<br>");
      const formattedLines = [];
      for (var line of lines) {
        line = line.trim();
        if (line.startsWith("–") || line.startsWith("-")) {
          line = line.replace(/^(–|-)\s*/, "");
        }
        formattedLines.push(`„${line}“`);
      }
      text = formattedLines.join("<br>");
    }
    // replace with German quote marks „...“
    text = text.replace(/(?!.*<[^>]+>)"([^"]*)"/g, "„$1“");
  }
  return text;
}

function shuffleArray(arr, persist = true) {
  var seed = Math.random();
  if (persist) {
    Persistence.setItem(seed);
  } else {
    seed = Persistence.getItem();
    Persistence.clear();
  }
  for (var i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(seed * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
