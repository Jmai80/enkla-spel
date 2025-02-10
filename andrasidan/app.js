document.addEventListener("DOMContentLoaded", () => {
    // Hantera länk-händelser för portfolio (för appar och spel)
    // Länkar utan klassen "load-project" ska använda loadProject,
    // medan de med klassen "load-project" ska använda loadContent.
    
    // För länkar i appar-dropdownen
    document.querySelectorAll("#appsList a").forEach(link => {
      // Om länken INTE har klassen load-project
      if (!link.classList.contains("load-project")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const projectId = e.target.dataset.id;
          loadProject("appar", projectId);
        });
      }
    });
    
    // För länkar i spel-dropdownen
    document.querySelectorAll("#gamesList a").forEach(link => {
      if (link.classList.contains("load-project")) {
        // Använd loadContent för dessa länkar
        link.addEventListener("click", function(e) {
          e.preventDefault();
          loadContent(this.getAttribute("href"));
        });
      } else {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const projectId = e.target.dataset.id;
          loadProject("spel", projectId);
        });
      }
    });
    
    // Funktion för att ladda ett projekt via portfolioData
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
    
    const contentArea = document.getElementById("contentArea");
    
    function loadProject(category, projectId) {
      const project = portfolioData[category].find(proj => proj.id === projectId);
      if (project) {
        contentArea.innerHTML = project.content;
      } else {
        contentArea.innerHTML = "<p>Projektet hittades inte.</p>";
      }
    }
    
    // Funktion för att ladda innehåll via en iframe (t.ex. för klockaspelet)
    function loadContent(url) {
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      contentArea.innerHTML = "";
      contentArea.appendChild(iframe);
    }
  });
  