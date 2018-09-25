import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPg from './SearchPg'
import MainPg from './MainPg'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })  
  }

  movedShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)

    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
      <Route exact path='/' render={() => (
         <MainPg 
         books={this.state.books}
         movedShelf={this.movedShelf}
       /> 
      )} />
      <Route exact path='/search' render={() => ( 
        <SearchPg 
          movedShelf={this.movedShelf}
          books={this.state.books}
        />
      )} /> 
      </div>
    );
  }
}

export default BooksApp
