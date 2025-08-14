const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // حجم كل مربع في الشبكة
let snake = [{x: 8 * box, y: 8 * box}]; // الحنش يبدأ في الوسط
let direction = "RIGHT";
let score = 0;

// تفاحة
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

// تحريك الحنش بالأسهم
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if(event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if(event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if(event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if(event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

// رسم اللعبة
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // رسم الحنش
    for(let i=0; i<snake.length; i++) {
        ctx.fillStyle = (i===0) ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // رسم التفاحة
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // تحريك الحنش
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction === "LEFT") snakeX -= box;
    if(direction === "UP") snakeY -= box;
    if(direction === "RIGHT") snakeX += box;
    if(direction === "DOWN") snakeY += box;

    // الأكل
    if(snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    // إضافة الرأس الجديد
    let newHead = {x: snakeX, y: snakeY};
    
    // كوليجات مع الحيط أو مع النفس
    if(snakeX < 0 || snakeX >= 400 || snakeY < 0 || snakeY >= 400 || collision(newHead, snake)) {
        clearInterval(game);
        alert("خسرت! النقاط: " + score);
        return;
    }

    snake.unshift(newHead);
}

// تحقق من الاصطدام مع النفس
function collision(head, array) {
    for(let i=0; i<array.length; i++) {
        if(head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

// تشغيل اللعبة كل 100ms
let game = setInterval(draw, 100);
