var Page = {
  el: {
    $p: undefined,
		$cl: undefined,
		$clp: undefined,
  },
  pW: 0,
  pH: 0,
	pMaxRad: 0,
  mX: 0,
  mY: 0,
  ang: 0,
	rad: 0,
	lum: 100,
	tmrAuto: undefined,
	tmrMoved: undefined,
	resize: function() {
    Page.pW = Page.el.$p.width();
    Page.pH = Page.el.$p.height();
		Page.pMaxRad = Math.round( Math.max( Page.pW, Page.pH ) / 2 );
  },
  mMove: function( e ) {
		window.clearInterval(Page.tmrAuto)
		window.clearInterval(Page.tmrMoved)
		Page.mX = Math.round( e.clientX - ( Page.pW / 2 ) );
    Page.mY = Math.round( e.clientY - ( Page.pH / 2 ) );
		Page.ang = Math.round( ( ( 180 / Math.PI) * Math.atan2( Page.mY, Page.mX ) ) + 180 );
		Page.rad = Math.round( Math.sqrt( Math.pow( Page.mX, 2) + Math.pow( Page.mY, 2 ) ) );
		Page.lum = Math.min( Math.round( ( (Page.pMaxRad - Page.rad ) / Page.pMaxRad ) * 150 ), 100 );
    Page.update();
		Page.startTmr();
  },
	startTmr: function() {
		Page.tmrMoved = window.setTimeout( function() {
			Page.tmrAuto = window.setInterval( Page.autoChange, 100 );
		}, 5000 );
	},
	update: function() {
    Page.el.$cl.css( 'box-shadow', '0px 0px 40px 10px hsl(' + Page.ang + ',' + ( Page.lum * 0.5 ) + '%,30%)' );
		Page.el.$clp.css( 'color', 'hsl(' + Page.ang + ',' + Page.lum + '%,40%)' );
	},
	autoChange: function() {
		Page.ang = ( Page.ang + 4 ) % 359;
		Page.lum = 100;
		Page.update();
	},
	init: function() {
    Page.el.$p = $( '.page' );
		Page.el.$cl = $( '.centrelogo' );
		Page.el.$clp = $( '.centrelogo > p' );
    $( window ).resize( Page.resize );
		Page.el.$p.click( Page.mMove );
    Page.el.$p.mousemove( Page.mMove );
		Page.resize();
		Page.startTmr();
  },
}
$( document ).ready( function() {
  Page.init();
} );