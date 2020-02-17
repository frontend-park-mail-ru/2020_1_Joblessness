export default class CreateVacancy {
    constructor() {
        let vacancyDiv = document.createElement('div');
        let vacancyForm = document.createElement('from');
        vacancyForm.innerHTML = '<h3>Основная информация</h3>';


        vacancyForm.appendChild( this.createSection('Название вакансии',
            createInput(text, 'job-title'), 'Подсказка1') );


    }

    createSection (labelText, inputCell, tipText) {
        let section = document.createElement('section')
        section.className = 'oneline-three-elements';
        section.innerHTML = '<label class="input_name">' + labelText + '</label>';
        section.appendChild(inputCell);
        section.innerHTML += '<span class="input_description">' + tipText + '</span>';

        return section
    }

    createInput (type, id) {
        let input = document.createElement('input')
        input.className = 'input';
        input.id = id;
        input.type = type;

        return input
    }
}