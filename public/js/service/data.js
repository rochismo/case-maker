export const Events = {
    render: {
        name: "render",
        cb: function render(data) {
            const lastId = document.querySelector("#lastId");
            const id = document.querySelector("#id");
            const cases = document.querySelector("#cases");
            console.log(data);
            const posts = data.posts;
            lastId.value = posts.lastId;
            id.value = `CU-${posts.lastId}`;
            let html = `
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Description</th>
                    <th>Actors</th>
                    <th>Pre-conditions</th>
                    <th>Started-by</th>
                    <th>Flow</th>
                    <th>Post-conditions</th>
                    <th>Notes</th>
                </tr>`;
            console.log(posts);
            posts.cases.forEach(({
                id,
                lastId,
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
                html += `
                    <tr>
                        <td>
                            ${id}
                        </td>
                        <td>
                            ${name} 
                        </td>
                        <td>
                            ${prior}
                        </td>
                        <td>
                            ${desc} 
                        </td>
                        <td>
                            ${actors} 
                        </td>
                        <td>
                            ${precon}
                        </td>
                        <td>
                            ${starter}
                        </td>
                        <td>
                            ${flow}
                        </td>
                        <td>
                            ${postcon}
                        </td>
                        <td>
                            ${notes}
                        </td>
                </tr>
                `
            })
            cases.innerHTML = html;
        }
    },
    editing: {
        name: "editing",
        cb: ({
            placeholder,
            id
        }) => document.querySelector(id).setAttribute("placeholder", placeholder)
    },
    clear: {
        name: "clear",
        cb: ({
            id
        }) => document.querySelector(id).removeAttribute("placeholder")
    },
    clearAll: {
        name: "clearAll",
        cb: _ => {
            const elements = Array.from(document.querySelector("form").children);
            elements.forEach(child => {
                if (child.hasAttribute("placeholder")) {
                    child.removeAttribute("placeholder");
                }
            })
        }
    }
}