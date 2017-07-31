import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

const Header = props => (
  <div id="header">
    <Container id="header_content">
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <h2 className="ui header">
              {props.title}
              <div className="sub header">{props.subtitle}</div>
            </h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
);

export default Header;
