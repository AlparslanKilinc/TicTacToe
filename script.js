const  Player = (name,value,turn) =>{
    let pattern = [];
    const getName  = ()=> name;
    const getValue = ()=> value;
    const getTurn = ()=> turn;
    const getPattern= ()=>pattern;
    const setTurn  = (playerTurn)=> turn=playerTurn;
    const setName  = (playerName) => name=playerName;
    const addMove  = (position) => pattern.push(position);
    const clearPattern = ()=>pattern=[];

    return {name,value,turn,pattern,getTurn,getName,getValue,setTurn,setName,addMove,getPattern,clearPattern}
 }

 let player1 = Player('player1','X',true);
 let player2 = Player('player2','O',false);

/// Board Module 
 const Board = ( ()=> {
    /// Variables
    let board=document.querySelector('#board');
    let resultScreen= document.querySelector('#result-screen');
    let resultText= document.querySelector('#result-text');
    let pattern=[];
    const clearPattern = ()=>pattern=[];

    /// Create Board & Button
    board.style.gridTemplateColumns= `repeat(${3}, 1fr)`;
    board.style.gridTemplateRows= `repeat(${3}, 1fr)`;
    let index=0;
    for(let i=0; i<3*3; i++){
        let box = document.createElement('div');
        box.className=`box ${index++}`;
        box.style.border='4px solid black';
        box.style.boxShadow='3px 5px black';
        board.insertAdjacentElement('beforeend',box);
    }

    /// Functions 
    const addToBoard = (player,div,index) =>{
        if(pattern.includes(index)){
            console.log(false);
            return false;
        }
        else{
            pattern.push(index);
            div.style.display='flex';
            div.style.justifyContent='center';
            div.style.alignItems='center';
            div.style.fontSize='42px';
            div.style.fontWeight='Bold';
            div.innerHTML=player.getValue();
            if(pattern.length>=9){
                resultScreen.style.display='flex';
                resultText.innerHTML='It is a Tie';
            }
            return true;
        }
    }
    return{
        addToBoard: addToBoard,
        pattern:pattern,
        board:board,
        clearPattern:clearPattern
    }

 })();


 const GamePlay = ((Board,player1,player2) =>{
    let player;
    let board = Board.board;
    let boxes=board.querySelectorAll('div');
    let turn=document.querySelector('#turn');
    let resultScreen= document.querySelector('#result-screen');
    let resultText= document.querySelector('#result-text');
    let restart=document.querySelector('#restart');
    let restart_main=document.querySelector('#restart-main');

    restart.addEventListener('click',()=>{clearBoard()});
    restart_main.addEventListener('click',()=>{clearBoard()});

    const clearBoard = ()=>{
        boxes.forEach((div) => div.innerHTML="");
        player1.turn=true;
        player2.turn=false;
        resultScreen.style.display='none';
        Board.clearPattern();
        player1.clearPattern();
        player2.clearPattern();
        showTurn();
    }
    

    let UpdateNames =()=>{
        let name1=document.querySelector('#player-1');
        name1.addEventListener('change',(event)=>{
            player1.setName(event.target.value)
            showTurn();
        });

        let name2=document.querySelector('#player-2');
        name2.addEventListener('change',(event)=>{
            player2.setName(event.target.value)
            showTurn();
        });
    }
    
    let changeTurn= () =>{
        player1.turn=!player1.turn;
        player2.turn=!player2.turn;
        showTurn();
    }

    let showTurn = ()=>{
        if(player1.turn){
            player=player1;
            turn.innerHTML=`${player1.getName()}'s Turn`;
        } 
        else{
            player=player2;
            turn.innerHTML=`${player2.getName()}'s Turn`;
        } 
    }
   
    let AddMoves = ()=>{
        boxes.forEach((div,index) => div.addEventListener('click',()=>{
            let change= Board.addToBoard(player,div,index)
            if(change){
                player.addMove(index);
                // Winning
                if(player.getPattern().includes(0) && player.getPattern().includes(1)  && player.getPattern().includes(2) ||
                   player.getPattern().includes(3) && player.getPattern().includes(4)  && player.getPattern().includes(5) ||
                   player.getPattern().includes(6) && player.getPattern().includes(7)  && player.getPattern().includes(8) ||
                   player.getPattern().includes(0) && player.getPattern().includes(3)  && player.getPattern().includes(6) ||
                   player.getPattern().includes(1) && player.getPattern().includes(4)  && player.getPattern().includes(7) ||
                   player.getPattern().includes(2) && player.getPattern().includes(5)  && player.getPattern().includes(8) ||
                   player.getPattern().includes(0) && player.getPattern().includes(4)  && player.getPattern().includes(8) ||
                   player.getPattern().includes(2) && player.getPattern().includes(4)  && player.getPattern().includes(6)) {
                        resultScreen.style.display='flex';
                        resultText.innerHTML=`${player.getName()} Won`;
                    }
                changeTurn();
            }
        }));
    }

    UpdateNames();
    AddMoves();
    showTurn();
 })(Board,player1,player2);
