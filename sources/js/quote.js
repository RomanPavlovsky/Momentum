const refresh = document.querySelector('.quote__refresh');
const text = document.querySelector('.quote__text');
const author = document.querySelector('.quote__author');

const getQuote = async () => {
  const res = await fetch(
    'https://corsproxy.io/?https://api.forismatic.com/api/1.0/',
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: `method=getQuote&format=json&lang=${localStorage.lang}`,
      method: 'POST',
    }
  );
  const data = await res.json();
  setTimeout(() => {
    text.textContent = data.quoteText;
    author.textContent = data.quoteAuthor;
  }, 250);
};
getQuote();

refresh.addEventListener('click', () => {
  refresh.classList.add('active');
  getQuote();
});

refresh.addEventListener(
  'animationend',
  () => {
    refresh.classList.remove('active');
  },
  false
);

export default getQuote;
