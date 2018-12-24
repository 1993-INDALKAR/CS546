
//Create a reference to the form
const myForm = document.getElementById("idForm");
// $("footer").css("position", "fixed");
if (myForm) {


    // debugger;

    $('.result').hide();


    //Add an event listener for the form submit
    myForm.addEventListener("submit", event => {
        //We need to prevent the default behavior of the form submit
        event.preventDefault();

        const textArea = document.getElementsByName("phrase");
        let text = textArea[0].value;

        if ($(".error").length) {
            $(".error").remove();
        }




        if (text.length > 0) {

            // $("#error").hide();
            // console.log("frger");

            // const textArea = document.getElementsByName("phrase");
            // let text = textArea[0].value;



            text = text.toLowerCase();
            text = text.replace(/[^A-Z0-9]+/ig, "");
            let rev = text.split("").reverse().join("");
            // let rev;
            let cls = "";

            if (text == rev && text.length > 1) {
                cls = "is-palindrome";
            }
            else {

                cls = "not-palindrome";
            }

            const li = `<li class=${cls}> ${textArea[0].value} </li>`;

            //we add the li element created above to the UL
            $("#attempts").append(li);

            

            

            $('.result').show();

            $("#idForm").trigger('reset');
            $('#idtextarea').focus();


        } else {

            const h2 = `<h2 class="error"> Please Enter A Text</h2>`;
            $(h2).insertAfter(".formDiv");
            $('#idtextarea').focus();

        }

        let element = document.getElementById("attempts");
        if (element.children.length > 0) { 
            $("footer").css("position", "relative");
        }

    });
}