import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore'
import { BrowserRouter, Route } from 'react-router-dom'
import AddAuthorForm from './AddAuthorForm'
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux'


const authors = [

    {
        name: "Mark Twain",
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The Adventures of Huckleberry Finn',
            'Life on the Mississippi',
            'Roughing It']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'David Copperfield',
            'A Tale of Two Cities',
            'A Christmas Carol'
        ]
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The Shining', 'IT'
        ]
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'Hamlet', 'Macbeth', 'Romeo and Juliet', "A Midsummer Night's Dream"
        ]
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'Harry Potter and the Chamber of Secrets', 'My Immortal'
        ]
    },
    {
        name: 'Robert Jordan',
        imageUrl: 'images/authors/robertjordan.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The Dragon Reborn', 'A Crown of Swords', 'The Fires of Heaven', 'Lord of Chaos'
        ]
    }


]

function reducer(state = { authors, turnData: getTurnData(authors), highlight: '' }, action) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer)
            return Object.assign({}, state, { highlight: isCorrect ? 'correct' : 'wrong' })

        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors)
            })
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author])
            })
        default:
            return state
    }
}

let store = Redux.createStore(reducer)

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, [])
    const fourRandomBooks = shuffle(allBooks).slice(0, 4)
    const answer = sample(fourRandomBooks)

    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer))
    }
}

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path='/' component={AuthorQuiz} />
                <Route path="/add" component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();