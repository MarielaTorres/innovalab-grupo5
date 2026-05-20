const test = require("node:test");
const assert = require("node:assert/strict");
const { FEEDBACK_TEXT, validateMultipleChoiceAnswer } = require("./index");

test("validateMultipleChoiceAnswer returns true for correct answer", () => {
  assert.equal(validateMultipleChoiceAnswer("A", "A"), true);
});

test("validateMultipleChoiceAnswer returns false for incorrect answer", () => {
  assert.equal(validateMultipleChoiceAnswer("B", "A"), false);
});

test("validateMultipleChoiceAnswer handles null and undefined values", () => {
  assert.equal(validateMultipleChoiceAnswer(null, "A"), false);
  assert.equal(validateMultipleChoiceAnswer(undefined, undefined), true);
});

test("validateMultipleChoiceAnswer is case-sensitive", () => {
  assert.equal(validateMultipleChoiceAnswer("a", "A"), false);
});

test("feedback labels for visual validation are defined", () => {
  assert.equal(FEEDBACK_TEXT.correct, "Correcto");
  assert.equal(FEEDBACK_TEXT.incorrect, "Incorrecto");
  assert.equal(FEEDBACK_TEXT.pending, "Selecciona una opción");
});
