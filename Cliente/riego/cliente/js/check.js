export class Check {
    constructor(parent,client) {
        this.parent = parent;
        this.client = client;
        this.states = [];
    }

    changeValue(name, value) {
        const data = this.states.find((item) => item.name == name);
        // hacer algo más.
        if (data) {
            data.state = value;
            const span = this.parent.querySelector(`label[data-name="${name}"] span`);
            if (span) {
                span.textContent = value ? 'ON' : 'OFF';
            }

            this.client.send({
                name : name,
                state: value
            });
        }
    }


    addCheck(name) {
        this.states.push({
            name : name,
            state : false
        })
        const check = document.createElement("label");
        check.classList.add("form-switch");
        check.setAttribute('data-name', name);
        this.parent.appendChild(check);
        const input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        check.appendChild(input);
        check.appendChild(document.createElement("i"));
        const span = document.createElement('span');
        const text = document.createTextNode('OFF');
        span.appendChild(text);
        check.appendChild(span);
        input.addEventListener('change', (event)=> {
            this.changeValue(name, event.target.checked);
        })
    }
}