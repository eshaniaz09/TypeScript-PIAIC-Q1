//This project is a simple console based Student Management System. In this project you will be learning how to add new students, how to generate a 5 digit unique studentID for each student, how to enroll students in the given courses. Also, you will be implementing the following operations enroll, view balance, pay tuition fees, show status, etc. The status will show all the details of the student including name, id, courses enrolled and balance.This is one of the best projects to implement the Object Oriented Programming concepts.
import inquirer, {Answers,QuestionCollection} from "inquirer";
class Course {
    constructor(public name: string, public fee: number) {
        this.name = name;
        this.fee = fee;
    }
}
class Student {
    private static counter : number = 10001
    public name: string;
    public fatherName: string;
    public age: string;
    public gender: string;
    public StudentId: number;
    public courses: Course[] = [];
    public fee: number = 0;
    public balance: number = 0;

    constructor(name: string, fatherName: string, age: string, gender: string) {
        this.name = name;
        this.fatherName = fatherName;
        this.age = age;
        this.gender = gender;
        this.StudentId = Student.counter++;
    }

    enroll(course: Course): void {
        this.courses.push(course);
        this.balance += course.fee;
    }

    viewBalance(): void {
        console.log(`Your Balance is ${this.balance}`);
    }
    payTuitionFee(amount: number): void {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(
                `Payment of $ ${amount} received. Your balance is ${this.balance}`
            );
        } else {
            console.log(`Insufficient Balance. Your balance is ${this.balance}`);
        }
    }
    showStatus(): void {
        console.log(`Name: ${this.name}`);
        console.log(`Father Name: ${this.fatherName}`);
        console.log(`StudentId: ${this.StudentId}`);
        console.log(`Age of ${this.age}`);
        console.log(`Enrolled in following courses :`);
        this.courses.forEach((course) => console.log(`- ${course.name}`));
        console.log(`He / She has balance : ${this.balance}`);
    }
}

class StudentManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [
        new Course("Computer", 4500),
        new Course("Science", 6000),
        new Course("History", 5000),
    ];
    private findId(studentId: number) {
        return this.students.find((student) => student.StudentId === studentId);
    }
    async addStudent(): Promise<void> {
        const questions : QuestionCollection = [
            {
                name: "name",
                type: "input",
                message: "Enter your name : "
            },
            {
                name: "fatherName",
                type: "input",
                message: "Enter your father name : "
            },
            {
                name: "age",
                type: "Number",
                message: "Enter your age : "
            },
            {
                name: "gender",
                type: "list",
                choices: ["Male", "Female"],
                message: "Enter your gender : "
            },
        ];
        const answers = await inquirer.prompt(questions)
        console.log(questions);
        
        const newStudent = new Student(
            answers.name,
            answers.fatherName,
            answers.age,
            answers.gender
        );
        this.students.push(newStudent);
        console.log(
            `The student ${answers.name}'s admission is confirmed. His/Her StudentId is ${newStudent.StudentId}.\n Now he/she can enroll in any course.`
        );
    }

    async enrollStudent(): Promise<void> {
        const answers = await inquirer.prompt([{
            name: "id",
            type: "number",
            message: "Please enter your Student Id : ",
        },
        {
            name: "course",
            type: "list",
            message: "Please enter the course in which you want to enroll : ",
            choices: this.courses.map(course => course.name)
        }])

        const student = this.findId(Number(answers.id))
        if (student) {
            student.enroll(answers.course);
            console.log(`The student ${student.name} is enrolled in ${answers.course}`);
        } else {
            console.log("The Student not found");
        }
    }
    async payStudentFee(): Promise<void> {
        const answers = await inquirer.prompt([
            {
                name: "id",
                type: "number",
                message: "Please enter your Student Id : ",
            },
            {
                name: "amount",
                type: "number",
                message: "Please enter the fee amount : ",
            },
        ]);

        const student = this.findId(Number(answers.id));
        if (student) {
            student.payTuitionFee(Number(parseFloat(answers.amount)));
        } else {
            console.log("Student not found");
        }
    }
    async viewStudentBalance(): Promise<void> {
        const answers = await inquirer.prompt([{
            name: "id",
            type: "number",
            message: "Please enter your Student Id : ",
        }])
        const student = this.findId(Number(answers.id));
        if (student) {
            student.viewBalance();
        } else {
            console.log("The student is not found");
        }

    }

    async viewStudentStatus(): Promise<void> {
        const answers = await inquirer.prompt([{
            name: "id",
            type: "number",
            message: "Please enter your Student Id : ",
        }])
        const student = this.findId(Number(answers.id));
        if (student) {
            student.showStatus();
        } else {
            console.log("The student is not found");
        }

    }

    async viewStudentList():Promise<void> {
        console.log("| Student Id's       |      Names    |   Father Name  |");
        console.log("_________________________________________________________");
        this.students.forEach(student=>console.log(`|   ${student.StudentId}            |       ${student.name}       |       ${student.fatherName}        |`));
        
    }
}


async function main(): Promise<void>{
    const sms = new StudentManagementSystem();
while (true){
const actions = await inquirer.prompt([{name:'action', type: 'list', message: "What you want to do? ", choices: ['Add Student', 'Enroll in Courses', 'Pay fee', 'View Balance', 'View Status', 'View Student List', 'Exit'] }])

switch(actions.action){
    case 'Add Student':
        await sms.addStudent();
        break;

    case 'Enroll in Courses':
        await sms.enrollStudent();
        break;

    case 'Pay fee':
        await sms.payStudentFee();
        break;

    case 'View Balance':
        await sms.viewStudentBalance();
        break;

    case 'View Status':
        await sms.viewStudentStatus();
        break

    case 'View Student List':
        await sms.viewStudentList();
        break   
    case 'Exit':
        console.log("Closing the Student Management System")
        process.exit();
}


}
}
main()

