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
	
	var elemFile = this.elemId( fileId ),
		elemLink = this.elemId( linkId ),
		elemPath = this.elemId( pathId ),
		path = '',
		sizePath = 0;

	if ( typeof document.addEventListener == 'function' ){
		
		elemLink.addEventListener ( 'click' , function ( event ){
			click( this, event );
		},false);

		elemFile.addEventListener ( 'change' , function ( event ){
			change( this, event );
		},false);

	}else if ( typeof document.attachEvent  == 'function' || typeof document.attachEvent  == 'object' ) {

		elemLink.attachEvent ('onclick', function ( event ) {
			click( this, event );
		});

		elemFile.attachEvent ('onchange', function ( event ) {
			change( elemFile, event );
		});

	}

	function click ( that, event ) {
		prevent( event );
		elemFile.click();
	}

	function change ( that, event ) {
		path = that.value;
		path = path.split('\\');
		sizePath = path.length;

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
};