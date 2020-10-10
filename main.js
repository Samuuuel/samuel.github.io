const USER_API = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getUser('florinpop17');

async function getUser(username) {
    const resp = await fetch(USER_API + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
};

async function getRepos(username) {
    const resp = await fetch(USER_API + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData)
};

function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.login ? user.login : 'Aucun nom'}</h2>
                <p>${user.bio ? user.bio : 'Aucune information'}</p>

                <ul class="info">
                    <li>${user.followers}<strong>followers</strong></li>
                    <li>${user.following}<strong>following</strong></li>
                    <li>${user.public_repos}<strong>repositories</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
};

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    for (i = 0; i < repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 9).length; i++) {
        const repo = repos[i];
        const repoEl = document.createElement('a');

        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl)
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
})