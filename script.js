
function makeGrid(){
    let grid=document.querySelector('#board');
    let boxes= grid.querySelectorAll('div');
    /// clear grid when making a new one
    boxes.forEach((div) => div.remove());
    /// set column/row of the grid
    grid.style.gridTemplateColumns= `repeat(${3}, 1fr)`;
    grid.style.gridTemplateRows= `repeat(${3}, 1fr)`;
    grid.style.gap='0';

    for(let i=0; i<3*3; i++){
      let box = document.createElement('div');
    //   box.addEventListener('onClick', addMove);
      box.style.border='4px solid black';
      box.style.boxShadow='3px 5px black';
      grid.insertAdjacentElement('beforeend',box);
    } 
 }
 makeGrid();