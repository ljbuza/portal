import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Dropdown, Grid, Button, Divider } from "semantic-ui-react";
import TemplateMapPicker from "./TemplateMapPicker";
import GenericDocPicker from "./GenericDocPicker";
import NewDocModal from "./NewDocModal";
/**

TODO FETCH
**/

export default class DocsisSelector extends Component {
	constructor(props) {
		super(props);

		// FETCH doc-type map from server
		// window.bxeauth.apicall({
		// 	path: "api/docsisadapter/all_documents",
		// 	then: resp => {
		// 		resp.json().then(data => {
		// 			console.log("fetched at all_documents", data, this);
		// 			this.setState({
		// 				docs: data,
		// 				types: Object.keys(data).map(key => ({
		// 					text: key,
		// 					value: key
		// 				}))
		// 			});
		// 		});
		// 	}
		// });
		var doctypeMap = {
			"template-map": ["template-map"],
			template: ["doc1", "doc2"]
		};
		this.state = {
			activeItem: "",
			docs: doctypeMap,
			types: Object.keys(doctypeMap).map(key => ({
				text: key,
				value: key
			}))
		};
		this.showSelector = this.showSelector.bind(this);
	}
	showSelector(evnt, data) {
		this.setState({ activeItem: data.value });
	}
	render() {
		return (
			<Container>
				<Grid>
					<Grid.Row>
						<Grid.Column width={13}>
							<Dropdown
								placeholder="Select Document Type"
								fluid
								tabIndex="0"
								selection
								value={this.state.activeItem}
								options={this.state.types}
								onChange={this.showSelector}
							/>
						</Grid.Column>
						<Grid.Column textAlign="center" width={3}>
							<NewDocModal
								trigger={
									<Button
										circular
										icon="plus"
										disabled={this.state.activeItem === ""}
									/>
								}
								setDocsisToEdit={this.props.setDocsisToEdit}
								docType={this.state.activeItem}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Divider />

				<Switch location={{ pathname: this.state.activeItem }}>
					<Route exact path="template-map">
						<TemplateMapPicker
							setDocsisToEdit={this.props.setDocsisToEdit}
						/>
					</Route>
					<Route path="(.+)">
						<GenericDocPicker
							setDocsisToEdit={this.props.setDocsisToEdit}
							doctype={this.state.activeItem}
							docs={this.state.docs[this.state.activeItem]}
							setdoc={this.props.setdoc}
						/>
					</Route>
					<Route />
				</Switch>
			</Container>
		);
	}
}
