let LoginName = document.getElementById("LoginName")
let PerfilImg = document.getElementById("PerfilImg")
let nameText = document.getElementById("ProfileName")
let descriptionText = document.getElementById("ProfileDescription")
let websiteText = document.getElementById("ProfileWebsite")
let followersCounter = document.getElementById("FollowersCounter")
let locationText = document.getElementById("ProfileLocation")
let ReposCounter = document.getElementById("ReposCount")
let ReposDiv = document.getElementById("ReposDiv")
let RepoTemplate = document.getElementById("RepoTemplate")
let ColegaTemplate = document.getElementById("ColegaTemplate")
let ColegasDiv = document.getElementById("ColegasDiv")
let CarouselTemplate = document.getElementById("CarouselTemplate")
let CarouselsDiv = document.getElementById("CarouselsDiv")
let CarouselIndicatorTemplate = document.getElementById("carouselIndicatorTemplate")
let CarouselIndicatorsDiv = document.getElementById("carouselIndicatorsDiv")

let GETHeader = {
    method: "GET",
    headers: {
        Authorization: "token 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",
    }
}

async function UpdatePage() {
    let userData = await (await fetch("https://api.github.com/users/IsaqueCN", GETHeader)).json()
    let userRepos = await (await fetch(userData.repos_url, GETHeader)).json()
    
    let Profilelink = userData.html_url
    LoginName.textContent = userData.login
    LoginName.href = Profilelink
    PerfilImg.src = userData.avatar_url
    nameText.textContent = userData.name
    nameText.href = Profilelink
    descriptionText.textContent = userData.bio
    locationText.textContent = userData.location
    followersCounter.textContent = userData.followers
    websiteText.textContent = userData.blog
    websiteText.href = userData.blog
    ReposCounter.textContent = userData.public_repos

    UpdateRepos(userRepos);

    let conteudoSugerido = await (await fetch("destaques")).json()

    for (let obj of conteudoSugerido) {
        let newCarouselIndicator = CarouselIndicatorTemplate.cloneNode(true)
        newCarouselIndicator.setAttribute("data-bs-slide-to", obj.id)
        newCarouselIndicator.setAttribute("aria-label", `Slide ${obj.id+1}`)

        CarouselIndicatorsDiv.appendChild(newCarouselIndicator)

        let newCarousel = CarouselTemplate.cloneNode(true)
        let CarouselLink = newCarousel.querySelector(".CarouselLink")
        let CarouselImg = newCarousel.querySelector(".CarouselImg")

        CarouselLink.href = obj.urlConteudo
        CarouselImg.src = obj.urlFoto
        CarouselImg.setAttribute("alt", obj.titulo)

        CarouselsDiv.appendChild(newCarousel)

        if (obj.id == 0) {
            newCarousel.setAttribute("class", "carousel-item active")
            newCarouselIndicator.setAttribute("class", "active")
            newCarouselIndicator.setAttribute("aria-current", "true")
        } else {
            newCarouselIndicator.setAttribute("class", "")
            newCarousel.setAttribute("class", "carousel-item")
        }
    }

    let colegasTrabalho = await (await fetch("fotos")).json()

    for (let obj of colegasTrabalho) {
        let newColega = ColegaTemplate.cloneNode(true)
        let cardImg = newColega.querySelector('img')
        let cardTitle = newColega.querySelector('.card-title')

        cardImg.src = obj.urlFoto
        cardTitle.textContent = obj.nome
        cardTitle.parentNode.href = obj.urlGithub

        ColegasDiv.appendChild(newColega)
        newColega.setAttribute("class", "col")
    }
}

async function UpdateRepos(userRepos) {
    let CompleteRepoInfo = []
    for (repo of userRepos) {
        CompleteRepoInfo.push(fetch(`https://api.github.com/repositories/${repo.id}`, GETHeader))
    }

    CompleteRepoInfo = await Promise.all(CompleteRepoInfo); // Necessário fazer isto para obter uma informação mais completa dos repositórios

    for (repo of CompleteRepoInfo) {
        repo = await repo.json();
        let container = RepoTemplate.cloneNode(true)
        let repoName = container.querySelector('.repo_name')
        let repoDesc = container.querySelector('.repo_desc')
        let repoStars = container.querySelector('.repo_stars')
        let repoWatching = container.querySelector('.repo_watching')
        let repoRedirect = container.querySelector('.repo_redirect')

        repoName.textContent = repo.name
        repoRedirect.href = `/repo.html?id=${repo.id}`
        repoDesc.textContent = (repo.description) ?? "Este repositório não tem descrição."
        repoStars.textContent = repo.stargazers_count
        repoWatching.textContent = repo.subscribers_count

        ReposDiv.appendChild(container)
        container.setAttribute("class", "col")
    }
}

UpdatePage();