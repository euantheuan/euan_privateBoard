const db = firebase.firestore();
const storage = firebase.storage();
const board = document.querySelector('ul#board')

db.collection('board').orderBy("date", "asc").onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
        const timestamp = doc.data().date; 
        const date = timestamp.toDate();
        const [year, month, day, hour, min, sec] = [
                                                    date.getFullYear(),
                                                    ('0'+(date.getMonth() + 1)).slice(-2),
                                                    ('0' + date.getDate()).slice(-2),
                                                    ('0' + date.getHours()).slice(-2),
                                                    ('0' + date.getMinutes()).slice(-2),
                                                    ('0' + date.getSeconds()).slice(-2)
                                                    ];
        let docId = doc.id;

        if (!doc.data().image) {
            let post = `<li class='post'>
                            <div class="title_area">
                                <p class="title"><a href="/detail.html?id=${docId}">${doc.data().title}</a></p>
                                <p class="writer">${doc.data().writer} </p>
                                <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                            </div>
                            <p class="content">${doc.data().content}</p>
                        </li>`;

            board.insertAdjacentHTML('afterbegin', post);
        } else {
            let post = `<li class='post'>
                            <div class="title_area">
                                <p class="title"><a href="/detail.html?id=${docId}"><i class="fa-regular fa-file-image"></i> ${doc.data().title}</a></p>
                                <p class="writer">${doc.data().writer} </p>
                                <p class="date">${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                            </div>
                            <figure class='mw-100'>
                                <img src="${doc.data().image}" class='thumbnail object-fit-contain border rounded'>
                            </figure>
                            <p class="content">${doc.data().content}</p>
                        </li>`;

            board.insertAdjacentHTML('afterbegin', post);
        }

        

    })
})