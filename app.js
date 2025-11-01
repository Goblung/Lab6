class Component {
    constructor(props = {}) {
        this.props = props;
    }

    createElement(tag, props = {}) {
        const element = document.createElement(tag);
        
        Object.keys(props).forEach(key => {
            if (key === 'textContent') {
                element.textContent = props[key];
            } else if (key === 'className') {
                element.className = props[key];
            } else if (key === 'style') {
                Object.assign(element.style, props[key]);
            } else if (key === 'children') {
                props[key].forEach(child => {
                    if (child instanceof Node) {
                        element.appendChild(child);
                    }
                });
            } else {
                element[key] = props[key];
            }
        });

        return element;
    }
}

class Card extends Component {
    render() {
        const card = this.createElement('div', {
            className: 'card'
        });

        const title = this.createElement('h3', {
            className: 'card-title',
            textContent: this.props.title || 'Заголовок'
        });

        const content = this.createElement('p', {
            className: 'card-content',
            textContent: this.props.content || 'Содержимое карточки'
        });

        card.appendChild(title);
        card.appendChild(content);

        return card;
    }
}

class App {
    constructor() {
        this.app = document.getElementById('app');
        this.init();
    }

    init() {
        this.renderHeader();
        this.renderMain();
        this.renderFooter();
    }

    renderHeader() {
        const header = this.createElement('header', {
            className: 'header'
        });

        const nav = this.createElement('nav', {
            className: 'nav'
        });

        const logo = this.createElement('h1', {
            className: 'logo',
            textContent: 'JS Верстка 2025'
        });

        const menu = this.createElement('ul', {
            className: 'menu'
        });

        const menuItems = ['Главная', 'О нас', 'Проекты', 'Контакты'];
        menuItems.forEach(item => {
            const li = this.createElement('li', {
                className: 'menu-item'
            });
            const link = this.createElement('a', {
                href: '#',
                textContent: item
            });
            li.appendChild(link);
            menu.appendChild(li);
        });

        nav.appendChild(logo);
        nav.appendChild(menu);
        header.appendChild(nav);
        this.app.appendChild(header);
    }

    renderMain() {
        const main = this.createElement('main', {
            className: 'main'
        });

        const container = this.createElement('div', {
            className: 'container'
        });

        const title = this.createElement('h2', {
            className: 'title',
            textContent: 'Добро пожаловать в мир верстки на чистом JavaScript!'
        });

        const description = this.createElement('p', {
            className: 'description',
            textContent: 'Это проект создан без использования фреймворков. Все элементы создаются динамически через нативный JavaScript.'
        });

        // Добавляем секцию с карточками
        const cardsSection = this.createElement('div', {
            className: 'cards-section'
        });

        const cardsTitle = this.createElement('h3', {
            className: 'cards-title',
            textContent: 'Наши возможности'
        });

        const cardsGrid = this.createElement('div', {
            className: 'cards-grid'
        });

        const cardsData = [
            {
                title: 'Чистый JS',
                content: 'Никаких фреймворков, только нативный JavaScript'
            },
            {
                title: 'Динамическая верстка',
                content: 'Все элементы создаются программно через DOM API'
            },
            {
                title: 'Компонентный подход',
                content: 'Используем классы для создания переиспользуемых компонентов'
            },
            {
                title: 'Современный дизайн',
                content: 'Стилизация через CSS с градиентами и анимациями'
            }
        ];

        cardsData.forEach(data => {
            const card = new Card(data);
            cardsGrid.appendChild(card.render());
        });

        cardsSection.appendChild(cardsTitle);
        cardsSection.appendChild(cardsGrid);

        container.appendChild(title);
        container.appendChild(description);
        container.appendChild(cardsSection);
        main.appendChild(container);
        this.app.appendChild(main);
    }

    renderFooter() {
        const footer = this.createElement('footer', {
            className: 'footer'
        });

        const copyright = this.createElement('p', {
            className: 'copyright',
            textContent: '© 2025 Верстка на чистом JS'
        });

        footer.appendChild(copyright);
        this.app.appendChild(footer);
    }

    createElement(tag, props = {}) {
        const element = document.createElement(tag);
        
        Object.keys(props).forEach(key => {
            if (key === 'textContent') {
                element.textContent = props[key];
            } else if (key === 'className') {
                element.className = props[key];
            } else {
                element[key] = props[key];
            }
        });

        return element;
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
