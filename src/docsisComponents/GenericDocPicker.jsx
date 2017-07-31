import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

/**
TODO FETCH
**/

export default class GenericDocPicker extends Component {
	constructor(props) {
		super(props);
		this.setdoc = this.setdoc.bind(this);
	}
	setdoc(evnt, data) {
		// we let the editor fetch the document based on the props passed in
		var docid = evnt.target.getAttribute("value");
		this.props.setDocsisToEdit(
			this.props.doctype, // doctype,
			docid, // docid,
			undefined, // devtype,
			undefined, // devmake,
			undefined, // devmodel,
			undefined, // doc,
			undefined // description
		);
	}
	render() {
		return (
			<Button.Group fluid vertical>
				{this.props.docs.map(docid => (
					<Link
						key={docid}
						to={
							"/docsismaintenance/editing/" +
								docid +
								"/" +
								this.props.doctype
						}
					>
						<Button onClick={this.setdoc} value={docid}>
							{docid}
						</Button>
					</Link>
				))}
			</Button.Group>
		);
	}
}
