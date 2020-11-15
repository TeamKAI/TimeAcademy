import React from 'react';

function makeTypeChecker(tabsRole) {
	return (component) => {
		// DOM element.
		if(React.isValidElement(component) && typeof component.type === 'string') {
        	return component.type;
    	} else if (!component.type) {
    		return "";
    	}

		let typeName = component.type.name === "ComponentWrapper" ? component.props.type : component.type.displayName;
		return typeName === tabsRole;
	}
}

export const isTab = makeTypeChecker('Tab');
export const isTabList = makeTypeChecker('TabList');
export const isTabPanel = makeTypeChecker('TabPanel');
