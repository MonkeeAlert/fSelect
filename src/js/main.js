window.onload = function() {
    var select = new FSelect(document.getElementById('custom-select'));

    var customized = new FSelect(
        document.getElementById('customized-select'),
        {
            placeholder: 'I am gorgeous',
            className: 'example-select'
        }
    );

    var input = new FSelect(
        document.getElementById('input-select'),
        {
            type: 'input',
            placeholder: 'Write something ...',
        }, function() {
            var result = document.querySelector('.result-1');

            [].forEach.call(this.list.children, function(item) {
                item.addEventListener('click', function(e) {
                    result.innerText = 'You picked ' + e.target.innerText;
                })
            })
        }
    );

    var callback = new FSelect(
        document.getElementById('callback-select'),
        {
            placeholder: 'See what happens',
        }, function() {
            var result = document.querySelector('.result-2');

            [].forEach.call(this.list.children, function(item) {
                item.addEventListener('click', function(e) {
                    result.innerText = 'You picked ' + e.target.innerText;
                })
            })
        }
    );

    var toDelete= new FSelect(
        document.getElementById('to-delete-select'),
        {
            placeholder: 'Delete me',
        }
    );
    
    // var correctPos = new FSelect(
    //     document.getElementById('correct-position'),
    //     {
    //         placeholder: 'Just look at me',
    //     }, function(item) {
    //         console.log(this.list.getBoundingClientRect());
    //         window.addEventListener('scroll', function(e) {
    //             var pos = correctPos.bar.getBoundingClientRect();
    //             console.log('y: ' + pos.y);
    //         })
    //     }
    // );

     document.querySelector('.btn--delete').addEventListener('click', function() {
         FSelect.destroySelect(toDelete);
     });
};