import React from 'react';

// const Foo = props => <h1>{props.match}</h1>;
// export default Foo;

const Foo = ({ match }) => (
  <div><h1>You're Foo'ed</h1><h3>{match.params.section}</h3></div>
);

export default Foo;
