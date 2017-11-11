/**
 * Created by hansel.tritama on 11/11/17.
 */
//RESERVE HTML
$("#btn-add").on("click", () => {
    let newTable = {
        name: $("#custName").val().trim(),
        phone: $("#phoneNumber").val().trim(),
        email: $("#email").val().trim(),
        id: $("#custID").val().trim()
    };

    $.post("/api/new", newTable).done((data) => {
        alert("Thanks for reserving, "+data.name+"!")
    });
});