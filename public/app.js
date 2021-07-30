document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(node.textContent)
});


const $card = document.querySelector('#card')

if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id

            fetch('/card/remove/'+ id, {
                method: "delete"
            }).then(res => res.json())
              .then(card => {
                  if (card.courses.length) {
                    const html =  card.courses.map((c) => {
                        return `
                        <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td><button class="btn btn-danger js-remove" data-id="${c.id}">Delete</button></td>
                        </tr>
                        `
                    }).join()

                    $card.querySelector('tbody').innerHTML = html
                    $card.querySelector('.price').textContent = card.price  
                  }else{
                      $card.innerHTML = '<p>Card bo\'sh</p>'
                  }
              })
        }
    })
}   