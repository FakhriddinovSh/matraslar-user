const menuWrapper = document.querySelector('.site-header__menu-wrapper');
const openButton = document.querySelector('.site-header__menu');
const closeButton = document.querySelector('.site-header__close');
const elBody = document.querySelector('body');
const increment = document.querySelector('.increment');
const decrement = document.querySelector('.decrement');
const orderInput = document.querySelector('.order-modal__count');
const imageAbout = document.querySelector('.about__image-to');
const videoAbout = document.querySelector('.about__video');
const stopVideo = document.querySelector('.stop-video');
const elList = document.querySelector('.production__list');
const elTechnologiesTemplate = document.querySelector(
	'.production__template',
).content;

// Technologies video render
function renderTechnology(list) {
	fetch('http://localhost:1212/api/technology')
		.then((res) => res.json())
		.then((data) => {
			data.map((item) => {
				const clonedTemplate = elTechnologiesTemplate.cloneNode(true);
				const technologyTitle = clonedTemplate.querySelector(
					'.production__subtitle',
				);
				const technologyImage =
					clonedTemplate.querySelector('.technology-image');
				const technologyVideo =
					clonedTemplate.querySelector('.technology-video');
				const technologyDescription = clonedTemplate.querySelector(
					'.production__description',
				);
				const technologyButton =
					clonedTemplate.querySelector('.technology-close');

				technologyTitle.textContent = item.name;
				technologyImage.src = `http://i3.ytimg.com/vi/${item.thumbnail}/hqdefault.jpg`;
				technologyVideo.src = `https://www.youtube.com/embed/${item.link}`;
				technologyDescription.textContent = item.description;

				technologyImage.addEventListener('click', () => {
					technologyImage.style.display = 'none';
					technologyButton.style.display = 'block';
					technologyVideo.style.display = 'block';
				});

				technologyButton.addEventListener('click', () => {
					technologyImage.style.display = 'block';
					technologyButton.style.display = 'none';
					technologyVideo.style.display = 'none';
				});
				list.appendChild(clonedTemplate);
			});
		})
		.catch((err) => console.log(err));
}

renderTechnology(elList);

openButton.addEventListener('click', () => {
	menuWrapper.classList.add('show');
	elBody.classList.add('scroll');
});

closeButton.addEventListener('click', () => {
	menuWrapper.classList.add('close');
	menuWrapper.classList.remove('show');
	elBody.classList.remove('scroll');
	setInterval(() => {
		menuWrapper.classList.remove('close');
	}, 1000);
});

$('.hero__carousel').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 2000,
	slidesPerGroup: 1,
	dots: true,
});

const swiper = new Swiper('.mySwiper', {});
const swiper2 = new Swiper('#heroSwiper', {});

imageAbout.addEventListener('click', () => {
	imageAbout.style.display = 'none';
	videoAbout.style.display = 'block';
	stopVideo.style.display = 'block';
});

stopVideo.addEventListener('click', () => {
	imageAbout.style.display = 'block';
	videoAbout.style.display = 'none';
	stopVideo.style.display = 'none';
});

// Order Input Value
let count = 1;
increment.addEventListener('click', (evt) => {
	evt.preventDefault();
	count--;
	if (count === 0) {
		count++;
	}
	orderInput.value = count;
});

decrement.addEventListener('click', (evt) => {
	evt.preventDefault();
	count++;
	console.log(count);
	orderInput.value = count;
});

// OrderModal Open
const orderOpenModal = document.querySelector('.site-header__order-desktop');
const orderModal = document.querySelector('.order-modal');
const orderModalClose = document.querySelector('.order-modal__close');

orderOpenModal.addEventListener('click', () => {
	orderModal.classList.add('modal-open');
});

orderModalClose.addEventListener('click', () => {
	orderModal.classList.remove('modal-open');
});

//Categories render
const elCategorysList = document.querySelector('.products__list');
const orderSelect = document.querySelector('.order-modal__select');

function renderCategoryList(elList, elSelect) {
	fetch('http://localhost:1212/api/products')
		.then((res) => res.json())
		.then((data) => {
			data.categories.map((item) => {
				const elItem = document.createElement('li');
				elItem.classList.add('products__item');
				elItem.textContent = item.category;

				elItem.addEventListener('click', () => {
					elItem.classList.toggle('products__item--active');
				});

				const listItems = document.querySelectorAll('.products__item');

				listItems.forEach((li) => {
					li.addEventListener('click', function () {
						listItems.forEach((li) => {
							li.classList.remove('products__item--active');
						});
						this.classList.add('products__item--active');
					});
				});

				elList.appendChild(elItem);
			});
			data.products.map((item) => {
				const option = document.createElement('option');
				option.value = item.name;
				option.textContent = item.name;
				option.classList.add('order-modal__option');
				elSelect.appendChild(option);
			});
		})
		.catch((err) => console.log(err));
}
renderCategoryList(elCategorysList, orderSelect);

// Products render List
const elProductsList = document.querySelector(
	'.products__render__list--unaksiya',
);
const elProductsTemplate = document.querySelector('.products-template').content;
const newFragment = new DocumentFragment();

