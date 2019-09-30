/** 
 *   Override of standard browser select with variation between select and input
 *   Author: Sergey Zakharov
 *   Version: 1.0.1
*/

// TODO: correct position of list
// TODO: cherrypicking

export default class FeatherSelect {
    constructor(target, options = {}, callback) {
        this.target = target;
        this.options = options;

        this.options.type = options.type || 'select';
        this.options.placeholder = options.placeholder || 'Choose';
        this.options.className = options.className || 'feather-select';

        this.bar = null;
        this.list = null;
        this.defaultList = [];

        this.createSelect();
        if(callback) callback.call(this);
    };

    static destroySelect(target) {
        let styles= target.target.getAttribute('style').split(';'),
            newStyles = [];

        styles.forEach((item, key) => item.includes('display') ? styles.splice(key, 1) : newStyles.push(item));

        target.target.setAttribute('style', newStyles.join('; '));

        target.bar.parentNode.parentNode.removeChild(target.bar.parentNode);

        target.__proto__ = null;
        target = null;
    }

    createSelect() {
        const select = document.createElement('div');
        select.classList.add(this.options.className);

        this.buildBar(select);
        this.buildList(select);

        this.target.style.display = 'none';
        this.target.parentNode.insertBefore(select, this.target);

        window.addEventListener('click', e => {
            if (e.target !== this.bar) {
                this.bar.parentNode.classList.remove(`${this.options.className}--triggered`);
                this.list.classList.remove(`${this.options.className}-list--opened`);
            }
        })
    };

    buildBar(parent) {
        let current = null;
        switch (this.options.type) {
            case 'select' :
                current = document.createElement('div');
                current.classList.add(`${this.options.className}-placeholder`);
                current.innerText = this.options.placeholder;
                break;
            case 'input' :
                current = document.createElement('input');
                current.classList.add(`${this.options.className}-input`);
                current.placeholder = this.options.placeholder;
                break;
        }

        this.bar = current;

        this.bar.addEventListener('click', e => {
            e.target.parentNode.classList.toggle(`${this.options.className}--triggered`);

            this.list.classList.toggle(`${this.options.className}-list--opened`);
        });

        if(this.options.type == 'input') {
            this.bar.addEventListener('input', e => {
                return this.rewriteList(this.searchValues(e.target.value));
            });
        }

        return parent.appendChild(current);
    };

    buildList(parent) {
        const list = document.createElement('ul');
        list.classList.add(`${this.options.className}-list`);

        this.list = list;

        [].forEach.call(this.target.children, (item, key) => {
            let li = document.createElement('li'),
                _item = {};

            li.classList.add(`${this.options.className}-list-item`);
            li.innerHTML = item.innerHTML;
            li.setAttribute('data-select-key', item.value);

            _item.html = item.innerHTML;
            _item.id = item.value;
            _item.classname = this.target.children[key].className || li.className;

            li.addEventListener('click', e => {
                let chosen = document.querySelector(`.${this.options.className}-list-item--chosen`);
                this.target.selectedIndex = key;

                switch(this.options.type) {
                    case 'select':
                        this.bar.innerHTML = e.target.innerHTML;
                        break;
                    case 'input':
                        this.bar.value = e.target.innerHTML;
                        break;
                }

                if(chosen) chosen.classList.remove(`${this.options.className}-list-item--chosen`);

                e.target.classList.add(`${this.options.className}-list-item--chosen`);
            });

            this.defaultList.push(_item);
            return list.appendChild(li);
        });

        return parent.appendChild(list);
    };

    searchValues(str) {
        let strRegex = new RegExp(`${str}`, 'i'),
            result = [];

        if(str.length == 0) result = this.defaultList;
        else {
            this.defaultList.forEach(item => {
                if (item.html.match(strRegex)) {
                    let itemObj = {};
                    itemObj.html = item.html;
                    itemObj.classname = item.classname;
                    itemObj.id = item.id;

                    result.push(itemObj);
                }
            });
        }

        return result;
    };

    rewriteList(newList) {
        this.list.innerHTML = '';

        return newList.forEach(item => {
            let li = document.createElement('li');
            li.className = item.classname;
            li.innerText = item.html;
            li.setAttribute('data-select-key', item.id);

            li.addEventListener('click', e => {
                let chosen = document.querySelector(`.${this.options.className}-list-item--chosen`);
                this.target.selectedIndex = e.target.getAttribute('data-select-key');
                this.bar.value = e.target.innerHTML;

                if(chosen) chosen.classList.remove(`${this.options.className}-list-item--chosen`);

                e.target.classList.add(`${this.options.className}-list-item--chosen`);
            });

            return this.list.appendChild(li);
        });
    };
}

window.FeatherSelect = FeatherSelect;