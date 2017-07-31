import React, { Component } from "react";
import { Form, Dropdown, Button, Message } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";

export default class AddTemplateMapPortion extends Component {
	constructor(props) {
		super(props);
		// FETCH template map!!
		// window.bxeauth.apicall({
		// 	path: "api/docsisadapter/document/template-map",
		// 	then: resp => {
		// 		resp.json().then(data => {
		// 			console.log("fetched template-map", data);
		// 			let { types, makes, models } = this.parseMap(data);
		// 			this.setState({
		// 				templatemap: data,
		// 				types: types.map(type => ({ text: type, value: type })),
		// 				makes: makes.map(make => ({ text: make, value: make })),
		// 				models: models.map(model => ({
		// 					text: model,
		// 					value: model
		// 				}))
		// 			});
		// 		});
		// 	}
		// });
		var templatemap = {
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
		};
		var { types, makes, models } = this.parseMap(templatemap);

		this.state = {
			templatemap: templatemap,
			types: types.map(type => ({ text: type, value: type })),
			makes: makes.map(make => ({ text: make, value: make })),
			models: models.map(model => ({ text: model, value: model }))
		};
	}
	parseMap(map) {
		var types = [], makes = [], models = [];

		// for each type
		Object.keys(map).map(function(type) {
			types = types.concat(type);
			var mks = Object.keys(map[type]); // list of makes for type
			makes = makes.concat(mks); // save these types as valid options
			// for each make
			mks.map(function(mk) {
				// defaults are special, they have no models
				if (mk !== "default") {
					var mdls = Object.keys(map[type][mk]); // list of models for this make
					models = models.concat(mdls); // save these models as valid options
				}
				return null;
			});
			return null;
		});
		return {
			types: [...new Set(types)],
			makes: [...new Set(makes)],
			models: [...new Set(models)]
		};
	}
	handleMakeAddition = (e, { value }) => {
		console.log("add make", value);
		this.setState({
			makes: [{ text: value, value: value }, ...this.state.makes]
		});
	};
	handleModelAddition = (e, { value }) => {
		this.setState({
			models: [{ text: value, value: value }, ...this.state.models]
		});
	};
	handleTypeChange = (e, { value }) => {
		this.setState({
			activeType: value
		});
	};
	handleMakeChange = (e, { value }) => {
		this.setState({
			activeMake: value
		});
		if (value === "default") {
			this.setState({
				activeModel: "",
				modelDeactive: true
			});
		} else {
			this.setState({
				modelDeactive: false
			});
		}
	};
	handleModelChange = (e, { value }) => {
		this.setState({
			activeModel: value
		});
	};
	onSubmit = e => {
		e.preventDefault();
		var err =
			this.state.activeType === undefined ||
			this.state.activeMake === undefined;
		try {
			var existingdoc = this.state.templatemap[this.state.activeType][
				this.state.activeMake
			][this.state.activeModel];
			err = err || existingdoc !== undefined;
		} catch (error) {
			err = err || false;
		}

		this.setState({
			error: err
		});
		this.props.setDocsisToEdit(
			"template-map", // doctype,
			"template-map", // docid,
			this.state.activeType, // devtype,
			this.state.activeMake, // devmake,
			this.state.activeModel, // devmodel,
			undefined, // doc,
			undefined // description
		);
	};
	renderRedirect = () => {
		if (this.state.error || this.state.error === undefined) {
			return <div />;
		}
		// before going to editin page. call

		var url =
			"/docsismaintenance/editing/template-map/template-map/" +
			this.state.activeType +
			"/" +
			this.state.activeMake +
			"/";
		if (this.state.activeModel) {
			url += this.state.activeModel;
		} else {
			url += "default";
		}
		return <Redirect push={true} to={url} />;
	};
	render() {
		return (
			<Form onSubmit={this.onSubmit} error={this.state.error}>
				<Form.Group inline>
					<Form.Field>
						<Button.Group>
							<Button disabled>Type</Button>
							<Form.Dropdown
								floating
								button
								compact
								selection
								onChange={this.handleTypeChange}
								options={this.state.types}
								value={this.state.activeType}
							/>
						</Button.Group>
					</Form.Field>
					<Form.Field>
						<Button.Group>
							<Button disabled>Make</Button>
							<Form.Dropdown
								floating
								button
								selection
								options={this.state.makes}
								allowAdditions
								value={this.state.activeMake}
								onAddItem={this.handleMakeAddition}
								onChange={this.handleMakeChange}
								search
							/>
						</Button.Group>
					</Form.Field>
					<Form.Field>
						<Button.Group>
							<Button disabled>Model</Button>
							<Dropdown
								floating
								button
								selection
								disabled={this.state.modelDeactive}
								options={this.state.models}
								allowAdditions
								value={this.state.activeModel}
								onAddItem={this.handleModelAddition}
								onChange={this.handleModelChange}
								search
							/>
						</Button.Group>
					</Form.Field>
				</Form.Group>
				<Message
					error
					content={
						"Type and Make are Required Fields, " +
							"and combination may not already exist."
					}
				/>
				<Form.Button content="Submit" />
				<Route render={this.renderRedirect} />

			</Form>
		);
	}
}
