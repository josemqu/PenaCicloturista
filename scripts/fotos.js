console.log("fotos.js loaded");

const lightbox = document.createElement("div");
const imgContainer = document.createElement("div");
const prevPhoto = document.createElement("div");
const nextPhoto = document.createElement("div");

imgContainer.classList.add("img-container");

let currentImage = "";
let currentImgIndex = -1;

lightbox.id = "lightbox";
document.body.appendChild(lightbox);
lightbox.appendChild(imgContainer);
imgContainer.appendChild(prevPhoto);
imgContainer.appendChild(nextPhoto);

lightbox.addEventListener("click", (e) => {
	if (e.target !== e.currentTarget) return;
	lightbox.classList.remove("active");
});

prevPhoto.addEventListener("click", prevPhotoClick);
nextPhoto.addEventListener("click", nextPhotoClick);
document.addEventListener("keydown", keyPassImage);

function keyPassImage(e) {
	let { imagesArr } = getImages();
	if (e.keyCode == 39) {
		currentImgIndex += imagesArr.length + 1;
	}
	if (e.keyCode == 37) {
		currentImgIndex += imagesArr.length - 1;
	}
	currentImgIndex %= imagesArr.length;
	console.log(currentImgIndex);
	document.querySelector("#lightbox > div > img").src =
		imagesArr[currentImgIndex].src;
}

function prevPhotoClick() {
	let { imagesArr } = getImages();
	currentImgIndex += imagesArr.length - 1;
	currentImgIndex %= imagesArr.length;
	console.log(currentImgIndex);
	document.querySelector("#lightbox > div > img").src =
		imagesArr[currentImgIndex].src;
}

function nextPhotoClick() {
	let { imagesArr } = getImages();
	currentImgIndex += imagesArr.length + 1;
	currentImgIndex %= imagesArr.length;
	console.log(currentImgIndex);
	document.querySelector("#lightbox > div > img").src =
		imagesArr[currentImgIndex].src;
}

prevPhoto.id = "prev-photo";
prevPhoto.innerHTML = "<p><</p>";

nextPhoto.id = "next-photo";
nextPhoto.innerHTML = "<p>></p>";

function assignImageBehaviour() {
	let { imagesArr, images } = getImages();
	console.log(imagesArr);
	images.forEach((image) => {
		image.addEventListener("click", (e) => {
			lightbox.classList.add("active");
			const img = document.createElement("img");
			img.src = image.src;
			currentImage = img.src;
			currentImgIndex = imagesArr.findIndex((el) => el.src == currentImage);

			while (lightbox.querySelector("img")) {
				lightbox.querySelector("img").remove();
			}

			imgContainer.appendChild(img);
		});
	});
}

const covers = document.querySelectorAll(".cover");
const albums = document.querySelectorAll(".album");

const ALBUM_ANIMATE = "animate__headShake";

covers.forEach((cover, i) => {
	cover.addEventListener("click", (e) => {
		covers.forEach((cover) => {
			cover.classList.add("inactive");
			cover.classList.remove(ALBUM_ANIMATE);
		});
		albums.forEach((album) => {
			album.style.display = "none";
			album.classList.remove("active");
		});
		covers[i].classList.remove("inactive");
		covers[i].classList.toggle(ALBUM_ANIMATE);
		albums[i].style.display = "block";
		albums[i].classList.add("active");
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		assignImageBehaviour();
	});
});
function getImages() {
	let images = document.querySelectorAll(".album.active img");
	let imagesArr = [...images];
	return { imagesArr, images };
}
