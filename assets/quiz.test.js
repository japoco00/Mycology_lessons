// Run: node assets/quiz.test.js
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const button = (correct) => ({
  dataset: { correct: String(correct) }, disabled: false,
  addEventListener(_, fn) { this.click = fn; }, setAttribute() {},
});
const quiz = (i) => {
  const buttons = [button(false), button(false), button(false)];
  buttons[i].dataset.correct = "true";
  const feedback = { textContent: "" }, why = { hidden: true };
  return { buttons, feedback, why,
    querySelector: (s) => (s === ".why" ? why : feedback),
    querySelectorAll: () => buttons };
};

const q = quiz(1);
vm.runInNewContext(fs.readFileSync(__dirname + "/quiz.js", "utf8"),
  { document: { querySelectorAll: () => [q] } });

q.buttons[0].click();
assert.equal(q.buttons[0].disabled, true);
assert.equal(q.why.hidden, true, "wrong answer must not reveal explanation");

q.buttons[1].click();
assert.equal(q.why.hidden, false);
assert.ok(q.buttons.every((b) => b.disabled));
console.log("quiz.js ok");
