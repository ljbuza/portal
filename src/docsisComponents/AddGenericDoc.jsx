import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import {
	Form,
	Button,
	Input,
	TextArea,
	Label,
	Message
} from "semantic-ui-react";

var descMax = 400;
export default class AddGenericDoc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			descr: "",
			docID: "",
			docType: this.props.docType,
			descRemaining: descMax
		};
	}
	handleID = (e, data) => {
		this.setState({
			docID: data.value
		});
		// before going call
		this.props.setDocsisToEdit(
			this.props.docType, // doctype,
			data.value, // docid,
			undefined, // devtype,
			undefined, // devmake,
			undefined, // devmodel,
			undefined, // doc,
			this.state.descr // description
		);
	};
	handleDescription = (e, data) => {
		var v = data.value.substr(0, descMax);
		this.setState({
			descr: v,
			descRemaining: descMax - v.length
		});
		// before going call
		this.props.setDocsisToEdit(
			this.props.docType, // doctype,
			this.state.docID, // docid,
			undefined, // devtype,
			undefined, // devmake,
			undefined, // devmodel,
			undefined, // doc,
			v // description
		);
	};
	handleSubmit = e => {
		e.preventDefault();
		var err = false;
		if (this.state.docID === "") {
			err = true;
		}
		if (this.state.docType === "") {
			err = true;
		}
		if (this.state.descr === "") {
			err = true;
		}
		this.setState({
			error: err
		});
	};
	renderRedirect = () => {
		if (this.state.error || this.state.error === undefined) {
			return <div />;
		}
		var url =
			"/docsismaintenance/editing/" +
			this.state.docID +
			"/" +
			this.props.docType;
		return <Redirect push={true} to={url} />;
	};
	render() {
		return (
			<Form error={this.state.error} onSubmit={this.handleSubmit}>
				<Form.Field>
					<div className="ui labeled input">
						<Label className="button disabled">Document ID</Label>
						<Input placeholder="...." onChange={this.handleID} />
					</div>
				</Form.Field>
				<Form.Field>
					<Button.Group>
						<Button disabled>Document Type</Button>
						<Button disabled content={this.props.docType} />
					</Button.Group>
				</Form.Field>
				<Form.Field>
					<Button fluid disabled attached="top">
						Document Description
					</Button>
					<TextArea
						onChange={this.handleDescription}
						value={this.state.descr}
						autoHeight
						placeholder="....."
					/>
					<Label basic>
						{this.state.descRemaining} chars left
					</Label>
				</Form.Field>
				<Form.Field>
					<Form.Button content="Submit" />
				</Form.Field>
				<Message
					error
					content="Document must be given ID and Description"
				/>
				<Route render={this.renderRedirect} />
			</Form>
		);
	}
}
