/* global OO, pd */
( function () {
	var notifField, notifToggle;

	window.pd = window.pd || {};

	pd.installProgressField = OO.ui.infuse(
		document.getElementsByClassName( 'installProgressField' )[ 0 ]
	);

	pd.openWiki = OO.ui.infuse(
		document.getElementsByClassName( 'openWiki' )[ 0 ]
	);

	if ( 'Notification' in window ) {
		notifField = OO.ui.infuse( document.getElementsByClassName( 'enableNotifications' )[ 0 ] );
		// Enable placholder widget so field label isn't greyed out
		notifField.fieldWidget.setDisabled( false );
		notifField.toggle( Notification.permission !== 'denied' );

		notifToggle = new OO.ui.ToggleButtonWidget( {
			icon: 'bellOutline'
		} )
			.on( 'change', function () {
				Notification.requestPermission().then( function ( permission ) {
					notifToggle.setValue( permission === 'granted' );
					if ( permission === 'granted' ) {
						notifField.setLabel( 'You will be notified when this wiki is ready' );
					}
					if ( permission === 'denied' ) {
						notifField.toggle( false );
					}
				} );
			} )
			.setValue( Notification.permission === 'granted' );

		notifField.$field.empty().append( notifToggle.$element );
	}

	pd.notify = function ( message, body ) {
		if ( 'Notification' in window ) {
			// eslint-disable-next-line no-new
			new Notification(
				message,
				{
					icon: './images/favicon-32x32.png',
					body: body
				}
			);
			notifField.toggle( false );
		}
	};

}() );
