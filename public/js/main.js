const tbl = document.querySelector("#cases");
const form = document.forms.namedItem("fileinfo");
let id = 1;
let dates = [];

function addCase(ev) {
    ev.preventDefault();

    const data = new FormData(form);
    const use = {
        id
    };

    for (var [key, value] of data.entries()) {
        console.log(key);
        use[key] = value;
    }
    use.lastId = id;
    id++;
    form.reset();
    dates.push(use);

}

function renderCases() {

    let html = ``;
    dates.forEach(({
        id,
        name,
        prior,
        desc,
        actors,
        precon,
        starter,
        flow,
        postcon,
        notes
    }) => {
        html += `<tr>
                        <td>CU-${id}</td>
                        <td>${name}</td>
                        <td>${prior}</td>
                        <td>${desc}</td>
                        <td>${actors}</td>
                        <td>${precon}</td>
                        <td>${starter}</td>
                        <td>${flow}</td>
                        <td>${postcon}</td>
                        <td>${notes}</td>
                    </tr>`
    })
    tbl.innerHTML = html;

}