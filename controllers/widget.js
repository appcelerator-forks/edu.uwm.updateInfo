var args = arguments[0] || {},
	iosURL = '',
	androidURL = '',

	// Default values of the window
	manualOpen = false,
	animateOpen = false,
	animateClose = false,

	// Default values of the shadow
	shadowStart = "#000",
	shadowEnd = "#FFF",
	shadowOpacity = 0.3;


/**
 * @method $.setData
 * Set the data used by the widget. If anything is omitted, the view element is hidden.
 * @param {Object} _data Dictionary of data to apply.
 * @param {Object} _data.version     Version number currently in the store for them to download.
 * @param {Object} _data.description Description of any important features in the latest version.
 * @param {Object} _data.ios         Link to the app store for them to download latest version.
 * @param {Object} _data.android     Link to the play store for them to download latest version.
 */
$.setData = function(_data) {
	$.newVersion.show();
	$.description.show();
	$.updateButton.show();

	// Set the value of the current version label
	$.currentVersion.text = "Installed version: " + Ti.App.version;

	// Make sure we have data to handle, otherwise hide elements
	if(toString.call(_data) === "[object Object]") {
		// Set the value of the new version label
		if(toString.call(_data.version) === "[object String]") {
			$.newVersion.text = "Newest version: " + _data.version;
		} else {
			$.newVersion.hide();
		}

		// Set the value of the description label
		if(toString.call(_data.description) === "[object String]") {
			$.description.text = _data.description;
		} else {
			$.description.hide();
		}

		// Set the value of the urls
		if(OS_IOS && toString.call(_data.ios) === "[object String]") {
			iosURL = _data.ios;
		} else if(OS_ANDROID && toString.call(_data.android) === "[object String]") {
			androidURL = _data.android;
		} else {
			$.updateButton.hide();
		}
	} else {
		$.newVersion.hide();
		$.description.hide();
		$.updateButton.hide();
	}
};

/**
 * @method $.applyProperties
 * Apply properties to view elements.
 * @param {Object}  _properties Dictionary of properties to apply.
 * @param {Boolean} _properties.manualOpen      Whether or not to automatically open window.
 * @param {Boolean} _properties.animateOpen     Whether or not to animate when window opens.
 * @param {Boolean} _properties.animateClose    Whether or not to animate when window closes.
 * @param {Object}  _properties.window          Properties for whole window.
 * @param {Object}  _properties.topContainer    Properties for top section.
 * @param {Object}  _properties.bottomContainer Properties for bottom section.
 * @param {Object}  _properties.shadow          Properties for drop shadow.
 * @param {Object}  _properties.shadow.start    Start color for drop shadow.
 * @param {Object}  _properties.shadow.end      End color for drop shadow.
 * @param {Object}  _properties.labels          Properties for all labels.
 * @param {Object}  _properties.topLabels       Properties for all labels in top section.
 * @param {Object}  _properties.bottomLabels    Properties for all labels in bottom section.
 * @param {Object}  _properties.message         Properties for message label.
 * @param {Object}  _properties.current         Properties for current version label.
 * @param {Object}  _properties.new             Properties for new version label.
 * @param {Object}  _properties.description     Properties for description label.
 * @param {Object}  _properties.button          Properties for update button.
 */
