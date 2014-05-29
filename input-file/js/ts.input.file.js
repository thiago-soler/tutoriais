var ts = ts || {},
	console = console || { log : function(){} };

// Faz a seleção do elemento
ts.elemId = function( idName ){
	var doc = document,
		elem = {};

	if( typeof idName == 'undefined' ){
		return elem;
	}

	elem = doc.getElementById( idName );

	return elem;
};

// Cria os eventos para os elementos que serão customizados
ts.inputFile = function( fileId, linkId, pathId ){
	function click ( that, event ) {
		prevent( event );
		elemFile.click();
	}

	function change ( that, event ) {
		var path = that.value.split('\\'),
			sizePath = path.length,
			elemPath = this.elemId( pathId );

		if( sizePath > 1 ){
			path = path[ sizePath - 1 ];
		}

		elemPath.innerHTML = path;
	}

	function prevent ( event ) {
		if ( typeof event.preventDefault == 'function' ){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}
	
	var elemFile = this.elemId( fileId ),
		elemLink = this.elemId( linkId ),
		eventApply = (typeof document.addEventListener == 'function') ?  'addEventListener' : 'attachEvent';
	
	elemLink[eventApply]('click', click.bind(this, elemLink), false);
	elemFile[eventApply]('change', change.bind(this, elemFile), false);
};