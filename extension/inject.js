/** TODO
 * - add authentication to increase rate limit
 */

// gets repo list and iterates through each repo
var repos = document.getElementById('user-repositories-list').childNodes[1];
repos = repos.getElementsByTagName('li');
repos = [].slice.call(repos);
repos.forEach(function(repo, index) {

	// gets the reference to the repo (i.e. /user/repo)
	var ref = repo.getElementsByTagName('a')[0].getAttributeNode('href').value;

	// creates and sends the GET HTTP request to the GitHub API for the repo info
	var xhr_repo = new XMLHttpRequest();
	xhr_repo.open('GET', "https://api.github.com/repos" + ref +"/git/refs/heads/master", true);
	xhr_repo.onreadystatechange = function() {

		var json = JSON.parse(xhr_repo.responseText);
		if (xhr_repo.readyState == 4 && xhr_repo.status == 200 && json.message != "Not Found") {

			// creates and sends the GET HTTP request to the GitHub API for the master commit info
			var xhr_commit = new XMLHttpRequest();
			xhr_commit.open('GET', "https://api.github.com/repos" + ref + "/git/commits/" + json.object.sha)
			xhr_commit.onreadystatechange = function() {
				var msg = JSON.parse(xhr_commit.responseText);
				if (xhr_commit.readyState == 4 && xhr_commit.status == 200) {

					// creates a DOM element containing the master commit SHA and message
					var el_div = document.createElement('div');
					el_div.className = 'f6 text-gray mt-2';
					var el_a = document.createElement('a');
					el_a.setAttribute('class', 'mr-3');
					el_a.textContent = msg.sha.substring(0, 7) + "\t" + msg.message;
					el_a.href = "https://github.com" + ref + "/commit/master";
					el_div.appendChild(el_a)
					repo.appendChild(el_div);
				}
			}
			xhr_commit.send();
		}
		console.log(xhr_repo.responseText)
	}
	xhr_repo.send();
});