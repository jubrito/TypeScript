
/// <reference path="base.ts" />
namespace App {
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
        
        constructor() {
            super('project-input', 'app', true, "user-input");
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
            this.configure();
        }

        renderContent(){}

        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }

        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true
            };
            const descriptionValidatable: Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable: Validatable = {
                value: enteredPeople,
                required: true,
                minValue: 1,
                maxValue: 5
            };
            if (
                !validatesProps(titleValidatable) ||
                !validatesProps(descriptionValidatable) ||
                !validatesProps(peopleValidatable)
            ) {
                alert('Invalid input, please try again');
                return;
            }
            return [
                enteredTitle,
                enteredDescription,
                +enteredPeople
            ]
        }

        private clearInputs() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = ""; 
        }
        @AutoBind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                projectStateManagement.addProject(title, description, people);
                this.clearInputs();
            }
        }

    }
}