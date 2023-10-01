const React = require('react')


class Delete extends React.Component {
  render() {
    return (
      <p>You have deleted the {this.props.veggie.name}.</p>
    )
  };
}
module.exports = Delete;