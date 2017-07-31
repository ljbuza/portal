import React, { Component } from "react";
import Header from "../components/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import DocsisSelector from "./DocsisSelector";
import DocsisEditor from "./DocsisEditor";

const EditingHeader = ({ match }) => (
	<Header
		title={"Editing " + match.params.docid}
		subtitle={
			match.params.type && match.params.make && match.params.model
				? match.params.type +
						" > " +
						match.params.make +
						" > " +
						match.params.model
				: "Doc Type: " + match.params.doctype
		}
	/>
);

export default class DocsisMaintenance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doc: undefined,
			devtype: undefined,
			devmake: undefined,
			devmodel: undefined,
			docid: undefined,
			doctype: undefined,
			description: undefined
		};
		this.setDocsisToEdit = this.setDocsisToEdit.bind(this);
	}
	setDocsisToEdit(
		doctype,
		docid,
		devtype,
		devmake,
		devmodel,
		doc,
		description
	) {
		console.log(
			"setting docsis stuff",
			doctype,
			docid,
			devtype,
			devmake,
			devmodel,
			doc,
			description
		);
		this.setState({
			doctype: doctype,
			docid: docid,
			devtype: devtype,
			devmake: devmake,
			devmodel: devmodel,
			doc: doc,
			description: description
		});
	}
	render() {
		return (
			<div>
				<Switch>
					<Route
						path="/docsismaintenance/editing/:docid/:doctype"
						exact
						component={EditingHeader}
					/>
					<Route
						path="/docsismaintenance/editing/:docid/:doctype/:type/:make/:model"
						component={EditingHeader}
						exact
					/>
					<Route>
						<Header
							title="Selection Page"
							subtitle="Choose document to edit or create a new one"
						/>
					</Route>
				</Switch>
				<Container fluid>
					<Switch>
						<Route
							exact
							path="/docsismaintenance/editing/:docid/:doctype"
							render={props => (
								<DocsisEditor
									{...props}
									doc={this.state.doc}
									devtype={this.state.devtype}
									devmake={this.state.devmake}
									devmodel={this.state.devmodel}
									docid={this.state.docid}
									doctype={this.state.doctype}
									description={this.state.description}
									newdoc={this.state.newdoc}
								/>
							)}
						/>
						<Route
							exact
							path="/docsismaintenance/editing/:docid/:doctype/:type/:make/:model"
							render={props => (
								<DocsisEditor
									{...props}
									doc={this.state.doc}
									devtype={this.state.devtype}
									devmake={this.state.devmake}
									devmodel={this.state.devmodel}
									docid={this.state.docid}
									doctype={this.state.doctype}
									description={this.state.description}
									newdoc={this.state.newdoc}
								/>
							)}
						/>
						<Route exact path="/docsismaintenance/">
							<DocsisSelector
								setDocsisToEdit={this.setDocsisToEdit}
							/>
						</Route>
						<Route>
							<Redirect push={true} to="/docsismaintenance" />
						</Route>
					</Switch>
				</Container>
			</div>
		);
	}
}
