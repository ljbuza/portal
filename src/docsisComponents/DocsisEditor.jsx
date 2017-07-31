import React, { Component } from "react";
import { Segment, Grid, Button } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import TemplateEditor from "./TemplateEditor";
import RefDocEditor from "./RefDocEditor";

export default class DocsisEditor extends Component {
	componentWillMount = () => {
		var devtype = this.props.devtype
			? this.props.devtype
			: this.props.match.params.type;

		var devmake = this.props.devmake
			? this.props.devmake
			: this.props.match.params.make;

		var devmodel = this.props.devmodel
			? this.props.devmodel
			: this.props.match.params.model;

		var docid = this.props.docid
			? this.props.docid
			: this.props.match.params.docid;

		var doctype = this.props.doctype
			? this.props.doctype
			: this.props.match.params.doctype;

		// if there's no doc fetch from the server
		var doc = this.props.doc;
		var description = this.props.description;
		if (!doc) {
			doc = {
				_dev_comment: "should have been fetched. this is placeholder"
			};
		}

		this.setState({
			devtype: devtype,
			devmake: devmake,
			devmodel: devmodel,
			docid: docid,
			doctype: doctype,
			doc: doc,
			description: description
		});
	};
	render() {
		return (
			<Grid>
				<Grid.Column width="12">
					<Segment
						inverted
						style={{ paddingLeft: 0, paddingRight: 0 }}
					>
						<Switch location={{ pathname: this.state.doctype }}>
							<Route exact path="template">
								<TemplateEditor />
							</Route>
							<Route>
								<RefDocEditor
									description={this.state.description}
									doc={this.state.doc}
								/>
							</Route>
						</Switch>
					</Segment>
				</Grid.Column>
				<Grid.Column width="4">
					<Segment inverted>
						<Button fluid content="Validate" />
						<Button fluid disabled content="Submit" />
					</Segment>
					<Segment inverted>History</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}
