const switchBtn = document.querySelector(".switch-btn");
const switchBtnCircle = document.querySelector(".switch-btn span");
const switchLabel = document.querySelector(".switch-theme-wrapper label");
const cards = document.querySelectorAll(".card");
const STORAGE_KEY = "user-color-scheme";
const COLOR_MODE_KEY = "--color-mode";

const getCSSCustomProp = (propKey) => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(
    propKey
  );

  if (response.length) {
    response = response.replace(/\"/g, "").trim();
  }

  return response;
};

const applySetting = (passedSetting) => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
    document.documentElement.setAttribute(
      "data-user-color-scheme",
      currentSetting
    );
    setButtonLabelAndStatus(currentSetting);
  } else {
    setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
  }
};

const setButtonLabelAndStatus = (currentSetting) => {
  currentSetting === "dark"
    ? switchBtn.setAttribute("aria-pressed", true)
    : switchBtn.setAttribute("aria-pressed", false);
};

const toggleSetting = () => {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting =
        getCSSCustomProp(COLOR_MODE_KEY) === "dark" ? "light" : "dark";
      break;
    case "light":
      currentSetting = "dark";
      break;
    case "dark":
      currentSetting = "light";
      break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
};

function cardsAnimation() {
  const delayTime = 100;
  cards.forEach((e, i) => {
    e.style.transitionDelay = `${delayTime * i}ms`;
    setTimeout(() => {
      e.style.transitionDelay = "0ms";
    }, delayTime * cards.length);
  });
}

switchBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  cardsAnimation();
  applySetting(toggleSetting());
});

applySetting();
