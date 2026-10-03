# OOPS

## What is OOP?
- It is a way of programming by which you structure and organize our code 


## Abstraction 
- Abstraction is hiding the implementation details from User and exposing only the essential features to User.
- Abstraction can be implemented by using abstract(keyword), class and inerface and normal class

```text
                 ABSTRACTION
                     │
          Hide HOW something works
                     │
       Expose WHAT the user needs
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   Interface    Abstract Class   Class API
```
### Through Abstract Keyword
- Imagine different types of payments.
- Every payment must have a pay() method, but the base Payment class doesn't specify exactly how payment happens.
```ts
abstract class Payment {
    abstract pay(amount: number) : void;
}

//Payment through Credit card 
class CreditCardPayment extend Payment{
    pay(amount: number): void{
        console.log(`Paid ${amount} using Credit Card Payment`);
    }
}

/ Payment through UPI
class UPIPayment extend Payment{
    pay(amount: number): void{
        console.log(`Paid ${amount} using Credit Card Payment`);
    }
}

const payment = new CreditCardPayment();
payment.pay(100);
```
```text
              Payment
         abstract class
                 │
         pay(amount)
                 │
      Implementation hidden
                 │
        ┌────────┴────────┐
        ▼                 ▼
 CreditCardPayment    UPIPayment
        │                 │
        ▼                 ▼
 Credit Card logic     UPI logic
```
- The caller only knows payment.pay(), It does not worry about how that particular payment processed.

### Thriugh interface and class
```ts
interface Payment{
    pay(amount: number): void;
}

class CreditCardPayment implements Payment{
    pay(amount: number): void{
        console.log(`Paid ${amount} using Credit Card Payment`);
    }
}

class UPIPayment implements Payment{
    pay(amount: number): void{
        console.log(`Paid ${amount} using Credit Card Payment`);
    }
}
```
```txt
              Payment interface
                     │
               pay(amount)
                     │
              "WHAT to provide"
                     │
             ┌───────┴───────┐
             ▼               ▼
      CreditCardPayment   UpiPayment
             │               │
             ▼               ▼
       HOW to pay          HOW to pay
```
- The user of these classes doesn't need to know the internal implementation.
- Example:
```ts
function makepayment(payment: Payment): void{
    payment.pay(100);
}

makePayment(new CreditCardPayment());

makePayment(new UpiPayment());
```
- makePayment() only knows:
```txt
I received a Payment
        ↓
It has pay()
        ↓
Call pay()
```

#### Rules 
- You cannot directly create an object of an abstract class.
```ts
const p = new Payment(); // ❌
```
## Class and Objects
### Class
- A class is a blueprint of object 
- It is template that groups data(properties) and behaviour(methods) to define an entity(Person, Car)
- This makes our code more structure reusable and clear

```ts
class Person {
    name: string; // Properties
    age: number; // Properties

    // Method
    greet(){
        console.log(`Hello my name is ${name} and age is ${age}`)
    }
}
```

- In TS, a class is like a blueprint that not only defines what properties and methods an object should have but also acts as a type that objects must follow.
- This means when you create an object from class, TS checks to makes sure the object matches the class design's exactly - no extra properties or wrong types allowed.

```ts
class Car {
    model: string;
    vehicle_number: number;

    display(){
        console.log(`Model is ${model} number is ${vehicle_number}`);
    }
}

const creta = new Car();
creta.model = "Creta";
creta.vehicle_number = 12343442;

creta.display();

creta.registration_number = 32123; // TypeScript will give an error because registration number isn’t part of the Car class
```
### Objects
- Objects are instances of blue prints
- It holds tha data(properties) and perform actions(methods)

- NOTE : Class instances are mutable, after creation we can assign new values to their properties and changes persist

```ts
const person1 = new Person();
person1.name = "Utkarsh"
person1.age = 25;

person1.greet(); // Hello my name is Utkarsh and age is 25
```

### Properties in classes
- It represents state of an object i.e They store values related to the object.
- It describe what an Object is.
- It Can have types and default values
- Inside a class properties are accessed using *this* keyword
```ts
class Car {
    model:string = "Sedan";
    year: number;

    this.year = 2020;
}
```
### Methods in Classes

- It defines behaviour or action of the classes
- They are funtions inside the class that can use and manipulate its properties
- It improves Reusablity 
- It describe what an Object can do.

