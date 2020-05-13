import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = ( props ) => {
    
    /* Current props are: 
                salad: 1,
                bacon: 1,
                cheese: 2,
                meat: 2 
        
                the .map of [...Array(props.ingredients[ingredientKey])] will make [UNDEFINED] spots in the array! First step.

                so if Array(1), will make = [undefined]
                   if Array(4), will make = [undefined, undefined, undefined, undefined]

                We don't care what IS INSIDE array at the beginning, we just need it for length, so we can iterate through it.

                Not the most prettiest. I made a for-loop approach at the bottom.
    */

    /* This now returns an array of objects because of .reduce – which CONCATS the array of arrays from the outer .map, which returns array of arrays.
    
    .map did it's job... it ALSO returned the burger ingredients. Ex. [ [{burgerIng1}], [{burgerIng2}], [{burgerIng3}], [{burgerIng4}] ]
    
    We use reduce to see if the length of ingredients is 0, if so, have a prompt that says ADD INGREDIENTS. */

    // Object.keys(obj) grabs the keys
    let ingredientList = Object.keys(props.ingredients) // we continue and use method arrays on .keys()

        // iterate through each element
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])]  //returns [ [undefined], [undefined], [undefined, undefined], [undefined, undefined]] 

                // iterate through undefined arrays
                // INNER .map goes inside the outer array and goes THROUGH the inner arrays
                .map((_, i) => { // '_' indicates blank(idc variable), makes sense: it is undefined anyways.
                    // console.log(i) Index: 0, 0, 0, 1, 0, 1

                    /* 
                    Inside the .map are the BurgerIngredient objects! --> it goes out of inner .map and returns and populates the undefined Array
                    You can see that the object is JSX code, which is the BurgerIngredient obj. react.element!
                    */
                    return <BurgerIngredient
                        key={ingredientKey + i}  // always have key.
                        type={ingredientKey}
                    />
                })
        })

        /* .reduce() */
        // If NO initial value (no second argument) for .reduce(), we take the first element as inital value.
        // Here, we have ARRAY as initial value.
        // the .map, which is an array, are now reduced. Ex. [ [{burgerIng1}], [{burgerIng2}], [{burgerIng3}, {burgerIng3}], [{burgerIng4}, {burgerIng4}] ]
        .reduce((accumulator, currentValue) => {
            // console.log(currentValue)
            /* if(!accumulator.includes(currentValue)) {
                accumulator.push(currentValue)  // push works weird in reduce(), without condition, this is an error. We're not assigning correctly.
            } */
            return accumulator.concat(currentValue) // accumulator works normally and combines the arrays inside an array!
            // so if [] .concats ( [element] )
            // it will equal: [element] 
            // NOT [[element]] !! Notice the two brackets.
        }, []);

        console.log(ingredientList)
    

// ------------------------------------------------------------------------------------------------------------        
    // Note: I can make the transformation from object to array better, but w.e, 
    // to even using .map, but I know what the code above does... so no need and don't get too thorough! It's ok.

/*     const myTake = []
    for(let item in props.ingredients){
        for(let i=0; i<props.ingredients[item]; i++){
            myTake.push(item);
        }
    }
    const burgers = myTake.map((item, i) => {
        return <BurgerIngredient
            key={item + i}
            type={item}
        />
    }) 

    // Note that reduce can have INITIAL VALUE as second arguemnt, we have {} as initial value.
    // acc refers to that initial value of {}
    // with: acc[curr] = 1 , it is creating an object. Ex. acc = { curr: 1 };

    // IF current value is IN the acc object, increase by one.
   const reduced = myTake.reduce((acc, curr) => {
       if(curr in acc){
           acc[curr]++
       }
       else{
           acc[curr] = 1
       }
       return acc
   }, {}) 
   
   console.log(reduced)
*/

   /* If length is 0, change to this prompt! */
   if(ingredientList.length === 0){
       ingredientList = <h2>Please start adding ingredients!</h2>
   }

    return(
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientList}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;