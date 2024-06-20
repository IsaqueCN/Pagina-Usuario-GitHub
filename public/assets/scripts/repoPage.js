let AcessoLink = document.getElementById("AcessoLink")
let PropietaryName = document.getElementById("PropietaryName")
let PropietaryImg = document.getElementById("PropietaryImg");
let ProfileName = document.getElementById("ProfileName")
let RepoName = document.getElementById("RepoName")
let RepoDesc = document.getElementById("RepoDesc")
let RepoCreateDate = document.getElementById("RepoCreateDate")
let RepoLanguage = document.getElementById("RepoLanguage")
let RepoLicense = document.getElementById("RepoLicense")
let RepoLink = document.getElementById("RepoLink")
let RepoWatchers = document.getElementById("RepoWatchers")
let RepoStars = document.getElementById("RepoStars")
let RepoForks = document.getElementById("RepoForks")
let Topics = document.getElementById("Topics")
let TopicTemplate = document.getElementById("TopicTemplate")

let token = null // Coloque um token do GITHUB aqui para não ter problemas com limite de pedidos API
let GETHeader

if (token) {
    GETHeader = {
        method: "GET",
        headers: {
            Authorization: token,
        }
    }
} else {
    GETHeader = {
        method: "GET",
    }
}


let URLParams = new URLSearchParams(window.location.search);
let repoId = URLParams.get("id");
fetch(`https://api.github.com/repositories/${repoId}`, GETHeader).then((data) => {
    return data.json();
}).then((repo) => {
    UpdatePage(repo)
})

async function UpdatePage(repo) {
    let userInfo = await ((await fetch(`https://api.github.com/users/${repo.owner.login}`)).json())

    AcessoLink.href = repo.html_url;
    ProfileName.textContent = repo.owner.login
    PropietaryName.textContent = userInfo.name
    PropietaryImg.src = userInfo.avatar_url
    RepoName.textContent = repo.name
    RepoDesc.textContent = repo.description ?? "Nenhuma descrição definida."
    RepoCreateDate.textContent = repo.created_at.split('T')[0]
    RepoLanguage.textContent = repo.language ?? "Nenhuma linguagem definida."
    RepoLicense.textContent = repo.license?.name ?? "Nenhuma licença definida."
    RepoLink.textContent = repo.html_url
    RepoLink.href = repo.html_url
    RepoWatchers.textContent = repo.subscribers_count
    RepoStars.textContent = repo.stargazers_count
    RepoForks.textContent = repo.forks_count + `${(repo.forks_count == 1) ? " Fork" : " Forks"}`

    if (repo.topics.length == 0) {
        let newP = document.createElement('p')
        newP.textContent = "Nenhum tópico definido."
        Topics.appendChild(newP)
    } else {
        for (topic of repo.topics) {
            let topicElement = TopicTemplate.cloneNode(true)
            topicElement.textContent = topic
    
            Topics.appendChild(topicElement)
            topicElement.setAttribute("class", "topico-item bg-info p-2")
        }
    }
}
