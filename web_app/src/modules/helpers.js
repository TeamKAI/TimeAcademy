import React from 'react';
import _ from "lodash";

export function checkForOnClick(actions) {
    let hasOnClick = false;
    if(actions) {
        actions.forEach((a) => {
            if (a.trigger === "onclick") {
                hasOnClick = true;
            }
        })
    }
    return hasOnClick;
}

// Replace content with variable from store
export function getContent(content, data) {
    if (content instanceof Array && data) {
        let final = '';
        content.map((c, index) => {
            final += getVariableValues(c, data) + ' ';
        })
        return final;
    } else
    if (data && _.isString(content)) {
        return getVariableValues(content,data);
    }
    return content;
}

export function getVariableValues (content, data) {
    let arr = content.split(" ");
    let final = '';
    arr.map((item, index) => {
        if (item.indexOf('{{') > -1) {
            let varName = item.substring(
                item.lastIndexOf("{") + 1,
                item.lastIndexOf("}") - 1
            );
            if (varName.indexOf('.') > -1) {
                let dataPoint = varName.split(".");
                let value = getNestedVariable(data, dataPoint);
                let replaceStr = "{{" + varName + "}}"
                if (value) {
                    final += item.replace(replaceStr, value);
                } else {
                    final += " ";
                }
            } else {
                let replaceStr = "{{" + varName + "}}"
                try {
                    final += item.replace(replaceStr, data[varName]);
                } catch (e) {
                    final += item;
                }
            }
        } else {
            final += item;
        }
        if (index < arr.length) {
            final += ' ';
        }
    })
    return final
}

export function onClickTrigger(actions, dispatch) {
    if (actions) {
        actions.forEach((a) => {
            if (a.trigger === "onclick") {
                let action_name = a.action.replace(/\s/g, "_").toUpperCase()
                dispatch({type: action_name })
            }
        })
    }
}

export function onLoadTrigger(actions, dispatch) {
    if (actions) {
        actions.forEach((a) => {
            if (a.trigger === "onload") {
                let action_name = a.action.replace(/\s/g, "_").toUpperCase()
                dispatch({ type: action_name })
            }
        })
    }
}

export function getNestedVariable(data, dataPointArray) {
    return dataPointArray.reduce((data, level) => data && data[level], data)
}

export function render(props) {
    const { style, className } = props;

    if (typeof props.children === "function") {
        return <div style={style} className={className}>{props.children()}</div>;
    }

    return <div style={style} className={className}>{props.children || null}</div>;
}

export function getTypeName(component) {
    // DOM element.
    if(React.isValidElement(component) && typeof component.type === 'string') {
        return component.type;
    }

    // React component (possibly wrapped in test mode).
    let typeName = component.type.name === "ComponentWrapper" ? component.props.type : component.type.displayName;
    if(typeName.startsWith("Connect(") && component.type.WrappedComponent) {
        typeName = component.type.WrappedComponent.displayName;
    }

    // Remove redux wrapper.
    return typeName;
}

export function getTypeProps(component) {
    return component.type.name === "ComponentWrapper" ? component.props.wrappedProps : component.props;
}