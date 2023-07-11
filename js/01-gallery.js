import { galleryItems } from './gallery-items.js';

const galleryElement = document.querySelector(".gallery");
const instance = basicLightbox.create("", {
  onShow: () => {
    document.addEventListener("keydown", keyboardEsc);
  },
  onClose: () => {
    document.removeEventListener("keydown", keyboardEsc);
  },
});

document.addEventListener("keydown", keyboardEsc);
galleryElement.addEventListener("click", onClickElementGallery);

function createElementGallery(items) {
  return items.map(({ original, preview, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
      </a>
    </li>
  `).join("");
}

const galleryMarkup = createElementGallery(galleryItems);
galleryElement.insertAdjacentHTML("beforeend", galleryMarkup);

function onClickElementGallery(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  openOriginalSize(event.target.dataset.source);
}

function openOriginalSize(source) {
  instance.element().innerHTML = `<img src="${source}" style="width: 60%;" />`;
  instance.show();
}

function keyboardEsc(event) {
  if (event.key === "Escape") {
    instance.close();
  }
}

// console.log(galleryItems);