function renderProductsList(elList) {
	fetch('http://localhost:1212/api/products')
		.then((res) => res.json())
		.then((data) => {
			data.products.map((item) => {
				const img1 = item.product_images
					.replaceAll('[', '')
					.replaceAll(']', '')
					.replaceAll('"', '')
					.split(',')[0];
				const img2 = item.product_images
					.replaceAll('[', '')
					.replaceAll(']', '')
					.replaceAll('"', '')
					.split(',')[1];
				const img3 = item.product_images
					.replaceAll('[', '')
					.replaceAll(']', '')
					.replaceAll('"', '')
					.split(',')[2];

				const cloned = elProductsTemplate.cloneNode(true);
				const badgeNew = cloned.querySelector('.products__new');
				const title = cloned.querySelector('.products__render__title');
				if (item.new_cost !== null) {
					badgeNew.classList.add('products__new--active');
				}

				const image = cloned.querySelector(
					'.product__render__left__image',
				);
				const image2 = cloned.querySelector(
					'.product__render__left__image-2',
				);
				const image3 = cloned.querySelector(
					'.product__render__left__image-3',
				);

				image.src = `http://localhost:1212/products/${img1}`;
				image2.src = `http://localhost:1212/products/${img2}`;
				image3.src = `http://localhost:1212/products/${img3}`;

				const titleDesktop = cloned.querySelector(
					'.products__render__title-desktop',
				);
				const weight = cloned.querySelector('.weight');
				const guaranty = cloned.querySelector('.guaranty');
				const size = cloned.querySelector('.size');
				const capacity = cloned.querySelector('.capacity');
				const description = cloned.querySelector(
					'.products__render__description',
				);
				const cost = cloned.querySelector('.cost');
				const discount = cloned.querySelector('.discount');
				const order = cloned.querySelector('.products__render__order');

				image.dataset.fancybox = item.id;
				image2.dataset.fancybox = item.id;
				image3.dataset.fancybox = item.id;
				title.textContent = item.name;
				titleDesktop.textContent = item.name;
				weight.textContent = item.weight;
				guaranty.textContent = item.warranty;
				size.textContent = item.size;
				capacity.textContent = item.capacity;
				description.textContent = item.body;
				cost.textContent = item.cost;
				discount.textContent = item.new_cost;
				order.addEventListener('click', () => {
					orderModal.classList.add('modal-open');
				});

				elList.appendChild(cloned);
			});
		})
		.catch((err) => console.log(err));
}
renderProductsList(elProductsList);

// Products Aksiya List
const elProductsAksiyaList = document.querySelector(
	'.products__render__list--aksiya',
);

function renderProductsAksiyaList(elList) {
	fetch('http://localhost:1212/api/products')
		.then((res) => res.json())
		.then((data) => {
			const filtered = data.products.filter(
				(item) => item.new_cost !== null,
			);

			filtered.map((item) => {
				const img1 = item.product_images
					.replaceAll('[', '')
					.replaceAll(']', '')
					.replaceAll('"', '')
					.split(',')[0];
				const img2 = item.product_images
					.replaceAll('[', '')
					.replaceAll(']', '')
					.replaceAll('"', '')
					.split(',')[1];
				const img3 = item.product_images
					.replaceAll('[', '')
					.replaceAll(']', '')
					.replaceAll('"', '')
					.split(',')[2];

				const cloned = elProductsTemplate.cloneNode(true);
				const badgeNew = cloned.querySelector('.products__new');
				const title = cloned.querySelector('.products__render__title');
				if (item.new_cost !== null) {
					badgeNew.classList.add('products__new--active');
				}

				const image = cloned.querySelector(
					'.product__render__left__image',
				);
				const image2 = cloned.querySelector(
					'.product__render__left__image-2',
				);
				const image3 = cloned.querySelector(
					'.product__render__left__image-3',
				);

				image.src = `http://localhost:1212/products/${img1}`;
				image2.src = `http://localhost:1212/products/${img2}`;
				image3.src = `http://localhost:1212/products/${img3}`;

				const titleDesktop = cloned.querySelector(
					'.products__render__title-desktop',
				);
				const weight = cloned.querySelector('.weight');
				const guaranty = cloned.querySelector('.guaranty');
				const size = cloned.querySelector('.size');
				const capacity = cloned.querySelector('.capacity');
				const description = cloned.querySelector(
					'.products__render__description',
				);
				const cost = cloned.querySelector('.cost');
				const discount = cloned.querySelector('.discount');
				const order = cloned.querySelector('.products__render__order');

				image.dataset.fancybox = item.id;
				image2.dataset.fancybox = item.id;
				image3.dataset.fancybox = item.id;
				title.textContent = item.name;
				titleDesktop.textContent = item.name;
				weight.textContent = item.weight;
				guaranty.textContent = item.warranty;
				size.textContent = item.size;
				capacity.textContent = item.capacity;
				description.textContent = item.body;
				cost.textContent = item.cost;
				discount.textContent = item.new_cost;
				order.addEventListener('click', () => {
					orderModal.classList.add('modal-open');
				});

				elList.appendChild(cloned);
			});
		})
		.catch((err) => console.log(err));
}
renderProductsAksiyaList(elProductsAksiyaList);

