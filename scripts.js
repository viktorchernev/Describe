//add elements
function addFooter(json) {

	//https://www.w3schools.com/howto/howto_css_fixed_footer.asp
	var html = "<div style='left: 0; bottom: 0; width: 100%;'>"
	html += "<div style='font-style: italic; margin: 7px; padding: 10px;'>"
	html += json.timestamp;
	html += "<br />";
	html += json.version;
	html += "<hr /></div>";
	html += "</div>";

	document.getElementById("TopContainer").innerHTML = html;
}
function addSmallTrees(json) {

	if(json.items.length != 1) {
		console.log('FATAL: Unknown template!');
		return;
	}
	if(json.items[0].text != 'ROOT') {
		console.log('FATAL: Unknown template!');
		return;
	}
	
	var root = json.items[0];
	var html = translateBaseProductionOrItem(root);
	document.getElementById("SmallContainer").innerHTML += html;
}

//translations
function translateBaseProductionOrItem(item) {

	if (item.name == "branch") {
		return "<ul class='listree'>" + translateProduction(item) + "</ul>";
	}
	else if (item.name == "leaf") {
		return "<ul class='listree'>" + translateItem(item) + "</ul>";
	}
	else {
		console.log('FATAL: Unknown item.name! What is "' + item.name + '"?');
		return;
	}
}
function translateProductionOrItem(item, parentItem = null) {

	if (item.name == "branch") return translateProduction(item, parentItem);
	else if (item.name == "leaf") return translateItem(item, parentItem);
	else
	{
		console.log('FATAL: Unknown item.name! What is "' + item.name + '"?');
		return;
	}
}
function translateProduction(item, parentItem = null) {

	namespaces[item.id] = item;
	if(parentItem != null) item.parentItem = parentItem;

	//translate items
	var items = "";
	for (var i = 0; i < item.items.length; i++) {
		items += translateProductionOrItem(item.items[i], item);
	}
	
	//translate links
	var links = " ";
	for (var i = 0; i < item.links.length; i++) {
	
		links += "<a target='_blank' style='text-decoration: none' href='" +
		item.links[i].url +
		"'>" +
		item.links[i].text +
		"</a>";
	}
	
	if (item.color != undefined) {
	
		return "<li><div style='color: " +
		item.color +
		";'  class='listree-submenu-heading' id='" + item.id + "'>" +
		item.text +
		links +
		"</div><ul class='listree-submenu-items'><br />" +
		items +
		"<br /></ul></li>";
	}
	else {
	
		return "<li><div class='listree-submenu-heading' id='" + item.id + "'>" +
		item.text +
		links +
		"</div><ul class='listree-submenu-items'><br />" +
		items +
		"<br /></ul></li>";
	}
}
function translateItem(item, parentItem = null) {

	namespaces[item.id] = item;
	if(parentItem != null) item.parentItem = parentItem;

	if(item.type == "empty") {
	
		return "<li>&nbsp;</li>";
	}
	else {
	
		//do links
		var links = "";
		for (var i = 0; i < item.links.length; i++) {
		
			links += "<a target='_blank' style='text-decoration: none' href='" +
			item.links[i].url +
			"'>" +
			item.links[i].text +
			"</a>";
		}
		
		if (item.type == "comment") {
		
			return "<li style='color: green; font-style: italic;'>" +
			item.text + " " +
			links +
			"</li>";
		}
		else if (item.color != undefined) {
		
			return "<li style='color: " +
			item.color +
			";'>" +
			item.text + " " +
			links +
			"</li>";
		}
		else { //item.type == "item"
	
			return "<li>" +
			item.text + " " +
			links +
			"</li>";
		}
	}
}

//translations
function translateBaseProductionShallow(item) {

	if (item.name == "branch") {
		return "<ul class='mainlistree'>" + translateProductionShallow(item) + "</ul>";
	}
	else if (item.name == "leaf") {
		console.log('FATAL: "' + item.name + '" is not branch');
		return;
	}
	else {
		console.log('FATAL: Unknown item.name! What is "' + item.name + '"?');
		return;
	}
}
function translateProductionShallow(item) {

	namespaces[item.id] = item;

	//translate items
	var items = "";
	for (var i = 0; i < item.items.length; i++) {
		items += translateItemShallow(item.items[i]);
	}
	
	//translate links
	var links = " ";
	for (var i = 0; i < item.links.length; i++) {
	
		links += "<a target='_blank' style='text-decoration: none' href='" +
		item.links[i].url +
		"'>" +
		item.links[i].text +
		"</a>";
	}
	
	if (item.color != undefined) {
	
		return "<li><div style='color: " +
		item.color +
		";'  class='mainlistree-submenu-heading' id='" + item.id + "'>" +
		item.text +
		links +
		"</div><ul class='mainlistree-submenu-items'><br />" +
		items +
		"<br /></ul></li>";
	}
	else {
	
		return "<li><div class='mainlistree-submenu-heading' id='" + item.id + "'>" +
		item.text +
		links +
		"</div><ul class='mainlistree-submenu-items'><br />" +
		items +
		"<br /></ul></li>";
	}
}
function translateItemShallow(item) {

	if (item.name == "branch") {
	
		//translate links
		var links = " ";
		for (var i = 0; i < item.links.length; i++) {
		
			links += "<a target='_blank' style='text-decoration: none' href='" +
			item.links[i].url +
			"'>" +
			item.links[i].text +
			"</a>";
		}
		
		if (item.color != undefined) {
		
			return "<li style='color: " +
			item.color +
			";'>" +
			"<a class=\"breadcrumb\" href=\"javascript:addLargeTree(\'" + item.id + "\');\">" + 
			item.text + " " +
			"</a>" +
			links +
			"</li>";
		}
		else {
	
			return "<li>" +
			"<a class=\"breadcrumb\" href=\"javascript:addLargeTree(\'" + item.id + "\');\">" +
			item.text + " " +
			"</a>" +
			links +
			"</li>";
		}
	}
	else if (item.name == "leaf") return translateItem(item);
	else
	{
		console.log('FATAL: Unknown item.name! What is "' + item.name + '"?');
		return;
	}
}

