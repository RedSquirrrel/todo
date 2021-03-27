const toggeleSwitch = document.querySelector('input[type="checkbox"]');
const body = document.querySelector('.body');
const toggleIcon = document.querySelector('.toggle-icon');

const toggleLightandDarkMode = isDark => {
  body.style.background = isDark ? 'dark' : 'light';

  isDark
    ? toggleIcon.children[0].classList.replace('fa-moon', 'fa-sun')
    : toggleIcon.children[0].classList.replace('fa-sun', 'fa-moon');
};

const switchTheme = e => {
  e.preventDefault();
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    toggleLightandDarkMode(true);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    toggleLightandDarkMode(false);
  }
};
toggeleSwitch.addEventListener('change', switchTheme);

const current = localStorage.getItem('theme');
const currentTheme = () => {
  if (current) {
    document.documentElement.setAttribute('data-theme', current);
    if (current === 'dark') {
      toggeleSwitch.checked = true;
      toggleLightandDarkMode(true);
    }
  }
};

currentTheme();
