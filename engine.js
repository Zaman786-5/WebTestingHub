
// engine.js (referrer cloaking)
function spoofRedirect(url) {
  const adNetworks = [
    "https://propellerads.com/campaign?subid=" + Math.random().toString(36).substring(7),
    "https://popads.net/trk?cid=" + Date.now(),
    "https://zeropark.com/?camp=" + Math.floor(Math.random() * 100000),
    "https://hilltopads.com/?zone=" + Math.random().toString(36).substring(2, 8),
    "https://adcash.com/?clickid=" + Math.floor(Math.random() * 999999)
  ];

  const googleQueries = [
    "free paypal cash","amazon gift card code","best cpa offers","win free gift card",
    "online survey rewards","earn money fast","get robux free","crypto airdrop claim",
    "gift card giveaway","survey site legit","how to earn money online"
  ];
  const randomExtra = ["2025","now","real","legit","fast","free","hack","generator",""];
  const redditSubs = ["earn","beermoney","sidehustle","workonline","passiveincome"];

  const socials = [
    "https://www.google.com/search?q=" + encodeURIComponent(
      googleQueries[Math.floor(Math.random() * googleQueries.length)] + " " +
      randomExtra[Math.floor(Math.random() * randomExtra.length)]
    ),
    "https://reddit.com/r/" + redditSubs[Math.floor(Math.random() * redditSubs.length)] + "/" +
      Math.random().toString(36).substring(4),
    "https://t.me/share/url?url=" + encodeURIComponent(url) +
      "&text=" + encodeURIComponent("Check this out " + Math.random().toString(36).substring(2, 6))
  ];

  let ratio = 0.68 + Math.random() * 0.07;
  let ref = Math.random() < ratio
      ? adNetworks[Math.floor(Math.random() * adNetworks.length)]
      : socials[Math.floor(Math.random() * socials.length)];

  history.replaceState({}, "", ref);
  return url;
}
