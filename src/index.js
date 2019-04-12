import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import AddAuthorForm from './AddAuthorForm'


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

function resetState(turnData, highlight) {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    }
}

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


let state = resetState()

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer)
    state.highlight = isCorrect ? 'correct' : 'wrong'
    render()
}

function App() {
    return <AuthorQuiz {...state}
        onAnswerSelected={onAnswerSelected}
        onContinue={() => {
            state = resetState()
            render();
        }}
    />;
}

const AuthorWrapper = withRouter(({ history }) =>
    <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/')
    }} />
);

function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path='/' component={App} />
                <Route path="/add" component={AuthorWrapper} />
            </React.Fragment>
        </BrowserRouter>, document.getElementById('root'));
}
render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();