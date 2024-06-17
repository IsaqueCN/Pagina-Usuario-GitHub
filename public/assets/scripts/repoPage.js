let AcessoLink = document.getElementById("AcessoLink")
let ProfileName = document.getElementById("ProfileName")
let RepoName = document.getElementById("RepoName")
let RepoDesc = document.getElementById("RepoDesc")
let RepoCreateDate = document.getElementById("RepoCreateDate")
let RepoLanguage = document.getElementById("RepoLanguage")
let RepoLink = document.getElementById("RepoLink")
let RepoWatchers = document.getElementById("RepoWatchers")
let RepoStars = document.getElementById("RepoStars")
let RepoForks = document.getElementById("RepoForks")
let Topics = document.getElementById("Topics")
let TopicTemplate = document.getElementById("TopicTemplate")

let GETHeader = {
    method: "GET",
    headers: {
        Authorization: "token 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",
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
    AcessoLink.href = repo.html_url;
    ProfileName.textContent = repo.owner.login
    RepoName.textContent = repo.name
    RepoDesc.textContent = repo.description ?? "Nenhuma descrição definida."
    RepoCreateDate.textContent = repo.created_at.split('T')[0]
    RepoLanguage.textContent = repo.language ?? "Nenhuma linguagem definida."
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