document.addEventListener("DOMContentLoaded", () => {
  const contentArea = document.getElementById("contentArea");

  // Hjälpfunktion för att avgöra om vi är på en mobil enhet
  function isMobile() {
    return window.innerWidth < 768;
  }

  // Funktion för att ladda innehåll via iframe (används på desktop)
  function loadContent(url) {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    contentArea.innerHTML = "";
    contentArea.appendChild(iframe);
  }

  // Portfolio-data (används om du vill ladda innehåll direkt via loadProject)
  const portfolioData = {
    appar: [
      { id: "app1", name: "App 1", content: "<h2>App 1</h2><p>Beskrivning av App 1...</p>" },
      { id: "app2", name: "App 2", content: "<h2>App 2</h2><p>Beskrivning av App 2...</p>" },
      { id: "app3", name: "App 3", content: "<h2>App 3</h2><p>Beskrivning av App 3...</p>" }
    ],
    spel: [
      { id: "spel1", name: "Spel 1", content: "<h2>Spel 1</h2><p>Beskrivning av Spel 1...</p>" },
      { id: "spel2", name: "Spel 2", content: "<h2>Spel 2</h2><p>Beskrivning av Spel 2...</p>" },
      { id: "spel3", name: "Spel 3", content: "<h2>Spel 3</h2><p>Beskrivning av Spel 3...</p>" }
    ]
  };

  // Funktion för att ladda projektinnehåll (används exempelvis för "appar")
  function loadProject(category, projectId) {
    const project = portfolioData[category].find(proj => proj.id === projectId);
    if (project) {
      contentArea.innerHTML = project.content;
    } else {
      contentArea.innerHTML = "<p>Projektet hittades inte.</p>";
    }
  }

  // Hantera klick på länkar i dropdown-menyerna
  document.querySelectorAll(".dropdown-content a").forEach(link => {
    link.addEventListener("click", (e) => {
      // På mobila enheter ska länken fungera normalt (navigera direkt)
      if (isMobile()) {
        return;
      }
      e.preventDefault();

      // Om länken har klassen "load-project" används loadContent (t.ex. för spel)
      if (link.classList.contains("load-project")) {
        loadContent(link.getAttribute("href"));
      }
      // Om länken har ett data-id (t.ex. för appar) används loadProject
      else if (link.dataset.id) {
        // Bestäm kategori baserat på förälderns id
        const parentId = link.parentElement.id;
        const category = (parentId === "appsList") ? "appar" :
                         (parentId === "gamesList") ? "spel" : null;
        if (category) {
          loadProject(category, link.dataset.id);
        }
      }
      // Fallback: ladda innehåll via iframe
      else {
        loadContent(link.getAttribute("href"));
      }
    });
  });

  // För mobila enheter: toggla dropdown-menyn vid klick på dropbtn
  document.querySelectorAll(".dropdown .dropbtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (isMobile()) {
        const dropdownContent = btn.nextElementSibling;
        if (dropdownContent) {
          dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
        }
      }
    });
  });

  // Vid fönsterstorleksändring: återställ dropdown-menyer om vi byter till desktop
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      document.querySelectorAll(".dropdown-content").forEach(dropdown => {
        dropdown.style.display = "";
      });
    }
  });

  // --- Mobil-flikväxling ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Ta bort "active"-klassen från alla flikknappar och innehåll
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Lägg till "active" på den klickade knappen och visa motsvarande innehåll
      button.classList.add('active');
      const targetId = button.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });
});
