const URL='http://localhost:3000/quotes'
const LIST=document.getElementById('quote-list')
const FORM=document.getElementById('new-quote-form')

FORM.addEventListener('submit', createQuote)

fetch(URL).then(response=>response.json()).then(json=>json.map(renderQuote))
function renderQuote(quote){
     console.log('test')
     let li=document.createElement('li')
     li.classList.add('quote-card')
     let bq=document.createElement('blockquote')
     bq.classList.add('blockquote')
     let p=document.createElement('p')
     p.textContent=quote.quote;
     p.classList.add('mb-0')
     let footer=document.createElement('footer')
     footer.classList.add('blockquote-footer')
     footer.textContent=quote.author
     let br=document.createElement('br')
     bq.append(p, footer, br, likeButton(quote), deleteButton(quote))
     li.append(bq)
     LIST.appendChild(li)
}

function likeButton (quote){
     let button=document.createElement('button')
     let span=document.createElement('span')
     button.classList.add('btn-success')
     button.textContent='Likes: '
     span.textContent=`${quote.likes}`
     button.append(span)
     button.addEventListener('click', (e)=> addLike(e, quote))
     return button;
}

function addLike(e, quote){
     let likes=quote.likes+1
     debugger
     let config={
          method: 'PATCH',
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
               "quote": quote.quote,
               "author": quote.author,
               "likes": likes
          })
     }
     fetch(URL+'/'+quote.id, config)
     e.target.parentElement.querySelector('.btn-success').children[0].textContent=""+likes
}

function deleteButton (quote){
     let button=document.createElement('button')
     button.classList.add('btn-danger')
     button.textContent='Delete'
     button.addEventListener('click', (e)=> deleteQuote(e, quote))
     return button;
}

function deleteQuote(e, quote){
     let config={
          method: 'DELETE',
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
               "quote": quote.quote,
               "author": quote.author
          })
     }
     fetch(URL+'/'+quote.id, config).then(e.target.parentElement.parentElement.remove())
}

function createQuote(){
     event.preventDefault()
     let quote= this.children[0].querySelector('#new-quote').value
     let author= this.children[1].querySelector('#author').value
     let config={
          method: 'POST',
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
               "quote": quote,
               "author": author,
               "likes": 0
          })
     }
     fetch(URL, config).then(response=>response.json()).then(json=>renderQuote(json))

}


// fetch(URL+'/'+book.id, config)
// .then(renderLike())






