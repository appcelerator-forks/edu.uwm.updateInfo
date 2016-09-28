Update Information Widget
-------------------------
Customizable window for displaying app update information and providing link to visit store.

Options
-------

Parameter      | Type          |
:-------------:|:-------------:|
`data`         | ***Object***  |
`properties`   | ***Object***  |

####Data

Parameter     | Type         | Default | Description                                                  |
:------------:|:------------:|:-------:|:-------------------------------------------------------------|
`version`     | ***String*** | ''      | Version number currently in the store for them to download.  |
`ios`         | ***String*** | ''      | Link to the app store for them to download latest version.   |
`android`     | ***String*** | ''      | Link to the play store for them to download latest version.  |
`description` | ***String*** | ''      | Description of any important features in the latest version. |

####Properties

Parameter         | Type             | Default | Description                                                       |
:----------------:|:----------------:|:-------:|:------------------------------------------------------------------|
`manualOpen`      | ***Boolean***    | false   | Whether or not to automatically open window.                      |
`animateOpen`     | ***Boolean***    | false   | Whether or not to animate when window opens.                      |
`animateClose`    | ***Boolean***    | false   | Whether or not to animate when window closes.                     |
`window`          | ***Window***     |         | Window properties for the window.                                 |
`topContainer`    | ***View***       |         | View properties for the top section.                              |
`bottomContainer` | ***ScrollView*** |         | ScrollView properties for the bottom section.                     |
`shadow`          | ***View***       |         | View properties for drop shadow over the bottom section.          |
`shadow.start`    | ***String***     | '#000'  | Starting color of the gradient.                                   |
`shadow.end`      | ***String***     | '#FFF'  | Ending color of the gradient (should match the background color). |
`labels`          | ***Label***      |         | Label properties for all labels.                                  |
`topLabels`       | ***Label***      |         | Label properties for only labels in the top section.              |
`bottomLabels`    | ***Label***      |         | Label properties for only labels in the bottom section.           |
`message`         | ***Label***      |         | Label properties for just the message label.                      |
`current`         | ***Label***      |         | Label properties for just the current version label.              |
`new`             | ***Label***      |         | Label properties for just the new version label.                  |
`description`     | ***Label***      |         | Label properties for just the description label.                  |
`button`          | ***Button***     |         | Button properties for the update button.                          |

Functions
---------

Name              | Description                                            |
:----------------:|:-------------------------------------------------------|
`setData`         | Allows for setting the data properties post creation.  |
`applyProperties` | Allows for setting the style properties post creation. |
`open`            | Allows for controlling when the widget opens.          |
`close`           | Allows for controlling when the widget closes.         |


Examples
--------
Below are some examples of how this widget can be used. 
Usage of the `data` object varies, but it is suggested to populate it using an API endpoint.

###Manually open
If you want to control when the widget opens, you can use the `manualOpen` property and then the `open` function.
```
var updateInfo = Alloy.createWidget("edu.uwm.updateInfo", {
	data: {
		version: "1.0.1",
		ios: "https://itunes.apple.com/us/app/your-app/id000000000",
		android: "https://play.google.com/store/apps/details?id=your.app.id",
		description: "Some very important features were added."
	},
	properties: {
		manualOpen: true
	}
});
updateInfo.open();
```

###Styling on creation
If you want to provide custom styling, you can do so on creation.
```
Alloy.createWidget("edu.uwm.updateInfo", {
	data: {
		version: "1.0.1",
		ios: "https://itunes.apple.com/us/app/your-app/id000000000",
		android: "https://play.google.com/store/apps/details?id=your.app.id",
		description: "Some very important features were added."
	},
	properties: {
		window: {
			backgroundColor: "#FFF"
		},
		topContainer: {
			backgroundColor: "#3F51B5"
		},
		labels: {
			color: "#000"
		},
		topLabels: {
			color: "#FFF"
		},
		button: {
			backgroundColor: "#FF4081",
			color: "#FFF"
		}
	}
});
```

###Styling after creation
If you need more control over the styling after creation, you can do so using the `applyProperties` function.
```
var updateInfo = Alloy.createWidget("edu.uwm.updateInfo", {
	data: {
		version: "1.0.1",
		ios: "https://itunes.apple.com/us/app/your-app/id000000000",
		android: "https://play.google.com/store/apps/details?id=your.app.id",
		description: "Some very important features were added."
	}
});
updateInfo.applyProperties({
		window: {
			backgroundColor: "#FFF"
		},
		topContainer: {
			backgroundColor: "#3F51B5"
		},
		labels: {
			color: "#000"
		},
		topLabels: {
			color: "#FFF"
		},
		button: {
			backgroundColor: "#FF4081",
			color: "#FFF"
		}
	});
```

###Setting the data after creation
If you need more control over the content after creation, you can do so using the `setData` function.
```
var updateInfo = Alloy.createWidget("edu.uwm.updateInfo");
updateInfo.setData({
		version: "1.0.1",
		ios: "https://itunes.apple.com/us/app/your-app/id000000000",
		android: "https://play.google.com/store/apps/details?id=your.app.id",
		description: "Some very important features were added."
	});
```

###Images
![Default](https://github.com/uwm-appbrewery/edu.uwm.updateInfo/blob/master/docs/default.png)
![Styled](https://github.com/uwm-appbrewery/edu.uwm.updateInfo/blob/master/docs/styled.png)

Changelog
---------

* 1.1
	* Initial commit

License
-------

Copyright 2016 Board of Regents for University of Wisconsin System

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.