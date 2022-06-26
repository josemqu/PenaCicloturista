console.log( "fotos.js loaded" );

const lightbox = document.createElement( 'div' )
let currentImage = ''
let currentImgIndex = -1
lightbox.id = 'lightbox'
document.body.appendChild( lightbox )

const prevPhoto = document.createElement( 'div' )
prevPhoto.id = 'prev-photo'

const nextPhoto = document.createElement( 'div' )
nextPhoto.id = 'next-photo'



function assignImageBehaviour() {
	let images = document.querySelectorAll( '.album.active img' )
	let imagesArr = [ ...images ]

	images.forEach( image => {
		image.addEventListener( 'click', e => {
			lightbox.classList.add( 'active' )
			const img = document.createElement( 'img' )
			img.src = image.src
			currentImage = img.src
			currentImgIndex = imagesArr.findIndex( el => el.src == currentImage )
			while ( lightbox.firstChild ) {
				lightbox.removeChild( lightbox.firstChild )
			}
			lightbox.appendChild( img );
			// lightbox.appendChild( prevPhoto )
			// lightbox.appendChild( nextPhoto )
			document.addEventListener( 'keydown', keyPassImage );
		} )
	} )

	lightbox.addEventListener( 'click', e => {
		console.log( e.target );
		console.log( e.currentTarget );
		if ( e.target !== e.currentTarget ) return
		lightbox.classList.remove( 'active' );
		document.removeEventListener( 'keydown', keyPassImage );
	} )

	function keyPassImage( e ) {
		if ( e.keyCode == 39 ) {
			currentImgIndex += imagesArr.length + 1
		}
		if ( e.keyCode == 37 ) {
			currentImgIndex += imagesArr.length - 1
		}
		currentImgIndex %= imagesArr.length;
		document.querySelector( "#lightbox > img" ).src = imagesArr[ currentImgIndex ].src;
	}
}

const covers = document.querySelectorAll( '.cover' );
const albums = document.querySelectorAll( '.album' );

covers.forEach( ( cover, i ) => {
	cover.addEventListener( 'click', e => {
		covers.forEach( cover => cover.classList.add( 'inactive' ) );
		albums.forEach( album => {
			album.style.display = 'none';
			album.classList.remove( 'active' );
		} )
		covers[ i ].classList.remove( 'inactive' );
		albums[ i ].style.display = 'block';
		albums[ i ].classList.add( 'active' );
		window.scrollTo( {
			top: 0,
			behavior: 'smooth',
		} );
		assignImageBehaviour();
	} )
} );