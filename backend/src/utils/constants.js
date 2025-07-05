const headlines = [
  "Why {name} is {location}'s Sweetest Spot in 2025",
  "Discover Why {name} is the Talk of {location}'s Scene",
  "Top Reasons {location} Loves {name} in 2025",
  "How {name} Became a Favorite in {location} This Year",
  "Experience the Best of {location} with {name}",
  "Why Everyone in {location} is Buzzing About {name}",
  "Uncover the Secret Behind {name}'s Success in {location}",
  "What Makes {name} Stand Out in {location}'s Market",
  "From Good to Great: {name}'s Rise in {location}",
  "{name}: The Hidden Gem Every {location} Local Should Know",
];


const generateRandomHeadline = (name, location) => {
  const headline = headlines[Math.floor(Math.random() * headlines.length)];
  return headline.replace("{name}", name).replace("{location}", location);
};


module.exports = { headlines, generateRandomHeadline };
