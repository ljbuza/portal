import React, { Component } from "react";
import { Accordion, Segment, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class TemplateMapPicker extends Component {
	constructor(props) {
		super(props);
		// TODO fetch the template-map
		this.state = {
			panels: {
				MTA: {
					default: { template: "mta.default" },
					make1: {
						default: { template: "mta.make1.default" },
						model1: { template: "mta.make1.model1" }
					},
					make2: {
						modela: { template: "mta.make2.modela" }
					}
				},
				"Cable Modem": {
					default: { template: "cable modem.default" },
					make3: {
						default: { template: "cable modem.make3.default" }
					}
				}
			}
		};
		this.showPanels = this.showPanels.bind(this);
	}

	showPanels() {
		var children = Object.keys(this.state.panels).map(key => (
			<DevTypeWidget
				setDocsisToEdit={this.props.setDocsisToEdit}
				key={key}
				type={key}
				children={this.state.panels[key]}
				setdoc={this.props.setdoc}
			/>
		));
		return <div> {children} </div>;
	}

	render() {
		return (
			<Segment basic>
				{this.showPanels()}
			</Segment>
		);
	}
}

class DevTypeWidget extends Component {
	constructor(props) {
		super(props);
		this.showChildren = this.showChildren.bind(this);
	}
	showChildren() {
		var children = Object.keys(this.props.children).map(key => (
			<DevMakeWidget
				setDocsisToEdit={this.props.setDocsisToEdit}
				key={key}
				type={this.props.type}
				make={key}
				setdoc={this.props.setdoc}
				children={this.props.children[key]}
			/>
		));
		return <div> {children} </div>;
	}
	render() {
		return (
			<Segment className="DevTypeWidget">
				<Header content={this.props.type} />
				{this.showChildren()}
			</Segment>
		);
	}
}

class DevMakeWidget extends Component {
	// this children passed into here may be either leaves
	constructor(props) {
		super(props);
		this.showChildren = this.showChildren.bind(this);
	}
	showChildren() {
		var children = Object.keys(this.props.children).map(key => (
			<DevModelWidget
				setDocsisToEdit={this.props.setDocsisToEdit}
				key={key}
				type={this.props.type}
				make={this.props.make}
				model={key}
				body={this.props.children[key]}
				setdoc={this.props.setdoc}
			/>
		));
		var x = <div> {children} </div>;
		return x;
	}
	render() {
		if (this.props.make === "default") {
			return (
				<DevModelWidget
					setDocsisToEdit={this.props.setDocsisToEdit}
					type={this.props.type}
					make={this.props.make}
					model={this.props.make}
					body={this.props.children}
					setdoc={this.props.setdoc}
				/>
			);
		}
		return (
			<Accordion styled fluid className="DevMakeWidget">
				<Accordion.Title content={this.props.make} />
				<Accordion.Content children={this.showChildren()} />
			</Accordion>
		);
	}
}

class DevModelWidget extends Component {
	constructor(props) {
		super(props);
		this.setdoc = this.setdoc.bind(this);
	}
	setdoc(evnt, data) {
		this.props.setDocsisToEdit(
			"template-map", // doctype,
			"template-map", // docid,
			this.props.type, // devtype,
			this.props.make, // devmake,
			this.props.model, // devmodel,
			this.props.body, // doc,
			undefined // description
		);
	}
	render() {
		return (
			<Button onClick={this.setdoc}>
				<Link
					to={
						"/docsismaintenance/editing/template-map/template-map/" +
							this.props.type +
							"/" +
							this.props.make +
							"/" +
							this.props.model
					}
				>
					{this.props.model}
				</Link>
			</Button>
		);
	}
}
