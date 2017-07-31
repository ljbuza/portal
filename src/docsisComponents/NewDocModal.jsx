import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Modal, Header } from "semantic-ui-react";
import AddTemplateMapPortion from "./AddTemplateMapPortion";
import AddGenericDoc from "./AddGenericDoc";
export default class NewDocModal extends Component {
	renderContent() {
		return (
			<div>
				<Switch location={{ pathname: this.props.docType }}>
					<Route path="template-map">
						<AddTemplateMapPortion
							setDocsisToEdit={this.props.setDocsisToEdit}
						/>
					</Route>
					<Route>
						<AddGenericDoc
							setDocsisToEdit={this.props.setDocsisToEdit}
							docType={this.props.docType}
							types={this.props.docType}
						/>
					</Route>
				</Switch>
			</div>
		);
	}
	render() {
		return (
			<Modal dimmer="blurring" trigger={this.props.trigger} closeIcon="close">
				<Header
					icon="edit"
					content={"Add new " + this.props.docType + " document"}
				/>
				<Modal.Content children={this.renderContent()} />
			</Modal>
		);
	}
}
