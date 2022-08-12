$(function () {
	'use strict';

	let style = document.createElement('style');
	style.innerHTML = `
		.custom-button {
			background: #041E42;
			color: #fff;
			border-radius: 10px;
			border: none;
			box-shadow: none;
			cursor: pointer;
			margin: 0px auto;
			margin-bottom: 10px;
			height: 30px;
			font-size: 18px;
			z-index: 1033;
			outline: none;
			display: block;
			min-width: 250px;
		}
		.custom-button:hover {
			background: #FFCC33;
			color: #000;
			z-index: 1033;
		}
		.sideBar {
			justifyContent: flex-start;
			align-items: center;
			padding: 20px;
			justify-content: center;
			position: fixed;
			width: 324px;
			height: 100%;
			bottom: 0;
			right: 0%;
			z-index: 1032;
			background: #fff;
			overflow-y: scroll;
		}
		.topBar {
			justifyContent: center;
			align-items: center;
			justify-content: center;
			padding: 6px;
			position: fixed;
			width: 354px;
			height: 36px;
			top: 0;
			right: 0;
			z-index: 1033;
			background: #041E42;
		}
		.toggleBoxShow {
			justifyContent: center;
			align-items: center;
			justify-content: center;
			position: fixed;
			width: 25px;
			height: 65px;
			top: 144px;
			right: 0px;
			z-index: 1033;
			background: #041E42;
		}
		.toggleBoxHide {
			justifyContent: center;
			align-items: center;
			justify-content: center;
			position: fixed;
			width: 25px;
			height: 65px;
			top: 144px;
			right: 0px;
			z-index: 1033;
			background: #041E42;
		}
		.credits {
			justifyContent: flex-start;
			align-items: center;
			padding: 3px;
			justify-content: center;
			position: fixed;
			width: 354px;
			height: 20px;
			bottom: 0;
			right: 0%;
			z-index: 1033;
			background: #041E42;
		}
		.verticaltext {
			writing-mode: vertical-rl;
			text-align: center;
		}
	`

	document.head.appendChild(style);
	document.body.style.width = '80%'

	let rightSide = document.createElement('div');
	rightSide.className = 'sideBar';
	rightSide.id = "chromeExtensionSideBar";
	document.body.appendChild(rightSide);

	let topBar = document.createElement('div');
	topBar.textAlign = 'center';
	topBar.className = 'topBar';
	rightSide.appendChild(topBar)

	let toggleBoxHide = document.createElement('div');
	toggleBoxHide.textAlign = 'center';
	toggleBoxHide.className = 'toggleBoxHide';
	toggleBoxHide.id = "chromeExtensionHideButton";
	document.body.appendChild(toggleBoxHide)

	let hideText = toggleBoxHide.appendChild(document.createElement('span'));
	hideText.innerHTML = 'Hide';
	hideText.style.color = '#FFCC33'
	hideText.style.cursor = 'pointer'
	hideText.style.textAlign = 'center'
	hideText.style.margin = 'auto'
	hideText.style.writingMode = 'vertical-rl'
	hideText.style.fontWeight = 'bold';
	hideText.style.fontSize = "medium";
	hideText.style.marginTop = '14px'
	hideText.onclick = function () {
		hideSideBar()
	}

	let toggleBoxShow = document.createElement('div');
	toggleBoxShow.textAlign = 'center';
	toggleBoxShow.className = 'toggleBoxShow';
	toggleBoxShow.style.display = 'none';
	toggleBoxShow.id = "chromeExtensionShowButton";
	document.body.appendChild(toggleBoxShow)

	let showText = toggleBoxShow.appendChild(document.createElement('span'));
	showText.innerHTML = 'Show';
	showText.style.color = '#FFCC33'
	showText.style.cursor = 'pointer'
	showText.style.textAlign = 'center'
	showText.style.margin = 'auto'
	showText.style.writingMode = 'vertical-rl'
	showText.style.fontWeight = 'bold';
	showText.style.fontSize = "medium";
	showText.style.marginTop = '14px'
	showText.onclick = function () {
		showSideBar()
	}

	let topBarText = document.createElement('span');
	topBarText.width = '400px'
	topBarText.display = 'inline-block'
	topBarText.style.marginTop = '10px';
	topBarText.style.fontWeight = 'bold';
	topBarText.style.fontSize = "x-large";
	topBarText.style.maxLines = '2'

	let githubURL = "https://github.com/zhanhugo/UCSH";
	let githubBold = document.createElement('strong');
	let githubLink = document.createElement('a');
	githubLink.href = githubURL;
	githubLink.target = '_blank';
	githubLink.innerText = 'UC Schedule Helper';
	githubLink.style.color = '#FFCC33'
	githubLink.style.maxLines = '2'
	githubBold.appendChild(githubLink);
	topBarText.appendChild(githubBold);

	topBar.appendChild(topBarText)

	let credits = document.createElement('div');
	credits.className = 'credits';
	rightSide.appendChild(credits)

	let songURL = "https://www.linkedin.com/in/haosong-chen-1b9b41189/";
	let songBold = document.createElement('strong');
	let songLink = document.createElement('a');
	songLink.href = songURL;
	songLink.target = '_blank';
	songLink.innerText = 'Haosong Chen';
	songLink.style.color = "#fff"
	songBold.appendChild(songLink);

	let hugoURL = 'https://www.linkedin.com/in/hugo-z-21197a122/';
	let hugoBold = document.createElement('strong');
	let hugoLink = document.createElement('a');
	hugoLink.href = hugoURL;
	hugoLink.target = '_blank';
	hugoLink.innerText = "Kanghong Zhan";
	hugoLink.style.color = "#fff"
	hugoBold.appendChild(hugoLink);

	let creditText = document.createElement('span');
	creditText.style.margin = '4px';
	creditText.style.color = '#fff'
	creditText.style.fontSize = "x-small";
	creditText.appendChild(document.createTextNode('Developed By '));
	creditText.appendChild(songBold);
	creditText.appendChild(document.createTextNode(' with '));
	creditText.appendChild(hugoBold);
	creditText.appendChild(document.createTextNode('.'));
	credits.appendChild(creditText)

	let resultList = document.createElement('span');

	currentProfessors = new Set();
	let searchProfessor = document.createElement("Button");
	rightSide.appendChild(searchProfessor);
	searchProfessor.id = "searchProfessorButton";
	searchProfessor.innerHTML = "Search Professors";
	searchProfessor.className = 'custom-button';
	searchProfessor.style.width = '250px';
	searchProfessor.style.marginTop = '74px';

	searchProfessor.addEventListener("click", function () {
		let newProfessors = searchProfessors(document.documentElement.outerHTML);
		addProfessors(currentProfessors, newProfessors, resultList)
	})

	let clearList = document.createElement("Button");
	clearList.id = "clearListButton";
	clearList.innerHTML = "Clear List";
	clearList.className = 'custom-button'
	clearList.style.width = '250px';
	clearList.addEventListener("click", function () {
		chrome.storage.local.clear() // Remove previous results
		while (resultList.firstChild) {
			resultList.removeChild(resultList.firstChild);
		}
		currentProfessors = new Set();
	})
	rightSide.appendChild(clearList);
	rightSide.appendChild(resultList);
});