// Statistics render func
const elExperience = document.querySelector('.experience');
const elClients = document.querySelector('.clients');
const elGuaranty = document.querySelector('.guaranty');
const elDelivery = document.querySelector('.delivery');

function renderStatistics(experience, clients, guaranty, delivery) {
	fetch('http://localhost:1212/api/statistics')
		.then((res) => res.json())
		.then((data) => {
			experience.textContent = data.experience;
			clients.textContent = data.clients;
			guaranty.textContent = data.warranty;
			delivery.textContent = data.delivery;
		})
		.catch((err) => console.log(err));
}
renderStatistics(elExperience, elClients, elGuaranty, elDelivery);

// Product order func
const elModalForm = document.querySelector('.order-modal__form');
const elModalNameInput = document.querySelector('.order-modal__name');
const elModalNumberInput = document.querySelector('#order-number');
const elModalSelect = document.querySelector('.order-modal__select');

elModalForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const elModalNameInputValue = elModalNameInput.value;
	const elModalNumberInputValue = elModalNumberInput.value;
	const elModalSelectValue = elModalSelect.value;
	const elModalCountValue = orderInput.value;

	const data = {
		name: elModalNameInputValue,
		number: elModalNumberInputValue,
		productName: elModalSelectValue,
		count: String(elModalCountValue),
	};

	fetch('http://localhost:1212/api/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			alert('Order submitted');
		})
		.catch((error) => {
			console.error('Error:', error);
		});
});

// Contact function
const elContactForm = document.querySelector('.contact__form');
const elContactInput = document.querySelector('.contact__input');

elContactForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const elContactInputValue = elContactInput.value;
	const data = {
		number: elContactInputValue,
	};

	fetch('http://localhost:1212/api/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.message == 'Your contact successfully added!') {
				elContactInput.value = null;
				alert('contact added');
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
});

// Address Func
const elSwiperList = document.querySelector('#address-swiper');
const elAddressTemplate = document.querySelector('.address-template').content;
const addressFragment = new DocumentFragment();

function addressRender(list) {
	fetch('http://localhost:1212/api/address')
		.then((res) => res.json())
		.then((data) => {
			data.map((item) => {
				const clonedTemplate = elAddressTemplate.cloneNode(true);
				const addressSubtitle =
					clonedTemplate.querySelector('.address__content');
				const addressDescription = clonedTemplate.querySelector(
					'.address__description',
				);
				const addressLink =
					clonedTemplate.querySelector('.address__link');

				addressSubtitle.textContent = item.location;
				addressDescription.textContent = item.destination;
				addressLink.href = `https://goo.gl/maps/${item.geolacation}`;

				addressFragment.appendChild(clonedTemplate);
			});
			list.appendChild(addressFragment);
		})
		.catch((err) => console.log(err));
}

addressRender(elSwiperList);

// Hero carousel render
const elHeroSwiperList = document.querySelector('#hero-swiper-wrapper');
const elHeroTemplate = document.querySelector(
	'.hero-carousel-template',
).content;

function heroCarouselRender(list) {
	fetch('http://localhost:1212/api/carousel')
		.then((res) => res.json())
		.then((data) => {
			data?.map((item) => {
				// <div class="swiper-slide hero-add">
				// 	<div class="hero__carousel-content">
				// 		<div class="hero__carousel-title-wrapper">
				// 			<h1 class="hero__carousel-title">
				// 				Kechalari sokin dam oling
				// 			</h1>
				// 		</div>
				// 		<a class="carousel__categories" href="#">
				// 			Kategoriyalar
				// 		</a>
				// 	</div>
				// </div>;

				const SwiperSlide = document.createElement('div');
				SwiperSlide.classList.add('swiper-slide', 'hero-add');
				const SwiperHeroContent = document.createElement('div');
				SwiperHeroContent.classList.add('hero__carousel-content');
				const SwiperTitleWrapper = document.createElement('div');
				SwiperTitleWrapper.classList.add(
					'hero__carousel-title-wrapper',
				);
				const SwiperTitle = document.createElement('h2');
				SwiperTitle.classList.add('hero__carousel-title');
				const SwiperLink = document.createElement('a');
				SwiperLink.classList.add('carousel__categories');
				SwiperLink.textContent = 'Kategoriyalar';

				SwiperTitleWrapper.appendChild(SwiperTitle);
				SwiperHeroContent.appendChild(SwiperTitleWrapper);
				SwiperSlide.appendChild(SwiperHeroContent);
				SwiperHeroContent.appendChild(SwiperLink);

				SwiperHeroContent.style.backgroundImage = `url("http://localhost:1212/carousel/${item.image}")`;

				SwiperTitle.textContent = item.title;
				list.appendChild(SwiperSlide);
			});
		})
		.catch((err) => console.log(err));
}

heroCarouselRender(elHeroSwiperList);
