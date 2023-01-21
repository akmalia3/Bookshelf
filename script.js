let books = [];
const MAKE_EVNT = 'render-books';
const KEY = 'BOOKSHELFLIST';
const SAVE = 'saved-books';

function klik(){
	document.querySelector(".input_section").style.display = "flex";
}

const submit = document.getElementById("bookSubmit");
submit.addEventListener("click", function(){
		window.alert("Buku berhasil ditambahkan");
	});

function addBook() {
	const x = document.querySelector("#incompleteBookshelfList");
	const y = document.querySelector("#completeBookshelfList");

	const bookTitle = document.getElementById('inputBookTitle').value;
	const bookAuthor = document.getElementById('inputBookAuthor').value;
	const bookYear = Number(document.querySelector('#inputBookYear').value);
	const isCompl = document.querySelector('#inputBookIsComplete').checked;
	
	const generateID = generateId();

	const bookObject = definisiBook(generateID, bookTitle, bookAuthor, bookYear, isCompl);
	const bk = B(bookObject);
	console.log(books);
	books.push(bookObject);

	if(isCompl==false){
		x.append(bk);
	}else{
		y.append(bk);
	}
	save();

}

document.addEventListener('DOMContentLoaded', function(){
const submit = document.getElementById('inputBook');
submit.addEventListener('submit', function(event) {
	event.preventDefault();
	addBook();
	});
	if(isStorageExist()){
		loadDataStorage();
	}
});

function generateId(){
	return +new Date();
}

	function definisiBook(id, title, author, year, isCompl) {
		return{
		id, 
		title,
		author, 
		year,
		isCompl, 
	}
}

document.addEventListener(MAKE_EVNT, function(){
	const uncompBook = document.getElementById("incompleteBookshelfList");
	uncompBook.innerHTML = "";

	const compBook = document.getElementById("completeBookshelfList");
	compBook.innerHTML = '';

	for(const bookItem of books){
		const bookElement = B(bookItem);
		if(!bookItem.isCompl)
			uncompBook.append(bookElement);
		else
			compBook.append(bookElement);
	}
});

function B(bookObject){
	const t = document.createElement("h3");
	t.innerText = bookObject.title;

	const a = document.createElement("p");
	a.innerText = "Penulis: "+bookObject.author;

	const y = document.createElement("p");
	y.innerText = "Tahun: "+bookObject.year;

	const del = document.createElement("button");
	del.classList.add("red");
	del.innerText="Hapus";
	del.addEventListener("click", function(event){
		de(bookObject.id);		
	});

	const act = document.createElement("div");
	act.classList.add("action");
	act.append(del);

	const container = document.createElement("article");
	container.classList.add("book_item");
	container.setAttribute("id","book-${bookObject.id}");
	container.append(t, a, y, act);

	if(bookObject.isCompl){
		const i = document.createElement("button");
		i.classList.add("green");
		i.innerText = "Belum selesai dibaca";
		i.addEventListener("click", function(event){
		ad(bookObject.id);
	});
	act.append(i, del);

	}else{
		const j = document.createElement("button");
		j.classList.add("green");
		j.innerText = "Sudah selesi dibaca";
		j.addEventListener("click", function(event){
		bc(bookObject.id);
	});
	act.append(j);
	}

	return container;
};

function ad(bookId){
	const bookTarget = findBook(bookId);
	if(bookTarget == null) return;
	bookTarget.isCompl=false;
	document.dispatchEvent(new Event(MAKE_EVNT));
	save();
}

function bc(bookId){
	const bookTarget = findBook(bookId);
	if(bookTarget == null) return;
	bookTarget.isCompl=true;
	document.dispatchEvent(new Event(MAKE_EVNT));
	save();
}

function de(bookId){
	const bookTarget = findBookIndex(bookId);
	if(window.confirm("Anda yakin ingin menghapus buku ini dari rak?")){ 
		if(bookTarget === -1) return;

		books.splice(bookTarget, 1);
		document.dispatchEvent(new Event(MAKE_EVNT));
		save();
}}

function findBookIndex(bookId){
	for (const index in books){
		if(books[index].id === bookId){
			return index;
		}
	}
	return -1;
}

function findBook(bookId){
	for(const bookItem of books){
		if(bookItem.id === bookId){
			return bookItem;
		}
	}
	return null;
}

function save(){
	if(isStorageExist()){
		const add = JSON.stringify(books);
		localStorage.setItem(KEY, add);
		document.dispatchEvent(new Event(SAVE));
	}
}

function isStorageExist() {
	if(typeof (Storage) === undefined){
		alert("Maaf, browser kamu tidak mendukung local storage");
		return false;
	}
	return true;
}

document.addEventListener(SAVE, function(){
	console.log(localStorage.getItem(KEY));
});

function loadDataStorage(){
	const a = localStorage.getItem(KEY);
	let data = JSON.parse(a);

	if (data !== null){
		for(const book of data){
			books.push(book);
		}
	}
	document.dispatchEvent(new Event(MAKE_EVNT));
}
 
const search = document.getElementById("searchSubmit");
search.addEventListener("click", function(){
	const genre = document.getElementById("searchBookTitle").value;
	switch (genre){
		case "romance":
			judul="The Architecture of Love by Ika Natassa, 2016";
			break;
		case "horor":
			judul="Ghost Story by Peter Straub, 1979";
			break;
		case"biografi":
			judul="Becoming by Michelle Obama, 2018";
			break;
		case "ensiklopedia":
			judul="E.Encyclopedia, 2003";
			break;
		case "sejarah":
			judul="Sejarah Dunia Yang Disembunyikan by Jonathan Black, 2007";
			break;
		case "sains":
			judul="Sapines by Yuval Noah Harari, 2011";
			break;
		case "motivasi":
			judul="Automic Habits by James Clear, 2018";
			break;
		case "filsafat":
			judul="Dunia Sophie by Jostein Gaarder, 1991";
			break;
		case "humor":
			judul="Me talk Pretty One Day by David Sedaris, 2000";
			break;
		case "aksi":
			judul="Petualangan Sherlock Holmes by Arthur Conan Doyle, 1892";
			break;
		default:
			judul="genre tidak ditemukan";
	}
	document.getElementById("hasil").innerHTML=judul;
});