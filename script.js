document.addEventListener("DOMContentLoaded", () => {
    const expressionDisplay = document.getElementById("expression");
    const resultDisplay = document.getElementById("result");
    const buttons = document.querySelectorAll(".btn");
    let expression = "";
    let lastResult = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;
            
            if (value === "AC") {
                expression = "";
                expressionDisplay.textContent = "";
            } else if (value === "=") {
                try {
                    expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
                    lastResult = eval(expression).toString();
                    resultDisplay.textContent = lastResult;
                    expression = lastResult;
                } catch {
                    resultDisplay.textContent = "Error";
                    expression = "";
                }
            } else if (value === "⌫") {
                expression = expression.slice(0, -1);
            } else if (value === "+/-") {
                if (expression) {
                    expression = expression.startsWith("-") ? expression.slice(1) : "-" + expression;
                }
            } else {
                expression += value;
            }
            
            expressionDisplay.textContent = expression;
        });
    });
});
