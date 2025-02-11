document.addEventListener("DOMContentLoaded", () => {
    const expressionDisplay = document.getElementById("expression");
    const resultDisplay = document.getElementById("result");
    const buttons = document.querySelectorAll(".btn");
    let expression = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;
            
            if (value === "AC") {
                expression = "";
                resultDisplay.textContent = "";
            } else if (value === "=") {
                try {
                    expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
                    expression = eval(expression).toString();
                } catch {
                    expression = "Error";
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
            resultDisplay.textContent = expression;
        });
    });
});
