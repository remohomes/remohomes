function submit() {
    var Name = document.getElementById("Name");
    var emailAddress = document.getElementById("Email");
    var Subject = document.getElementById("Subject");
    var Message = document.getElementById("Message");
    let isError = false;
    var providerInfo = [Name, emailAddress, Subject, Message];
    for (let i = 0; i < providerInfo.length; i++) {
        if (providerInfo[i].value == "") {
            providerInfo[i].style.border = "1px solid red";
            isError = true;
        }
    }
    var emailBodyContent = '<b>Name :</b> ' + Name.value + '<br> ';
    emailBodyContent += '<b>Email :</b> ' + emailAddress.value + '<br> ';
    emailBodyContent += '<b>Message : </b> ' + Message.value + '<br>';
    var jsondata = {
        "token": "gUXMeJn%P8gRVxMHRcC",
        "emailSubjectLine": Subject.value,
        "emailBodyContent": emailBodyContent
    }
    if (!isError) {
        $(".submitButton").attr("disabled", true)
        $.ajax({
            type: "POST",
            url: "https://es.technoboost.in/api/v1/mail-send",
            data: JSON.stringify(jsondata),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $(".submitButton").attr("disabled", false)
                $(".alert").toggle('alert')
                $(".alert").addClass('show')
                if (result.hasOwnProperty('status') && result.status == 'NOT_FOUND') {
                    $(".alert").removeClass('alert-success')
                    $(".alert").addClass('alert-danger')
                    $("#alertMessage").html('<strong> Someting went wrong try again </b>')
                } else {
                    $(".alert").addClass('alert-success')
                    $(".alert").removeClass('alert-danger')
                    $("#alertMessage").html(' <strong>Thankyou for contacting us!  </strong> Our team will get back to you.')
                    $(".emptyInput").val('')
                }
            },
            error: function (err) {
                $(".submitButton").attr("disabled", false)
                $(".alert").toggle('alert')
                $(".alert").addClass('show')
                $(".alert").removeClass('alert-success')
                $(".alert").addClass('alert-danger')
                $("#alertMessage").html('<strong> Someting went wrong try again </b>')
            }
        });
    }

}
function talk() {
    $(".alert").css("display", "none");
    $(".emptyInput").val('')
    $(".emptyInput").css('border', 'none');
}
function removeErrorBorder(id) {
    document.getElementById(id).style.border = 'none'
}


