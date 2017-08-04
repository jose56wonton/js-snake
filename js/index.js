
var board,snake,fruit,direction,interval;
function start_new_game(){
    board = 40;
    snake = [[20,10]];
    fruit = [20,30];
    direction = 2;
    print_current_board();
    interval = setInterval(the_loop,200);
}

function print_current_board(){
    $(".board").html("");
    for(var i = 0; i < board; i++){
        for(var j = 0; j < board; j++){
            var element = "<div class='r"+i+" c"+j+" space'></div>";
            $(".board").append(element);            
        }
    }
    $(".r"+fruit[0]+".c"+fruit[1]).addClass("fruit");
    
    for(var k = 0; k < snake.length; k++ ){
        $(".r"+snake[k][0]+".c"+snake[k][1]).addClass("snake");
    } 
}
function generate_fruit(){
    r = Math.floor(Math.random()*40);
    c = Math.floor(Math.random()*40);
    if(snake.contains([r,c])){
        return generate_fruit;
    }else{
        return [r,c];
    }
}
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
function move(){
    for(var i = snake.length-1; i > 0; i--){
        snake[i][0] = snake[i-1][0];
        snake[i][1] = snake[i-1][1];
    }
    if(direction == 1){
            snake[0][0] = snake[0][0]-1;
    }else if(direction == 2){
            snake[0][1] = snake[0][1]+1;
    }else if(direction == 3){
            snake[0][0] = snake[0][0]+1;
    }else if(direction == 4){
            snake[0][1] = snake[0][1]-1;
    }
}
function hit_wall(){
    // 8)
    if((snake[0][0] == 0 && direction == 1) || (snake[0][0] == board-1 && direction == 3) || (snake[0][1] == 0 && direction == 4) || (snake[0][1] == board-1 && direction == 2)){
        return true;
    }
    return false;
}
function hit_snake(){
    if(direction == 1){
        for(var i = 1; i < snake.length; i++){
            if(snake[i][0] === snake[0][0]-1 && snake[i][1] === snake[0][1]){
                return true;
            }
        }
    }else if(direction ==2){
        for(var i = 1; i < snake.length; i++){
            if(snake[i][0] === snake[0][0] && snake[i][1] === snake[0][1]+1){
                return true;
            }
        }
    }else if(direction ==3){
        for(var i = 1; i < snake.length; i++){
            if(snake[i][0] === snake[0][0]+1 && snake[i][1] === snake[0][1]){
                return true;
            }
        }
    }else if(direction ==4){
        for(var i = 1; i < snake.length; i++){
            if(snake[i][0] === snake[0][0] && snake[i][1] === snake[0][1]-1){
                return true;
            }
        }
    }
    
    return false;
}
function victory(){
    if(snake.length == 1600)
        return true;
    else 
        return false;
}
function found_fruit(){
    if((fruit[0] == (snake[0][0]-1) && fruit[1] == snake[0][1] && direction == 1) || (fruit[0] == (snake[0][0]+1) && fruit[1] == snake[0][1] && direction == 3) 
        || (fruit[0] == snake[0][0] && fruit[1] == (snake[0][1]-1) && direction == 4) || (fruit[0] == snake[0][0] && fruit[1] == (snake[0][1]+1) && direction == 2)){
        return true;
    }
    return false;
}
function the_loop(){
    if(hit_wall()){
        clearInterval(interval);
        alert("you hit the wall");
    }else if(hit_snake()){        
        clearInterval(interval);
        alert("you hit the snake");
    }else if(victory()){
        clearInterval(interval);
        alert("victory");    
    }else if(found_fruit()){
        snake.unshift([fruit[0],fruit[1]]);
        fruit = generate_fruit();
        print_current_board();
    }else{
        move();
        print_current_board();
    }   
}
$(document).keydown(function(e){
    switch(e.which) {
        case 37: // left
        direction = 4;
        break;

        case 38: // up
        direction = 1;
        break;

        case 39: // right
        direction = 2;
        break;

        case 40: // down
        direction = 3;
        break;

        default: return;
    }
    e.preventDefault(); 
});
start_new_game();