$.applyProperties = function(_properties) {

	// Make sure valid properties were passed in
	if(toString.call(_properties) === "[object Object]") {
		/**
		 * Flags
		 */

		if(_properties.hasOwnProperty("manualOpen")) manualOpen = _properties.manualOpen;
		if(_properties.hasOwnProperty("animateOpen")) animateOpen = _properties.animateOpen;
		if(_properties.hasOwnProperty("animateClose")) animateClose = _properties.animateClose;

		/**
		 * Views
		 */ 

		// Apply properties to the window
		if(_properties.hasOwnProperty("window")) {
			$.updateScreen.applyProperties(_properties.window);

			// Capture the end color of the shadow to be the background color
			if(_properties.window.hasOwnProperty("backgroundColor")) shadowEnd = _properties.window.backgroundColor;
		}

		// Apply properties to the top container
		if(_properties.hasOwnProperty("topContainer")) $.topContainer.applyProperties(_properties.topContainer);

		// Apply properties to the bottom container
		if(_properties.hasOwnProperty("bottomContainer")) {
			$.bottomContainer.applyProperties(_properties.bottomContainer);

			// Capture the end color of the shadow to be the background color
			if(_properties.bottomContainer.hasOwnProperty("backgroundColor")) shadowEnd = _properties.bottomContainer.backgroundColor;
		}

		// Apply properties to the drop shadow
		if(_properties.hasOwnProperty("shadow")) {
			$.shadow.applyProperties(_properties.shadow);

			// Capture the visible opacity of the shadow, force 0 initially
			if(_properties.shadow.hasOwnProperty("opacity")) {
				$.shadow.opacity = 0;
				shadowOpacity = _properties.shadow.opacity;
			}

			// Capture the start color
			if(_properties.shadow.hasOwnProperty("start")) shadowStart = _properties.shadow.start;

			// Capture the end color
			if(_properties.shadow.hasOwnProperty("end")) shadowStart = _properties.shadow.end;
		}
		
		// Set the shadow's gradient using the start and end colors
		$.shadow.backgroundGradient = {
			type: "linear",
			colors: [
				{ color: shadowStart, position: 0.5 },
				{ color: shadowEnd, position: 1 }
			]
		};

		/**
		 * Labels
		 */

		// Apply properties to all labels
		if(_properties.hasOwnProperty("labels")) {
			$.message.applyProperties(_properties.labels);
			$.currentVersion.applyProperties(_properties.labels);
			$.newVersion.applyProperties(_properties.labels);
			$.description.applyProperties(_properties.labels);
		}

		// Apply properties to top labels
		if(_properties.hasOwnProperty("topLabels")) {
			$.message.applyProperties(_properties.topLabels);
			$.currentVersion.applyProperties(_properties.topLabels);
			$.newVersion.applyProperties(_properties.topLabels);
		}

		// Apply properties to bottom labels
		if(_properties.hasOwnProperty("bottomLabels")) $.description.applyProperties(_properties.bottomLabels);

		// Apply properties to the message label
		if(_properties.hasOwnProperty("message")) $.message.applyProperties(_properties.message);

		// Apply properties to the current version label
		if(_properties.hasOwnProperty("current")) $.currentVersion.applyProperties(_properties.current);

		// Apply properties to the new version label
		if(_properties.hasOwnProperty("new")) $.newVersion.applyProperties(_properties.new);

		// Apply properties to the description label
		if(_properties.hasOwnProperty("description")) $.description.applyProperties(_properties.description);

		/**
		 * Buttons
		 */

		// Apply properties to the update button
		if(_properties.hasOwnProperty("button")) $.updateButton.applyProperties(_properties.button);
	}
};

/**
 * @method $.open
 * Opens the widget window
 */
$.open = function() {
	$.updateScreen.open({animated: animateOpen});
};

/**
 * @method $.close
 * Closes the widget window
 */
$.close = function() {
	$.updateScreen.close({animated: animateClose});
};

/**
 * @method init 
 */
var init = function() {
	// Apply properties to view elements
	$.applyProperties(args.properties);

	// Set the data
	$.setData(args.data);

	// Open the widget if the user doesn't want to manually open it
	if(!manualOpen) $.open();
};


/**
 * @event $.updateButton.click
 * 
 * Opens the respective app store to update the app.
 */
$.updateButton.addEventListener("click", function() {

	// Make sure we have data to handle
	if(OS_IOS) {
		Ti.Platform.openURL(iosURL);
	} else if(OS_ANDROID) {
		Ti.Platform.openURL(androidURL);
	}
});

/**
 * @event $.bottomContainer.scroll
 *
 * Handle displaying a shadow based on scroll distance.
 */
$.bottomContainer.addEventListener("scroll", function() {

	// Delay animating until after longest animation finishes
	setTimeout(function() {

		// Check if we have moved enough to need a drop shadow
		if($.bottomContainer.contentOffset.y >= 10) {

			// Animate showing the shadow
			$.shadow.animate(Titanium.UI.createAnimation({
				opacity: shadowOpacity,
				duration: 200
			}));
		} else {

			// Animate hiding the shadow
			$.shadow.animate(Titanium.UI.createAnimation({
				opacity: 0,
				duration: 100
			}));
		}
	}, 200);
});

init();