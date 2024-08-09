const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();
        observer.disconnect(); // Stop observing after the counters have started
      }
    });
  },
  { threshold: 0.5 }
);

const counterSection = document.querySelector(".counter-container");
observer.observe(counterSection);

function startCounters() {
  const counters = document.querySelectorAll(".counter-value");
  counters.forEach((counter) => {
    const targetValue = +counter.getAttribute("data-value");
    const smallPart = counter.querySelector(".small");
    const plusSign = counter.innerHTML.includes("+") ? "+" : "";

    if (counter.id === "Established") {
      animateEstablishedCounter(counter, targetValue);
    } else {
      animateCounter(counter, targetValue, smallPart, plusSign);
    }
  });
}

function animateCounter(counter, targetValue, smallPart, plusSign) {
  let currentValue = 0;
  const updateInterval = 50;
  const increment = Math.ceil(targetValue / (2000 / updateInterval)); // Count over 2 seconds

  const interval = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(interval);
    }

    const displayValue = currentValue.toLocaleString();
    counter.innerHTML =
      displayValue.slice(0, -3) +
      `<span class="small">${displayValue.slice(-3)}</span>` +
      plusSign;
  }, updateInterval);
}

function animateEstablishedCounter(counter, targetValue) {
  let currentValue = 0;
  const updateInterval = 50;
  const increment = Math.ceil(targetValue / (2000 / updateInterval)); // Count over 2 seconds

  const interval = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(interval);
    }

    counter.innerHTML = currentValue; // Display the value without commas or plus sign
  }, updateInterval);
}
