function init() {
  const initedProjects = initProjects();
  let element = document.getElementById("loadLocalBtn");
  element.addEventListener("click", function () {
    loadLocal(initedProjects);
  });
  element = document.getElementById("loadRemoteBtn");
  element.addEventListener("click", function () {
    loadRemote();
  });
}

function initProjects() {
  const projects = {
    projects: [
      {
        name: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        image: "https://source.unsplash.com/random/1",
        description:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
      {
        name: "qui est esse",
        image: "https://source.unsplash.com/random/2",
        description:
          "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
      {
        name: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        image: "https://source.unsplash.com/random/3",
        description:
          "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
      {
        name: "eum et est occaecati",
        image: "https://source.unsplash.com/random/4",
        description:
          "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
    ],
  };
  return projects;
}

function loadLocal(projects) {
  let jsonString = JSON.stringify(projects);
  localStorage.setItem("projects", jsonString);

  class MyProjectCard extends HTMLElement {
    constructor() {
      super();

      // Attach the Shadow DOM to the custom element
      const shadowRoot = this.attachShadow({ mode: "open" });

      // Retrieve the projects data from local storage
      const storedJsonString = localStorage.getItem("projects");
      const storedProjects = JSON.parse(storedJsonString);

      console.log("Local: ");
      console.log(storedProjects);

      // Create the root list for the custom element
      const rootList = document.createElement("ul");

      // Add the styles for the custom element
      const style = document.createElement("style");
      style.textContent = `
      /* Define styles for your custom element */
      :host {
        --beige: #d5cabd;
        --purple: #845ec2;
        display: flex;
        flex-direction: row;
        padding: 10px;

        }
        ul {
        display: flex;
        flex-direction: row;
        flex-flow: row wrap;
        list-style: none;
        }

        li {
          margin: 5px 5px;
          min-width: 300px;
          max-width: 40%;
          border: 4px solid var(--purple);
          border-radius: 20px;
          background-color: var(--beige);
          padding: 50px 50px;
        }
        a {
          color: var(--purple);
          font-size:larger;
          font-weight: 700;
        }

    `;

      // Create and append the course list items to the root ul
      if (storedProjects && storedProjects.projects) {
        storedProjects.projects.forEach((project) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
        <h2>${project.name}</h2>
        <img src="${project.image}" width="200" height="200" alt="${project.name} Image">
        <p>${project.description}</p>
        <a href="${project.ref}">Read More</a>
        `;
          rootList.appendChild(listItem);
        });
      }
      // Append the elements to the Shadow DOM
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(rootList);
    }
  }
  // Register the custom element with the browser
  customElements.define("project-card", MyProjectCard);
}

function loadRemote() {
  const apiKey = "$2b$10$cBn2eEf3ZMsge3FbDf.EOen/jGw7vp5nuY8EWKWa.dCzzsXwEgFNy"; // Replace with your JSONBin secret key
  const url = "https://api.jsonbin.io/v3/b/64ccdad78e4aa6225eca8bbc";
  fetch(url, {
    headers: {
      "X-Access-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      class MyCustomElement extends HTMLElement {
        constructor() {
          super();

          // Attach the Shadow DOM to the custom element
          const shadowRoot = this.attachShadow({ mode: "open" });

          const storedProjects = data.record.projects;
          console.log("JSONBin: ");
          console.log(storedProjects);

          // Create the root list for the custom element
          const rootList = document.createElement("ul");

          // Add the styles for the custom element
          const style = document.createElement("style");
          style.textContent = `
          /* Define styles for your custom element */
          :host {
          display: block;
          background-color: lightblue;
          }
      `;

          // Create and append the course list items to the root ul
          if (storedProjects) {
            storedProjects.forEach((course) => {
              const listItem = document.createElement("li");
              listItem.textContent = `${course.courseId}: ${course.courseName}`;

              rootList.appendChild(listItem);
            });
          }
          // Append the elements to the Shadow DOM
          shadowRoot.appendChild(style);
          shadowRoot.appendChild(rootList);
        }
      }

      // Register the custom element with the browser
      customElements.define("my-custom-element", MyCustomElement);
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}
window.addEventListener("DOMContentLoaded", init);
