const React = require('react');

class New extends React.Component {
  render() {
    return (
        <div>
            <h1>New Veggie page</h1>
            <form action="/veggies" method="POST">
                Name: <input type="text" name="name" /><br/>
                Color: <input type="text" name="color" /><br/>
                Is Ready To Eat: <input type="checkbox" name="readyToEat" /><br/>
                <input type="submit" name="" value="Create Veggie"/>
             </form>
        </div>);
  }
}

module.exports = New;