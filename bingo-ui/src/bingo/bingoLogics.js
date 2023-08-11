function getNumbers(){
    const numbers=[];
    for(let i=1;i<=25;i++){
        numbers.push({value:i,isMarked:false});
    }
    for(let i = 0,j;i < numbers.length; i++){
        j= Math.floor(Math.random() * (numbers.length-1)); 
        [numbers[i],numbers[j]]=[numbers[j],numbers[i]];
    }
    return numbers;
}

 export default function getCard(){
    const bingoCard=[];
    const cardNumbers= getNumbers();  
    for(let i=0;i<5;i++){
        bingoCard.push(cardNumbers.slice(i*5,(i*5)+5))

    }
    return bingoCard;
}




