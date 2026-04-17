document.addEventListener("DOMContentLoaded", function(){
    /*upper line means that way to ensure your JS code runs only after the HTML document has been fully loaded and parsed into the Document*/

    const form=document.getElementById("form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
    

    /*using values from html*/
    const firstname=document.getElementById("firstname").value.trim();
    const lastname=document.getElementById("lastname").value.trim();
    const email=document.getElementById("email").value.trim();
    const gender=document.querySelector('input[name="gender"]:checked');
    const course=document.getElementById("course").value;
    const password=document.getElementById("password").value;
    const confirmpassword=document.getElementById("confirmpassword").value;
    const agree=document.getElementById("agree").checked;

    /*conditions*/
    //namePattern for entering only lettets capital and small
    const namePattern=/^[A-Za-z]+$/;

    if(!namePattern.test(firstname)){
        alert("First name must contain only letters");
        return;
    }

    if(!namePattern.test(lastname)){
        alert("Last name must contain only letters!");
        return;
    }
    /*  Not sure if we need one by one check for empty space but will leave it here
    if(!firstname){
        alert("Can not be empty space!");
        return;
    }

    if(!lastname){
        alert("Can not be empty space!");
        return;
    }

    if(!email){
        alert("Can not be empty");
        return;
    }
    */
    if(!firstname|| !lastname|| !email|| !gender){
        alert("Please fill the information table!");
        return;
    }
    //passwordPattern for entering only numbers or letters
    const passwordPattern=/^[A-Za-z0-9]+$/;

    if(!passwordPattern.test(password)){
        alert("The password can only contain numbers and letters without any symbols");
        return;
    }

    if(!confirmpassword){
        alert("The confirm password can not be empty!");
        return;
    }

    if(password!==confirmpassword){
        alert("Passwords do not match");
        return;
    }
    if(!agree){
        alert("You maus agree to terms");
        return;
    }

    /*data store*/

    const userData={
        firstname,
        lastname,
        email,
        gender: gender.value,
        course
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    //there suppose to be the new page like "result" or "index";
    window.location.href="index.html";
});

});
