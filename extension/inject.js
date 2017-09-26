/** TODO
 * 1. get latest commit
 * 2. inject latest commit
 */

var repos = document.getElementById('user-repositories-list').childNodes[1];
repos = repos.getElementsByTagName('li');

for (var i = 0; i < repos.length; i++) {
	var repo = repos[i];
	var el = document.createElement('div');
	el.className = 'f6 text-gray mt-2';
	var elspan = document.createElement('span');
	elspan.setAttribute('class', 'mr-3');
	elspan.textContent = "test";
	el.appendChild(elspan)
	repo.appendChild(el);
	console.log(repo);
}