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
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
      {
        name: "qui est esse",
        image: "https://source.unsplash.com/random/2",
        description:
          "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
      {
        name: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        image: "https://source.unsplash.com/random/3",
        description:
          "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
      {
        name: "eum et est occaecati",
        image: "https://source.unsplash.com/random/4",
        description:
          "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
      {
        name: "dolorem dolore est ipsam",
        image: "https://source.unsplash.com/random/5",
        description:
          "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
      {
        name: "nesciunt iure omnis dolorem tempora et accusantium",
        image: "https://source.unsplash.com/random/6",
        description:
          "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
      {
        name: "optio molestias id quia eum",
        image: "https://source.unsplash.com/random/7",
        description:
          "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
        ref: "https://en.wikipedia.org/wiki/Wiki",
      },
    ],
  };
  return projects;
}

function loadLocal(projects) {
  let jsonString = JSON.stringify(projects);
  console.log(jsonString);
  localStorage.setItem("projects", jsonString);

  class MyProjectCard extends HTMLElement {
    constructor() {
      super();

      // Attach the Shadow DOM to the custom element
      const shadowRoot = this.attachShadow({ mode: "open" });

      // Retrieve the projects data from local storage
      const storedJsonString = localStorage.getItem("projects");
      const storedProjects = JSON.parse(storedJsonString);
      console.log("loadLocal: ");
      console.log(storedProjects);
      // Create the root list for the custom element
      const rootList = document.createElement("ul");

      // Add the styles for the custom element
      const style = document.createElement("style");
      addStyle(style);

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

function addStyle(style) {
  style.textContent = `
  /* Define styles for your custom element */
  :host {
    --beige: #d5cabd;
    --purple: #845ec2;
    display: flex;
    flex-direction: row;

    }
    ul {
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    list-style: none;
    justify-content: space-around;
    }

    li {
      margin: 5px 5px 5px 5px;
      min-width: 300px;
      max-width: 40%;
      border: 4px solid var(--purple);
      border-radius: 20px;
      background-color: var(--beige);
      padding: 50px 50px 50px 50px;
    }
    a {
      color: var(--purple);
      font-size:larger;
      font-weight: 700;
    }

    img {
      float: left;
      margin-right: 25px;
    }
  
    p {
      text-align: left;
    }
    h2 {
      font-family: Georgia, serif;
    }

`;
}

function loadRemote() {
  const apiKey = "$2b$10$cBn2eEf3ZMsge3FbDf.EOen/jGw7vp5nuY8EWKWa.dCzzsXwEgFNy";
  const url = "https://api.jsonbin.io/v3/b/64ccdad78e4aa6225eca8bbc";

  fetch(url, {
    headers: {
      "X-Access-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("response: ");
      return response.json();
    })
    .then((data) => {
      console.log("data: ");
      class MyCustomElement extends HTMLElement {
        constructor() {
          super();
          console.log("JSONBin: ");
          // Attach the Shadow DOM to the custom element
          const shadowRoot = this.attachShadow({ mode: "open" });

          const storedProjects = data.record.projects;
          console.log("loadRemote: ");
          console.log(storedProjects);
          // Create the root list for the custom element
          const rootList = document.createElement("ul");

          // Add the styles for the custom element
          const style = document.createElement("style");
          addStyle(style);

          // Create and append the course list items to the root ul
          if (storedProjects) {
            storedProjects.forEach((project) => {
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
      customElements.define("project-card", MyCustomElement);
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}
window.addEventListener("DOMContentLoaded", init);
