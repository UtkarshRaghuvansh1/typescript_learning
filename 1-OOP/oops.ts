// ************** Abstraction ******************
// ------------ Example - 1 ----------------------
//shapes
//Area, Parameter
interface Shape {
    area(): number;
    perimeter(): number;
}

class Circle implements Shape{
    constructor(private radius: number){}

    // area function 
    area(): number{
        return Math.PI * this.radius * this.radius;
    }

    //perimeter function
    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle implements Shape{
    constructor(private length: number,private width: number){}

    // area function 
    area(): number{
        return this.length * this.width;
    }

    //perimeter function
    perimeter(): number {
        return 2 * (this.length +  this.width);
    }
}
// So far now no abstraction is implemented 



// Single function to calculate total area 
// This function works with the abstraction "Shape".
// It does not care whether the actual object is
// Circle, Rectangle, or any other Shape.
function calcTotalArea(shape: Shape): number {
    return shape.area();
}


// Client Code 
let circle = new Circle(5);
let rect = new Rectangle(3,8);

console.log('Area of Circle : ', calcTotalArea(circle));
console.log('Area of Rect : ', calcTotalArea(rect));

console.log("**************** END *****************");

// --------------------- Exercise --------------------------
/*
Quest : JavaScript by default offers a date class in the browser and you can use this date class to get the

current year, the current month, and the current date.

So what I want you to do is to use the date class and write some code to print the current year, the

current month, as well as the current date.

Once we have done this, I would help you understand how you used abstraction while getting this information

from the JavaScript date object.
*/


// Date object 
const now = new Date();

// Curent Year 
const currYear = now.getFullYear();

// Current Month 
const currMonth = now.getMonth() + 1;

// CUrrent Date = 
const currDate = now.getDate();

console.log("Current Year:", currYear);
console.log("Current Month:", currMonth);
console.log("Current Date:", currDate);


console.log("*************** END *********************")