/**
 * Created by hansel.tritama on 11/11/17.
 */
//TABLES HTML
$.get("/queue", (data) => {
    //process data

    $("#reserveTable").empty();
    $("#waitingListTable").empty();
    for (let i = 0; i < data.length; i++){
        let newcard = `<tr><td>${i+1}</td><td>${data[i].name}</td></tr>`;

        if (i < 5)
            $("#reserveTable").append(newcard);
        else
            $("#waitingListTable").append(newcard);
    }
});