const quote_refresh = document.querySelector(".quote_refresh");

const getQuote = async () => {
  const res = await fetch(
    "https://cors.eu.org/https://api.forismatic.com/api/1.0/",
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "method=getQuote&format=json&lang=ru",
      method: "POST",
    }
  );
  const data = await res.json();
  setTimeout(() => {
    document.querySelector(".quote_text").textContent = data.quoteText;
    document.querySelector(".quote_author").textContent = data.quoteAuthor;
  }, 250);
};
getQuote();

quote_refresh.addEventListener("click", () => {
  quote_refresh.classList.add("active");
  getQuote();
});

quote_refresh.addEventListener(
  "animationend",
  () => {
    quote_refresh.classList.remove("active");
  },
  false
);

export default getQuote;
