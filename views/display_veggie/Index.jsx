const React = require ('react')
class Index extends React.Component{
    render(){
        //map our veggies data to where we want it to go
        const{veggies}= this.props;
        return(
            <div>
                <nav>
                <a href="/veggies/new">Create a New veggie</a>
                </nav>
                <h1>veggies Index Page</h1>
                <ul>
                    {veggies.map((veggie,i)=>{
                       return(
                        <li key={i}>
                    The{' '}
                    {/**Make sure it is calling veggie.id */}
                    <a href={`/veggies/${ veggie.id }`}>{veggie.name}</a>
                    {' '}
                    is {veggie.color}<br/>
                    {veggie.readyToEat ? 'It is ready to eat' : 'Nope, it is not good to eat'}
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
