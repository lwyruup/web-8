function sendFormDataToServer() {
  const messageBox = document.getElementById("messageBox");

  //messageBox.innerHTML = "Мы получили вашу заявку, спасибо";
  //messageBox.innerHTML = "Проверка поля не удалась";
  //https://formcarry.com/s/7hcQamA0Or

  $(function () {
    $(".formcarryForm").submit(function (e) {
      e.preventDefault();
      // REQUIRED FOR RESET
      var form = $(this);
      var href = form.attr("action");

      $.ajax({
        type: "POST",
        url: href,
        data: new FormData(this),
        dataType: "json",
        processData: false,
        contentType: false,
        success: function (response) {
          if (response.code === 200) {
            alert("We received your submission, thank you!");

            // REQUIRED FOR RESET
            // Reset your form fields after a successful submission
            // If you want to reset fields whether request is successful or not, move this piece of code into complete function
            
          } else {
            alert("An error occured: " + response.message);
          }
        },
        error: function (err, textStatus) {
          const error = err.responseJSON;

          // validation error
          $.each(error.errors, function (key) {
            var field = $('[name="' + key + '"]');
            field.addClass("fc-field-error");
          });

          alert(
            "Request failed, " + errorObject.title + ": " + errorObject.message
          );
        },
        complete: function () {form[0].reset();},
      });
    });
  });
}