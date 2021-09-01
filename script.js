
const loadingMessage = document.getElementById('loadingMessage');
const resultContainer = document.getElementById('booksContainer');

const loadingData = () => {
    // clear error message (if any)
    document.getElementById('errorContainer').classList.add('d-none');

    // get searced text from input field
    const searchedText = document.getElementById('search-input').value;


    // show error if input field is empty
    if (searchedText === '') {
        document.getElementById('errorContainer').classList.remove('d-none');
        document.getElementById('errorImg').setAttribute('src', 'img/error(empty-input).svg');
        document.getElementById('errorMessage').innerText = 'Empty Input.!';
        return;
    }

    if (searchedText.indexOf(' ') !== -1) {
        searchedText = searchedText.split(' ').join('+');
    }

    // remove previous results
    while (resultContainer.lastChild) {
        resultContainer.removeChild(resultContainer.lastChild);
    }

    // show loading animation
    loadingMessage.classList.remove('d-none');

    const fetchURL = `https://openlibrary.org/search.json?q=${searchedText}`
    fetch(fetchURL)
        .then(response => response.json())
        .then(data => displayData(data));
}

const displayData = data => {
    console.log(data)
    // hide loading animation
    loadingMessage.classList.add('d-none');

    // show error if nothing found
    if (data.docs.length === 0) {
        document.getElementById('errorContainer').classList.remove('d-none');
        document.getElementById('errorImg').setAttribute('src', 'img/error(nothing-found).svg');
        document.getElementById('errorMessage').innerText = 'Nothing Found.!';
        return;
    }

    // show fetched data
    data.docs.forEach(book => {
        let bookCover;
        if (book.cover_i) {
            bookCover = `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="h-100">`;
        }
        const div = document.createElement('div');
        div.classList.add('col', 'text-center', 'p-3');
        div.innerHTML = `
            <div style="height:200px;background:#f8f8f8" class="d-flex justify-content-center align-items-center fw-bold fs-4">
                ${bookCover ? bookCover : 'Image Not Found'}
            </div>
            <div class='px-3 py-2'>
                <h4 class='fw-bold'>${book.title}</h4>
                <h4>Author: ${book.author_name ? book.author_name[0] : 'Unknown'}</h4>
                <h6>Published by: ${book.publisher ? book.publisher[0] : ''}</h6>
                <h6>Published Date: ${book.first_publish_year ? book.first_publish_year : ''}</h6>
            </div>`;
        resultContainer.appendChild(div);
    })
}


loadingData();