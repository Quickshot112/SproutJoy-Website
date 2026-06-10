document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ WebsitesJava.js loaded!");

  let prevScrollPos = window.pageYOffset;
  const header = document.getElementById("mainHeader");

  if (header) {
    const downScrollThreshold = 10;
    const upScrollThreshold = 1;

    window.addEventListener("scroll", () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollPos + downScrollThreshold) {
        header.style.top = `-${header.offsetHeight}px`;
      } else if (prevScrollPos > currentScrollPos + upScrollThreshold) {
        header.style.top = "0px";
      }
      prevScrollPos = currentScrollPos;
    });
  }

  const searchContainer = document.createElement("div");
  searchContainer.id = "searchContainer";
  searchContainer.innerHTML = `
    <input type="text" id="searchInput" placeholder="Search" />
    <button id="searchGo">Go</button>
    <button id="searchClose">X</button>
  `;
  Object.assign(searchContainer.style, {
    display: "none",
    position: "fixed",
    top: "80px",
    right: "20px",
    background: "#fff",
    border: "1px solid #ccc",
    padding: "10px",
    zIndex: 9999,
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    flexDirection: "row",
    gap: "5px"
  });
  searchContainer.className = "floating-search";
  document.body.appendChild(searchContainer);

  document.getElementById("searchGo").onclick = performSiteSearch;
  document.getElementById("searchClose").onclick = closeSearch;
});

function toggleMenu() {
  const nav = document.querySelector("nav");
  if (nav) nav.classList.toggle("show");
}

function openSearch() {
  const searchBox = document.getElementById("searchContainer");
  searchBox.style.display = "flex";
  document.getElementById("searchInput").focus();
}

function closeSearch() {
  const searchBox = document.getElementById("searchContainer");
  searchBox.style.display = "none";
  document.getElementById("searchInput").value = "";
}

// Data paths relative to ICM451_Project
const siteSearchData = [
{
title: "Homepage",
path: "Homepage/index.html",
description: "Landing page with image slider, introduction to activities, service overview, available locations, and hiring banner."
},
{
title: "About Us",
path: "About_Us/AboutUs.html",
description: "Page outlining the organization's mission and story, team profiles, and visual introduction to SproutJoy."
},
{
title: "Meet Our Team",
path: "About_Us/Meet_Our_Team/MeetOurTeam.html",
description: "Details and profiles of each team member, including roles, education, and personal teaching philosophies."
},
{
title: "Organization's Background",
path: "About_Us/Organizations_Background/OrganizationsBackground.html",
description: "Founding story, purpose, and values behind SproutJoy with visuals of the founder and facility."
},
{
title: "Our Services",
path: "Our_Services/OurServices.html",
description: "Overview of available childcare services: Daycare Programme, Nanny Care Plan, and Pop-Up Nanny."
},
{
title: "Daycare Programme",
path: "Our_Services/Daycare_Programme/DaycareProgramme.html",
description: "Structured programs for children aged 16 months to 6 years with form-based booking and timetable preview."
},
{
title: "Nanny Care Plan",
path: "Our_Services/Nanny_Care_Plan/NannyCarePlan.html",
description: "Customized nanny services segmented by age: Infant, Toddler, and Full-Day care plans."
},
{
title: "Pop-Up Nanny",
path: "Our_Services/Pop-Up_Nanny/Pop-UpNanny.html",
description: "Event-based or emergency childcare with vetted caregivers and booking functionality."
},
{
title: "Why Choose Us",
path: "Why_Choose_Us/WhyChooseUs.html",
description: "Promotional section explaining reasons to trust SproutJoy, with parents' testimonials and FAQs."
},
{
title: "Parents Reviews",
path: "Why_Choose_Us/ParentsReviews/ParentsReviews.html",
description: "Cards containing feedback from parents about their experience with SproutJoy services."
},
{
title: "Contact Us",
path: "Contact_Us/ContactUs.html",
description: "Information page with contact details, social media links, and recruitment call-to-action."
},
{
title: "Job Application",
path: "Contact_Us/Job_Application/JobApplication.html",
description: "Application form for potential employees to submit personal and professional details."
}
];

function performSiteSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!query) return;

  const results = siteSearchData.filter(page =>
    page.title.toLowerCase().includes(query) ||
    page.description.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    alert("No matches found.");
  } else {
    displaySearchResults(results);
  }

  closeSearch();
}

function displaySearchResults(results) {
  const popup = document.createElement("div");
  popup.id = "searchResultsPopup";
  Object.assign(popup.style, {
    position: "fixed",
    top: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    border: "1px solid #ccc",
    padding: "15px",
    maxWidth: "500px",
    width: "90%",
    maxHeight: "60vh",
    overflowY: "auto",
	lineHeight: "1.5",
    zIndex: 10000,
    boxShadow: "0 0 10px rgba(0,0,0,0.3)"
  });

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Close";
  closeBtn.style.float = "right";
  closeBtn.onclick = () => popup.remove();
  popup.appendChild(closeBtn);

  // Get absolute base path to ICM451_Project
  const fullPath = location.href.replace(/\\/g, "/");
  const icmRoot = fullPath.indexOf("/ICM451_Project/");
  const basePath = fullPath.slice(0, icmRoot + "/ICM451_Project/".length);

  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";

  results.forEach(r => {
    const absoluteHref = `${basePath}${r.path}`;
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${r.title}</strong><br>
      ${r.description}<br>
      <button onclick="location.href='${absoluteHref}'">Go to Page</a><br><br>
    `;
    ul.appendChild(li);
  });

  popup.appendChild(ul);
  document.body.appendChild(popup);
}
