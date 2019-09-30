window.onload = function() {
    var select = new FeatherSelect(
        document.getElementById('custom-select'),
        {
            placeholder: 'Here is (not) my true form',
        }
    );

    var customized = new FeatherSelect(
        document.getElementById('customized-select'),
        {
            placeholder: 'I am gorgeous',
            className: 'example-select'
        }
    );

    var input = new FeatherSelect(
        document.getElementById('input-select'),
        {
            type: 'input',
            placeholder: 'Write something ...',
        }
    );

    var callback = new FeatherSelect(
        document.getElementById('callback-select'),
        {
            placeholder: 'See what happens',
        }, function() {
            var result = document.querySelector('.result');

            [].forEach.call(this.list.children, function(item) {
                item.addEventListener('click', function(e) {
                    result.innerText = 'You picked ' + e.target.innerText;
                })
            })
        }
    );

    var toDelete= new FeatherSelect(
        document.getElementById('to-delete-select'),
        {
            placeholder: 'Delete me',
        }
    );

     document.querySelector('.btn--delete').addEventListener('click', function() {
         FeatherSelect.destroySelect(toDelete);
     });
};