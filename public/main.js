const inputValue = document.querySelector("#search");
const formSubmit = document.querySelector(".form-submit");
const resultsInfo = document.querySelector(".results-info");

const fetchUser = async nameOfUser => {
	const fetchGithubUser = await fetch(
		`https://api.github.com/users/${nameOfUser}`
	);

	if (fetchGithubUser.ok) {
		const userInfo = await fetchGithubUser.json();
		return { userInfo };
	} else {
		resultsInfo.innerHTML =
			'<p class="error-message"> Oops, something went wrong, please try again <span>🙁</span> </p>';
	}
};

const fetchPublicRepositories = async nameOfUser => {
	const fetchUserPublic = await fetch(
		`https://api.github.com/users/${nameOfUser}/repos`
	);

	const reposData = await fetchUserPublic.json();

	resultsInfo.innerHTML =
		`<p class="profile-info"> Here are ${nameOfUser}'s public repos (with links):</p>` +
		"<ul>" +
		reposData
			.map(repo => {
				return `
        <li><a class="links" href="${repo.html_url}" target="_blank">${repo.full_name}<a><li>`;
			})
			.join("") +
		"</ul>";
};

const showData = () => {
	const nameOfUser = inputValue.value;

	fetchUser(nameOfUser).then(res => {
		const publicRepos = res.userInfo.public_repos;

		if (!publicRepos) {
			resultsInfo.innerHTML = `<p class="error-message">It seems ${nameOfUser} does not have any public repos <span>🙁</span> <p>`;
		} else {
			fetchPublicRepositories(nameOfUser);
		}
	});
};

formSubmit.addEventListener("submit", event => {
	event.preventDefault();
	showData();
	formSubmit.reset();
});
