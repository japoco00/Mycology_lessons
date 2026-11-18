document.querySelectorAll(".quiz").forEach((quiz) => {
  const feedback = quiz.querySelector(".feedback");
  const why = quiz.querySelector(".why");

  quiz.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const correct = button.dataset.correct === "true";
      feedback.textContent = correct ? "Correct." : "Not quite—try another answer.";
      button.setAttribute("aria-pressed", "true");

      if (correct) {
        if (why) why.hidden = false;
        quiz.querySelectorAll("button").forEach((choice) => {
          choice.disabled = true;
        });
      } else {
        button.disabled = true;
      }
    });
  });
});
