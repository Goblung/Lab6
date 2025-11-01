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

        // Добавляем интерактивную кнопку
        if (this.props.onClick) {
            const button = this.createElement('button', {
                className: 'card-button',
                textContent: 'Подробнее'
            });
            button.addEventListener('click', () => {
                this.props.onClick(this.props.title);
            });
            card.appendChild(button);
        }

        card.appendChild(title);
        card.appendChild(content);

        // Добавляем анимацию появления
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);

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

    handleCardClick(cardTitle) {
        // Создаем модальное окно через JS
        const modal = this.createElement('div', {
            className: 'modal-overlay'
        });

        const modalContent = this.createElement('div', {
            className: 'modal-content'
        });

        const modalTitle = this.createElement('h2', {
            textContent: cardTitle
        });

        const modalText = this.createElement('p', {
            textContent: `Вы выбрали: ${cardTitle}. Это демонстрация интерактивности через чистый JavaScript!`
        });

        const closeButton = this.createElement('button', {
            className: 'modal-close',
            textContent: 'Закрыть'
        });

        closeButton.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
            }
        });

        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);

        // Анимация появления
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
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
                content: 'Никаких фреймворков, только нативный JavaScript',
                onClick: (title) => this.handleCardClick(title)
            },
            {
                title: 'Динамическая верстка',
                content: 'Все элементы создаются программно через DOM API',
                onClick: (title) => this.handleCardClick(title)
            },
            {
                title: 'Компонентный подход',
                content: 'Используем классы для создания переиспользуемых компонентов',
                onClick: (title) => this.handleCardClick(title)
            },
            {
                title: 'Современный дизайн',
                content: 'Стилизация через CSS с градиентами и анимациями',
                onClick: (title) => this.handleCardClick(title)
            }
        ];

        cardsData.forEach((data, index) => {
            const card = new Card(data);
            const cardElement = card.render();
            // Задержка анимации для каждой карточки
            cardElement.style.transitionDelay = `${index * 0.1}s`;
            cardsGrid.appendChild(cardElement);
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
