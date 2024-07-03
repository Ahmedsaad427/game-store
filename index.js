class Ui {
    displayGames(games) {
      let gamesContent = "";
  
      for (let i = 0; i < games.length; i++) {
        gamesContent += `
          <div class="col-lg-4 col-md-6 col-xl-3">
            <div class="card h-100 bg-transparent" data-id="${games[i].id}">
              <div class="px-3 pt-3">
                <img src="${games[i].thumbnail}" class="card-img-top" alt="game thumbnail">
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <h3 class="m-0 text-white">${games[i].title}</h3>
                  <span class="p-2 text-bg-primary">Free</span>
                </div>
                <p class="card-text text-center text-white opacity-50">
                  ${games[i].short_description.split(" ").slice(0, 8).join(" ")}...
                </p>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span>${games[i].genre}</span>
                <span>${games[i].platform}</span>
              </div>
            </div>
          </div>
        `;
  
        document.getElementById("gamesData").innerHTML = gamesContent;
      }
    }
  
    displayGameDetails(data) {
      let gameDetail = `
        <div class="col-md-4">
          <img src="${data.thumbnail}" alt="game thumbnail" class="w-100">
        </div>
        <div class="col-md-8">
          <h3>Title: ${data.title}</h3>
          <p>Category: <span class="text-bg-info">${data.genre}</span></p>
          <p>Platform: <span class="text-bg-info">${data.platform}</span></p>
          <p>Status: <span class="text-bg-info">${data.status}</span></p>
          <p class="small">${data.description}</p>
          <a href="${data.game_url}" target="_blank" class="btn btn-outline-warning mb-3">Show Game</a>
        </div>
      `;
      document.querySelector(".game-data").innerHTML = gameDetail;
    }
  }
  
  class Details {
    constructor() {
      this.ui = new Ui();
      document.querySelector(".btn-close").addEventListener("click", () => {
        document.querySelector(".games").classList.remove("d-none");
        document.querySelector(".game-detail").classList.add("d-none");
      });
    }
  
    async getDetails(gameId) {
      const loader = document.querySelector(".loading");
      loader.classList.remove("d-none");
  
      try {
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'fdb321108emshd97abe78e0e4556p146924jsn4a40dbe9908a',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
          }
        };
  
        const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options);
        const data = await res.json();
        this.ui.displayGameDetails(data);
        loader.classList.add("d-none")
      } catch (err) {
        alert(err);
      }
    }
  }
  
  class Games {
    constructor() {
      this.getGames("MMORPG");
      this.details = new Details();
      this.ui = new Ui();
      this.links = document.querySelectorAll(".nav-link");
      for (const link of this.links) {
        link.addEventListener("click", (e) => {
          document.querySelector(".active").classList.remove("active");
          e.target.classList.add("active");
          this.getGames(e.target.dataset.category);
        });
      }
    }
  
    async getGames(category) {
      const loader = document.querySelector(".loading");
      loader.classList.remove("d-none");
  
      try {
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'fdb321108emshd97abe78e0e4556p146924jsn4a40dbe9908a',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
          }
        };
  
        const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        const data = await res.json();
        this.ui.displayGames(data);
        loader.classList.add("d-none")
        this.getGameDetail();
      } catch (err) {
        alert(err);
      }
    }
  
    getGameDetail() {
      let cards = document.querySelectorAll(".card");
      for (const card of cards) {
        card.addEventListener("click", () => {
          document.querySelector(".games").classList.add("d-none");
          document.querySelector(".game-detail").classList.remove("d-none");
          this.details.getDetails(card.dataset.id);
        });
      }
    }
  }
  
  new Games();
  