```ts
class Calculator {
    a: number;
    b: number;

    add(a:number, b:number) : number{
        return a + b;
    }
}
```

-------------------

## Access Modifiers, Static and Readonly members

### Access Modifiers
1. Public
- Open to everyone, accesable everywhere
- Insisde the class, outside and even through objects created from the class

- Example : Class Vehicle with public property brand
```ts
class Vehicle {
    public Brand: string;

    constructor(brand){
        this.Brand = brand;
    }
}

const myCar = new Vehicle('Toyota');
console.log(myCar.Brand) // Toyota

myCar.Brand = "Honda";    // Allowed because Brand is public
console.log(myCar.Brand); // Output: Honda
```

2. Private
- It means its hiden inside the class, only that class can access it
- Not accessable from outside of the class or from any subclass
- Used to hide details strictly inside the class

3. Protected 
- Accesable within the class and its subclass/child class
- Not accesable outside the class
- Allows controlled sharing with subclasses while keeping it hidden from the outside.

- Example for public, private and protected 

```ts
class Vehicle {
    public brand: string;
    private engineNumber: string;
    protected wheels: number;

    constructor(brand: string, engineNumber: string, wheels: number){
        this.brand = brand;
        this.engineNumber = engineNumber;
        this.wheels = wheels;
    }
}

class Car extends Vehicle {
    displayBrand(){
        console.log(this.brand); // Allowed: brand is public access modifer can be accessed inside subclass
    }
    displayWheels(){
        console.log(this.wheels); // Allowed: as wheels is protected, can be accessed by subclass
    }

    displayEngineNumber(){
        console.log(this.engineNumber); // NOT Allowed: As Engine Number is private 
        // ERROR : private not accessible in subclass
    }
}

const myCar = new Car('Sedan','Eng 123', 4);
console.log(myCar.brand);// Allowed : brand is public, can be accessed outside the class
console.log(myCar.wheels);  // Error: protected not accessible outside class or subclass

console.log(myCar.engineNumber); // Error: private not accessible outside class
```

### Static Members
- It belongs to class itself, Not to objects/instances
- You access them using the class name, not through an object.
- Useful for constants, utility functions, or values which should be same across all objects/instances

```ts
class MathUtils{
    static pi: number = 3.14;

    static areaOfCircle(radius: number): number{
        return MathUtil.pi * radius * radius;
    }
}

console.log(MathUtil.pi) // Access static property without creating an object

console.log(MathUtil.areaOfCircle(5)); // Call static method directly
```

#### When we need static methods?
- There is only one copy of the static property shared by all instances.
- It is accessed using the class name, not through an object.
- It is useful for data or behavior common to all instances, like a shared school name for all students.

```ts
class Student {
    name: string,
    rollNo: number

    constructor(name: string, rollNo: number){
        this.name = name;
        this.rollNo = rollNo;
    }
}

const student1 = new Student('Harsh', 23);
const student2 = new Student('XYZ', 34);
// Here each student have their own name and roll number 
```
- But they can have school name in common, so we can make school name static shared to all student 

```ts
class Student {
    static schoolName: string = 'KIIT';
    name: string;
    rollNo: number;

    constructor(name:string, rollNo: number){
        this.name = name,
        this.rollNo = rollNo;
    }
}

const st1 = new Student('Harsh',33);
const st2 = new Student('CDFF', 43);

console.log(st1.name, st1.rollNo, Student.schoolName);
```

#### If we want to update the static property 
- we can create a static method that update the static property
```ts
class Student {
    static schoolName: string = 'Greenwood High';
    name: string;
    rollNo: number;

    constructor(name: string, rollNo: number){
        this.name = name;
        this.rollNo = rollNo;
    }

    static changeSchoolName(newName: string) {
        Student.schoolName = newName;
    }
}

console.log(Student.schoolName); // Greenwood High
Student.changeSchoolName('Sunrise Academy');
console.log(Student.schoolName); // Sunrise Academy
```

### Read only
- It is the value assigned only once
    - At declaration 
    - Or in Constructor

- It is like You can set this value once, but you can't change it afterward.

- Prevents accidental changes to important values like IDs.

- Example: Cars vin number that is unique and should not be modified

