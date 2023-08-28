import throttle from 'lodash.throttle';

const STORAGE_FEEDBACK_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");
const email = document.querySelector(".feedback-form input");
const message = document.querySelector(".feedback-form textarea");

const fillingForm = () => {
    const savedFeedback = JSON.parse(localStorage.getItem(STORAGE_FEEDBACK_KEY));
    if (STORAGE_FEEDBACK_KEY === null) {
        return;
    };
    email.value = savedFeedback.email;
    message.value = savedFeedback.message;
}

fillingForm();

const saveFeedback = () => {
    const {
        elements: { email, message },
    } = form;
    
    const feedbackValue = { email: email.value, message: message.value };
    localStorage.setItem(STORAGE_FEEDBACK_KEY, JSON.stringify(feedbackValue));
}

form.addEventListener('input', throttle(saveFeedback, 500));

const submitEvent = (event) => {
    event.preventDefault();
    if (email.value === '' || message.value === '') {
        return alert('Заповніть будь-ласка всі поля');
    };

    console.log({ email: email.value, message: message.value });

    event.currentTarget.reset();
   
    localStorage.removeItem(STORAGE_FEEDBACK_KEY);
};

form.addEventListener('submit', submitEvent);