let cache = {};

let currentProfessors = []

function addProfessors(currentProfessors, newProfessors, resultList) {
	console.log('currentProfessors:', currentProfessors)
	console.log('newprofessors:', newProfessors)
	for (let i = 0; i < newProfessors.length; i++) {
		if (currentProfessors.has(newProfessors[i])) {
			console.log('Skipping ' + newProfessors[i]);
		} else {
			currentProfessors.add(newProfessors[i]);
			console.log('Adding ' + newProfessors[i]);
			console.log(currentProfessors);
			getProfessorInfo(newProfessors[i], function (data) {

				// Function runs if professor is found
				let url = "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + data.id;

				let bold = document.createElement('strong');
				let a = document.createElement('a');
				a.href = url;
				a.target = '_blank';
				a.innerText = data.name;
				bold.appendChild(a);

				let professor = document.createElement("span");
				professor.appendChild(bold);
				professor.appendChild(document.createTextNode(' (' + data.numberOfRatings + ' Reviews)'));
				let spanText = professor.appendChild(document.createElement('span'));
				spanText.innerHTML = ' (Remove)\n';
				spanText.style.color = 'Red'
				spanText.style.cursor = 'pointer'
				spanText.onclick = function () {
					professor.remove()
					console.log(currentProfessors)
					currentProfessors.delete(newProfessors[i])
					currentProfessors = new Set();
				};
				professor.appendChild(document.createElement('br'));
				if (data.numberOfRatings > 0) {
					professor.appendChild(document.createTextNode('Rating: ' + data.totalRating));
					professor.appendChild(document.createElement('br'));
					professor.appendChild(document.createTextNode('Difficulty Score: ' + data.easyScore));
					professor.appendChild(document.createElement('br'));
					if ((data.reviews).length > 1) {
						professor.appendChild(document.createTextNode('Reviews: ' + data.reviews + '\n'));
						professor.appendChild(document.createElement('br'));
					}
				}
				professor.appendChild(document.createElement('br'));
				// professor.appendChild(document.createElement('br'));
				resultList.appendChild(professor);
			}, function (name) {
				// function runs if professor is not found
				let professor = document.createElement("p");
				let bold = document.createElement('strong');
				bold.innerText = name;
				professor.appendChild(bold);
				professor.appendChild(document.createTextNode(' (Not Found)'));
				let spanText = professor.appendChild(document.createElement('span'));
				spanText.innerHTML = ' (Remove)\n';
				spanText.style.color = 'Red'
				spanText.style.cursor = 'pointer'
				spanText.onclick = function () {
					professor.remove()
					currentProfessors.delete(newProfessors[i])
					currentProfessors = new Set();
				};
				resultList.appendChild(professor);
			});
		}
	}
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

function getProfessorInfo(name, func, errFunc) {
	if (name in cache) {
		func(cache[name]);
	} else {
		const url = 'https://corsanywhere.herokuapp.com/solr-aws-elb-production.ratemyprofessors.com//solr/rmp/select/?solrformat=true&rows=20&wt=json&json.wrf=noCB&callback=noCB&q=' + name + '&qf=teacherfirstname_t%5E2000+teacherlastname_t%5E2000+teacherfullname_t%5E2000+teacherfullname_autosuggest&bf=pow(total_number_of_ratings_i%2C2.1)&sort=score+desc&defType=edismax&siteName=rmp&rows=20&group=off&group.field=content_type_s&group.limit=20&fq=schoolname_t%3A%22University+of+California%5C-Davis%22&fq=schoolid_s%3A1073';
		fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
				// Get JSON from the body string
				const responseJSON = JSON.parse(responseText.substring(5, responseText.length - 1));
				const profData = responseJSON.response.docs[0];

				// No Professor was Found
				if (responseJSON.response.docs.length == 0) {
					errFunc(toTitleCase(name.replace('+', ' ')));
					return;
				}

				// Clean the data and call the success function with it
				const cleanedData = {
					id: profData.id.replace('teacher:', ''),
					name: toTitleCase(name.replace('+', ' ')),
					numberOfRatings: profData.total_number_of_ratings_i,
					clarityScore: profData.averageclarityscore_rf,
					easyScore: profData.averageeasyscore_rf,
					helpfulScore: profData.averageheulfulscore_rf,
					hotScore: profData.averagehotscore_rf,
					totalRating: profData.averageratingscore_rf,
					reviews:
					profData.tag_s_mv != undefined
						? Array.from(profData.tag_s_mv).map((i) => ' ' + i.replace('.', ''))
						: [],
				};
				cache[name] = cleanedData;
				func(cleanedData);
			});
	}
}

function hideSideBar() {
	document.getElementById("chromeExtensionSideBar").style.display = 'none';
	document.getElementById("chromeExtensionHideButton").style.display = 'none';
	document.getElementById("chromeExtensionShowButton").style.display = 'block';
	document.getElementById("chromeExtensionHideButton").style.display = 'none';
	document.body.style.width = '100%'
}

function showSideBar() {
	document.getElementById("chromeExtensionSideBar").style.display = 'block';
	document.getElementById("chromeExtensionHideButton").style.display = 'block';
	document.getElementById("chromeExtensionShowButton").style.display = 'none';
	document.getElementById("chromeExtensionHideButton").style.display = 'block';
	document.body.style.width = '80%'
}

function searchProfessors(string) {
	console.log('searchingForProfessors')
	let professorList = []
	let classes = Array.from((string).split('@ucdavis.edu">')).map(i => i)
	for (let i = 1; i < classes.length; i++) {
		professorList.push(classes[i].split("</a>")[0].split(".")[1])
	}
	let professors = [...new Set(professorList)]
	console.log(professors)
	return professors
}

function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}