```ts
class Car {
    readonly vin: string;

    constructor(vin: string){
        this.vin = vin; // Assigning readonly property in constructor
    }
}

const car = new Car("1HGCM82633A004352");
console.log(car.vin); // Access readonly property on an object

// car.vin = "newVIN"; // Error: Cannot assign to 'vin' because it is a read-only property
```


## Constructor
- It is a special method that runs automatically when new object is created.
- Purpose : It initialize the properties  of a new object when it is created.
- In short, a constructor:
    - Sets initial values for the object's properties.
    - Ensures every instance of the class has meaningful data from the start.
    - Makes the code clearer and safer by avoiding uninitialized or default values.

- Examples:
1. Defining a simple class with default property values:
```ts

class Car {
    brand: string = 'Default';
    year: number = 2000;
}

const myCar = new Car();
console.log(myCar.brand, myCar.year); // Output: Default 2000
```

2. Creating an object and updating its properties:

```ts
const myCar = new Car();
myCar.Brand = "Tesla";
myCar.Year = 2023;
console.log(myCar.Brand, myCar.Year); // Output: Tesla 2023
```
3. Using a constructor to initialize properties during object creation:
```ts
class Car {
  Brand: string;
  Year: number;

  constructor(brand: string, year: number) {
    this.Brand = brand;
    this.Year = year;
  }
}

const myCar = new Car("Toyota", 2022);
console.log(myCar.Brand, myCar.Year); // Output: Toyota 2022
```

## Getter and Setter in Classes
- Getters and Setters help keep object data valid and safe by controlling how properties are read and written.

### Implementation of setter 
- A private field is used to store data internally, preventing direct access
```ts
private _marks: string
```
- The setter validates input values (e.g., marks must be between 0 and 100) and only saves valid data, blocking invalid updates.

### Implemenatation of getter
- Getter return the private field value, allowing safe and consistent reads

- Together with the setter, the getter ensures that data is accessed and modified safely without changing how the class is used externally.

### Purpose of getter and setter
- To control and protect access to the class data.
    - Setter : validate and control the values
    - Getter : access the private property value

### Example:
```ts
class Student {
    public name: string;
    private _marks: number;

    constructor(name: string, marks: number){
        this.name = name;
        this._marks = marks;
    }

    //Setter for Validation
    set marks(value: number){
        if(value < 0 && value > 100){
            console.log('Marks should be in between 0 to 100');
        }
        else{
            this._marks = value;
        }
    }

    //getter to read/access the marks
    get marks() : number {
        return this._marks;
    }
}

//Usage 
const student = new Student("Alice", 90);
console.log(student.marks); // 90

student.marks = 105; // Invalid, prints warning
student.marks = 95;  // Valid update
console.log(student.marks); // 95
```

### Why undescore(_) for private field?
- Naming convention to distinguish between private and public property
- It helps us avoiding naming conflicts and clarifies that _marks is for internel use only 

### Why use private instead of protected for the field?  

- private means the field is accessible only within the class itself, ensuring strict encapsulation and preventing external or subclass access. This enforces that all access goes through the getter/setter, maintaining validation and control.


- protected allows access in subclasses, which can be useful if you want derived classes to manipulate the field directly. However, this can bypass the setter's validation if not carefully managed.


#### Note: 
- In summary, private with an underscore is a safer pattern to fully encapsulate the data and enforce controlled access through getters and setters. If you need subclass access and are confident about validation, protected can be used, but it requires more caution.


## Inheritance

- A child class can inherit the methods and properties from parent class
- Ts Only support 1 inderitance that is, A child class can only inherit one parent class at a time 

Purpose:
- It avoids code repeatition 
- Changes made in the parent class automatically propagate to child classes, improving maintainability and reducing errors.

Implementation : 
- Use `extend` keyword to inherit the code
```ts
class User {
    name: string;
    email: string;
}

class Admin extends User {
    role: string;

    greet(){
        console.log(`Hello I am ${this.name} - ${this.role}$, Email - ${this.email}`)
    }
}
```

- We can also modify methods and properties of parent class in child class 

Example :

```ts
class User{
    greet(){
        console.log('Hello from User');
    }
}

class Admin extends User {
    greet(){
        console.log('Hello from Admin!');
    }
}

const admin = new Admin();
admin.greet(); // Hello from Admin!

```

