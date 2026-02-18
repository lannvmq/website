function scrollToSection(id) {
document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

const tests = {
  informatyk: [
    { q: "Lubisz programować?", options: ["Tak", "Nie"] },
    { q: "Czy interesują Cię sieci komputerowe?", options: ["Tak", "Nie"] },
    { q: "Czy potrafisz logicznie rozwiązywać problemy?", options: ["Tak", "Nie"] },
    { q: "Czy chcesz tworzyć własne strony i aplikacje?", options: ["Tak", "Nie"] },
    { q: "Czy lubisz pracować przy komputerze?", options: ["Tak", "Nie"] },
  ],
  programista: [
    { q: "Lubisz pisać kod w różnych językach?", options: ["Tak", "Nie"] },
    { q: "Lubisz tworzyć aplikacje?", options: ["Tak", "Nie"] },
    { q: "Czy masz cierpliwość do debugowania?", options: ["Tak", "Nie"] },
    { q: "Czy chcesz pracować w projektach zespołowych?", options: ["Tak", "Nie"] },
    { q: "Czy interesuje Cię tworzenie gier lub aplikacji mobilnych?", options: ["Tak", "Nie"] },
  ],
  spedytor: [
    { q: "Interesuje Cię logistyka?", options: ["Tak", "Nie"] },
    { q: "Lubisz planować transport?", options: ["Tak", "Nie"] },
    { q: "Czy potrafisz organizować zadania w czasie?", options: ["Tak", "Nie"] },
    { q: "Lubisz kontakt z klientem i firmami?", options: ["Tak", "Nie"] },
    { q: "Czy radzisz sobie ze stresem?", options: ["Tak", "Nie"] },
  ],
  turystyka: [
    { q: "Lubisz organizować wycieczki?", options: ["Tak", "Nie"] },
    { q: "Lubisz kontakt z klientem?", options: ["Tak", "Nie"] },
    { q: "Czy interesuje Cię geografia i kultura?", options: ["Tak", "Nie"] },
    { q: "Lubisz planować wydarzenia i wyjazdy?", options: ["Tak", "Nie"] },
    { q: "Czy chcesz pracować w turystyce?", options: ["Tak", "Nie"] },
  ]
};

const modal = document.getElementById("test-modal");
const modalTitle = document.getElementById("modal-title");
const modalQuestions = document.getElementById("modal-questions");
const modalResult = document.getElementById("modal-result");
const submitTest = document.getElementById("submit-test");
const closeBtn = document.querySelector(".modal .close");

document.querySelectorAll(".test-btn").forEach(button => {
  button.addEventListener("click", () => {
    const dir = button.dataset.direction;
    showTest(dir);
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
  modalQuestions.innerHTML = "";
  modalResult.innerHTML = "";
};

window.onclick = (e) => {
  if(e.target == modal) {
    modal.style.display = "none";
    modalQuestions.innerHTML = "";
    modalResult.innerHTML = "";
  }
};

function showTest(direction) {
  modal.style.display = "block";
  modalTitle.textContent = `Test dla ${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
  modalQuestions.innerHTML = "";
  modalResult.innerHTML = "";

  tests[direction].forEach((item, idx) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("question");
    const qText = document.createElement("p");
    qText.textContent = item.q;
    qDiv.appendChild(qText);

    item.options.forEach(opt => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = direction + "-q" + idx;
      input.value = opt;
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      qDiv.appendChild(label);
    });
    modalQuestions.appendChild(qDiv);
  });

  submitTest.onclick = () => {
    let score = 0;
    tests[direction].forEach((item, idx) => {
      const selected = modalQuestions.querySelector(`input[name="${direction}-q${idx}"]:checked`);
      if(selected && selected.value === "Tak") score++;
    });
    const percent = Math.round((score / tests[direction].length) * 100);
    modalResult.innerHTML = (percent === 100) ? 
      "Ten kierunek jest dla Ciebie idealny!" : 
      `Twój wynik: ${percent}% dopasowania.`;
  };
}
