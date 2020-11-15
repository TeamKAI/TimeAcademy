import React from 'react';
import Children from 'react-children-utilities';

class Template extends React.Component {
	render() {
		const { children, data, onClick } = this.props;
		if(!data) {
			return (
				<div>
					{children}
				</div>
			);
		}
		
		return (
			<div>
			{Children.deepMap(children, (child, idx) => {
				if (child && child.props && child.props["id"] && data[child.props["id"]]) {
					const value = data[child.props["id"]];
					return (
						<child.type key={idx} onClick={onClick} {...child.props} {...this.props}>
							{value}
						</child.type>
					)
				}
				return child;
			})}
			</div>
		);
	}
}

export default Template;