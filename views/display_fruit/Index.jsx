const React = require ('react')
class Index extends React.Component{
    render(){
        //map our fruits data to where we want it to go
        const{fruits}= this.props;
        return(
            <div>
                <nav>
                <a href="/fruits/new">Create a New Fruit</a>
                </nav>
                <h1>Fruits Index Page</h1>
                <ul>
                    {fruits.map((fruit,i)=>{
                       return(
                        <li key={i}>
                    The{' '}
                    {/**Make sure it is calling fruit.id */}
                    <a href={`/fruits/${ fruit.id }`}>{fruit.name}</a>
                    {' '}
                    is {fruit.color}<br/>
                    {fruit.readyToEat ? 'It is ready to eat' : 'Nope, it is not good to eat'}
                    <br/>
                  </li>
                       )
                    })}
                </ul>
            </div>
        )
    }
}
module.exports = Index;
