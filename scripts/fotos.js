console.log( "fotos.js loaded" );

const lightbox = document.createElement( 'div' )
let currentImage = ''
let currentImgIndex = -1
lightbox.id = 'lightbox'
document.body.appendChild( lightbox )


function assignImageBehaviour() {
	let images = document.querySelectorAll( '.album.active img' )
	let imagesArr = [ ...images ]

	images.forEach( image => {
		image.addEventListener( 'click', e => {
			lightbox.classList.add( 'active' )
			const img = document.createElement( 'img' )
			img.src = image.src
			currentImage = img.src
			console.log( currentImage );
			currentImgIndex = imagesArr.findIndex( el => el.src == currentImage )
			while ( lightbox.firstChild ) {
				lightbox.removeChild( lightbox.firstChild )
			}
			lightbox.appendChild( img );
			document.addEventListener( 'keydown', keyPassImage );
		} )
	} )

	lightbox.addEventListener( 'click', e => {
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
		console.log( currentImgIndex %= imagesArr.length );
		document.querySelector( "#lightbox > img" ).src = imagesArr[ currentImgIndex ].src;
	}
}

const covers = document.querySelectorAll( '.cover' );
const albums = document.querySelectorAll( '.album' );

covers.forEach( ( cover, i ) => {
	cover.addEventListener( 'click', e => {
		albums.forEach( album => {
			album.classList.remove( 'active' )
			album.style.display = 'none';
		} )
		console.log( albums[ i ] );
		albums[ i ].classList.add( 'active' )
		albums[ i ].style.display = 'block';
		assignImageBehaviour();
	} )
} );