//listree
function listreeMake() {

	const e = document.getElementsByClassName("listree-submenu-heading");
	const elementsArray = Array.from(e);
	elementsArray.forEach(listreeAdd);
}
function listreeAdd(element) {

	element.classList.add("collapsed");
	
	var index = Math.floor(element.innerText.length / 2);
	var fist = element.innerText.slice(0, index);

	element.innerHTML = "<span style='cursor:default;' class='plusminus'>+ </span>" + 
	"<span style='cursor:default;' class='fist'>" + fist + "</span>" +
	element.innerHTML.slice(index);
	
	element.innerHTML;
	element.nextElementSibling.style.display = "none";
	
	element.addEventListener("click", listreeClick);
	var pm = element.firstElementChild;
	pm.addEventListener("click", plusminusClick);
	var fi = element.getElementsByClassName('fist')[0];
	fi.addEventListener("click", plusminusClick);
}
function listreeClick(event) {

	// const nextSibling = event.target.nextElementSibling;

	// if(nextSibling.style.display == "none") {

		// event.target.classList.remove("collapsed");
		// event.target.classList.add("expanded");
		// event.target.firstElementChild.innerHTML = "- ";
		// nextSibling.style.display = "block";
	// }
	// else {
	
		// event.target.classList.remove("expanded");
		// event.target.classList.add("collapsed");
		// event.target.firstElementChild.innerHTML = "+ ";
		// nextSibling.style.display = "none";
	// }
	
	addLargeTree(event.target.id);
	event.stopPropagation();
}
function plusminusClick(event) {

	var target = event.target.parentElement;
	const nextSibling = target.nextElementSibling;

	if(nextSibling.style.display == "none") {

		target.classList.remove("collapsed");
		target.classList.add("expanded");
		target.firstElementChild.innerHTML = "- ";
		nextSibling.style.display = "block";
	}
	else {
	
		target.classList.remove("expanded");
		target.classList.add("collapsed");
		target.firstElementChild.innerHTML = "+ ";
		nextSibling.style.display = "none";
	}
	
	//addLargeTree(target.id);
	event.stopPropagation();
}
function addLargeTree(id) {

	//https://www.htmlsymbols.xyz/dingbats-symbols
	var cur = namespaces[id];
	var breadCrumb = cur.text;
	while (cur.parentItem != undefined) {
		
		cur = cur.parentItem;
		breadCrumb = "<a class=\"breadcrumb\" href=\"javascript:addLargeTree(\'" + cur.id + "\');\">" + cur.text + "</a>" + " • " + breadCrumb;
	}
	
	var html = "<h2 style='margin-top: -10px;'>" + breadCrumb + " <span style='text-decoration: none; vertical-align: super; position: relative; top: 0.2em; font-size: 70%; color: blue;'>[<a style='font-style: italic;' href='javascript:void(0);'>edit</a>]</span></h2>";
	document.getElementById("LargeContainer").innerHTML = html;
	var obj = namespaces[id];
	var prodHtml = translateBaseProductionShallow(obj);
	document.getElementById("LargeContainer").innerHTML += prodHtml;
}

//main
async function loadJson() {

	console.log("Proto World parsing sequence started");
	var response = await fetch('./data.json');
	json = await response.json();
	console.log("Json fetched:");
	console.log(json);

	addFooter(json);
	addSmallTrees(json);
	listreeMake();
	addLargeTree(json.items[0].id);
	
	// click to expand first element
	var el = document.getElementById(json.items[0].id);
	if (el != undefined && el != null) el.click();
	var expander = el.firstChild;
	if (expander != undefined && expander != null) expander.click();
}


//action
var json;
var namespaces = {};
loadJson();