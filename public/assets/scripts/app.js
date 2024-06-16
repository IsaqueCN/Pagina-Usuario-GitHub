
async function PreparePage() {
    let userData = await (await fetch("https://api.github.com/users/IsaqueCN")).json();
    let userRepos = await (await fetch(userData.repos_url)).json();

    let link = userdata.html_url;
    let loginName = userData.login;
    let name = userData.name;
    let followersCount = userData.followers;
    let bio = userdata.bio;
    let location = userData.location;
    let website = userData.blog;
    let reposCount = userData.public_repos;

}

PreparePage();