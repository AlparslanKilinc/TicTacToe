/// Board Module 
 const Board = ( ()=> {
    /// Variables
    let board=document.querySelector('#board');
    let restart=document.querySelector('#restart');
    let pattern=[];
    /// Create Board & Button
    restart.addEventListener('click',()=>{clearBoard()});
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
    let boxes=board.querySelectorAll('div');
    /// Functions 
    const clearBoard = ()=>{
        boxes.forEach((div) => div.innerHTML="");
        let name1=document.querySelector('#player-1');
        let name2=document.querySelector('#player-2');
        name1.value="";
        name2.value="";

    }
    const addToBoard = (player,div,index) =>{
        if(pattern.includes(index)) return false;
        else{
            pattern.push(index);
            div.innerHTML=player.getValue();
            return true;
        }
    }
    return{
        clearBoard: clearBoard,
        addToBoard: addToBoard,
        pattern:pattern,
        board:board,
    }

 })();

 const  Player = (name,value,turn) =>{
    let pattern = [];

    const getName  = ()=> name;
    const getValue = ()=> value;
    const getTurn = ()=> turn;
    const setTurn  = (playerTurn)=> turn=playerTurn;
    const setName  = (playerName) => name=playerName;
    const addMove  = (position) => pattern.push(position);

    return {name,value,turn,pattern,getTurn,getName,getValue,setTurn,setName,addMove}
 }

 let player1 = Player('player1','X',true);
 let player2 = Player('player2','O',false);

 const GamePlay = ((Board,player1,player2) =>{
    let player;
    let turn=document.querySelector('#turn');

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
        let board = Board.board;
        let boxes=board.querySelectorAll('div');
        boxes.forEach((div,index) => div.addEventListener('click',()=>{
            let change= Board.addToBoard(player,div,index)
            if(change)changeTurn();
        }));
    }

    UpdateNames();
    AddMoves();
    showTurn();
 })(Board,player1,player2);
