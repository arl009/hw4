class RatingWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --star-selected-color: gold;
                    --star-unselected-color: grey;
                }

                .star {
                    cursor: pointer;
                    font-size: 24px;
                }

                .star.selected {
                    color: var(--star-selected-color);
                }

                .star.unselected {
                    color: var(--star-unselected-color);
                }
            </style>
            <form id="rating-form" action="https://httpbin.org/post" method="POST">
                <label for="rating">How Satisfied Are You:</label>
                <input type="hidden" name="question" value="How satisfied are you?">
                <input type="hidden" name="sentBy" value="HTML">
                <input type="hidden" id="rating" name="rating" value="0" required>
                <div id="star-rating"></div>
            </form>
            <div id="response-message"></div>
        `;
        this.maxRating = 5;
        this.currentRating = 0; // Added to track the current rating
    }

    connectedCallback() {
        this.form = this.shadowRoot.querySelector('#rating-form');
        this.ratingInput = this.shadowRoot.querySelector('#rating');
        this.responseMessage = this.shadowRoot.querySelector('#response-message');
        this.starRating = this.shadowRoot.querySelector('#star-rating');

        this.renderStars();
        this.addEventListeners();
    }

    renderStars() {
        for (let i = 1; i <= this.maxRating; i++) {
            const star = document.createElement('span');
            star.textContent = '☆';
            star.dataset.value = i;
            star.classList.add('star', 'unselected');
            this.starRating.appendChild(star);
        }
    }

    addEventListeners() {
        this.starRating.addEventListener('mouseover', this.handleStarMouseover.bind(this));
        this.starRating.addEventListener('mouseout', this.handleStarMouseout.bind(this));
        this.starRating.addEventListener('click', this.handleStarClick.bind(this));
    }

    handleStarMouseover(event) {
        if (event.target.classList.contains('star')) {
            const hoverRating = event.target.dataset.value;
            this.highlightStars(hoverRating);
        }
    }

    handleStarMouseout(event) {
        this.highlightStars(this.currentRating); // Resets to the current rating on mouse out
    }

    handleStarClick(event) {
        if (event.target.classList.contains('star')) {
            this.currentRating = event.target.dataset.value;
            this.ratingInput.value = this.currentRating;
            this.submitForm();
            this.removeStarRatingDisplay();
        }
    }
    
    removeStarRatingDisplay() {
        while (this.starRating.firstChild) {
            this.starRating.removeChild(this.starRating.firstChild);
        }
    }

    highlightStars(rating) {
        const stars = this.starRating.querySelectorAll('.star');
        stars.forEach(star => {
            star.textContent = star.dataset.value <= rating ? '★' : '☆';
            star.classList.toggle('selected', star.dataset.value <= rating);
            star.classList.toggle('unselected', star.dataset.value > rating);
        });
    }

    submitForm() {
        const formData = new FormData(this.form);
        formData.set('sentBy', 'JavaScript');

        fetch(this.form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Sent-By': 'JavaScript'
            }
        })
        .then(response => response.json())
        .then(data => this.handleResponse(data))
        .catch(error => console.error('Error:', error));
    }

    handleResponse(data) {
        let message = 'Thank you for your feedback.';
        if (this.currentRating >= 4) {
            message = 'We are glad you are satisfied!';
        }
        this.responseMessage.textContent = message;

        // Log the response data to the console
        console.log('Response from the server:', data);
    }
}

customElements.define('rating-widget', RatingWidget);
