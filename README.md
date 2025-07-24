# 🌍 Globetrotter Quiz Website

A fun and interactive quiz website where users answer trivia questions with fun facts and score tracking.

---

## 📌 Features

- **Welcome Page:** Users enter their username to start.
- **Quiz Page:** Multiple-choice questions with helpful clues.
- **Answer Validation:** Instant feedback on answers.  
  ✅ Trivia & fun facts are shown when the answer is correct.
- **Automated Progression:** The next question loads automatically after 5 seconds.
- **Scorecard:** Displays final scores, with options to play again or challenge a friend.

---

## 🛠️ Tech Stack

- **Vue.js 3** (Options API) – Frontend framework
- **Vue Router** – Client-side routing
- **Vuex** – Centralized state management
- **Vuetify** – UI components & styling
- **JavaScript** – Programming logic
- **CSS** – Styling and layout

---

## 📂 Project Folder Structure

```
Globetrotter/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/                     # Images and static assets
│   ├── components/
│   │   └── Extras/
│   │       ├── MySnackbar.vue      # Snackbar notifications
│   │       └── DisplayAnswerResult.vue # Feedback dialog
│   ├── plugins/
│   │   └── index.js               # Plugin configurations
│   ├── router/
│   │   └── index.js               # Vue Router setup
│   ├── store/
│   │   └── index.js               # Vuex store
│   ├── views/
│   │   ├── ChildPages/
│   │   │   ├── GamePage.vue       # Quiz interface
│   │   │   └── ScoreCard.vue      # Final score display
│   │   └── MainPages/
│   │       ├── FirstPage.vue      # Welcome screen
│   │       └── FirstPage2.vue     # Optional additional page
│   ├── App.vue                    # Root component
│   └── main.js                    # Entry point
├── .gitignore
├── babel.config.js
├── jsconfig.json
├── package.json
└── package-lock.json
```

---

## 🚀 Installation & Setup

To run the project locally:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run serve
```

The app will be served at `http://localhost:8080/` by default.

---

## ❌ Demo Link (Currently Inactive)

[https://globetrotter-frontend-pi.vercel.app/](https://globetrotter-frontend-pi.vercel.app/)  
⚠️ This demo is no longer available because the subscription for fetching quiz questions has ended.  
However, the codebase remains available and can be reused or extended if you're interested.

---

## 📜 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.
