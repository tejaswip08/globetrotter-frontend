# 🌍 Globetrotter Quiz Website

A fun and interactive quiz website where users answer trivia questions with fun facts and score tracking.

---

## 📌 Features

- Welcome Page: Users enter their username to start.
- Quiz Page: Multiple-choice questions with clues.
- Answer Validation: Users receive feedback on correctness.
  Trivia & Fun Facts: Shown only if the answer is correct.
- Automated Progression: The next question appears after 5 seconds.
- Scorecard: Displays final scores after the quiz, User can play the game again and user can challenge a friend!.

---

## 🛠️ Tech Stack

- Vue.js 3 (Options API) – Frontend framework
- Vue Router – Client-side navigation
- Vuex – State management
- Vuetify – UI components and styling
- JavaScript – Core programming language
- CSS – Styling and layout

---

## 📂 Folder Structure

```
Globetrotter/
│── public/ # Static files
│ ├── favicon.ico
│ ├── index.html
│
│── src/ # Source code
│ ├── assets/ # Images and static assets
│ ├── components/
│ │ ├── Extras/
│ │ │ ├── MySnackbar.vue # Snackbar notifications
│ │ │ ├── DisplayAnswerResult.vue # Dialog for answer feedback
│ │
│ ├── plugins/
│ │ ├── index.js # Plugin configurations
│ │
│ ├── router/
│ │ ├── index.js # Vue Router setup
│ │
│ ├── store/
│ │ ├── index.js # Vuex store (if used)
│ │
│ ├── views/
│ │ ├── ChildPages/
│ │ │ ├── GamePage.vue # Quiz page with questions
│ │ │ ├── ScoreCard.vue # Final score display
│ │ ├── MainPages/
│ │ │ ├── FirstPage.vue # Welcome page
│ │ │ ├── FirstPage2.vue # Additional page (if any)
│ │
│ ├── App.vue # Root component
│ ├── main.js # Vue.js entry file
│
│── .gitignore # Git ignore file
│── babel.config.js # Babel configuration
│── jsconfig.json # JavaScript project config
│── package.json # Dependencies & scripts
│── package-lock.json
```

---

## 🚀 Installation & Setup

- npm install
- npm run serve

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
