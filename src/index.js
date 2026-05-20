const FEEDBACK_TEXT = {
  correct: "Correcto",
  incorrect: "Incorrecto",
  pending: "Selecciona una opción",
};

function validateMultipleChoiceAnswer(selectedOption, correctOption) {
  return selectedOption === correctOption;
}

function createMultipleChoiceQuestion(container, questionConfig) {
  const { id, question, options, correctOption } = questionConfig;
  const wrapper = document.createElement("section");
  wrapper.className = "exercise-card";

  const title = document.createElement("h2");
  title.textContent = question;
  wrapper.appendChild(title);

  const optionsList = document.createElement("div");
  optionsList.className = "exercise-options";

  options.forEach((optionText) => {
    const label = document.createElement("label");
    label.className = "exercise-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = id;
    input.value = optionText;

    const optionLabelText = document.createElement("span");
    optionLabelText.textContent = optionText;

    label.appendChild(input);
    label.appendChild(optionLabelText);
    optionsList.appendChild(label);
  });

  wrapper.appendChild(optionsList);

  const checkButton = document.createElement("button");
  checkButton.type = "button";
  checkButton.className = "exercise-button";
  checkButton.textContent = "Validar respuesta";

  const feedback = document.createElement("p");
  feedback.className = "exercise-feedback";
  feedback.setAttribute("aria-live", "polite");
  feedback.setAttribute("aria-atomic", "true");
  feedback.setAttribute("role", "status");

  checkButton.addEventListener("click", () => {
    const selectedInput = wrapper.querySelector(`input[name="${id}"]:checked`);

    if (!selectedInput) {
      feedback.textContent = `⚠ ${FEEDBACK_TEXT.pending}`;
      feedback.className = "exercise-feedback is-pending";
      return;
    }

    const isCorrect = validateMultipleChoiceAnswer(selectedInput.value, correctOption);
    feedback.textContent = isCorrect
      ? `✓ ${FEEDBACK_TEXT.correct}`
      : `✗ ${FEEDBACK_TEXT.incorrect}`;
    feedback.className = `exercise-feedback ${isCorrect ? "is-correct" : "is-incorrect"}`;
  });

  wrapper.appendChild(checkButton);
  wrapper.appendChild(feedback);
  container.appendChild(wrapper);

  return wrapper;
}

function renderInteractiveExercises(exercises, container) {
  container.replaceChildren();
  exercises.forEach((exercise) => createMultipleChoiceQuestion(container, exercise));
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const appRoot = document.getElementById("app");
    if (!appRoot) {
      return;
    }

    renderInteractiveExercises(
      [
        {
          id: "q1",
          question: "¿Cuál etiqueta se usa para crear un enlace en HTML?",
          options: ["<link>", "<a>", "<href>"],
          correctOption: "<a>",
        },
      ],
      appRoot,
    );
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    FEEDBACK_TEXT,
    validateMultipleChoiceAnswer,
    createMultipleChoiceQuestion,
    renderInteractiveExercises,
  };
}
