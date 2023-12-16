const scrollContainer = document.getElementById("scroll-container");
const sections = document.querySelectorAll("section");
const menuItems = document.querySelectorAll(".menuItems");
console.log(menuItems, "menu");
let currentSection = 0;
let isScrolling = false;


// Add event listener for mousewheel
scrollContainer.addEventListener("wheel", scrollController);


function scrollController(event) {
  event.preventDefault();

  if (!isScrolling) {
    isScrolling = true;

    setTimeout(() => {
      isScrolling = false;
    }, 1500);

    const delta = Math.sign(event.deltaY);
    const nextSection = Math.min(
      sections.length - 1,
      Math.max(0, currentSection + delta)
    );
    // console.log(nextSection,"nextSection");

    const targetPosition = sections[nextSection].offsetTop;

    console.log(targetPosition,"targetPosition");

    smoothScroll(scrollContainer, targetPosition, 1600);

    sections.forEach((section, index) => {
      if (index === nextSection) {
        section.classList.add("active");
      // Image.classList.add("activeimg");
      } else {
        section.classList.remove("active");
      }
    });

    currentSection = nextSection;
  }

}

// Function for smooth scrolling
function smoothScroll(element, targetPosition, duration) {
    const startPosition = element.scrollTop;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    
    function scrollAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      const scrollProgress = Math.min(elapsedTime / duration, 1);
      element.scrollTop = startPosition + distance * ease(scrollProgress);
      if (elapsedTime < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }
    function ease(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    requestAnimationFrame(scrollAnimation);
  }



//navbar menuclick
for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", function () {
    targetPosition = sections[i].offsetTop;
    smoothScroll(scrollContainer, targetPosition, 1600);
    sections.forEach((section, index) => {
        if (index === currentSections) {
          // section.classList.add("active");
          menuItems[i].classList.add("active-link");
        } else {
          menuItems[i].classList.remove("active-link");
        }
      });
      currentSection = currentSections;
  });
  let currentSections = i;
  console.log(i, "index");




  
}
