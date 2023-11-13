const startBtn = document.querySelector("#start-btn");

const restartBtn = document.querySelector("#restart-btn");

// modal
const modal = document.querySelector("#modal");

// guess number list
const guessNumberArray = [];
const exactNumberArray = [];

// starting value
let lowerValue;
let highValue;

// start button event listener
startBtn.addEventListener("click", () => {
  // before all data clear
  guessNumberArray.length = 0;
  exactNumberArray.length = 0;

  lowerValue = document.querySelector("#lower-number").value;
  highValue = document.querySelector("#higher-number").value;
  if (!lowerValue) return errorPopupShow("Please enter a lower value");
  if (!highValue) return errorPopupShow("Please enter a higher value");

  // value validation
  if (Number(lowerValue) >= Number(highValue))
    return errorPopupShow("Lower value must be less than higher value");

  // modal show
  modal.classList.remove("hidden");
  modalInnerHTML(1);
});

// error popup function
function errorPopupShow(message) {
  const errorPopup = document.querySelector("#error-popup");
  const errorMessage = document.querySelector("#error-message");
  errorPopup.classList.remove("hidden");
  errorMessage.textContent = message;

  // close popup after 3 seconds
  setTimeout(() => {
    errorPopup.classList.add("hidden");
  }, 3000);
}

// innerHTML add in modal

function modalInnerHTML(turn) {
  const index = Number(turn) - 2;
  console.log(guessNumberArray, exactNumberArray);
  modal.classList.remove("hidden");
  modal.innerHTML = `
    <div class="modal-content flex justify-center h-full items-center">
        <!-- modal body  -->
        <div class="grow .card bg-white rounded-md max-w-[500px]">
          <div class="card-container pt-2 bg-zinc-100 rounded-t-md">
            <h1 class="py-2 font-semibold text-center text-2xl">Turn-${turn}</h1>
            <hr />
          </div>

          <div class="card-body p-4">
            <div class="flex justify-between items-center">
              <label for="" class="w-full">Enter a guess</label>
              <input
                type="number"
                id="guessNumber"
                class="w-full py-2 px-4 focus:outline-none border border-zinc-200 focus:ring-4 focus:ring-sky-100 rounded-md"
              />
            </div>
            <!-- previous guesses  -->
            <div class="my-5">
            ${
              guessNumberArray.length > 0
                ? `<p class="text-red-400">${
                    guessNumberArray[turn - 2] > exactNumberArray[turn - 2]
                      ? "Last guess was too high!"
                      : guessNumberArray[turn - 2] < exactNumberArray[turn - 2]
                      ? "Last guess was too low!"
                      : "exactly right!"
                  }</p>`
                : ""
            }
            </div>
            ${
              guessNumberArray.length > 0
                ? `<div class="my-5">
              <h2 class="font-semibold text-[18px]">Previous guesses</h2>
              <ol class="list-decimal list-inside">
                ${guessNumberArray
                  .map((number) => `<li> ${number}</li>`)
                  .join("")}
                
              </ol>
            </div>`
                : ""
            }
            <div class="my-5">
              <button
                class="bg-violet-500 hover:bg-violet-600 rounded-md py-2 px-4 text-white w-full font-semibold"
                id="guessBtn"
              >
                Submit guess
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
}

// value receive from modal
modal.addEventListener("click", function (e) {
  if (e.target.id === "guessBtn") {
    const guessValue =
      e.target.parentElement.parentElement.querySelector("#guessNumber").value;

    if (guessValue < lowerValue || guessValue > highValue)
      return errorPopupShow(
        `Please enter a number between ${lowerValue} and ${highValue}`
      );

    // value validation
    if (!guessValue) return errorPopupShow("Please enter a guess");

    // random number
    const randomNumber = randomNumBetween(lowerValue, highValue);

    guessNumberArray.push(Number(guessValue));
    exactNumberArray.push(randomNumber);

    if (guessNumberArray.length === 3) {
      return modal.classList.add("hidden");
    }
    modalInnerHTML(guessNumberArray.length + 1);
  }
});

// random number between two numbers
function randomNumBetween(min, max) {
  return (
    Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min)
  );
}
