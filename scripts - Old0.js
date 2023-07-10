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
	//document.body.innerHTML += html;
	
	//console.log("Footer added");
	//console.log(json.timestamp);
	//console.log(json.version);
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
			item.text + " " +
			links +
			"</li>";
		}
		else {
	
			return "<li>" +
			item.text + " " +
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
	element.nextElementSibling.style.display = "none";
	element.addEventListener("click", listreeClick);
}
function listreeClick(event) {

	const nextSibling = event.target.nextElementSibling;

	if(nextSibling.style.display == "none") {

		event.target.classList.remove("collapsed");
		event.target.classList.add("expanded");
		nextSibling.style.display = "block";
	}
	else {
	
		event.target.classList.remove("expanded");
		event.target.classList.add("collapsed");
		nextSibling.style.display = "none";
	}
	
	addLargeTree(event.target.id);
	event.stopPropagation();
}
function addLargeTree(id) {

	//https://www.htmlsymbols.xyz/dingbats-symbols
	var breadCrumb = "";
	const elid = id.split(".");
	for (var i = 1; i < elid.length; i++) {
	
		var eid = elid.slice(0, i).join(".") + ".rnode";
		
		if (breadCrumb != "") breadCrumb += " • ";
		if (namespaces.hasOwnProperty(eid)) breadCrumb += namespaces[eid].text;
		else breadCrumb += "&lt;" + eid + "&gt;";
	}
	
	if (breadCrumb != "") breadCrumb += " • ";
	if (namespaces.hasOwnProperty(id)) breadCrumb += namespaces[id].text;
	else breadCrumb += "&lt;" + id + "&gt;";
	
	var html = "<h2 style='margin-top: -10px;'>" + breadCrumb + "</h2>";
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
	
	//add listree CSS via function
	addSmallTrees(json);
	listreeMake();
}


//action
var json;
var namespaces = {};
loadJson();